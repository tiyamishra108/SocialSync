import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";

function QueueManagement({ goTo }) {
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

  const groupedQueues =
    activeAppointments.reduce(
      (groups, appointment) => {
        const doctor =
          appointment.doctorName ||
          "Unknown Doctor";

        if (!groups[doctor]) {
          groups[doctor] = [];
        }

        groups[doctor].push(appointment);

        return groups;
      },
      {}
    );

  return (
    <div className="dashboard-layout">

      <Sidebar
        currentPage="queueManagement"
        goTo={goTo}
      />

      <main className="dashboard-main">

        <div className="dashboard-top">

          <div>

            <span className="dashboard-section-label">
              ADMIN
            </span>

            <h1>
              Queue Management
            </h1>

            <p>
              Monitor doctor-wise patient queues.
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

        {Object.keys(groupedQueues).length > 0 ? (

          <div className="queue-management-grid">

            {Object.entries(groupedQueues).map(
              ([doctorName, queue]) => (

                <div
                  className="admin-queue-card"
                  key={doctorName}
                >

                  <div className="admin-queue-header">

                    <div>

                      <span className="small-label">
                        DOCTOR QUEUE
                      </span>

                      <h2>
                        {doctorName}
                      </h2>

                    </div>

                    <span className="status-badge">
                      {queue.length}{" "}
                      {queue.length === 1
                        ? "Patient"
                        : "Patients"}
                    </span>

                  </div>

                  <div className="queue-patients">

                    {queue.map(
                      (appointment, index) => (

                        <div
                          className="queue-patient-row"
                          key={appointment.id}
                        >

                          <div>

                            <strong>
                              #{index + 1}
                            </strong>

                            <span>
                              {appointment.patientName ||
                                "Patient"}
                            </span>

                          </div>

                          <span className="queue-token">
                            {appointment.token}
                          </span>

                        </div>

                      )
                    )}

                  </div>

                </div>

              )
            )}

          </div>

        ) : (

          <div className="empty-card">

            <div className="empty-icon">
              🎟️
            </div>

            <h3>
              No active queues
            </h3>

            <p>
              Active patient queues will appear
              here.
            </p>

          </div>

        )}

      </main>

    </div>
  );
}

export default QueueManagement;