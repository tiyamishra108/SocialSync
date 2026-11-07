import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";

function AdminDashboard({ goTo }) {
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = () => {
    const saved = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );

    setAppointments(saved);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const activeAppointments = appointments.filter(
    (appointment) => appointment.status !== "Cancelled"
  );

  const cancelledAppointments = appointments.filter(
    (appointment) => appointment.status === "Cancelled"
  );

  const inProgress = appointments.filter(
    (appointment) => appointment.status === "In Progress"
  );

  const confirmed = appointments.filter(
    (appointment) =>
      appointment.status === "Confirmed" ||
      appointment.status === "Upcoming"
  );

  const actionCards = [
    {
      icon: "📅",
      title: "Manage Appointments",
      description: "Review and update patient bookings.",
      page: "manageAppointments",
      color: "blue"
    },
    {
      icon: "🎟️",
      title: "Queue Management",
      description: "Monitor doctor-wise patient queues.",
      page: "queueManagement",
      color: "purple"
    },
    {
      icon: "🚨",
      title: "Emergency Assistance",
      description: "Access emergency assistance.",
      page: "emergency",
      color: "red"
    }
  ];

  const recentAppointments = appointments
    .slice()
    .reverse()
    .slice(0, 5);

  return (
    <div className="dashboard-layout">

      <Sidebar
        currentPage="receptionistDashboard"
        goTo={goTo}
      />

      <main className="dashboard-main receptionist-dashboard">

        <div className="receptionist-welcome">
          <div>
            <span className="receptionist-eyebrow">
              RECEPTIONIST PORTAL
            </span>

            <h1>Welcome Back! 👋</h1>

            <p>
              Here's what's happening at your hospital today.
            </p>
          </div>

          <div className="receptionist-date">
            <span>📅</span>
            <div>
              <small>TODAY</small>
              <strong>
                {new Date().toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </strong>
            </div>
          </div>

        </div>

        <div className="receptionist-stats">

          <div className="receptionist-stat-card">
            <div className="receptionist-stat-top">
              <span>Total Appointments</span>
              <div className="receptionist-stat-icon blue">📅</div>
            </div>
            <h2>{appointments.length}</h2>
            <small>All patient bookings</small>
          </div>

          <div className="receptionist-stat-card">
            <div className="receptionist-stat-top">
              <span>Active Patients</span>
              <div className="receptionist-stat-icon green">👥</div>
            </div>
            <h2>{activeAppointments.length}</h2>
            <small>Currently active bookings</small>
          </div>

          <div className="receptionist-stat-card">
            <div className="receptionist-stat-top">
              <span>In Progress</span>
              <div className="receptionist-stat-icon orange">⏳</div>
            </div>
            <h2>{inProgress.length}</h2>
            <small>Patients being attended</small>
          </div>

          <div className="receptionist-stat-card">
            <div className="receptionist-stat-top">
              <span>Confirmed</span>
              <div className="receptionist-stat-icon purple">✓</div>
            </div>
            <h2>{confirmed.length}</h2>
            <small>Confirmed or upcoming</small>
          </div>

        </div>

        <div className="receptionist-content-grid">
          <section className="receptionist-panel">
            <div className="receptionist-panel-header">
              <div>
                <span className="receptionist-eyebrow">
                  PATIENT ACTIVITY
                </span>
                <h2>Recent Appointments</h2>
              </div>

              <button
                className="receptionist-view-all"
                onClick={() => goTo("manageAppointments")}
              >
                View All →
              </button>
            </div>

            {recentAppointments.length > 0 ? (
              <div className="receptionist-appointments">
                {recentAppointments.map((appointment, index) => (
                  <div
                    className="receptionist-appointment"
                    key={appointment.id || index}
                  >

                    <div className="receptionist-patient-avatar">
                      {(appointment.patientName || "P")
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="receptionist-patient-details">
                      <strong>
                        {appointment.patientName || "Patient"}
                      </strong>
                      <span>
                        {appointment.doctorName || "Doctor"}
                      </span>
                      <small>
                        {appointment.department || "General"}
                      </small>
                    </div>

                    <div className="receptionist-appointment-date">
                      <strong>
                        {appointment.date || "Date unavailable"}
                      </strong>
                      <span>
                        {appointment.time || "Time unavailable"}
                      </span>
                    </div>

                    <span
                      className={`receptionist-status ${
                        appointment.status === "Cancelled"
                          ? "status-cancelled"
                          : appointment.status === "In Progress"
                          ? "status-progress"
                          : appointment.status === "Confirmed"
                          ? "status-confirmed"
                          : "status-upcoming"
                      }`}
                    >
                      {appointment.status || "Upcoming"}
                    </span>

                  </div>

                ))}
              </div>
            ) : (

              <div className="receptionist-empty">
                <span>📋</span>
                <h3>No appointments yet</h3>
                <p>Patient bookings will appear here.</p>
              </div>
            )}
          </section>

          <section className="receptionist-panel receptionist-actions-panel">
            <div className="receptionist-panel-header">
              <div>
                <span className="receptionist-eyebrow">
                  SHORTCUTS
                </span>
                <h2>Quick Actions</h2>
              </div>
            </div>

            <div className="receptionist-actions">
              {actionCards.map((card) => (
                <button
                  className="receptionist-action"
                  key={card.title}
                  onClick={() => goTo(card.page)}
                >
                  <span className={`receptionist-action-icon ${card.color}`}>
                    {card.icon}
                  </span>
                  <span className="receptionist-action-text">
                    <strong>{card.title}</strong>
                    <small>{card.description}</small>
                  </span>
                  <span className="receptionist-action-arrow">
                    →
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>

        <section className="receptionist-panel receptionist-summary">
          <div className="receptionist-panel-header">
            <div>
              <span className="receptionist-eyebrow">
                OVERVIEW
              </span>
              <h2>Appointment Status</h2>
            </div>
          </div>

          <div className="receptionist-summary-grid">
            <div className="receptionist-summary-item">
              <span className="summary-dot green-dot"></span>
              <div>
                <strong>{confirmed.length}</strong>
                <span>Confirmed</span>
              </div>
            </div>

            <div className="receptionist-summary-item">
              <span className="summary-dot orange-dot"></span>
              <div>
                <strong>{inProgress.length}</strong>
                <span>In Progress</span>
              </div>
            </div>

            <div className="receptionist-summary-item">
              <span className="summary-dot red-dot"></span>
              <div>
                <strong>{cancelledAppointments.length}</strong>
                <span>Cancelled</span>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;