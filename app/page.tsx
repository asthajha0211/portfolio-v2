'use client';

import { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Landing from '@/components/Landing';
import TopChrome from '@/components/TopChrome';
import WorkSection from '@/components/WorkSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import FootprintLayer, { fireTrail, clearTrail } from '@/components/FootprintTrail';

type Section = 'work' | 'about' | 'contact';
const validSections: Section[] = ['work', 'about', 'contact'];

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
