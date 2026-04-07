import { create } from 'zustand';

export type AppId = 'about' | 'projects' | 'experience' | 'contact' | 'resume';

export interface WindowState {
  id: AppId;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface WindowStore {
  windows: WindowState[];
  zCounter: number;
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  restoreWindow: (id: AppId) => void;
  maximizeWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  updatePosition: (id: AppId, x: number, y: number) => void;
  updateSize: (id: AppId, width: number, height: number) => void;
}

const APP_DEFAULTS: Record<AppId, Partial<WindowState>> = {
  about:      { title: 'About Me',   width: 600, height: 560, x: 80,  y: 40 },
  projects:   { title: 'Projects',   width: 740, height: 580, x: 140, y: 60 },
  experience: { title: 'Experience', width: 620, height: 580, x: 200, y: 50 },
  contact:    { title: 'Contact',    width: 540, height: 580, x: 160, y: 70 },
  resume:     { title: 'Resume',     width: 640, height: 620, x: 120, y: 30 },
};

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  zCounter: 200,

  openWindow(id) {
    const { windows, zCounter } = get();
    const existing = windows.find(w => w.id === id);

    if (existing) {
      if (existing.isMinimized) {
        set(s => ({
          zCounter: s.zCounter + 1,
          windows: s.windows.map(w =>
            w.id === id ? { ...w, isMinimized: false, zIndex: s.zCounter + 1 } : w
          ),
        }));
      } else {
        get().focusWindow(id);
      }
      return;
    }

    const offset = windows.length * 30;
    const defaults = APP_DEFAULTS[id];
    set(s => ({
      zCounter: s.zCounter + 1,
      windows: [
        ...s.windows,
        {
          id,
          title: defaults.title!,
          isMinimized: false,
          isMaximized: false,
          zIndex: s.zCounter + 1,
          x: Math.min((defaults.x! + offset), window.innerWidth - defaults.width! - 20),
          y: Math.min((defaults.y! + offset), window.innerHeight - defaults.height! - 120),
          width: defaults.width!,
          height: defaults.height!,
        },
      ],
    }));
  },

  closeWindow(id) {
    set(s => ({ windows: s.windows.filter(w => w.id !== id) }));
  },

  minimizeWindow(id) {
    set(s => ({
      windows: s.windows.map(w => w.id === id ? { ...w, isMinimized: true } : w),
    }));
  },

  restoreWindow(id) {
    set(s => ({
      zCounter: s.zCounter + 1,
      windows: s.windows.map(w =>
        w.id === id ? { ...w, isMinimized: false, zIndex: s.zCounter + 1 } : w
      ),
    }));
  },

  maximizeWindow(id) {
    set(s => ({
      windows: s.windows.map(w =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    }));
  },

  focusWindow(id) {
    set(s => ({
      zCounter: s.zCounter + 1,
      windows: s.windows.map(w =>
        w.id === id ? { ...w, zIndex: s.zCounter + 1 } : w
      ),
    }));
  },

  updatePosition(id, x, y) {
    set(s => ({
      windows: s.windows.map(w => w.id === id ? { ...w, x, y } : w),
    }));
  },

  updateSize(id, width, height) {
    set(s => ({
      windows: s.windows.map(w => w.id === id ? { ...w, width, height } : w),
    }));
  },
}));
