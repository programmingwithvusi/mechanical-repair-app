# First time — build images and start

docker compose up --build

# Subsequent starts (no code changes)

docker compose up

# Seed the DB after first boot (one time only)

docker compose exec backend node dist/backend/src/db/seed.js

# Tear down (keeps the DB volume)

docker compose down

# Tear down AND wipe the DB volume

docker compose down -v

docker-compose.yml
│
├── backend (node:20-alpine)
│ ├── builds: tsc → dist/
│ ├── env: DB_PATH=/data/app.db
│ ├── volume: sqlite_data → /data ← DB persists here
│ ├── port: 3001:3001
│ └── healthcheck: GET /health
│
├── frontend (nginx:alpine)
│ ├── builds: vite build → /usr/share/nginx/html
│ ├── nginx: serves static files, proxies /api → backend:3001
│ ├── port: 3000:3000
│ └── depends_on: backend (waits for healthy)
│
└── sqlite_data (named volume)
└── survives container rebuilds and restarts
