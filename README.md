# 🎵 Spotify Clone

A full-stack music streaming platform inspired by Spotify, built with the MERN stack. Users can stream music, create playlists, like songs, track listening history, discover similar songs based on artist and genre, and enjoy a real-time interactive music experience.

---

## 📌 Project Info

|                  |                            |
| ---------------- | -------------------------- |
| **Version**      | v1                         |
| **Project Name** | Spotify Clone              |
| **Repository**   | Spotify_Clone              |
| **Type**         | Full Stack Web Application |
| **Architecture** | MERN Stack                 |
| **License**      | MIT License                |
| **Status**       | Completed                  |

---

## 🚀 Features

* 🎶 Play and pause songs
* ⏭ Next / previous track controls
* 🔐 Secure authentication system
* ❤️ Like and save favorite songs
* 📂 Create and manage playlists
* 🔍 Search songs and artists
* 🕒 Listening history tracker
* 🎯 Smart song recommendation system based on singer & song type
* 👤 User profile management
* ⚡ Real-time updates using Socket.IO
* ☁ Cloud-based media storage with Cloudinary
* 🛠 Admin dashboard for managing songs and users
* 📱 Fully responsive modern UI

---

## 🛠 Getting Started

### Prerequisites

* Node.js 18+
* npm / yarn
* MongoDB Atlas or local MongoDB
* Git

### Installation

```bash
# Clone repository
git clone https://github.com/your-username/Spotify_Clone.git

cd Spotify_Clone

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Environment Setup

Create `.env` files for backend configuration.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

JWT_SECRET=your_secret_key
```

### Run Development Server

```bash
# Backend
npm run dev

# Frontend
npm run dev
```

---

## 🔐 Authentication

This project uses **Clerk Authentication** for secure user management.

### Authentication Features

| Method               | Description                       |
| -------------------- | --------------------------------- |
| Sign Up              | Register new user                 |
| Sign In              | Login existing user               |
| Session Management   | Maintain active session           |
| Protected Routes     | Private user-only routes          |
| Admin Authentication | Restricted admin dashboard access |

---

## 🎵 Music Features

### Music Player

| Feature        | Description               |
| -------------- | ------------------------- |
| Play Song      | Start song playback       |
| Pause Song     | Pause active track        |
| Next Track     | Skip to next song         |
| Previous Track | Play previous song        |
| Progress Bar   | Track song duration       |
| Auto Play      | Continuous music playback |

---

### Playlist System

| Feature         | Description                |
| --------------- | -------------------------- |
| Create Playlist | User creates playlists     |
| Add Songs       | Save songs to playlist     |
| Remove Songs    | Delete songs from playlist |
| Manage Playlist | Edit user playlists        |
| Favorites       | Save liked songs           |

---

### Recommendation System

| Feature           | Description                           |
| ----------------- | ------------------------------------- |
| Similar Songs     | Match songs by genre                  |
| Artist Matching   | Suggest songs by same singer          |
| Smart Suggestions | Recommend based on listening behavior |

---

### History Tracking

| Feature          | Description                |
| ---------------- | -------------------------- |
| Recently Played  | Store played songs         |
| Playback History | Track listening sessions   |
| User Activity    | Personalized music history |

---

### Admin Panel

| Feature         | Description                 |
| --------------- | --------------------------- |
| Upload Songs    | Add new songs               |
| Manage Albums   | Create/edit albums          |
| User Management | Monitor users               |
| Delete Songs    | Remove songs from database  |
| Manage Content  | Full administrative control |

---

## 📂 Project Structure

```bash
Spotify_Clone/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/              # Zustand state management
│   │   ├── routes/
│   │   ├── hooks/
│   │   ├── assets/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── sockets/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🗄 Database Models

### User

| Field     | Type     |
| --------- | -------- |
| id        | ObjectId |
| username  | String   |
| email     | String   |
| imageUrl  | String   |
| createdAt | Date     |

---

### Song

| Field    | Type   |
| -------- | ------ |
| title    | String |
| artist   | String |
| genre    | String |
| audioUrl | String |
| imageUrl | String |
| duration | Number |

---

### Playlist

| Field     | Type     |
| --------- | -------- |
| name      | String   |
| user      | ObjectId |
| songs     | Array    |
| createdAt | Date     |

---

### History

| Field    | Type     |
| -------- | -------- |
| user     | ObjectId |
| song     | ObjectId |
| playedAt | DateTime |

---

## ⚙ Tech Stack

|                            |                      |
| -------------------------- | -------------------- |
| **Frontend**               | React.js             |
| **Routing**                | React Router DOM     |
| **State Management**       | Zustand              |
| **Icons**                  | Lucide React         |
| **HTTP Client**            | Axios                |
| **Backend**                | Node.js + Express.js |
| **Database**               | MongoDB              |
| **Authentication**         | Clerk                |
| **Media Storage**          | Cloudinary           |
| **Realtime Communication** | Socket.IO            |

---

## 🎨 UI Components

* Music Player
* Sidebar Navigation
* Search Bar
* Song Cards
* Album Cards
* Playlist Manager
* Liked Songs Section
* Recently Played History
* User Profile
* Admin Dashboard
* Responsive Mobile Design

---

## 🔮 Future Improvements

* Lyrics integration
* Music download option
* Friend activity feed
* Social playlist sharing
* Queue management
* Dark/light mode
* Premium subscription system
* AI-powered song recommendation

---

## 📸 Screenshots

Add project screenshots here.

Example:

* Home Page
* Music Player
* Playlist Section
* Search System
* Admin Dashboard
* User Profile

---

## 👨‍💻 Author

**Raihan Habib Akash**
---
Software Engineer | Competitive Programmer
---
|                |                      |
| -------------- | -------------------- |
| **Role**       | Full Stack Developer |
| **Project**    | Spotify Clone        |
| **Repository** | Spotify_Clone        |

---

## 📄 License

This project is licensed under the **MIT License**.
---
https://spotify-clone-zoct.onrender.com/
