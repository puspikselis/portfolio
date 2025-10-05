import type { Metadata } from 'next';

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
  description: 'Localization',
  title: 'Centus - Lead designer',
};

export default function Centus() {
  return (
    <div className="space-y-33 pt-38 pb-86">
      <main className="narrow-container">
        <div className="space-y-4">
          <p className="font-medium text-13/4 text-dim-gray-100">2023 - 2025</p>
          <h3 className="-tracking-[0.01em] font-medium text-28/10 text-white">Centus</h3>
          <p className="-tracking-[0.02em] text-15/7 text-nobel-100">
            Centus is a localization-management platform that streamlines translations so teams can
            ship multi-language products faster.
          </p>
          <p className="-tracking-[0.02em] text-15/7 text-nobel-100">
            As lead product designer, I took Centus from concept to launch - defining the core IA,
            translation workflows, roles/permissions, and collaboration patterns - while also
            designing integrations with Figma and common file formats to fold localization into the
            build pipeline.
          </p>
          <p className="-tracking-[0.02em] text-15/7 text-nobel-100">
            I turned localization from an ad-hoc task into a predictable, scalable system.
          </p>
        </div>
        <ul className="mt-11 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              className="inner-shadow-0-1-0 inner-shadow-white/4 flex h-9 items-center rounded-full bg-nero-300 px-5 font-medium text-13/4 text-white"
              key={tag}
            >
              {tag}
            </li>
          ))}
        </ul>
      </main>
      <section className="narrow-container max-w-232 space-y-3 py-2">
        <article className="flex items-center justify-center rounded-[1.5rem] bg-[url(/images/centus/1-bg.jpg)] bg-cover pt-24 pb-25">
          <img alt="Index page" className="w-7/10 rounded-[0.5rem]" src="/images/centus/1.jpg" />
        </article>
        <article className="flex items-center justify-center rounded-[1.5rem] bg-cover bg-white-smoke-100 pt-24 pb-25">
          <img
            alt="Other page"
            className="w-7/10 rounded-[0.5rem] border border-gainsboro-100"
            src="/images/centus/2.jpg"
          />
        </article>
        <article className="flex items-center justify-center rounded-[1.5rem] bg-cover bg-white-smoke-100 pt-24 pb-25">
          <img alt="Other page" className="w-7/10" src="/images/centus/3.png" />
        </article>
        <article className="flex items-center justify-center rounded-[1.5rem] bg-cover bg-white-smoke-100 pt-24 pb-25">
          <img
            alt="Other page"
            className="w-7/10 rounded-[0.5rem] border border-gainsboro-100"
            src="/images/centus/4.png"
          />
        </article>
        <article className="flex items-center justify-center rounded-[1.5rem] bg-[url(/images/centus/5-bg.jpg)] bg-cover pt-24 pb-25">
          <img alt="Index page" className="w-7/10 rounded-[0.5rem]" src="/images/centus/5.png" />
        </article>
      </section>
      <Projects />
    </div>
  );
}
