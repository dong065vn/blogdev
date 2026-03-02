---
description: Fix Review - Xác minh fix đúng root cause, không tạo bug mới
---

# /fix - Fix Review & Verification

## Cách dùng
```
/fix [mô tả fix đã thực hiện]
/fix review          # Review fix vừa làm
/fix verify          # Verify tất cả changes
```

## ⚠️ IRON LAW
> **KHÔNG CLAIM "ĐÃ FIX" NẾU CHƯA CÓ BẰNG CHỨNG.**
> Confidence ≠ Evidence. Phải chạy verify rồi mới nói.

## Quy trình

### Step 1: 📋 Review Fix Completeness
1. **So sánh fix vs root cause:**
   - Fix có giải quyết đúng root cause không? (hay chỉ che triệu chứng)
   - Fix có cover tất cả scenarios liên quan?
   - Có pattern tương tự ở chỗ khác cần fix?
2. **Check code quality:**
   - Fix có minimal và focused không?
   - Có side effects không mong muốn?
   - Error handling có đầy đủ?
   - Code có readable và maintainable?

### Step 2: 🧪 Verification Gates (BẮT BUỘC)

| Gate | Command | Pass Criteria |
|------|---------|---------------|
| **Syntax** | Linter/TypeCheck | 0 errors |
| **Unit Tests** | `npm test` / `pytest` | All pass |
| **Build** | `npm run build` | Exit code 0 |
| **Bug Specific** | Reproduce original bug | Bug không còn |
| **Regression** | Full test suite | Không break existing |

### Step 3: 🔄 Regression Test (Red-Green Cycle)
3. **Viết test cho bug:**
   ```
   ✅ Đúng: Write test → Run (PASS) → Revert fix → Run (MUST FAIL) → Restore → Run (PASS)
   ❌ Sai: Write test → Run (PASS) → "Done!" (không verify red case)
   ```
4. **Check related tests:**
   - Test các functions/modules liên quan
   - Test edge cases: null, empty, boundary values
   - Test error paths, not just happy path

### Step 4: 📝 Document & Close
5. **Document fix:**
   - Root cause: [1 câu mô tả nguyên nhân gốc]
   - Fix: [1 câu mô tả cách fix]
   - Test: [liệt kê tests đã thêm/chạy]
   - Prevention: [cách tránh lỗi tương tự]
6. **Cleanup:**
   - Xóa console.log/debug code thừa
   - Xóa commented-out code
   - Update documentation nếu behavior thay đổi

## 🚨 Red Flags - DỪNG LẠI NGAY

| Dấu hiệu nguy hiểm | Hành động đúng |
|---------------------|---------------|
| Nói "should work now" | → RUN verification command |
| "I'm confident" | → Confidence ≠ evidence |
| Linter pass → "Build pass" | → Linter ≠ compiler, chạy build |
| Chỉ test happy path | → Test cả error/edge cases |
| Fix 1 bug, tạo bug mới | → Rollback, phân tích lại |

## Skills sử dụng
- `fix-review` - Verify fix addresses root cause
- `verification-before-completion` - Evidence before claims
- `error-handling-patterns` - Robust error handling
- `testing-patterns` - Test strategies

## Output
- ✅ Verification evidence (test results, build output)
- 📝 Fix documentation (root cause → fix → tests)
- 🛡️ Regression tests added
- 🔒 No new issues introduced
