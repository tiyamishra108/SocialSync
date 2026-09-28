import ThemeToggle from "./ThemeToggle";

function Navbar({ goTo }) {

  const handleFeatures = () => {
    goTo("home");

    setTimeout(() => {
      document
        .getElementById("features")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  };

  const handleHowItWorks = () => {
    goTo("home");

    setTimeout(() => {
      document
        .getElementById("how-it-works")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  };

  return (
    <nav className="navbar">

      <div className="nav-container">

        {/* LOGO */}

        <div
          className="logo"
          onClick={() => goTo("home")}
        >
          <div className="logo-icon">
            +
          </div>

          <span>
            MediQueue
          </span>
        </div>


        {/* NAV LINKS */}

        <div className="nav-links">

          {/* Home button intentionally opens Dashboard */}

          <button
            onClick={() => goTo("dashboard")}
          >
            Home
          </button>


          <button
            onClick={() => goTo("doctors")}
          >
            Doctors
          </button>


          <button
            onClick={handleFeatures}
          >
            Features
          </button>


          <button
            onClick={handleHowItWorks}
          >
            How It Works
          </button>


          <button
            className="emergency-btn"
            onClick={() =>
              goTo("emergency")
            }
          >
            🚨 Emergency
          </button>

        </div>


        {/* RIGHT SIDE */}

        <div className="nav-actions">

          <ThemeToggle />

          <button
            className="login-btn"
            onClick={() =>
              goTo("login")
            }
          >
            Login
          </button>

          <button
            className="register-btn"
            onClick={() =>
              goTo("register")
            }
          >
            Register
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;