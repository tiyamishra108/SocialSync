function DoctorCard({ doctor, onBook }) {
  return (
    <div className="doctor-card">

      <div className="doctor-card-top">

        <div className="doctor-large-avatar">
          <img
            src={doctor.image}
            alt={doctor.name}
          />
        </div>

        <span className="available-badge">
          ● {doctor.availability || "Available Today"}
        </span>

      </div>

      <h3>{doctor.name}</h3>

      <p className="doctor-specialty">
        {doctor.specialty}
      </p>

      <p className="doctor-department-label">
        {doctor.department}
      </p>

      <div className="doctor-details">
        <span>⭐ {doctor.rating}</span>
        <span>{doctor.experience}</span>
      </div>

      <button
        className="primary-btn doctor-book-btn"
        onClick={() => onBook(doctor)}
      >
        Book Appointment →
      </button>

    </div>
  );
}

export default DoctorCard;