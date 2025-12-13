require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const app = express();
const PORT = process.env.PORT || 3000;

// Security: Require ADMIN_TOKEN in production
if (!process.env.ADMIN_TOKEN && process.env.NODE_ENV === 'production') {
  throw new Error('ADMIN_TOKEN is required in production. Set it in environment variables.');
}
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'changeme-dev-only';

/** ALLOWED_ORIGIN: cho phép nhiều origin, ngăn cách bằng dấu phẩy
 *  Ví dụ:
 *  ALLOWED_ORIGIN=https://dong065vn.github.io,http://127.0.0.1:5500,http://localhost:5500
 */
const ORIGIN_LIST = (process.env.ALLOWED_ORIGIN || '*')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

// Security: Disallow wildcard CORS in production
if (ORIGIN_LIST.includes('*') && process.env.NODE_ENV === 'production') {
  throw new Error('Wildcard CORS (*) is not allowed in production. Specify exact origins in ALLOWED_ORIGIN.');
}

app.use(express.json({ limit: '2mb' }));

app.use(cors({
  origin(origin, cb) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return cb(null, true);

    // Check wildcard (only in development)
    if (ORIGIN_LIST.includes('*') && process.env.NODE_ENV !== 'production') {
      return cb(null, true);
    }

    // Check exact match
    if (ORIGIN_LIST.includes(origin)) return cb(null, true);

    // Blocked
    cb(new Error('CORS blocked: ' + origin));
  },
  credentials: true
}));

// ====== Rate Limiting ======
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { ok: false, error: 'too_many_requests' },
  standardHeaders: true,
  legacyHeaders: false
});

const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit POST/write operations
  message: { ok: false, error: 'too_many_requests' },
  standardHeaders: true,
  legacyHeaders: false
});

// Apply rate limiting to all /api routes
app.use('/api/', apiLimiter);

// ====== Helpers: chọn đường dẫn ghi/đọc, fallback /tmp nếu cần ======
const primaryDir = path.resolve(__dirname, 'sections');

// Security: Prevent path traversal
const tmpBase = path.resolve(process.env.RUNTIME_TMPDIR || '/tmp');
const tmpDir = path.join(tmpBase, 'sections');
if (!tmpDir.startsWith(tmpBase)) {
  throw new Error('Invalid RUNTIME_TMPDIR: path traversal detected');
}

const primaryFile = path.join(primaryDir, 'projects.html');
const tmpFile = path.join(tmpDir, 'projects.html');

async function ensureDir(dirPath) {
  await fsp.mkdir(dirPath, { recursive: true });
  await fsp.access(dirPath, fs.constants.W_OK);
  return dirPath;
}

/** Trả về đường dẫn file có thể ghi */
async function getWritableFilePath() {
  try {
    await ensureDir(primaryDir);
    return primaryFile;
  } catch {
    await ensureDir(tmpDir);
    return tmpFile;
  }
}

/** Trả về đường dẫn file hiện có để đọc (ưu tiên primary) */
async function getReadableFilePath() {
  try {
    await fsp.access(primaryFile, fs.constants.F_OK);
    return primaryFile;
  } catch {
    return tmpFile;
  }
}

function sanitizeHTML(raw) {
  return DOMPurify.sanitize(raw, {
    ALLOWED_TAGS: [
      'section','article','div','span','h1','h2','h3','h4','h5','h6','p','ul','ol','li',
      'a','img','button','small','strong','em','i','b','svg','path','figure','figcaption'
    ],
    ALLOWED_ATTR: [
      'class','id','href','target','rel','alt','src','loading','data-aos',
      'aria-label','role','title','viewBox','d','data-aos-delay'
    ],
    FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed'],
    FORBID_ATTR: [/^on/i, 'style'] // Block inline styles for security
  });
}

// Constants
const MAX_HTML_SIZE = 1024 * 1024; // 1MB

// Helper: Better error logging
function logError(context, error, extra = {}) {
  console.error('[ERROR]', new Date().toISOString(), context, {
    message: error.message,
    stack: error.stack,
    ...extra
  });
}

// ====== API: GET/POST sections/projects ======
app.get('/api/sections/projects', async (_req, res) => {
  try {
    const file = await getReadableFilePath();
    const html = await fsp.readFile(file, 'utf8').catch(() => '');
    res.json({ ok: true, html, source: file });
  } catch (e) {
    logError('read_failed', e);
    res.status(500).json({ ok: false, error: 'read_failed' });
  }
});

app.post('/api/sections/projects', strictLimiter, async (req, res) => {
  try {
    // Validate token
    const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '').trim();
    if (token !== ADMIN_TOKEN) {
      logError('unauthorized_access', new Error('Invalid token'), {
        ip: req.ip,
        headers: req.headers
      });
      return res.status(401).json({ ok: false, error: 'unauthorized' });
    }

    // Validate input
    const { html } = req.body || {};
    if (typeof html !== 'string') {
      return res.status(400).json({ ok: false, error: 'html_required' });
    }

    // Check size limit
    const sizeBytes = Buffer.byteLength(html, 'utf8');
    if (sizeBytes > MAX_HTML_SIZE) {
      return res.status(413).json({
        ok: false,
        error: 'html_too_large',
        maxSize: MAX_HTML_SIZE,
        actualSize: sizeBytes
      });
    }

    // Sanitize and save
    const file = await getWritableFilePath();
    const clean = sanitizeHTML(html);
    await fsp.writeFile(file, clean, 'utf8');

    res.json({
      ok: true,
      saved: file,
      bytes: Buffer.byteLength(clean, 'utf8')
    });
  } catch (e) {
    logError('write_failed', e, { ip: req.ip });
    res.status(500).json({ ok: false, error: 'write_failed' });
  }
});

// ====== Proxy fetch (import từ Web B/GitHub Pages) ======
const ALLOWED_FETCH_HOSTS = new Set([
  'localhost', '127.0.0.1',
  'dong065vn.github.io' // đổi/ thêm domain khác nếu cần
]);

app.get('/api/proxy/fetch', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ ok: false, error: 'url_required' });

    // Validate URL format
    let u;
    try {
      u = new URL(url);
    } catch {
      return res.status(400).json({ ok: false, error: 'invalid_url' });
    }

    // Check allowed hosts
    if (!ALLOWED_FETCH_HOSTS.has(u.hostname)) {
      logError('proxy_blocked', new Error('Host not allowed'), {
        hostname: u.hostname,
        ip: req.ip
      });
      return res.status(403).json({
        ok: false,
        error: 'host_not_allowed',
        allowed: Array.from(ALLOWED_FETCH_HOSTS)
      });
    }

    // Fetch with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const r = await fetch(u.toString(), {
      redirect: 'follow',
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!r.ok) {
      return res.status(502).json({
        ok: false,
        error: 'upstream_error',
        status: r.status
      });
    }

    const html = await r.text();
    res.setHeader('content-type', 'text/html; charset=utf-8');
    res.status(200).send(html);
  } catch (e) {
    logError('fetch_failed', e, { url: req.query.url, ip: req.ip });
    res.status(500).json({ ok: false, error: 'fetch_failed', message: e.message });
  }
});

// ====== Health check endpoint ======
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

app.listen(PORT, () => console.log(`API listening on :${PORT}`));
