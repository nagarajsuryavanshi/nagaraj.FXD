/* ── Main App — Nagaraj OS ────────────────────────────────── */
(function() {
  'use strict';

  // ── Toast Notification System ──────────────────────────────
  const toastContainer = document.createElement('div');
  toastContainer.id = 'toast-container';
  document.body.appendChild(toastContainer);

  window.OS = {
    showToast(message, icon = 'fa-bell') {
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
      toastContainer.appendChild(toast);
      setTimeout(() => {
        toast.classList.add('toast-out');
        toast.addEventListener('animationend', () => toast.remove(), { once: true });
      }, 3000);
    }
  };

  // ── Particle Background ────────────────────────────────────
  function spawnParticles() {
    const colors = ['rgba(124,106,247,0.3)', 'rgba(232,121,249,0.25)', 'rgba(56,189,248,0.2)'];
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 4 + 2;
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}vw;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        animation-duration: ${Math.random() * 20 + 15}s;
        animation-delay: ${Math.random() * 10}s;
      `;
      document.body.appendChild(p);
    }
  }

  // ── Boot Sequence ──────────────────────────────────────────
  function boot() {
    const bootScreen = document.getElementById('boot-screen');
    const desktop = document.getElementById('desktop');

    // Wait for progress bar then fade out
    setTimeout(() => {
      bootScreen.classList.add('fade-out');
      bootScreen.addEventListener('transitionend', () => {
        bootScreen.remove();
        desktop.classList.remove('hidden');
        desktop.style.animation = 'desktop-fade-in 0.6s ease';
        spawnParticles();
        DockManager.init();
        showWelcomeToast();
      }, { once: true });
    }, 3000);
  }

  function showWelcomeToast() {
    setTimeout(() => {
      window.OS.showToast('Welcome to Nagaraj OS! Click any icon to explore.', 'fa-hand-wave');
    }, 600);
  }

  // ── Desktop Icon Clicks ────────────────────────────────────
  document.querySelectorAll('.desktop-icon[data-app]').forEach(icon => {
    let clickTimer = null;

    icon.addEventListener('click', () => {
      const appId = icon.dataset.app;
      icon.classList.add('active');
      icon.addEventListener('animationend', () => icon.classList.remove('active'), { once: true });

      // Debounce double-click
      if (clickTimer) {
        clearTimeout(clickTimer);
        clickTimer = null;
        window.WindowManager.open(appId);
      } else {
        clickTimer = setTimeout(() => {
          clickTimer = null;
          window.WindowManager.open(appId);
        }, 250);
      }
    });
  });

  // ── Keyboard Shortcuts ─────────────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey) {
      switch (e.key) {
        case '1': e.preventDefault(); window.WindowManager.open('about'); break;
        case '2': e.preventDefault(); window.WindowManager.open('projects'); break;
        case '3': e.preventDefault(); window.WindowManager.open('experience'); break;
        case '4': e.preventDefault(); window.WindowManager.open('contact'); break;
        case '5': e.preventDefault(); window.WindowManager.open('resume'); break;
        case 't': e.preventDefault(); document.getElementById('theme-toggle').click(); break;
        case 'w': {
          e.preventDefault();
          // Close the focused window
          const focused = document.querySelector('.os-window.focused');
          if (focused) window.WindowManager.close(focused.dataset.id);
          break;
        }
      }
    }
  });

  // ── Prevent default right-click on desktop ─────────────────
  // (handled in contextMenu.js)

  // ── Inject CSS animation for desktop fade-in ───────────────
  const style = document.createElement('style');
  style.textContent = `
    @keyframes desktop-fade-in {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes shake {
      0%,100% { transform: translateX(0); }
      20% { transform: translateX(-6px); }
      40% { transform: translateX(6px); }
      60% { transform: translateX(-4px); }
      80% { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(style);

  // ── Init ───────────────────────────────────────────────────
  boot();

})();
