function Register({ goTo }) {
  const handleRegister = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const phone = String(formData.get("phone") || "").trim();
    const password = String(formData.get("password") || "");

    if (!name || !email || !phone || !password) {
      alert("Please fill all fields.");
      return;
    }

    let users = [];
    try {
      users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      const legacyUser = JSON.parse(localStorage.getItem("registeredUser") || "null");
      if (legacyUser && !users.some((item) =>
        item.email?.toLowerCase() === legacyUser.email?.toLowerCase()
      )) {
        users.push(legacyUser);
      }
    } catch {
      users = [];
    }

    const alreadyRegistered = users.some((user) =>
      user.email?.toLowerCase() === email || user.phone === phone
    );

    if (alreadyRegistered) {
      alert("An account with this email or phone number already exists. Please login.");
      goTo("login");
      return;
    }

    const user = {
      id: email,
      name,
      email,
      phone,
      password,
    };

    users.push(user);
    localStorage.setItem("registeredUsers", JSON.stringify(users));

    // Keep the old key updated for compatibility with any older screens.
    localStorage.setItem("registeredUser", JSON.stringify(user));

    const currentUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: "Patient",
    };

    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("userRole", "Patient");
    localStorage.setItem("isLoggedIn", "true");
    localStorage.removeItem("currentAppointment");

    goTo("dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <button className="auth-back" onClick={() => goTo("home")}>
          ← Back to Home
        </button>

        <div className="auth-logo">
          <div className="logo-icon">+</div>
          <span>MediQueue</span>
        </div>

        <h1>Create your account</h1>
        <p className="auth-subtitle">
          Start managing your hospital visits easily.
        </p>

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" name="name" placeholder="Enter your full name" required />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter your email" required />
          </div>

          <div className="input-group">
            <label>Phone</label>
            <input type="tel" name="phone" placeholder="Enter phone number" required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              minLength="6"
              required
            />
          </div>

          <button type="submit" className="primary-btn auth-submit">
            Create Account →
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <button type="button" onClick={() => goTo("login")}>Login</button>
        </p>
      </div>
    </div>
  );
}

export default Register;
