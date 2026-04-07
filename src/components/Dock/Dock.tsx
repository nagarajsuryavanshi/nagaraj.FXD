'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, FolderOpen, Briefcase, Mail, FileText, Compass } from 'lucide-react';
import { useWindowStore, type AppId } from '@/store/windowStore';

const DOCK_ITEMS = [
  { id: 'about' as AppId,      label: 'About Me',   Icon: User,       color: '#7c6af7' },
  { id: 'projects' as AppId,   label: 'Projects',   Icon: FolderOpen, color: '#e879f9' },
  { id: 'experience' as AppId, label: 'Experience', Icon: Briefcase,  color: '#38bdf8' },
  { id: 'contact' as AppId,    label: 'Contact',    Icon: Mail,       color: '#fb923c' },
  { id: 'resume' as AppId,     label: 'Resume',     Icon: FileText,   color: '#4ade80' },
  null, // separator
  { id: 'finder' as any,       label: 'Finder',     Icon: Compass,    color: '#a78bfa' },
];

export default function Dock() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { windows, openWindow } = useWindowStore(s => ({ windows: s.windows, openWindow: s.openWindow }));

  const isRunning = (id: string) => windows.some(w => w.id === id);

  function getScale(idx: number) {
    if (hoveredIdx === null) return 1;
    const dist = Math.abs(idx - hoveredIdx);
    if (dist === 0) return 1.4;
    if (dist === 1) return 1.2;
    if (dist === 2) return 1.08;
    return 1;
  }

  function getTranslateY(idx: number) {
    if (hoveredIdx === null) return 0;
    const dist = Math.abs(idx - hoveredIdx);
    if (dist === 0) return -16;
    if (dist === 1) return -8;
    if (dist === 2) return -4;
    return 0;
  }

  return (
    <div className="fixed bottom-2.5 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        className="flex items-end gap-2 px-4 py-2.5 rounded-[22px] glass border"
        style={{
          background: 'rgba(20,20,40,0.55)',
          borderColor: 'rgba(255,255,255,0.12)',
          boxShadow: '0 16px 50px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)',
        }}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 24 }}
      >
        {DOCK_ITEMS.map((item, i) => {
          if (!item) {
            return (
              <div
                key="sep"
                className="w-px h-12 self-center mx-1"
                style={{ background: 'rgba(255,255,255,0.12)' }}
              />
            );
          }

          return (
            <div
              key={item.id}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Tooltip */}
              <AnimatePresence>
                {hoveredIdx === i && (
                  <motion.div
                    className="absolute bottom-full mb-2.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white whitespace-nowrap glass border"
                    style={{
                      background: 'rgba(20,20,40,0.92)',
                      borderColor: 'rgba(255,255,255,0.12)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                    }}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.12 }}
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Icon */}
              <motion.button
                className="w-13 h-13 rounded-2xl flex items-center justify-center border"
                style={{
                  width: 52,
                  height: 52,
                  background: `${item.color}22`,
                  borderColor: `${item.color}33`,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                }}
                animate={{
                  scale: getScale(i),
                  y: getTranslateY(i),
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => item.id !== 'finder' && openWindow(item.id)}
              >
                <item.Icon size={22} color={item.color} />
              </motion.button>

              {/* Running dot */}
              {isRunning(item.id) && (
                <motion.div
                  className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full"
                  style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                />
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
