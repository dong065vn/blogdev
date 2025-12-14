# Hướng dẫn triển khai Database cho Portfolio

## Option 1: Firebase Firestore (Miễn phí) ⭐ RECOMMENDED

### Bước 1: Tạo Firebase Project

1. Truy cập https://console.firebase.google.com/
2. Đăng nhập Google Account
3. Click **"Create a project"**
4. Đặt tên project: `dongdev-portfolio`
5. Disable Google Analytics → Click **Create project**

### Bước 2: Tạo Firestore Database

1. Trong menu bên trái → **Build** → **Firestore Database**
2. Click **"Create database"**
3. Chọn **"Start in test mode"** → Next
4. Chọn location: `asia-southeast1` (Singapore) → Enable

### Bước 3: Lấy Firebase Config

1. Click icon ⚙️ (Settings) → **Project settings**
2. Scroll xuống **"Your apps"**
3. Click icon **</>** (Web)
4. Đặt nickname: `portfolio-web` → **Register app**
5. Copy đoạn `firebaseConfig`:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "dongdev-portfolio.firebaseapp.com",
  projectId: "dongdev-portfolio",
  storageBucket: "dongdev-portfolio.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### Bước 4: Cập nhật Config

Mở file `js/firebase-config.js` và thay thế:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",           // ← Thay bằng apiKey của bạn
  authDomain: "YOUR_PROJECT...",    // ← Thay bằng authDomain
  projectId: "YOUR_PROJECT_ID",     // ← Thay bằng projectId
  storageBucket: "YOUR_PROJECT...", // ← Thay bằng storageBucket
  messagingSenderId: "...",         // ← Thay bằng messagingSenderId
  appId: "..."                      // ← Thay bằng appId
};
```

### Bước 5: Thiết lập Security Rules

1. Trong Firestore → Tab **Rules**
2. Thay thế bằng rules sau:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Blog posts - public read, authenticated write
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Config - public read, authenticated write
    match /config/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Messages - anyone can create, only auth can read
    match /messages/{messageId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

3. Click **Publish**

### Bước 6: Bật Authentication (Optional)

1. **Build** → **Authentication** → **Get started**
2. Tab **Sign-in method** → Enable **Email/Password**
3. Tab **Users** → **Add user** → Nhập email/password admin

---

## Option 2: Supabase (PostgreSQL miễn phí)

### Bước 1: Tạo Project

1. Truy cập https://supabase.com/
2. Sign up / Login
3. **New project** → Đặt tên, password, region

### Bước 2: Tạo Tables

Vào **SQL Editor** và chạy:

```sql
-- Blog Posts
CREATE TABLE posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  tags TEXT[],
  image TEXT,
  author TEXT DEFAULT 'Đông Dev',
  date DATE DEFAULT CURRENT_DATE,
  read_time INT DEFAULT 5,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio Config
CREATE TABLE config (
  id TEXT PRIMARY KEY DEFAULT 'portfolio',
  data JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT,
  subject TEXT,
  message TEXT,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE config ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public read posts" ON posts FOR SELECT USING (true);
CREATE POLICY "Public read config" ON config FOR SELECT USING (true);
CREATE POLICY "Anyone can send message" ON messages FOR INSERT WITH CHECK (true);
```

### Bước 3: Lấy API Keys

1. **Settings** → **API**
2. Copy `URL` và `anon public` key

---

## Option 3: JSONBin.io (Đơn giản nhất)

Nếu chỉ cần lưu JSON đơn giản:

1. Truy cập https://jsonbin.io/
2. Sign up miễn phí
3. Tạo bin mới với data
4. Lấy API key và Bin ID
5. Dùng fetch để đọc/ghi

---

## Cấu trúc Database

```
Firestore Collections:
│
├── posts/                    # Blog posts
│   ├── {postId}
│   │   ├── title: string
│   │   ├── content: string (markdown)
│   │   ├── category: string
│   │   ├── tags: array
│   │   ├── image: string (url)
│   │   ├── date: timestamp
│   │   └── featured: boolean
│
├── config/                   # Portfolio config
│   └── portfolio
│       ├── profile: object
│       ├── hero: object
│       ├── stats: array
│       ├── skills: array
│       ├── projects: array
│       └── social: array
│
└── messages/                 # Contact form
    └── {messageId}
        ├── name: string
        ├── email: string
        ├── message: string
        └── createdAt: timestamp
```

---

## Hosting Recommendations

| Service | Free Tier | Custom Domain | SSL |
|---------|-----------|---------------|-----|
| **GitHub Pages** | ✅ Unlimited | ✅ | ✅ |
| **Vercel** | ✅ 100GB/month | ✅ | ✅ |
| **Netlify** | ✅ 100GB/month | ✅ | ✅ |
| **Firebase Hosting** | ✅ 10GB/month | ✅ | ✅ |

### Deploy lên GitHub Pages:

```bash
# 1. Tạo repo trên GitHub
# 2. Push code
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main

# 3. Settings → Pages → Source: main branch
```

### Deploy lên Vercel:

1. Truy cập https://vercel.com/
2. Import Git Repository
3. Deploy tự động!

---

## Checklist triển khai

- [ ] Tạo Firebase project
- [ ] Tạo Firestore database
- [ ] Copy config vào `js/firebase-config.js`
- [ ] Thiết lập Security Rules
- [ ] Test CRUD operations
- [ ] Deploy lên hosting
- [ ] Cấu hình custom domain (optional)
