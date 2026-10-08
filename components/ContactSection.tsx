'use client';

import { pageData } from '@/data/page';

export default function ContactSection() {
  const { contact } = pageData;

  return (
    <section>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={contact.illustrationSrc}
        alt={contact.illustrationAlt}
        className="w-[62vw] max-w-[320px] sm:w-[46vw] sm:max-w-[500px]"
        style={{
          position: 'fixed',
          right: 0,
          bottom: 0,
          height: 'auto',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <h1
        className="m-0"
        style={{ fontSize: 'clamp(28px, 7vw, 40px)', fontWeight: 500, letterSpacing: '-0.5px', marginBottom: '28px' }}
      >
        {contact.heading}
      </h1>
      <p
        className="m-0 text-ink"
        style={{ fontSize: '17px', lineHeight: 1.7, maxWidth: '46ch', marginBottom: '30px' }}
      >
        {contact.intro}
      </p>
      <div className="flex flex-row items-center" style={{ gap: '22px' }}>
        {contact.socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            aria-label={link.label}
            className="inline-flex text-ink hover:-translate-y-[3px]"
            style={{ transition: 'transform 0.15s ease', padding: '10px', margin: '-10px' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={link.icon} alt="" width={24} height={24} aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
}
