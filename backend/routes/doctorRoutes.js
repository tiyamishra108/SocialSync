const express = require("express");
const router = express.Router();

const {
    getDoctors,
    getDoctor,
    getDepartments
} = require("../controllers/doctorController");

// Get all doctors
router.get("/", getDoctors);

// Get all departments
router.get("/departments", getDepartments);

// Get doctor by ID
router.get("/:id", getDoctor);

module.exports = router;