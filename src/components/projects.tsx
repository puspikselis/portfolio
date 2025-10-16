'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';

import { useCursorPreview } from '@/components/features/cursor-preview';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/projects';

function ProjectCard({
  project,
  isFirst,
}: {
  project: (typeof projects)[number];
  isFirst?: boolean;
}) {
  const { hidePreview, showPreview } = useCursorPreview();

  const previewColor = project.color || '#1d1d1d';
  const hasDetailPage = Boolean(project.slug);
  const isComingSoon = project.id === 2;
  const buttonLabel = hasDetailPage ? 'View' : isComingSoon ? 'Soon' : 'Archive';

  const handlePointerEnter = () => {
    if (!hasDetailPage || !project.preview) return;
    showPreview(previewColor, project.preview);
  };

  return (
    <div className="space-y-6">
      <p
        className="font-medium text-13/4 text-dim-gray-100"
        data-align-target={isFirst ? 'true' : undefined}
      >
        {project.year}
      </p>
      <div
        className="relative flex items-center gap-4"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={hidePreview}
      >
        <Avatar
          className="size-12 rounded-xl bg-(--color)"
          style={{ '--color': previewColor } as CSSProperties}
        >
          <AvatarImage alt={`${project.title} logo`} src={project.image} />
          <AvatarFallback className="-tracking-[0.02em] bg-transparent text-15 text-white/20">
            {project.Icon ? <project.Icon /> : '?'}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 space-y-1">
          <h3 className="-tracking-[0.02em] truncate font-semibold text-15/6 text-white">
            {project.title}
          </h3>
          <ul className="flex min-w-0">
            {project.tags.map((tag) => (
              <li
                className="flex min-w-0 items-center not-first:*:text-dim-gray-100 not-first:before:mx-2 not-first:before:block not-first:before:size-1 not-first:before:shrink-0 not-first:before:rounded-full not-first:before:bg-nero-100 not-first:before:content-['']"
                key={tag}
              >
                <span className="-tracking-[0.02em] truncate text-15/6">{tag}</span>
              </li>
            ))}
          </ul>
        </div>
        <Button
          asChild={hasDetailPage}
          className="inset-shadow-0-1-0 inset-shadow-white/8 ml-auto h-9 rounded-full bg-nero-100 px-5 font-semibold text-12 text-white hover:bg-nero-200 disabled:bg-nero-300 disabled:text-dim-gray-100"
          disabled={!hasDetailPage}
        >
          {hasDetailPage ? (
            <Link className="link-overlay" href={`/projects/${project.slug}`}>
              {buttonLabel}
            </Link>
          ) : (
            buttonLabel
          )}
        </Button>
      </div>
    </div>
  );
}

export function Projects({ excludeSlug }: { excludeSlug?: string } = {}) {
  const filteredProjects = excludeSlug
    ? projects.filter((project) => project.slug && project.slug !== excludeSlug)
    : projects;

  return (
    <section
      className="narrow-container space-y-14"
      data-color="var(--color-orange-100)"
      data-title={excludeSlug ? 'Other projects' : 'Projects'}
    >
      {filteredProjects.map((project, index) => (
        <ProjectCard isFirst={index === 0} key={project.id} project={project} />
      ))}
    </section>
  );
}
