'use client';

import { useCursorPreview } from '@/components/cursor-preview';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { businesses } from '@/data/businesses';

function BusinessCard({
  business,
  isFirst,
}: {
  business: (typeof businesses)[number];
  isFirst?: boolean;
}) {
  const { hidePreview, showPreview } = useCursorPreview();

  const isEloking = business.id === 2;
  const isWisp = business.id === 1;
  const elokingUrl = 'https://eloking.com/';

  const handleCardHover = () => {
    if (isEloking && business.buttons[0]?.preview) {
      const preview = business.buttons[0].preview;
      showPreview(business.color || '#1d1d1d', preview.image, preview.width, preview.height);
    }
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
        className={`relative flex items-center gap-4 ${isEloking ? 'cursor-pointer' : ''}`}
        onPointerEnter={isEloking ? handleCardHover : undefined}
        onPointerLeave={isEloking ? hidePreview : undefined}
      >
        <Avatar
          className="size-12 rounded-xl bg-(--color)"
          style={{ '--color': business.color || '#1d1d1d' } as React.CSSProperties}
        >
          <AvatarImage alt={`${business.title} logo`} src={business.image} />
          <AvatarFallback className="-tracking-[0.02em] bg-transparent text-15 text-white/20">
            ?
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h4
            className={`-tracking-[0.02em] font-semibold text-15/6 text-white ${isEloking ? 'cursor-pointer' : ''}`}
          >
            {business.title}
          </h4>
          <ul className="flex">
            {business.tags.map((tag) => (
              <li
                className="flex items-center not-first:*:text-dim-gray-100 not-first:before:mx-2 not-first:before:block not-first:before:size-1 not-first:before:bg-nero-100 not-first:before:content-['']"
                key={tag}
              >
                <span className="-tracking-[0.02em] text-15/6">{tag}</span>
              </li>
            ))}
          </ul>
        </div>
        {isEloking && (
          <a
            aria-label="Visit Eloking website"
            className="link-overlay"
            href={elokingUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="sr-only">Visit Eloking website</span>
          </a>
        )}
        {business.buttons.length > 0 && (
          <ul className="ml-auto flex flex-col items-center gap-2 md:flex-row">
            {business.buttons.map((button) => (
              <li key={button.label}>
                <Button
                  asChild
                  className="group inset-shadow-0-1-0 inset-shadow-white/8 h-9 rounded-full bg-nero-100 px-4 font-semibold text-12 text-white hover:bg-nero-200"
                >
                  <a
                    className="relative z-10 flex items-center gap-2 [&_svg_path:first-of-type]:group-hover:fill-white [&_svg_path:last-of-type]:group-hover:stroke-black [&_svg_path]:transition-all"
                    href={button.href}
                    onPointerEnter={
                      isWisp && 'preview' in button && button.preview
                        ? () => {
                            showPreview(
                              business.color || '#1d1d1d',
                              button.preview.image,
                              button.preview.width,
                              button.preview.height,
                            );
                          }
                        : undefined
                    }
                    onPointerLeave={isWisp ? hidePreview : undefined}
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
      className="inset-shadow-0-1-0 inset-shadow-white/4 mx-auto max-w-152 bg-nero-300 px-5 py-8 md:rounded-3xl md:px-8"
      data-color="var(--color-orange-100)"
      data-title="Side projects"
    >
      {businesses.map((business, index) => (
        <BusinessCard business={business} isFirst={index === 0} key={business.id} />
      ))}
    </section>
  );
}
