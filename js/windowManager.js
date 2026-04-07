/* ── Window Manager ───────────────────────────────────────── */
(function() {
  'use strict';

  const APPS = {
    about: window.AppAbout,
    projects: window.AppProjects,
    experience: window.AppExperience,
    contact: window.AppContact,
    resume: window.AppResume
  };

  const APP_TITLES = {
    about: 'About Me',
    projects: 'Projects',
    experience: 'Experience',
    contact: 'Contact',
    resume: 'Resume — Nagaraj Suryavanshi'
  };

  let zCounter = 200;
  const openWindows = {};
  const minimizedWindows = {};
  const template = document.getElementById('window-template');
  const container = document.getElementById('windows-container');

  function getDefaultPos(appId) {
    const app = APPS[appId];
    const offset = Object.keys(openWindows).length * 30;
    const containerRect = container.getBoundingClientRect();
    const w = app.defaultSize?.width || 600;
    const h = app.defaultSize?.height || 500;
    const x = Math.min((app.defaultPos?.x || 80) + offset, containerRect.width - w - 20);
    const y = Math.min((app.defaultPos?.y || 40) + offset, containerRect.height - h - 20);
    return { x: Math.max(10, x), y: Math.max(10, y), w, h };
  }

  window.WindowManager = {
    openWindows,

    open(appId) {
      // If window exists and is minimized, restore it
      if (openWindows[appId]) {
        if (minimizedWindows[appId]) {
          this.restore(appId);
        } else {
          this.focus(openWindows[appId]);
        }
        return;
      }

      const app = APPS[appId];
      if (!app) return;

      // Clone template
      const clone = template.content.cloneNode(true);
      const win = clone.querySelector('.os-window');
      win.dataset.app = appId;
      win.dataset.id = appId;

      // Set position & size
      const pos = getDefaultPos(appId);
      win.style.left = pos.x + 'px';
      win.style.top = pos.y + 'px';
      win.style.width = pos.w + 'px';
      win.style.height = pos.h + 'px';

      // Set title
      win.querySelector('.window-title').textContent = APP_TITLES[appId] || appId;

      // Set content
      win.querySelector('.window-body').innerHTML = app.render();

      // Z-index
      win.style.zIndex = ++zCounter;
      win.classList.add('focused');

      container.appendChild(win);
      openWindows[appId] = win;

      // Wire controls
      this._bindControls(win, appId);
      this._makeDraggable(win);
      this._makeResizable(win);

      // Focus on click
      win.addEventListener('mousedown', () => this.focus(win), true);

      // Call afterMount if defined
      if (app.afterMount) {
        setTimeout(() => app.afterMount(win), 0);
      }

      // Update dock dot
      DockManager.setRunning(appId, true);

      return win;
    },

    close(appId) {
      const win = openWindows[appId];
      if (!win) return;
      win.classList.add('window-closing');
      win.addEventListener('animationend', () => {
        win.remove();
        delete openWindows[appId];
        delete minimizedWindows[appId];
        DockManager.setRunning(appId, false);
      }, { once: true });
    },

    minimize(appId) {
      const win = openWindows[appId];
      if (!win) return;
      minimizedWindows[appId] = true;
      win.classList.add('window-minimizing');
      win.addEventListener('animationend', () => {
        win.style.display = 'none';
        win.classList.remove('window-minimizing');
      }, { once: true });
    },

    restore(appId) {
      const win = openWindows[appId];
      if (!win) return;
      delete minimizedWindows[appId];
      win.style.display = 'flex';
      win.style.animation = 'none';
      win.offsetHeight;
      win.style.animation = '';
      win.classList.add('window-open-restore');
      this.focus(win);
    },

    maximize(appId) {
      const win = openWindows[appId];
      if (!win) return;
      if (win.classList.contains('maximized')) {
        // Restore
        const prev = win._prevState;
        if (prev) {
          win.style.left = prev.left;
          win.style.top = prev.top;
          win.style.width = prev.width;
          win.style.height = prev.height;
        }
        win.classList.remove('maximized');
        win.querySelector('.wc-maximize i').className = 'fa-solid fa-up-right-and-down-left-from-center';
      } else {
        // Save state
        win._prevState = {
          left: win.style.left,
          top: win.style.top,
          width: win.style.width,
          height: win.style.height
        };
        win.classList.add('maximized');
        win.querySelector('.wc-maximize i').className = 'fa-solid fa-down-left-and-up-right-to-center';
      }
    },

    focus(win) {
      document.querySelectorAll('.os-window.focused').forEach(w => w.classList.remove('focused'));
      win.classList.add('focused');
      win.style.zIndex = ++zCounter;
    },

    _bindControls(win, appId) {
      win.querySelector('.wc-close').addEventListener('click', e => {
        e.stopPropagation();
        this.close(appId);
      });
      win.querySelector('.wc-minimize').addEventListener('click', e => {
        e.stopPropagation();
        this.minimize(appId);
      });
      win.querySelector('.wc-maximize').addEventListener('click', e => {
        e.stopPropagation();
        this.maximize(appId);
      });

      // Double-click title bar to maximize
      win.querySelector('.window-titlebar').addEventListener('dblclick', () => {
        this.maximize(appId);
      });
    },

    _makeDraggable(win) {
      const titlebar = win.querySelector('.window-titlebar');
      let dragging = false, startX, startY, origLeft, origTop;

      titlebar.addEventListener('mousedown', e => {
        if (e.target.closest('.window-controls')) return;
        if (win.classList.contains('maximized')) return;
        dragging = true;
        startX = e.clientX;
        startY = e.clientY;
        origLeft = win.offsetLeft;
        origTop = win.offsetTop;
        win.style.userSelect = 'none';
        win.style.transition = 'none';
      });

      document.addEventListener('mousemove', e => {
        if (!dragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        const containerRect = container.getBoundingClientRect();
        const newLeft = Math.max(0, Math.min(origLeft + dx, containerRect.width - win.offsetWidth));
        const newTop = Math.max(0, Math.min(origTop + dy, containerRect.height - win.offsetHeight));
        win.style.left = newLeft + 'px';
        win.style.top = newTop + 'px';
      });

      document.addEventListener('mouseup', () => {
        if (dragging) {
          dragging = false;
          win.style.userSelect = '';
          win.style.transition = '';
        }
      });
    },

    _makeResizable(win) {
      const handles = {
        'resize-se': { dx: true, dy: true },
        'resize-e': { dx: true, dy: false },
        'resize-s': { dx: false, dy: true }
      };

      Object.entries(handles).forEach(([cls, config]) => {
        const handle = win.querySelector('.' + cls);
        if (!handle) return;
        let resizing = false, startX, startY, startW, startH;

        handle.addEventListener('mousedown', e => {
          e.preventDefault();
          e.stopPropagation();
          resizing = true;
          startX = e.clientX;
          startY = e.clientY;
          startW = win.offsetWidth;
          startH = win.offsetHeight;
          document.body.style.userSelect = 'none';
        });

        document.addEventListener('mousemove', e => {
          if (!resizing) return;
          if (config.dx) {
            const newW = Math.max(340, startW + (e.clientX - startX));
            win.style.width = newW + 'px';
          }
          if (config.dy) {
            const newH = Math.max(240, startH + (e.clientY - startY));
            win.style.height = newH + 'px';
          }
        });

        document.addEventListener('mouseup', () => {
          resizing = false;
          document.body.style.userSelect = '';
        });
      });
    }
  };
})();
