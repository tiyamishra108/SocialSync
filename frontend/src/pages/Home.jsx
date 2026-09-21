import Navbar from "../components/Navbar";
import doctors from "../data/doctors";

function Home({ goTo, setSelectedDoctor }) {
  return (
    <>
      <Navbar goTo={goTo} />

      <main>

        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero-container">

            <div className="hero-content">

              <span className="hero-badge">
                🏥 Smarter Hospital Visits
              </span>

              <h1>
                Your time matters.
                <br />
                <span>We make waiting simpler.</span>
              </h1>

              <p>
                MediQueue helps patients book appointments,
                get digital tokens and track their hospital
                queue in real time.
              </p>

              <div className="hero-buttons">

                <button
                  className="primary-btn"
                  onClick={() => goTo("login")}
                >
                  Book an Appointment →
                </button>

                <button
                  className="secondary-btn"
                  onClick={() => goTo("login")}
                >
                  Check Queue Status
                </button>

              </div>

              <div className="trust-row">
                <span>✓ Easy Booking</span>
                <span>✓ Digital Tokens</span>
                <span>✓ Live Queue</span>
              </div>

            </div>

            {/* TOP DOCTORS */}
            <div className="top-doctors-preview">

              <div className="preview-header">

                <div>
                  <span className="small-label">
                    AVAILABLE TODAY
                  </span>

                  <h3>Top Doctors</h3>
                </div>

                <button onClick={() => goTo("doctors")}>
                  View all →
                </button>

              </div>

              {doctors.slice(0, 3).map((doctor) => (

                <div
                  className="doctor-mini-card"
                  key={doctor.id}
                >

                  <div className="doctor-avatar">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                    />
                  </div>

                  <div className="doctor-mini-info">

                    <h4>{doctor.name}</h4>

                    <p>{doctor.specialty}</p>

                    <span>
                      ⭐ {doctor.rating}
                    </span>

                  </div>

                  <button
                    className="mini-book-btn"
                    onClick={() => {
                      setSelectedDoctor(doctor);
                      goTo("bookAppointment");
                    }}
                  >
                    Book
                  </button>

                </div>

              ))}

            </div>

          </div>
        </section>


        {/* FEATURES */}
        <section
          className="features-section"
          id="features"
        >

          <div className="section-heading">

            <span>WHY MEDIQUEUE</span>

            <h2>
              Everything you need for a
              <br />
              smoother hospital visit.
            </h2>

          </div>

          <div className="feature-grid">

            <FeatureCard
              icon="🎟️"
              title="Digital Tokens"
              text="Get your queue token digitally without standing in long lines."
            />

            <FeatureCard
              icon="📍"
              title="Live Queue Tracking"
              text="Know your current position and track the queue from anywhere."
            />

            <FeatureCard
              icon="🚨"
              title="Emergency Priority"
              text="Dedicated emergency support for urgent situations."
              emergency
            />

          </div>

        </section>


        {/* HOW IT WORKS */}
        <section
          className="how-section"
          id="how-it-works"
        >

          <div className="section-heading">

            <span>HOW IT WORKS</span>

            <h2>
              Simple from start to finish.
            </h2>

          </div>

          <div className="steps">

            <Step
              number="01"
              title="Choose a Doctor"
              text="Browse doctors and select the specialist you need."
            />

            <Step
              number="02"
              title="Book Appointment"
              text="Choose your preferred date and time."
            />

            <Step
              number="03"
              title="Get Your Token"
              text="Receive a digital queue token instantly."
            />

            <Step
              number="04"
              title="Track Your Queue"
              text="Monitor your queue status while you wait."
            />

          </div>

        </section>


        {/* ABOUT */}
        <section className="about-section">

          <div className="about-card">

            <div>

              <span className="small-label">
                ABOUT MEDIQUEUE
              </span>

              <h2>
                Less waiting.
                <br />
                More care.
              </h2>

              <p>
                MediQueue is designed to make hospital
                visits more organized and convenient for
                patients while helping hospitals manage
                queues efficiently.
              </p>

            </div>

            <div className="about-stat">

              <strong>24/7</strong>

              <span>
                Access to your
                <br />
                queue information
              </span>

            </div>

          </div>

        </section>

      </main>

      <Footer goTo={goTo} />
    </>
  );
}


/* =========================
   FEATURE CARD
========================= */

function FeatureCard({
  icon,
  title,
  text,
  emergency
}) {
  return (
    <div
      className={`feature-card ${
        emergency ? "feature-emergency" : ""
      }`}
    >

      <div className="feature-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>

      <span className="feature-arrow">
        →
      </span>

    </div>
  );
}


/* =========================
   STEP
========================= */

function Step({
  number,
  title,
  text
}) {
  return (
    <div className="step">

      <span className="step-number">
        {number}
      </span>

      <h3>{title}</h3>

      <p>{text}</p>

    </div>
  );
}


/* =========================
   FOOTER
========================= */

function Footer({ goTo }) {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">

          <div className="logo">

            <div className="logo-icon">
              +
            </div>

            <span>
              MediQueue
            </span>

          </div>

          <p>
            Making hospital visits simpler,
            one queue at a time.
          </p>

        </div>


        <div className="footer-links">

          <div>

            <h4>Quick Links</h4>

            <button onClick={() => goTo("home")}>
              Home
            </button>

            <button onClick={() => goTo("doctors")}>
              Doctors
            </button>

            <button onClick={() => goTo("login")}>
              Login
            </button>

          </div>


          <div>

            <h4>Support</h4>

            <span>Help Center</span>
            <span>Contact Us</span>
            <span>Privacy</span>

          </div>

        </div>

      </div>


      <div className="footer-bottom">
        © 2026 MediQueue. College Project.
      </div>

    </footer>
  );
}

export default Home;