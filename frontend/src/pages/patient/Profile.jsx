import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";

function Profile({ goTo }) {
  const [user, setUser] = useState({
    name: "Tiya",
    email: "",
    phone: ""
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [medicalIssues, setMedicalIssues] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );

    if (savedUser) {
      setUser(savedUser);

      setFormData({
        name: savedUser.name || "",
        email: savedUser.email || "",
        phone: savedUser.phone || ""
      });
    }

    const savedMedicalIssues =
      localStorage.getItem("medicalInformation") || "";

    setMedicalIssues(savedMedicalIssues);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    };

    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedUser)
    );

    const registeredUser = JSON.parse(
      localStorage.getItem("registeredUser") || "null"
    );

    if (registeredUser) {
      localStorage.setItem(
        "registeredUser",
        JSON.stringify({
          ...registeredUser,
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        })
      );
    }

    setUser(updatedUser);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleMedicalSave = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "medicalInformation",
      medicalIssues
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="dashboard-layout">

      <Sidebar
        currentPage="profile"
        goTo={goTo}
      />

      <main className="dashboard-main">

        {/* HEADER */}
        <div className="dashboard-top">

          <div>

            <span className="dashboard-section-label">
              MY PROFILE
            </span>

            <h1>Profile</h1>

            <p>
              Manage your personal and medical information.
            </p>

          </div>

          <button
            className="text-btn"
            onClick={() => goTo("dashboard")}
          >
            ← Dashboard
          </button>

        </div>


        {/* PROFILE GRID */}
        <div className="profile-page-grid">


          {/* PROFILE SUMMARY */}
          <div className="profile-card profile-summary-card">

            <div className="profile-avatar-large">
              {user.name
                ? user.name.charAt(0).toUpperCase()
                : "T"}
            </div>

            <h2>
              {user.name || "Patient"}
            </h2>

            <p>
              Patient
            </p>


            <div className="profile-summary-item">

              <span>📧</span>

              <div>

                <small>
                  Email
                </small>

                <strong>
                  {user.email || "Not added"}
                </strong>

              </div>

            </div>


            <div className="profile-summary-item">

              <span>📱</span>

              <div>

                <small>
                  Phone
                </small>

                <strong>
                  {user.phone || "Not added"}
                </strong>

              </div>

            </div>

          </div>


          {/* EDIT PROFILE */}
          <div className="profile-card">

            <div className="profile-card-heading">

              <div>

                <span className="small-label">
                  PERSONAL INFORMATION
                </span>

                <h2>
                  Edit Profile
                </h2>

                <p>
                  Update the information linked to your account.
                </p>

              </div>

            </div>


            <form
              className="profile-form"
              onSubmit={handleSave}
            >

              <div className="profile-form-row">

                <div className="input-group">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />

                </div>


                <div className="input-group">

                  <label>
                    Phone
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                  />

                </div>

              </div>


              <div className="input-group">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />

              </div>


              <button
                type="submit"
                className="primary-btn"
              >
                Save Changes →
              </button>

            </form>

          </div>

        </div>


        {/* MEDICAL INFORMATION */}
        <div className="profile-card medical-information-card">

          <div className="profile-card-heading">

            <div>

              <span className="small-label">
                MEDICAL INFORMATION
              </span>

              <h2>
                Existing Health Issues
              </h2>

              <p>
                Add any existing, permanent or previously diagnosed
                health issues that you want your healthcare provider
                to know about.
              </p>

            </div>

            <div className="medical-info-icon">
              🩺
            </div>

          </div>


          <form
            className="medical-information-form"
            onSubmit={handleMedicalSave}
          >

            <div className="input-group">

              <label>
                Medical Issues / Health Conditions
              </label>

              <textarea
                value={medicalIssues}
                onChange={(e) => {
                  setMedicalIssues(e.target.value);
                  setSaved(false);
                }}
                placeholder={
                  "Example:\n" +
                  "• Permanent hearing issue\n" +
                  "• Kidney-related issue (not currently under treatment)\n" +
                  "• Dust allergy\n" +
                  "• Previous knee surgery"
                }
                rows="7"
              />

              <small className="medical-input-help">
                You can mention conditions that are permanent,
                ongoing, previous or currently not under treatment.
              </small>

            </div>


            <div className="medical-information-note">

              <span>
                ℹ️
              </span>

              <p>
                This information is provided by you and can help
                doctors understand important health conditions
                during your consultation.
              </p>

            </div>


            <button
              type="submit"
              className="primary-btn medical-save-btn"
            >
              Save Medical Information →
            </button>


            {saved && (
              <div className="profile-success-message">
                ✓ Information saved successfully.
              </div>
            )}

          </form>

        </div>

      </main>

    </div>
  );
}

export default Profile;