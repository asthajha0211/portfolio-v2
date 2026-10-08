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
        className="opacity-[0.15] md:opacity-100 w-[58vw] max-w-[320px] md:w-[30vw] md:max-w-[420px]"
        style={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          zIndex: 0,
          height: 'auto',
          pointerEvents: 'none',
        }}
      />
      <div className="relative text-left sm:text-right" style={{ zIndex: 1 }}>
        <h1
          className="font-cursive"
          style={{
            fontSize: 'clamp(30px, 8vw, 44px)',
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
          className="flex flex-col ml-0 sm:ml-auto"
          style={{ gap: '20px', maxWidth: '62ch' }}
        >
          {about.paragraphs.map((text, i) => {
            const hasLink = text.includes('[');
            if (hasLink) {
              return (
                <MarkdownProse
                  key={i}
                  content={text}
                  className="text-left sm:text-right"
                  style={{
                    fontSize: '16px',
                    lineHeight: 1.75,
                    color: '#000',
                    margin: 0,
                  }}
                />
              );
            }
            return (
              <p
                key={i}
                className="text-left sm:text-right"
                style={{
                  fontSize: '16px',
                  lineHeight: 1.75,
                  color: '#000',
                  margin: 0,
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
