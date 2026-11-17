const pool = require("../config/db");

async function getPatientAppointments(patientId) {
    const result = await pool.query(`
        SELECT a.appointment_id, a.patient_id, a.doctor_id,
               a.appointment_date, a.reason, a.status, a.created_at,
               d.doctor_name, d.specialization, dep.department_name,
               t.token_id, t.token_number, t.queue_status, t.priority
        FROM appointments a
        JOIN doctors d ON d.doctor_id = a.doctor_id
        LEFT JOIN departments dep ON dep.department_id = d.department_id
        LEFT JOIN tokens t ON t.appointment_id = a.appointment_id
        WHERE a.patient_id = $1
        ORDER BY a.appointment_date DESC
    `, [patientId]);
    return result.rows;
}

module.exports = { getPatientAppointments };