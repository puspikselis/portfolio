'use client';

import Link from 'next/link';
import { useState } from 'react';

import { ContactDialog } from '@/components/dialogs/contact-dialog';
import { SpotifyStatus } from '@/components/features/spotify-status';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RollingText } from '@/components/ui/rolling-text';

export function Header() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-between bg-black p-5 md:sticky md:top-0 md:bg-transparent md:px-12 md:py-8">
        <div
          className="flex gap-3"
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
        >
          <Link className="focus:outline-none md:focus:outline-auto" href="/">
            <Avatar className="size-9 rounded-xl transition-opacity hover:opacity-80">
              <AvatarImage alt="Kristaps Krūze" className="rounded-none" src="/images/KK.avif" />
              <AvatarFallback>KK</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex flex-col-reverse justify-center gap-0.5">
            <SpotifyStatus isHovered={isHovered} />
          </div>
        </div>
        <div className="flex items-center md:gap-5">
          <select
            aria-label="Links"
            className="appearance-none font-semibold text-12 text-nobel-100 focus:outline-none md:hidden"
            onChange={(e) => {
              e.target.value && window.open(e.target.value, '_blank');
              e.target.value = '';
            }}
          >
            <option value="">Links</option>
            <option value="/documents/kristaps-kruze-resume.pdf">Resume</option>
            <option value="https://www.linkedin.com/in/kristapskruze/">LinkedIn</option>
          </select>
          <a
            aria-label="Download Resume PDF"
            className="hidden font-semibold text-12 text-nobel-100 hover:text-white md:block"
            href="/documents/kristaps-kruze-resume.pdf"
            rel="noopener noreferrer"
            target="_blank"
          >
            <RollingText text="Resume" />
          </a>
          <a
            aria-label="Visit LinkedIn profile"
            className="hidden font-semibold text-12 text-nobel-100 hover:text-white md:block"
            href="https://www.linkedin.com/in/kristapskruze/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <RollingText text="LinkedIn" />
          </a>
          <button
            className="inset-shadow-0-1-0 inset-shadow-white/8 h-9 cursor-pointer rounded-full bg-nero-100 px-5 font-semibold text-12 text-white hover:bg-nero-200 focus:outline-none md:focus:outline-auto"
            onClick={() => setIsContactOpen(true)}
            type="button"
          >
            Contact
          </button>
        </div>
      </header>
      <ContactDialog isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
