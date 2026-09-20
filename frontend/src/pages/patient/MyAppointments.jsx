import { useState } from "react";

function MyAppointments({ goTo }) {
  const [appointments, setAppointments] = useState(
    JSON.parse(localStorage.getItem("appointments")) || []
  );

  const cancelAppointment = (id) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === id
        ? { ...appointment, status: "Cancelled" }
        : appointment
    );

    setAppointments(updatedAppointments);

    localStorage.setItem(
      "appointments",
      JSON.stringify(updatedAppointments)
    );

    const currentAppointment =
      JSON.parse(
        localStorage.getItem("currentAppointment")
      );

    if (currentAppointment?.id === id) {
      localStorage.removeItem("currentAppointment");
    }
  };

  return (
    <div className="patient-page">

      {/* HEADER */}

      <div className="patient-page-header">

        <button
          className="back-button"
          onClick={() => goTo("dashboard")}
        >
          ← Back to Dashboard
        </button>

        <span className="hero-badge">
          📅 Your Appointments
        </span>

        <h1>My Appointments</h1>

        <p>
          View and manage all your upcoming and previous
          appointments.
        </p>

      </div>


      {/* APPOINTMENTS */}

      <div className="appointments-container">

        {appointments.length === 0 ? (

          <div className="appointments-empty">

            <div className="empty-icon">
              📅
            </div>

            <h2>No appointments yet</h2>

            <p>
              You haven't booked any appointments.
              Find a doctor and book your first appointment.
            </p>

            <button
              className="primary-btn"
              onClick={() => goTo("doctors")}
            >
              Find a Doctor →
            </button>

          </div>

        ) : (

          appointments
            .slice()
            .reverse()
            .map((appointment) => (

              <div
                className="appointment-full-card"
                key={appointment.id}
              >

                <div className="appointment-card-main">

                  <div className="appointment-doctor-avatar">
                    👨‍⚕️
                  </div>

                  <div className="appointment-doctor-info">

                    <h3>
                      {appointment.doctorName}
                    </h3>

                    <p>
                      {appointment.specialty}
                    </p>

                    <span>
                      🎟️ Token:{" "}
                      <strong>
                        {appointment.token}
                      </strong>
                    </span>

                  </div>

                </div>


                <div className="appointment-details">

                  <div>
                    <span>Date</span>
                    <strong>
                      📅 {appointment.date}
                    </strong>
                  </div>

                  <div>
                    <span>Time</span>
                    <strong>
                      🕐 {appointment.time}
                    </strong>
                  </div>

                  <div>
                    <span>Type</span>
                    <strong>
                      {appointment.appointmentType ===
                      "emergency"
                        ? "🚨 Urgent"
                        : "📅 Normal"}
                    </strong>
                  </div>

                  <div>
                    <span>Status</span>

                    <em
                      className={
                        appointment.status === "Cancelled"
                          ? "status-cancelled"
                          : "status-confirmed"
                      }
                    >
                      {appointment.status}
                    </em>

                  </div>

                </div>


                <div className="appointment-card-actions">

                  {appointment.status !== "Cancelled" && (
                    <>
                      <button
                        className="secondary-btn"
                        onClick={() => {
                          localStorage.setItem(
                            "currentAppointment",
                            JSON.stringify(appointment)
                          );

                          goTo("queueStatus");
                        }}
                      >
                        Track Queue
                      </button>

                      <button
                        className="cancel-btn"
                        onClick={() =>
                          cancelAppointment(appointment.id)
                        }
                      >
                        Cancel
                      </button>
                    </>
                  )}

                </div>

              </div>

            ))

        )}

      </div>

    </div>
  );
}

export default MyAppointments;