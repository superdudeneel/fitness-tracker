# Fitness Tracker Web Application

A full-stack fitness tracker web application with a React (Vite) frontend and a Node.js/Express backend using MongoDB. Users can sign up, log in, manage their profiles, and track workouts.

## Features
- User authentication (sign up, log in, forgot password)
- Profile management
- Dashboard with workout tracking
- Responsive UI
- RESTful API backend

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express
- MongoDB
- Mongoose

## Project Structure

```
client/           # Frontend (React + Vite)
  src/
    components/   # Reusable React components
    pages/        # Page components (dashboard, login, signup, etc.)
    assets/       # Static assets (images, icons)
  public/         # Static public files
  ...

server/           # Backend (Node.js + Express)
  models/         # Mongoose schemas (User, Workout)
  ...
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

#### 1. Clone the repository
```sh
git clone https://github.com/superdudeneel/fitness-tracker.git
cd fitness-tracker
```

#### 2. Install dependencies
```sh
npm install
```

**Frontend:**
```sh
cd client
npm install
```

**Backend:**
```sh
cd server
npm install
```

#### 3. Configure Environment Variables
- Create a `.env` file in the `server/` directory for backend configuration (e.g., MongoDB URI, JWT secret).

#### 4. Run the Application

**Start the backend:**
```sh
cd server
npm start
```

**Start the frontend:**
```sh
cd client
npm run dev
```

The frontend will typically run on [http://localhost:5173](http://localhost:5173) and the backend on [http://localhost:3000](http://localhost:3000).

## API Endpoints

- `POST /api/signup` — Register a new user
- `POST /api/login` — User login
- `POST /api/auth/forgotpass` — Password reset
- `POST /api/resetpass`  — Password reset
- `GET /api/load`  — populate user profile
- `GET /api/logout` — Logout
- `POST /api/workout`  — Adding a workout to the database
- `GET /api/workout`  — Loading all the saved workouts
- `GET /api/user/profile` — Get user profile

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.
