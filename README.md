# TraceWeave

TraceWeave is a unified platform for API development, distributed tracing, automated testing, traffic replay, failure simulation, and performance analysis for local and cloud-based microservices.

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18+ 
- **Docker & Docker Compose**: For running the database and infrastructure.
- **Git**: For version control and submodule management.

### 2. Cloning the Repository
Since this project uses Git submodules, ensure you clone recursively:

```bash
git clone --recursive https://github.com/your-username/traceweave.git
cd traceweave
```

If you've already cloned without submodules:
```bash
git submodule update --init --recursive
```

---

## 🛠️ Running the Application

### Option A: Using Docker (Recommended for Full Environment)
The project includes a multi-container setup for the API, database, and other services.

```bash
# Start the development environment (with build)
docker compose -f ./docker-compose.dev.yml -f ./docker-compose.yml up --build
```

### Option B: Local Manual Start

#### Backend (Core API)
```bash
cd backend/core-api
npm install
# Ensure Prisma client is generated
npx prisma generate
# Run in development mode
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🌿 Submodule Branching Strategy

This repository serves as a **Parent Shell** for the `backend` and `frontend` submodules.

1.  **Isolation**: Work on features within their respective submodule directories.
2.  **Commit Order**: 
    - Commit and push changes inside the submodule (`backend/` or `frontend/`) first.
    - Return to the root directory and commit the **submodule pointer change** in the parent repository.
3.  **Branch Synchronization**:
    - The `parent` repo `dev` branch generally points to the `dev` branches of the submodules.
    - When switching branches in the parent repo, always run `git submodule update` to ensure submodule states match the expected pointers.

---

## 🔍 Troubleshooting

| Issue | Solution |
| :--- | :--- |
| **Submodule directory is empty** | Run `git submodule update --init --recursive` |
| **Prisma "Client not found"** | Run `npx prisma generate` inside `backend/core-api` |
| **Docker port conflicts** | Stop any local Postgres or Node instances running on ports 5432 or 5000/3000 |
| **Frontend/Backend Sync** | Ensure you have pulled the latest pointers in the root repo: `git pull && git submodule update` |

---

## 📂 Project Structure
- **/frontend**: Next.js application (Submodule)
- **/backend**: Express/Prisma microservices (Submodule)
- **/database**: Migrations and configurations
- **/gateway**: API Gateway configuration
