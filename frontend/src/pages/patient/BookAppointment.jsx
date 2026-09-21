import { useMemo, useState } from "react";
import doctors from "../../data/doctors";

const departmentConcerns = {
  Cardiology: [
    "Chest discomfort",
    "Palpitations",
    "High blood pressure",
    "Shortness of breath",
    "Heart check-up",
  ],
  Dermatology: [
    "Acne",
    "Skin rash",
    "Itching",
    "Hair loss",
    "Skin irritation",
  ],
  Orthopedics: [
    "Joint pain",
    "Back pain",
    "Knee pain",
    "Sports injury",
    "Fracture / injury",
  ],
  Pediatrics: [
    "Fever",
    "Cold & cough",
    "Stomach pain",
    "Vaccination",
    "General check-up",
  ],
  Neurology: [
    "Headache",
    "Migraine",
    "Dizziness",
    "Numbness",
    "Memory concerns",
  ],
  Ophthalmology: [
    "Eye irritation",
    "Blurred vision",
    "Eye pain",
    "Red eyes",
    "Vision check-up",
  ],
  "General Medicine": [
    "Fever",
    "Cold & cough",
    "Weakness",
    "Stomach discomfort",
    "General check-up",
  ],
};

const urgentConcerns = new Set([
  "Chest discomfort",
  "Shortness of breath",
  "Fracture / injury",
  "Blurred vision",
  "Eye pain",
]);

const waitingGuidance = (concern) => ({
  title: urgentConcerns.has(concern) ? "Please keep an eye on your symptoms" : "While you wait",
  urgent: urgentConcerns.has(concern),
  tips: [
    "Keep a note of when the concern started and anything that changes it.",
    "Have relevant medical information or current medicines ready for your appointment if available.",
    "This information is general and is not a diagnosis or treatment plan.",
    ...(urgentConcerns.has(concern)
      ? ["If symptoms are severe, sudden or rapidly worsening, seek emergency medical help rather than waiting for the appointment."]
      : []),
  ],
});

function BookAppointment({ selectedDoctor, goTo }) {
  const [department, setDepartment] = useState(
    selectedDoctor?.department || ""
  );
  const [doctor, setDoctor] = useState(
    selectedDoctor ? selectedDoctor.id : ""
  );
  const [appointmentType, setAppointmentType] = useState("normal");
  const [concern, setConcern] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState("");

  const departments = useMemo(
    () => [...new Set(doctors.map((item) => item.department).filter(Boolean))],
    []
  );

  const filteredDoctors = useMemo(() => {
    if (!department) return [];
    return doctors.filter((item) => item.department === department);
  }, [department]);

  const selected = doctors.find((item) => item.id === Number(doctor));
  const concerns = departmentConcerns[department] || [];
  const guidance = waitingGuidance(concern);

  const handleDepartmentChange = (value) => {
    setDepartment(value);
    setConcern("");
    const firstDoctor = doctors.find((item) => item.department === value);
    setDoctor(firstDoctor ? firstDoctor.id : "");
  };

  const handleBooking = (e) => {
    e.preventDefault();

    if (!department || !doctor || !concern || !date || !time) {
      alert("Please fill all the required details.");
      return;
    }

    if (!selected) {
      alert("Please select a valid doctor.");
      return;
    }

    const newToken = `T-${String(
      Math.floor(Math.random() * 80) + 20
    ).padStart(3, "0")}`;

    const appointment = {
      id: Date.now(),
      doctorId: selected.id,
      doctorName: selected.name,
      specialty: selected.specialty,
      department: selected.department,
      appointmentType,
      concern,
      date,
      time,
      token: newToken,
      status: "Confirmed",
    };

    const oldAppointments =
      JSON.parse(localStorage.getItem("appointments")) || [];

    localStorage.setItem(
      "appointments",
      JSON.stringify([...oldAppointments, appointment])
    );

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

          <span className="success-badge">Appointment Confirmed</span>

          <h1>Your appointment is booked! 🎉</h1>

          <p>
            Your appointment with <strong>{selected?.name}</strong> has been
            successfully scheduled.
          </p>

          <div className="token-display">
            <span>Your Token</span>
            <strong>{token}</strong>
          </div>

          <div className={`while-wait-card ${guidance.urgent ? "urgent" : ""}`}>
            <div className="while-wait-heading">
              <span>🌿</span>
              <div>
                <span className="small-label">WHILE YOU WAIT</span>
                <h3>{guidance.title}</h3>
              </div>
            </div>

            <p className="while-wait-concern">
              You mentioned: <strong>{concern}</strong>
            </p>

            <ul>
              {guidance.tips.map((tip) => (
                <li key={tip}>✓ {tip}</li>
              ))}
            </ul>

            <p className="while-wait-note">
              General information only — this does not diagnose or replace medical advice.
            </p>
          </div>

          <div className="success-actions">
            <button
              className="primary-btn"
              onClick={() => goTo("dashboard")}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-container">
        <div className="booking-header">
          <button className="back-button" onClick={() => goTo("doctors")}>
            ← Back to Doctors
          </button>

          <span className="hero-badge">🏥 MediQueue Appointment</span>

          <h1>Book Your Appointment</h1>
          <p>
            Choose your department, doctor, concern and preferred time.
          </p>
        </div>

        <div className="booking-card">
          <form onSubmit={handleBooking}>
            <div className="form-section">
              <h3>1. Select Department</h3>
              <p className="form-description">
                Start with the department that best matches your concern.
              </p>

              {selectedDoctor ? (
                <div className="locked-department">
                  <span>Selected department</span>
                  <strong>{department}</strong>
                  <small>{selectedDoctor.name} is from this department.</small>
                </div>
              ) : (
                <div className="input-group">
                  <label>Department</label>
                  <select
                    value={department}
                    onChange={(e) => handleDepartmentChange(e.target.value)}
                    required
                  >
                    <option value="">Choose a department</option>
                    {departments.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="form-section">
              <h3>2. Select Doctor</h3>
              <p className="form-description">
                {department
                  ? `Showing doctors from ${department}.`
                  : "Choose a department first."}
              </p>

              <div className="doctor-selection">
                {filteredDoctors.map((item) => (
                  <div
                    key={item.id}
                    className={`doctor-option ${Number(doctor) === item.id ? "selected" : ""}`}
                    onClick={() => setDoctor(item.id)}
                  >
                    <div className="doctor-option-icon">
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="doctor-option-info">
                      <h4>{item.name}</h4>
                      <p>{item.specialty}</p>
                      <span>⭐ {item.rating} · {item.experience}</span>
                    </div>

                    <div className="radio-circle">
                      {Number(doctor) === item.id && "✓"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-section">
              <h3>3. What are you visiting for?</h3>
              <p className="form-description">
                This helps us show general information while you wait. It is not a diagnosis.
              </p>

              <div className="concern-grid">
                {concerns.map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={`concern-option ${concern === item ? "selected" : ""}`}
                    onClick={() => setConcern(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-section">
              <h3>4. Appointment Type</h3>
              <p className="form-description">
                Select the type of appointment you need.
              </p>

              <div className="appointment-types">
                <div
                  className={`appointment-type ${appointmentType === "normal" ? "selected" : ""}`}
                  onClick={() => setAppointmentType("normal")}
                >
                  <div className="type-icon">📅</div>
                  <div>
                    <h4>Normal Appointment</h4>
                    <p>Regular doctor consultation</p>
                  </div>
                  <div className="radio-circle">
                    {appointmentType === "normal" && "✓"}
                  </div>
                </div>

                <div
                  className={`appointment-type emergency-type ${appointmentType === "emergency" ? "selected" : ""}`}
                  onClick={() => setAppointmentType("emergency")}
                >
                  <div className="type-icon">🚨</div>
                  <div>
                    <h4>Urgent / Emergency</h4>
                    <p>For genuine urgent situations</p>
                  </div>
                  <div className="radio-circle">
                    {appointmentType === "emergency" && "✓"}
                  </div>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>5. Choose Date & Time</h3>
              <p className="form-description">
                Select your preferred appointment slot.
              </p>

              <div className="date-time-grid">
                <div className="input-group">
                  <label>Appointment Date</label>
                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Preferred Time</label>
                  <select value={time} onChange={(e) => setTime(e.target.value)} required>
                    <option value="">Select time</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:30 PM">4:30 PM</option>
                    <option value="5:30 PM">5:30 PM</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="booking-summary">
              <div>
                <span>Department</span>
                <strong>{department || "Not selected"}</strong>
              </div>
              <div>
                <span>Doctor</span>
                <strong>{selected?.name || "Not selected"}</strong>
              </div>
              <div>
                <span>Concern</span>
                <strong>{concern || "Not selected"}</strong>
              </div>
              <div>
                <span>Date & Time</span>
                <strong>{date ? `${date} · ${time || "Time pending"}` : "Not selected"}</strong>
              </div>
            </div>

            <button type="submit" className="primary-btn booking-submit">
              Confirm Appointment →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;
