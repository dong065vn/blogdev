---
description: Setup Authentication system
---

# /auth - Setup Authentication

## Cách dùng
```
/auth [strategy]        # vd: /auth jwt, /auth session
```

## Quy trình

### Step 1: Chọn Strategy
1. Xác định auth strategy:
   - **JWT** - Stateless, API-first
   - **Session** - Server-side, web apps
   - **OAuth2** - Social login → dùng `/google`
   - **Clerk/Auth0** - Managed service → dùng `/clerk`

### Step 2: Implement Core
2. User model (email, password hash, role)
3. Auth endpoints:
   | Endpoint | Method | Description |
   |----------|--------|-------------|
   | `/auth/register` | POST | Đăng ký |
   | `/auth/login` | POST | Đăng nhập |
   | `/auth/logout` | POST | Đăng xuất |
   | `/auth/refresh` | POST | Refresh token |
   | `/auth/me` | GET | Current user |
4. Password handling:
   - Hash với bcrypt (salt rounds ≥ 10)
   - KHÔNG lưu plain text password
   - Password requirements (min 8 chars, mixed case)

### Step 3: Security Middleware
5. Auth middleware (verify token/session)
6. Role-based access control (RBAC)
7. Rate limiting cho auth endpoints
8. Security checklist:
   - ☐ HTTPS only
   - ☐ HttpOnly cookies (nếu dùng cookies)
   - ☐ CSRF protection
   - ☐ Token expiration (15m access, 7d refresh)
   - ☐ Brute force protection

### Step 4: Verify
9. Test register → login → access protected route → logout
10. Test invalid credentials → correct error response
11. Test expired token → refresh flow

## Skills sử dụng
- `auth-patterns` - Authentication strategies
- `error-handling-patterns` - Auth error handling
- `security-hardening` - Security best practices

## Output
- Auth endpoints (register, login, logout, refresh)
- Auth middleware
- User model with password hashing
- Security configuration
