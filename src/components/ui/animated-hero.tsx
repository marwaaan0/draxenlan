'use client';

import dynamic from 'next/dynamic';

const HeroContent = dynamic(() => import('./hero-content').then(mod => ({ default: mod.HeroContent })), {
  ssr: false,
});

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <HeroContent />
    </section>
  );
}
