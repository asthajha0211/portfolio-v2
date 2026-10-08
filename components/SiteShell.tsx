'use client';

import { Suspense, useState, useEffect, useCallback, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Landing from './Landing';
import TopChrome from './TopChrome';
import FootprintLayer, { fireTrail, clearTrail } from './FootprintTrail';

type Section = 'work' | 'about' | 'contact';

function sectionFromPathname(pathname: string): Section {
  if (pathname.startsWith('/about')) return 'about';
  if (pathname.startsWith('/contact')) return 'contact';
  return 'work';
}

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Project detail pages (/work/<slug>) bring their own top bar and back
  // link, and don't use the Landing splash or the TopChrome nav at all.
  const isDetailPage = pathname.startsWith('/work/');

  const [entered, setEntered] = useState(() => pathname !== '/');
  const [menuOpen, setMenuOpen] = useState(false);
  const [landKey, setLandKey] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // Landing directly on a content route (a shared link, a bookmark, browser
  // back/forward) skips the splash — only "/" itself shows it.
  useEffect(() => {
    if (pathname !== '/') setEntered(true);
  }, [pathname]);

  const section = sectionFromPathname(pathname);
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
    setMenuOpen(false);
    router.push('/work');
  }, [router]);

  const handleNav = useCallback(
    (key: string) => {
      setMenuOpen(false);
      if (key === 'home') {
        setEntered(false);
        setLandKey((k) => k + 1);
        router.push('/');
      } else {
        setEntered(true);
        fireTrail();
        router.push(`/${key}`);
      }
      window.scrollTo(0, 0);
    },
    [router],
  );

  if (isDetailPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Suspense fallback={null}>
        <Landing entered={entered} onEnter={handleEnter} landKey={landKey} />
      </Suspense>
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
        {children}
      </main>
    </>
  );
}
