---
description: Deploy to cloud (Vercel/Railway/etc)
---

# /deploy - Deploy to Cloud

## Cách dùng
```
/deploy [platform]      # vd: /deploy vercel, /deploy railway
```

## Quy trình

### Step 1: Pre-deploy Checklist
1. **Verify trước khi deploy:**
   - ☐ All tests pass
   - ☐ Build succeeds locally
   - ☐ Environment variables configured
   - ☐ No hardcoded secrets
   - ☐ Database migrations ready
   - ☐ API endpoints tested

### Step 2: Deploy
2. Platform-specific:
   - **Vercel**: `npx vercel --prod`
   - **Railway**: `railway up`
   - **Fly.io**: `fly deploy`
   - **Docker**: Push to registry + deploy

### Step 3: Post-deploy Verify
3. Smoke tests trên production:
   - ☐ Health check endpoint responds
   - ☐ Homepage loads
   - ☐ Auth flow works
   - ☐ Core API endpoints respond
4. Monitor:
   - Check error logs (first 5 minutes)
   - Verify performance

### Step 4: Rollback Plan
5. Nếu có lỗi:
   - Revert deploy ngay
   - Investigate root cause
   - Fix → Re-deploy
6. Document deployment:
   - Version deployed
   - Changes included
   - Any known issues

## Skills sử dụng
- `deployment-patterns` - Deploy strategies
- `vercel-patterns` - Vercel best practices
- `docker-expert` - Container deployment

## Output
- Deployed application (live URL)
- Smoke test results
- Rollback instructions
