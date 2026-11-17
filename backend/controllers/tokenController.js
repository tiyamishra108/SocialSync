const pool = require("../config/db");
const tokenModel = require("../models/tokenModel");


// ==========================================
// GET APPOINTMENT TOKEN
// ==========================================

async function getAppointmentToken(req, res) {
    try {
        const token = await tokenModel.getTokenByAppointmentId(
            req.params.appointmentId
        );

        if (!token) {
            return res.status(404).json({
                message: "Token not found"
            });
        }

        // Patient can view only their own token
        // Receptionist can view any token
        if (req.user.role !== "receptionist") {

            const owner = await pool.query(
                `SELECT patient_id
                 FROM appointments
                 WHERE appointment_id = $1`,
                [req.params.appointmentId]
            );

            if (
                !owner.rows.length ||
                Number(owner.rows[0].patient_id) !==
                Number(req.user.user_id)
            ) {
                return res.status(403).json({
                    message: "You cannot view this token"
                });
            }
        }

        // Calculate people ahead in queue
        const ahead = await pool.query(
            `SELECT COUNT(*)::int AS people_ahead
             FROM tokens t
             JOIN appointments a
             ON a.appointment_id = t.appointment_id

             WHERE a.doctor_id = $1
             AND a.appointment_date::date = $2::date
             AND LOWER(t.queue_status) = 'waiting'

             AND (
                t.priority > $3
                OR (
                    t.priority = $3
                    AND t.token_number < $4
                )
             )`,
            [
                token.doctor_id,
                token.appointment_date,
                token.priority,
                token.token_number
            ]
        );

        return res.json({
            ...token,
            people_ahead: ahead.rows[0].people_ahead
        });

    } catch (error) {
        console.error("Get token error:", error.message);

        return res.status(500).json({
            message: "Failed to fetch token"
        });
    }
}


// ==========================================
// GET DOCTOR QUEUE
// ==========================================

async function getDoctorQueue(req, res) {
    try {
        const { date } = req.query;

        const queueDate =
            date || new Date().toISOString().slice(0, 10);

        const result = await pool.query(
            `SELECT
                t.token_id,
                t.token_number,
                t.queue_status,
                t.priority,
                t.emergency_requested,
                t.emergency_status,

                a.appointment_id,
                a.appointment_date,

                d.doctor_id,
                d.doctor_name

             FROM tokens t

             JOIN appointments a
             ON a.appointment_id = t.appointment_id

             JOIN doctors d
             ON d.doctor_id = a.doctor_id

             WHERE a.doctor_id = $1
             AND a.appointment_date::date = $2::date

             ORDER BY
                t.priority DESC,
                t.token_number ASC`,
            [
                req.params.doctorId,
                queueDate
            ]
        );

        return res.json(result.rows);

    } catch (error) {
        console.error("Get queue error:", error.message);

        return res.status(500).json({
            message: "Failed to fetch doctor queue"
        });
    }
}


// ==========================================
// PATIENT: SUBMIT EMERGENCY REQUEST
// ==========================================

async function setEmergencyPriority(req, res) {
    try {

        if (req.user.role !== "patient") {
            return res.status(403).json({
                message: "Only patients can request emergency priority"
            });
        }

        const { appointmentId } = req.params;

        const result = await pool.query(
            `UPDATE tokens t

             SET
                emergency_requested = TRUE,
                emergency_status = 'pending',
                priority = 0

             FROM appointments a

             WHERE t.appointment_id = a.appointment_id
             AND a.appointment_id = $1
             AND a.patient_id = $2
             AND LOWER(a.status) = 'booked'
             AND LOWER(t.queue_status) = 'waiting'
             AND t.emergency_requested = FALSE
             AND t.emergency_status = 'none'

             RETURNING t.*`,
            [
                appointmentId,
                req.user.user_id
            ]
        );

        if (!result.rows.length) {
            return res.status(404).json({
                message: "Appointment not found or emergency request already submitted"
            });
        }

        return res.json({
            message: "Emergency request submitted successfully. Please inform hospital staff immediately.",
            token: result.rows[0]
        });

    } catch (error) {
        console.error("Emergency request error:", error.message);

        return res.status(500).json({
            message: "Could not submit emergency request"
        });
    }
}


// ==========================================
// RECEPTIONIST: GET PENDING REQUESTS
// ==========================================

async function getPendingEmergencyRequests(req, res) {
    try {

        if (req.user.role !== "receptionist") {
            return res.status(403).json({
                message: "Only receptionists can view emergency requests"
            });
        }

        const result = await pool.query(
            `SELECT
                t.token_id,
                t.token_number,
                t.queue_status,
                t.priority,
                t.emergency_requested,
                t.emergency_status,

                a.appointment_id,
                a.appointment_date,
                a.reason,

                u.user_id,
                u.full_name AS patient_name,
                u.phone,
                u.email,

                d.doctor_id,
                d.doctor_name,
                d.specialization

             FROM tokens t

             JOIN appointments a
             ON a.appointment_id = t.appointment_id

             JOIN users u
             ON u.user_id = a.patient_id

             JOIN doctors d
             ON d.doctor_id = a.doctor_id

             WHERE t.emergency_requested = TRUE
             AND t.emergency_status = 'pending'
             AND LOWER(t.queue_status) = 'waiting'

             ORDER BY t.created_at ASC`
        );

        return res.json(result.rows);

    } catch (error) {
        console.error("Pending emergency error:", error.message);

        return res.status(500).json({
            message: "Failed to fetch emergency requests"
        });
    }
}


// ==========================================
// RECEPTIONIST: APPROVE EMERGENCY REQUEST
// ==========================================

async function approveEmergencyRequest(req, res) {
    try {

        if (req.user.role !== "receptionist") {
            return res.status(403).json({
                message: "Only receptionists can approve emergency requests"
            });
        }

        const { appointmentId } = req.params;

        const result = await pool.query(
            `UPDATE tokens

             SET
                emergency_status = 'approved',
                priority = 1

             WHERE appointment_id = $1
             AND emergency_requested = TRUE
             AND emergency_status = 'pending'
             AND LOWER(queue_status) = 'waiting'

             RETURNING *`,
            [appointmentId]
        );

        if (!result.rows.length) {
            return res.status(404).json({
                message: "Pending emergency request not found"
            });
        }

        return res.json({
            message: "Emergency request approved successfully",
            token: result.rows[0]
        });

    } catch (error) {
        console.error("Emergency approval error:", error.message);

        return res.status(500).json({
            message: "Could not approve emergency request"
        });
    }
}


// ==========================================
// RECEPTIONIST: REJECT EMERGENCY REQUEST
// ==========================================

async function rejectEmergencyRequest(req, res) {
    try {

        if (req.user.role !== "receptionist") {
            return res.status(403).json({
                message: "Only receptionists can reject emergency requests"
            });
        }

        const { appointmentId } = req.params;

        const result = await pool.query(
            `UPDATE tokens

             SET
                emergency_status = 'rejected',
                priority = 0

             WHERE appointment_id = $1
             AND emergency_requested = TRUE
             AND emergency_status = 'pending'
             AND LOWER(queue_status) = 'waiting'

             RETURNING *`,
            [appointmentId]
        );

        if (!result.rows.length) {
            return res.status(404).json({
                message: "Pending emergency request not found"
            });
        }

        return res.json({
            message: "Emergency request rejected",
            token: result.rows[0]
        });

    } catch (error) {
        console.error("Emergency rejection error:", error.message);

        return res.status(500).json({
            message: "Could not reject emergency request"
        });
    }
}


// ==========================================
// EXPORT CONTROLLERS
// ==========================================

module.exports = {
    getAppointmentToken,
    getDoctorQueue,
    setEmergencyPriority,
    getPendingEmergencyRequests,
    approveEmergencyRequest,
    rejectEmergencyRequest
};