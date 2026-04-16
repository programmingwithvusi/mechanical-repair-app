# 🔧 Mechanical Repair App

A full-stack vehicle repair management system built with **React**, **Express**, **SQLite (better-sqlite3)**, and **TypeScript** throughout — with Docker Compose for containerised deployment.

---

## Project Structure

```
project-root/
├── docker-compose.yml
├── shared/
│   └── models.ts               # Single source of truth for all interfaces
├── backend/
│   ├── Dockerfile
│   ├── tsconfig.json
│   ├── package.json
│   └── src/
│       ├── index.ts            # Express entry point
│       ├── api/
│       │   ├── vehicles.ts     # GET / POST / DELETE /api/vehicles
│       │   └── repairJobs.ts   # GET / POST / DELETE /api/repair-jobs
│       ├── db/
│       │   ├── client.ts       # Singleton SQLite connection
│       │   ├── schema.ts       # CREATE TABLE definitions
│       │   ├── queries.ts      # Typed query functions
│       │   └── seed.ts         # Initial data seeder
│       └── types/
│           └── index.ts        # Re-exports shared + DB row types
└── frontend/
    ├── Dockerfile
    ├── nginx.conf              # Serves static build, proxies /api → backend
    ├── vite.config.ts
    ├── tsconfig.json
    ├── package.json
    └── src/
        ├── main.tsx
        ├── App.tsx             # BrowserRouter + nav + routes
        ├── index.css
        ├── declarations.d.ts   # Asset type declarations (*.css etc.)
        ├── components/
        │   ├── VehicleCard.tsx
        │   ├── RepairJobCard.tsx
        │   ├── AddVehicleForm.tsx
        │   └── AddRepairJobForm.tsx
        ├── pages/
        │   ├── VehiclesPage.tsx
        │   └── RepairJobsPage.tsx
        └── services/
            └── api.ts          # Typed fetch wrappers for all endpoints
```

---

## Tech Stack

| Layer     | Technology                                 |
| --------- | ------------------------------------------ |
| Frontend  | React 18, React Router 6, TypeScript, Vite |
| Backend   | Express 4, TypeScript, ts-node-dev         |
| Database  | SQLite via better-sqlite3                  |
| Container | Docker Compose, nginx                      |
| Shared    | TypeScript interfaces in `shared/`         |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for containerised setup)

---

### Running Locally (without Docker)

**1. Install dependencies**

```bash
cd backend  && npm install
cd ../frontend && npm install
```

**2. Seed the database**

```bash
cd backend
npm run seed
# ✅ Seeded 5 vehicles and 10 repair jobs.
```

**3. Start the backend** (terminal 1)

```bash
cd backend
npm run dev
# Backend running on http://localhost:3001
```

**4. Start the frontend** (terminal 2)

```bash
cd frontend
npm run dev
# Frontend running on http://localhost:3000
```

---

### Running with Docker Compose

**1. Build and start all services**

```bash
docker compose up --build
```

**2. Seed the database** (first time only)

```bash
docker compose exec backend node dist/src/db/seed.js
```

**3. Open the app**

```
http://localhost:3000
```

**Subsequent starts** (no code changes):

```bash
docker compose up
```

**Stop services** (preserves DB volume):

```bash
docker compose down
```

**Stop and wipe the database**:

```bash
docker compose down -v
```

---

## API Reference

### Vehicles

| Method   | Endpoint            | Description       |
| -------- | ------------------- | ----------------- |
| `GET`    | `/api/vehicles`     | List all vehicles |
| `GET`    | `/api/vehicles/:id` | Get vehicle by ID |
| `POST`   | `/api/vehicles`     | Create a vehicle  |
| `DELETE` | `/api/vehicles/:id` | Delete a vehicle  |

**POST body**

```json
{ "make": "Toyota", "model": "Camry", "year": 2021 }
```

### Repair Jobs

| Method   | Endpoint                          | Description                |
| -------- | --------------------------------- | -------------------------- |
| `GET`    | `/api/repair-jobs`                | List all repair jobs       |
| `GET`    | `/api/repair-jobs/:id`            | Get repair job by ID       |
| `GET`    | `/api/repair-jobs/by-vehicle/:id` | Get all jobs for a vehicle |
| `POST`   | `/api/repair-jobs`                | Create a repair job        |
| `DELETE` | `/api/repair-jobs/:id`            | Delete a repair job        |

**POST body**

```json
{ "vehicleId": 1, "description": "Oil change", "cost": 89.99 }
```

### Health Check

| Method | Endpoint  | Response             |
| ------ | --------- | -------------------- |
| `GET`  | `/health` | `{ "status": "ok" }` |

---

## Type System

All interfaces are defined once in `shared/models.ts` and imported by both the backend and frontend — no duplication, no drift.

```
shared/models.ts
    ├── Vehicle
    ├── RepairJob
    ├── EntityMap          (used by getEntity<K> for compile-time safety)
    └── ApiResponse<T>     (wraps all API responses)
```

The `getEntity<K>` pattern in `db/queries.ts` ensures every DB row mapper returns a fully-typed entity — TypeScript will error at compile time if a field is missing or mistyped.

---

## Docker Architecture

```
docker-compose.yml
  ├── backend  (node:20-alpine)
  │     ├── Builds: tsc → dist/
  │     ├── Env:    DB_PATH=/data/app.db
  │     ├── Volume: sqlite_data → /data
  │     ├── Port:   3001
  │     └── Healthcheck: GET /health
  │
  ├── frontend  (nginx:alpine)
  │     ├── Builds: vite build → /usr/share/nginx/html
  │     ├── nginx:  serves static files, proxies /api → backend:3001
  │     ├── Port:   3000
  │     └── depends_on: backend (waits for healthy)
  │
  └── sqlite_data (named volume — survives container rebuilds)
```

> Both Dockerfiles use the **project root as the build context** so the `shared/` directory is reachable from inside both images during the build.

---

## Environment Variables

| Variable  | Default          | Description                         |
| --------- | ---------------- | ----------------------------------- |
| `PORT`    | `3001`           | Express server port                 |
| `DB_PATH` | `../data/app.db` | Absolute path to the SQLite DB file |

=======

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
