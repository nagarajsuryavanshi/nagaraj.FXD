'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink } from 'lucide-react';

const PROJECTS = [
  { id:1, name:'NexCart', emoji:'🛒', shortDesc:'Full-stack e-commerce with real-time inventory & Stripe payments.', desc:'A complete e-commerce solution with product management, cart, wishlist, order tracking, Stripe payments, admin dashboard, and real-time inventory updates via WebSockets.', tech:['React','Node.js','MongoDB','Stripe','Redis','Docker'], gradient:'linear-gradient(135deg,#7c6af7,#e879f9)' },
  { id:2, name:'TaskFlow', emoji:'📋', shortDesc:'Kanban project manager with real-time team collaboration.', desc:'A Trello-inspired project management app featuring drag-and-drop boards, team workspaces, real-time collaboration, comment threads, file attachments, and Slack integration.', tech:['Next.js','TypeScript','PostgreSQL','Socket.io','Tailwind'], gradient:'linear-gradient(135deg,#06b6d4,#3b82f6)' },
  { id:3, name:'CryptoVault', emoji:'📊', shortDesc:'Live crypto portfolio tracker with price alerts & analytics.', desc:'Real-time cryptocurrency portfolio tracker with price charts using D3.js, price alerts via WebSockets, portfolio analytics, profit/loss tracking, and CoinGecko API integration.', tech:['React','D3.js','WebSocket','CoinGecko','Zustand'], gradient:'linear-gradient(135deg,#f59e0b,#ef4444)' },
  { id:4, name:'DevBlog', emoji:'✍️', shortDesc:'Developer blog platform with MDX support and SEO.', desc:'A fast, SEO-optimized developer blog platform built with Next.js, MDX for rich content, syntax highlighting, reading time estimation, tag filtering, RSS feed, and sitemap generation.', tech:['Next.js','MDX','Tailwind','Vercel','Algolia'], gradient:'linear-gradient(135deg,#10b981,#059669)' },
  { id:5, name:'WeatherPulse', emoji:'🌤️', shortDesc:'Beautiful 7-day weather app with location detection.', desc:'A stunning weather application with animated conditions, 7-day forecast, hourly breakdown, UV index, air quality data, geolocation, and multiple city bookmarks.', tech:['React','OpenWeather','Chart.js','PWA'], gradient:'linear-gradient(135deg,#38bdf8,#818cf8)' },
  { id:6, name:'AICraft', emoji:'🤖', shortDesc:'AI-powered content generation with GPT-4 & templates.', desc:'An AI writing assistant powered by OpenAI GPT-4 with customizable tone templates, content rewriting, grammar correction, SEO suggestions, and export to PDF/DOCX.', tech:['Next.js','OpenAI','Prisma','PostgreSQL','Stripe'], gradient:'linear-gradient(135deg,#a78bfa,#f472b6)' },
];

export default function ProjectsApp() {
  const [selected, setSelected] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#7c6af7' }}>My Projects</p>
          <p className="text-xs" style={{ color: 'rgba(240,240,255,0.4)' }}>{PROJECTS.length} projects · Click to explore</p>
        </div>
        <a
          href="https://github.com/nagarajsuryavanshi"
          target="_blank"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border text-white/80 hover:text-white transition-colors"
          style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <Github size={13} /> View on GitHub
        </a>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.id}
            className="rounded-xl overflow-hidden border cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -4, borderColor: 'rgba(124,106,247,0.4)', boxShadow: '0 12px 40px rgba(0,0,0,0.3)' }}
            onClick={() => setSelected(p)}
          >
            <div className="h-36 flex items-center justify-center text-5xl" style={{ background: p.gradient }}>
              {p.emoji}
            </div>
            <div className="p-3.5">
              <h3 className="text-sm font-semibold mb-1.5 text-white">{p.name}</h3>
              <p className="text-xs leading-relaxed mb-2.5" style={{ color: 'rgba(240,240,255,0.5)' }}>{p.shortDesc}</p>
              <div className="flex flex-wrap gap-1">
                {p.tech.slice(0,3).map(t => (
                  <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded border uppercase tracking-wider"
                    style={{ background: 'rgba(124,106,247,0.15)', color: '#7c6af7', borderColor: 'rgba(124,106,247,0.3)' }}>
                    {t}
                  </span>
                ))}
                {p.tech.length > 3 && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded border uppercase tracking-wider"
                    style={{ background: 'rgba(124,106,247,0.15)', color: '#7c6af7', borderColor: 'rgba(124,106,247,0.3)' }}>
                    +{p.tech.length - 3}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="rounded-2xl overflow-hidden border"
              style={{
                width: 'min(500px, 90%)',
                maxHeight: '80%',
                overflowY: 'auto',
                background: 'rgba(14,14,28,0.95)',
                borderColor: 'rgba(255,255,255,0.1)',
              }}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="h-44 flex items-center justify-center text-6xl relative" style={{ background: selected.gradient }}>
                {selected.emoji}
                <button
                  className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors"
                  style={{ background: 'rgba(0,0,0,0.4)' }}
                  onClick={() => setSelected(null)}
                >
                  <X size={14} />
                </button>
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold text-white mb-3">{selected.name}</h2>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {selected.tech.map(t => (
                    <span key={t} className="text-[11px] font-semibold px-2 py-0.5 rounded border uppercase tracking-wider"
                      style={{ background: 'rgba(124,106,247,0.15)', color: '#7c6af7', borderColor: 'rgba(124,106,247,0.3)' }}>
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(240,240,255,0.6)' }}>{selected.desc}</p>
                <div className="flex gap-2.5">
                  <a
                    href="https://github.com/nagarajsuryavanshi"
                    target="_blank"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-80 grad-bg"
                  >
                    <Github size={14} /> GitHub
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition-colors"
                    style={{ color: '#7c6af7', borderColor: '#7c6af7' }}
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
