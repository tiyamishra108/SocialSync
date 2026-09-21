import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import TokenCard from "../../components/TokenCard";

function Token({ goTo }) {
  const [appointment, setAppointment] =
    useState(null);

  useEffect(() => {
    const savedAppointment = JSON.parse(
      localStorage.getItem("currentAppointment") ||
        "null"
    );

    setAppointment(savedAppointment);
  }, []);

  return (
    <div className="dashboard-layout">

      <Sidebar
        currentPage="token"
        goTo={goTo}
      />

      <main className="dashboard-main">

        <div className="dashboard-top">

          <div>

            <span className="dashboard-section-label">
              MY TOKEN
            </span>

            <h1>
              Appointment Token
            </h1>

            <p>
              Your appointment and queue details.
            </p>

          </div>

          <button
            className="text-btn"
            onClick={() => goTo("dashboard")}
          >
            ← Dashboard
          </button>

        </div>

        <div className="dashboard-section">

          {appointment ? (

            <TokenCard
              appointment={appointment}
              onTrackQueue={() =>
                goTo("queueStatus")
              }
            />

          ) : (

            <div className="empty-card">

              <div className="empty-icon">
                🎟️
              </div>

              <h3>
                No active token
              </h3>

              <p>
                Book an appointment to receive
                your queue token.
              </p>

              <button
                className="primary-btn"
                onClick={() => goTo("doctors")}
              >
                Book Appointment →
              </button>

            </div>

          )}

        </div>

        {appointment && (

          <div className="token-actions">

            <button
              className="secondary-btn"
              onClick={() =>
                goTo("appointments")
              }
            >
              My Appointments
            </button>

            <button
              className="secondary-btn"
              onClick={() =>
                goTo("doctors")
              }
            >
              Book Another Appointment
            </button>

          </div>

        )}

      </main>

    </div>
  );
}

export default Token;