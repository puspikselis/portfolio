import type { Metadata } from 'next';

import { Businesses } from '@/components/businesses';
import { FloatingThingy } from '@/components/floating-thingy';
import { Projects } from '@/components/projects';

export const metadata: Metadata = {
  title: 'Kristaps Krūze - Designer',
  description: 'Designer turning ideas into products people actually enjoy using. I\'ve built my own businesses and helped clients worldwide create complete digital experiences that look great and work even better.',
};

export default function Home() {
  return (
    <>
      <FloatingThingy />
      <div className="pt-13 pb-80">
        <main className="narrow-container space-y-4" data-color="var(--color-orange-100)" data-title="Intro">
          <h3 className="-tracking-[0.01em] font-medium text-28/10 text-white">
            Designer turning ideas into products people actually enjoy using.
          </h3>
          <p className="-tracking-[0.01em] font-medium text-28/10">
            I've built my own businesses and helped clients worldwide create complete digital
            experiences that look great and work even better.
          </p>
          <p className="-tracking-[0.01em] font-medium text-28/10">Let's work together!</p>
        </main>
        <div className="mt-35">
          <Projects />
        </div>
        <div className="mt-37">
          <Businesses />
        </div>
      </div>
    </>
  );
}
