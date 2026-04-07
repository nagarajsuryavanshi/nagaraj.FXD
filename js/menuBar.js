/* ── Menu Bar ─────────────────────────────────────────────── */
(function() {
  'use strict';

  const dateEl = document.getElementById('menu-date');
  const timeEl = document.getElementById('menu-time');
  const themeBtn = document.getElementById('theme-toggle');

  const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  function updateClock() {
    const now = new Date();
    const day = DAYS[now.getDay()];
    const month = MONTHS[now.getMonth()];
    const date = now.getDate();
    const h = now.getHours();
    const m = String(now.getMinutes()).padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    dateEl.textContent = `${day}, ${month} ${date}`;
    timeEl.textContent = `${h12}:${m} ${ampm}`;
  }

  updateClock();
  setInterval(updateClock, 1000);

  // Theme toggle
  let isDark = true;

  themeBtn.addEventListener('click', () => {
    isDark = !isDark;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeBtn.querySelector('i').className = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    window.OS && window.OS.showToast(isDark ? 'Dark mode enabled' : 'Light mode enabled',
      isDark ? 'fa-moon' : 'fa-sun');
  });

  // Menu item highlights (visual only)
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
      const menu = item.dataset.menu;
      if (menu === 'file') {
        window.OS && window.OS.showToast('Opening a new window...', 'fa-window-maximize');
        setTimeout(() => window.WindowManager.open('about'), 300);
      } else if (menu === 'view') {
        window.OS && window.OS.showToast('All windows visible', 'fa-eye');
      } else if (menu === 'help') {
        window.OS && window.OS.showToast('Built with ❤️ by Nagaraj', 'fa-heart');
      }
    });
  });
})();
