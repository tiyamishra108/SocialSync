function DoctorCard({ doctor, onBook }) {
  const getFee = () => {
    if (doctor.consultation_fee != null) {
      return Number(doctor.consultation_fee);
    }

    const years = parseInt(doctor.experience);
    if (years >= 7 && years <= 8) return 500;
    if (years >= 9 && years <= 10) return 600;
    if (years >= 11 && years <= 12) return 700;
    if (years >= 13 && years <= 14) return 800;
    if (years === 15) return 900;
    return 500;
  };

  return (
    <div className="doctor-card">
      <div className="doctor-card-top">
        <div className="doctor-large-avatar">
          <img src={doctor.image} alt={doctor.name} />
        </div>
        <span className="available-badge"> ● {doctor.availability || "Available Today"} </span>
      </div>

      <h3>{doctor.name}</h3>
      <p className="doctor-specialty">{doctor.specialty}</p>
      <p className="doctor-department-label">{doctor.department}</p>

      <div className="doctor-details">
        <span>⭐ {doctor.rating}</span>
        <span>{doctor.experience}</span>
        <span>₹{getFee()}</span>
      </div>
      <button className="primary-btn doctor-book-btn"onClick={() => onBook(doctor)}>Book Appointment →</button>
    </div>
  );
}

export default DoctorCard;