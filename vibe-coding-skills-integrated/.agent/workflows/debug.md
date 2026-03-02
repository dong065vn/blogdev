---
description: Debug - Fix lỗi có hệ thống, tìm root cause trước khi sửa
---

# /debug - Systematic Debugging

## Cách dùng
```
/debug [mô tả lỗi / error message / screenshot]
```

## ⚠️ NGUYÊN TẮC VÀNG
> **KHÔNG BAO GIỜ sửa code ngay khi thấy lỗi.**
> Phải tìm ROOT CAUSE trước, đề xuất giải pháp, rồi mới sửa.

## Quy trình 4 pha

### Phase 1: 🔍 Thu thập & Phân tích (KHÔNG sửa code)
1. **Capture error context:**
   - Copy chính xác error message + stack trace
   - Ghi lại reproduction steps (làm gì → lỗi gì)
   - Lỗi xảy ra lúc nào? (luôn luôn / ngẫu nhiên / sau thay đổi nào?)
2. **Check recent changes:**
   - `git log --oneline -10` - xem commit gần nhất
   - `git diff` - xem code đang thay đổi
3. **Analyze error type:**
   - Syntax error → thiếu dấu, sai cú pháp
   - Runtime error → null/undefined, type mismatch
   - Logic error → code chạy nhưng kết quả sai
   - Build error → dependency, config
   - Network error → API, CORS, timeout

### Phase 2: 🎯 Tìm Root Cause
4. **Isolate failure location:**
   - Đọc stack trace từ dưới lên
   - Xác định file + line gây lỗi
   - Kiểm tra input/output tại điểm lỗi
5. **Form hypotheses (liệt kê 2-3 giả thuyết):**
   - Giả thuyết 1: [mô tả]
   - Giả thuyết 2: [mô tả]
   - Giả thuyết 3: [mô tả]
6. **Test hypotheses:**
   - Thêm console.log/debug logging tại điểm nghi ngờ
   - Kiểm tra giá trị biến tại runtime
   - Thử reproduce với input khác

### Phase 3: 💊 Đề xuất & Implement Fix
7. **Đề xuất giải pháp (TRƯỚC KHI sửa):**
   - Giải pháp 1: [mô tả] - Pros/Cons
   - Giải pháp 2: [mô tả] - Pros/Cons
   - → Chọn giải pháp tốt nhất, giải thích lý do
8. **Implement minimal fix:**
   - Chỉ sửa code liên quan trực tiếp đến root cause
   - KHÔNG refactor thêm trong lúc fix bug
   - Comment giải thích WHY nếu fix không rõ ràng

### Phase 4: ✅ Verify & Prevent
9. **Verify fix:**
   - Chạy lại reproduction steps → lỗi đã hết?
   - Chạy existing tests → không break gì khác?
   - Test edge cases liên quan
10. **Prevent recurrence:**
    - Thêm test case cho bug vừa fix
    - Cập nhật error handling nếu cần
    - Ghi note những gì đã học được

## Skills sử dụng
- `error-detective` - Phân tích log và error patterns
- `debugging-strategies` - Kỹ thuật debug có hệ thống
- `debugger` - Root cause analysis
- `error-handling-patterns` - Error handling best practices

## ❌ Anti-patterns (TRÁNH)
- Sửa code ngay khi thấy lỗi mà chưa hiểu root cause
- Thử sửa nhiều thứ cùng lúc
- Không test lại sau khi sửa
- Nói "should work now" mà không verify
- Fix triệu chứng thay vì nguyên nhân gốc

## Output
- Root cause analysis (giải thích rõ ràng)
- Code fix (minimal, focused)
- Verification evidence (test results)
- Prevention measures (new tests, better error handling)
