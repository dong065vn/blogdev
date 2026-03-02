/**
 * Config Loader — Bridges admin panel config (localStorage) → Portfolio HTML
 * Reads 'portfolio_config' from localStorage and updates DOM elements
 * Graceful fallback: if no config, hardcoded HTML stays as-is
 */
(function () {
  const saved = localStorage.getItem('portfolio_config');
  if (!saved) return; // No config saved → keep hardcoded HTML

  let config;
  try { config = JSON.parse(saved); } catch (e) { console.warn('Config parse error:', e); return; }

  // Helper: safely set text content
  function setText(selector, value) {
    if (!value) return;
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
  }

  // Helper: safely set attribute
  function setAttr(selector, attr, value) {
    if (!value) return;
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  }

  // Helper: safely set innerHTML
  function setHTML(selector, html) {
    if (!html) return;
    const el = document.querySelector(selector);
    if (el) el.innerHTML = html;
  }

  // ===== HERO SECTION =====
  if (config.hero) {
    setText('[data-config="hero.badge"]', config.hero.badge);
    setText('[data-config="hero.titleLine1"]', config.hero.titleLine1);
    setText('[data-config="hero.titleLine2"]', config.hero.titleLine2);
    setText('[data-config="hero.ctaText"]', config.hero.ctaText);
    setText('[data-config="hero.cvText"]', config.hero.cvText);
  }
  if (config.profile) {
    setText('[data-config="hero.desc"]', config.profile.description);
    if (config.profile.cv) {
      setAttr('[data-config="hero.cvLink"]', 'href', config.profile.cv);
    }
  }

  // ===== AVATAR =====
  const avatarSrc = config.images?.avatar || config.profile?.avatar;
  if (avatarSrc) {
    document.querySelectorAll('[data-config="avatar"]').forEach(img => {
      img.src = avatarSrc.startsWith('data:') ? avatarSrc : avatarSrc;
    });
  }

  // ===== STATS =====
  if (config.stats && config.stats.length > 0) {
    const statsGrid = document.querySelector('[data-config="stats-grid"]');
    if (statsGrid) {
      statsGrid.innerHTML = config.stats.map((s, i) => {
        const colors = ['var(--iris-pink)', 'var(--iris-blue)', 'var(--iris-purple)', 'var(--iris-cyan)'];
        const bgs = [
          'rgba(255, 107, 157, 0.15)', 'rgba(18, 194, 233, 0.15)',
          'rgba(196, 113, 237, 0.15)', 'rgba(0, 245, 212, 0.15)'
        ];
        const c = colors[i % colors.length];
        const bg = bgs[i % bgs.length];
        return `
          <div class="stat-card">
            <div class="stat-icon" style="background:${bg};color:${c};"><i class="fa-solid ${s.icon}"></i></div>
            <div class="stat-value" style="color:${c};text-shadow:0 0 30px ${c};" data-count="${s.value}">0</div>
            <div class="stat-label">${s.label}</div>
          </div>`;
      }).join('');
    }
  }

  // ===== ABOUT SECTION =====
  if (config.about) {
    setText('[data-config="about.profileText"]', config.about.profileText);

    // Contact list
    if (config.about.contacts && config.about.contacts.length > 0) {
      const contactList = document.querySelector('[data-config="about.contacts"]');
      if (contactList) {
        contactList.innerHTML = config.about.contacts.map(c => `
          <a href="${c.url || '#'}" class="contact-item">
            <i class="${c.icon}"></i><span>${c.label}</span>
          </a>`).join('');
      }
    }

    // Experience list
    if (config.about.experience && config.about.experience.length > 0) {
      setText('[data-config="about.expTitle"]', config.about.expTitle || 'Experience');
      setText('[data-config="about.expDesc"]', config.about.expDescription || '');
      const expList = document.querySelector('[data-config="about.experience"]');
      if (expList) {
        expList.innerHTML = config.about.experience.map(exp => `
          <div class="exp-item">
            <span class="exp-year">${exp.year}</span>
            <div class="exp-content">
              <h4>${exp.title}</h4>
              <p>${exp.description}</p>
            </div>
          </div>`).join('');
      }
    }
  }

  // ===== SKILLS =====
  if (config.skills && config.skills.length > 0) {
    const skillsGrid = document.querySelector('[data-config="skills-grid"]');
    if (skillsGrid) {
      const icons = ['var(--iris-pink)', 'var(--iris-purple)', 'var(--iris-blue)', 'var(--iris-cyan)'];
      const bgs = [
        'rgba(255, 107, 157, 0.15)', 'rgba(196, 113, 237, 0.15)',
        'rgba(18, 194, 233, 0.15)', 'rgba(0, 245, 212, 0.15)'
      ];
      skillsGrid.innerHTML = config.skills.map((s, i) => `
        <div class="skill-card ${s.large ? 'large' : ''}">
          <div class="skill-icon" style="background:${bgs[i % bgs.length]};color:${icons[i % icons.length]};"><i class="fa-solid ${s.icon}"></i></div>
          <h3>${s.title}</h3>
          <div class="skill-tags">${s.tags.map(t => `<span class="skill-tag">${t}</span>`).join('')}</div>
        </div>`).join('');
    }
  }

  // ===== PROJECTS =====
  if (config.projects && config.projects.length > 0) {
    const projectsGrid = document.querySelector('[data-config="projects-grid"]');
    if (projectsGrid) {
      projectsGrid.innerHTML = config.projects.map(p => `
        <div class="project-card">
          <div class="project-image">
            <img src="${p.image}" alt="${p.title}">
            <div class="project-overlay">
              <a href="${p.demo || '#'}" class="project-link" aria-label="Live Demo"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
              <a href="${p.github || '#'}" class="project-link" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
            </div>
          </div>
          <div class="project-content">
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <div class="project-tags">${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
          </div>
        </div>`).join('');
    }
  }

  // ===== SOCIAL LINKS =====
  if (config.social && config.social.length > 0) {
    const socialsContainer = document.querySelector('[data-config="hero.socials"]');
    if (socialsContainer) {
      socialsContainer.innerHTML = config.social.map(s =>
        `<a href="${s.url}" class="social-btn" aria-label="${s.name}"><i class="${s.icon}"></i></a>`
      ).join('');
    }
  }

  console.log('✅ Config loaded from admin panel');
})();
