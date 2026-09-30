import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";

function Settings({ goTo }) {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [notifications, setNotifications] = useState(
    localStorage.getItem("notifications") !== "off"
  );

  const [reminders, setReminders] = useState(
    localStorage.getItem("appointmentReminders") !== "off"
  );

  const [queueUpdates, setQueueUpdates] = useState(
    localStorage.getItem("queueUpdates") !== "off"
  );

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    document.body.classList.toggle(
      "dark-mode",
      darkMode
    );

    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const handleNotifications = () => {
    const value = !notifications;

    setNotifications(value);

    localStorage.setItem(
      "notifications",
      value ? "on" : "off"
    );
  };

  const handleReminders = () => {
    const value = !reminders;

    setReminders(value);

    localStorage.setItem(
      "appointmentReminders",
      value ? "on" : "off"
    );
  };

  const handleQueueUpdates = () => {
    const value = !queueUpdates;

    setQueueUpdates(value);

    localStorage.setItem(
      "queueUpdates",
      value ? "on" : "off"
    );
  };

  const handleSavePreferences = () => {
    localStorage.setItem(
      "notifications",
      notifications ? "on" : "off"
    );

    localStorage.setItem(
      "appointmentReminders",
      reminders ? "on" : "off"
    );

    localStorage.setItem(
      "queueUpdates",
      queueUpdates ? "on" : "off"
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentAppointment");

    goTo("home");
  };

  return (
    <div className="dashboard-layout">

      <Sidebar
        currentPage="settings"
        goTo={goTo}
      />

      <main className="dashboard-main">

        <div className="dashboard-top">

          <div>
            <span className="dashboard-section-label">
              ACCOUNT SETTINGS
            </span>

            <h1>Settings</h1>

            <p>
              Customize your MediQueue experience and manage
              your account preferences.
            </p>
          </div>

          <button
            className="text-btn"
            onClick={() => goTo("dashboard")}
          >
            ← Dashboard
          </button>

        </div>

        <div className="settings-page">

          {/* APPEARANCE */}
          <div className="settings-card">

            <div className="settings-heading">

              <div className="settings-icon">
                🎨
              </div>

              <div>
                <h2>Appearance</h2>

                <p>
                  Personalize how MediQueue looks on your device.
                </p>
              </div>

            </div>

            <div className="settings-row">

              <div>
                <strong>Dark Mode</strong>

                <span>
                  Use the dark theme across the dashboard
                  for a comfortable viewing experience.
                </span>
              </div>

              <button
                className={`settings-toggle ${
                  darkMode ? "on" : ""
                }`}
                onClick={() =>
                  setDarkMode((current) => !current)
                }
                aria-label="Toggle dark mode"
              >
                <span></span>
              </button>

            </div>

          </div>

          {/* NOTIFICATIONS */}
          <div className="settings-card">

            <div className="settings-heading">

              <div className="settings-icon">
                🔔
              </div>

              <div>
                <h2>Notifications</h2>

                <p>
                  Choose which MediQueue updates you want to receive.
                </p>
              </div>

            </div>

            <div className="settings-row">

              <div>
                <strong>Notifications</strong>

                <span>
                  Receive important updates about appointments,
                  tokens and your MediQueue account.
                </span>
              </div>

              <button
                className={`settings-toggle ${
                  notifications ? "on" : ""
                }`}
                onClick={handleNotifications}
                aria-label="Toggle notifications"
              >
                <span></span>
              </button>

            </div>

            <div className="settings-row">

              <div>
                <strong>Appointment Reminders</strong>

                <span>
                  Get reminders before your scheduled hospital appointments.
                </span>
              </div>

              <button
                className={`settings-toggle ${
                  reminders ? "on" : ""
                }`}
                onClick={handleReminders}
                aria-label="Toggle appointment reminders"
              >
                <span></span>
              </button>

            </div>

            <div className="settings-row">

              <div>
                <strong>Queue Updates</strong>

                <span>
                  Stay informed when your queue position or
                  estimated waiting time changes.
                </span>
              </div>

              <button
                className={`settings-toggle ${
                  queueUpdates ? "on" : ""
                }`}
                onClick={handleQueueUpdates}
                aria-label="Toggle queue updates"
              >
                <span></span>
              </button>

            </div>

            <div className="settings-actions">

              <button
                className="primary-btn"
                onClick={handleSavePreferences}
              >
                Save Preferences →
              </button>

            </div>

            {saved && (
              <div className="profile-success-message">
                ✓ Preferences saved successfully.
              </div>
            )}

          </div>

          {/* PRIVACY & SECURITY */}
          <div className="settings-card">

            <div className="settings-heading">

              <div className="settings-icon">
                🔐
              </div>

              <div>
                <h2>Privacy & Security</h2>

                <p>
                  Keep your account information safe and under your control.
                </p>
              </div>

            </div>

            <div className="settings-row">

              <div>
                <strong>Personal Information</strong>

                <span>
                  Your profile information is used to manage
                  appointments and provide MediQueue services.
                </span>
              </div>

              <span className="settings-status">
                Protected
              </span>

            </div>

            <div className="settings-row">

              <div>
                <strong>Account Status</strong>

                <span>
                  Your MediQueue patient account is currently active.
                </span>
              </div>

              <span className="settings-status">
                Active
              </span>

            </div>

          </div>

          {/* ACCOUNT */}
          <div className="settings-card">

            <div className="settings-heading">

              <div className="settings-icon">
                👤
              </div>

              <div>
                <h2>Account</h2>

                <p>
                  Manage your profile and sign out of MediQueue.
                </p>
              </div>

            </div>

            <div className="settings-actions">

              <button
                className="secondary-btn"
                onClick={() => goTo("profile")}
              >
                👤 Edit Profile
              </button>

              <button
                className="settings-danger-btn"
                onClick={handleLogout}
              >
                ↪ Logout
              </button>

            </div>

          </div>

          {/* ABOUT */}
          <div className="settings-card">

            <div className="settings-heading">

              <div className="settings-icon">
                ℹ️
              </div>

              <div>
                <h2>About MediQueue</h2>

                <p>
                  A simple digital hospital queue management experience.
                </p>
              </div>

            </div>

            <div className="settings-about">

              <p>
                MediQueue helps patients book appointments,
                receive digital tokens and track hospital queues
                without unnecessary waiting.
              </p>

              <span>
                MediQueue • Patient Portal
              </span>

            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

export default Settings;