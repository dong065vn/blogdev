# Vibe Coding Skills Integrated Workspace

## Setup

### 1. Cài đặt
Copy folder `.agent/workflows/` vào project của bạn.

### 2. Sử dụng
Gõ `/command` để kích hoạt workflow tương ứng.

## Danh sách Commands (23 workflows)

### Planning
- `/brain` - Brainstorm & thu thập requirements
- `/flow` - Vẽ Flowchart bằng Mermaid
- `/erd` - Thiết kế Database Schema

### Development
- `/setup` - Setup Backend (Node.js + Docker)
- `/prisma` - Prisma Schema & Migration
- `/docker` - Docker containerization
- `/api` - Tạo CRUD API
- `/postman` - Generate Postman collection

### Auth
- `/auth` - Setup Authentication
- `/google` - Google OAuth
- `/clerk` - Clerk integration

### Testing
- `/test` - Viết & chạy tests
- `/tdd` - Test-Driven Development

### 🐛 Debug/Fix (MỚI)
- `/debug` - Debug có hệ thống (4 pha: Phân tích → Root Cause → Fix → Verify)
- `/fix` - Fix review & verification (evidence before claims)

### UI/UX
- `/ui` - Làm đẹp giao diện
- `/css` - Tailwind CSS styling

### Release
- `/build` - Build production
- `/exe` - Đóng gói .exe
- `/save` - Git commit + push
- `/check` - Checkpoint & verify
- `/gh` - GitHub Actions CI/CD
- `/deploy` - Deploy to cloud

## Quy trình làm việc

```
/brain → /flow → /erd → /setup → /prisma → /api → /auth → /test → /ui → /css → /save → /deploy
                                                              ↓
                                                     gặp lỗi? → /debug → fix → /fix → /check
```

### Khi gặp lỗi:
1. `/debug` - Phân tích lỗi, tìm root cause
2. Sửa code theo đề xuất
3. `/fix` - Verify fix đúng, không tạo bug mới
4. `/check` - Checkpoint trước khi tiếp tục

## Folder Structure
```
.agent/
└── workflows/         # 23 workflow files
    ├── brain.md       # Planning
    ├── flow.md
    ├── erd.md
    ├── setup.md       # Development
    ├── prisma.md
    ├── docker.md
    ├── api.md
    ├── postman.md
    ├── auth.md        # Auth
    ├── google.md
    ├── clerk.md
    ├── test.md        # Testing
    ├── tdd.md
    ├── debug.md       # Debug/Fix (MỚI)
    ├── fix.md
    ├── ui.md          # UI/UX
    ├── css.md
    ├── build.md       # Release
    ├── exe.md
    ├── save.md
    ├── check.md
    ├── gh.md
    └── deploy.md
skill_router.md        # Routing rules
shortcut_guide.md      # Quick reference
setup_instruction.md   # This file
```
