import { useState } from "react";

function Login({ goTo }) {
  const [loginType, setLoginType] = useState("user");
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const emailOrPhone = formData.get("emailOrPhone");
    const password = formData.get("password");

    if (!emailOrPhone || !password) {
      alert("Please fill all fields.");
      return;
    }

    if (loginType === "receptionist") {
      const isValidReceptionist =
        emailOrPhone === "reception@mediqueue.com" &&
        password === "Reception@123";

      if (!isValidReceptionist) {
        alert("Invalid receptionist email or password.");
        return;
      }

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          name: "Receptionist",
          email: "reception@mediqueue.com",
          role: "receptionist",
        })
      );

      localStorage.setItem("userRole", "receptionist");
      localStorage.setItem("isLoggedIn", "true");

      goTo("receptionistDashboard");
      return;
    }

    const registeredUser = JSON.parse(
      localStorage.getItem("registeredUser") || "null"
    );

    if (!registeredUser) {
      alert("No account found. Please register first.");
      goTo("register");
      return;
    }

    const isValidUser =
      (emailOrPhone === registeredUser.email ||
        emailOrPhone === registeredUser.phone) &&
      password === registeredUser.password;

    if (!isValidUser) {
      alert("Invalid email/phone or password.");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        name: registeredUser.name,
        email: registeredUser.email,
        phone: registeredUser.phone,
        role: "user",
      })
    );

    localStorage.setItem("userRole", "user");
    localStorage.setItem("isLoggedIn", "true");

    goTo("dashboard");
  };

  return (
    <div className="auth-page portal-auth-page">
      <div className="portal-auth-container">

        <button
          className="portal-back-btn"
          onClick={() =>
            showLoginForm
              ? setShowLoginForm(false)
              : goTo("home")
          }
        >
          ← {showLoginForm ? "Back to Portals" : "Back to Home"}
        </button>

        {!showLoginForm ? (
          <>
            <div className="portal-heading">
              <span className="portal-eyebrow">WELCOME TO MEDIQUEUE</span>
              <h1>Choose Your Portal</h1>
              <p>
                Select how you want to access MediQueue.
              </p>
            </div>

            <div className="portal-selection-grid">

              {/* PATIENT PORTAL */}
              <div
                className="portal-option-card"
                onClick={() => {
                  setLoginType("user");
                  setShowLoginForm(true);
                }}
              >
                <div className="portal-icon patient-icon">
                  ♡
                </div>

                <span className="portal-card-label">
                  FOR PATIENTS
                </span>

                <h2>Patient Portal</h2>

                <p>
                  Book appointments, track your token and
                  manage your healthcare journey.
                </p>

                <button className="portal-card-action">
                  Continue as Patient <span>→</span>
                </button>
              </div>

              {/* RECEPTION PORTAL */}
              <div
                className="portal-option-card"
                onClick={() => {
                  setLoginType("receptionist");
                  setShowLoginForm(true);
                }}
              >
                <div className="portal-icon reception-icon">
                  ✚
                </div>

                <span className="portal-card-label">
                  FOR STAFF
                </span>

                <h2>Reception Portal</h2>

                <p>
                  Manage appointments, patient queues
                  and daily hospital operations.
                </p>

                <button className="portal-card-action">
                  Continue as Receptionist <span>→</span>
                </button>
              </div>

            </div>

            <div className="portal-footer">
              Trusted Care. Smarter Queues. Better Experience.
            </div>
          </>
        ) : (
          <div className="portal-login-form">

            <div className="portal-login-icon">
              {loginType === "user" ? "♡" : "✚"}
            </div>

            <span className="portal-eyebrow">
              {loginType === "user"
                ? "PATIENT PORTAL"
                : "RECEPTION PORTAL"}
            </span>

            <h1>
              {loginType === "user"
                ? "Welcome Back!"
                : "Receptionist Login"}
            </h1>

            <p className="portal-form-subtitle">
              {loginType === "user"
                ? "Login to manage your appointments and queue."
                : "Login to access the hospital management dashboard."}
            </p>

            <form onSubmit={handleLogin}>
              <div className="portal-input-group">
                <label>Email or Phone</label>
                <input
                  type="text"
                  name="emailOrPhone"
                  placeholder="Enter your email or phone"
                  required
                />
              </div>

              <div className="portal-input-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {loginType === "user" && (
                <div className="portal-forgot">
                  Forgot password?
                </div>
              )}

              <button type="submit" className="portal-submit-btn">
                Login to {loginType === "user" ? "Patient" : "Reception"} Portal
                <span> →</span>
              </button>
            </form>

            {loginType === "user" && (
              <>
                <div className="portal-divider">
                  <span>OR</span>
                </div>

                <button
                  className="portal-google-btn"
                  onClick={() => alert("Google login coming soon!")}
                >
                  Continue with Google
                </button>

                <p className="portal-register">
                  Don't have an account?
                  <button onClick={() => goTo("register")}>
                    Register
                  </button>
                </p>
              </>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default Login;