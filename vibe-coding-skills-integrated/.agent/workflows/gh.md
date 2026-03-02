---
description: GitHub Actions setup
---

# /gh - GitHub Actions CI/CD

## Cách dùng
```
/gh [workflow type]     # vd: /gh ci, /gh deploy
```

## Quy trình

### Step 1: Setup CI Pipeline
1. Tạo `.github/workflows/ci.yml`:
   ```yaml
   name: CI
   on: [push, pull_request]
   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
         - run: npm ci
         - run: npm run lint
         - run: npm test
         - run: npm run build
   ```

### Step 2: Environment & Secrets
2. Cấu hình GitHub Secrets:
   - `DATABASE_URL`, `JWT_SECRET`, etc.
   - Environment-specific variables
3. Branch protection rules:
   - Require CI pass before merge
   - Require code review

### Step 3: CD Pipeline (Optional)
4. Auto-deploy on merge to main:
   - Deploy to staging → verify → deploy to production
   - Rollback on failure

### Step 4: Verify
5. Push code → verify CI runs
6. Check GitHub Actions tab → all green

## Skills sử dụng
- `github-actions-expert` - CI/CD patterns
- `deployment-patterns` - Deploy automation

## Output
- `.github/workflows/ci.yml`
- Branch protection configured
- CI/CD pipeline working
