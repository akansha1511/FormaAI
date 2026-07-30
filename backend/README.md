
# FormaAI Backend

Backend API for the FormaAI project. It provides authentication, AI-powered form generation, dynamic form templates, response management, and MongoDB integration.

---

## Features

- JWT Authentication
- User Registration & Login
- AI Form Generation
- Dynamic Form Templates
- Dynamic Form Responses
- Conditional Fields (`showIf`)
- Required Field Validation
- Regex Validation
- MongoDB Integration
- RESTful APIs

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Python (AI Service)

---

## Folder Structure

```text
backend/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── server.js
├── package.json
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/akansha1511/FormaAI.git
```

### Go to Backend

```bash
cd FormaAI/backend
```

### Install Dependencies

```bash
npm install
```

### Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Run Server

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

## API Endpoints

### Authentication

| Method | Endpoint |
|--------|----------|
| POST | `/api/auth/register` |
| POST | `/api/auth/login` |
| GET | `/api/auth/profile` |

### AI

| Method | Endpoint |
|--------|----------|
| POST | `/api/ai/process` |

### Templates

| Method | Endpoint |
|--------|----------|
| POST | `/api/templates` |
| GET | `/api/templates` |
| GET | `/api/templates/:id` |
| PUT | `/api/templates/:id` |
| DELETE | `/api/templates/:id` |

### Responses

| Method | Endpoint |
|--------|----------|
| POST | `/api/responses` |
| GET | `/api/responses` |
| GET | `/api/responses/:id` |

### Forms

| Method | Endpoint |
|--------|----------|
| POST | `/api/forms` |
| GET | `/api/forms` |
| GET | `/api/forms/:id` |
| PUT | `/api/forms/:id` |
| DELETE | `/api/forms/:id` |

---

## Authentication

Protected routes require:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## Validation

The backend validates:

- Required fields
- Regex validation
- JWT authentication
- Request body validation

---

## Environment Variables

```env
PORT=
MONGO_URI=
JWT_SECRET=
```

---

## Future Improvements

- Swagger Documentation
- File Upload Support
- Role-based Access Control
- Email Notifications
- Logging & Monitoring

---

## Backend Developer

**Ankit Singh**
