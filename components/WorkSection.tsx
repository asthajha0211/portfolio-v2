'use client';

import { useState } from 'react';
import { projects } from '@/data/projects';
import { pageData } from '@/data/page';
import ProjectCard from './ProjectCard';

function useFilters() {
  const rawTags = [...new Set(projects.map((p) => p.tag.toLowerCase()))];
  const { tagOrder } = pageData;
  const ordered = [
    ...tagOrder.filter((t) => rawTags.includes(t)),
    ...rawTags.filter((t) => !tagOrder.includes(t)).sort(),
  ];
  return ['all', ...ordered];
}

export default function WorkSection({ initialFilter }: { initialFilter?: string }) {
  const filters = useFilters();
  const [activeFilter, setActiveFilter] = useState(
    initialFilter && filters.includes(initialFilter) ? initialFilter : 'all'
  );

  const visible =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.tag.toLowerCase() === activeFilter);

  return (
    <section>
      <div
        className="flex flex-wrap items-baseline justify-between gap-4"
        style={{ marginBottom: '28px' }}
      >
        <h1 className="m-0" style={{ fontSize: '40px', fontWeight: 500, letterSpacing: '-0.5px' }}>
          {pageData.work.heading}
        </h1>
        <div className="flex flex-wrap items-baseline" style={{ gap: '22px' }}>
          {filters.map((f) => {
            const isActive = f === activeFilter;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="cursor-pointer border-0 bg-transparent p-0"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: isActive ? '15px' : '12px',
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: '0.5px',
                  color: isActive ? '#000' : '#8a8a8a',
                  textDecoration: isActive ? 'underline' : 'none',
                  textUnderlineOffset: '5px',
                  transition: 'color 0.15s ease',
                }}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="grid bg-white"
        style={{
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
        }}
      >
        {visible.map((p) => (
          <ProjectCard key={p.slug} project={p} activeFilter={activeFilter} />
        ))}
      </div>
    </section>
  );
}
