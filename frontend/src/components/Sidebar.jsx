function Sidebar({ currentPage, goTo }) {
  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">+</div>
        <span>MediQueue</span>
      </div>

      {/* Menu */}
      <div className="sidebar-menu">

        <button
          className={`sidebar-item ${
            currentPage === "dashboard" ? "active" : ""
          }`}
          onClick={() => goTo("dashboard")}
        >
          <span>▦</span>
          Dashboard
        </button>

        <button
          className={`sidebar-item ${
            currentPage === "doctors" ? "active" : ""
          }`}
          onClick={() => goTo("doctors")}
        >
          <span>🩺</span>
          Doctors
        </button>

        <button
          className={`sidebar-item ${
            currentPage === "appointments" ? "active" : ""
          }`}
          onClick={() => goTo("appointments")}
        >
          <span>📅</span>
          Appointments
        </button>

        <button
          className={`sidebar-item ${
            currentPage === "token" ? "active" : ""
          }`}
          onClick={() => goTo("token")}
        >
          <span>🎟️</span>
          My Token
        </button>

        <button
          className={`sidebar-item ${
            currentPage === "queueStatus" ? "active" : ""
          }`}
          onClick={() => goTo("queueStatus")}
        >
          <span>📍</span>
          Queue Status
        </button>

        <div className="sidebar-divider"></div>

        <button
          className={`sidebar-item ${
            currentPage === "profile" ? "active" : ""
          }`}
          onClick={() => goTo("profile")}
        >
          <span>👤</span>
          Profile
        </button>

        <button
          className={`sidebar-item ${
            currentPage === "settings" ? "active" : ""
          }`}
          onClick={() => goTo("settings")}
        >
          <span>⚙️</span>
          Settings
        </button>

      </div>

      {/* Bottom Emergency */}
      <div className="sidebar-bottom">

        <button
          className="sidebar-emergency"
          onClick={() => goTo("emergency")}
        >
          🚨 Emergency
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;