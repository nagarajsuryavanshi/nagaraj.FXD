'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import MenuBar from '@/components/MenuBar/MenuBar';
import DesktopIcons from '@/components/Desktop/DesktopIcons';
import WindowManager from '@/components/Window/WindowManager';
import Dock from '@/components/Dock/Dock';
import ContextMenu from '@/components/ContextMenu/ContextMenu';
import Particles from '@/components/Desktop/Particles';

export default function Desktop() {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 20% 80%, #0f0c29 0%, #302b63 40%, #24243e 100%)'
      }}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Particles />
      <MenuBar />
      <div className="flex-1 relative overflow-hidden">
        <DesktopIcons />
        <WindowManager />
      </div>
      <Dock />
      <ContextMenu />
    </motion.div>
  );
}
