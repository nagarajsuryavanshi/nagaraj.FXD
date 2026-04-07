'use client';

import { useEffect, useState } from 'react';
import { Github, Linkedin, Moon, Sun } from 'lucide-react';

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function MenuBar() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [dark, setDark] = useState(true);

  useEffect(() => {
    function tick() {
      const now = new Date();
      const h = now.getHours() % 12 || 12;
      const m = String(now.getMinutes()).padStart(2, '0');
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      setTime(`${h}:${m} ${ampm}`);
      setDate(`${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="h-9 flex items-center justify-between px-4 z-50 flex-shrink-0 glass border-b"
      style={{
        background: 'rgba(10,10,20,0.75)',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="w-6 h-6 rounded-lg grad-bg flex items-center justify-center text-white text-xs font-bold shadow-lg">
          N
        </div>
        <span className="text-[13px] font-semibold text-white">Nagaraj OS</span>
        <div className="flex gap-1">
          {['File', 'View', 'Help'].map(item => (
            <button
              key={item}
              className="px-2.5 py-1 rounded text-[13px] transition-colors text-white/50 hover:text-white hover:bg-white/10"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3.5">
        <button
          onClick={() => setDark(!dark)}
          className="text-white/50 hover:text-white transition-colors"
        >
          {dark ? <Moon size={15} /> : <Sun size={15} />}
        </button>
        <a
          href="https://github.com/nagarajsuryavanshi"
          target="_blank"
          className="text-white/50 hover:text-white transition-colors"
        >
          <Github size={15} />
        </a>
        <a
          href="https://linkedin.com/in/nagarajsuryavanshi"
          target="_blank"
          className="text-white/50 hover:text-white transition-colors"
        >
          <Linkedin size={15} />
        </a>
        <div className="flex gap-2 font-mono text-[12px]">
          <span className="text-white/50">{date}</span>
          <span className="text-white font-medium">{time}</span>
        </div>
      </div>
    </div>
  );
}
