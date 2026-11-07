
import { useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Emergency from "./pages/patient/Emergency";

import BookAppointment from "./pages/patient/BookAppointment";
import MyAppointments from "./pages/patient/MyAppointments";
import QueueStatus from "./pages/patient/QueueStatus";
import Token from "./pages/patient/Token";
import Profile from "./pages/patient/Profile";
import Settings from "./pages/patient/Settings";

import Navbar from "./components/Navbar";
import ThemeToggle from "./components/ThemeToggle";

import doctors from "./data/doctors";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageAppointments from "./pages/admin/ManageAppointments";
import QueueManagement from "./pages/admin/QueueManagement";

import "./index.css";


function App() {

  const [page, setPage] = useState("home");

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const goTo = (newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  if (page === "login") {
    return <Login goTo={goTo} />;
  }

  if (page === "register") {
    return <Register goTo={goTo} />;
  }

  if (page === "dashboard") {
    return <Dashboard goTo={goTo} />;
  }

  if (page === "receptionistDashboard") {
    return <AdminDashboard goTo={goTo} />;
  }

  if (page === "manageAppointments") {
    return <ManageAppointments goTo={goTo} />;
  }

  if (page === "queueManagement") {
    return <QueueManagement goTo={goTo} />;
  }

  if (page === "appointments") {
    return <MyAppointments goTo={goTo} />;
  }

  if (page === "token") {
    return <Token goTo={goTo} />;
  }

  if (page === "queueStatus") {
    return <QueueStatus goTo={goTo} />;
  }

  if (page === "doctors") {
    return (
      <Doctors
        goTo={goTo}
        setSelectedDoctor={setSelectedDoctor}
      />
    );
  }

  if (page === "bookAppointment") {
    return (
      <BookAppointment
        selectedDoctor={selectedDoctor}
        goTo={goTo}
      />
    );
  }

  if (page === "emergency") {
  return <Emergency goTo={goTo} />;
}

  if (page === "profile") {
    return <Profile goTo={goTo} />;
  }

  if (page === "settings") {
    return <Settings goTo={goTo} />;
  }

  return (
    <Home
      goTo={goTo}
      setSelectedDoctor={setSelectedDoctor}
    />
  );
}


/* =========================
   DOCTORS
========================= */

function Doctors({ goTo, setSelectedDoctor }) {

  const departments = [
    "All Departments",
    "Cardiology",
    "Dermatology",
    "Orthopedics",
    "Pediatrics",
    "Neurology",
    "Ophthalmology",
    "General Medicine"
  ];

  const [activeDepartment, setActiveDepartment] =
    useState("All Departments");

  const visibleDoctors =
    activeDepartment === "All Departments"
      ? doctors
      : doctors.filter(
          (doctor) =>
            doctor.department === activeDepartment
        );

  return (
    <div className="doctors-page">

      <Navbar goTo={goTo} />

      <div className="doctors-container">

        <div className="doctors-heading">

          <span className="hero-badge">
            🩺 Find Your Doctor
          </span>

          <h1>
            Choose the right doctor
            <br />
            for your care.
          </h1>

          <p>
            Choose a department first, then select
            a doctor for your appointment.
          </p>

        </div>

        <div
          className="department-tabs"
          role="tablist"
          aria-label="Doctor departments"
        >

          {departments.map((department) => (

            <button
              key={department}
              className={`department-tab ${
                activeDepartment === department
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveDepartment(department)
              }
            >
              {department}
            </button>

          ))}

        </div>

        <div className="department-results-label">

          <span className="small-label">
            {activeDepartment === "All Departments"
              ? "ALL SPECIALISTS"
              : activeDepartment.toUpperCase()}
          </span>

          <strong>
            {visibleDoctors.length} doctors available
          </strong>

        </div>

        <div className="doctor-grid">

          {visibleDoctors.map((doctor) => (

            <div
              className="doctor-card"
              key={doctor.id}
            >

              <div className="doctor-card-top">

                <div className="doctor-large-avatar">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                  />
                </div>

                <span className="available-badge">
                  ● {doctor.availability || "Available Today"}
                </span>

              </div>

              <h3>
                {doctor.name}
              </h3>

              <p className="doctor-specialty">
                {doctor.specialty}
              </p>

              <p className="doctor-department-label">
                {doctor.department}
              </p>

              <div className="doctor-details">

                <span>
                  ⭐ {doctor.rating}
                </span>

                <span>
                  {doctor.experience}
                </span>

              </div>

              <button
                className="primary-btn doctor-book-btn"
                onClick={() => {
                  setSelectedDoctor(doctor);
                  goTo("bookAppointment");
                }}
              >
                Book Appointment →
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}


/* =========================
   DASHBOARD
========================= */

function Dashboard({ goTo }) {

  const appointments = JSON.parse(
    localStorage.getItem("appointments") || "[]"
  );

  const currentAppointment = JSON.parse(
    localStorage.getItem("currentAppointment") || "null"
  );

  /* ACTIVE STATUS */

  const isActiveAppointment = (item) => {
    return [
      "Confirmed",
      "Upcoming",
      "In Progress"
    ].includes(item?.status);
  };

  /* LOCAL TODAY */

  const currentDate = new Date();

  const today =
    `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(
      currentDate.getDate()
    ).padStart(2, "0")}`;

  /* DATE + TIME */

  const getAppointmentDateTime = (item) => {

    if (!item?.date) {
      return Number.MAX_SAFE_INTEGER;
    }

    const date = item.date;
    const time = item.time || "12:00 AM";

    const parsed = new Date(
      `${date} ${time}`
    ).getTime();

    if (Number.isNaN(parsed)) {
      return new Date(date).getTime();
    }

    return parsed;
  };

  /* ACTIVE APPOINTMENTS */

  const activeAppointments = appointments
    .filter(isActiveAppointment)
    .slice()
    .sort(
      (a, b) =>
        getAppointmentDateTime(a) -
        getAppointmentDateTime(b)
    );

  /* UPCOMING APPOINTMENTS */

  const upcomingAppointments =
    activeAppointments.filter(
      (item) =>
        item.date &&
        item.date >= today
    );

  /* YOUR QUEUE */

  const queueAppointment =
    upcomingAppointments.length > 0
      ? upcomingAppointments[0]
      : null;

  /* NEXT APPOINTMENTS */

  const nextAppointments =
    upcomingAppointments.slice(1, 3);

  const nextAppointment =
    nextAppointments.length > 0
      ? nextAppointments[0]
      : null;

  /* LATEST PAST APPOINTMENT */

  const latestPastAppointment =
    appointments
      .filter(
        (item) =>
          item.date &&
          item.date < today
      )
      .slice()
      .sort(
        (a, b) =>
          getAppointmentDateTime(b) -
          getAppointmentDateTime(a)
      )[0];

  /* RECENT APPOINTMENTS */

  const recentAppointments = [
    ...upcomingAppointments,
    ...(latestPastAppointment
      ? [latestPastAppointment]
      : [])
  ];

  return (

    <div className="dashboard-layout">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="sidebar-logo">

          <div className="logo-icon">
            +
          </div>

          <span>
            MediQueue
          </span>

        </div>

        <div className="sidebar-menu">

          <button
            className="sidebar-item active"
            title="Dashboard"
          >
            <span>▦</span>
            <span className="sidebar-label">
              Dashboard
            </span>
          </button>

          <button
            className="sidebar-item"
            onClick={() => goTo("doctors")}
            title="Doctors"
          >
            <span>🩺</span>
            <span className="sidebar-label">
              Doctors
            </span>
          </button>

          <button
            className="sidebar-item"
            onClick={() => goTo("appointments")}
            title="Appointments"
          >
            <span>📅</span>
            <span className="sidebar-label">
              Appointments
            </span>
          </button>

          <button
            className="sidebar-item"
            onClick={() => goTo("token")}
            title="My Token"
          >
            <span>🎟️</span>
            <span className="sidebar-label">
              My Token
            </span>
          </button>

          <button
            className="sidebar-item"
            onClick={() => goTo("queueStatus")}
            title="Queue Status"
          >
            <span>📍</span>
            <span className="sidebar-label">
              Queue Status
            </span>
          </button>

          <div className="sidebar-divider"></div>

          <button
            className="sidebar-item"
            onClick={() => goTo("profile")}
            title="Profile"
          >
            <span>👤</span>
            <span className="sidebar-label">
              Profile
            </span>
          </button>

          <button
            className="sidebar-item"
            onClick={() => goTo("settings")}
            title="Settings"
          >
            <span>⚙️</span>
            <span className="sidebar-label">
              Settings
            </span>
          </button>

        </div>

        <div className="sidebar-bottom">

          <button
            className="sidebar-emergency"
            onClick={() => goTo("emergency")}
            title="Emergency"
          >
            <span>🚨</span>
            <span className="sidebar-label">
              Emergency
            </span>
          </button>

        </div>

      </aside>


      {/* MAIN DASHBOARD */}

      <main className="dashboard-main">

        {/* TOP */}

        <div className="dashboard-top">

          <div>

            <span className="small-label">
              PATIENT DASHBOARD
            </span>

            <h1>
              Good morning, Tiya 👋
            </h1>

          </div>

          <div className="dashboard-actions">

            <ThemeToggle />

            <div className="dashboard-user">

              <span className="notification">
                🔔
              </span>

              <div className="user-avatar">
                T
              </div>

              <div>

                <strong>
                  Tiya
                </strong>

                <span>
                  Patient
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* STATS */}

        <div className="dashboard-stats">

          <DashboardStat
            icon="📅"
            label="Upcoming"
            value={upcomingAppointments.length}
          />

          <DashboardStat
            icon="🎟️"
            label="My Token"
            value={
              queueAppointment
                ? queueAppointment.token
                : "—"
            }
          />

          <DashboardStat
            icon="👥"
            label="Ahead of You"
            value={queueAppointment ? "3" : "—"}
          />

          <DashboardStat
            icon="🟢"
            label="Status"
            value={queueAppointment ? "Live" : "—"}
          />

        </div>


        {/* QUEUE + NEXT APPOINTMENT */}

        <div className="dashboard-grid">

          {/* LIVE QUEUE */}

          <div className="queue-dashboard-card">

            <div className="card-header">

              <div>

                <span className="small-label">
                  LIVE QUEUE
                </span>

                <h2>
                  Your Queue
                </h2>

              </div>

              {queueAppointment && (
                <span className="live-badge">
                  ● LIVE
                </span>
              )}

            </div>

            {queueAppointment ? (

              <>

                <div className="queue-doctor">

                  <div className="doctor-large-avatar">
                    👨‍⚕️
                  </div>

                  <div>

                    <h3>
                      {queueAppointment.doctorName}
                    </h3>

                    <p>
                      {queueAppointment.specialty}
                    </p>

                  </div>

                </div>

                <div className="queue-tokens">

                  <div>

                    <span>
                      Current Token
                    </span>

                    <strong>
                      T-021
                    </strong>

                  </div>

                  <div className="token-arrow">
                    →
                  </div>

                  <div>

                    <span>
                      Your Token
                    </span>

                    <strong>
                      {queueAppointment.token}
                    </strong>

                  </div>

                </div>

                <div className="queue-info">

                  <div>
                    <span>👥</span>
                    <strong>3 patients ahead</strong>
                  </div>

                  <div>
                    <span>⏱️</span>
                    <strong>~30 min wait</strong>
                  </div>

                </div>

                <button
                  className="primary-btn track-btn"
                  onClick={() => goTo("queueStatus")}
                >
                  Track Queue →
                </button>

              </>

            ) : (

              <div className="empty-dashboard">

                <div>
                  📅
                </div>

                <h3>
                  No active queue today
                </h3>

                <p>
                  You don't have an appointment
                  scheduled for today.
                </p>

                {nextAppointment ? (

                  <button
                    className="primary-btn"
                    onClick={() => goTo("appointments")}
                  >
                    View Next Appointment →
                  </button>

                ) : (

                  <button
                    className="primary-btn"
                    onClick={() => goTo("doctors")}
                  >
                    Find a Doctor →
                  </button>

                )}

              </div>

            )}

          </div>


          {/* NEXT APPOINTMENT */}

          <div className="next-appointment-card">

            <div className="card-header">

              <div>

                <span className="small-label">
                  NEXT APPOINTMENT
                </span>

                <h2>
                  {nextAppointments.length > 0
                    ? nextAppointments[0].time
                    : "No booking"}
                </h2>

              </div>

              <span className="appointment-icon">
                📅
              </span>

            </div>

            {nextAppointments.length > 0 ? (

              <div>

                {nextAppointments.map((appointment) => (

                  <div
                    className="next-doctor"
                    key={appointment.id}
                  >

                    <div className="doctor-small-avatar">
                      👨‍⚕️
                    </div>

                    <div>

                      <h3>
                        {appointment.doctorName}
                      </h3>

                      <p>
                        {appointment.specialty}
                      </p>

                      <span>
                        {appointment.date} • {appointment.time}
                      </span>

                    </div>

                  </div>

                ))}

              </div>

            ) : (

              <p className="empty-text">
                You don't have any upcoming appointments.
              </p>

            )}

            <button
              className="secondary-btn full-btn"
              onClick={() => goTo("appointments")}
            >
              View Appointment →
            </button>

          </div>

        </div>


        {/* RECENT APPOINTMENTS */}

        <div className="recent-card">

          <div className="card-header">

            <div>

              <span className="small-label">
                ACTIVITY
              </span>

              <h2>
                Recent Appointments
              </h2>

            </div>

            <button
              className="view-all"
              onClick={() => goTo("appointments")}
            >
              View Full History →
            </button>

          </div>

          {recentAppointments.length > 0 ? (

            <div className="appointment-table">

              <div className="table-header">

                <span>Doctor</span>
                <span>Date</span>
                <span>Token</span>
                <span>Status</span>

              </div>

              {recentAppointments.map((item) => (

                <div
                  className="table-row"
                  key={
                    item.id ||
                    `${item.doctorName}-${item.date}-${item.time}`
                  }
                >

                  <span>

                    <strong>
                      {item.doctorName}
                    </strong>

                    <small>
                      {item.specialty}
                    </small>

                  </span>

                  <span>
                    {item.date}
                  </span>

                  <span>
                    {item.token || "—"}
                  </span>

                  <span>

                    <em className="status-confirmed">
                      {item.status}
                    </em>

                  </span>

                </div>

              ))}

            </div>

          ) : (

            <div className="empty-table">

              <span>
                📋
              </span>

              <p>
                No appointments found.
              </p>

              <button
                className="secondary-btn"
                onClick={() => goTo("doctors")}
              >
                Book Your First Appointment
              </button>

            </div>

          )}

        </div>

      </main>

    </div>
  );
}


/* =========================
   DASHBOARD STAT
========================= */

function DashboardStat({ icon, label, value }) {

  return (

    <div className="dashboard-stat">

      <div className="stat-icon">
        {icon}
      </div>

      <div>

        <span>
          {label}
        </span>

        <strong>
          {value}
        </strong>

      </div>

    </div>

  );
}


export default App;
