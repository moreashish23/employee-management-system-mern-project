# Employee Management System (MERN)

A full-stack Employee Management System built using the MERN Stack (MongoDB, Express.js, React, and Node.js). The application provides secure user authentication and complete employee management functionality through a responsive and modern user interface.

This project was developed as part of a MERN Stack Internship Assignment, following clean architecture, REST API principles, and modern development practices.

---

## Repository

**GitHub Repository:**
`https://github.com/moreashish23/employee-management-system-mern-project

**Live Demo :**
`https://employee-management-system-mern-pro.vercel.app

---

# Features

## Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Persistent Login
* Automatic Logout on Unauthorized Requests

## Employee Management

* Add Employee
* View Employee Details
* Update Employee
* Delete Employee

Each employee record includes:

* Full Name
* Email
* Mobile Number
* Department
* Designation
* Joining Date

## Additional Features

* Dashboard Overview
* Search Employees
* Department Filter
* Sorting
* Pagination
* Department Statistics
* Responsive Design
* Skeleton Loading
* Toast Notifications
* Delete Confirmation Modal

---

# Tech Stack

| Layer            | Technology                               |
| ---------------- | ---------------------------------------- |
| Frontend         | React 18, TypeScript, Vite, Tailwind CSS |
| State Management | Redux Toolkit, React Redux               |
| Forms            | React Hook Form                          |
| Routing          | React Router DOM                         |
| HTTP Client      | Axios                                    |
| Backend          | Node.js, Express.js                      |
| Database         | MongoDB Atlas, Mongoose                  |
| Authentication   | JWT, bcryptjs                            |
| Validation       | express-validator                        |
| Security         | Helmet, CORS, Express Rate Limit         |
| Deployment       | Vercel, Render                           |

---

# Project Structure

```text
employee-management-system/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validators/
│   │   └── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── types/
│   │   └── utils/
│   ├── package.json
│   ├── vite.config.ts
│   ├── vercel.json
│   └── .env
│
├── README.md
├── API_DOCUMENTATION.md
└── DEPLOYMENT.md
```

---

# Getting Started

## Prerequisites

* Node.js v20 or later
* npm
* MongoDB Atlas Account

---

## Clone Repository

```bash
git clone https://github.com/moreashish23/employee-management-system-mern-project

cd employee-management-system
```

---

# Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file inside the backend folder.

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

Run the backend.

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

# Frontend Setup

```bash
cd frontend

npm install
```

Create a `.env` file.

```env
VITE_API_BASE_URL=/api
VITE_APP_NAME=Employee Management System
```

Run the frontend.

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Environment Variables

## Backend

| Variable       | Description                     |
| -------------- | ------------------------------- |
| PORT           | Backend server port             |
| NODE_ENV       | Development or Production       |
| MONGO_URI      | MongoDB Atlas connection string |
| JWT_SECRET     | Secret key for JWT              |
| JWT_EXPIRES_IN | Token expiration time           |

## Frontend

| Variable          | Description      |
| ----------------- | ---------------- |
| VITE_API_BASE_URL | Backend API URL  |
| VITE_APP_NAME     | Application Name |

For local development:

```env
VITE_API_BASE_URL=/api
```

For production (Vercel):

```env
VITE_API_BASE_URL=https://employee-management-system-mern-project.onrender.com/api
```

---

# API Documentation

The application exposes RESTful APIs for authentication and employee management.

## Authentication

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | `/api/auth/register` |
| POST   | `/api/auth/login`    |
| GET    | `/api/auth/me`       |

## Employees

| Method | Endpoint             |
| ------ | -------------------- |
| GET    | `/api/employees`     |
| POST   | `/api/employees`     |
| GET    | `/api/employees/:id` |
| PUT    | `/api/employees/:id` |
| DELETE | `/api/employees/:id` |

Detailed API documentation is available in:

```text
API_DOCUMENTATION.md
```

---

# Database Design

The application uses MongoDB Atlas with two primary collections:

## User

* Name
* Email
* Password (Hashed)
* Created At
* Updated At

## Employee

* Full Name
* Email
* Mobile Number
* Department
* Designation
* Joining Date
* Created By
* Created At
* Updated At

---

# Authentication

Authentication is implemented using JSON Web Tokens (JWT).

Workflow:

1. User registers or logs in.
2. Backend generates a JWT.
3. Frontend stores the token.
4. Axios automatically sends the token in the Authorization header.
5. Protected routes verify the token before granting access.
6. Invalid or expired tokens automatically log the user out.

---

# Deployment

## Backend

Platform: **Render**

Configuration:

* Root Directory: `backend`
* Build Command: `npm install`
* Start Command: `npm start`

Required Environment Variables:

* PORT
* NODE_ENV
* MONGO_URI
* JWT_SECRET
* JWT_EXPIRES_IN

---

## Frontend

Platform: **Vercel**

Configuration:

* Root Directory: `frontend`
* Framework Preset: Vite
* Build Command: `npm run build`
* Output Directory: `dist`

Environment Variable:

```env
VITE_API_BASE_URL= https://employee-management-system-mern-project.onrender.com/api
```

The frontend uses `vercel.json` to support React Router routing.

---

# Evaluation Criteria Mapping

This project satisfies the assignment requirements:

* Clean and modular code structure
* RESTful API design
* MongoDB database design using Mongoose
* JWT-based authentication and authorization
* Responsive React user interface
* Employee CRUD functionality
* Search, filter, sorting, and pagination
* Form validation
* Secure backend implementation
* Professional Git commit history
* Deployment on Render and Vercel

---

# Author

**Ashish More**

Bachelor of Engineering

MERN Stack Developer

GitHub: https://github.com/moreashish23
