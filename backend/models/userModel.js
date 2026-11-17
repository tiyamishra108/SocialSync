const pool = require("../config/db");

async function findByEmail(email) {
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );
    return result.rows[0];
}

async function createUser({ full_name, email, password, phone }) {
    const result = await pool.query(
        `INSERT INTO users (full_name, email, password, phone, role)
         VALUES ($1, $2, $3, $4, 'patient')
         RETURNING user_id, full_name, email, phone, role, created_at`,
        [full_name, email, password, phone || null]
    );
    return result.rows[0];
}

module.exports = { findByEmail, createUser };
