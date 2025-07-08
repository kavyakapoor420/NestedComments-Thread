# 🗨️ Nested Comment App

A minimalistic and scalable full-stack comment system with a strong focus on backend performance, secure user authentication, and Docker-based containerization.

## 🚀 Live Demo

- **Frontend**: [nested-comment-assignment.vercel.app](https://nested-comment-assignment.vercel.app/)
- **Backend**: [deploy-project-2-hgpy.onrender.com](https://deploy-project-2-hgpy.onrender.com)

---

## 🔧 Core Features

- 🔐 Secure JWT-based authentication
- 🧵 Nested comments (multi-level replies)
- ✏️ Edit comments within 15 minutes of posting
- 🗑️ Soft delete & restore comments within 15 minutes
- 🔔 Notification system for replies with read/unread toggle

---

## 🧱 Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Frontend**: React.js, Vite, TailwindCSS
- **Database**: PostgreSQL
- **Deployment**: Vercel (Frontend), Render (Backend)
- **Containerization**: Docker & Docker Compose

---

## ⚙️ Local Setup

### Backend

```bash
cd NodeBackend
npm install
npx nodemon server.ts
```

### Frontend 

```bash
cd frontend
npm install
npm run dev
```


Auth
POST /api/auth/register – Register new user

POST /api/auth/login – Login user

Comments
POST /api/comments/ – Create comment (auth required)

GET /api/comments/ – Get all comments

PUT /api/comments/:id – Update comment (auth, 15-min limit)

DELETE /api/comments/:id – Delete comment (auth, 15-min limit)

PUT /api/comments/:id/restore – Restore deleted comment (auth)

Notifications
GET /api/notifications/ – Get user notifications (auth)

PUT /api/notifications/:id/read – Mark notification as read (auth)

Users
GET /api/users/me – Get logged-in user's data (auth)

Deployment Ready
Includes Docker & Docker Compose setup for full containerization of backend and frontend services.