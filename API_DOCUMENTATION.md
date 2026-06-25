# EMS — API Documentation

**Base URL (Development):** `http://localhost:5000`  
**Base URL (Production):** `https://your-domain.com`  
**API Prefix:** `/api`  
**Content-Type:** `application/json`  
**Authentication:** `Bearer <JWT_TOKEN>` in `Authorization` header

---

## Standard Response Format

All endpoints return a consistent JSON envelope.

### Success

```json
{
  "success": true,
  "message": "Human-readable success message",
  "data": { },
  "meta": { }
}
```

### Error

```json
{
  "success": false,
  "message": "Human-readable error message",
  "errors": [ ]
}
```

### Pagination Meta (on list endpoints)

```json
{
  "meta": {
    "total": 42,
    "page": 2,
    "limit": 10,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": true
  }
}
```

---

## HTTP Status Codes

| Code | Meaning                         |
|------|---------------------------------|
| 200  | OK — request succeeded          |
| 201  | Created — resource created      |
| 400  | Bad Request — invalid ID format |
| 401  | Unauthorized — missing/invalid/expired token |
| 404  | Not Found — resource not found  |
| 409  | Conflict — duplicate email      |
| 422  | Unprocessable Entity — validation failed |
| 429  | Too Many Requests — rate limited |
| 500  | Internal Server Error           |

---

## Health Check

### `GET /health`

Check if the API server is running.

**Auth required:** No

**Response — 200 OK**
```json
{
  "success": true,
  "message": "Employee Management API is running.",
  "environment": "development",
  "timestamp": "2024-01-15T10:00:00.000Z"
}
```

---

## Authentication

### `POST /api/auth/register`

Register a new user account.

**Auth required:** No

**Request Body**

| Field      | Type   | Required | Constraints                                                         |
|------------|--------|----------|---------------------------------------------------------------------|
| `name`     | String | Yes      | 2–50 characters                                                     |
| `email`    | String | Yes      | Valid email format, unique                                          |
| `password` | String | Yes      | Min 6 chars, must contain uppercase, lowercase, and a number        |

```json
{
  "name": "Ashish Sharma",
  "email": "ashish@example.com",
  "password": "Ashish@123"
}
```

**Response — 201 Created**
```json
{
  "success": true,
  "message": "Account created successfully. Welcome!",
  "data": {
    "user": {
      "_id": "65a1b2c3d4e5f6a7b8c9d0e1",
      "name": "Ashish Sharma",
      "email": "ashish@example.com",
      "createdAt": "2024-01-15T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses**

| Status | Condition             | Message                                      |
|--------|-----------------------|----------------------------------------------|
| 422    | Validation fails      | `"Validation failed"` with `errors` array    |
| 409    | Email already exists  | `"An account with this email already exists."` |

---

### `POST /api/auth/login`

Log in with email and password.

**Auth required:** No

**Request Body**

| Field      | Type   | Required |
|------------|--------|----------|
| `email`    | String | Yes      |
| `password` | String | Yes      |

```json
{
  "email": "ashish@example.com",
  "password": "Ashish@123"
}
```

**Response — 200 OK**
```json
{
  "success": true,
  "message": "Login successful. Welcome back!",
  "data": {
    "user": {
      "_id": "65a1b2c3d4e5f6a7b8c9d0e1",
      "name": "Ashish Sharma",
      "email": "ashish@example.com",
      "createdAt": "2024-01-15T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses**

| Status | Condition                | Message                        |
|--------|--------------------------|--------------------------------|
| 422    | Validation fails         | `"Validation failed"`          |
| 401    | Wrong credentials        | `"Invalid email or password."` |

---

### `GET /api/auth/me`

Get the currently authenticated user's profile.

**Auth required:** Yes

**Headers**
```
Authorization: Bearer <token>
```

**Response — 200 OK**
```json
{
  "success": true,
  "message": "User profile retrieved.",
  "data": {
    "user": {
      "_id": "65a1b2c3d4e5f6a7b8c9d0e1",
      "name": "Ashish Sharma",
      "email": "ashish@example.com",
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z"
    }
  }
}
```

**Error Responses**

| Status | Condition           | Message                                              |
|--------|---------------------|------------------------------------------------------|
| 401    | No token            | `"Access denied. No token provided. Please log in."` |
| 401    | Invalid token       | `"Invalid token. Please log in again."`              |
| 401    | Expired token       | `"Token has expired. Please log in again."`          |

---

## Employees

> All employee endpoints require `Authorization: Bearer <token>` header.

---

### `GET /api/employees`

Get a paginated, searchable, filterable, sortable list of employees.

**Auth required:** Yes

**Query Parameters**

| Parameter   | Type   | Default    | Description                                               |
|-------------|--------|------------|-----------------------------------------------------------|
| `page`      | Number | `1`        | Page number (min: 1)                                      |
| `limit`     | Number | `10`       | Results per page (min: 1, max: 100)                       |
| `search`    | String | `""`       | Search across fullName, email, designation (case-insensitive regex) |
| `department`| String | `""`       | Filter by exact department name                           |
| `sortBy`    | String | `createdAt`| Sort field: `fullName`, `email`, `department`, `designation`, `joiningDate`, `createdAt` |
| `sortOrder` | String | `desc`     | `asc` or `desc`                                           |

**Example Requests**
```
GET /api/employees
GET /api/employees?page=2&limit=5
GET /api/employees?search=Riya
GET /api/employees?department=Engineering
GET /api/employees?sortBy=fullName&sortOrder=asc
GET /api/employees?department=Engineering&search=dev&sortBy=joiningDate&sortOrder=asc&page=1&limit=10
```

**Response — 200 OK**
```json
{
  "success": true,
  "message": "Employees retrieved successfully.",
  "data": {
    "employees": [
      {
        "_id": "65a2c3d4e5f6a7b8c9d0e1f2",
        "fullName": "Riya Mehta",
        "email": "riya.mehta@techcorp.com",
        "mobileNumber": "9876543210",
        "department": "Engineering",
        "designation": "Senior Software Engineer",
        "joiningDate": "2024-01-15T00:00:00.000Z",
        "createdBy": {
          "_id": "65a1b2c3d4e5f6a7b8c9d0e1",
          "name": "Ashish Sharma",
          "email": "ashish@example.com"
        },
        "createdAt": "2024-01-15T10:05:00.000Z",
        "updatedAt": "2024-01-15T10:05:00.000Z"
      }
    ]
  },
  "meta": {
    "total": 42,
    "page": 1,
    "limit": 10,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

### `POST /api/employees`

Create a new employee.

**Auth required:** Yes

**Request Body**

| Field          | Type   | Required | Constraints                                                  |
|----------------|--------|----------|--------------------------------------------------------------|
| `fullName`     | String | Yes      | 2–100 characters                                             |
| `email`        | String | Yes      | Valid email, unique across all employees                     |
| `mobileNumber` | String | Yes      | 10-digit Indian mobile number starting with 6–9              |
| `department`   | String | Yes      | One of: `Engineering`, `Marketing`, `Sales`, `HR`, `Finance`, `Operations`, `Design`, `Support` |
| `designation`  | String | Yes      | 2–100 characters                                             |
| `joiningDate`  | String | Yes      | ISO 8601 date string (`YYYY-MM-DD`)                         |

```json
{
  "fullName": "Riya Mehta",
  "email": "riya.mehta@techcorp.com",
  "mobileNumber": "9876543210",
  "department": "Engineering",
  "designation": "Senior Software Engineer",
  "joiningDate": "2024-01-15"
}
```

**Response — 201 Created**
```json
{
  "success": true,
  "message": "Employee created successfully.",
  "data": {
    "employee": {
      "_id": "65a2c3d4e5f6a7b8c9d0e1f2",
      "fullName": "Riya Mehta",
      "email": "riya.mehta@techcorp.com",
      "mobileNumber": "9876543210",
      "department": "Engineering",
      "designation": "Senior Software Engineer",
      "joiningDate": "2024-01-15T00:00:00.000Z",
      "createdBy": {
        "_id": "65a1b2c3d4e5f6a7b8c9d0e1",
        "name": "Ashish Sharma",
        "email": "ashish@example.com"
      },
      "createdAt": "2024-01-15T10:05:00.000Z",
      "updatedAt": "2024-01-15T10:05:00.000Z"
    }
  }
}
```

**Error Responses**

| Status | Condition            | Message                                                       |
|--------|----------------------|---------------------------------------------------------------|
| 422    | Validation fails     | `"Validation failed"` with `errors` array                    |
| 409    | Email taken          | `"An employee with email '...' already exists."`             |
| 401    | No/invalid token     | Auth error message                                            |

---

### `GET /api/employees/:id`

Get a single employee by their MongoDB ObjectId.

**Auth required:** Yes

**URL Parameters**

| Parameter | Type     | Description         |
|-----------|----------|---------------------|
| `id`      | ObjectId | Employee's `_id`    |

**Response — 200 OK**
```json
{
  "success": true,
  "message": "Employee retrieved successfully.",
  "data": {
    "employee": {
      "_id": "65a2c3d4e5f6a7b8c9d0e1f2",
      "fullName": "Riya Mehta",
      "email": "riya.mehta@techcorp.com",
      "mobileNumber": "9876543210",
      "department": "Engineering",
      "designation": "Senior Software Engineer",
      "joiningDate": "2024-01-15T00:00:00.000Z",
      "createdBy": {
        "_id": "65a1b2c3d4e5f6a7b8c9d0e1",
        "name": "Ashish Sharma",
        "email": "ashish@example.com"
      },
      "createdAt": "2024-01-15T10:05:00.000Z",
      "updatedAt": "2024-01-15T10:05:00.000Z"
    }
  }
}
```

**Error Responses**

| Status | Condition          | Message                          |
|--------|--------------------|----------------------------------|
| 400    | Invalid ObjectId   | `"Invalid ID format: <id>"`      |
| 404    | Not found          | `"Employee not found."`          |

---

### `PUT /api/employees/:id`

Update an existing employee. All fields are optional — only send what changed.

**Auth required:** Yes

**URL Parameters**

| Parameter | Type     | Description      |
|-----------|----------|------------------|
| `id`      | ObjectId | Employee's `_id` |

**Request Body** (all fields optional)

| Field          | Type   | Constraints (if provided)                                    |
|----------------|--------|--------------------------------------------------------------|
| `fullName`     | String | 2–100 characters                                             |
| `email`        | String | Valid email, unique (excluding current employee)             |
| `mobileNumber` | String | 10-digit, starts with 6–9                                    |
| `department`   | String | Valid department enum value                                  |
| `designation`  | String | 2–100 characters                                             |
| `joiningDate`  | String | ISO 8601 date                                                |

```json
{
  "designation": "Principal Engineer",
  "department": "Engineering"
}
```

**Response — 200 OK**
```json
{
  "success": true,
  "message": "Employee updated successfully.",
  "data": {
    "employee": {
      "_id": "65a2c3d4e5f6a7b8c9d0e1f2",
      "fullName": "Riya Mehta",
      "email": "riya.mehta@techcorp.com",
      "mobileNumber": "9876543210",
      "department": "Engineering",
      "designation": "Principal Engineer",
      "joiningDate": "2024-01-15T00:00:00.000Z",
      "createdBy": {
        "_id": "65a1b2c3d4e5f6a7b8c9d0e1",
        "name": "Ashish Sharma",
        "email": "ashish@example.com"
      },
      "createdAt": "2024-01-15T10:05:00.000Z",
      "updatedAt": "2024-01-16T08:30:00.000Z"
    }
  }
}
```

**Error Responses**

| Status | Condition              | Message                                              |
|--------|------------------------|------------------------------------------------------|
| 400    | Invalid ObjectId       | `"Invalid ID format: <id>"`                          |
| 404    | Not found              | `"Employee not found."`                              |
| 409    | Email conflict         | `"Another employee with email '...' already exists."` |
| 422    | Validation fails       | `"Validation failed"` with `errors` array            |

---

### `DELETE /api/employees/:id`

Permanently delete an employee record.

**Auth required:** Yes

**URL Parameters**

| Parameter | Type     | Description      |
|-----------|----------|------------------|
| `id`      | ObjectId | Employee's `_id` |

**Response — 200 OK**
```json
{
  "success": true,
  "message": "Employee deleted successfully."
}
```

**Error Responses**

| Status | Condition        | Message                      |
|--------|------------------|------------------------------|
| 400    | Invalid ObjectId | `"Invalid ID format: <id>"`  |
| 404    | Not found        | `"Employee not found."`      |

---

## Validation Error Format

When validation fails (status 422), the `errors` array contains objects like:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "type": "field",
      "msg": "Full name is required",
      "path": "fullName",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Please enter a valid 10-digit mobile number starting with 6-9",
      "path": "mobileNumber",
      "location": "body"
    }
  ]
}
```

---

## Rate Limiting

All `/api/*` routes are rate-limited:

| Setting          | Value              |
|------------------|--------------------|
| Window           | 15 minutes         |
| Max requests     | 100 per IP         |
| Response on limit| 429 Too Many Requests |

```json
{
  "success": false,
  "message": "Too many requests from this IP. Please try again after 15 minutes."
}
```

---

## Department Enum Values

Only the following values are accepted for the `department` field:

```
Engineering | Marketing | Sales | HR | Finance | Operations | Design | Support
```

---

## Employee Schema Reference

```
Employee {
  _id:          ObjectId   (auto-generated)
  fullName:     String     (required, 2-100 chars)
  email:        String     (required, unique, lowercase)
  mobileNumber: String     (required, 10-digit, starts 6-9)
  department:   String     (required, enum)
  designation:  String     (required, 2-100 chars)
  joiningDate:  Date       (required)
  createdBy:    ObjectId   (ref: User, auto-set from JWT)
  createdAt:    Date       (auto)
  updatedAt:    Date       (auto)
}
```
