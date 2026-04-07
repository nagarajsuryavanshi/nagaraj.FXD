'use client';

import { useEffect, useRef } from 'react';

export default function Particles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const colors = ['rgba(124,106,247,0.3)', 'rgba(232,121,249,0.25)', 'rgba(56,189,248,0.2)'];

    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 4 + 2;
      Object.assign(p.style, {
        position: 'absolute',
        borderRadius: '50%',
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        background: colors[Math.floor(Math.random() * colors.length)],
        animation: `float ${Math.random() * 20 + 15}s linear ${Math.random() * 10}s infinite`,
        pointerEvents: 'none',
      });
      container.appendChild(p);
    }
    return () => { container.innerHTML = ''; };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0" />;
}
