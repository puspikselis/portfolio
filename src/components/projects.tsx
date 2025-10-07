import Link from 'next/link';

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
  return (
    <div className="space-y-6">
      <p
        className="font-medium text-13/4 text-dim-gray-100"
        data-align-target={isFirst ? 'true' : undefined}
      >
        {project.year}
      </p>
      <div className="relative flex items-center gap-4">
        <Avatar
          className="size-12 rounded-[0.75rem] bg-(--color)"
          style={{ '--color': project.color || '#1d1d1d' } as React.CSSProperties}
        >
          <AvatarImage alt={`${project.title} logo`} src={project.image} />
          <AvatarFallback className="bg-transparent text-15 text-white/20">
            {project.Icon ? <project.Icon /> : '?'}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h4 className="-tracking-[0.02em] font-semibold text-15/6 text-white">{project.title}</h4>
          <ul className="flex">
            {project.tags.map((tag) => (
              <li
                className="flex items-center not-first:*:text-dim-gray-100 not-first:before:mx-2 not-first:before:block not-first:before:size-1 not-first:before:bg-nero-100 not-first:before:content-['']"
                key={tag}
              >
                <span className="-tracking-[0.02em] text-15/6">{tag}</span>
              </li>
            ))}
          </ul>
        </div>
        <Button
          asChild={!!project.slug}
          className="inset-shadow-0-1-0 inset-shadow-white/8 ml-auto h-9 rounded-full bg-nero-100 px-5 font-semibold text-12 text-white hover:bg-nero-200 disabled:bg-nero-300 disabled:text-dim-gray-100"
          disabled={!project.slug}
        >
          {project.slug ? (
            <Link className="link-overlay" href={`/projects/${project.slug}`}>
              View
            </Link>
          ) : project.id === 2 ? (
            'Soon'
          ) : (
            'Archive'
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
