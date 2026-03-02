---
description: Build production bundle
---

# /build - Production Build

## Cách dùng
```
/build                  # Build mặc định
/build analyze          # Build + bundle analysis
```

## Quy trình

### Step 1: Pre-build
1. Verify code quality:
   - `npm run lint` → 0 errors
   - `npx tsc --noEmit` → 0 type errors
2. Check environment:
   - `.env.production` configured
   - API URLs pointing to production

### Step 2: Build
3. Build command: `npm run build`
4. Optimization checklist:
   - ☐ Tree shaking enabled
   - ☐ Code splitting (lazy imports)
   - ☐ Image optimization
   - ☐ CSS minification
   - ☐ Source maps (production: hidden)

### Step 3: Analyze & Verify
5. Bundle analysis (optional):
   - Check bundle size
   - Identify large dependencies
   - Find unused code
6. Test production build locally:
   - `npm run preview` hoặc `npm start`
   - Verify core functionality works

## Skills sử dụng
- `build-optimization` - Bundle optimization
- `performance-pro` - Performance tuning

## Output
- Production build (`dist/` hoặc `.next/`)
- Build size report
- No errors or warnings
