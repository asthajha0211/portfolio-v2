import { Suspense } from 'react';
import { projects } from '@/data/projects';
import { notFound } from 'next/navigation';
import MarkdownProse from '@/components/MarkdownProse';
import BackToWork from '@/components/BackToWork';
import FableTeardown from '@/components/case-studies/FableTeardown';
import TribeSwiggy from '@/components/case-studies/TribeSwiggy';

const CUSTOM_CASE_STUDIES: Record<string, () => React.ReactElement> = {
  'fable-teardown': () => <FableTeardown />,
  'tribe-swiggy': () => <TribeSwiggy />,
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const CustomCaseStudy = CUSTOM_CASE_STUDIES[project.slug];

  return (
    <>
      {/* White top bar with back link */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '76px',
          background: '#fff',
          borderBottom: '1px solid #000',
          zIndex: 18,
          display: 'flex',
          alignItems: 'center',
          padding: '0 48px',
        }}
      >
        <Suspense>
          <BackToWork />
        </Suspense>
      </div>

      <main
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          padding: '112px 48px 96px',
          minHeight: '100vh',
        }}
      >

        {CustomCaseStudy ? (
          <CustomCaseStudy />
        ) : (
          <>
            <h1
              style={{
                fontSize: '40px',
                fontWeight: 500,
                letterSpacing: '-0.5px',
                margin: '0 0 8px',
              }}
            >
              {project.title}
            </h1>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px',
                marginBottom: '34px',
              }}
            >
              <p
                style={{
                  fontSize: '17px',
                  lineHeight: 1.7,
                  color: '#6a6a6a',
                  maxWidth: '52ch',
                  margin: 0,
                }}
              >
                {project.blurb}
              </p>
              <span
                style={{
                  flex: 'none',
                  background: '#3a3a3a',
                  color: '#fff',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  padding: '6px 10px',
                }}
              >
                {project.tag}
              </span>
            </div>

            {/* Hero image */}
            {project.heroImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.heroImage}
                alt={project.heroImageAlt || project.title}
                style={{
                  width: '100%',
                  aspectRatio: '16 / 7',
                  objectFit: 'cover',
                  border: '2px solid #000',
                  display: 'block',
                  marginBottom: '48px',
                }}
              />
            ) : (
              <div
                style={{
                  aspectRatio: '16 / 7',
                  border: '2px solid #000',
                  background: '#e8e8e8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: '#9a9a9a',
                  marginBottom: '48px',
                }}
              >
                hero image
              </div>
            )}

            {/* Case study body */}
            <div style={{ maxWidth: '68ch', margin: '0 auto' }}>
              <MarkdownProse
                content={project.body}
                className="[&>h2]:text-[24px] [&>h2]:font-medium [&>h2]:tracking-tight [&>h2]:mt-10 [&>h2]:mb-4 [&>p]:text-[17px] [&>p]:leading-[1.7] [&>p]:mb-6 [&>p]:text-grey-600 [&>ul]:text-[17px] [&>ul]:leading-[1.7] [&>ul]:text-grey-600 [&>ul]:mb-6 [&>ul]:pl-6 [&>li]:mb-2"
              />
            </div>
          </>
        )}
      </main>
    </>
  );
}
