'use client';

import { motion } from 'framer-motion';

const SKILLS = [
  { name: 'React',     icon: '⚛️' }, { name: 'Next.js',   icon: '▲' },
  { name: 'Node.js',  icon: '🟢' }, { name: 'TypeScript', icon: '🔷' },
  { name: 'Python',   icon: '🐍' }, { name: 'MongoDB',    icon: '🍃' },
  { name: 'Docker',   icon: '🐋' }, { name: 'AWS',        icon: '☁️'  },
  { name: 'Git',      icon: '🌿' }, { name: 'Tailwind',   icon: '💨' },
  { name: 'Redis',    icon: '🔴' }, { name: 'GraphQL',    icon: '◈'  },
];

export default function AboutApp() {
  return (
    <div className="p-7">
      {/* Header */}
      <div className="flex items-center gap-6 mb-7">
        <motion.div
          className="w-[90px] h-[90px] rounded-full grad-bg flex items-center justify-center text-3xl font-bold text-white flex-shrink-0 border-2"
          style={{ borderColor: 'rgba(124,106,247,0.4)', boxShadow: '0 8px 30px rgba(124,106,247,0.35)' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          NS
        </motion.div>
        <div>
          <h1 className="text-2xl font-bold grad-text">Nagaraj Suryavanshi</h1>
          <p className="text-sm font-mono mt-1" style={{ color: 'rgba(240,240,255,0.55)' }}>
            <span style={{ color: '#7c6af7' }}>$</span> Full Stack Developer
          </p>
          <p className="text-xs mt-2 flex items-center gap-1.5" style={{ color: 'rgba(240,240,255,0.45)' }}>
            📍 India &nbsp;·&nbsp; Open to opportunities
          </p>
        </div>
      </div>

      {/* Bio */}
      <motion.div
        className="rounded-xl p-4 mb-7 text-sm leading-relaxed border"
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderColor: 'rgba(255,255,255,0.08)',
          color: 'rgba(240,240,255,0.6)',
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        I&apos;m a passionate{' '}
        <span style={{ color: '#f0f0ff', fontWeight: 600 }}>Full Stack Developer</span> who crafts elegant,
        performant web applications from design to deployment. I love turning complex problems into{' '}
        <span style={{ color: '#f0f0ff', fontWeight: 600 }}>clean, intuitive interfaces</span>.
        Currently building at <span style={{ color: '#7c6af7', fontWeight: 600 }}>7Edge Technologies</span>.
      </motion.div>

      {/* Skills */}
      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#7c6af7' }}>
        Technical Skills
      </p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-2.5 mb-7">
        {SKILLS.map((skill, i) => (
          <motion.div
            key={skill.name}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-colors cursor-default"
            style={{
              background: 'rgba(124,106,247,0.12)',
              borderColor: 'rgba(124,106,247,0.3)',
              color: '#f0f0ff',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * i }}
            whileHover={{ background: 'rgba(124,106,247,0.25)', y: -1 }}
          >
            <span>{skill.icon}</span> {skill.name}
          </motion.div>
        ))}
      </div>

      {/* Interests */}
      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#7c6af7' }}>
        Beyond Code
      </p>
      <div className="flex flex-wrap gap-2.5">
        {['🎵 Music', '📚 Reading', '♟️ Chess', '📸 Photography', '🌐 Open Source'].map(item => (
          <motion.span
            key={item}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border"
            style={{ background: 'rgba(124,106,247,0.12)', borderColor: 'rgba(124,106,247,0.3)', color: '#f0f0ff' }}
            whileHover={{ scale: 1.05 }}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
