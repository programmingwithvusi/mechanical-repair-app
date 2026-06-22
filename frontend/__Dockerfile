# ── Stage 1: build ────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY frontend/package*.json ./
RUN npm ci

# shared types must be visible to tsc
COPY shared /shared
COPY frontend .

RUN npm run build

# ── Stage 2: runtime ───────────────────────────────────────────
FROM nginx:alpine AS runtime

COPY --from=builder /app/dist /usr/share/nginx/html

# Custom nginx config — proxies /api to backend container
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000