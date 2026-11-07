import { useState } from "react";
import doctors from "../data/doctors";
import ThemeToggle from "../components/ThemeToggle";

function Home({ goTo, setSelectedDoctor }) {
  const [showNotifications, setShowNotifications] = useState(false);

  const doctorImage =
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=900&auto=format&fit=crop";

  const features = [
    { icon: "🎫", title: "Digital Tokens", description: "Get your token instantly without standing in long queues." },
    { icon: "📊", title: "Live Queue Tracking", description: "Track your position and estimated waiting time." },
    { icon: "🚨", title: "Emergency Priority", description: "Priority assistance for emergency patients." },
    { icon: "🕒", title: "24/7 Support", description: "Access essential hospital services whenever needed." },
  ];

  const steps = [
    { number: "01", title: "Register", description: "Create your account to access MediQueue services." },
    { number: "02", title: "Book Appointment", description: "Choose your preferred doctor and appointment." },
    { number: "03", title: "Get Your Token", description: "Receive your digital token and queue details." },
    { number: "04", title: "Track Your Turn", description: "Monitor your queue status in real time." },
  ];

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const bookDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    goTo("login");
  };

  return (
    <div className="mq-home">

      {/* NAVBAR */}
      <header className="mq-navbar">

        <div className="mq-logo" onClick={() => scrollToSection("home")}>
          Medi<span>Queue</span>
        </div>

        <nav className="mq-nav-links">
          <button onClick={() => scrollToSection("home")}>Home</button>
          <button onClick={() => scrollToSection("doctors")}>Doctors</button>
          <button onClick={() => scrollToSection("how-it-works")}>How It Works</button>
          <button onClick={() => scrollToSection("about")}>About</button>
        </nav>

        <div className="mq-nav-actions">

  {/* THEME TOGGLE */}
  <div className="mq-theme-toggle">
    <ThemeToggle />
  </div>

  {/* NOTIFICATIONS */}
  <div className="mq-notification-wrapper">
    <button
      className="mq-notification-btn"
      onClick={() => setShowNotifications(!showNotifications)}
      aria-label="Notifications"
    >
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </svg>
      <span className="mq-notification-dot"></span>
    </button>

    {showNotifications && (
      <div className="mq-notification-panel">
        <div className="mq-notification-heading">
          <h3>Notifications</h3>
          <button onClick={() => setShowNotifications(false)}>×</button>
        </div>
        <div className="mq-notification-empty">
          <span>🔔</span>
          <h4>You're all caught up!</h4>
          <p>There are no new notifications right now.</p>
        </div>
      </div>
    )}
  </div>

  {/* EMERGENCY - RIGHT CORNER */}
  <button
    className="mq-nav-emergency"
    onClick={() => goTo("emergency")}
  >
    <span>✚</span> Emergency
  </button>

</div>
    
      </header>


      {/* HERO SECTION */}
      <section className="mq-hero" id="home">
        <div className="mq-hero-container">

          <div className="mq-hero-content">
            <span className="mq-eyebrow">YOUR HEALTH, OUR PRIORITY</span>

            <h1>
              Healthcare,<br />
              without the<br />
              <span>waiting.</span>
            </h1>

            <p>
              A smarter way to manage hospital appointments. Book doctors,
              get digital tokens and track your waiting time — all in one place.
            </p>

            <div className="mq-hero-buttons">
              <button
                className="mq-btn-primary"
                onClick={() => goTo("login")}
              >
                Get Started <span>→</span>
              </button>

              <button
                className="mq-btn-secondary"
                onClick={() => goTo("queueStatus")}
              >
                Track Your Queue
              </button>
            </div>

            <div className="mq-trust-line">
              <span>✦</span> Smarter appointments. Better care.
            </div>
          </div>


          <div className="mq-doctor-area">
            <div className="mq-doctor-arch">
              <img src={doctorImage} alt="Female healthcare professional" />
            </div>

            <div className="mq-image-caption">
              <span className="mq-caption-dot"></span>
              Your health comes first
            </div>
          </div>


          <div className="mq-hero-features">
            {features.map((feature, index) => (
              <div className="mq-feature-card" key={index}>
                <div className="mq-feature-icon">{feature.icon}</div>

                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* TOP DOCTORS */}
      <section className="mq-doctors-section" id="doctors">
        <div className="mq-doctors-header">
          <div>
            <span className="mq-eyebrow">MEET OUR SPECIALISTS</span>
            <h2>Care from the experts.</h2>
            <p>Find the right specialist for your healthcare needs.</p>
          </div>

          <button
            className="mq-view-doctors"
            onClick={() => goTo("doctors")}
          >
            View All Doctors →
          </button>
        </div>

        <div className="mq-doctors-grid">
          {doctors.slice(0, 3).map((doctor, index) => (
            <div className="mq-doctor-card" key={doctor.id || index}>

              <div className="mq-doctor-profile">
                <div className="mq-doctor-card-image">
                  <img src={doctor.image} alt={doctor.name} />
                </div>

                <div className="mq-doctor-details">
                  <span className="mq-specialist-label">
                    MEDIQUEUE SPECIALIST
                  </span>

                  <h3>{doctor.name}</h3>
                  <p>{doctor.specialty}</p>

                  <div className="mq-doctor-rating">
                    <span>★</span> {doctor.rating || "4.8"} Rating
                  </div>
                </div>
              </div>

              <button
                className="mq-doctor-book-btn"
                onClick={() => bookDoctor(doctor)}
              >
                Book Appointment <span>→</span>
              </button>

            </div>
          ))}
        </div>
      </section>


      {/* HOW IT WORKS */}
      <section className="mq-how-section" id="how-it-works">
        <div className="mq-section-heading">
          <span className="mq-eyebrow">SIMPLE PROCESS</span>
          <h2>How MediQueue works</h2>
          <p>Four simple steps towards a hassle-free visit.</p>
        </div>

        <div className="mq-steps-grid">
          {steps.map((step) => (
            <div className="mq-step-card" key={step.number}>
              <span className="mq-step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ABOUT */}
      <section className="mq-about-section" id="about">
        <div className="mq-about-card">
          <div>
            <span className="mq-eyebrow">ABOUT MEDIQUEUE</span>

            <h2>
              Less waiting.<br />
              More caring.
            </h2>

            <p>
              MediQueue makes hospital visits simpler by connecting patients
              with doctors through digital appointments, smart token generation
              and live queue updates.
            </p>

            <button
              className="mq-btn-primary"
              onClick={() => goTo("login")}
            >
              Start Your Journey →
            </button>
          </div>

          <div className="mq-about-symbol">
            <span>✚</span>
            <p>Care made simpler.</p>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="mq-footer">
        <div className="mq-footer-content">

          <div>
            <h2>Medi<span>Queue</span></h2>
            <p>Smarter healthcare, better experiences.</p>
          </div>

          <div className="mq-footer-links">
            <button onClick={() => scrollToSection("home")}>Home</button>
            <button onClick={() => scrollToSection("doctors")}>Doctors</button>
            <button onClick={() => goTo("login")}>Login</button>
          </div>

        </div>

        <div className="mq-footer-bottom">
          © 2026 MediQueue. All rights reserved.
        </div>
      </footer>

    </div>
  );
}

export default Home;