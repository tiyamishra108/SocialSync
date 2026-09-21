import ThemeToggle from "./ThemeToggle";

function Navbar({ goTo }) {
  return (
    <nav className="navbar">

      <div className="nav-container">

        <div
          className="logo"
          onClick={() => goTo("home")}
        >
          <div className="logo-icon">+</div>
          <span>MediQueue</span>
        </div>

        <div className="nav-links">

          <button
            onClick={() => goTo("home")}
          >
            Home
          </button>

          <button
            onClick={() => goTo("doctors")}
          >
            Doctors
          </button>

          <a href="#features">
            Features
          </a>

          <a href="#how-it-works">
            How It Works
          </a>

          <button
            className="emergency-btn"
            onClick={() => goTo("emergency")}
          >
            🚨 Emergency
          </button>

        </div>

        <div className="nav-actions">

          <ThemeToggle />

          <button
            className="login-btn"
            onClick={() => goTo("login")}
          >
            Login
          </button>

          <button
            className="register-btn"
            onClick={() => goTo("register")}
          >
            Register
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;