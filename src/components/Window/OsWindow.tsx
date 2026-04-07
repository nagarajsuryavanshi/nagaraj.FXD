'use client';

import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';
import { useWindowStore, type WindowState } from '@/store/windowStore';

interface Props {
  win: WindowState;
  children: React.ReactNode;
}

export default function OsWindow({ win, children }: Props) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition, updateSize } = useWindowStore();
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
  const resizeRef = useRef<{ startX: number; startY: number; startW: number; startH: number } | null>(null);

  const maxZ = useWindowStore(s => Math.max(...s.windows.map(w => w.zIndex)));
  const isFocused = win.zIndex === maxZ;

  const onTitleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    if (win.isMaximized) return;
    e.preventDefault();
    dragRef.current = { startX: e.clientX, startY: e.clientY, origX: win.x, origY: win.y };
    focusWindow(win.id);

    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current) return;
      const dx = ev.clientX - dragRef.current.startX;
      const dy = ev.clientY - dragRef.current.startY;
      updatePosition(win.id,
        Math.max(0, dragRef.current.origX + dx),
        Math.max(0, dragRef.current.origY + dy)
      );
    };
    const onUp = () => {
      dragRef.current = null;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [win, focusWindow, updatePosition]);

  const onResizeMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    resizeRef.current = { startX: e.clientX, startY: e.clientY, startW: win.width, startH: win.height };

    const onMove = (ev: MouseEvent) => {
      if (!resizeRef.current) return;
      updateSize(win.id,
        Math.max(340, resizeRef.current.startW + ev.clientX - resizeRef.current.startX),
        Math.max(240, resizeRef.current.startH + ev.clientY - resizeRef.current.startY)
      );
    };
    const onUp = () => {
      resizeRef.current = null;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [win, updateSize]);

  if (win.isMinimized) return null;

  const style = win.isMaximized
    ? { top: 0, left: 0, width: '100%', height: '100%', borderRadius: 0 }
    : { top: win.y, left: win.x, width: win.width, height: win.height };

  return (
    <motion.div
      className="absolute flex flex-col overflow-hidden pointer-events-auto glass border"
      style={{
        ...style,
        zIndex: win.zIndex,
        background: 'rgba(14,14,28,0.85)',
        borderColor: isFocused ? 'rgba(124,106,247,0.3)' : 'rgba(255,255,255,0.08)',
        borderRadius: win.isMaximized ? 0 : 14,
        boxShadow: isFocused
          ? '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,106,247,0.2)'
          : '0 20px 60px rgba(0,0,0,0.4)',
        minWidth: 340,
        minHeight: 240,
      }}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      onMouseDown={() => focusWindow(win.id)}
    >
      {/* Title Bar */}
      <div
        className="h-10 flex items-center px-3.5 gap-3 flex-shrink-0 border-b cursor-grab active:cursor-grabbing select-none"
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderColor: 'rgba(255,255,255,0.08)',
        }}
        onMouseDown={onTitleMouseDown}
        onDoubleClick={() => maximizeWindow(win.id)}
      >
        {/* Traffic lights */}
        <div className="flex gap-1.5" onMouseDown={e => e.stopPropagation()}>
          <button
            onClick={() => closeWindow(win.id)}
            className="w-3 h-3 rounded-full flex items-center justify-center group transition-all hover:scale-110"
            style={{ background: '#ff5f57' }}
            title="Close"
          >
            <X size={7} className="opacity-0 group-hover:opacity-60 text-black" />
          </button>
          <button
            onClick={() => minimizeWindow(win.id)}
            className="w-3 h-3 rounded-full flex items-center justify-center group transition-all hover:scale-110"
            style={{ background: '#febc2e' }}
            title="Minimize"
          >
            <Minus size={7} className="opacity-0 group-hover:opacity-60 text-black" />
          </button>
          <button
            onClick={() => maximizeWindow(win.id)}
            className="w-3 h-3 rounded-full flex items-center justify-center group transition-all hover:scale-110"
            style={{ background: '#28c840' }}
            title="Maximize"
          >
            {win.isMaximized
              ? <Minimize2 size={7} className="opacity-0 group-hover:opacity-60 text-black" />
              : <Maximize2 size={7} className="opacity-0 group-hover:opacity-60 text-black" />
            }
          </button>
        </div>

        <div className="flex-1 text-center text-[13px] font-semibold text-white/90 pointer-events-none">
          {win.title}
        </div>
        <div className="w-14" />
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {children}
      </div>

      {/* Resize handle */}
      {!win.isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize z-10"
          onMouseDown={onResizeMouseDown}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" className="absolute bottom-1 right-1 opacity-30">
            <path d="M9 1L1 9M9 5L5 9M9 9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      )}
    </motion.div>
  );
}
