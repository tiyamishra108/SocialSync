import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import StatCard from "../../components/StatCard";
import QueueCard from "../../components/QueueCard";
import AppointmentCard from "../../components/AppointmentCard";

function PatientDashboard({ goTo }) {
  const [appointments, setAppointments] = useState([]);
  const [currentAppointment, setCurrentAppointment] =
    useState(null);

  const loadAppointments = () => {
    const savedAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );

    const activeAppointments = savedAppointments.filter(
      (appointment) =>
        appointment.status !== "Cancelled"
    );

    setAppointments(savedAppointments);

    const savedCurrent = JSON.parse(
      localStorage.getItem("currentAppointment") || "null"
    );

    if (
      savedCurrent &&
      savedCurrent.status !== "Cancelled"
    ) {
      setCurrentAppointment(savedCurrent);
    } else if (activeAppointments.length > 0) {
      const latest =
        activeAppointments[activeAppointments.length - 1];

      setCurrentAppointment(latest);

      localStorage.setItem(
        "currentAppointment",
        JSON.stringify(latest)
      );
    } else {
      setCurrentAppointment(null);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const activeAppointments = appointments.filter(
    (appointment) =>
      appointment.status !== "Cancelled"
  );

  const cancelledAppointments = appointments
    .filter(
      (appointment) =>
        appointment.status === "Cancelled"
    )
    .slice(-2)
    .reverse();

  const recentAppointments = [
    ...activeAppointments.slice(-3).reverse(),
    ...cancelledAppointments,
  ];

  const handleTrack = (appointment) => {
    localStorage.setItem(
      "currentAppointment",
      JSON.stringify(appointment)
    );

    setCurrentAppointment(appointment);

    goTo("queueStatus");
  };

  const handleCancel = (appointment) => {
    const updatedAppointments = appointments.map(
      (item) =>
        item.id === appointment.id
          ? {
              ...item,
              status: "Cancelled",
            }
          : item
    );

    localStorage.setItem(
      "appointments",
      JSON.stringify(updatedAppointments)
    );

    if (
      currentAppointment &&
      currentAppointment.id === appointment.id
    ) {
      localStorage.removeItem(
        "currentAppointment"
      );
      setCurrentAppointment(null);
    }

    setAppointments(updatedAppointments);
  };

  const user = JSON.parse(
    localStorage.getItem("currentUser") || "{}"
  );

  const patientName =
    user.name || "Patient";

  return (
    <div className="dashboard-layout">

      <Sidebar
        currentPage="dashboard"
        goTo={goTo}
      />

      <main className="dashboard-main">

        <div className="dashboard-top">

          <div className="dashboard-welcome">

            <div>
              <span className="dashboard-section-label">
                PATIENT DASHBOARD
              </span>

              <h1>
                Welcome back, {patientName} 👋
              </h1>

              <p>
                Manage your appointments and track
                your hospital queue.
              </p>
            </div>

            <button
              className="primary-btn dashboard-book-btn"
              onClick={() => goTo("doctors")}
            >
              + Book Appointment
            </button>

          </div>

        </div>

        {/* STATS */}

        <div className="dashboard-stats">

          <StatCard
            icon="📅"
            title="Appointments"
            label="Appointments"
            value={activeAppointments.length}
          />

          <StatCard
            icon="🎟️"
            title="Active Token"
            label="Active Token"
            value={
              currentAppointment?.token || "—"
            }
          />

          <StatCard
            icon="⏱️"
            title="Estimated Wait"
            label="Estimated Wait"
            value={
              currentAppointment?.estimatedWait ||
              "—"
            }
          />

          <StatCard
            icon="👨‍⚕️"
            title="Doctor"
            label="Doctor"
            value={
              currentAppointment?.doctorName ||
              "—"
            }
          />

        </div>

        {/* QUEUE */}

        <div className="dashboard-grid">

          <QueueCard
            appointment={currentAppointment}
            goTo={goTo}
          />

          <div className="next-appointment-card">

            <div className="card-header">

              <div>
                <span className="small-label">
                  NEXT APPOINTMENT
                </span>

                <h2>
                  Upcoming Visit
                </h2>
              </div>

            </div>

            {currentAppointment ? (
              <div className="next-appointment-content">

                <div className="appointment-doctor-avatar">
                  👨‍⚕️
                </div>

                <h3>
                  {currentAppointment.doctorName}
                </h3>

                <p>
                  {currentAppointment.specialty}
                </p>

                <div className="appointment-meta-grid">

                  <span>
                    📅 {currentAppointment.date}
                  </span>

                  <span>
                    🕐 {currentAppointment.time}
                  </span>

                  <span>
                    🎟️ {currentAppointment.token}
                  </span>

                </div>

                <button
                  className="primary-btn"
                  onClick={() =>
                    handleTrack(currentAppointment)
                  }
                >
                  View Queue →
                </button>

              </div>
            ) : (
              <div className="dashboard-empty-card">

                <div className="dashboard-empty-icon">
                  📅
                </div>

                <h3>
                  No upcoming appointment
                </h3>

                <p>
                  Book an appointment to get
                  started.
                </p>

                <button
                  className="primary-btn"
                  onClick={() => goTo("doctors")}
                >
                  Find a Doctor →
                </button>

              </div>
            )}

          </div>

        </div>

        {/* RECENT APPOINTMENTS */}

        <div className="dashboard-section">

          <div className="dashboard-section-header">

            <div>
              <span className="dashboard-section-label">
                ACTIVITY
              </span>

              <h2>
                Recent Appointments
              </h2>
            </div>

            <button
              className="text-btn"
              onClick={() =>
                goTo("appointments")
              }
            >
              View All →
            </button>

          </div>

          {recentAppointments.length > 0 ? (

            <div className="dashboard-appointments-list">

              {recentAppointments.map(
                (appointment) => (

                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onTrack={
                      appointment.status !==
                      "Cancelled"
                        ? handleTrack
                        : undefined
                    }
                    onCancel={
                      appointment.status !==
                      "Cancelled"
                        ? handleCancel
                        : undefined
                    }
                  />

                )
              )}

            </div>

          ) : (

            <div className="dashboard-empty-card">

              <div className="dashboard-empty-icon">
                📋
              </div>

              <h3>
                No appointments yet
              </h3>

              <p>
                Your booked appointments will
                appear here.
              </p>

              <button
                className="primary-btn"
                onClick={() => goTo("doctors")}
              >
                Book Your First Appointment →
              </button>

            </div>

          )}

        </div>

      </main>

    </div>
  );
}

export default PatientDashboard;