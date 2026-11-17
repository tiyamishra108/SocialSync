const pool = require("../config/db");
const appointmentModel = require("../models/appointmentModel");


// BOOK APPOINTMENT
async function bookAppointment(req, res) {
    const patientId = req.user.user_id;

    const {
        doctor_id,
        appointment_date,
        reason
    } = req.body;

    if (!doctor_id || !appointment_date || !reason) {
        return res.status(400).json({
            message: "Doctor, appointment date and reason are required"
        });
    }

    let client;
    let transactionStarted = false;

    try {
        client = await pool.connect();

        await client.query("BEGIN");
        transactionStarted = true;

        // Lock doctor row to prevent duplicate token numbers
        const doctorResult = await client.query(
            `SELECT doctor_id, is_available
             FROM doctors
             WHERE doctor_id = $1
             FOR UPDATE`,
            [doctor_id]
        );

        if (!doctorResult.rows.length) {
            await client.query("ROLLBACK");
            transactionStarted = false;

            return res.status(404).json({
                message: "Doctor not found"
            });
        }

        if (doctorResult.rows[0].is_available === false) {
            await client.query("ROLLBACK");
            transactionStarted = false;

            return res.status(400).json({
                message: "Doctor is currently unavailable"
            });
        }

        // Create appointment
        const appointmentResult = await client.query(
            `INSERT INTO appointments
             (patient_id, doctor_id, appointment_date, reason, status)
             VALUES ($1, $2, $3, $4, 'Booked')
             RETURNING *`,
            [
                patientId,
                doctor_id,
                appointment_date,
                reason
            ]
        );

        const appointment = appointmentResult.rows[0];

        // Generate next token number for this doctor and date
        const tokenResult = await client.query(
            `SELECT COALESCE(MAX(t.token_number), 0) + 1 AS next_token
             FROM tokens t
             JOIN appointments a
             ON a.appointment_id = t.appointment_id
             WHERE a.doctor_id = $1
             AND a.appointment_date::date = $2::date`,
            [
                doctor_id,
                appointment_date
            ]
        );

        const tokenNumber = Number(
            tokenResult.rows[0].next_token
        );

        // Create token with Normal priority
        const newToken = await client.query(
            `INSERT INTO tokens
             (
                appointment_id,
                token_number,
                queue_status,
                priority,
                emergency_requested
             )
             VALUES ($1, $2, 'Waiting', 0, FALSE)
             RETURNING *`,
            [
                appointment.appointment_id,
                tokenNumber
            ]
        );

        await client.query("COMMIT");
        transactionStarted = false;

        return res.status(201).json({
            message: "Appointment booked successfully",
            appointment,
            token: newToken.rows[0]
        });

    } catch (error) {

        if (client && transactionStarted) {
            await client.query("ROLLBACK").catch(() => {});
        }

        console.error(
            "Book appointment error:",
            error.message
        );

        return res.status(500).json({
            message: "Could not book appointment"
        });

    } finally {

        if (client) {
            client.release();
        }
    }
}


// GET MY APPOINTMENTS
async function getMyAppointments(req, res) {
    try {

        const appointments =
            await appointmentModel.getPatientAppointments(
                req.user.user_id
            );

        return res.json(appointments);

    } catch (error) {

        console.error(
            "Get appointments error:",
            error.message
        );

        return res.status(500).json({
            message: "Failed to fetch appointments"
        });
    }
}


// CANCEL APPOINTMENT
async function cancelAppointment(req, res) {
    let client;
    let transactionStarted = false;

    try {

        client = await pool.connect();

        await client.query("BEGIN");
        transactionStarted = true;

        const result = await client.query(
            `UPDATE appointments
             SET status = 'Cancelled'
             WHERE appointment_id = $1
             AND patient_id = $2
             AND LOWER(status) <> 'cancelled'
             RETURNING appointment_id`,
            [
                req.params.id,
                req.user.user_id
            ]
        );

        if (!result.rows.length) {

            await client.query("ROLLBACK");
            transactionStarted = false;

            return res.status(404).json({
                message: "Appointment not found or already cancelled"
            });
        }

        // Cancel associated token
        await client.query(
            `UPDATE tokens
             SET queue_status = 'Cancelled'
             WHERE appointment_id = $1`,
            [req.params.id]
        );

        await client.query("COMMIT");
        transactionStarted = false;

        return res.json({
            message: "Appointment cancelled successfully"
        });

    } catch (error) {

        if (client && transactionStarted) {
            await client.query("ROLLBACK").catch(() => {});
        }

        console.error(
            "Cancel appointment error:",
            error.message
        );

        return res.status(500).json({
            message: "Could not cancel appointment"
        });

    } finally {

        if (client) {
            client.release();
        }
    }
}


module.exports = {
    bookAppointment,
    getMyAppointments,
    cancelAppointment
};