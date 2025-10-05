import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { businesses } from '@/data/businesses';

function BusinessCard({ business }: { business: (typeof businesses)[number] }) {
  return (
    <div className="space-y-6 not-first:before:my-7 not-first:before:block not-first:before:h-px not-first:before:w-9/10 not-first:before:bg-nero-400 not-first:before:content-['']">
      <p className="font-medium text-13/4 text-dim-gray-100">{business.year}</p>
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
                className="flex items-center not-first:before:mx-2 not-first:before:block not-first:before:size-1 not-first:before:bg-nero-100 not-first:before:content-['']"
                key={tag}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        {business.buttons.length > 0 && (
          <ul className="ml-auto flex flex-col items-center gap-2 md:flex-row">
            {business.buttons.map((button) => (
              <Button
                asChild
                className="inner-shadow-0-1-0 inner-shadow-white/4 h-9 rounded-full bg-nero-100 px-5 font-semibold text-12 text-white"
                key={button.label}
              >
                <a href={button.href} rel="noopener noreferrer" target="_blank">
                  {button.label}
                  <span className="text-dim-gray-100"> ↗</span>
                </a>
              </Button>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function Businesses() {
  return (
    <section className="narrow-container max-w-152 bg-nero-300 py-8 md:rounded-[1.5rem] md:px-8">
      {businesses.map((business) => (
        <BusinessCard business={business} key={business.id} />
      ))}
    </section>
  );
}
