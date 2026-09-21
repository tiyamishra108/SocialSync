import { useState } from "react";

function MyAppointments({ goTo }) {
  const [appointments, setAppointments] = useState(() =>
    JSON.parse(localStorage.getItem("appointments")) || []
  );

  const cancelAppointment = (id) => {
    const updated = appointments.map((item) =>
      item.id === id ? { ...item, status: "Cancelled" } : item
    );

    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));

    const current = JSON.parse(localStorage.getItem("currentAppointment"));
    if (current?.id === id) {
      localStorage.removeItem("currentAppointment");
    }
  };

  const trackAppointment = (appointment) => {
    if (appointment.status === "Cancelled") return;
    localStorage.setItem("currentAppointment", JSON.stringify(appointment));
    goTo("queueStatus");
  };

  return (
    <div className="patient-page">
      <div className="patient-page-topbar">
        <button className="back-button" onClick={() => goTo("dashboard")}>
          ← Back to Dashboard
        </button>
        <span className="patient-page-badge">📚 APPOINTMENT HISTORY</span>
      </div>

      <div className="patient-page-header">
        <span className="small-label">FULL HISTORY</span>
        <h1>Appointment History</h1>
        <p>All your appointments are kept here, including active, completed, past and cancelled visits.</p>
      </div>

      {appointments.length === 0 ? (
        <div className="patient-empty-card">
          <div className="patient-empty-icon">📅</div>
          <h2>No appointments yet</h2>
          <p>Book an appointment to receive your digital token.</p>
          <button className="primary-btn" onClick={() => goTo("doctors")}>
            Find a Doctor →
          </button>
        </div>
      ) : (
        <div className="appointments-container">
          {appointments
            .slice()
            .reverse()
            .map((appointment) => (
              <div className="appointment-full-card" key={appointment.id}>
                <div className="appointment-card-main">
                  <div className="appointment-doctor-avatar">👨‍⚕️</div>
                  <div className="appointment-doctor-info">
                    <div className="appointment-title-row">
                      <h2>{appointment.doctorName}</h2>
                      <span className={`appointment-status ${appointment.status === "Cancelled" ? "cancelled" : "confirmed"}`}>
                        {appointment.status}
                      </span>
                    </div>
                    <p>{appointment.specialty}</p>
                    <span>{appointment.department || appointment.specialty}</span>
                  </div>
                </div>

                <div className="appointment-meta-grid">
                  <div><span>DATE</span><strong>{appointment.date}</strong></div>
                  <div><span>TIME</span><strong>{appointment.time}</strong></div>
                  <div><span>TOKEN</span><strong>{appointment.token}</strong></div>
                  <div><span>TYPE</span><strong>{appointment.appointmentType === "emergency" ? "Urgent" : "Normal"}</strong></div>
                  {appointment.concern && (
                    <div><span>CONCERN</span><strong>{appointment.concern}</strong></div>
                  )}
                </div>

                <div className="appointment-card-actions">
                  <button
                    className="secondary-btn"
                    disabled={appointment.status === "Cancelled"}
                    onClick={() => trackAppointment(appointment)}
                  >
                    Track Queue →
                  </button>
                  <button
                    className="cancel-btn"
                    disabled={appointment.status === "Cancelled"}
                    onClick={() => cancelAppointment(appointment.id)}
                  >
                    {appointment.status === "Cancelled" ? "Cancelled" : "Cancel Appointment"}
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default MyAppointments;
