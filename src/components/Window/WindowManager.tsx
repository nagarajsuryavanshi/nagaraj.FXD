'use client';

import { AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/store/windowStore';
import OsWindow from './OsWindow';
import AboutApp from '@/components/Apps/AboutApp';
import ProjectsApp from '@/components/Apps/ProjectsApp';
import ExperienceApp from '@/components/Apps/ExperienceApp';
import ContactApp from '@/components/Apps/ContactApp';
import ResumeApp from '@/components/Apps/ResumeApp';

const APP_CONTENT: Record<string, React.ReactNode> = {
  about: <AboutApp />,
  projects: <ProjectsApp />,
  experience: <ExperienceApp />,
  contact: <ContactApp />,
  resume: <ResumeApp />,
};

export default function WindowManager() {
  const windows = useWindowStore(s => s.windows);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <AnimatePresence>
        {windows.map(win => (
          <OsWindow key={win.id} win={win}>
            {APP_CONTENT[win.id]}
          </OsWindow>
        ))}
      </AnimatePresence>
    </div>
  );
}
