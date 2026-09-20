import { useState } from "react";
import doctors from "../../data/doctors";

function BookAppointment({ selectedDoctor, goTo }) {
  const [doctor, setDoctor] = useState(
    selectedDoctor ? selectedDoctor.id : ""
  );

  const [appointmentType, setAppointmentType] = useState("normal");

  const [date, setDate] = useState("");

  const [time, setTime] = useState("");

  const [success, setSuccess] = useState(false);

  const [token, setToken] = useState("");

  const handleBooking = (e) => {
    e.preventDefault();

    if (!doctor || !date || !time) {
      alert("Please fill all the required details.");
      return;
    }

    const selected = doctors.find(
      (item) => item.id === Number(doctor)
    );

    // Generate demo token
    const newToken = `T-${String(
      Math.floor(Math.random() * 80) + 20
    ).padStart(3, "0")}`;

    const appointment = {
      id: Date.now(),
      doctorId: selected.id,
      doctorName: selected.name,
      specialty: selected.specialty,
      appointmentType,
      date,
      time,
      token: newToken,
      status: "Confirmed",
    };

    // Get old appointments
    const oldAppointments =
      JSON.parse(localStorage.getItem("appointments")) || [];

    // Save new appointment
    localStorage.setItem(
      "appointments",
      JSON.stringify([...oldAppointments, appointment])
    );

    // Save current appointment
    localStorage.setItem(
      "currentAppointment",
      JSON.stringify(appointment)
    );

    setToken(newToken);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="booking-page">
        <div className="booking-success">

          <div className="success-icon">✓</div>

          <span className="success-badge">
            Appointment Confirmed
          </span>

          <h1>Your appointment is booked! 🎉</h1>

          <p>
            Your appointment with{" "}
            <strong>
              {
                doctors.find(
                  (doc) => doc.id === Number(doctor)
                )?.name
              }
            </strong>{" "}
            has been successfully scheduled.
          </p>

          <div className="token-display">
            <span>Your Token</span>
            <strong>{token}</strong>
          </div>

          <div className="success-actions">
            <button
              className="primary-btn"
              onClick={() => goTo("dashboard")}
            >
              Go to Dashboard
            </button>

            <button
              className="secondary-btn"
              onClick={() => goTo("doctors")}
            >
              View Doctors
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">

      <div className="booking-container">

        {/* Header */}

        <div className="booking-header">

          <button
            className="back-button"
            onClick={() => goTo("doctors")}
          >
            ← Back to Doctors
          </button>

          <span className="hero-badge">
            🏥 MediQueue Appointment
          </span>

          <h1>Book Your Appointment</h1>

          <p>
            Choose your doctor, appointment type and
            preferred time.
          </p>

        </div>

        {/* Main Booking Card */}

        <div className="booking-card">

          <form onSubmit={handleBooking}>

            {/* Doctor */}

            <div className="form-section">

              <h3>1. Select Doctor</h3>

              <p className="form-description">
                Choose the doctor you want to consult.
              </p>

              <div className="doctor-selection">

                {doctors.map((item) => (

                  <div
                    key={item.id}
                    className={`doctor-option ${
                      Number(doctor) === item.id
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => setDoctor(item.id)}
                  >

                    <div className="doctor-option-icon">
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="doctor-option-info">

                      <h4>{item.name}</h4>

                      <p>{item.specialty}</p>

                      <span>
                        ⭐ {item.rating} · {item.experience}
                      </span>

                    </div>

                    <div className="radio-circle">
                      {Number(doctor) === item.id && "✓"}
                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* Appointment Type */}

            <div className="form-section">

              <h3>2. Appointment Type</h3>

              <p className="form-description">
                Select the type of appointment you need.
              </p>

              <div className="appointment-types">

                <div
                  className={`appointment-type ${
                    appointmentType === "normal"
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setAppointmentType("normal")
                  }
                >
                  <div className="type-icon">📅</div>

                  <div>
                    <h4>Normal Appointment</h4>
                    <p>
                      Regular doctor consultation
                    </p>
                  </div>

                  <div className="radio-circle">
                    {appointmentType === "normal" && "✓"}
                  </div>
                </div>

                <div
                  className={`appointment-type emergency-type ${
                    appointmentType === "emergency"
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setAppointmentType("emergency")
                  }
                >
                  <div className="type-icon">🚨</div>

                  <div>
                    <h4>Urgent / Emergency</h4>
                    <p>
                      For genuine urgent situations
                    </p>
                  </div>

                  <div className="radio-circle">
                    {appointmentType === "emergency" && "✓"}
                  </div>
                </div>

              </div>

            </div>

            {/* Date & Time */}

            <div className="form-section">

              <h3>3. Choose Date & Time</h3>

              <p className="form-description">
                Select your preferred appointment slot.
              </p>

              <div className="date-time-grid">

                <div className="input-group">

                  <label>Appointment Date</label>

                  <input
                    type="date"
                    value={date}
                    min={new Date()
                      .toISOString()
                      .split("T")[0]}
                    onChange={(e) =>
                      setDate(e.target.value)
                    }
                    required
                  />

                </div>

                <div className="input-group">

                  <label>Preferred Time</label>

                  <select
                    value={time}
                    onChange={(e) =>
                      setTime(e.target.value)
                    }
                    required
                  >

                    <option value="">
                      Select time
                    </option>

                    <option value="10:00 AM">
                      10:00 AM
                    </option>

                    <option value="11:00 AM">
                      11:00 AM
                    </option>

                    <option value="12:00 PM">
                      12:00 PM
                    </option>

                    <option value="2:00 PM">
                      2:00 PM
                    </option>

                    <option value="3:00 PM">
                      3:00 PM
                    </option>

                    <option value="4:30 PM">
                      4:30 PM
                    </option>

                    <option value="5:30 PM">
                      5:30 PM
                    </option>

                  </select>

                </div>

              </div>

            </div>

            {/* Summary */}

            <div className="booking-summary">

              <div>

                <span>Selected Doctor</span>

                <strong>
                  {doctor
                    ? doctors.find(
                        (item) =>
                          item.id === Number(doctor)
                      )?.name
                    : "Not selected"}
                </strong>

              </div>

              <div>

                <span>Appointment Type</span>

                <strong>
                  {appointmentType === "normal"
                    ? "Normal"
                    : "Urgent / Emergency"}
                </strong>

              </div>

              <div>

                <span>Date</span>

                <strong>
                  {date || "Not selected"}
                </strong>

              </div>

              <div>

                <span>Time</span>

                <strong>
                  {time || "Not selected"}
                </strong>

              </div>

            </div>

            <button
              type="submit"
              className="primary-btn booking-submit"
            >
              Confirm Appointment →
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default BookAppointment;