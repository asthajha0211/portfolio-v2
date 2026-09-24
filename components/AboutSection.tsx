'use client';

import { pageData } from '@/data/page';
import MarkdownProse from './MarkdownProse';

export default function AboutSection() {
  const { about } = pageData;

  return (
    <section>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={about.illustrationSrc}
        alt={about.illustrationAlt}
        style={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          zIndex: 0,
          width: '30vw',
          maxWidth: '420px',
          height: 'auto',
          display: 'block',
          pointerEvents: 'none',
        }}
      />
      <div className="relative" style={{ zIndex: 1, textAlign: 'right' }}>
        <h1
          className="font-cursive"
          style={{
            fontSize: '44px',
            fontWeight: 400,
            lineHeight: 1.5,
            letterSpacing: 0,
            margin: '0 0 32px',
            padding: '0 4px 6px 0',
          }}
        >
          {about.heading}
        </h1>
        <div
          className="flex flex-col ml-auto"
          style={{ gap: '20px', maxWidth: '62ch' }}
        >
          {about.paragraphs.map((text, i) => {
            const hasLink = text.includes('[');
            if (hasLink) {
              return (
                <MarkdownProse
                  key={i}
                  content={text}
                  style={{
                    fontSize: '16px',
                    lineHeight: 1.75,
                    color: '#000',
                    textAlign: 'right',
                    margin: 0,
                  }}
                />
              );
            }
            return (
              <p
                key={i}
                style={{
                  fontSize: '16px',
                  lineHeight: 1.75,
                  color: '#000',
                  margin: 0,
                  textAlign: 'right',
                  textWrap: 'pretty',
                }}
              >
                {text}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
