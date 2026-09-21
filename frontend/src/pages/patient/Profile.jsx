import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";

function Profile({ goTo }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const savedUser = JSON.parse(
      localStorage.getItem("currentUser") || "{}"
    );

    setForm({
      name: savedUser.name || "",
      email: savedUser.email || "",
      phone: savedUser.phone || "",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      alert("Please fill all fields.");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify(form)
    );

    alert("Profile updated successfully.");
  };

  return (
    <div className="dashboard-layout">

      <Sidebar
        currentPage="profile"
        goTo={goTo}
      />

      <main className="dashboard-main patient-page">

        <div className="patient-page-topbar">

          <button
            className="back-button"
            onClick={() => goTo("dashboard")}
          >
            ← Dashboard
          </button>

          <span className="patient-page-badge">
            PROFILE
          </span>

        </div>

        <div className="patient-page-header">

          <div>

            <h1>
              My Profile
            </h1>

            <p>
              Manage your personal information.
            </p>

          </div>

        </div>

        <div className="profile-card">

          <div className="profile-avatar">
            {form.name
              ? form.name
                  .charAt(0)
                  .toUpperCase()
              : "👤"}
          </div>

          <div className="profile-info">

            <h2>
              {form.name || "MediQueue Patient"}
            </h2>

            <p>
              Patient Account
            </p>

          </div>

          <form
            className="profile-form"
            onSubmit={handleSave}
          >

            <div className="input-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />

            </div>

            <div className="input-group">

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
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
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />

            </div>

            <button
              type="submit"
              className="primary-btn"
            >
              Save Changes
            </button>

          </form>

        </div>

      </main>

    </div>
  );
}

export default Profile;