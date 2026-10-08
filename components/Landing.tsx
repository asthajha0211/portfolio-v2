'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { pageData } from '@/data/page';

const STAGGER = 0.055;
const MOBILE_QUERY = '(max-width: 767px)';

// Committed drag offsets, kept at module scope in plain JS memory (not
// sessionStorage, not component state). This survives Landing unmounting and
// remounting as the user navigates between routes (e.g. into a project page
// and back) client-side, because the module stays loaded in the tab for the
// whole session — but it resets to the default static layout on an actual
// full page reload / reopen, since that re-evaluates the module from scratch.
// Desktop-only: mobile doodles are static, so this is never written to there.
const doodleOffsets: Record<number, { x: number; y: number }> = {};

// The one clip art item that bounces on first load, as a nudge that it (and
// everything else here) can be dragged around. It only bounces once per
// session — same module-scope-memory reasoning as doodleOffsets above — and
// stops for good the moment the user hovers or drags it. Desktop-only.
const FEATURED_DOODLE_SRC = '/assets/landing/planet-earth.svg';
let bounceSeen = false;

// The "best experienced on desktop" notice, shown once per session on mobile.
let mobileNoticeSeen = false;

interface LandingProps {
  entered: boolean;
  onEnter: () => void;
  landKey: number;
}

export default function Landing({ entered, onEnter, landKey }: LandingProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  // Debug-only: visit with ?arrange=1 to drag doodles freely at any viewport
  // size and export the result — used to hand-place the mobile layout without
  // guessing coordinates blind. Not linked from anywhere in the real site.
  const arrangeMode = searchParams.get('arrange') === '1';

  const [isMobile, setIsMobile] = useState(false);
  const [mobileNoticeDismissed, setMobileNoticeDismissed] = useState(() => mobileNoticeSeen);
  const [bounceActive, setBounceActive] = useState(() => !bounceSeen);
  const [hintShown, setHintShown] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const dismissBounce = useCallback(() => {
    if (bounceSeen) return;
    bounceSeen = true;
    setBounceActive(false);
  }, []);

  const dismissMobileNotice = useCallback(() => {
    mobileNoticeSeen = true;
    setMobileNoticeDismissed(true);
  }, []);

  // Detect mobile/narrow viewports client-side only, after mount — reading
  // matchMedia during render would risk a hydration mismatch on this static
  // export (the server has no notion of viewport width).
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Same full doodle set on mobile — just shrunk, so nothing is dropped from
  // the composition. Positions are already spread left-to-right across both
  // the top and bottom bands (this is a "sky above, ground below" layout, not
  // a left/right one), so a taller portrait viewport just gives the existing
  // top/bottom clusters more room to breathe — only the pixel size needs to
  // come down to fit a narrower width.
  const doodles = pageData.doodles;
  const featuredIndex = doodles.findIndex((d) => d.src === FEATURED_DOODLE_SRC);

  // Doodle drag logic — desktop only; mobile doodles are static, per design.
  // Bound once per (non-mobile) mount; offsets are re-read from doodleOffsets
  // on every render (see the style calc below) so unrelated re-renders
  // elsewhere in the app never wipe a dragged position.
  useEffect(() => {
    if (isMobile && !arrangeMode) return;
    const root = layerRef.current;
    if (!root) return;

    const sel = '[data-doodle]';
    const base: Record<number, string> = {};

    root.querySelectorAll<HTMLElement>(sel).forEach((el, i) => {
      el.dataset.di = String(i);
      el.style.cursor = 'grab';
      el.style.touchAction = 'none';
      if (el.tagName === 'IMG') (el as HTMLImageElement).draggable = false;
      base[i] = el.dataset.rotate || '';
    });

    let cur: HTMLElement | null = null;
    let curIdx = -1;
    let sx = 0, sy = 0, ox = 0, oy = 0, moved = false;

    const down = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(sel);
      if (!el || !root.contains(el)) return;
      cur = el;
      curIdx = +el.dataset.di!;
      sx = e.clientX;
      sy = e.clientY;
      moved = false;
      const o = doodleOffsets[curIdx] || { x: 0, y: 0 };
      ox = o.x;
      oy = o.y;
      el.style.cursor = 'grabbing';
      el.style.zIndex = '999';
      e.preventDefault();
    };
    const move = (e: PointerEvent) => {
      if (!cur) return;
      const dx = ox + (e.clientX - sx);
      const dy = oy + (e.clientY - sy);
      if (Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) > 2) moved = true;
      cur.style.transform = `translate(${dx}px,${dy}px) ${base[curIdx]}`;
      if (moved) doodleOffsets[curIdx] = { x: dx, y: dy };
    };
    const up = () => {
      if (!cur) return;
      if (!moved) delete doodleOffsets[curIdx];
      else if (curIdx === featuredIndex) dismissBounce();
      cur.style.cursor = 'grab';
      cur = null;
      curIdx = -1;
    };

    root.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);

    return () => {
      root.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [dismissBounce, isMobile, arrangeMode, featuredIndex]);

  // Scroll to enter — desktop: wheel.
  const onEnterRef = useRef(onEnter);
  onEnterRef.current = onEnter;

  const handleWheel = useCallback((e: WheelEvent) => {
    if (e.deltaY > 0) onEnterRef.current();
  }, []);

  useEffect(() => {
    if (entered) return;
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [entered, handleWheel]);

  // Scroll to enter — touch: swipe up. Fires mid-gesture once the threshold
  // is crossed (not on touchend) to match the immediacy of the wheel handler
  // above, which enters on the very first tick. Ignores touches starting on
  // a doodle (so dragging one can never also count as a swipe) and requires
  // a dominantly-vertical gesture. Held off entirely while the mobile notice
  // is still showing, so a swipe can't dismiss the splash before it's seen.
  useEffect(() => {
    if (entered || arrangeMode || (isMobile && !mobileNoticeDismissed)) return;

    let sx = 0;
    let sy = 0;
    let tracking = false;
    let fired = false;

    const start = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      if ((e.target as HTMLElement).closest('[data-doodle]')) {
        tracking = false;
        return;
      }
      sx = t.clientX;
      sy = t.clientY;
      tracking = true;
      fired = false;
    };
    const move = (e: TouchEvent) => {
      if (!tracking || fired) return;
      const t = e.touches[0];
      if (!t) return;
      const dx = t.clientX - sx;
      const dy = t.clientY - sy;
      if (-dy > 70 && -dy > Math.abs(dx) * 1.5) {
        fired = true;
        tracking = false;
        onEnterRef.current();
      }
    };
    const end = () => {
      tracking = false;
    };

    window.addEventListener('touchstart', start, { passive: true });
    window.addEventListener('touchmove', move, { passive: true });
    window.addEventListener('touchend', end, { passive: true });
    window.addEventListener('touchcancel', end, { passive: true });

    return () => {
      window.removeEventListener('touchstart', start);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', end);
      window.removeEventListener('touchcancel', end);
    };
  }, [entered, isMobile, arrangeMode, mobileNoticeDismissed]);

  const copyArrangedPositions = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const data = doodles.map((d) => {
      const i = doodles.indexOf(d);
      const off = doodleOffsets[i] || { x: 0, y: 0 };
      const left = parseFloat(d.left) + (off.x / vw) * 100;
      const top = parseFloat(d.top) + (off.y / vh) * 100;
      return { src: d.src, mobileLeft: `${left.toFixed(2)}%`, mobileTop: `${top.toFixed(2)}%` };
    });
    const text = JSON.stringify(data, null, 2);
    // Always logged too, in case clipboard permissions are blocked.
    // eslint-disable-next-line no-console
    console.log(text);
    navigator.clipboard
      .writeText(text)
      .then(() => setCopyStatus('copied'))
      .catch(() => setCopyStatus('error'));
  }, [doodles]);

  const text = pageData.landingText;
  const words = text.split(' ');
  let charIndex = 0;

  const totalChars = text.length;
  const cueDelay = STAGGER * totalChars + 0.8;
  const bounceDelay = STAGGER * totalChars + 0.4;

  return (
    <div
      ref={layerRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#ffffff',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        touchAction: 'none',
        transition: 'transform 0.9s cubic-bezier(0.7, 0, 0.2, 1), opacity 0.9s ease',
        transform: entered ? 'translateY(-100%)' : 'translateY(0)',
        opacity: entered ? 0 : 1,
        pointerEvents: entered ? 'none' : 'auto',
      }}
    >
      {/* Doodles */}
      {doodles.map((d, i) => {
        const rotate = d.rotation ? `rotate(${d.rotation}deg)` : '';
        const offset = isMobile ? undefined : doodleOffsets[i];
        const transform = offset
          ? `translate(${offset.x}px,${offset.y}px) ${rotate}`
          : rotate || undefined;
        const isFeatured = !isMobile && i === featuredIndex;
        const width = isMobile ? Math.max(18, Math.round(d.width * 0.6)) : d.width;
        const left = isMobile && d.mobileLeft ? d.mobileLeft : d.left;
        const top = isMobile && d.mobileTop ? d.mobileTop : d.top;

        const img = (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            data-doodle
            data-rotate={rotate}
            src={d.src}
            alt=""
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              opacity: d.opacity,
              transform,
            }}
            aria-hidden="true"
          />
        );

        return (
          <div
            key={i}
            onMouseEnter={() => {
              if (isMobile) return;
              setHintShown(true);
              dismissBounce();
            }}
            style={{
              position: 'absolute',
              left,
              top,
              width: `${width}px`,
              transition: 'transform 0.2s ease',
              animation: isFeatured && bounceActive
                ? `doodleBounce 1.3s ease-in-out ${bounceDelay.toFixed(2)}s infinite`
                : undefined,
            }}
          >
            {img}
          </div>
        );
      })}

      {/* Centered text */}
      <div
        style={{
          position: 'absolute',
          left: '5vw',
          right: '5vw',
          top: '50%',
          transform: 'translateY(-50%)',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          key={`text-${landKey}`}
          className="font-cursive"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            lineHeight: 1.3,
            color: '#000',
            textAlign: 'center',
            margin: '0 auto',
            maxWidth: '90vw',
          }}
        >
          {words.map((word, wi) => {
            const chars = word.split('').map((ch) => {
              const idx = charIndex++;
              return (
                <span
                  key={idx}
                  style={{
                    display: 'inline-block',
                    opacity: 0,
                    animation: 'inkIn 0.6s ease forwards',
                    animationDelay: `${(STAGGER * idx).toFixed(3)}s`,
                  }}
                >
                  {ch}
                </span>
              );
            });
            charIndex++; // count the space
            return (
              <span key={wi} style={{ whiteSpace: 'nowrap' }}>
                {chars}
                {wi < words.length - 1 && <span> </span>}
              </span>
            );
          })}
        </div>
        <div
          style={{
            marginTop: '22px',
            textAlign: 'center',
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            letterSpacing: '1px',
            color: '#b8b8b8',
            opacity: hintShown ? 1 : 0,
            transition: 'opacity 0.25s ease',
          }}
        >
          psst, you can move the clip arts wherever you want
        </div>
      </div>

      {/* Scroll cue — hidden in arrange mode, since its tap target sits over
          doodles and gets in the way of selecting/dragging them */}
      {!arrangeMode && (
      <div
        key={`cue-${landKey}`}
        onClick={onEnter}
        style={{
          position: 'absolute',
          bottom: 'calc(64px + env(safe-area-inset-bottom))',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          opacity: 0,
          animation: `cueIn 1s ease forwards`,
          animationDelay: `${cueDelay.toFixed(2)}s`,
          pointerEvents: 'auto',
        }}
      >
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            letterSpacing: '2px',
            textTransform: 'lowercase',
            color: '#000',
          }}
        >
          scroll now
        </span>
        <svg
          style={{ animation: 'bounceArrow 1.9s ease-in-out infinite' }}
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5 v14 M6 13 l6 6 l6 -6" />
        </svg>
      </div>
      )}

      {/* "Best experienced on desktop" notice — mobile only, once per session,
          skipped entirely in arrange mode so it doesn't get in the way */}
      {isMobile && !mobileNoticeDismissed && !arrangeMode && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            background: 'rgba(255,255,255,0.97)',
          }}
        >
          <div
            style={{
              border: '2px solid #000',
              background: '#fff',
              padding: '28px 24px',
              maxWidth: '320px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#8a8a8a',
                margin: '0 0 12px',
              }}
            >
              heads up
            </p>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                lineHeight: 1.6,
                color: '#000',
                margin: '0 0 22px',
              }}
            >
              this site is best experienced on desktop. a few things, like dragging the clip art
              around, won’t work the same way here.
            </p>
            <button
              onClick={dismissMobileNotice}
              style={{
                border: '2px solid #000',
                background: '#000',
                color: '#fff',
                padding: '10px 20px',
                fontSize: '12px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              continue anyway
            </button>
          </div>
        </div>
      )}

      {/* Arrange-mode toolbar — ?arrange=1 only, never shown in the real site.
          Sits just below the heading rather than in a corner, so it doesn't
          sit on top of doodles you're trying to drag into place. */}
      {arrangeMode && (
        <div
          style={{
            position: 'fixed',
            top: 'calc(50% + 90px)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <button
            onClick={copyArrangedPositions}
            style={{
              border: '2px solid #000',
              background: '#000',
              color: '#fff',
              padding: '10px 16px',
              fontSize: '12px',
              letterSpacing: '0.5px',
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
            }}
          >
            {copyStatus === 'copied' ? 'copied!' : copyStatus === 'error' ? 'copy failed — see console' : 'copy positions'}
          </button>
          <span
            style={{
              fontSize: '11px',
              fontFamily: 'Inter, sans-serif',
              color: '#8a8a8a',
              background: '#fff',
              border: '1px solid #e0e0e0',
              padding: '4px 8px',
            }}
          >
            drag mode — ?arrange=1
          </span>
        </div>
      )}
    </div>
  );
}
