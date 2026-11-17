const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
    bookAppointment,
    getMyAppointments,
    cancelAppointment
} = require("../controllers/appointmentController");

router.use(authMiddleware);
router.post("/", bookAppointment);
router.get("/my", getMyAppointments);
router.patch("/:id/cancel", cancelAppointment);

module.exports = router;
