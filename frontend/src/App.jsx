import { useState, useEffect } from "react";
import BookAppointment from "./pages/patient/BookAppointment";
import MyAppointments from "./pages/patient/MyAppointments";
import QueueStatus from "./pages/patient/QueueStatus";
import doctors from "./data/doctors";
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

  if (page === "appointments") {
    return <MyAppointments goTo={goTo} />;
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

  return <Home goTo={goTo} setSelectedDoctor={setSelectedDoctor} />;
}


/* =========================
   NAVBAR
========================= */

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <button
      className="theme-toggle"
      onClick={() => setDarkMode((current) => !current)}
      aria-label="Toggle light and dark theme"
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}

function Navbar({ goTo }) {
  return (
    <nav className="navbar">
      <div className="nav-container">

        <div
          className="logo"
          onClick={() => goTo("home")}
        >
          <div className="logo-icon">+</div>
          <span>MediQueue</span>
        </div>

        <div className="nav-links">
          <button onClick={() => goTo("home")}>
            Home
          </button>

          <button onClick={() => goTo("doctors")}>
            Doctors
          </button>

          <a href="#features">Features</a>

          <a href="#how-it-works">How It Works</a>

          <button
            className="emergency-btn"
            onClick={() => goTo("emergency")}
          >
            🚨 Emergency
          </button>
        </div>

        <div className="nav-actions">
          <ThemeToggle />

          <button
            className="login-btn"
            onClick={() => goTo("login")}
          >
            Login
          </button>

          <button
            className="register-btn"
            onClick={() => goTo("register")}
          >
            Register
          </button>
        </div>

      </div>
    </nav>
  );
}


/* =========================
   HOME
========================= */

function Home({ goTo, setSelectedDoctor }) {
  return (
    <>
      <Navbar goTo={goTo} />

      <main>

        <section className="hero">

          <div className="hero-container">

            <div className="hero-content">

              <span className="hero-badge">
                🏥 Smarter Hospital Visits
              </span>

              <h1>
                Your time matters.
                <br />
                <span>We make waiting simpler.</span>
              </h1>

              <p>
                MediQueue helps patients book appointments,
                get digital tokens and track their hospital
                queue in real time.
              </p>

              <div className="hero-buttons">

                <button
                  className="primary-btn"
                  onClick={() => goTo("login")}
                >
                  Book an Appointment →
                </button>

                <button
                  className="secondary-btn"
                  onClick={() => goTo("login")}
                >
                  Check Queue Status
                </button>

              </div>

              <div className="trust-row">
                <span>✓ Easy Booking</span>
                <span>✓ Digital Tokens</span>
                <span>✓ Live Queue</span>
              </div>

            </div>


            {/* TOP DOCTORS */}

            <div className="top-doctors-preview">

              <div className="preview-header">
                <div>
                  <span className="small-label">
                    AVAILABLE TODAY
                  </span>

                  <h3>Top Doctors</h3>
                </div>

                <button
                  onClick={() => goTo("doctors")}
                >
                  View all →
                </button>
              </div>

              {doctors.slice(0, 3).map((doctor) => (

                <div
                  className="doctor-mini-card"
                  key={doctor.id}
                >

                  <div className="doctor-avatar">
                    <img src={doctor.image} alt={doctor.name} />
                  </div>

                  <div className="doctor-mini-info">

                    <h4>{doctor.name}</h4>

                    <p>{doctor.specialty}</p>

                    <span>
                      ⭐ {doctor.rating}
                    </span>

                  </div>

                  <button
                    className="mini-book-btn"
                    onClick={() => {
                      setSelectedDoctor(doctor);
                      goTo("bookAppointment");
                    }}
                  >
                    Book
                  </button>

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* FEATURES */}

        <section
          className="features-section"
          id="features"
        >

          <div className="section-heading">

            <span>WHY MEDIQUEUE</span>

            <h2>
              Everything you need for a
              <br />
              smoother hospital visit.
            </h2>

          </div>

          <div className="feature-grid">

            <FeatureCard
              icon="🎟️"
              title="Digital Tokens"
              text="Get your queue token digitally without standing in long lines."
            />

            <FeatureCard
              icon="📍"
              title="Live Queue Tracking"
              text="Know your current position and track the queue from anywhere."
            />

            <FeatureCard
              icon="🚨"
              title="Emergency Priority"
              text="Dedicated emergency support for urgent situations."
              emergency
            />

          </div>

        </section>


        {/* HOW IT WORKS */}

        <section
          className="how-section"
          id="how-it-works"
        >

          <div className="section-heading">

            <span>HOW IT WORKS</span>

            <h2>
              Simple from start to finish.
            </h2>

          </div>

          <div className="steps">

            <Step
              number="01"
              title="Choose a Doctor"
              text="Browse doctors and select the specialist you need."
            />

            <Step
              number="02"
              title="Book Appointment"
              text="Choose your preferred date and time."
            />

            <Step
              number="03"
              title="Get Your Token"
              text="Receive a digital queue token instantly."
            />

            <Step
              number="04"
              title="Track Your Queue"
              text="Monitor your queue status while you wait."
            />

          </div>

        </section>


        {/* ABOUT */}

        <section className="about-section">

          <div className="about-card">

            <div>
              <span className="small-label">
                ABOUT MEDIQUEUE
              </span>

              <h2>
                Less waiting.
                <br />
                More care.
              </h2>

              <p>
                MediQueue is designed to make hospital
                visits more organized and convenient for
                patients while helping hospitals manage
                queues efficiently.
              </p>
            </div>

            <div className="about-stat">

              <strong>24/7</strong>

              <span>
                Access to your
                <br />
                queue information
              </span>

            </div>

          </div>

        </section>

      </main>

      <Footer goTo={goTo} />
    </>
  );
}


/* =========================
   FEATURE CARD
========================= */

function FeatureCard({
  icon,
  title,
  text,
  emergency
}) {
  return (
    <div
      className={`feature-card ${
        emergency ? "feature-emergency" : ""
      }`}
    >

      <div className="feature-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>

      <span className="feature-arrow">
        →
      </span>

    </div>
  );
}


/* =========================
   STEP
========================= */

function Step({ number, title, text }) {
  return (
    <div className="step">

      <span className="step-number">
        {number}
      </span>

      <h3>{title}</h3>

      <p>{text}</p>

    </div>
  );
}


/* =========================
   LOGIN
========================= */

function Login({ goTo }) {

  const handleLogin = (e) => {
    e.preventDefault();

    localStorage.setItem("isLoggedIn", "true");

    goTo("dashboard");
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <button
          className="auth-back"
          onClick={() => goTo("home")}
        >
          ← Back to Home
        </button>

        <div className="auth-logo">
          <div className="logo-icon">+</div>
          <span>MediQueue</span>
        </div>

        <h1>Welcome back 👋</h1>

        <p className="auth-subtitle">
          Login to manage your appointments and queue.
        </p>

        <form onSubmit={handleLogin}>

          <div className="input-group">
            <label>Email or Phone</label>

            <input
              type="text"
              placeholder="Enter email or phone"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              required
            />
          </div>

          <div className="forgot-password">
            Forgot password?
          </div>

          <button
            type="submit"
            className="primary-btn auth-submit"
          >
            Login →
          </button>

        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button className="google-btn">
          Continue with Google
        </button>

        <p className="auth-switch">
          Don't have an account?{" "}
          <button onClick={() => goTo("register")}>
            Register
          </button>
        </p>

      </div>

    </div>
  );
}


/* =========================
   REGISTER
========================= */

function Register({ goTo }) {

  const handleRegister = (e) => {
    e.preventDefault();

    localStorage.setItem("isLoggedIn", "true");

    goTo("dashboard");
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <button
          className="auth-back"
          onClick={() => goTo("home")}
        >
          ← Back to Home
        </button>

        <div className="auth-logo">
          <div className="logo-icon">+</div>
          <span>MediQueue</span>
        </div>

        <h1>Create your account</h1>

        <p className="auth-subtitle">
          Start managing your hospital visits easily.
        </p>

        <form onSubmit={handleRegister}>

          <div className="input-group">
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Phone</label>

            <input
              type="tel"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Create a password"
              required
            />
          </div>

          <button
            type="submit"
            className="primary-btn auth-submit"
          >
            Create Account →
          </button>

        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <button onClick={() => goTo("login")}>
            Login
          </button>
        </p>

      </div>

    </div>
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
    "General Medicine",
  ];

  const [activeDepartment, setActiveDepartment] = useState("All Departments");

  const visibleDoctors =
    activeDepartment === "All Departments"
      ? doctors
      : doctors.filter((doctor) => doctor.department === activeDepartment);

  return (
    <div className="doctors-page">
      <Navbar goTo={goTo} />

      <div className="doctors-container">
        <div className="doctors-heading">
          <span className="hero-badge">🩺 Find Your Doctor</span>
          <h1>Choose the right doctor<br />for your care.</h1>
          <p>Choose a department first, then select a doctor for your appointment.</p>
        </div>

        <div className="department-tabs" role="tablist" aria-label="Doctor departments">
          {departments.map((department) => (
            <button
              key={department}
              className={`department-tab ${activeDepartment === department ? "active" : ""}`}
              onClick={() => setActiveDepartment(department)}
            >
              {department}
            </button>
          ))}
        </div>

        <div className="department-results-label">
          <span className="small-label">
            {activeDepartment === "All Departments" ? "ALL SPECIALISTS" : activeDepartment.toUpperCase()}
          </span>
          <strong>{visibleDoctors.length} doctors available</strong>
        </div>

        <div className="doctor-grid">
          {visibleDoctors.map((doctor) => (
            <div className="doctor-card" key={doctor.id}>
              <div className="doctor-card-top">
                <div className="doctor-large-avatar">
                  <img src={doctor.image} alt={doctor.name} />
                </div>
                <span className="available-badge">● {doctor.availability || "Available Today"}</span>
              </div>

              <h3>{doctor.name}</h3>
              <p className="doctor-specialty">{doctor.specialty}</p>
              <p className="doctor-department-label">{doctor.department}</p>

              <div className="doctor-details">
                <span>⭐ {doctor.rating}</span>
                <span>{doctor.experience}</span>
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

  const appointments =
    JSON.parse(
      localStorage.getItem("appointments")
    ) || [];

  const currentAppointment =
    JSON.parse(
      localStorage.getItem("currentAppointment")
    );

  const isActiveAppointment = (item) =>
    ["Confirmed", "Upcoming", "In Progress"].includes(item?.status);

  const activeAppointments = appointments.filter(isActiveAppointment);

  const appointment =
    currentAppointment && isActiveAppointment(currentAppointment)
      ? currentAppointment
      : activeAppointments[activeAppointments.length - 1];

  const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");

    goTo("home");
  };

  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="sidebar-logo">

          <div className="logo-icon">+</div>

          <span>MediQueue</span>

        </div>

        <div className="sidebar-menu">

          <button className="sidebar-item active">
            <span>▦</span>
            Dashboard
          </button>

          <button
            className="sidebar-item"
            onClick={() => goTo("doctors")}
          >
            <span>🩺</span>
            Doctors
          </button>

          <button
            className="sidebar-item"
            onClick={() => goTo("appointments")}
          >
            <span>📅</span>
            Appointments
          </button>

          <button
            className="sidebar-item"
            onClick={() => goTo("queueStatus")}
          >
            <span>🎟️</span>
            My Token
          </button>

          <button
            className="sidebar-item"
            onClick={() => goTo("queueStatus")}
          >
            <span>📍</span>
            Queue Status
          </button>

          <div className="sidebar-divider"></div>

          <button className="sidebar-item">
            <span>👤</span>
            Profile
          </button>

          <button className="sidebar-item">
            <span>⚙️</span>
            Settings
          </button>

        </div>

        <div className="sidebar-bottom">

          <button
            className="sidebar-emergency"
            onClick={() => goTo("emergency")}
          >
            🚨 Emergency
          </button>

          <button
            className="sidebar-logout"
            onClick={handleLogout}
          >
            ↪ Logout
          </button>

        </div>

      </aside>


      {/* MAIN */}

      <main className="dashboard-main">

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
              <strong>Tiya</strong>
              <span>Patient</span>
            </div>

            </div>
          </div>

        </div>


        {/* STATS */}

        <div className="dashboard-stats">

          <DashboardStat
            icon="📅"
            label="Upcoming"
            value={appointment ? "1" : "0"}
          />

          <DashboardStat
            icon="🎟️"
            label="My Token"
            value={
              appointment
                ? appointment.token
                : "—"
            }
          />

          <DashboardStat
            icon="👥"
            label="Ahead of You"
            value={appointment ? "3" : "—"}
          />

          <DashboardStat
            icon="🟢"
            label="Status"
            value={appointment ? "Live" : "—"}
          />

        </div>


        <div className="dashboard-grid">

          {/* QUEUE */}

          <div className="queue-dashboard-card">

            <div className="card-header">

              <div>

                <span className="small-label">
                  LIVE QUEUE
                </span>

                <h2>Your Queue</h2>

              </div>

              <span className="live-badge">
                ● LIVE
              </span>

            </div>


            {appointment ? (

              <>

                <div className="queue-doctor">

                  <div className="doctor-large-avatar">
                    👨‍⚕️
                  </div>

                  <div>

                    <h3>
                      {appointment.doctorName}
                    </h3>

                    <p>
                      {appointment.specialty}
                    </p>

                  </div>

                </div>


                <div className="queue-tokens">

                  <div>
                    <span>Current Token</span>
                    <strong>T-021</strong>
                  </div>

                  <div className="token-arrow">
                    →
                  </div>

                  <div>
                    <span>Your Token</span>
                    <strong>
                      {appointment.token}
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

                <div>📅</div>

                <h3>No appointment yet</h3>

                <p>
                  Book an appointment to get your
                  queue token.
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


          {/* NEXT APPOINTMENT */}

          <div className="next-appointment-card">

            <div className="card-header">

              <div>

                <span className="small-label">
                  NEXT APPOINTMENT
                </span>

                <h2>
                  {appointment
                    ? appointment.time
                    : "No booking"}
                </h2>

              </div>

              <span className="appointment-icon">
                📅
              </span>

            </div>


            {appointment ? (

              <div className="next-doctor">

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
                    {appointment.date}
                  </span>

                </div>

              </div>

            ) : (

              <p className="empty-text">
                You don't have any upcoming
                appointments.
              </p>

            )}

            <button
              className="secondary-btn full-btn"
              onClick={() => goTo("queueStatus")}
            >
              Track Queue →
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

              <h2>Recent Appointments</h2>

            </div>

            <button
              className="view-all"
              onClick={() => goTo("appointments")}
            >
              View Full History →
            </button>

          </div>


          {activeAppointments.length > 0 || appointments.some((item) => item.status === "Cancelled") ? (

            <div className="appointment-table">

              <div className="table-header">
                <span>Doctor</span>
                <span>Date</span>
                <span>Token</span>
                <span>Status</span>
              </div>

              {[
                ...appointments.filter(isActiveAppointment).slice().reverse(),
                ...appointments
                  .filter((item) => item.status === "Cancelled")
                  .slice()
                  .reverse()
                  .slice(0, 2),
              ].map((item) => (

                  <div
                    className="table-row"
                    key={item.id}
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
                      {item.token}
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

              <span>📋</span>

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

function DashboardStat({
  icon,
  label,
  value
}) {
  return (
    <div className="dashboard-stat">

      <div className="stat-icon">
        {icon}
      </div>

      <div>

        <span>{label}</span>

        <strong>{value}</strong>

      </div>

    </div>
  );
}


/* =========================
   EMERGENCY
========================= */

function Emergency({ goTo }) {

  return (
    <div className="emergency-page">

      <Navbar goTo={goTo} />

      <div className="emergency-container">

        <div className="emergency-warning">
          🚨
        </div>

        <span className="emergency-label">
          EMERGENCY ASSISTANCE
        </span>

        <h1>
          Need urgent medical attention?
        </h1>

        <p>
          If you are experiencing a genuine medical
          emergency, seek immediate professional help.
        </p>

        <div className="emergency-actions">

          <button className="emergency-main-btn">
            🚨 Request Emergency Token
          </button>

          <button className="secondary-btn">
            📞 Emergency Contact
          </button>

        </div>

        <div className="emergency-note">

          <strong>Important</strong>

          <p>
            MediQueue is a queue management prototype.
            For life-threatening emergencies, contact
            your local emergency medical service immediately.
          </p>

        </div>

      </div>

    </div>
  );
}


/* =========================
   FOOTER
========================= */

function Footer({ goTo }) {

  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">

          <div className="logo">

            <div className="logo-icon">
              +
            </div>

            <span>MediQueue</span>

          </div>

          <p>
            Making hospital visits simpler,
            one queue at a time.
          </p>

        </div>


        <div className="footer-links">

          <div>
            <h4>Quick Links</h4>

            <button onClick={() => goTo("home")}>
              Home
            </button>

            <button onClick={() => goTo("doctors")}>
              Doctors
            </button>

            <button onClick={() => goTo("login")}>
              Login
            </button>
          </div>

          <div>
            <h4>Support</h4>

            <span>Help Center</span>
            <span>Contact Us</span>
            <span>Privacy</span>
          </div>

        </div>

      </div>

      <div className="footer-bottom">
        © 2026 MediQueue. College Project.
      </div>

    </footer>
  );
}

export default App;