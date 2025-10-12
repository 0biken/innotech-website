# innotech-website
Official website for Innotech 4.0 (Innovation, Hackathon, Mentorship Event at UI).

## Repository overview

This repository contains the frontend and backend for the Innotech 4.0 website. The
backend lives in the `backend/` folder and is a small Express (ESM) API using
Mongoose, JWT auth, and common middleware (helmet, cors, express-rate-limit, morgan).

This README focuses on the backend (development, testing, and recent changes).

## Backend quick start

Requirements:
- Node.js v18+ (v24 tested here)
- npm
- A running MongoDB instance (set `MONGODB_URI` in `.env`)

From the project root:

1. Install dependencies

```powershell
cd "C:\Users\<Your-Username>\innotech-website\backend"
npm install
```

2. Create a `.env` file (example keys used by the app):

```text
PORT=5000
MONGODB_URI=mongodb://localhost:27017/innotech
JWT_SECRET=your_jwt_secret
```

3. Run in development (uses nodemon):

```powershell
npm run dev
```

4. Run the lightweight endpoint tester (starts the app on an ephemeral port and
	 queries common routes):

```powershell
cd backend
node scripts/testEndpoints.js
```

