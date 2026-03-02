---
description: Đóng gói .exe với Inno Setup
---

# /exe - Đóng gói Executable

## Cách dùng
```
/exe [app name]
```

## Quy trình

### Step 1: Prepare
1. Build production bundle trước (`/build`)
2. Chuẩn bị assets:
   - App icon (.ico)
   - License file
   - README/changelog

### Step 2: Package
3. Chọn packaging tool:
   - **Electron**: `electron-builder`
   - **Node.js**: `pkg`
   - **Inno Setup**: Windows installer
4. Cấu hình:
   - App name, version, description
   - Icon và splash screen
   - Install location
   - File associations (nếu cần)

### Step 3: Build & Sign
5. Build executable
6. Code signing (optional nhưng recommended):
   - Self-signed certificate (dev)
   - CA certificate (production)
7. Auto-update support (electron-updater)

### Step 4: Test
8. Test installer trên clean environment
9. Verify:
   - ☐ Install thành công
   - ☐ App chạy đúng
   - ☐ Uninstall sạch

## Skills sử dụng
- `electron-patterns` - Electron packaging
- `desktop-app-builder` - Desktop app distribution

## Output
- Installer file (.exe/.msi)
- Portable version (optional)
- Auto-update configuration
