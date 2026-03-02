---
description: TDD workflow - viết test trước code
---

# /tdd - Test-Driven Development

## Cách dùng
```
/tdd [feature/function cần implement]
```

## Quy trình Red-Green-Refactor

### 🔴 RED - Viết test trước
1. Viết test cho behavior mong muốn (test PHẢI FAIL)
2. Chạy test → confirm test FAIL (red)
3. Nếu test pass ngay → test viết sai, viết lại

### 🟢 GREEN - Viết code minimal
4. Viết code ÍT NHẤT để test pass
5. Chạy test → confirm PASS (green)
6. KHÔNG viết code thừa, KHÔNG optimize lúc này

### 🔵 REFACTOR - Cải thiện code
7. Refactor code (giữ tests pass):
   - Xóa duplicate
   - Improve naming
   - Extract functions nếu cần
8. Chạy tests → vẫn PASS sau refactor

### 🔄 REPEAT
9. Lặp lại chu kỳ cho feature tiếp theo
10. Mỗi cycle nên nhỏ (<5 phút)

## ⚠️ Kỷ luật TDD
- **KHÔNG viết code production trước test**
- **KHÔNG viết nhiều tests cùng lúc** → 1 test, 1 cycle
- **KHÔNG skip refactor step**
- **Verify red-green:** test PHẢI fail trước khi fix

## Skills sử dụng
- `testing-patterns` - TDD workflow & Jest
- `tdd-orchestrator` - Red-green-refactor discipline

## Output
- Test files (viết trước code)
- Implementation code (minimal)
- Refactored clean code
- All tests passing
