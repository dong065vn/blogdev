---
description: Tạo Prisma Schema và Migration
---

# /prisma - Prisma Schema

## Cách dùng
```
/prisma [model description]
/prisma migrate         # Run migration
/prisma seed            # Run seed data
```

## Quy trình

### Step 1: Schema Design
1. Định nghĩa models trong `prisma/schema.prisma`
2. Best practices:
   - Mỗi model có `id`, `createdAt`, `updatedAt`
   - Dùng `@unique` cho email, username
   - Dùng `@default()` cho giá trị mặc định
   - Dùng `enum` cho fixed values (status, role)

### Step 2: Relations
3. Định nghĩa relations rõ ràng:
   - `@relation(fields: [...], references: [...])`
   - Cascade rules: `onDelete`, `onUpdate`
4. Relation checklist:
   - ☐ Foreign keys có index
   - ☐ Cascade delete an toàn
   - ☐ Không circular dependency

### Step 3: Optimize
5. Thêm indexes:
   ```prisma
   @@index([field1, field2])  // Composite index
   @@unique([field1, field2]) // Unique constraint
   ```
6. Thêm `@@map()` cho table naming

### Step 4: Migrate & Verify
7. Validate: `npx prisma validate`
8. Migrate: `npx prisma migrate dev --name [name]`
9. Generate: `npx prisma generate`
10. Studio: `npx prisma studio` (visualize)

## Skills sử dụng
- `prisma-expert` - Prisma ORM patterns
- `database-design` - Schema best practices
- `sql-optimization-patterns` - Performance optimization

## Output
- `prisma/schema.prisma` (validated)
- Migration files
- Type-safe Prisma Client
- Seed script (optional)
