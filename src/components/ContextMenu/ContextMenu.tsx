'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, User, Palette, RotateCcw } from 'lucide-react';
import { useWindowStore } from '@/store/windowStore';

export default function ContextMenu() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const openWindow = useWindowStore(s => s.openWindow);

  const hide = useCallback(() => setPos(null), []);

  useEffect(() => {
    const onCtx = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-no-ctx]')) return;
      e.preventDefault();
      setPos({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener('contextmenu', onCtx);
    document.addEventListener('click', hide);
    document.addEventListener('keydown', (e) => e.key === 'Escape' && hide());
    return () => {
      document.removeEventListener('contextmenu', onCtx);
      document.removeEventListener('click', hide);
    };
  }, [hide]);

  const actions = [
    { icon: Maximize2, label: 'New Window',     action: () => openWindow('about') },
    { icon: User,      label: 'About Me',        action: () => openWindow('about') },
    { icon: Palette,   label: 'Change Theme',    action: () => {} },
    null,
    { icon: RotateCcw, label: 'Refresh Desktop', action: () => {} },
  ];

  return (
    <AnimatePresence>
      {pos && (
        <motion.div
          className="fixed z-[5000] rounded-xl overflow-hidden glass border min-w-[200px]"
          style={{
            top: Math.min(pos.y, window.innerHeight - 200),
            left: Math.min(pos.x, window.innerWidth - 210),
            background: 'rgba(20,20,40,0.92)',
            borderColor: 'rgba(255,255,255,0.1)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          data-no-ctx
        >
          <ul className="py-1.5">
            {actions.map((item, i) => {
              if (!item) return (
                <li key={i} className="h-px mx-2 my-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
              );
              return (
                <li
                  key={i}
                  className="flex items-center gap-2.5 px-4 py-2 text-[13px] text-white/90 cursor-pointer transition-colors hover:bg-[#7c6af7]/20"
                  onClick={() => { item.action(); hide(); }}
                >
                  <item.icon size={14} style={{ color: '#7c6af7' }} />
                  {item.label}
                </li>
              );
            })}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
