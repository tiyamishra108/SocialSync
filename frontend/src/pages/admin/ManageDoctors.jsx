import Sidebar from "../../components/Sidebar";
import doctors from "../../data/doctors";

function ManageDoctors({ goTo }) {
  const departments = [
    ...new Set(
      doctors.map(
        (doctor) => doctor.department
      )
    ),
  ];

  return (
    <div className="dashboard-layout">

      <Sidebar
        currentPage="manageDoctors"
        goTo={goTo}
      />

      <main className="dashboard-main">

        <div className="dashboard-top">

          <div>

            <span className="dashboard-section-label">
              ADMIN
            </span>

            <h1>
              Manage Doctors
            </h1>

            <p>
              View doctors and their departments.
            </p>

          </div>

          <button
            className="text-btn"
            onClick={() =>
              goTo("adminDashboard")
            }
          >
            ← Dashboard
          </button>

        </div>

        <div className="dashboard-section">

          <div className="admin-doctors-list">

            {doctors.map((doctor) => (

              <div
                className="admin-doctor-row"
                key={doctor.id}
              >

                <div className="doctor-small-avatar">

                  <img
                    src={doctor.image}
                    alt={doctor.name}
                  />

                </div>

                <div className="admin-doctor-info">

                  <div className="admin-doctor-details">

                    <h3>
                      {doctor.name}
                    </h3>

                    <p>
                      {doctor.specialty}
                    </p>

                    <span>
                      {doctor.department}
                    </span>

                  </div>

                  <div className="doctor-details">

                    <span>
                      ⭐ {doctor.rating}
                    </span>

                    <span>
                      {doctor.experience}
                    </span>

                    <span>
                      ● {doctor.availability}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        <div className="dashboard-section">

          <div className="dashboard-section-header">

            <div>

              <span className="dashboard-section-label">
                DEPARTMENTS
              </span>

              <h2>
                Doctor Distribution
              </h2>

            </div>

          </div>

          <div className="dashboard-stats">

            {departments.map((department) => {

              const count =
                doctors.filter(
                  (doctor) =>
                    doctor.department ===
                    department
                ).length;

              return (
                <div
                  className="dashboard-stat"
                  key={department}
                >

                  <div className="stat-icon">
                    🩺
                  </div>

                  <div>

                    <span>
                      {department}
                    </span>

                    <strong>
                      {count} Doctors
                    </strong>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </main>

    </div>
  );
}

export default ManageDoctors;