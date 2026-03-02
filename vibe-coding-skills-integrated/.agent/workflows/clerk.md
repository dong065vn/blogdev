---
description: Clerk authentication integration
---

# /clerk - Clerk Auth

## Cách dùng
```
/clerk                  # Setup Clerk auth
```

## Quy trình

### Step 1: Setup
1. Tạo Clerk application tại clerk.com
2. Install: `npm install @clerk/nextjs` (Next.js)
3. Add environment variables:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   ```

### Step 2: Integrate
4. Wrap app với `<ClerkProvider>`
5. Add authentication middleware:
   ```typescript
   // middleware.ts
   import { clerkMiddleware } from '@clerk/nextjs/server'
   export default clerkMiddleware()
   ```
6. Protect routes:
   - Public routes (landing, login)
   - Protected routes (dashboard, settings)

### Step 3: Components
7. Sử dụng Clerk components:
   - `<SignIn />` / `<SignUp />`
   - `<UserButton />`
   - `<OrganizationSwitcher />`
8. Custom UI nếu cần (useUser, useAuth hooks)

### Step 4: Webhooks
9. Setup webhook endpoint cho Clerk events:
   - `user.created`
   - `user.updated`
   - `session.created`
10. Sync user data với database

### Step 5: Verify
11. Test sign up → sign in → sign out flow
12. Test protected route access
13. Test webhook sync

## Skills sử dụng
- `clerk-auth-patterns` - Clerk integration
- `nextjs-patterns` - Next.js middleware

## Output
- Clerk integration configured
- Protected routes working
- User sync via webhooks
