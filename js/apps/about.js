/* ── About Me App ─────────────────────────────────────────── */
window.AppAbout = {
  id: 'about',
  title: 'About Me',
  icon: 'fa-solid fa-user',
  defaultSize: { width: 600, height: 560 },
  defaultPos: { x: 80, y: 40 },

  render() {
    return `
    <div class="app-content">
      <div class="about-header">
        <div class="about-avatar">NS</div>
        <div class="about-info">
          <h1>Nagaraj Suryavanshi</h1>
          <div class="role"><span style="color:var(--accent)">$</span> Full Stack Developer</div>
          <div class="location"><i class="fa-solid fa-location-dot" style="color:var(--accent)"></i> India</div>
        </div>
      </div>

      <div class="about-bio">
        I'm a passionate <span>Full Stack Developer</span> who crafts elegant,
        performant web applications from design to deployment. I love turning complex
        problems into <span>clean, intuitive interfaces</span>. When I'm not coding,
        I'm exploring new technologies, contributing to open source, and building
        products that make a difference. Currently open to exciting opportunities.
      </div>

      <div class="section-title">Technical Skills</div>
      <div class="skills-grid">
        <div class="skill-chip"><i class="fa-brands fa-react"></i> React</div>
        <div class="skill-chip"><i class="fa-brands fa-node-js"></i> Node.js</div>
        <div class="skill-chip"><i class="fa-brands fa-js"></i> JavaScript</div>
        <div class="skill-chip"><i class="fa-solid fa-database"></i> MongoDB</div>
        <div class="skill-chip"><i class="fa-solid fa-server"></i> Express</div>
        <div class="skill-chip"><i class="fa-brands fa-python"></i> Python</div>
        <div class="skill-chip"><i class="fa-brands fa-git-alt"></i> Git</div>
        <div class="skill-chip"><i class="fa-brands fa-docker"></i> Docker</div>
        <div class="skill-chip"><i class="fa-brands fa-aws"></i> AWS</div>
        <div class="skill-chip"><i class="fa-solid fa-wind" style="color:#38bdf8"></i> Tailwind</div>
        <div class="skill-chip"><i class="fa-solid fa-n" style="color:#fff"></i> Next.js</div>
        <div class="skill-chip"><i class="fa-solid fa-fire" style="color:#f97316"></i> Firebase</div>
      </div>

      <div style="margin-top:24px"></div>
      <div class="section-title">Beyond Code</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <div class="skill-chip"><i class="fa-solid fa-music"></i> Music</div>
        <div class="skill-chip"><i class="fa-solid fa-book"></i> Reading</div>
        <div class="skill-chip"><i class="fa-solid fa-chess"></i> Chess</div>
        <div class="skill-chip"><i class="fa-solid fa-terminal"></i> Open Source</div>
        <div class="skill-chip"><i class="fa-solid fa-camera"></i> Photography</div>
      </div>
    </div>`;
  }
};
