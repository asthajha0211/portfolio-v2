'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { pageData } from '@/data/page';

const STAGGER = 0.055;

// Committed drag offsets, kept at module scope in plain JS memory (not
// sessionStorage, not component state). This survives Landing unmounting and
// remounting as the user navigates between routes (e.g. into a project page
// and back) client-side, because the module stays loaded in the tab for the
// whole session — but it resets to the default static layout on an actual
// full page reload / reopen, since that re-evaluates the module from scratch.
const doodleOffsets: Record<number, { x: number; y: number }> = {};

// The one clip art item that bounces on first load, as a nudge that it (and
// everything else here) can be dragged around. It only bounces once per
// session — same module-scope-memory reasoning as doodleOffsets above — and
// stops for good the moment the user hovers or drags it.
const FEATURED_DOODLE_SRC = '/assets/landing/planet-earth.svg';
const featuredIndex = pageData.doodles.findIndex((d) => d.src === FEATURED_DOODLE_SRC);
let bounceSeen = false;

interface LandingProps {
  entered: boolean;
  onEnter: () => void;
  landKey: number;
}

export default function Landing({ entered, onEnter, landKey }: LandingProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  const [bounceActive, setBounceActive] = useState(() => !bounceSeen);
  const [hintShown, setHintShown] = useState(false);
  const dismissBounce = useCallback(() => {
    if (bounceSeen) return;
    bounceSeen = true;
    setBounceActive(false);
  }, []);

  // Doodle drag logic — bound once; offsets are re-read from doodleOffsets on
  // every render (see the style calc below) so unrelated re-renders elsewhere
  // in the app never wipe a dragged position.
  useEffect(() => {
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
  }, [dismissBounce]);

  // Scroll to enter
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
        transition: 'transform 0.9s cubic-bezier(0.7, 0, 0.2, 1), opacity 0.9s ease',
        transform: entered ? 'translateY(-100%)' : 'translateY(0)',
        opacity: entered ? 0 : 1,
        pointerEvents: entered ? 'none' : 'auto',
      }}
    >
      {/* Doodles */}
      {pageData.doodles.map((d, i) => {
        const rotate = d.rotation ? `rotate(${d.rotation}deg)` : '';
        const offset = doodleOffsets[i];
        const transform = offset
          ? `translate(${offset.x}px,${offset.y}px) ${rotate}`
          : rotate || undefined;
        const isFeatured = i === featuredIndex;

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
              setHintShown(true);
              dismissBounce();
            }}
            style={{
              position: 'absolute',
              left: d.left,
              top: d.top,
              width: `${d.width}px`,
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

      {/* Scroll cue */}
      <div
        key={`cue-${landKey}`}
        onClick={onEnter}
        style={{
          position: 'absolute',
          bottom: '64px',
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
    </div>
  );
}
