import Link from 'next/link';
import { Project } from '@/data/types';

export default function ProjectCard({ project, activeFilter }: { project: Project; activeFilter?: string }) {
  const filterParam = activeFilter && activeFilter !== 'all' ? `?filter=${activeFilter}` : '';

  const content = (
    <>
      <div className="relative border-b-2 border-ink-soft">
        {project.image && !project.image.includes('placeholder') ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.imageAlt}
            style={{
              width: '100%',
              aspectRatio: '16 / 10',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          <div
            className="flex items-center justify-center bg-placeholder"
            style={{
              aspectRatio: '16 / 10',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#9a9a9a',
            }}
          >
            image
          </div>
        )}
        <span
          className="absolute top-0 right-0 bg-ink-soft text-white"
          style={{
            fontSize: '10px',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            padding: '6px 10px',
          }}
        >
          {project.tag}
        </span>
      </div>
      <div className="flex items-start gap-3.5" style={{ padding: '18px 20px 22px' }}>
        <div className="flex-1">
          <h2
            className="m-0 uppercase"
            style={{
              fontSize: '17px',
              fontWeight: 700,
              letterSpacing: '-0.2px',
              marginBottom: '6px',
            }}
          >
            {project.title}
          </h2>
          <p
            className="m-0 text-grey-600"
            style={{ fontSize: '13px', lineHeight: 1.5 }}
          >
            {project.blurb}
          </p>
        </div>
        <span
          className="flex-none flex items-center justify-center border-2 border-ink-soft text-ink-soft group-hover:bg-ink-soft group-hover:text-white"
          style={{
            width: '32px',
            height: '32px',
            transition: 'background 0.15s ease, color 0.15s ease',
          }}
          aria-hidden="true"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17 L17 7 M9 7 h8 v8" />
          </svg>
        </span>
      </div>
    </>
  );

  const className = 'group block border-2 border-ink-soft bg-white hover:bg-surface-hover';
  const style = { textDecoration: 'none' as const, color: '#000' };

  if (project.externalUrl) {
    return (
      <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className={className} style={style}>
        {content}
      </a>
    );
  }

  return (
    <Link href={`/work/${project.slug}${filterParam}`} className={className} style={style}>
      {content}
    </Link>
  );
}
