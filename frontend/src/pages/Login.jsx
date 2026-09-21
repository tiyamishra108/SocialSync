function Login({ goTo }) {
  const handleLogin = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const emailOrPhone = formData.get("emailOrPhone");
    const password = formData.get("password");

    if (!emailOrPhone || !password) {
      alert("Please fill all fields.");
      return;
    }

    const existingUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );

    const user = existingUser || {
      name: "MediQueue Patient",
      email: emailOrPhone.includes("@")
        ? emailOrPhone
        : "",
      phone: emailOrPhone.includes("@")
        ? ""
        : emailOrPhone,
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

        <h1>Welcome back 👋</h1>

        <p className="auth-subtitle">
          Login to manage your appointments and queue.
        </p>

        <form onSubmit={handleLogin}>

          <div className="input-group">
            <label>Email or Phone</label>

            <input
              type="text"
              name="emailOrPhone"
              placeholder="Enter email or phone"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              required
            />
          </div>

          <div className="forgot-password">
            Forgot password?
          </div>

          <button
            type="submit"
            className="primary-btn auth-submit"
          >
            Login →
          </button>

        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button
          type="button"
          className="google-btn"
          onClick={() => {
            alert(
              "Google login is available in the full version."
            );
          }}
        >
          Continue with Google
        </button>

        <p className="auth-switch">
          Don't have an account?{" "}

          <button
            type="button"
            onClick={() => goTo("register")}
          >
            Register
          </button>
        </p>

      </div>
    </div>
  );
}

export default Login;