import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import AppointmentCard from "../../components/AppointmentCard";

function AppointmentHistory({ goTo }) {
  const [appointments, setAppointments] =
    useState([]);

  useEffect(() => {
    const savedAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );

    setAppointments(savedAppointments);
  }, []);

  const cancelledAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status === "Cancelled"
    );

  return (
    <div className="dashboard-layout">

      <Sidebar
        currentPage="appointmentHistory"
        goTo={goTo}
      />

      <main className="dashboard-main patient-page">

        <div className="patient-page-topbar">

          <button
            className="back-button"
            onClick={() => goTo("dashboard")}
          >
            ← Dashboard
          </button>

          <span className="patient-page-badge">
            APPOINTMENT HISTORY
          </span>

        </div>

        <div className="patient-page-header">

          <div>

            <h1>
              Appointment History
            </h1>

            <p>
              View your previous and cancelled
              appointments.
            </p>

          </div>

          <button
            className="primary-btn"
            onClick={() => goTo("doctors")}
          >
            + Book Appointment
          </button>

        </div>

        {cancelledAppointments.length > 0 ? (

          <div className="appointments-container">

            {cancelledAppointments
              .slice()
              .reverse()
              .map((appointment) => (

                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                />

              ))}

          </div>

        ) : (

          <div className="empty-card">

            <div className="empty-icon">
              📋
            </div>

            <h3>
              No appointment history
            </h3>

            <p>
              Your completed or cancelled
              appointments will appear here.
            </p>

            <button
              className="primary-btn"
              onClick={() => goTo("doctors")}
            >
              Find a Doctor →
            </button>

          </div>

        )}

      </main>

    </div>
  );
}

export default AppointmentHistory;