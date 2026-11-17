const pool = require("../config/db");

async function getTokenByAppointmentId(appointmentId) {

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
            a.doctor_id,

            d.doctor_name,
            d.specialization

         FROM tokens t

         JOIN appointments a
         ON a.appointment_id = t.appointment_id

         JOIN doctors d
         ON d.doctor_id = a.doctor_id

         WHERE a.appointment_id = $1`,
        [appointmentId]
    );

    return result.rows[0];
}

module.exports = {
    getTokenByAppointmentId
};