const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getAppointmentToken,
    getDoctorQueue,
    setEmergencyPriority,
    getPendingEmergencyRequests,
    approveEmergencyRequest,
    rejectEmergencyRequest
} = require("../controllers/tokenController");

// Protect all token routes
router.use(authMiddleware);

// Doctor queue
router.get("/doctor/:doctorId", getDoctorQueue);

// Appointment token
router.get("/appointment/:appointmentId", getAppointmentToken);

// Patient emergency request
router.patch("/emergency/:appointmentId", setEmergencyPriority);

// Receptionist: pending requests
router.get("/emergency/pending", getPendingEmergencyRequests);

// Receptionist: approve request
router.patch("/emergency/:appointmentId/approve", approveEmergencyRequest);

// Receptionist: reject request
router.patch("/emergency/:appointmentId/reject", rejectEmergencyRequest);

module.exports = router;