/* ── Resume App ───────────────────────────────────────────── */
window.AppResume = {
  id: 'resume',
  title: 'Resume',
  icon: 'fa-solid fa-file-pdf',
  defaultSize: { width: 640, height: 620 },
  defaultPos: { x: 120, y: 30 },

  render() {
    return `
    <div class="app-content">
      <div class="resume-content">
        <div class="resume-header">
          <div>
            <h2>Nagaraj Suryavanshi</h2>
            <p>Full Stack Developer — Resume Preview</p>
          </div>
          <div class="resume-actions">
            <button class="btn-resume secondary" id="resume-print">
              <i class="fa-solid fa-print"></i> Print
            </button>
            <button class="btn-resume primary" id="resume-download">
              <i class="fa-solid fa-download"></i> Download PDF
            </button>
          </div>
        </div>

        <div class="resume-preview">
          <div class="resume-doc">
            <div class="rdoc-name">Nagaraj Suryavanshi</div>
            <div class="rdoc-role">Full Stack Developer</div>
            <div class="rdoc-contact">
              <span><i class="fa-solid fa-envelope"></i> nagaraj.suryavanshi@7edge.com</span>
              <span><i class="fa-brands fa-github"></i> github.com/nagarajsuryavanshi</span>
              <span><i class="fa-brands fa-linkedin"></i> linkedin.com/in/nagarajsuryavanshi</span>
              <span><i class="fa-solid fa-location-dot"></i> India</span>
            </div>
            <div class="rdoc-divider"></div>

            <div class="rdoc-section">
              <h3>Summary</h3>
              <p style="font-size:13px;color:var(--text-secondary);line-height:1.7">
                Full Stack Developer with 4+ years of experience building scalable web applications.
                Proficient in React, Node.js, and cloud infrastructure. Strong problem-solver with
                a passion for clean code and great user experiences.
              </p>
            </div>

            <div class="rdoc-section">
              <h3>Experience</h3>
              <div class="rdoc-entry">
                <div class="rdoc-entry-main">
                  <div class="rdoc-company">7Edge Technologies</div>
                  <div class="rdoc-position">Full Stack Developer</div>
                </div>
                <div class="rdoc-entry-side">Jan 2023 – Present</div>
              </div>
              <div class="rdoc-entry">
                <div class="rdoc-entry-main">
                  <div class="rdoc-company">Freelance</div>
                  <div class="rdoc-position">Full Stack Web Developer</div>
                </div>
                <div class="rdoc-entry-side">Jun 2021 – Dec 2022</div>
              </div>
              <div class="rdoc-entry">
                <div class="rdoc-entry-main">
                  <div class="rdoc-company">Tech Startup</div>
                  <div class="rdoc-position">Frontend Developer Intern</div>
                </div>
                <div class="rdoc-entry-side">Jan 2021 – May 2021</div>
              </div>
            </div>

            <div class="rdoc-section">
              <h3>Education</h3>
              <div class="rdoc-entry">
                <div class="rdoc-entry-main">
                  <div class="rdoc-company">B.Tech — Computer Science & Engineering</div>
                  <div class="rdoc-position">University — Graduated with Distinction</div>
                </div>
                <div class="rdoc-entry-side">2017 – 2021</div>
              </div>
            </div>

            <div class="rdoc-section">
              <h3>Technical Skills</h3>
              <div class="rdoc-skills-list">
                <span class="rdoc-skill">React</span>
                <span class="rdoc-skill">Next.js</span>
                <span class="rdoc-skill">Node.js</span>
                <span class="rdoc-skill">TypeScript</span>
                <span class="rdoc-skill">Python</span>
                <span class="rdoc-skill">MongoDB</span>
                <span class="rdoc-skill">PostgreSQL</span>
                <span class="rdoc-skill">Docker</span>
                <span class="rdoc-skill">AWS</span>
                <span class="rdoc-skill">Git</span>
                <span class="rdoc-skill">REST APIs</span>
                <span class="rdoc-skill">GraphQL</span>
                <span class="rdoc-skill">Redis</span>
                <span class="rdoc-skill">Tailwind CSS</span>
              </div>
            </div>

            <div class="rdoc-section">
              <h3>Notable Projects</h3>
              <div class="rdoc-entry">
                <div class="rdoc-entry-main">
                  <div class="rdoc-company">NexCart — E-Commerce Platform</div>
                  <div class="rdoc-position">React · Node.js · MongoDB · Stripe · Docker</div>
                </div>
              </div>
              <div class="rdoc-entry">
                <div class="rdoc-entry-main">
                  <div class="rdoc-company">TaskFlow — Project Management Tool</div>
                  <div class="rdoc-position">Next.js · TypeScript · PostgreSQL · Socket.io</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  },

  afterMount(windowEl) {
    windowEl.querySelector('#resume-download').addEventListener('click', () => {
      window.OS && window.OS.showToast('Resume PDF will be available soon!', 'fa-file-pdf');
    });

    windowEl.querySelector('#resume-print').addEventListener('click', () => {
      window.print();
    });
  }
};
