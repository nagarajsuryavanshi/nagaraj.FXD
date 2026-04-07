/* ── Context Menu ─────────────────────────────────────────── */
(function() {
  'use strict';

  const menu = document.getElementById('context-menu');
  const desktop = document.getElementById('desktop');

  function show(x, y) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    menu.classList.remove('hidden');
    const mw = menu.offsetWidth || 200;
    const mh = menu.offsetHeight || 180;
    menu.style.left = Math.min(x, vw - mw - 8) + 'px';
    menu.style.top = Math.min(y, vh - mh - 8) + 'px';
  }

  function hide() {
    menu.classList.add('hidden');
  }

  desktop.addEventListener('contextmenu', e => {
    // Don't show on windows
    if (e.target.closest('.os-window') || e.target.closest('#dock') || e.target.closest('#menu-bar')) return;
    e.preventDefault();
    show(e.clientX, e.clientY);
  });

  document.addEventListener('click', e => {
    if (!menu.contains(e.target)) hide();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') hide();
  });

  menu.querySelectorAll('li[data-action]').forEach(item => {
    item.addEventListener('click', () => {
      const action = item.dataset.action;
      hide();
      switch (action) {
        case 'new-window':
          window.WindowManager.open('about');
          break;
        case 'about':
          window.WindowManager.open('about');
          break;
        case 'theme':
          document.getElementById('theme-toggle').click();
          break;
        case 'refresh':
          window.OS && window.OS.showToast('Desktop refreshed!', 'fa-rotate-right');
          break;
      }
    });
  });
})();
