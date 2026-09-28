import { useEffect, useState } from "react";

function QueueStatus({ goTo }) {

  const getToday = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(
      today.getMonth() + 1
    ).padStart(2, "0");
    const day = String(
      today.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const today = getToday();

  const [appointment] = useState(() => {

    const appointments =
      JSON.parse(
        localStorage.getItem("appointments") || "[]"
      );

    const currentAppointment =
      JSON.parse(
        localStorage.getItem(
          "currentAppointment"
        ) || "null"
      );

    // Only active appointments
    const activeAppointments =
      appointments.filter((item) =>
        [
          "Confirmed",
          "Upcoming",
          "In Progress",
        ].includes(item.status)
      );

    // Only today's appointments
    const todayAppointments =
      activeAppointments.filter(
        (item) => item.date === today
      );

    // If current appointment is today's appointment,
    // use that appointment
    if (
      currentAppointment &&
      currentAppointment.date === today &&
      [
        "Confirmed",
        "Upcoming",
        "In Progress",
      ].includes(currentAppointment.status)
    ) {
      return currentAppointment;
    }

    // Otherwise use today's first appointment
    return todayAppointments[0] || null;
  });

  const [patientsAhead, setPatientsAhead] =
    useState(3);

  const [waitTime, setWaitTime] =
    useState(30);


  useEffect(() => {

    // No queue means no simulation needed
    if (!appointment) {
      return;
    }

    const timer = setInterval(() => {

      setPatientsAhead((value) =>
        value > 0 ? value - 1 : 0
      );

      setWaitTime((value) =>
        value > 0
          ? Math.max(0, value - 10)
          : 0
      );

    }, 15000);

    return () => clearInterval(timer);

  }, [appointment]);


  /*
    If there is no appointment for TODAY,
    show empty queue state.
  */

  if (!appointment) {

    return (
      <div className="queue-status-page">

        <div className="patient-page-topbar">

          <button
            className="back-button"
            onClick={() =>
              goTo("dashboard")
            }
          >
            ← Back to Dashboard
          </button>

          <span className="patient-page-badge">
            📍 LIVE QUEUE
          </span>

        </div>


        <div className="queue-empty-card">

          <div className="queue-empty-icon">
            🎟️
          </div>

          <h1>
            No active queue today
          </h1>

          <p>
            You don't have an active appointment
            in today's queue.
          </p>

          <button
            className="primary-btn"
            onClick={() =>
              goTo("doctors")
            }
          >
            Find a Doctor →
          </button>

        </div>

      </div>
    );
  }


  /*
    Calculate current token
    based on patients ahead.
  */

  const currentTokenNumber =
    Math.max(
      1,
      Number(
        appointment.token?.replace(
          /\D/g,
          ""
        ) || 21
      ) - patientsAhead
    );


  const currentToken =
    `T-${String(
      currentTokenNumber
    ).padStart(3, "0")}`;


  /*
    Queue progress
  */

  const progressWidth =
    Math.min(
      100,
      Math.max(
        10,
        100 - patientsAhead * 18
      )
    );


  return (
    <div className="queue-status-page">

      <div className="patient-page-topbar">

        <button
          className="back-button"
          onClick={() =>
            goTo("dashboard")
          }
        >
          ← Back to Dashboard
        </button>

        <span className="patient-page-badge live-page-badge">
          ● LIVE QUEUE
        </span>

      </div>


      <div className="queue-status-header">

        <span className="small-label">
          LIVE QUEUE TRACKING
        </span>

        <h1>
          Your Queue Status
        </h1>

        <p>
          Track your position while you wait
          for your appointment.
        </p>

      </div>


      <div className="queue-live-card">


        {/* DOCTOR */}

        <div className="queue-status-doctor">

          <div className="doctor-large-avatar">
            👨‍⚕️
          </div>

          <div>

            <span className="small-label">
              YOUR DOCTOR
            </span>

            <h2>
              {appointment.doctorName}
            </h2>

            <p>
              {appointment.specialty}
            </p>

          </div>

          <span className="live-badge">
            ● LIVE
          </span>

        </div>


        {/* TOKENS */}

        <div className="big-token-section">

          <div className="token-box">

            <span>
              Current Token
            </span>

            <strong>
              {currentToken}
            </strong>

          </div>


          <div className="token-arrow">
            →
          </div>


          <div className="token-box your-token-box">

            <span>
              Your Token
            </span>

            <strong>
              {appointment.token}
            </strong>

          </div>

        </div>


        {/* QUEUE PROGRESS */}

        <div className="queue-progress">

          <div className="queue-progress-top">

            <span>
              Queue progress
            </span>

            <strong>
              {patientsAhead === 0
                ? "Your turn is next"
                : `${patientsAhead} patients ahead`}
            </strong>

          </div>


          <div className="queue-progress-track">

            <div
              className="queue-progress-fill"
              style={{
                width: `${progressWidth}%`,
              }}
            />

          </div>

        </div>


        {/* QUEUE INFORMATION */}

        <div className="queue-status-info">

          <div>

            <span>
              👥
            </span>

            <small>
              Patients Ahead
            </small>

            <strong>
              {patientsAhead}
            </strong>

          </div>


          <div>

            <span>
              ⏱️
            </span>

            <small>
              Estimated Wait
            </small>

            <strong>
              ~{waitTime} min
            </strong>

          </div>


          <div>

            <span>
              🎟️
            </span>

            <small>
              Your Token
            </small>

            <strong>
              {appointment.token}
            </strong>

          </div>

        </div>


        {/* APPOINTMENT INFORMATION */}

        <div className="queue-appointment-info">

          <div>

            <span>
              Appointment
            </span>

            <strong>
              {appointment.date} ·{" "}
              {appointment.time}
            </strong>

          </div>


          <div>

            <span>
              Concern
            </span>

            <strong>
              {appointment.concern ||
                "General consultation"}
            </strong>

          </div>

        </div>


        {/* PROTOTYPE NOTE */}

        <div className="queue-note">

          <strong>
            Prototype live simulation
          </strong>

          <p>
            The queue movement shown here is
            demo data for the college project
            and does not represent a real
            hospital queue.
          </p>

        </div>

      </div>

    </div>
  );
}

export default QueueStatus;