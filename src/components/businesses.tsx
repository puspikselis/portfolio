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
  return (
    <div className="space-y-6 not-first:before:my-7 not-first:before:block not-first:before:h-px not-first:before:w-full not-first:before:bg-nero-400 not-first:before:content-['']">
      <p
        className="font-medium text-13/4 text-dim-gray-100"
        data-align-target={isFirst ? 'true' : undefined}
      >
        {business.year}
      </p>
      <div className="flex items-center gap-4">
        <Avatar
          className="size-12 rounded-[0.75rem] bg-(--color)"
          style={{ '--color': business.color || '#1d1d1d' } as React.CSSProperties}
        >
          <AvatarImage src={business.image} />
          <AvatarFallback className="bg-transparent text-15 text-white/20">?</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h4 className="-tracking-[0.02em] font-semibold text-15/6 text-white">
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
        {business.buttons.length > 0 && (
          <ul className="ml-auto flex flex-col items-center gap-2 md:flex-row">
            {business.buttons.map((button) => (
              <li key={button.label}>
                <Button
                  asChild
                  className="inset-shadow-0-1-0 inset-shadow-white/8 h-9 rounded-full bg-nero-100 px-5 font-semibold text-12 text-white"
                >
                  <a href={button.href} rel="noopener noreferrer" target="_blank">
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
      className="narrow-container inset-shadow-0-1-0 inset-shadow-white/4 max-w-152 bg-nero-300 py-8 md:rounded-[1.5rem] md:px-8"
      data-color="#FF7524"
      data-title="Side projects"
    >
      {businesses.map((business, index) => (
        <BusinessCard business={business} isFirst={index === 0} key={business.id} />
      ))}
    </section>
  );
}
