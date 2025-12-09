'use client';

import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';

import { useCursorPreview } from '@/components/features/cursor-preview';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { businesses } from '@/data/businesses';
import { cn } from '@/lib/utils';

function BusinessCard({
  business,
  isFirst,
}: {
  business: (typeof businesses)[number];
  isFirst?: boolean;
}) {
  const { hidePreview, showPreview } = useCursorPreview();
  const previewColor = business.color || '#1d1d1d';

  const [filteredButtons, setFilteredButtons] = useState(business.buttons);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAndroid = /android/.test(userAgent);
    const isIOS = /iphone|ipad|ipod/.test(userAgent);

    const hasAppStore = business.buttons.some((btn) => btn.label === 'App Store');
    const hasPlayStore = business.buttons.some((btn) => btn.label === 'PlayStore');

    if (hasAppStore && hasPlayStore) {
      if (isIOS) {
        setFilteredButtons(business.buttons.filter((btn) => btn.label === 'App Store'));
      } else if (isAndroid) {
        setFilteredButtons(business.buttons.filter((btn) => btn.label === 'PlayStore'));
      }
    }
  }, [business.buttons]);

  const primaryButton = filteredButtons[0];
  const isCardInteractive = Boolean(business.cardHref);

  const handleCardPointerEnter = () => {
    if (
      !business.previewOnCardHover ||
      !primaryButton ||
      !('preview' in primaryButton) ||
      !primaryButton.preview
    )
      return;
    const { image, width, height } = primaryButton.preview;
    showPreview(previewColor, image, width, height);
  };

  return (
    <div className="space-y-6 not-first:before:my-7 not-first:before:block not-first:before:h-px not-first:before:w-full not-first:before:bg-nero-400 not-first:before:content-['']">
      <p
        className="font-medium text-13/4 text-dim-gray-100"
        data-align-target={isFirst ? 'true' : undefined}
      >
        {business.year}
      </p>
      <div
        className={cn('relative flex items-center gap-4', isCardInteractive && 'cursor-pointer')}
        onPointerEnter={business.previewOnCardHover ? handleCardPointerEnter : undefined}
        onPointerLeave={business.previewOnCardHover ? hidePreview : undefined}
      >
        <Avatar
          className="size-12 rounded-xl bg-(--color)"
          style={{ '--color': previewColor } as CSSProperties}
        >
          <AvatarImage alt={`${business.title} logo`} src={business.image} />
          <AvatarFallback className="-tracking-[0.02em] bg-transparent text-15 text-white/20">
            ?
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h3
            className={cn(
              '-tracking-[0.02em] font-semibold text-15/6 text-white',
              isCardInteractive && 'cursor-pointer',
            )}
          >
            {business.title}
          </h3>
          <ul className="flex">
            {business.tags.map((tag) => (
              <li
                className="flex items-center not-first:*:text-dim-gray-100 not-first:before:mx-2 not-first:before:block not-first:before:size-1 not-first:before:rounded-full not-first:before:bg-nero-100 not-first:before:content-['']"
                key={tag}
              >
                <span className="-tracking-[0.02em] text-15/6">{tag}</span>
              </li>
            ))}
          </ul>
        </div>
        {isCardInteractive && business.cardHref && (
          <a
            aria-label={`Visit ${business.tags[0] || business.title} website`}
            className="link-overlay"
            href={business.cardHref}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="sr-only">Visit {business.tags[0] || business.title} website</span>
          </a>
        )}
        {filteredButtons.length > 0 && (
          <ul className="ml-auto flex flex-col items-center gap-2 md:flex-row">
            {filteredButtons.map((button) => (
              <li key={button.label}>
                <Button
                  asChild
                  className="group inset-shadow-0-1-0 inset-shadow-white/8 h-9 rounded-full bg-nero-100 px-4 font-semibold text-12 text-white hover:bg-nero-200"
                >
                  <a
                    className="relative z-10 flex items-center gap-2 [&_svg_path:first-of-type]:group-hover:fill-white [&_svg_path:last-of-type]:group-hover:stroke-black [&_svg_path]:transition-all"
                    href={button.href}
                    onPointerEnter={
                      'preview' in button && button.preview
                        ? () =>
                            showPreview(
                              previewColor,
                              button.preview.image,
                              button.preview.width,
                              button.preview.height,
                            )
                        : undefined
                    }
                    onPointerLeave={
                      'preview' in button && button.preview && !business.previewOnCardHover
                        ? hidePreview
                        : undefined
                    }
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {button.label}
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function Businesses() {
  return (
    <section
      className="inset-shadow-0-1-0 inset-shadow-white/4 mx-auto max-w-152 bg-nero-300 px-8 py-8 md:rounded-3xl md:px-8"
      data-color="var(--color-orange-100)"
      data-title="Side projects"
    >
      {businesses.map((business, index) => (
        <BusinessCard business={business} isFirst={index === 0} key={business.id} />
      ))}
    </section>
  );
}
