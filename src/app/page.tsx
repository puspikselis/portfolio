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
          <h3 className="-tracking-[0.01em] font-medium text-28/10 text-white">
            Designer turning ideas into products people actually enjoy using.
          </h3>
          <p className="-tracking-[0.01em] font-medium text-28/10">
            I've built my own businesses and helped clients worldwide create complete digital
            experiences that look great and work even better.
          </p>
          <p className="-tracking-[0.01em] font-medium text-28/10">
            <button
              className="no-underline transition-opacity hover:opacity-80"
              onClick={() => setIsContactOpen(true)}
              type="button"
            >
              Let's work together!
            </button>
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
