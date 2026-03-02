---
description: Viết và chạy tests
---

# /test - Testing

## Cách dùng
```
/test [file/function]   # Test cụ thể
/test all               # Chạy full test suite
/test coverage          # Chạy với coverage report
```

## Quy trình

### Step 1: Phân tích code
1. Đọc code cần test → xác định:
   - Inputs / Outputs / Side effects
   - Happy paths vs Error paths
   - Edge cases (null, empty, boundary)
2. Chọn test level:
   - Unit test → isolated functions
   - Integration test → API endpoints, DB queries
   - E2E test → user workflows

### Step 2: Viết Tests
3. Test structure (Arrange-Act-Assert):
   ```
   describe('FeatureName', () => {
     it('should [expected behavior] when [condition]', () => {
       // Arrange - Setup data
       // Act - Execute function
       // Assert - Verify result
     });
   });
   ```
4. Test categories bắt buộc:
   - ✅ Happy path (input đúng → kết quả đúng)
   - ❌ Error path (input sai → error xử lý đúng)
   - 🔲 Edge cases (null, undefined, empty, max, min)
   - 🔄 Async operations (promises, callbacks)

### Step 3: Run & Analyze
5. Chạy tests: `npm test` hoặc `npx vitest`
6. Coverage targets:
   - Statements: ≥ 80%
   - Branches: ≥ 70%
   - Functions: ≥ 80%
   - Lines: ≥ 80%
7. Phân tích failures → fix hoặc update test

### Step 4: Verify
8. Tất cả tests PASS
9. Coverage đạt target
10. Không có flaky tests

## Skills sử dụng
- `javascript-testing-patterns` - Jest/Vitest patterns
- `testing-patterns` - Test strategies & TDD
- `python-testing-patterns` - pytest (nếu Python)

## Output
- Test files (`*.test.ts` / `*.spec.ts`)
- Coverage report
- Test summary (pass/fail/skip counts)
