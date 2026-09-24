'use client';

import { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Landing from '@/components/Landing';
import TopChrome from '@/components/TopChrome';
import WorkSection from '@/components/WorkSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import FootprintLayer, { fireTrail, clearTrail } from '@/components/FootprintTrail';
import { pageData } from '@/data/page';

type Section = 'work' | 'about' | 'contact' | 'resume';
const validSections: Section[] = ['work', 'about', 'contact', 'resume'];

function HomeContent() {
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get('section');
  const startEntered = validSections.includes(sectionParam as Section);
  const startSection = startEntered ? (sectionParam as Section) : 'work';

  const [entered, setEntered] = useState(startEntered);
  const [section, setSection] = useState<Section>(startSection);
  const [menuOpen, setMenuOpen] = useState(false);
  const [landKey, setLandKey] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const barFade = section === 'about' && scrolled;
  const showTopBar = section === 'work';

  useEffect(() => {
    if (!entered) return;
    const onScroll = () => {
      const past = window.scrollY > 90;
      if (past !== scrolled) {
        setScrolled(past);
        setMenuOpen(false);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [entered, scrolled]);

  const handleEnter = useCallback(() => {
    clearTrail();
    setEntered(true);
    setSection('work');
    setMenuOpen(false);
  }, []);

  const handleNav = useCallback((key: string) => {
    if (key === 'home') {
      setEntered(false);
      setLandKey((k) => k + 1);
      setMenuOpen(false);
    } else if (key === 'resume') {
      setEntered(true);
      setSection('resume');
      setMenuOpen(false);
    } else {
      setEntered(true);
      setSection(key as Section);
      setMenuOpen(false);
      fireTrail();
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Landing entered={entered} onEnter={handleEnter} landKey={landKey} />
      <FootprintLayer />

      <TopChrome
        section={section}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((o) => !o)}
        onNav={handleNav}
        barFade={barFade}
        showTopBar={showTopBar}
      />

      <main
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          padding: '128px 48px 96px',
          minHeight: '100vh',
        }}
      >
        {section === 'work' && <WorkSection initialFilter={searchParams.get('filter') ?? undefined} />}
        {section === 'about' && <AboutSection />}
        {section === 'contact' && <ContactSection />}
        {section === 'resume' && (
          <section>
            <h1
              className="m-0"
              style={{
                fontSize: '40px',
                fontWeight: 500,
                letterSpacing: '-0.5px',
                marginBottom: '20px',
              }}
            >
              {pageData.resume.heading}
            </h1>
            <p
              className="m-0"
              style={{
                fontSize: '17px',
                lineHeight: 1.7,
                maxWidth: '46ch',
                marginBottom: '24px',
              }}
            >
              {pageData.resume.description}
            </p>
            <a
              href={pageData.resume.linkUrl}
              style={{
                fontSize: '17px',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              }}
            >
              {pageData.resume.linkText}
            </a>
          </section>
        )}
      </main>
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
