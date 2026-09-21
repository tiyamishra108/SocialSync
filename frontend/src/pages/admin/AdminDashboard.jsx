import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import StatCard from "../../components/StatCard";

function AdminDashboard({ goTo }) {
  const [appointments, setAppointments] =
    useState([]);

  const loadAppointments = () => {
    const saved = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );

    setAppointments(saved);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const activeAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status !== "Cancelled"
    );

  const cancelledAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status === "Cancelled"
    );

  const inProgress =
    appointments.filter(
      (appointment) =>
        appointment.status === "In Progress"
    );

  const confirmed =
    appointments.filter(
      (appointment) =>
        appointment.status === "Confirmed" ||
        appointment.status === "Upcoming"
    );

  return (
    <div className="dashboard-layout">

      <Sidebar
        currentPage="adminDashboard"
        goTo={goTo}
      />

      <main className="dashboard-main">

        <div className="dashboard-top">

          <div className="dashboard-welcome">

            <div>
              <span className="dashboard-section-label">
                ADMIN DASHBOARD
              </span>

              <h1>
                Hospital Overview 👋
              </h1>

              <p>
                Manage appointments and monitor
                today's patient queues.
              </p>
            </div>

          </div>

        </div>

        {/* STATS */}

        <div className="dashboard-stats">

          <StatCard
            icon="📅"
            title="Total Appointments"
            label="Total Appointments"
            value={appointments.length}
          />

          <StatCard
            icon="👥"
            title="Active Patients"
            label="Active Patients"
            value={activeAppointments.length}
          />

          <StatCard
            icon="⏳"
            title="In Progress"
            label="In Progress"
            value={inProgress.length}
          />

          <StatCard
            icon="✓"
            title="Confirmed"
            label="Confirmed"
            value={confirmed.length}
          />

        </div>

        {/* ADMIN ACTIONS */}

        <div className="dashboard-section">

          <div className="dashboard-section-header">

            <div>
              <span className="dashboard-section-label">
                MANAGEMENT
              </span>

              <h2>
                Quick Actions
              </h2>
            </div>

          </div>

          <div className="admin-actions">

            <button
              className="admin-action-card"
              onClick={() =>
                goTo("manageAppointments")
              }
            >
              <span>📅</span>

              <div>
                <h3>
                  Manage Appointments
                </h3>

                <p>
                  Confirm, cancel and update
                  patient appointments.
                </p>
              </div>

              <strong>→</strong>
            </button>

            <button
              className="admin-action-card"
              onClick={() =>
                goTo("manageDoctors")
              }
            >
              <span>🩺</span>

              <div>
                <h3>
                  Manage Doctors
                </h3>

                <p>
                  View doctors and departments.
                </p>
              </div>

              <strong>→</strong>
            </button>

            <button
              className="admin-action-card"
              onClick={() =>
                goTo("queueManagement")
              }
            >
              <span>🎟️</span>

              <div>
                <h3>
                  Queue Management
                </h3>

                <p>
                  Monitor doctor-wise patient
                  queues.
                </p>
              </div>

              <strong>→</strong>
            </button>

            <button
              className="admin-action-card"
              onClick={() =>
                goTo("emergency")
              }
            >
              <span>🚨</span>

              <div>
                <h3>
                  Emergency
                </h3>

                <p>
                  Open the emergency assistance
                  screen.
                </p>
              </div>

              <strong>→</strong>
            </button>

          </div>

        </div>

        {/* RECENT APPOINTMENTS */}

        <div className="dashboard-section">

          <div className="dashboard-section-header">

            <div>
              <span className="dashboard-section-label">
                RECENT ACTIVITY
              </span>

              <h2>
                Recent Appointments
              </h2>
            </div>

            <button
              className="text-btn"
              onClick={() =>
                goTo("manageAppointments")
              }
            >
              View All →
            </button>

          </div>

          {appointments.length > 0 ? (

            <div className="admin-appointment-list">

              {appointments
                .slice()
                .reverse()
                .slice(0, 5)
                .map((appointment) => (

                  <div
                    className="admin-appointment-row"
                    key={appointment.id}
                  >

                    <div>

                      <strong>
                        {appointment.patientName ||
                          "Patient"}
                      </strong>

                      <span>
                        {appointment.doctorName}
                      </span>

                    </div>

                    <div>

                      <span>
                        {appointment.date}
                      </span>

                      <span>
                        {appointment.time}
                      </span>

                    </div>

                    <span className="status-badge">
                      {appointment.status}
                    </span>

                  </div>

                ))}

            </div>

          ) : (

            <div className="empty-card">

              <div className="empty-icon">
                📋
              </div>

              <h3>
                No appointments yet
              </h3>

              <p>
                Patient bookings will appear
                here.
              </p>

            </div>

          )}

        </div>

        {/* SUMMARY */}

        <div className="dashboard-section">

          <div className="dashboard-section-header">

            <div>
              <span className="dashboard-section-label">
                SUMMARY
              </span>

              <h2>
                Appointment Status
              </h2>
            </div>

          </div>

          <div className="dashboard-stats">

            <StatCard
              icon="✓"
              title="Confirmed"
              label="Confirmed"
              value={confirmed.length}
            />

            <StatCard
              icon="▶"
              title="In Progress"
              label="In Progress"
              value={inProgress.length}
            />

            <StatCard
              icon="×"
              title="Cancelled"
              label="Cancelled"
              value={cancelledAppointments.length}
            />

          </div>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;