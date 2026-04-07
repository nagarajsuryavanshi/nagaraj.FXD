/* ── Projects App ─────────────────────────────────────────── */
window.AppProjects = {
  id: 'projects',
  title: 'Projects',
  icon: 'fa-solid fa-folder-open',
  defaultSize: { width: 740, height: 580 },
  defaultPos: { x: 140, y: 60 },

  projects: [
    {
      id: 1,
      name: 'NexCart — E-Commerce Platform',
      emoji: '🛒',
      shortDesc: 'Full-stack e-commerce with real-time inventory and Stripe payments.',
      desc: 'A complete e-commerce solution with product management, cart, wishlist, order tracking, Stripe payment integration, admin dashboard, and real-time inventory updates via WebSockets.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis', 'Docker'],
      github: 'https://github.com/nagarajsuryavanshi',
      live: '#',
      gradient: 'linear-gradient(135deg,#7c6af7,#e879f9)'
    },
    {
      id: 2,
      name: 'TaskFlow — Project Manager',
      emoji: '📋',
      shortDesc: 'Kanban-style project management tool with team collaboration.',
      desc: 'A Trello-inspired project management app featuring drag-and-drop boards, team workspaces, real-time collaboration, comment threads, file attachments, and Slack integration.',
      tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io', 'Tailwind'],
      github: 'https://github.com/nagarajsuryavanshi',
      live: '#',
      gradient: 'linear-gradient(135deg,#06b6d4,#3b82f6)'
    },
    {
      id: 3,
      name: 'CryptoVault — Dashboard',
      emoji: '📊',
      shortDesc: 'Live crypto portfolio tracker with price alerts and analytics.',
      desc: 'Real-time cryptocurrency portfolio tracker with price charts using D3.js, price alerts via WebSockets, portfolio analytics, profit/loss tracking, and CoinGecko API integration.',
      tech: ['React', 'D3.js', 'WebSocket', 'CoinGecko API', 'Zustand'],
      github: 'https://github.com/nagarajsuryavanshi',
      live: '#',
      gradient: 'linear-gradient(135deg,#f59e0b,#ef4444)'
    },
    {
      id: 4,
      name: 'DevBlog — Markdown CMS',
      emoji: '✍️',
      shortDesc: 'Personal blogging platform with MDX support and SEO optimization.',
      desc: 'A fast, SEO-optimized developer blog platform built with Next.js, MDX for rich content, syntax highlighting, reading time estimation, tag filtering, RSS feed, and sitemap generation.',
      tech: ['Next.js', 'MDX', 'Tailwind', 'Vercel', 'Algolia'],
      github: 'https://github.com/nagarajsuryavanshi',
      live: '#',
      gradient: 'linear-gradient(135deg,#10b981,#059669)'
    },
    {
      id: 5,
      name: 'WeatherPulse — Forecast App',
      emoji: '🌤️',
      shortDesc: 'Beautiful weather app with 7-day forecast and location detection.',
      desc: 'A stunning weather application with animated weather conditions, 7-day forecast, hourly breakdown, UV index, air quality data, geolocation detection, and multiple city bookmarks.',
      tech: ['React', 'OpenWeather API', 'Chart.js', 'PWA', 'CSS Animations'],
      github: 'https://github.com/nagarajsuryavanshi',
      live: '#',
      gradient: 'linear-gradient(135deg,#38bdf8,#818cf8)'
    },
    {
      id: 6,
      name: 'AICraft — AI Writing Tool',
      emoji: '🤖',
      shortDesc: 'AI-powered content generation tool with templates and export.',
      desc: 'An AI writing assistant powered by OpenAI GPT-4 with customizable tone templates, content rewriting, grammar correction, SEO optimization suggestions, and export to PDF/DOCX.',
      tech: ['Next.js', 'OpenAI API', 'Prisma', 'PostgreSQL', 'Stripe'],
      github: 'https://github.com/nagarajsuryavanshi',
      live: '#',
      gradient: 'linear-gradient(135deg,#a78bfa,#f472b6)'
    }
  ],

  render() {
    const cards = this.projects.map(p => `
      <div class="project-card" data-project-id="${p.id}">
        <div class="project-thumb" style="background:${p.gradient}">
          <span style="position:relative;z-index:1;filter:drop-shadow(0 2px 8px rgba(0,0,0,0.4))">${p.emoji}</span>
        </div>
        <div class="project-info">
          <h3>${p.name}</h3>
          <p>${p.shortDesc}</p>
          <div class="project-tags">
            ${p.tech.slice(0,3).map(t => `<span class="tag">${t}</span>`).join('')}
            ${p.tech.length > 3 ? `<span class="tag">+${p.tech.length - 3}</span>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    return `
    <div class="app-content" style="padding-top:20px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
        <div>
          <div class="section-title" style="margin-bottom:2px">My Projects</div>
          <p style="font-size:12px;color:var(--text-secondary)">${this.projects.length} projects · Click to explore</p>
        </div>
        <a href="https://github.com/nagarajsuryavanshi" target="_blank" style="display:flex;align-items:center;gap:6px;padding:8px 14px;background:var(--card-bg);border:1px solid var(--border-soft);border-radius:8px;font-size:12px;font-weight:600;color:var(--text-primary);text-decoration:none;transition:all var(--transition)">
          <i class="fa-brands fa-github"></i> View All on GitHub
        </a>
      </div>
      <div class="projects-grid">${cards}</div>
    </div>`;
  },

  afterMount(windowEl) {
    windowEl.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.dataset.projectId);
        const project = this.projects.find(p => p.id === id);
        if (project) this.openModal(windowEl, project);
      });
    });
  },

  openModal(windowEl, project) {
    const overlay = document.createElement('div');
    overlay.className = 'project-modal-overlay';
    overlay.innerHTML = `
      <div class="project-modal">
        <div class="modal-header" style="background:${project.gradient}">
          <span style="font-size:64px;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.4))">${project.emoji}</span>
          <button class="modal-close"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="modal-body">
          <h2>${project.name}</h2>
          <div class="project-tags" style="margin-bottom:12px">
            ${project.tech.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
          <p>${project.desc}</p>
          <div class="modal-links">
            <a href="${project.github}" target="_blank" class="modal-link">
              <i class="fa-brands fa-github"></i> GitHub
            </a>
            <a href="${project.live}" target="_blank" class="modal-link outline">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
            </a>
          </div>
        </div>
      </div>`;

    overlay.querySelector('.modal-close').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    windowEl.querySelector('.window-body').appendChild(overlay);
  }
};
