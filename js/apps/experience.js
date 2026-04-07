/* ── Experience App ───────────────────────────────────────── */
window.AppExperience = {
  id: 'experience',
  title: 'Experience',
  icon: 'fa-solid fa-briefcase',
  defaultSize: { width: 620, height: 580 },
  defaultPos: { x: 200, y: 50 },

  render() {
    return `
    <div class="app-content">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
        <div>
          <div class="section-title" style="margin-bottom:2px">Work Experience</div>
          <p style="font-size:12px;color:var(--text-secondary)">My professional journey</p>
        </div>
        <div style="font-size:12px;color:var(--text-secondary);font-family:'JetBrains Mono',monospace;background:var(--card-bg);padding:6px 12px;border-radius:8px;border:1px solid var(--border-soft)">
          <i class="fa-solid fa-calendar" style="color:var(--accent);margin-right:6px"></i>2020 → Present
        </div>
      </div>

      <div class="timeline">
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-card">
            <div class="tl-header">
              <div>
                <div class="tl-company">
                  <i class="fa-solid fa-building" style="margin-right:6px;font-size:11px"></i>
                  7Edge Technologies
                </div>
                <div class="tl-title">Full Stack Developer</div>
              </div>
              <div class="tl-duration">Jan 2023 – Present</div>
            </div>
            <div class="tl-desc">
              <ul>
                <li>Built and maintained scalable React + Node.js applications serving 50k+ users</li>
                <li>Architected microservices-based backend reducing API response time by 40%</li>
                <li>Led front-end performance optimization achieving 95+ Lighthouse scores</li>
                <li>Mentored 3 junior developers and established coding standards</li>
              </ul>
            </div>
            <div class="project-tags" style="margin-top:10px">
              <span class="tag">React</span>
              <span class="tag">Node.js</span>
              <span class="tag">AWS</span>
              <span class="tag">PostgreSQL</span>
              <span class="tag">Docker</span>
            </div>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-card">
            <div class="tl-header">
              <div>
                <div class="tl-company">
                  <i class="fa-solid fa-building" style="margin-right:6px;font-size:11px"></i>
                  Freelance / Self-Employed
                </div>
                <div class="tl-title">Full Stack Web Developer</div>
              </div>
              <div class="tl-duration">Jun 2021 – Dec 2022</div>
            </div>
            <div class="tl-desc">
              <ul>
                <li>Delivered 20+ client projects across e-commerce, SaaS, and portfolios</li>
                <li>Developed custom WordPress plugins and headless CMS solutions</li>
                <li>Built payment-integrated web apps using Stripe and Razorpay</li>
                <li>Maintained 100% client satisfaction rate with repeat engagements</li>
              </ul>
            </div>
            <div class="project-tags" style="margin-top:10px">
              <span class="tag">React</span>
              <span class="tag">Next.js</span>
              <span class="tag">MongoDB</span>
              <span class="tag">Stripe</span>
              <span class="tag">Firebase</span>
            </div>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-card">
            <div class="tl-header">
              <div>
                <div class="tl-company">
                  <i class="fa-solid fa-building" style="margin-right:6px;font-size:11px"></i>
                  Tech Startup (Internship)
                </div>
                <div class="tl-title">Frontend Developer Intern</div>
              </div>
              <div class="tl-duration">Jan 2021 – May 2021</div>
            </div>
            <div class="tl-desc">
              <ul>
                <li>Developed responsive UI components using React and styled-components</li>
                <li>Integrated REST APIs and managed state with Redux Toolkit</li>
                <li>Participated in Agile ceremonies and code reviews</li>
                <li>Improved app bundle size by 28% through code splitting</li>
              </ul>
            </div>
            <div class="project-tags" style="margin-top:10px">
              <span class="tag">React</span>
              <span class="tag">Redux</span>
              <span class="tag">REST API</span>
              <span class="tag">Agile</span>
            </div>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-dot" style="background:var(--accent-2);box-shadow:0 0 10px rgba(232,121,249,0.5)"></div>
          <div class="timeline-card" style="border-color:rgba(232,121,249,0.2)">
            <div class="tl-header">
              <div>
                <div class="tl-company" style="color:var(--accent-2)">
                  <i class="fa-solid fa-graduation-cap" style="margin-right:6px;font-size:11px"></i>
                  University
                </div>
                <div class="tl-title">B.Tech — Computer Science & Engineering</div>
              </div>
              <div class="tl-duration">2017 – 2021</div>
            </div>
            <div class="tl-desc">
              Graduated with distinction. Specialized in web technologies, algorithms, and database systems.
              Built several award-winning projects during hackathons and technical festivals.
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }
};
