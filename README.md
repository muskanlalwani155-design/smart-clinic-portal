# Smart Clinic Healthcare Portal

A full-stack web application designed to manage clinic workflows, real-time doctor appointment bookings, patient onboarding, and clinical consultation records.

---

## Tech Stack

* **Frontend:** React.js, modern CSS/Bootstrap, Axios
* **Backend:** Node.js, Express.js (RESTful APIs)[cite: 2]
* **Database:** MongoDB Atlas (NoSQL / Document-based)[cite: 2]
* **API Testing & Tools:** Postman, Git, GitHub[cite: 2]
* **Deployment:** Vercel[cite: 2]

---

## Key Features

* **Real-Time Appointment Scheduling:** Built-in server validation to verify doctor slot availability and prevent double bookings[cite: 2].
* **Patient Records & History:** Manages patient onboarding details, past visit logs, and prescription records securely[cite: 2].
* **Role-Based Access Control (RBAC):** Distinct workflows and access levels for patients, doctors, and clinic administrative staff to safeguard medical data[cite: 2].
* **Responsive Single-Page Interface:** Smooth, client-side routing and state management with React for mobile and desktop screens[cite: 2].

---

## Project Structure

```text
smart-clinic-portal/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # UI components (Navbar, AppointmentCard, etc.)
│   │   ├── pages/          # Dashboard, Booking, Login, Records
│   │   └── services/       # Axios API integration modules
│   └── package.json
├── server/                 # Node.js & Express backend
│   ├── controllers/        # Route controllers for bookings, auth, and patients
│   ├── models/             # MongoDB Mongoose schemas (Doctor, Patient, Appointment)
│   ├── routes/             # RESTful API endpoints
│   └── server.js           # Server entry point
└── README.md
