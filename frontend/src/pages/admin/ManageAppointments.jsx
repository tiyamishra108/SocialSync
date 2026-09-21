import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";

function ManageAppointments({ goTo }) {
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

  const updateStatus = (id, status) => {
    const updatedAppointments =
      appointments.map((appointment) =>
        appointment.id === id
          ? {
              ...appointment,
              status,
            }
          : appointment
      );

    localStorage.setItem(
      "appointments",
      JSON.stringify(updatedAppointments)
    );

    const currentAppointment = JSON.parse(
      localStorage.getItem(
        "currentAppointment"
      ) || "null"
    );

    if (
      currentAppointment &&
      currentAppointment.id === id
    ) {
      const updatedCurrent =
        updatedAppointments.find(
          (appointment) =>
            appointment.id === id
        );

      if (
        updatedCurrent &&
        updatedCurrent.status !== "Cancelled"
      ) {
        localStorage.setItem(
          "currentAppointment",
          JSON.stringify(updatedCurrent)
        );
      } else {
        localStorage.removeItem(
          "currentAppointment"
        );
      }
    }

    setAppointments(updatedAppointments);
  };

  return (
    <div className="dashboard-layout">

      <Sidebar
        currentPage="manageAppointments"
        goTo={goTo}
      />

      <main className="dashboard-main">

        <div className="dashboard-top">

          <div>
            <span className="dashboard-section-label">
              ADMIN
            </span>

            <h1>
              Manage Appointments
            </h1>

            <p>
              Review and update patient
              appointments.
            </p>
          </div>

          <button
            className="text-btn"
            onClick={() =>
              goTo("adminDashboard")
            }
          >
            ← Dashboard
          </button>

        </div>

        <div className="dashboard-section">

          {appointments.length > 0 ? (

            <div className="admin-appointment-list">

              {appointments
                .slice()
                .reverse()
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

                      <small>
                        {appointment.department}
                      </small>

                    </div>

                    <div>

                      <span>
                        📅 {appointment.date}
                      </span>

                      <span>
                        🕐 {appointment.time}
                      </span>

                      <span>
                        🎟️ {appointment.token}
                      </span>

                    </div>

                    <span className="status-badge">
                      {appointment.status}
                    </span>

                    <div className="admin-appointment-actions">

                      {appointment.status !==
                        "Confirmed" &&
                        appointment.status !==
                          "Cancelled" && (

                          <button
                            className="primary-btn"
                            onClick={() =>
                              updateStatus(
                                appointment.id,
                                "Confirmed"
                              )
                            }
                          >
                            Confirm
                          </button>

                        )}

                      {appointment.status !==
                        "In Progress" &&
                        appointment.status !==
                          "Cancelled" && (

                          <button
                            className="secondary-btn"
                            onClick={() =>
                              updateStatus(
                                appointment.id,
                                "In Progress"
                              )
                            }
                          >
                            Start Queue
                          </button>

                        )}

                      {appointment.status !==
                        "Cancelled" && (

                          <button
                            className="cancel-btn"
                            onClick={() =>
                              updateStatus(
                                appointment.id,
                                "Cancelled"
                              )
                            }
                          >
                            Cancel
                          </button>

                        )}

                    </div>

                  </div>

                ))}

            </div>

          ) : (

            <div className="empty-card">

              <div className="empty-icon">
                📅
              </div>

              <h3>
                No appointments
              </h3>

              <p>
                Patient appointments will appear
                here.
              </p>

            </div>

          )}

        </div>

      </main>

    </div>
  );
}

export default ManageAppointments;