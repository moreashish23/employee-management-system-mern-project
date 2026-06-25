# Employee Management System (MERN)

## Overview

The Employee Management System is a full-stack web application built using the MERN stack. It allows authenticated users to manage employee records through a secure and responsive interface. The application includes user authentication, employee CRUD operations, search, filtering, sorting, pagination, and dashboard analytics.

This project was developed as part of a MERN Stack internship assignment following modern development practices and a modular project structure.

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Automatic Token Management
* Auto Logout on Unauthorized Access

### Employee Management

* Create Employee
* View Employee Details
* Update Employee
* Delete Employee
* Department-wise Employee Management

### Additional Features

* Search Employees
* Filter by Department
* Sort by Multiple Fields
* Pagination
* Dashboard Statistics
* Recent Employees
* Department Distribution
* Responsive Design
* Toast Notifications
* Skeleton Loading
* Delete Confirmation Modal

---

## Tech Stack

### Frontend

* React 18
* TypeScript
* Vite
* Tailwind CSS
* Redux Toolkit
* React Router DOM
* React Hook Form
* Axios
* React Toastify
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs
* Express Validator
* Helmet
* CORS
* Express Rate Limit

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## Project Structure

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
│   │   ├── validators/
│   │   ├── utils/
│   │   └── app.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── app/
│   │   ├── assets/
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
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/moreashish23/employee-management-system-mern-project
cd employee-management-system-mern-project
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file.

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

Run the backend:

```bash
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend

npm install
```

Create a `.env` file.

```env
VITE_API_BASE_URL=/api
VITE_APP_NAME=Employee Management System
```

Run the frontend:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## API Endpoints

### Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |
| GET    | /api/auth/me       |

### Employees

| Method | Endpoint           |
| ------ | ------------------ |
| GET    | /api/employees     |
| POST   | /api/employees     |
| GET    | /api/employees/:id |
| PUT    | /api/employees/:id |
| DELETE | /api/employees/:id |

---

## Available Scripts

### Backend

```bash
npm run dev
npm start
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

---

## Deployment

### Backend

* Platform: Render

### Frontend

* Platform: Vercel

### Database

* MongoDB Atlas

---

## Future Improvements

* Employee Profile Image Upload
* Export Employees to Excel/PDF
* Advanced Dashboard Analytics
* Email Notifications
* Audit Logs

---

## Author

**Ashish More**

Bachelor of Engineering 

MERN Stack Developer

GitHub: https://github.com/moreashish23

Live Demo: https://employee-management-system-mern-pro.vercel.app

---

## License

This project was developed for educational and internship assignment purposes.
