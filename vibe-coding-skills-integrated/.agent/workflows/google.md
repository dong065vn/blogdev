---
description: Google OAuth integration
---

# /google - Google OAuth

## Cách dùng
```
/google                 # Setup Google OAuth
```

## Quy trình

### Step 1: Setup Google Cloud Console
1. Tạo project trên Google Cloud Console
2. Enable Google+ API / People API
3. Tạo OAuth 2.0 credentials:
   - Client ID + Client Secret
   - Redirect URIs: `http://localhost:3000/auth/google/callback`

### Step 2: Implement OAuth Flow
4. Install dependencies: `passport-google-oauth20`
5. Implement OAuth endpoints:
   | Endpoint | Description |
   |----------|-------------|
   | `GET /auth/google` | Redirect to Google login |
   | `GET /auth/google/callback` | Handle callback |
6. User flow:
   - User clicks "Login with Google"
   - Redirect to Google → User authorizes
   - Google redirects back with code
   - Exchange code for tokens
   - Create/update user in DB

### Step 3: Error Handling
7. Handle OAuth errors:
   - User denied permission
   - Invalid/expired tokens
   - Network errors
8. Token refresh logic

### Step 4: Verify
9. Test full OAuth flow (login → callback → session)
10. Test error cases (cancel, invalid token)

## Skills sử dụng
- `auth-patterns` - OAuth2 patterns
- `google-oauth-patterns` - Google-specific setup

## Output
- Google OAuth credentials configured
- OAuth endpoints working
- User creation/linking logic
