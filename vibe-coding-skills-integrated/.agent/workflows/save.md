---
description: Git commit + push changes
---

# /save - Git Save

## Cách dùng
```
/save [commit message]
/save                   # Auto-generate message
```

## Quy trình

### Step 1: Pre-commit Checks
1. Review changes: `git diff --stat`
2. Verify trước khi commit:
   - ☐ Linter pass (`npm run lint`)
   - ☐ Tests pass (`npm test`)
   - ☐ Build pass (`npm run build`)
   - ☐ Không có console.log/debug code thừa
   - ☐ Không có secrets/credentials trong code

### Step 2: Stage & Commit
3. Stage files: `git add .` hoặc selective staging
4. Conventional Commits format:
   ```
   type(scope): description

   Types:
   feat     - Tính năng mới
   fix      - Sửa bug
   docs     - Documentation
   style    - Formatting, semicolons
   refactor - Code restructure
   test     - Thêm/sửa tests
   chore    - Build, dependencies
   ```
5. Commit message rules:
   - Lowercase, không dấu chấm cuối
   - Max 50 chars cho title
   - Body giải thích WHY, không phải WHAT

### Step 3: Push
6. Push: `git push origin [branch]`
7. Verify: `git log --oneline -3`

## Skills sử dụng
- `git-conventions` - Conventional commits
- `pre-commit-automation` - Pre-commit hooks

## Output
- Clean commit with conventional message
- Changes pushed to remote
