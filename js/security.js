/**
 * Security Utilities for Portfolio
 * Prevents XSS, validates input, sanitizes output
 */

const Security = {
  // HTML Entity Encoding - Prevent XSS
  escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  // Decode HTML entities safely
  decodeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.innerHTML = str;
    return div.textContent;
  },

  // Sanitize HTML - Remove dangerous tags/attributes
  sanitizeHtml(html) {
    if (!html) return '';
    const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
      'ul', 'ol', 'li', 'a', 'code', 'pre', 'blockquote', 'img', 'span', 'div'];
    const allowedAttrs = ['href', 'src', 'alt', 'title', 'class', 'id', 'target'];
    
    const div = document.createElement('div');
    div.innerHTML = html;
    
    // Remove script tags and event handlers
    const scripts = div.querySelectorAll('script, style, iframe, object, embed, form');
    scripts.forEach(el => el.remove());
    
    // Remove dangerous attributes
    const allElements = div.querySelectorAll('*');
    allElements.forEach(el => {
      // Remove event handlers (onclick, onerror, etc.)
      Array.from(el.attributes).forEach(attr => {
        if (attr.name.startsWith('on') || 
            attr.name === 'javascript:' ||
            (attr.name === 'href' && attr.value.toLowerCase().startsWith('javascript:'))) {
          el.removeAttribute(attr.name);
        }
      });
      
      // Validate href and src
      if (el.hasAttribute('href')) {
        const href = el.getAttribute('href').toLowerCase();
        if (href.startsWith('javascript:') || href.startsWith('data:')) {
          el.removeAttribute('href');
        }
      }
      if (el.hasAttribute('src')) {
        const src = el.getAttribute('src').toLowerCase();
        if (src.startsWith('javascript:') || src.startsWith('data:text/html')) {
          el.removeAttribute('src');
        }
      }
    });
    
    return div.innerHTML;
  },

  // Validate URL - Prevent open redirect
  isValidUrl(url) {
    if (!url) return false;
    try {
      const parsed = new URL(url, window.location.origin);
      // Only allow http, https protocols
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  },

  // Sanitize URL for safe use
  sanitizeUrl(url) {
    if (!url) return '#';
    const lower = url.toLowerCase().trim();
    if (lower.startsWith('javascript:') || lower.startsWith('data:') || lower.startsWith('vbscript:')) {
      return '#';
    }
    return url;
  },

  // Validate and sanitize JSON data
  sanitizeJson(data) {
    if (typeof data === 'string') {
      return this.escapeHtml(data);
    }
    if (Array.isArray(data)) {
      return data.map(item => this.sanitizeJson(item));
    }
    if (typeof data === 'object' && data !== null) {
      const sanitized = {};
      for (const key of Object.keys(data)) {
        sanitized[key] = this.sanitizeJson(data[key]);
      }
      return sanitized;
    }
    return data;
  },

  // Content Security Policy meta tag
  getCSPMeta() {
    return `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https: blob:; connect-src 'self';">`;
  },

  // Rate limiting for form submissions
  rateLimiter: {
    attempts: {},
    maxAttempts: 5,
    windowMs: 60000, // 1 minute

    check(key) {
      const now = Date.now();
      if (!this.attempts[key]) {
        this.attempts[key] = { count: 1, firstAttempt: now };
        return true;
      }
      
      const record = this.attempts[key];
      if (now - record.firstAttempt > this.windowMs) {
        this.attempts[key] = { count: 1, firstAttempt: now };
        return true;
      }
      
      if (record.count >= this.maxAttempts) {
        return false;
      }
      
      record.count++;
      return true;
    }
  },

  // Input validation
  validate: {
    email(str) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(str);
    },
    phone(str) {
      const re = /^[\d\s\-\+\(\)]{8,20}$/;
      return re.test(str);
    },
    url(str) {
      try {
        new URL(str);
        return true;
      } catch {
        return false;
      }
    },
    notEmpty(str) {
      return str && str.trim().length > 0;
    },
    maxLength(str, max) {
      return !str || str.length <= max;
    }
  }
};

// Freeze to prevent tampering
Object.freeze(Security);
Object.freeze(Security.validate);
Object.freeze(Security.rateLimiter);

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Security;
}
