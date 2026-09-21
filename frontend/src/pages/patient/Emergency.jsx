import Sidebar from "../../components/Sidebar";

function Emergency({ goTo }) {
  return (
    <div className="dashboard-layout">

      <Sidebar
        currentPage="emergency"
        goTo={goTo}
      />

      <main className="dashboard-main emergency-page">

        <div className="emergency-header">

          <button
            className="back-button"
            onClick={() => goTo("dashboard")}
          >
            ← Dashboard
          </button>

          <div className="emergency-icon">
            🚨
          </div>

          <span className="patient-page-badge">
            EMERGENCY ASSISTANCE
          </span>

          <h1>
            Need Emergency Help?
          </h1>

          <p>
            If you are experiencing a serious
            or life-threatening emergency, seek
            immediate medical assistance.
          </p>

        </div>

        <div className="emergency-warning">

          <strong>
            ⚠️ Important
          </strong>

          <p>
            MediQueue is a queue-management
            prototype and does not replace
            emergency medical services.
          </p>

        </div>

        <div className="emergency-actions">

          <a
            href="tel:112"
            className="emergency-main-btn"
          >
            🚨 Call 112
          </a>

          <button
            className="secondary-btn"
            onClick={() => goTo("doctors")}
          >
            Find a Doctor →
          </button>

        </div>

        <div className="emergency-card">

          <div className="emergency-card-icon">
            🏥
          </div>

          <div>

            <h3>
              Go to the nearest emergency
              department
            </h3>

            <p>
              For serious symptoms, do not wait
              for an appointment or queue token.
            </p>

          </div>

        </div>

        <div className="emergency-card">

          <div className="emergency-card-icon">
            📞
          </div>

          <div>

            <h3>
              Contact emergency services
            </h3>

            <p>
              In India, call <strong>112</strong>{" "}
              for emergency assistance.
            </p>

          </div>

        </div>

        <div className="emergency-note">

          <strong>
            When to seek immediate help
          </strong>

          <p>
            Examples include severe breathing
            difficulty, loss of consciousness,
            major bleeding, severe chest pain,
            or other potentially life-threatening
            situations.
          </p>

        </div>

      </main>

    </div>
  );
}

export default Emergency;