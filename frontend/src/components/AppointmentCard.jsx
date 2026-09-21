function AppointmentCard({
  appointment,
  onTrack,
  onCancel
}) {
  return (
    <div className="appointment-card">

      <div className="appointment-card-header">

        <div>
          <h3>{appointment.doctorName}</h3>

          <p>
            {appointment.specialty}
          </p>
        </div>

        <span className="status-confirmed">
          {appointment.status}
        </span>

      </div>

      <div className="appointment-card-details">

        <span>
          📅 {appointment.date}
        </span>

        <span>
          🕐 {appointment.time}
        </span>

        <span>
          🎟️ {appointment.token}
        </span>

      </div>

      <div className="appointment-card-actions">

        {onTrack && (
          <button
            className="primary-btn"
            onClick={() => onTrack(appointment)}
          >
            Track Queue →
          </button>
        )}

        {onCancel && appointment.status !== "Cancelled" && (
          <button
            className="secondary-btn"
            onClick={() => onCancel(appointment)}
          >
            Cancel
          </button>
        )}

      </div>

    </div>
  );
}

export default AppointmentCard;