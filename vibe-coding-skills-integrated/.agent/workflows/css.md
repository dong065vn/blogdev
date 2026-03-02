---
description: Tailwind CSS styling
---

# /css - Tailwind Styling

## Cách dùng
```
/css [component]        # Style component cụ thể
/css dark-mode          # Setup dark mode
/css system             # Setup design system
```

## Quy trình

### Step 1: Design System Setup
1. Cấu hình `tailwind.config.js`:
   - Custom colors (brand palette)
   - Custom fonts
   - Custom spacing scale
   - Dark mode strategy (`class` hoặc `media`)
2. Base styles trong `globals.css`:
   - CSS variables cho design tokens
   - Reset/normalize styles

### Step 2: Component Styling
3. Utility-first approach:
   - Composition over custom CSS
   - Group related utilities
   - Extract components khi lặp lại (>3 lần)
4. Responsive design:
   - `sm:`, `md:`, `lg:`, `xl:` breakpoints
   - Mobile-first (default → responsive up)
5. Interactive states:
   - `hover:`, `focus:`, `active:`, `disabled:`
   - `group-hover:`, `peer-checked:`
   - Transition utilities cho smooth animations

### Step 3: Dark Mode
6. Implement dark mode:
   - `dark:` variant cho mỗi component
   - Color scheme switching
   - Persist preference (localStorage)

### Step 4: Optimize
7. PurgeCSS (tự động với Tailwind v3+)
8. Verify responsive trên multiple viewports

## Skills sử dụng
- `tailwind-design-system` - Design system patterns
- `tailwind-patterns` - Tailwind CSS v4 best practices
- `frontend-design` - Visual aesthetics

## Output
- `tailwind.config.js` (customized)
- Global styles
- Component classes
- Dark mode support
