import { useState } from "react";

import Sidebar from "../../components/Sidebar";
import DoctorCard from "../../components/DoctorCard";
import doctors from "../../data/doctors";

function Doctors({ goTo, setSelectedDoctor }) {
  const departments = [
    "All",
    "Cardiology",
    "Dermatology",
    "Orthopedics",
    "Pediatrics",
    "Neurology",
    "Ophthalmology",
    "General Medicine",
  ];

  const [selectedDepartment, setSelectedDepartment] =
    useState("All");

  const filteredDoctors =
    selectedDepartment === "All"
      ? doctors
      : doctors.filter(
          (doctor) =>
            doctor.department ===
            selectedDepartment
        );

  const handleBook = (doctor) => {
    setSelectedDoctor(doctor);
    goTo("bookAppointment");
  };

  return (
    <div className="dashboard-layout">

      <Sidebar
        currentPage="doctors"
        goTo={goTo}
      />

      <main className="dashboard-main doctors-page">

        <div className="dashboard-top">

          <div>

            <span className="dashboard-section-label">
              FIND A DOCTOR
            </span>

            <h1>
              Our Doctors
            </h1>

            <p>
              Choose a doctor based on specialty,
              experience and availability.
            </p>

          </div>

        </div>

        {/* DEPARTMENT FILTER */}

        <div className="department-tabs">

          {departments.map((department) => (

            <button
              key={department}
              className={`department-tab ${
                selectedDepartment === department
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setSelectedDepartment(
                  department
                )
              }
            >
              {department}
            </button>

          ))}

        </div>

        <div className="department-results-label">

          Showing{" "}
          <strong>
            {filteredDoctors.length}
          </strong>{" "}
          doctors
          {selectedDepartment !== "All" &&
            ` in ${selectedDepartment}`}

        </div>

        {/* DOCTORS */}

        {filteredDoctors.length > 0 ? (

          <div className="doctor-grid">

            {filteredDoctors.map((doctor) => (

              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onBook={handleBook}
              />

            ))}

          </div>

        ) : (

          <div className="empty-card">

            <div className="empty-icon">
              🩺
            </div>

            <h3>
              No doctors found
            </h3>

            <p>
              No doctors are currently available
              in this department.
            </p>

          </div>

        )}

      </main>

    </div>
  );
}

export default Doctors;