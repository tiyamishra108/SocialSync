import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import StatCard from "../../components/StatCard";
import QueueCard from "../../components/QueueCard";
import AppointmentCard from "../../components/AppointmentCard";

function PatientDashboard({ goTo }) {
  const [appointments, setAppointments] = useState([]);
  const [currentAppointment, setCurrentAppointment] =
    useState(null);

  const getToday = () => {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(
      today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      today.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const loadAppointments = () => {
    const savedAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );

    const activeAppointments =
      savedAppointments.filter(
        (appointment) =>
          appointment.status !== "Cancelled"
      );

    setAppointments(savedAppointments);

    const today = getToday();

    // Sort active appointments by date and time
    const sortedAppointments = [
      ...activeAppointments,
    ].sort((a, b) => {
      const dateA = new Date(
        `${a.date} ${a.time || "00:00"}`
      );

      const dateB = new Date(
        `${b.date} ${b.time || "00:00"}`
      );

      return dateA - dateB;
    });

    // First priority: today's appointment
    const todayAppointment =
      sortedAppointments.find(
        (appointment) =>
          appointment.date === today
      );

    // If no appointment today,
    // use the nearest future appointment
    const nextAppointment =
      sortedAppointments.find(
        (appointment) =>
          appointment.date >= today
      );

    const queueAppointment =
      todayAppointment || nextAppointment || null;

    const savedCurrent = JSON.parse(
      localStorage.getItem("currentAppointment") ||
        "null"
    );

    // Keep saved current appointment only if
    // it is still active and is the queue appointment
    if (
      savedCurrent &&
      savedCurrent.status !== "Cancelled" &&
      queueAppointment &&
      savedCurrent.id === queueAppointment.id
    ) {
      setCurrentAppointment(savedCurrent);
    } else if (queueAppointment) {
      setCurrentAppointment(queueAppointment);

      localStorage.setItem(
        "currentAppointment",
        JSON.stringify(queueAppointment)
      );
    } else {
      setCurrentAppointment(null);
      localStorage.removeItem(
        "currentAppointment"
      );
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const activeAppointments = appointments.filter(
    (appointment) =>
      appointment.status !== "Cancelled"
  );

  const today = getToday();

  // Today's appointment first.
  // If there is no appointment today,
  // earliest future appointment becomes queue.
  const sortedActiveAppointments = [
    ...activeAppointments,
  ].sort((a, b) => {
    const dateA = new Date(
      `${a.date} ${a.time || "00:00"}`
    );

    const dateB = new Date(
      `${b.date} ${b.time || "00:00"}`
    );

    return dateA - dateB;
  });

  const queueAppointment =
    sortedActiveAppointments.find(
      (appointment) =>
        appointment.date === today
    ) ||
    sortedActiveAppointments.find(
      (appointment) =>
        appointment.date >= today
    ) ||
    null;

  // Next appointments should NOT include
  // the appointment already shown in Your Queue.
  const nextAppointments =
    sortedActiveAppointments
      .filter(
        (appointment) =>
          appointment.id !==
          queueAppointment?.id &&
          appointment.date >= today
      )
      .slice(0, 2);

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
    const updatedAppointments =
      appointments.map((item) =>
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

    // Refresh dashboard queue selection
    setTimeout(() => {
      loadAppointments();
    }, 0);
  };

  const user = JSON.parse(
    localStorage.getItem("currentUser") || "{}"
  );

  const patientName = user.name || "Patient";

  return (
    <div className="dashboard-layout">
      <Sidebar
        currentPage="dashboard"
        goTo={goTo}
      />

      <main className="dashboard-main">

        {/* DASHBOARD HEADER */}
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
            value={activeAppointments.length}
          />

          <StatCard
            icon="🎟️"
            title="Active Token"
            value={
              currentAppointment?.token || "—"
            }
          />

          <StatCard
            icon="⏱️"
            title="Estimated Wait"
            value={
              currentAppointment?.estimatedWait ||
              "—"
            }
          />

          <StatCard
            icon="👨‍⚕️"
            title="Doctor"
            value={
              currentAppointment?.doctorName || "—"
            }
          />
        </div>

        {/* QUEUE + NEXT APPOINTMENT */}
        <div className="dashboard-grid">

          {/* YOUR QUEUE */}
          <QueueCard
            appointment={currentAppointment}
            goTo={goTo}
          />

          {/* NEXT APPOINTMENT */}
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

            {nextAppointments.length > 0 ? (
              <div className="next-appointments-list">

                {nextAppointments.map(
                  (appointment) => (
                    <div
                      className="next-appointment-content"
                      key={appointment.id}
                    >
                      <div className="appointment-doctor-avatar">
                        👨‍⚕️
                      </div>

                      <h3>
                        {appointment.doctorName}
                      </h3>

                      <p>
                        {appointment.specialty}
                      </p>

                      <div className="appointment-meta-grid">
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

                      <button
                        className="primary-btn"
                        onClick={() =>
                          handleTrack(appointment)
                        }
                      >
                        View Queue →
                      </button>
                    </div>
                  )
                )}

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
                  onClick={() =>
                    goTo("doctors")
                  }
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
                onClick={() =>
                  goTo("doctors")
                }
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