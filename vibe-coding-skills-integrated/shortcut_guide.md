# Shortcut Guide

## Quick Reference

### 🎯 Planning (Module 1)
| Command | Description |
|---------|-------------|
| `/brain` | Brainstorm ý tưởng, thu thập requirements (MoSCoW) |
| `/flow` | Vẽ Flowchart bằng Mermaid (multi diagram types) |
| `/erd` | Thiết kế Database Schema/ERD + indexing strategy |

### 🔧 Backend (Module 2)
| Command | Description |
|---------|-------------|
| `/setup` | Setup Backend (Node.js + Docker + project structure) |
| `/prisma` | Tạo Prisma Schema + Migration + validation |
| `/docker` | Docker containerization (multi-stage build) |

### 🔌 API (Module 3)
| Command | Description |
|---------|-------------|
| `/api` | Tạo CRUD API + validation + error handling |
| `/postman` | Generate Postman collection + test scripts |

### 🔐 Auth (Module 4)
| Command | Description |
|---------|-------------|
| `/auth` | Setup Authentication (JWT/Session/OAuth) |
| `/google` | Google OAuth integration |
| `/clerk` | Clerk authentication integration |

### 🧪 Testing (Module 5)
| Command | Description |
|---------|-------------|
| `/test` | Viết và chạy tests (unit/integration/e2e) |
| `/tdd` | TDD workflow (red-green-refactor) |

### 🐛 Debug/Fix (Module 6 - MỚI)
| Command | Description |
|---------|-------------|
| `/debug` | **Debug có hệ thống** - 4 pha: Phân tích → Root Cause → Fix → Verify |
| `/fix` | **Fix review** - Xác minh fix đúng root cause, không tạo bug mới |

### 🎨 UI/UX (Module 7)
| Command | Description |
|---------|-------------|
| `/ui` | Làm đẹp UI (accessibility, responsive, animations) |
| `/css` | Tailwind CSS (design system, dark mode) |

### 📦 Release (Module 8)
| Command | Description |
|---------|-------------|
| `/build` | Build production bundle + optimization |
| `/exe` | Đóng gói .exe (Electron/Inno Setup) |
| `/save` | Git commit + push (conventional commits) |
| `/check` | Checkpoint - verify trước khi tiếp tục |
| `/gh` | GitHub Actions CI/CD setup |
| `/deploy` | Deploy to cloud (rollback strategy) |

---

## ⚡ Typical Workflow

```
/brain → /flow → /erd → /setup → /prisma → /api → /auth → /test
                                                              ↓
                                                     có lỗi? → /debug → /fix
                                                              ↓
                                                     /ui → /css → /check → /save → /deploy
```

## 🐛 Debug Flow

```
Gặp lỗi → /debug (tìm root cause) → sửa code → /fix (verify fix) → /check (checkpoint)
```
