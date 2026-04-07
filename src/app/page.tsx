'use client';

import { useState } from 'react';
import BootScreen from '@/components/Boot/BootScreen';
import Desktop from '@/components/Desktop/Desktop';

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <main className="w-full h-full overflow-hidden">
      {!booted && <BootScreen onComplete={() => setBooted(true)} />}
      {booted && <Desktop />}
    </main>
  );
}
