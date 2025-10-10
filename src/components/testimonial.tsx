'use client';

import { useState } from 'react';

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
  const [isExpanded, setIsExpanded] = useState(false);
  const paragraphs = children.split('\n\n').filter(Boolean);
  const hasMultiple = paragraphs.length > 1;

  return (
    <section className="narrow-container" data-title="Reference">
      <div className="relative">
        <div className="-left-24 absolute top-2">
          <QuoteIcon className="size-5 text-dim-gray-100" />
        </div>

        <div data-expanded={isExpanded}>
          {paragraphs.map((paragraph, index) => (
            <p
              className="-tracking-[0.01em] not-first:pointer-events-none not-first:h-0 not-first:overflow-hidden font-medium text-28/10 text-white not-first:opacity-0 transition-all duration-500 [[data-expanded=true]_&]:not-first:pointer-events-auto [[data-expanded=true]_&]:not-first:mt-4 [[data-expanded=true]_&]:not-first:h-auto [[data-expanded=true]_&]:not-first:opacity-100"
              key={paragraph.slice(0, 50)}
            >
              {paragraph}
              {index === 0 && hasMultiple && (
                <button
                  className="-tracking-[0.01em] ml-1 font-medium text-28/10 text-dim-gray-100 transition-colors hover:text-nobel-100 [[data-expanded=true]_&]:hidden"
                  onClick={() => setIsExpanded(!isExpanded)}
                  type="button"
                >
                  Read all
                </button>
              )}
              {index === paragraphs.length - 1 && hasMultiple && (
                <button
                  className="-tracking-[0.01em] ml-1 font-medium text-28/10 text-dim-gray-100 transition-colors hover:text-nobel-100 [[data-expanded=false]_&]:hidden"
                  onClick={() => setIsExpanded(!isExpanded)}
                  type="button"
                >
                  Read less
                </button>
              )}
            </p>
          ))}
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
