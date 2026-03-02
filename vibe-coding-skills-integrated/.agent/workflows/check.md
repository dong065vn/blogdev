---
description: Checkpoint - commit phase completion
---

# /check - Checkpoint & Verify

## Cách dùng
```
/check [phase name]     # vd: /check api, /check auth
```

## Quy trình

### Step 1: Verification Gates
1. **Chạy TOÀN BỘ checks (KHÔNG bỏ qua):**

   | Gate | Command | Must |
   |------|---------|------|
   | Lint | `npm run lint` | 0 errors |
   | Types | `npx tsc --noEmit` | 0 errors |
   | Tests | `npm test` | All pass |
   | Build | `npm run build` | Exit 0 |

2. **⚠️ IRON LAW:** Không claim "done" nếu chưa chạy verify
   - "Should work" → KHÔNG được
   - "Linter pass" → KHÔNG = "Build pass"
   - Phải có EVIDENCE (output thực tế)

### Step 2: Requirements Checklist
3. Re-read requirements từ `/brain` output
4. Tạo checklist và verify từng item:
   - ☐ Feature 1: [evidence]
   - ☐ Feature 2: [evidence]
   - ☐ ...
5. Ghi rõ: đã đạt / chưa đạt / partial

### Step 3: Commit Phase
6. Commit với message:
   ```
   chore(checkpoint): complete [phase name]

   - [x] Lint pass
   - [x] Tests pass (X/X)
   - [x] Build pass
   - [x] Requirements met
   ```

## Skills sử dụng
- `verification-before-completion` - Evidence-first verification
- `git-conventions` - Commit standards

## Output
- ✅ Verification evidence (actual output)
- 📋 Requirements checklist (verified)
- 💾 Checkpoint commit
