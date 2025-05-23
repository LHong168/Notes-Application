# Note Application

This project is a simple note-taking app with a **Vue.js frontend** and an **ASP.NET Core 8 backend**.

## Requirements

- Node.js and Yarn (or npm)
- .NET 8 SDK
- SQL Server

## Setup Instructions

### 1. Clone the repository

- Add SQL server script

### 2. Clone the repository

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

### 3. Set up environment variables

- **Frontend**: Create `.env` file from `.env.example` inside the `frontend` folder.
- **Backend**: Create `appsettings.json` from `appsettings.example.json` inside the `backend` folder, or set up `.env` from `.env.example`

### 4. Install dependencies

```bash
# Frontend
cd frontend
yarn install

# Backend
cd ../backend
dotnet restore
```

### 5. Run the development servers

```bash
# Frontend (Vue 3)
cd frontend
yarn dev

# Backend (ASP.NET Core API)
cd ../backend
dotnet run
```

The frontend will be running on `http://localhost:5173` and the backend on `http://localhost:5292`.

## Features

- Create, update, delete, and view notes
- Connected frontend and backend

---
