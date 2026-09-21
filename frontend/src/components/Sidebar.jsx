function Sidebar({ currentPage, goTo }) {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentAppointment");

    goTo("home");
  };

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-icon">+</div>
        <span>MediQueue</span>
      </div>

      <div className="sidebar-menu">

        <button
          className={`sidebar-item ${
            currentPage === "dashboard"
              ? "active"
              : ""
          }`}
          onClick={() => goTo("dashboard")}
        >
          <span>▦</span>
          Dashboard
        </button>

        <button
          className={`sidebar-item ${
            currentPage === "doctors"
              ? "active"
              : ""
          }`}
          onClick={() => goTo("doctors")}
        >
          <span>🩺</span>
          Doctors
        </button>

        <button
          className={`sidebar-item ${
            currentPage === "appointments"
              ? "active"
              : ""
          }`}
          onClick={() => goTo("appointments")}
        >
          <span>📅</span>
          Appointments
        </button>

        <button
          className={`sidebar-item ${
            currentPage === "token"
              ? "active"
              : ""
          }`}
          onClick={() => goTo("token")}
        >
          <span>🎟️</span>
          My Token
        </button>

        <button
          className={`sidebar-item ${
            currentPage === "queueStatus"
              ? "active"
              : ""
          }`}
          onClick={() => goTo("queueStatus")}
        >
          <span>📍</span>
          Queue Status
        </button>

        <div className="sidebar-divider"></div>

        <button
          className={`sidebar-item ${
            currentPage === "profile"
              ? "active"
              : ""
          }`}
          onClick={() => goTo("profile")}
        >
          <span>👤</span>
          Profile
        </button>

        <button
          className="sidebar-item"
          onClick={() =>
            alert(
              "Settings will be available in the next version."
            )
          }
        >
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
  );
}

export default Sidebar;