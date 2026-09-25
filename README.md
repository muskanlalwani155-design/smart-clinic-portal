# Smart Clinic Healthcare Portal

A full-stack clinical management web application designed to handle patient onboarding, real-time doctor appointment bookings, and secure consultation records with role-based access.

---

**Live Application:** [View Live Clinic Portal](https://smart-clinic-portal.vercel.app/login)  
**Source Code:** [GitHub Repository](https://github.com/muskanlalwani155-design/smart-clinic-portal)

---

##  Tech Stack

* **Core Language:** JavaScript (ES6+)
* **Frontend:** React.js, modern CSS/Bootstrap, Axios
* **Backend Runtime & Framework:** Node.js, Express.js (RESTful API architecture)
* **Authentication & Backend Security:**
  * Stateless token authorization using **JSON Web Tokens (JWT)**
  * Password salting and cryptographic hashing using **bcryptjs**
  * Granular **Role-Based Access Control (RBAC)** middleware
  * Server-side route validation and sanitization
* **Database & Modeling:** MongoDB Atlas (Mongoose ODM, Document-based NoSQL)
* **API Testing & Developer Tools:** Postman, Git, GitHub
* **Deployment:** Vercel (Frontend & Serverless deployment)

---

## Core Features & Implementation

* **Secure Authentication & Authorization:**
  * Password hashing and salting using **bcryptjs** before persisting user credentials in MongoDB.
  * Stateless session management via signed **JSON Web Tokens (JWT)** attached to authenticated headers.
  * Role-Based Access Control (**RBAC**) middleware to enforce granular permissions across Patients, Doctors, and Clinic Admins.

* **Doctor Appointment Booking Engine:**
  * Real-time validation checks on backend routes to avoid double bookings or conflicting time slots.
  * Automated slot status tracking (available, booked, completed, cancelled).

* **Medical Records & Consultation History:**
  * Secure endpoints to view consultation notes, doctor prescriptions, and past clinic visits.
  * Strict access guards preventing unauthorized users from accessing sensitive patient health records.

* **Single-Page Interface (SPA):**
  * Built with React.js using hooks and client-side routing for seamless page navigation without browser reloads.
  * Centralized Axios instances configured with request and response interceptors to automatically attach bearer tokens and handle session expirations.

---

##  Project Structure

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
