# 📝 Real-Time Collaborative Document Editor

A full-stack real-time collaborative document editing application built using the MERN stack (MongoDB, Express, React, Node.js) with Socket.IO for live synchronization.

Users can register, log in, create documents, and collaborate in real time — similar to Google Docs (basic version).

---

## 🚀 Features

### 🔐 Authentication
- User registration & login
- JWT-based authentication
- Protected routes
- User-specific documents

### 📄 Document Management
- Create new documents
- View all personal documents
- Edit existing documents
- Auto-save manually via Save button
- Title & content editing
- Documents sorted by latest created

### ⚡ Real-Time Collaboration
- Live document sync using Socket.IO
- Multiple users can edit same document
- Updates broadcast instantly
- No page refresh required

### 🎨 Modern UI
- Clean profile dashboard
- Document cards layout
- Modern editor interface
- Responsive design

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Axios
- React Router DOM
- Socket.IO Client
- CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Socket.IO

---

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Ekta25Mishra/Real-Time-Collaborative-Document-Editor.git
cd Real-Time-Collaborative-Document-Editor
```

---

## 🔧 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start backend server:

```bash
npm start
```

Server runs on:

```
http://localhost:5000
```

---

## 💻 Frontend Setup

Open new terminal:

```bash
cd frontend
npm install
npm run dev
```

---

## 🔌 API Endpoints

### Auth Routes

| Method | Endpoint | Description |
|--------|----------|------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |

---

### Document Routes

| Method | Endpoint | Description |
|--------|----------|------------|
| POST | /api/documents/create | Create document |
| GET | /api/documents/my-docs | Get user's documents |
| GET | /api/documents/:id | Get single document |
| PUT | /api/documents/:id | Update document |

---

## ⚡ Real-Time Logic (Socket.IO)

### Events Used

| Event | Description |
|--------|------------|
| join-document | User joins document room |
| send-changes | Emit updated content |
| receive-changes | Receive updates in real time |

Each document acts as a room.
All users inside that room receive updates instantly.

---

## 🔐 Authentication Flow

1. User registers or logs in.
2. JWT token stored in localStorage.
3. Axios interceptor attaches token to requests.
4. Backend middleware verifies token.
5. Only document owner can access/update documents.

---

## 🧠 How Real-Time Sync Works

1. User opens document.
2. Client emits `join-document`.
3. When user saves:
   - Document updates in MongoDB.
   - Socket emits `send-changes`.
4. Other clients receive `receive-changes`.
5. Editor updates without refresh.

---

## 🌟 Future Improvements

- Auto-save (without button)
- Rich text editor (Quill / TipTap)
- Show active users
- Cursor position tracking
- Dark mode
- Deployment (Render + Vercel)

---

## 🛡️ Security

- Password hashing
- JWT-based authentication
- Route protection
- Owner-based document access
- .env file ignored via .gitignore

---

## 🚀 Deployment (Recommended)

- Backend → Render / Railway
- Frontend → Vercel / Netlify
- MongoDB → MongoDB Atlas

---

## 👩‍💻 Author

Ekta Mishra  
GitHub: https://github.com/Ekta25Mishra

---

## 📜 License

This project is open source and available under the MIT License.

---

## ⭐ If You Like This Project

Give it a ⭐ on GitHub!
