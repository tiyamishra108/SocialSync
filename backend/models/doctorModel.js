const pool = require("../config/db");

async function getAllDoctors() {
    const result = await pool.query(`
        SELECT d.doctor_id, d.doctor_name, d.specialization,
               d.experience, d.consultation_fee, d.is_available,
               d.rating, d.availability, d.image,
               dep.department_id, dep.department_name
        FROM doctors d
        LEFT JOIN departments dep
          ON d.department_id = dep.department_id
        ORDER BY d.doctor_id
    `);
    return result.rows;
}

async function getDoctorById(doctorId) {
    const result = await pool.query(`
        SELECT d.doctor_id, d.doctor_name, d.specialization,
               d.experience, d.consultation_fee, d.is_available,
               d.rating, d.availability, d.image,
               dep.department_id, dep.department_name
        FROM doctors d
        LEFT JOIN departments dep
          ON d.department_id = dep.department_id
        WHERE d.doctor_id = $1
    `, [doctorId]);
    return result.rows[0];
}

async function getDepartments() {
    const result = await pool.query(
        "SELECT department_id, department_name FROM departments ORDER BY department_name"
    );
    return result.rows;
}

module.exports = { getAllDoctors, getDoctorById, getDepartments };
