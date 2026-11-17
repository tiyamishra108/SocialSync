const doctorModel = require("../models/doctorModel");

async function getDoctors(req, res) {
    try {
        const doctors = await doctorModel.getAllDoctors();
        res.json(doctors);
    } catch (error) {
        console.error("Get doctors error:", error.message);
        res.status(500).json({ message: "Failed to fetch doctors" });
    }
}

async function getDoctor(req, res) {
    try {
        const doctor = await doctorModel.getDoctorById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.json(doctor);
    } catch (error) {
        console.error("Get doctor error:", error.message);
        res.status(500).json({ message: "Failed to fetch doctor" });
    }
}

async function getDepartments(req, res) {
    try {
        const departments = await doctorModel.getDepartments();
        res.json(departments);
    } catch (error) {
        console.error("Get departments error:", error.message);
        res.status(500).json({ message: "Failed to fetch departments" });
    }
}

module.exports = { getDoctors, getDoctor, getDepartments };
