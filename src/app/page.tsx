'use client';

import { useState } from 'react';

import { Businesses } from '@/components/businesses';
import { ContactDialog } from '@/components/dialogs/contact-dialog';
import { FloatingThingy } from '@/components/floating-thingy';
import { Projects } from '@/components/projects';

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <FloatingThingy />
      <div className="pt-13 pb-40 md:pb-80">
        <main
          className="narrow-container space-y-4"
          data-color="var(--color-orange-100)"
          data-title="Intro"
        >
          <p className="-tracking-[0.01em] font-medium text-28/10 text-white">
            Product designer with 10+ years of experience based in Latvia. I design digital products
            people enjoy using.
          </p>
          <p className="-tracking-[0.01em] font-medium text-28/10">
            Passion and persistence drive what I build - from my own ventures to projects with
            clients worldwide.
          </p>
        </main>
        <div className="mt-20 md:mt-35">
          <Projects />
        </div>
        <div className="mt-20 md:mt-37">
          <Businesses />
        </div>
      </div>
      <ContactDialog isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
