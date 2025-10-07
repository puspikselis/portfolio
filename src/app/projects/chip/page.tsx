import type { Metadata } from 'next';

import { FloatingThingy } from '@/components/floating-thingy';
import { Projects } from '@/components/projects';

const tags = [
  'Product design',
  'Design leadership',
  'Design systems',
  'UX/UI Design',
  'Prototyping',
  'Handoff',
  'Design QA',
];

export const metadata: Metadata = {
  description: 'Finance',
  title: 'Chip - Lead designer',
};

export default function Chip() {
  return (
    <>
      <FloatingThingy />
      <div className="space-y-33 pt-15 pb-86">
        <main className="narrow-container" data-color="#00d2b2" data-title="Intro">
          <div className="space-y-4">
            <p className="font-medium text-13/4 text-dim-gray-100">2018</p>
            <h3 className="-tracking-[0.01em] font-medium text-28/10 text-white">Chip</h3>
            <p className="-tracking-[0.02em] text-15/7 text-nobel-100">
              Chip is an automated savings app that connects to your bank, analyzes spending, and
              moves affordable amounts into savings automatically.
            </p>
            <p className="-tracking-[0.02em] text-15/7 text-nobel-100">
              At Chip I set up design processes, led the 2.0 rebrand, and designed the iOS/Android
              apps with conversational UX. I also owned the marketing site and launch assets,
              partnering with business and engineering to keep decisions customer-first and
              testable.
            </p>
          </div>
          <ul className="mt-11 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                className="inset-shadow-0-1-0 inset-shadow-white/4 flex h-9 items-center rounded-full bg-nero-300 px-5 font-medium text-13/4 text-white"
                key={tag}
              >
                {tag}
              </li>
            ))}
          </ul>
        </main>
        <section className="narrow-container max-w-232 space-y-3 py-2">
          <article
            className="flex items-center justify-center rounded-[1.5rem] bg-white-smoke-100 pt-24 pb-25"
            data-description="I researched, planned, developed Figma like solution for locale editing"
            data-title="Locale editor"
          >
            <img alt="Index page" className="w-7/10" src="/images/chip/1.png" />
          </article>
          <article
            className="flex items-center justify-center rounded-[1.5rem] bg-white-smoke-100 pt-24 pb-25"
            data-description="Bobr kurwa"
            data-title="Meow"
          >
            <img alt="Other page" className="w-7/10" src="/images/chip/2.png" />
          </article>
          <article className="flex items-center justify-center rounded-[1.5rem] bg-[url(/images/chip/3-bg.jpg)] bg-cover pt-24 pb-25">
            <img alt="Other page" className="w-7/10" src="/images/chip/3.png" />
          </article>
          <article className="flex items-center justify-center rounded-[1.5rem] bg-white-smoke-100 pt-24 pb-25">
            <img alt="Other page" className="w-7/10" src="/images/chip/4.png" />
          </article>
          <article className="flex items-center justify-center rounded-[1.5rem] bg-[url(/images/centus/5-bg.jpg)] bg-cover pt-24 pb-25">
            <img alt="Index page" className="w-7/10" src="/images/centus/5.png" />
          </article>
        </section>
        <Projects excludeSlug="chip" />
      </div>
    </>
  );
}
