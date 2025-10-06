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
  title: 'Paynt - Lead designer',
};

export default function Paynt() {
  return (
    <>
      <FloatingThingy />
      <div className="space-y-33 pt-38 pb-86">
        <main className="narrow-container">
          <div className="space-y-4">
            <p className="font-medium text-13/4 text-dim-gray-100">2018 - 2021</p>
            <h3 className="-tracking-[0.01em] font-medium text-28/10 text-white">Paynt</h3>
            <p className="-tracking-[0.02em] text-15/7 text-nobel-100">
              Paydoo (now Paynt) provides payment processing and acquiring services for European
              merchants, ISOs, and payment facilitators.
            </p>
            <p className="-tracking-[0.02em] text-15/7 text-nobel-100">
              I worked at Paydoo as Head of Design, overseeing all design efforts across product and
              brand. I led the design of an industry-changing onboarding platform, the marketing
              website, and POS applications, while also guiding the creation of marketing materials
              and visual assets used across the company.
            </p>
            <p className="-tracking-[0.02em] text-15/7 text-nobel-100">
              One of the key projects I directed was Paydoo’s full rebranding into Paynt —
              redefining the brand’s identity, visual language, and communication style to better
              reflect its evolution and growth.
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
          <article className="flex items-center justify-center rounded-[1.5rem] bg-[url(/images/paynt/1-bg.jpg)] bg-cover pt-24 pb-25">
            <img alt="Index page" className="w-7/10" src="/images/paynt/1.png" />
          </article>
          <article className="flex items-center justify-center rounded-[1.5rem] bg-white-smoke-100 pt-24 pb-25">
            <img alt="Other page" className="w-7/10" src="/images/paynt/2.png" />
          </article>
          <article className="flex items-center justify-center rounded-[1.5rem] bg-[url(/images/paynt/3-bg.jpg)] bg-cover pt-24 pb-25">
            <img alt="Index page" className="w-7/10" src="/images/paynt/3.png" />
          </article>
        </section>
        <Projects excludeSlug="paynt" />
      </div>
    </>
  );
}
