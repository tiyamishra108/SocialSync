# 🏥 MediQueue – Hospital Queue Management System

**Social Sync presents MediQueue**, a web-based Hospital Queue Management System designed to simplify appointment booking and improve patient queue management.

MediQueue aims to reduce unnecessary waiting time in hospitals by allowing patients to book appointments, track their queue status, explore doctors, and access emergency assistance through a single platform.

> **Because waiting for healthcare shouldn't mean waiting without information.**

---

## 📌 Project Overview

MediQueue is a web-based platform that provides an organized and efficient approach to managing hospital appointments and patient queues.

Traditional hospital queue systems often involve long waiting hours, manual appointment management, and limited information about queue progress. MediQueue addresses these challenges through a centralized digital platform connecting patients and hospital receptionists.

The system provides separate portals for patients and receptionists, making appointment handling and queue monitoring easier.

---

## 🎯 Objectives

- To simplify the hospital appointment booking process.
- To reduce unnecessary waiting time for patients.
- To provide real-time queue status and token tracking.
- To maintain organized patient and appointment records.
- To provide easy access to doctor and department information.
- To support emergency requests and priority-based queue management.
- To improve coordination between patients and hospital reception staff.

---

## ✨ Key Features

### 👤 Patient Portal

- User registration and login.
- Browse available doctors and departments.
- Book doctor appointments.
- Select preferred appointment dates and time slots.
- Generate appointment tokens.
- Track queue position and estimated waiting time.
- View upcoming and previous appointments.
- Manage profile and account settings.

### 🏥 Receptionist Portal

- Dedicated receptionist login.
- View and manage patient appointments.
- Monitor patient queues.
- Manage token status.
- View pending emergency requests.
- Approve or reject emergency requests.

### 🚨 Emergency Management

- Dedicated emergency assistance section.
- Emergency request submission.
- Priority-based queue management.
- Receptionist-controlled emergency request approval.

### 🎨 User Interface

- Modern and responsive interface.
- Light and dark theme support.
- Interactive dashboard.
- Simple navigation and user-friendly design.
- Notification and profile settings.

---

## 🛠️ Technology Stack

| Technology   | Purpose                       |
| ------------ | ----------------------------- |
| React.js     | Frontend development          |
| Vite         | Frontend build tool           |
| JavaScript   | Application functionality     |
| HTML5        | Webpage structure             |
| CSS3         | Styling and responsive design |
| Node.js      | Backend runtime               |
| Express.js   | Backend API development       |
| PostgreSQL   | Relational database           |
| Git & GitHub | Version control               |
| Netlify      | Frontend deployment           |

---

## 🗄️ Database Design

MediQueue uses PostgreSQL to store and manage application data.

The database consists of the following major tables:

| Table        | Description                             |
| ------------ | --------------------------------------- |
| Users        | Stores patient and receptionist details |
| Departments  | Stores hospital department information  |
| Doctors      | Stores doctor profiles and availability |
| Appointments | Maintains patient appointment records   |
| Tokens       | Manages patient tokens and queue status |

The database supports appointment management, token generation, queue tracking, and emergency request handling.

---

## 📂 Project Structure

```text
MediQueue/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── data/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

Follow these steps to run MediQueue locally.

### 1. Clone the Repository

```bash
git clone https://github.com/tiyamishra108/SocialSync.git
```

### 2. Navigate to the Project

```bash
cd SocialSync
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

### 4. Setup Backend

Open another terminal:

```bash
cd backend
npm install
npm start
```

### 5. Database Configuration

- Install and configure PostgreSQL.
- Create the MediQueue database.
- Configure database credentials in the backend environment configuration.
- Execute the SQL scripts to create the required tables.
- Ensure the backend successfully connects to PostgreSQL.

---

## 🌐 Live Deployment

**Live Project:** [https://mediqueue112.netlify.app/](https://mediqueue112.netlify.app/)

---

## 🔮 Future Scope

- Integration of online payment facilities.
- SMS and email appointment notifications.
- Advanced analytics for hospital administration.
- Multiple hospital support.
- Doctor-side appointment management.
- Enhanced queue prediction using historical data.
- Mobile application integration.

---

## 📚 References

- React Documentation – [https://react.dev/](https://react.dev/)
- Vite Documentation – [https://vite.dev/](https://vite.dev/)
- Node.js Documentation – [https://nodejs.org/](https://nodejs.org/)
- Express.js Documentation – [https://expressjs.com/](https://expressjs.com/)
- PostgreSQL Documentation – [https://www.postgresql.org/docs/](https://www.postgresql.org/docs/)
- MDN Web Docs – [https://developer.mozilla.org/](https://developer.mozilla.org/)

---

## 📄 License

This project was developed as an academic project by **Tiya Mishra(Leader)_SocialSync**.

