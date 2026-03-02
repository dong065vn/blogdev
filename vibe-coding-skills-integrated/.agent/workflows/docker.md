---
description: Docker containerization
---

# /docker - Docker Setup

## Cách dùng
```
/docker [service]       # vd: /docker postgres, /docker fullstack
```

## Quy trình

### Step 1: Dockerfile
1. Multi-stage build:
   ```dockerfile
   # Build stage
   FROM node:20-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build

   # Production stage
   FROM node:20-alpine
   WORKDIR /app
   COPY --from=builder /app/dist ./dist
   COPY --from=builder /app/node_modules ./node_modules
   CMD ["node", "dist/index.js"]
   ```
2. Best practices:
   - Alpine images (smaller size)
   - Non-root user
   - `.dockerignore` (node_modules, .git, .env)
   - HEALTHCHECK instruction

### Step 2: Docker Compose
3. `docker-compose.yml` với services:
   - App, Database, Redis (nếu cần)
   - Named volumes cho data persistence
   - Environment variables từ `.env`
   - Networks cho service isolation
4. Health checks cho mỗi service

### Step 3: Verify
5. Build: `docker-compose build`
6. Run: `docker-compose up -d`
7. Check logs: `docker-compose logs -f`
8. Verify health: `docker-compose ps`

## Skills sử dụng
- `docker-expert` - Docker best practices
- `backend-dev-guidelines` - Backend standards

## Output
- `Dockerfile` (multi-stage, optimized)
- `docker-compose.yml`
- `.dockerignore`
- Health check endpoints
