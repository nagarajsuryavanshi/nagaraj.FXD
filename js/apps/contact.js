/* ── Contact App ──────────────────────────────────────────── */
window.AppContact = {
  id: 'contact',
  title: 'Contact',
  icon: 'fa-solid fa-envelope',
  defaultSize: { width: 540, height: 580 },
  defaultPos: { x: 160, y: 70 },

  render() {
    return `
    <div class="app-content">
      <div style="margin-bottom:24px">
        <div class="section-title" style="margin-bottom:6px">Get In Touch</div>
        <p style="font-size:13px;color:var(--text-secondary);line-height:1.7">
          Have a project in mind, a question, or just want to say hi?
          I'd love to hear from you. My inbox is always open.
        </p>
      </div>

      <div class="contact-form" id="contact-form-inner">
        <div class="form-group">
          <label>Your Name</label>
          <input type="text" id="contact-name" placeholder="John Doe" autocomplete="off" />
        </div>
        <div class="form-group">
          <label>Email Address</label>
          <input type="email" id="contact-email" placeholder="john@example.com" autocomplete="off" />
        </div>
        <div class="form-group">
          <label>Subject</label>
          <input type="text" id="contact-subject" placeholder="Project Inquiry" autocomplete="off" />
        </div>
        <div class="form-group">
          <label>Message</label>
          <textarea id="contact-message" placeholder="Tell me about your project or just say hello..."></textarea>
        </div>
        <button class="btn-submit" id="contact-submit">
          <i class="fa-solid fa-paper-plane"></i> Send Message
        </button>
      </div>

      <div style="margin-top:28px">
        <div class="section-title" style="margin-bottom:12px">Connect With Me</div>
        <div class="social-links">
          <a href="https://github.com/nagarajsuryavanshi" target="_blank" class="social-link">
            <i class="fa-brands fa-github"></i> GitHub
          </a>
          <a href="https://linkedin.com/in/nagarajsuryavanshi" target="_blank" class="social-link">
            <i class="fa-brands fa-linkedin"></i> LinkedIn
          </a>
          <a href="mailto:nagaraj.suryavanshi@7edge.com" class="social-link">
            <i class="fa-solid fa-envelope"></i> Email
          </a>
        </div>
      </div>

      <div style="margin-top:20px;padding:14px;background:var(--card-bg);border-radius:10px;border:1px solid var(--border-soft)">
        <div style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:8px">
          <i class="fa-solid fa-clock" style="color:var(--accent)"></i>
          Usually responds within <strong style="color:var(--text-primary)">&nbsp;24 hours</strong>
        </div>
      </div>
    </div>`;
  },

  afterMount(windowEl) {
    const form = windowEl.querySelector('#contact-form-inner');
    const btn = windowEl.querySelector('#contact-submit');

    btn.addEventListener('click', () => {
      const name = windowEl.querySelector('#contact-name').value.trim();
      const email = windowEl.querySelector('#contact-email').value.trim();
      const msg = windowEl.querySelector('#contact-message').value.trim();

      if (!name || !email || !msg) {
        // Shake the empty fields
        windowEl.querySelectorAll('input, textarea').forEach(el => {
          if (!el.value.trim()) {
            el.style.borderColor = '#ff5f57';
            el.style.animation = 'none';
            el.offsetHeight;
            el.style.animation = 'shake 0.4s ease';
          }
        });
        return;
      }

      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;

      setTimeout(() => {
        form.innerHTML = `
          <div class="form-success">
            <i class="fa-solid fa-circle-check"></i>
            <h3>Message Sent!</h3>
            <p>Thanks, <strong>${name}</strong>! I'll get back to you at <strong>${email}</strong> within 24 hours.</p>
          </div>`;
        window.OS && window.OS.showToast('Message sent successfully!', 'fa-circle-check');
      }, 1500);
    });
  }
};
