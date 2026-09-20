import { useEffect, useState } from "react";

function QueueStatus({ goTo }) {

  const [appointment, setAppointment] = useState(
    JSON.parse(
      localStorage.getItem("currentAppointment")
    )
  );

  const [currentToken, setCurrentToken] = useState(21);

  const [patientsAhead, setPatientsAhead] = useState(3);

  const [waitTime, setWaitTime] = useState(30);


  /* Simulate queue movement */

  useEffect(() => {

    const interval = setInterval(() => {

      setPatientsAhead((previous) => {

        if (previous <= 0) {
          return 0;
        }

        return previous - 1;
      });

      setWaitTime((previous) => {

        if (previous <= 5) {
          return 5;
        }

        return previous - 5;
      });

    }, 15000);

    return () => clearInterval(interval);

  }, []);


  if (!appointment) {

    return (
      <div className="queue-status-page">

        <div className="queue-empty">

          <div>
            🎟️
          </div>

          <h1>No active queue</h1>

          <p>
            Book an appointment first to receive your
            queue token.
          </p>

          <button
            className="primary-btn"
            onClick={() => goTo("doctors")}
          >
            Find a Doctor →
          </button>

        </div>

      </div>
    );
  }


  return (
    <div className="queue-status-page">

      {/* HEADER */}

      <div className="queue-status-header">

        <button
          className="back-button"
          onClick={() => goTo("dashboard")}
        >
          ← Back to Dashboard
        </button>

        <span className="hero-badge">
          📍 Live Queue Tracking
        </span>

        <h1>Your Queue Status</h1>

        <p>
          Track your position while you wait.
        </p>

      </div>


      {/* MAIN CARD */}

      <div className="queue-status-container">

        <div className="queue-live-card">

          <div className="queue-live-header">

            <div>

              <span className="small-label">
                CURRENTLY SERVING
              </span>

              <h2>
                {appointment.doctorName}
              </h2>

              <p>
                {appointment.specialty}
              </p>

            </div>

            <span className="live-badge">
              ● LIVE
            </span>

          </div>


          {/* TOKEN */}

          <div className="big-token-section">

            <div className="token-box">

              <span>
                CURRENT TOKEN
              </span>

              <strong>
                T-{String(currentToken).padStart(3, "0")}
              </strong>

            </div>

            <div className="token-line">
              →
            </div>

            <div className="token-box your-token">

              <span>
                YOUR TOKEN
              </span>

              <strong>
                {appointment.token}
              </strong>

            </div>

          </div>


          {/* PROGRESS */}

          <div className="queue-progress">

            <div className="progress-header">

              <span>
                Queue Progress
              </span>

              <strong>
                {patientsAhead === 0
                  ? "Your turn!"
                  : `${patientsAhead} patients ahead`}
              </strong>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width: `${
                    Math.max(
                      20,
                      100 - patientsAhead * 20
                    )
                  }%`,
                }}
              ></div>

            </div>

          </div>


          {/* INFO */}

          <div className="queue-status-info">

            <div className="queue-status-item">

              <div className="status-info-icon">
                👥
              </div>

              <div>
                <span>Patients Ahead</span>
                <strong>
                  {patientsAhead}
                </strong>
              </div>

            </div>


            <div className="queue-status-item">

              <div className="status-info-icon">
                ⏱️
              </div>

              <div>
                <span>Estimated Wait</span>
                <strong>
                  ~{waitTime} min
                </strong>
              </div>

            </div>


            <div className="queue-status-item">

              <div className="status-info-icon">
                🎟️
              </div>

              <div>
                <span>Your Token</span>
                <strong>
                  {appointment.token}
                </strong>
              </div>

            </div>

          </div>


          {/* APPOINTMENT INFO */}

          <div className="queue-appointment-info">

            <h3>Appointment Details</h3>

            <div className="appointment-info-grid">

              <div>
                <span>Doctor</span>
                <strong>
                  {appointment.doctorName}
                </strong>
              </div>

              <div>
                <span>Department</span>
                <strong>
                  {appointment.specialty}
                </strong>
              </div>

              <div>
                <span>Date</span>
                <strong>
                  {appointment.date}
                </strong>
              </div>

              <div>
                <span>Time</span>
                <strong>
                  {appointment.time}
                </strong>
              </div>

            </div>

          </div>


          <div className="queue-note">

            <span>💡</span>

            <p>
              This queue status is a prototype simulation.
              Actual hospital queue information would be
              updated through the MediQueue backend.
            </p>

          </div>


          <button
            className="secondary-btn queue-back-btn"
            onClick={() => goTo("dashboard")}
          >
            Back to Dashboard
          </button>

        </div>

      </div>

    </div>
  );
}

export default QueueStatus;