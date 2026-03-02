---
description: Tạo CRUD API từ Prisma schema
---

# /api - Tạo CRUD API

## Cách dùng
```
/api [model name]       # vd: /api User
/api [model] --rest     # REST API
/api [model] --graphql  # GraphQL API
```

## Quy trình

### Step 1: Đọc Schema
1. Đọc Prisma schema → xác định model, fields, relations
2. Xác định scope: full CRUD hay partial?

### Step 2: Generate Endpoints
3. Tạo CRUD operations:
   | Method | Endpoint | Action |
   |--------|----------|--------|
   | GET | `/api/[model]` | List (with pagination) |
   | GET | `/api/[model]/:id` | Get by ID |
   | POST | `/api/[model]` | Create |
   | PUT | `/api/[model]/:id` | Update |
   | DELETE | `/api/[model]/:id` | Delete |

### Step 3: Validation & Error Handling
4. Input validation (Zod/Yup):
   - Required fields check
   - Type validation
   - Custom rules (email, phone, etc.)
5. Error handling nhất quán:
   ```json
   {
     "success": false,
     "error": { "code": "VALIDATION_ERROR", "message": "...", "details": [] }
   }
   ```
6. HTTP status codes đúng:
   - 200 OK, 201 Created, 204 No Content
   - 400 Bad Request, 401 Unauthorized, 404 Not Found
   - 500 Internal Server Error

### Step 4: Pagination & Filtering
7. Pagination support:
   - `?page=1&limit=20` hoặc cursor-based
   - Response: `{ data: [], meta: { total, page, limit } }`
8. Filtering & sorting:
   - `?status=active&sort=createdAt&order=desc`

### Step 5: Verify
9. Test mỗi endpoint bằng curl/httpie
10. Verify error cases

## Skills sử dụng
- `api-patterns` - REST/GraphQL patterns
- `api-design-principles` - API best practices
- `error-handling-patterns` - Error responses
- `prisma-expert` - Prisma queries

## Output
- API routes/controllers
- Request/Response types (TypeScript)
- Validation schemas (Zod)
- Error handler middleware
