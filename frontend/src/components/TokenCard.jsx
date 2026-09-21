function TokenCard({
  appointment = {},
  onTrackQueue
}) {
  const token = appointment.token || "T-024";
  const currentToken = appointment.currentToken || "T-021";
  const patientsAhead =
    appointment.queuePosition !== undefined
      ? appointment.queuePosition
      : 3;

  const waitTime =
    appointment.estimatedWait || "~30 min";

  const precautions = appointment.precautions || [
    "Arrive 10–15 minutes before your appointment.",
    "Keep your appointment details ready.",
    "Carry your previous medical reports if required.",
    "Follow hospital staff instructions."
  ];

  return (
    <div className="token-page-content">

      {/* APPOINTMENT CONFIRMED */}

      <div className="appointment-confirmed">

        <div className="confirmed-icon">
          ✓
        </div>

        <div>
          <h2>Appointment Confirmed</h2>

          <p>
            Your appointment has been successfully booked.
          </p>
        </div>

      </div>


      {/* TOKEN CARD */}

      <div className="token-card">

        <div className="token-card-header">

          <span className="small-label">
            YOUR TOKEN
          </span>

          <span className="live-badge">
            ● LIVE
          </span>

        </div>


        <div className="token-number">
          {token}
        </div>


        <div className="token-details">

          <div>
            <span>Current Token</span>
            <strong>
              {currentToken}
            </strong>
          </div>


          <div>
            <span>Patients Ahead</span>
            <strong>
              {patientsAhead}
            </strong>
          </div>


          <div>
            <span>Estimated Wait</span>
            <strong>
              {waitTime}
            </strong>
          </div>

        </div>

      </div>


      {/* APPOINTMENT DETAILS */}

      <div className="appointment-confirmation-card">

        <div className="confirmation-heading">

          <div>
            <h3>Appointment Details</h3>

            <p>
              Keep these details handy for your visit.
            </p>
          </div>

        </div>


        <div className="confirmation-details">

          <div className="confirmation-detail">

            <span>🩺 Doctor</span>

            <strong>
              {appointment.doctorName ||
                appointment.doctor ||
                "Selected Doctor"}
            </strong>

          </div>


          <div className="confirmation-detail">

            <span>🏥 Department</span>

            <strong>
              {appointment.department ||
                "General Medicine"}
            </strong>

          </div>


          <div className="confirmation-detail">

            <span>📋 Visit Type</span>

            <strong>
              {appointment.appointmentType ||
                "Doctor Consultation"}
            </strong>

          </div>


          <div className="confirmation-detail">

            <span>📅 Date</span>

            <strong>
              {appointment.date || "Not available"}
            </strong>

          </div>


          <div className="confirmation-detail">

            <span>🕐 Time</span>

            <strong>
              {appointment.time || "Not available"}
            </strong>

          </div>

        </div>

      </div>


      {/* PRECAUTIONS */}

      <div className="precautions-card">

        <div className="precautions-header">

          <div className="precautions-icon">
            ⚠️
          </div>

          <div>

            <h3>
              Before Your Visit
            </h3>

            <p>
              Please keep these things in mind.
            </p>

          </div>

        </div>


        <div className="precautions-list">

          {precautions.map((precaution, index) => (

            <div
              className="precaution-item"
              key={index}
            >

              <span className="precaution-check">
                ✓
              </span>

              <p>
                {precaution}
              </p>

            </div>

          ))}

        </div>

      </div>


      {/* ACTION */}

      {onTrackQueue && (

        <button
          className="primary-btn"
          onClick={onTrackQueue}
        >
          Track Queue →
        </button>

      )}

    </div>
  );
}

export default TokenCard;