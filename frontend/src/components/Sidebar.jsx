import React from "react";

function Sidebar({ currentPage, goTo }) {
  const userRole = localStorage.getItem("userRole");
  const isReceptionist = userRole === "receptionist";
  const menuItems = isReceptionist
    ? [
        {
          id: "receptionistDashboard",
          label: "Dashboard",
          icon: "▦",
        },
        {
          id: "manageAppointments",
          label: "Manage Appointments",
          icon: "📅",
        },
        {
          id: "queueManagement",
          label: "Queue Management",
          icon: "🎟️",
        },
      ]
    : [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: "▦",
        },
        {
          id: "doctors",
          label: "Doctors",
          icon: "🩺",
        },
        {
          id: "appointments",
          label: "Appointments",
          icon: "📅",
        },
        {
          id: "token",
          label: "My Token",
          icon: "🎟️",
        },
        {
          id: "queueStatus",
          label: "Queue Status",
          icon: "📍",
        },
        {
          id: "profile",
          label: "Profile",
          icon: "👤",
        },
        {
          id: "settings",
          label: "Settings",
          icon: "⚙️",
        },
      ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">+</div>
        <span>MediQueue</span>
      </div>

      <div className="sidebar-menu">
        {menuItems.map((item, index) => (
          <React.Fragment key={item.id}>
            {!isReceptionist && index === 5 && (
              <div className="sidebar-divider"></div>
            )}

            <button
              className={`sidebar-item ${
                currentPage === item.id ? "active" : ""
              }`}
              onClick={() => goTo(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          </React.Fragment>
        ))}
      </div>

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