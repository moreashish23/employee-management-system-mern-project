# Employee Management System (EMS)

A full-stack Employee Management System built with the **MERN Stack** — MongoDB Atlas, Express.js, React 18 + TypeScript, and Node.js. Built as an internship assignment demonstrating production-ready architecture.

---

## Features

### Authentication
- User registration with password validation
- User login with JWT authentication
- Protected routes (frontend + backend)
- Auto token injection via Axios interceptors
- Auto logout on token expiry (401 interceptor)

### Employee Management
- Add, view, edit, and delete employees
- Fields: Full Name, Email, Mobile, Department, Designation, Joining Date
- Department colour-coded badges

### Advanced Features
- **Pagination** — configurable page size
- **Search** — by name, email, or designation
- **Filter** — by department
- **Sort** — by any column, ascending or descending
- **Dashboard** — stats cards, department breakdown chart, recent joiners
- **Skeleton loaders** — smooth loading experience
- **Toast notifications** — all actions give feedback
- **Delete confirmation modal** — prevents accidental deletes
- **Responsive** — works on mobile, tablet, and desktop

---

## Tech Stack

| Layer     | Technology                                          |
|-----------|-----------------------------------------------------|
| Frontend  | React 18, TypeScript, Vite, Tailwind CSS v3        |
| State     | Redux Toolkit, React Redux                          |
| Forms     | React Hook Form                                     |
| Routing   | React Router DOM v6                                 |
| HTTP      | Axios                                               |
| UI        | React Icons, React Toastify                         |
| Backend   | Node.js v20, Express.js                             |
| Database  | MongoDB Atlas, Mongoose                             |
| Auth      | JWT (jsonwebtoken), bcryptjs                        |
| Validation| express-validator                                   |
| Security  | helmet, express-rate-limit, cors                    |
| Dev Tools | nodemon, Vite HMR                                   |
| Container | Docker, Docker Compose, Nginx                       |

---

## Project Structure

```
employee-management-system/
├── backend/
│   ├── src/
│   │   ├── config/          # MongoDB connection
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Auth + error middleware
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # Express routers
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Helpers (token, ApiResponse)
│   │   ├── validators/      # express-validator chains
│   │   └── app.js           # Express app setup
│   ├── server.js            # Entry point
│   ├── .env.example
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── api/             # Axios instance + API calls
│   │   ├── app/             # Redux store
│   │   ├── components/      # Reusable UI components
│   │   ├── features/        # Redux slices (auth, employees)
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Route-level page components
│   │   ├── routes/          # AppRouter + ProtectedRoute
│   │   ├── types/           # TypeScript interfaces
│   │   └── utils/           # Formatters, token helpers
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── Dockerfile
├── docker-compose.yml
├── README.md
├── API_DOCUMENTATION.md
└── DEPLOYMENT.md
```

---

## Prerequisites

| Tool       | Minimum Version |
|------------|-----------------|
| Node.js    | v20.x           |
| npm        | v9.x            |
| Docker     | v24.x           |
| Docker Compose | v2.x        |
| MongoDB Atlas | Free tier    |

---

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/employee-management-system.git
cd employee-management-system
```

### 2. Configure backend environment

```bash
cd backend
cp .env.example .env
```

Edit `.env` and fill in your values:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/employee_management?retryWrites=true&w=majority
JWT_SECRET=yourSuperSecretKey_min32chars
JWT_EXPIRES_IN=7d
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

### 3. Install and run the backend

```bash
# Still inside backend/
npm install
npm run dev
```

The API will be available at `http://localhost:5000`.  
Health check: `http://localhost:5000/health`

### 4. Install and run the frontend

```bash
# Open a new terminal
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

> The Vite dev server proxies all `/api/*` requests to `http://localhost:5000` automatically.

---

## Environment Variables Reference

### Backend (`backend/.env`)

| Variable              | Required | Default     | Description                          |
|-----------------------|----------|-------------|--------------------------------------|
| `PORT`                | No       | `5000`      | Express server port                  |
| `NODE_ENV`            | No       | `development` | Environment (`development`/`production`) |
| `MONGO_URI`           | **Yes**  | —           | MongoDB Atlas connection string      |
| `JWT_SECRET`          | **Yes**  | —           | Secret key for JWT signing (min 32 chars) |
| `JWT_EXPIRES_IN`      | No       | `7d`        | JWT expiry duration                  |
| `RATE_LIMIT_WINDOW_MS`| No       | `900000`    | Rate limit window in ms (15 min)     |
| `RATE_LIMIT_MAX`      | No       | `100`       | Max requests per window per IP       |

---

## MongoDB Atlas Setup

1. Visit [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a **free M0 cluster**
3. Under **Database Access** → Add user with **Atlas admin** role
4. Under **Network Access** → Add `0.0.0.0/0` (development) or your server IP (production)
5. Click **Connect** → **Connect your application** → copy the URI
6. Replace `<username>` and `<password>` in your `.env`

---

## Docker Setup

### Build and run with Docker Compose

```bash
# From the root directory
docker-compose up --build
```

| Service   | URL                       |
|-----------|---------------------------|
| Frontend  | http://localhost          |
| Backend   | http://localhost:5000     |
| API Health| http://localhost:5000/health |

### Stop containers

```bash
docker-compose down
```

### Rebuild after code changes

```bash
docker-compose up --build --force-recreate
```

### View logs

```bash
# All services
docker-compose logs -f

# Backend only
docker-compose logs -f backend

# Frontend only
docker-compose logs -f frontend
```

---

## Available API Endpoints

| Method | Endpoint                  | Auth | Description              |
|--------|---------------------------|------|--------------------------|
| GET    | `/health`                 | No   | Health check             |
| POST   | `/api/auth/register`      | No   | Register user            |
| POST   | `/api/auth/login`         | No   | Login user               |
| GET    | `/api/auth/me`            | Yes  | Get current user profile |
| GET    | `/api/employees`          | Yes  | List employees (with pagination, search, sort, filter) |
| POST   | `/api/employees`          | Yes  | Create employee          |
| GET    | `/api/employees/:id`      | Yes  | Get one employee         |
| PUT    | `/api/employees/:id`      | Yes  | Update employee          |
| DELETE | `/api/employees/:id`      | Yes  | Delete employee          |

Full API documentation: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

## Scripts Reference

### Backend

| Command       | Description                 |
|---------------|-----------------------------|
| `npm run dev` | Start with nodemon (hot reload) |
| `npm start`   | Start production server     |

### Frontend

| Command         | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Start Vite dev server    |
| `npm run build` | Build for production     |
| `npm run preview` | Preview production build |

---

## Git Commit Conventions

```
feat:     New feature
fix:      Bug fix
refactor: Code refactor (no feature/bug change)
style:    Formatting, no logic change
docs:     Documentation changes
chore:    Build, dependencies, config
```

---

## Author

Built for the MERN Stack Internship Assignment.

---

## License

MIT
