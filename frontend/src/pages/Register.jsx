function Register({ goTo }) {
  const handleRegister = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const password = formData.get("password");

    if (!name || !email || !phone || !password) {
      alert("Please fill all fields.");
      return;
    }

    const user = {
      name,
      email,
      phone,
    };

    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    localStorage.setItem("isLoggedIn", "true");

    goTo("dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <button
          className="auth-back"
          onClick={() => goTo("home")}
        >
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

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Phone</label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              required
            />
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

          <button
            type="submit"
            className="primary-btn auth-submit"
          >
            Create Account →
          </button>

        </form>

        <p className="auth-switch">
          Already have an account?{" "}

          <button
            type="button"
            onClick={() => goTo("login")}
          >
            Login
          </button>
        </p>

      </div>
    </div>
  );
}

export default Register;