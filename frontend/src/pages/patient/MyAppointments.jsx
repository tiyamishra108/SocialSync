import { useEffect, useState } from "react";

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("currentUser") || "{}");
  } catch {
    return {};
  }
};

const belongsToUser = (appointment, user) => {
  const userId = user.id || user.email?.toLowerCase();
  const appointmentId = appointment.userId || appointment.userEmail?.toLowerCase();

  // Do not expose older appointments without an owner to a newly logged-in account.
  return Boolean(userId && appointmentId && appointmentId === userId);
};

function MyAppointments({ goTo }) {
  const [appointments, setAppointments] = useState(() => {
    const user = getCurrentUser();
    try {
      const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
      return allAppointments.filter((appointment) => belongsToUser(appointment, user));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const user = getCurrentUser();
    try {
      const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
      setAppointments(allAppointments.filter((appointment) => belongsToUser(appointment, user)));
    } catch {
      setAppointments([]);
    }
  }, []);

  const cancelAppointment = (id) => {
    const user = getCurrentUser();
    const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");

    const updatedAllAppointments = allAppointments.map((appointment) =>
      appointment.id === id && belongsToUser(appointment, user)
        ? { ...appointment, status: "Cancelled" }
        : appointment
    );

    localStorage.setItem("appointments", JSON.stringify(updatedAllAppointments));
    setAppointments(updatedAllAppointments.filter((appointment) => belongsToUser(appointment, user)));

    const currentAppointment = JSON.parse(localStorage.getItem("currentAppointment") || "null");
    if (
      currentAppointment?.id === id &&
      belongsToUser(currentAppointment, user)
    ) {
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
        <span className="patient-page-badge">📅 MY APPOINTMENTS</span>
      </div>

      <div className="patient-page-header">
        <span className="small-label">UPCOMING VISITS</span>
        <h1>My Appointments</h1>
        <p>
          View your appointments, track your queue and manage your upcoming hospital visits.
        </p>
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
          {appointments.slice().reverse().map((appointment) => (
            <div className="appointment-full-card" key={appointment.id}>
              <div className="appointment-card-main">
                <div className="appointment-doctor-avatar">👨‍⚕️</div>
                <div className="appointment-doctor-info">
                  <div className="appointment-title-row">
                    <h2>{appointment.doctorName}</h2>
                    <span
                      className={`appointment-status ${
                        appointment.status === "Cancelled" ? "cancelled" : "confirmed"
                      }`}
                    >
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
                <div>
                  <span>TYPE</span>
                  <strong>{appointment.appointmentType === "emergency" ? "Urgent" : "Normal"}</strong>
                </div>
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
