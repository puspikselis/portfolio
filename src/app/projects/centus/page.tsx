import type { Metadata } from 'next';

import { FloatingThingy } from '@/components/floating-thingy';
import { Projects } from '@/components/projects';

import { images, tags } from './data';

export const metadata: Metadata = {
  description:
    'Centus is a localization management platform that helps teams ship multilingual products faster. As Lead Designer, I led end-to-end product work from concept to launch, defining core information architecture, translation workflows, and collaboration patterns.',
  title: 'Centus - Lead Designer | Kristaps Krūze',
};

export default function Centus() {
  return (
    <>
      <FloatingThingy />
      <div className="pt-15 pb-40 md:pb-80">
        <main
          className="narrow-container"
          data-color="var(--color-dim-gray-100)"
          data-title="Intro"
        >
          <div>
            <p className="font-medium text-13/4 text-dim-gray-100">2023 - 2025</p>
            <h3 className="-tracking-[0.01em] mt-2 font-medium text-28/10 text-white">Centus</h3>
            <div className="mt-4 space-y-4">
              <p className="-tracking-[0.02em] text-15/7 text-nobel-100">
                Centus is a localization management platform that helps teams ship multilingual
                products faster.
              </p>
              <p className="-tracking-[0.02em] text-15/7 text-nobel-100">
                As Lead Designer, I led end-to-end product work from concept to launch. I defined
                the core information architecture, translation workflows, roles and permissions, and
                collaboration patterns, and I designed integrations with Figma and GitHub. I also
                led designers producing marketing materials and illustrations.
              </p>
            </div>
          </div>
          <ul className="mt-11 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                className="-tracking-[0.03em] inset-shadow-0-1-0 inset-shadow-white/4 flex h-9 items-center rounded-full bg-nero-300 px-5 font-medium text-12/4 text-white"
                key={tag}
              >
                {tag}
              </li>
            ))}
          </ul>
        </main>
        <section className="mt-20 space-y-3 px-5 md:mx-auto md:mt-37 md:max-w-232 md:px-0">
          {images.map((image) => (
            <img
              alt={image.alt}
              className="rounded-3xl"
              data-title={image.title}
              key={image.id}
              src={image.src}
              srcSet={`${image.src} 1x, ${image.src.replace(/\.(jpg|png|avif)$/, '@2x.$1')} 2x, ${image.src.replace(/\.(jpg|png|avif)$/, '@3x.$1')} 3x`}
            />
          ))}
        </section>
        <div className="mt-20 md:mt-35">
          <Projects excludeSlug="centus" />
        </div>
      </div>
    </>
  );
}
