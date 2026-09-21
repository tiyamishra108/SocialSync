function QueueCard({
  appointment,
  goTo
}) {
  if (!appointment) {
    return (
      <div className="queue-dashboard-card">

        <div className="card-header">

          <div>
            <span className="small-label">
              LIVE QUEUE
            </span>

            <h2>Your Queue</h2>
          </div>

        </div>

        <div className="empty-dashboard">

          <div>📅</div>

          <h3>
            No appointment yet
          </h3>

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

      </div>
    );
  }

  const currentToken =
    appointment.currentToken || "T-021";

  const patientsAhead =
    appointment.queuePosition !== undefined
      ? appointment.queuePosition
      : 3;

  const waitTime =
    appointment.estimatedWait || "~30 min";

  return (
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
          <span>
            Current Token
          </span>

          <strong>
            {currentToken}
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
            {appointment.token}
          </strong>
        </div>

      </div>

      <div className="queue-info">

        <div>
          <span>👥</span>

          <strong>
            {patientsAhead}{" "}
            {patientsAhead === 1
              ? "patient"
              : "patients"}{" "}
            ahead
          </strong>
        </div>

        <div>
          <span>⏱️</span>

          <strong>
            {waitTime} wait
          </strong>
        </div>

      </div>

      <button
        className="primary-btn track-btn"
        onClick={() => goTo("queueStatus")}
      >
        Track Queue →
      </button>

    </div>
  );
}

export default QueueCard;