---
description: Setup Backend với Node.js và Docker
---

# /setup - Setup Backend

## Cách dùng
```
/setup [tech stack]     # vd: /setup express+prisma+postgres
```

## Quy trình

### Step 1: Khởi tạo Project
1. Init Node.js project:
   ```
   npm init -y
   ```
2. Cài dependencies theo tech stack:
   - Runtime: express/fastify/nestjs
   - ORM: prisma/drizzle/typeorm
   - Validation: zod/joi
   - Security: helmet, cors, rate-limit

### Step 2: Project Structure
3. Tạo folder structure chuẩn:
   ```
   src/
   ├── config/        # Environment, database config
   ├── controllers/   # Request handlers
   ├── middleware/     # Auth, error handling, logging
   ├── models/        # Data models
   ├── routes/        # API routes
   ├── services/      # Business logic
   ├── utils/         # Helper functions
   └── index.ts       # Entry point
   ```

### Step 3: Configuration
4. Setup environment variables (`.env` + `.env.example`)
5. Error handling middleware (global error handler)
6. Logging setup (winston/pino)
7. Security headers (helmet, cors)

### Step 4: Docker Setup
8. Tạo `Dockerfile` (multi-stage build):
   - Build stage: compile TypeScript
   - Production stage: minimal image
9. Tạo `docker-compose.yml`:
   - App service
   - Database service (postgres/mysql)
   - Redis (optional)
10. Tạo `.dockerignore`

### Step 5: Verify
11. Chạy `docker-compose up` → kiểm tra services healthy
12. Test endpoint: `GET /health` → 200 OK

## Skills sử dụng
- `nodejs-backend-patterns` - Node.js patterns
- `docker-expert` - Docker best practices
- `environment-setup-guide` - Environment config
- `backend-dev-guidelines` - Backend standards

## Output
- `package.json` với scripts (dev, build, start, test)
- `Dockerfile` + `docker-compose.yml`
- `.env.example` với mô tả từng variable
- Project structure chuẩn
- Health check endpoint
