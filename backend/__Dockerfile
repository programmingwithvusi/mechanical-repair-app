# ── Stage 1: build ────────────────────────────────────────────
FROM node:20-alpine AS builder

# native deps for better-sqlite3
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY backend/package*.json ./
RUN npm ci

# shared types must be visible to tsc
COPY shared /shared
COPY backend .

RUN npm run build

# ── Stage 2: runtime ───────────────────────────────────────────
FROM node:20-alpine AS runtime

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY backend/package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

# DB lives in a mounted volume at runtime
RUN mkdir -p /data

EXPOSE 3001

CMD ["node", "dist/backend/src/index.js"]