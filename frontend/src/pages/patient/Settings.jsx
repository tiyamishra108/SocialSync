import { useState } from "react";

import Sidebar from "../../components/Sidebar";

function Settings({ goTo }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);

    localStorage.setItem(
      "theme",
      newTheme
    );

    if (newTheme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
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
              SETTINGS
            </span>

            <h1>
              Settings
            </h1>

            <p>
              Manage your MediQueue preferences.
            </p>
          </div>

          <button
            type="button"
            className="text-btn"
            onClick={() => goTo("dashboard")}
          >
            ← Dashboard
          </button>

        </div>

        <div className="dashboard-section">

          <div className="settings-card">

            <div>
              <span className="small-label">
                APPEARANCE
              </span>

              <h2>
                Theme
              </h2>

              <p>
                Choose how MediQueue looks on your
                device.
              </p>
            </div>

            <div className="settings-theme-buttons">

              <button
                type="button"
                className={
                  theme === "light"
                    ? "primary-btn"
                    : "secondary-btn"
                }
                onClick={() =>
                  handleThemeChange("light")
                }
              >
                ☀️ Light
              </button>

              <button
                type="button"
                className={
                  theme === "dark"
                    ? "primary-btn"
                    : "secondary-btn"
                }
                onClick={() =>
                  handleThemeChange("dark")
                }
              >
                🌙 Dark
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Settings;