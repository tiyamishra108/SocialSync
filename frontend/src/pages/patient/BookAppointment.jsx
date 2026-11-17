import { useMemo, useState } from "react";
import doctors from "../../data/doctors";

const departmentConcerns = {
  Cardiology: ["Chest discomfort", "Palpitations", "High blood pressure", "Shortness of breath", "Heart check-up"],
  Dermatology: ["Acne", "Skin rash", "Itching", "Hair loss", "Skin irritation"],
  Orthopedics: ["Joint pain", "Back pain", "Knee pain", "Sports injury", "Fracture / injury"],
  Pediatrics: ["Fever", "Cold & cough", "Stomach pain", "Vaccination", "General check-up"],
  Neurology: ["Headache", "Migraine", "Dizziness", "Numbness", "Memory concerns"],
  Ophthalmology: ["Eye irritation", "Blurred vision", "Eye pain", "Red eyes", "Vision check-up"],
  "General Medicine": ["Fever", "Cold & cough", "Weakness", "Stomach discomfort", "General check-up"],
};

const urgentConcerns = new Set([
  "Chest discomfort",
  "Shortness of breath",
  "Fracture / injury",
  "Blurred vision",
  "Eye pain",
]);

const getConsultationFee = (doctor) => {
  if (!doctor) return 0;
  if (doctor.consultation_fee != null) return Number(doctor.consultation_fee);

  const years = parseInt(doctor.experience, 10);
  if (years >= 7 && years <= 8) return 500;
  if (years >= 9 && years <= 10) return 600;
  if (years >= 11 && years <= 12) return 700;
  if (years >= 13 && years <= 14) return 800;
  if (years === 15) return 900;
  return 500;
};

const waitingGuidance = (concern) => {
  const isUrgent = urgentConcerns.has(concern);
  return {
    title: isUrgent ? "Please keep an eye on your symptoms" : "While you wait",
    urgent: isUrgent,
    tips: [
      "Keep a note of when the concern started and anything that changes it.",
      "Have relevant medical information or current medicines ready for your appointment if available.",
      "This information is general and is not a diagnosis or treatment plan.",
      ...(isUrgent ? [
        "If symptoms are severe, sudden or rapidly worsening, seek emergency medical help rather than waiting for the appointment.",
      ] : []),
    ],
  };
};

const getLoggedInUser = () => {
  try {
    return JSON.parse(localStorage.getItem("currentUser") || "{}");
  } catch {
    return {};
  }
};

function BookAppointment({ selectedDoctor, goTo }) {
  const [department, setDepartment] = useState(selectedDoctor?.department || "");
  const [doctor, setDoctor] = useState(selectedDoctor ? selectedDoctor.id : "");
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

  const selected = doctors.find((item) => String(item.id) === String(doctor));
  const consultationFee = getConsultationFee(selected);
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

    const user = getLoggedInUser();
    const userEmail = user.email?.trim().toLowerCase();
    const userId = user.id || userEmail;

    if (!userId || !userEmail) {
      alert("Please login again before booking an appointment.");
      goTo("login");
      return;
    }

    const newToken = `T-${String(Math.floor(Math.random() * 80) + 20).padStart(3, "0")}`;

    const appointment = {
      id: Date.now(),
      userId,
      userEmail,
      patientName: user.name || "Patient",
      doctorId: selected.id,
      doctorName: selected.name,
      specialty: selected.specialty,
      department: selected.department,
      appointmentType,
      concern,
      date,
      time,
      token: newToken,
      estimatedWait: "30 min",
      status: "Confirmed",
      consultationFee,
      paymentStatus: "Pay at Hospital",
    };

    const oldAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    localStorage.setItem("appointments", JSON.stringify([...oldAppointments, appointment]));
    localStorage.setItem("currentAppointment", JSON.stringify(appointment));

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
            Your appointment with <strong>{selected?.name}</strong> has been successfully scheduled.
          </p>
          <div className="token-display">
            <span>Your Token</span>
            <strong>{token}</strong>
          </div>

          <div className="booking-summary">
            <div><span>Doctor</span><strong>{selected?.name}</strong></div>
            <div><span>Consultation Fee</span><strong>₹{consultationFee}</strong></div>
            <div><span>Payment Status</span><strong>Pay at Hospital</strong></div>
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
              {guidance.tips.map((tip) => <li key={tip}>✓ {tip}</li>)}
            </ul>
            <p className="while-wait-note">
              General information only — this does not diagnose or replace medical advice.
            </p>
          </div>

          <div className="success-actions">
            <button className="primary-btn" onClick={() => goTo("dashboard")}>
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
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}>
            <h1>Book Your Appointment</h1>
            <button className="back-button" onClick={() => goTo("doctors")}>
              ← Back to Doctors
            </button>
          </div>
          <p>Choose your department, doctor, concern and preferred time.</p>
        </div>

        <div className="booking-card">
          <form onSubmit={handleBooking}>
            <div className="form-section">
              {selectedDoctor ? (
                <div className="locked-department">
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

            {!selectedDoctor && department && (
              <div className="form-section">
                <h3>Select Doctor</h3>
                <div className="input-group">
                  <select
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    required
                  >
                    {filteredDoctors.map((item) => (
                      <option key={item.id} value={item.id}>{item.name} — {item.specialty}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="form-section">
              <h3>What are you visiting for?</h3>
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
              <h3>Appointment Type</h3>
              <p className="form-description">Select the type of appointment you need.</p>
              <div className="appointment-types">
                <div
                  className={`appointment-type ${appointmentType === "normal" ? "selected" : ""}`}
                  onClick={() => setAppointmentType("normal")}
                >
                  <div className="type-icon">📅</div>
                  <div><h4>Normal Appointment</h4><p>Regular doctor consultation</p></div>
                  <div className="radio-circle">{appointmentType === "normal" && "✓"}</div>
                </div>

                <div
                  className={`appointment-type emergency-type ${appointmentType === "emergency" ? "selected" : ""}`}
                  onClick={() => setAppointmentType("emergency")}
                >
                  <div className="type-icon">🚨</div>
                  <div><h4>Urgent / Emergency</h4><p>For genuine urgent situations</p></div>
                  <div className="radio-circle">{appointmentType === "emergency" && "✓"}</div>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Choose Date & Time</h3>
              <p className="form-description">Select your preferred appointment slot.</p>
              <div className="date-time-grid">
                <div className="input-group">
                  <label>Appointment Date</label>
                  <input
                    type="date"
                    value={date}
                    min={new Date().getFullYear() + "-" +
                      String(new Date().getMonth() + 1).padStart(2, "0") + "-" +
                      String(new Date().getDate()).padStart(2, "0")}
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
              <div><span>Department</span><strong>{department || "Not selected"}</strong></div>
              <div><span>Doctor</span><strong>{selected?.name || "Not selected"}</strong></div>
              <div><span>Concern</span><strong>{concern || "Not selected"}</strong></div>
              <div>
                <span>Date & Time</span>
                <strong>{date ? `${date} · ${time || "Time pending"}` : "Not selected"}</strong>
              </div>
              <div><span>Consultation Fee</span><strong>₹{consultationFee}</strong></div>
              <div><span>Payment Method</span><strong>Pay at Hospital</strong></div>
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
