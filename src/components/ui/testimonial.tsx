import { QuoteIcon } from '@/components/icons/quote-icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TestimonialProps {
  author: {
    image: string;
    name: string;
    title: string;
  };
  children: string;
}

export function Testimonial({ author, children }: TestimonialProps) {
  const paragraphs = children.split('\n\n').filter(Boolean);

  return (
    <section className="narrow-container" data-title="Reference">
      <div className="relative">
        <div className="-left-24 absolute top-2">
          <QuoteIcon className="size-5 text-dim-gray-100" />
        </div>

        <div className="space-y-4">
          {paragraphs.map((paragraph) => {
            const lines = paragraph.split('\n');
            return (
              <p
                className="-tracking-[0.01em] not-first:-tracking-[0.02em] font-medium not-first:text-15/7 not-first:text-nobel-100 text-28/10 text-white"
                key={paragraph.slice(0, 50)}
              >
                {lines.map((line) => (
                  <span key={line.slice(0, 30)}>
                    {line}
                    {line !== lines[lines.length - 1] && <br />}
                  </span>
                ))}
              </p>
            );
          })}
        </div>

        <div className="mt-9 flex items-center gap-3 pb-2">
          <Avatar className="size-9 rounded-xl">
            <AvatarImage
              alt={author.name}
              src={author.image}
              srcSet={`${author.image} 1x, ${author.image.replace(/\.(jpg|png|avif)$/, '@2x.$1')} 2x, ${author.image.replace(/\.(jpg|png|avif)$/, '@3x.$1')} 3x`}
            />
            <AvatarFallback className="rounded-xl bg-dim-gray-100 text-white">
              {author.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="-tracking-[0.03em] font-semibold text-13/4 text-white">{author.name}</p>
            <p className="-tracking-[0.03em] font-medium text-12/4 text-dim-gray-100">
              {author.title}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
