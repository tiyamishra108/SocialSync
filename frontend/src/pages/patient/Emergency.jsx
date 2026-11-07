import { useState } from "react";

function Emergency({ goTo }) {

  const [showMessage, setShowMessage] = useState(false);

  return (

    <div className="emergency-page">

      {/* BACK TO DASHBOARD */}
      <button
  className="emergency-back-btn"
  onClick={() => goTo("home")}
>
  ← Back to Home
</button>

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

          <button
            className="emergency-main-btn"
            onClick={() => setShowMessage(true)}
          >
            🚨 Request Emergency Token
          </button>

          <button
            className="secondary-btn"
            onClick={() => {
              window.location.href = "tel:112";
            }}
          >
            📞 Emergency Contact
          </button>

        </div>

        <div className="emergency-note">

          <strong>
            Important
          </strong>

          <p>
            MediQueue is a queue management prototype.
            For life-threatening emergencies, contact
            your local emergency medical service immediately.
          </p>

        </div>

      </div>

      {/* CUSTOM EMERGENCY POPUP */}

      {showMessage && (

        <div
          className="emergency-modal-overlay"
          onClick={() => setShowMessage(false)}
        >

          <div
            className="emergency-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="emergency-modal-close"
              onClick={() => setShowMessage(false)}
            >
              ×
            </button>

            <div className="emergency-modal-icon">
              🚨
            </div>

            <span className="emergency-modal-label">
              EMERGENCY REQUEST
            </span>

            <h2>
              Emergency request received
            </h2>

            <p>
              Please contact emergency medical
              services immediately for urgent help.
            </p>

            <div className="emergency-modal-actions">

              <button
                className="emergency-modal-call"
                onClick={() => {
                  window.location.href = "tel:112";
                }}
              >
                📞 Call 112
              </button>

              <button
                className="emergency-modal-ok"
                onClick={() => setShowMessage(false)}
              >
                Okay
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}

export default Emergency;