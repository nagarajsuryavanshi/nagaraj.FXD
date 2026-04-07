'use client';

import { motion } from 'framer-motion';

const EXPERIENCES = [
  {
    company: '7Edge Technologies',
    role: 'Full Stack Developer',
    duration: 'Jan 2023 – Present',
    type: 'work',
    color: '#7c6af7',
    bullets: [
      'Built and maintained scalable React + Node.js applications serving 50k+ users',
      'Architected microservices backend reducing API response time by 40%',
      'Led front-end optimization achieving 95+ Lighthouse scores',
      'Mentored 3 junior developers and established coding standards',
    ],
    tech: ['React', 'Node.js', 'AWS', 'PostgreSQL', 'Docker'],
  },
  {
    company: 'Freelance / Self-Employed',
    role: 'Full Stack Web Developer',
    duration: 'Jun 2021 – Dec 2022',
    type: 'work',
    color: '#38bdf8',
    bullets: [
      'Delivered 20+ client projects across e-commerce, SaaS, and portfolios',
      'Developed custom WordPress plugins and headless CMS solutions',
      'Built payment-integrated web apps using Stripe and Razorpay',
      'Maintained 100% client satisfaction rate with repeat engagements',
    ],
    tech: ['React', 'Next.js', 'MongoDB', 'Stripe', 'Firebase'],
  },
  {
    company: 'Tech Startup',
    role: 'Frontend Developer Intern',
    duration: 'Jan 2021 – May 2021',
    type: 'work',
    color: '#4ade80',
    bullets: [
      'Developed responsive UI components using React and styled-components',
      'Integrated REST APIs and managed state with Redux Toolkit',
      'Participated in Agile ceremonies and code reviews',
      'Improved app bundle size by 28% through code splitting',
    ],
    tech: ['React', 'Redux', 'REST API', 'Agile'],
  },
  {
    company: 'University',
    role: 'B.Tech — Computer Science & Engineering',
    duration: '2017 – 2021',
    type: 'edu',
    color: '#e879f9',
    bullets: [
      'Graduated with distinction',
      'Specialized in web technologies, algorithms, and database systems',
      'Built award-winning projects at hackathons and technical festivals',
    ],
    tech: [],
  },
];

export default function ExperienceApp() {
  return (
    <div className="p-7">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#7c6af7' }}>
            Work Experience
          </p>
          <p className="text-xs" style={{ color: 'rgba(240,240,255,0.4)' }}>My professional journey</p>
        </div>
        <div
          className="text-xs font-mono px-3 py-1.5 rounded-lg border"
          style={{
            color: 'rgba(240,240,255,0.5)',
            background: 'rgba(255,255,255,0.04)',
            borderColor: 'rgba(255,255,255,0.08)',
          }}
        >
          📅 2017 → Present
        </div>
      </div>

      <div className="relative pl-8">
        {/* Timeline line */}
        <div
          className="absolute left-2.5 top-2 bottom-2 w-0.5 rounded"
          style={{ background: 'linear-gradient(to bottom, #7c6af7, #e879f9, transparent)' }}
        />

        {EXPERIENCES.map((exp, i) => (
          <motion.div
            key={i}
            className="relative mb-6 last:mb-0"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            {/* Dot */}
            <div
              className="absolute -left-[22px] top-3 w-3 h-3 rounded-full border-2"
              style={{
                background: exp.color,
                borderColor: 'rgba(14,14,28,0.85)',
                boxShadow: `0 0 10px ${exp.color}88`,
              }}
            />

            {/* Card */}
            <motion.div
              className="rounded-xl p-4 border"
              style={{
                background: 'rgba(255,255,255,0.04)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
              whileHover={{ borderColor: `${exp.color}44`, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
            >
              <div className="flex justify-between items-start gap-3 mb-1.5">
                <div>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: exp.color }}>
                    {exp.type === 'edu' ? '🎓 ' : '🏢 '}
                    {exp.company}
                  </p>
                  <h3 className="text-[15px] font-bold text-white">{exp.role}</h3>
                </div>
                <span
                  className="text-[11px] font-mono px-2.5 py-1 rounded-full border flex-shrink-0"
                  style={{
                    color: 'rgba(240,240,255,0.5)',
                    background: 'rgba(124,106,247,0.1)',
                    borderColor: 'rgba(124,106,247,0.25)',
                  }}
                >
                  {exp.duration}
                </span>
              </div>

              <ul className="text-xs leading-relaxed mb-3 space-y-1" style={{ color: 'rgba(240,240,255,0.6)' }}>
                {exp.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2">
                    <span style={{ color: exp.color }}>›</span> {b}
                  </li>
                ))}
              </ul>

              {exp.tech.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {exp.tech.map(t => (
                    <span
                      key={t}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded border uppercase tracking-wider"
                      style={{
                        background: 'rgba(124,106,247,0.12)',
                        color: '#7c6af7',
                        borderColor: 'rgba(124,106,247,0.28)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
