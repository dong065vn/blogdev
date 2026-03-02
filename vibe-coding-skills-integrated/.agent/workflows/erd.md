---
description: Thiết kế ERD/Database Schema với Prisma
---

# /erd - Thiết kế Database

## Cách dùng
```
/erd [mô tả entities/tables]
```

## Quy trình

### Step 1: Phân tích Data Model
1. Xác định core entities từ requirements
2. Định nghĩa attributes cho mỗi entity:
   - Primary key (id strategy: UUID vs auto-increment)
   - Required vs optional fields
   - Data types phù hợp
3. Xác định relationships:
   - One-to-One, One-to-Many, Many-to-Many
   - Cascade rules (onDelete, onUpdate)

### Step 2: Tạo ERD Diagram
4. Vẽ ERD bằng Mermaid `erDiagram`
5. Best practices:
   - Normalization (3NF minimum)
   - Tránh data redundancy
   - Naming convention nhất quán (snake_case)
   - Timestamps: `createdAt`, `updatedAt` cho mọi table

### Step 3: Generate Prisma Schema
6. Chuyển ERD → `prisma/schema.prisma`
7. Thêm indexes cho query performance:
   - Index cho frequently queried fields
   - Composite index cho multi-column queries
   - Unique constraints
8. Thêm enum types khi cần

### Step 4: Validate & Migrate
9. Chạy `npx prisma validate` kiểm tra schema
10. Tạo migration: `npx prisma migrate dev`
11. Generate client: `npx prisma generate`
12. Tạo seed data nếu cần

## Skills sử dụng
- `database-design` - Schema design principles
- `prisma-expert` - Prisma ORM patterns
- `mermaid-expert` - ERD diagram
- `sql-optimization-patterns` - Indexing strategy

## Output
- ERD diagram (Mermaid)
- `prisma/schema.prisma` đã validated
- Migration files
- Seed data (optional)
