'use client';

import { motion } from 'framer-motion';
import { User, FolderOpen, Briefcase, Mail, FileText } from 'lucide-react';
import { useWindowStore, type AppId } from '@/store/windowStore';

const ICONS = [
  { id: 'about' as AppId,      label: 'About Me',    Icon: User,       color: '#7c6af7' },
  { id: 'projects' as AppId,   label: 'Projects',    Icon: FolderOpen, color: '#e879f9' },
  { id: 'experience' as AppId, label: 'Experience',  Icon: Briefcase,  color: '#38bdf8' },
  { id: 'contact' as AppId,    label: 'Contact',     Icon: Mail,       color: '#fb923c' },
  { id: 'resume' as AppId,     label: 'Resume',      Icon: FileText,   color: '#4ade80' },
];

export default function DesktopIcons() {
  const openWindow = useWindowStore(s => s.openWindow);

  return (
    <div className="absolute top-4 right-6 flex flex-col gap-5 z-10">
      {ICONS.map((item, i) => (
        <motion.div
          key={item.id}
          className="flex flex-col items-center gap-1.5 cursor-pointer w-[74px] select-none"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          whileHover={{ y: -3 }}
          onDoubleClick={() => openWindow(item.id)}
          onClick={() => openWindow(item.id)}
        >
          <motion.div
            className="w-14 h-14 rounded-2xl flex items-center justify-center glass shadow-lg border"
            style={{
              background: `${item.color}22`,
              borderColor: `${item.color}44`,
            }}
            whileHover={{
              background: `${item.color}44`,
              boxShadow: `0 8px 30px ${item.color}55`,
            }}
            whileTap={{ scale: 0.92 }}
          >
            <item.Icon size={24} color={item.color} />
          </motion.div>
          <span
            className="text-[11px] font-medium text-center px-1.5 py-0.5 rounded"
            style={{
              color: 'white',
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(4px)',
              textShadow: '0 1px 3px rgba(0,0,0,0.8)',
              whiteSpace: 'nowrap',
            }}
          >
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
