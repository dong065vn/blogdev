# Đông Dev – Portfolio Project

A modern, full-stack portfolio website with a content management system for dynamic project updates.

## 📁 Project Structure

```
BackupProfile/
├── index.html          # Main portfolio website (Web B)
├── editor.html         # Admin editor interface (Web A)
├── server.js           # Express API server
├── .env.example        # Environment variables template
├── package.json        # Dependencies
└── sections/           # Generated content (gitignored)
    └── projects.html   # Dynamic projects data
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` and set:
- `ADMIN_TOKEN`: Strong random token for API authentication
- `ALLOWED_ORIGIN`: Comma-separated list of allowed CORS origins
- `NODE_ENV`: `development` or `production`

### 3. Start Server
```bash
# Development
npm run dev

# Production
NODE_ENV=production npm start
```

API will be available at `http://localhost:3000` (or your configured PORT)

## 📖 API Documentation

### Base URL
- Development: `http://localhost:3000`
- Production: Your deployed URL

### Endpoints

#### 🟢 GET `/health`
Health check endpoint

**Response:**
```json
{
  "status": "ok",
  "uptime": 1234.56,
  "timestamp": "2025-01-28T10:30:00.000Z",
  "env": "development"
}
```

---

#### 🟢 GET `/api/sections/projects`
Retrieve projects HTML content

**Rate Limit:** 100 requests per 15 minutes

**Response:**
```json
{
  "ok": true,
  "html": "<article>...</article>",
  "source": "/path/to/projects.html"
}
```

---

#### 🔴 POST `/api/sections/projects`
Update projects HTML content (requires authentication)

**Rate Limit:** 20 requests per 15 minutes

**Headers:**
```
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json
```

**Body:**
```json
{
  "html": "<article>...</article>"
}
```

**Response:**
```json
{
  "ok": true,
  "saved": "/path/to/projects.html",
  "bytes": 1234
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or missing token
- `413 Payload Too Large`: HTML exceeds 1MB limit
- `429 Too Many Requests`: Rate limit exceeded

---

#### 🟢 GET `/api/proxy/fetch?url=<URL>`
Proxy fetch for importing content from allowed hosts

**Allowed Hosts:**
- localhost
- 127.0.0.1
- dong065vn.github.io

**Query Parameters:**
- `url` (required): Full URL to fetch

**Response:**
Returns HTML content from the fetched URL

**Error Responses:**
- `400 Bad Request`: Invalid or missing URL
- `403 Forbidden`: Host not in allowed list
- `502 Bad Gateway`: Upstream server error

## 🔒 Security Features

- ✅ **Input Validation**: HTML size limits, type checking
- ✅ **DOMPurify Sanitization**: XSS protection
- ✅ **Rate Limiting**: Prevents abuse
- ✅ **CORS Protection**: Configurable allowed origins
- ✅ **Authentication**: Token-based API access
- ✅ **Path Traversal Prevention**: Secure file operations
- ✅ **Production Safeguards**: Required env vars, no wildcard CORS

## 🛠️ Development

### Update Dependencies
```bash
npm update
```

### Check for Vulnerabilities
```bash
npm audit
```

### Generate Secure Token
```bash
openssl rand -base64 32
```

## 📝 Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | 3000 | Server port |
| `NODE_ENV` | No | development | Environment mode |
| `ADMIN_TOKEN` | **Yes (prod)** | - | API authentication token |
| `ALLOWED_ORIGIN` | No | * | CORS allowed origins (comma-separated) |
| `RUNTIME_TMPDIR` | No | /tmp | Temporary directory path |

## 🌐 Deployment

### Render / Railway / Fly.io
1. Set environment variables in dashboard
2. Deploy from Git repository
3. Ensure `NODE_ENV=production`

### Health Check
Configure health check endpoint: `/health`

## 📄 License

© 2025 Đông Dev. All rights reserved.
