/* ── Dock Manager ─────────────────────────────────────────── */
(function() {
  'use strict';

  const dock = document.getElementById('dock');

  window.DockManager = {
    init() {
      dock.querySelectorAll('.dock-icon[data-app]').forEach(icon => {
        const appId = icon.dataset.app;

        icon.addEventListener('click', () => {
          this.launch(appId, icon);
        });

        // Magnification ripple effect on neighbors
        icon.addEventListener('mouseenter', () => {
          this._applyMagnification(icon);
        });

        icon.addEventListener('mouseleave', () => {
          this._resetMagnification();
        });
      });
    },

    launch(appId, iconEl) {
      // Bounce animation
      if (iconEl) {
        iconEl.classList.add('launching');
        iconEl.addEventListener('animationend', () => {
          iconEl.classList.remove('launching');
        }, { once: true });
      }

      if (appId === 'finder') {
        window.OS && window.OS.showToast('Finder — Welcome to Nagaraj OS!', 'fa-compass');
        return;
      }

      // If minimized, restore; else open or focus
      const existing = window.WindowManager.openWindows[appId];
      if (existing && existing.style.display === 'none') {
        window.WindowManager.restore(appId);
      } else {
        window.WindowManager.open(appId);
      }
    },

    setRunning(appId, running) {
      const icon = dock.querySelector(`.dock-icon[data-app="${appId}"]`);
      if (!icon) return;
      const dot = icon.querySelector('.dock-dot');
      if (dot) {
        if (running) dot.classList.remove('hidden');
        else dot.classList.add('hidden');
        icon.classList.toggle('running', running);
      }
    },

    _applyMagnification(hoveredIcon) {
      const allIcons = Array.from(dock.querySelectorAll('.dock-icon'));
      const idx = allIcons.indexOf(hoveredIcon);

      allIcons.forEach((icon, i) => {
        const dist = Math.abs(i - idx);
        if (dist === 0) return; // CSS handles hover
        if (dist === 1) {
          icon.style.transform = 'translateY(-8px) scale(1.12)';
        } else if (dist === 2) {
          icon.style.transform = 'translateY(-4px) scale(1.06)';
        } else {
          icon.style.transform = '';
        }
      });
    },

    _resetMagnification() {
      dock.querySelectorAll('.dock-icon').forEach(icon => {
        icon.style.transform = '';
      });
    }
  };
})();
