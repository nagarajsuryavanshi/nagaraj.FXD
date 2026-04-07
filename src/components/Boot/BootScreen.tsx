'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { onComplete: () => void; }

export default function BootScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const steps = [
      { target: 45, delay: 400 },
      { target: 70, delay: 900 },
      { target: 90, delay: 1600 },
      { target: 100, delay: 2400 },
    ];

    steps.forEach(({ target, delay }) => {
      setTimeout(() => setProgress(target), delay);
    });

    setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 800);
    }, 3000);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: '#050510' }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <div className="flex flex-col items-center gap-5">
            {/* Logo */}
            <div className="relative w-24 h-24">
              <div className="absolute inset-5 rounded-full grad-bg flex items-center justify-center text-white font-bold text-xl z-10 shadow-[0_0_30px_rgba(124,106,247,0.5)]">
                NS
              </div>
              {/* Spinning rings */}
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border-2 border-transparent"
                  style={{
                    inset: `${i * 8}px`,
                    borderTopColor: i === 0 ? '#7c6af7' : i === 1 ? '#e879f9' : 'rgba(124,106,247,0.4)',
                    borderRightColor: i === 1 ? '#e879f9' : 'transparent',
                    borderBottomColor: i === 2 ? 'rgba(124,106,247,0.4)' : 'transparent',
                  }}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 1.2 - i * 0.15, repeat: Infinity, ease: 'linear' }}
                />
              ))}
            </div>

            {/* Name */}
            <motion.h1
              className="text-3xl font-bold grad-text tracking-widest"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Nagaraj OS
            </motion.h1>

            <motion.p
              className="text-sm font-mono tracking-widest"
              style={{ color: 'rgba(255,255,255,0.4)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Loading portfolio...
            </motion.p>

            {/* Progress bar */}
            <div className="w-52 h-[3px] rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <motion.div
                className="h-full rounded-full grad-bg"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
