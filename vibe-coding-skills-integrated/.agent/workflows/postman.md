---
description: Generate Postman collection từ API
---

# /postman - Postman Collection

## Cách dùng
```
/postman                # Generate từ API routes
/postman [api-file]     # Generate từ file cụ thể
```

## Quy trình

### Step 1: Analyze API
1. Scan API routes/controllers
2. Identify endpoints, methods, parameters

### Step 2: Generate Collection
3. Tạo Postman collection JSON:
   - Folder per resource (User, Product, etc.)
   - Request cho mỗi endpoint
   - Example body cho POST/PUT
4. Environment variables:
   ```
   {{base_url}} = http://localhost:3000
   {{token}} = Bearer ...
   ```

### Step 3: Add Tests
5. Pre-request scripts:
   - Auto-set auth token
   - Generate test data
6. Test scripts per request:
   ```javascript
   pm.test("Status code is 200", () => {
     pm.response.to.have.status(200);
   });
   ```

### Step 4: Export & Share
7. Export collection (`*.postman_collection.json`)
8. Export environment (`*.postman_environment.json`)
9. Document trong README

## Skills sử dụng
- `api-design-principles` - API patterns
- `docs-architect` - Documentation

## Output
- Postman collection file
- Environment config
- Test scripts per endpoint
