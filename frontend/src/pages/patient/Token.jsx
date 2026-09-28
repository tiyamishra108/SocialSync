import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import TokenCard from "../../components/TokenCard";

function Token({ goTo }) {
  const [appointments, setAppointments] =
    useState([]);

  useEffect(() => {
    const savedAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );

    const today = new Date();

    const todayString = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(
      today.getDate()
    ).padStart(2, "0")}`;

    /*
      Show only today's and future appointments.
      Past appointments are not shown here.
    */

    const activeAppointments =
      savedAppointments
        .filter((appointment) => {
          const isActive =
            appointment.status === "Confirmed" ||
            appointment.status === "Upcoming" ||
            appointment.status === "In Progress";

          const isTodayOrFuture =
            appointment.date >= todayString;

          return (
            isActive &&
            isTodayOrFuture
          );
        })
        .sort((a, b) => {
          /*
            Sort appointments by date.
            If dates are same, sort by time.
          */

          const dateA = new Date(
            `${a.date} ${a.time || "00:00"}`
          );

          const dateB = new Date(
            `${b.date} ${b.time || "00:00"}`
          );

          return dateA - dateB;
        });

    setAppointments(activeAppointments);
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
              Appointment Tokens
            </h1>

            <p>
              View your current and upcoming
              appointment details.
            </p>

          </div>


          <button
            className="text-btn"
            onClick={() =>
              goTo("dashboard")
            }
          >
            ← Dashboard
          </button>

        </div>


        <div className="dashboard-section">

          {appointments.length > 0 ? (

            <div className="token-appointments-list">

              {appointments.map(
                (appointment) => {

                  const today =
                    new Date();

                  const todayString =
                    `${today.getFullYear()}-${String(
                      today.getMonth() + 1
                    ).padStart(2, "0")}-${String(
                      today.getDate()
                    ).padStart(2, "0")}`;

                  const isToday =
                    appointment.date ===
                    todayString;


                  return (
                    <div
                      key={appointment.id}
                      className="token-appointment-item"
                    >

                      <TokenCard
                        appointment={
                          appointment
                        }

                        /*
                          Queue tracking is available
                          only for today's appointment.
                        */

                        onTrackQueue={
                          isToday
                            ? () =>
                                goTo(
                                  "queueStatus"
                                )
                            : null
                        }
                      />

                    </div>
                  );
                }
              )}

            </div>

          ) : (

            <div className="empty-card">

              <div className="empty-icon">
                🎟️
              </div>

              <h3>
                No upcoming appointments
              </h3>

              <p>
                Book an appointment to receive
                your queue token.
              </p>

              <button
                className="primary-btn"
                onClick={() =>
                  goTo("doctors")
                }
              >
                Book Appointment →
              </button>

            </div>

          )}

        </div>


        {appointments.length > 0 && (

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