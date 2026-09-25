# Smart Clinic Healthcare Portal

A full-stack clinical management web application designed to handle patient onboarding, real-time doctor appointment bookings, and secure consultation records with role-based access.

---

## Tech Stack

* **Frontend:** React.js, modern CSS/Bootstrap, Axios
* **Backend:** Node.js, Express.js (RESTful APIs)
* **Authentication & Security:** JSON Web Tokens (JWT), bcryptjs (password hashing & salting), Role-Based Access Control (RBAC)
* **Database:** MongoDB Atlas (Mongoose ODM, Document-based NoSQL)
* **API Testing & Tooling:** Postman, Git, GitHub
* **Deployment:** Vercel (Frontend & Serverless)

---

## Core Features & Implementation

* **Secure Authentication & Authorization:**
  * Password hashing and salting using **bcryptjs** before storing user credentials.
  * Stateless session management via signed **JSON Web Tokens (JWT)**.
  * Role-Based Access Control (**RBAC**) middleware to enforce granular permissions across Patients, Doctors, and Clinic Admins[cite: 2].

* **Doctor Appointment Booking Engine:**
  * Real-time validation checks on backend routes to avoid double bookings or conflicting time slots[cite: 2].
  * Slot status tracking (available, booked, completed, cancelled).

* **Medical Records & Consultation History:**
  * Secure endpoints to view consultation notes, doctor prescriptions, and past clinic visits[cite: 2].
  * Strict access guards preventing unauthorized users from accessing sensitive patient health records[cite: 2].

* **Single-Page Interface (SPA):**
  * Built with React.js using hooks and client-side routing for seamless page navigation without browser reloads[cite: 2].
  * Centralized Axios instances with request/response interceptors to attach bearer tokens automatically.

---

## Project Structure

```text
smart-clinic-portal/
├── client/                     # React Single-Page Application
│   ├── src/
│   │   ├── components/         # Reusable UI components (Navbar, AppointmentCard, Modals)
│   │   ├── context/            # AuthContext for JWT user session state
│   │   ├── pages/              # Dashboard, BookAppointment, Login, Register, Records
│   │   └── services/           # Axios API configuration & token interceptors
│   └── package.json
├── server/                     # Node.js & Express.js REST API
│   ├── config/                 # MongoDB Atlas connection setup
│   ├── controllers/            # Route handler logic (authController, appointmentController)
│   ├── middleware/             # authMiddleware (JWT verification) & rbacMiddleware
│   ├── models/                 # Mongoose schemas (User, Doctor, Appointment, Record)
│   ├── routes/                 # Express API routes (/api/auth, /api/appointments)
│   └── server.js               # Entry point
└── README.md
