'use client';

import { motion } from 'framer-motion';
import { Download, Printer } from 'lucide-react';

export default function ResumeApp() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-start gap-3 mb-5">
        <div>
          <h2 className="text-xl font-bold text-white">Nagaraj Suryavanshi</h2>
          <p className="text-sm mt-1" style={{ color: 'rgba(240,240,255,0.45)' }}>Full Stack Developer — Resume Preview</p>
        </div>
        <div className="flex gap-2">
          <motion.button
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-colors"
            style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.12)', color: '#f0f0ff' }}
            whileHover={{ background: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.print()}
          >
            <Printer size={13} /> Print
          </motion.button>
          <motion.button
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold text-white grad-bg"
            style={{ boxShadow: '0 4px 16px rgba(124,106,247,0.35)' }}
            whileHover={{ opacity: 0.88, y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            <Download size={13} /> Download PDF
          </motion.button>
        </div>
      </div>

      {/* Resume doc */}
      <motion.div
        className="rounded-xl border overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="p-8">
          {/* Name block */}
          <h1 className="text-2xl font-bold text-white">Nagaraj Suryavanshi</h1>
          <p className="text-sm font-medium mt-1" style={{ color: '#7c6af7' }}>Full Stack Developer</p>
          <div className="flex flex-wrap gap-4 mt-3 text-xs font-mono" style={{ color: 'rgba(240,240,255,0.45)' }}>
            <span>✉ nagaraj.suryavanshi@7edge.com</span>
            <span>🐙 github.com/nagarajsuryavanshi</span>
            <span>💼 linkedin.com/in/nagarajsuryavanshi</span>
            <span>📍 India</span>
          </div>
          <div className="h-px mt-5 mb-5" style={{ background: 'rgba(255,255,255,0.08)' }} />

          {/* Summary */}
          <Section title="Summary">
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,240,255,0.6)' }}>
              Full Stack Developer with 4+ years of experience building scalable web applications.
              Proficient in React, Node.js, and cloud infrastructure. Strong problem-solver with
              a passion for clean code and great user experiences.
            </p>
          </Section>

          {/* Experience */}
          <Section title="Experience">
            <Entry company="7Edge Technologies" role="Full Stack Developer" date="Jan 2023 – Present" />
            <Entry company="Freelance" role="Full Stack Web Developer" date="Jun 2021 – Dec 2022" />
            <Entry company="Tech Startup" role="Frontend Developer Intern" date="Jan – May 2021" />
          </Section>

          {/* Education */}
          <Section title="Education">
            <Entry
              company="B.Tech — Computer Science & Engineering"
              role="University — Graduated with Distinction"
              date="2017 – 2021"
            />
          </Section>

          {/* Skills */}
          <Section title="Technical Skills">
            <div className="flex flex-wrap gap-2">
              {['React','Next.js','Node.js','TypeScript','Python','MongoDB','PostgreSQL','Docker','AWS','Git','REST APIs','GraphQL','Redis','Tailwind CSS'].map(s => (
                <span key={s} className="text-xs px-2.5 py-1 rounded border"
                  style={{ background: 'rgba(124,106,247,0.12)', borderColor: 'rgba(124,106,247,0.28)', color: '#f0f0ff' }}>
                  {s}
                </span>
              ))}
            </div>
          </Section>

          {/* Projects */}
          <Section title="Notable Projects">
            <Entry company="NexCart — E-Commerce Platform" role="React · Node.js · MongoDB · Stripe · Docker" date="" />
            <Entry company="TaskFlow — Project Management" role="Next.js · TypeScript · PostgreSQL · Socket.io" date="" />
            <Entry company="AICraft — AI Writing Tool" role="Next.js · OpenAI GPT-4 · Prisma · PostgreSQL" date="" />
          </Section>
        </div>
      </motion.div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#7c6af7' }}>{title}</h3>
        <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
      </div>
      {children}
    </div>
  );
}

function Entry({ company, role, date }: { company: string; role: string; date: string }) {
  return (
    <div className="flex justify-between gap-4 mb-3 last:mb-0">
      <div>
        <p className="text-sm font-semibold text-white">{company}</p>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(240,240,255,0.5)' }}>{role}</p>
      </div>
      {date && (
        <span className="text-xs font-mono flex-shrink-0 mt-0.5" style={{ color: 'rgba(240,240,255,0.4)' }}>{date}</span>
      )}
    </div>
  );
}
