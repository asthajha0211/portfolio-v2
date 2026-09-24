'use client';

const PAW_SVG = '<path d="M22 8 C30 4 44 3 54 6 C63 8 66 13 64 18 C62 24 52 26 42 25 C34 24 28 22 23 20 C19 18 18 10 22 8 Z" fill="#111111"></path><path d="M5 13 C9 11 14 11 15 14 C16 17 15 22 12 23 C8 24 4 22 3 19 C2 16 2 14 5 13 Z" fill="#111111"></path>';

let trailTimer: ReturnType<typeof setTimeout> | null = null;

export function fireTrail() {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const layer = document.getElementById('footstep-layer');
  if (!layer) return;
  layer.innerHTML = '';

  const w = window.innerWidth;
  const h = window.innerHeight;
  const n = 16;

  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const x = 60 + t * (w - 170);
    const y = h * 0.72 - t * h * 0.42 + (i % 2 === 0 ? 26 : -8);

    const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    el.setAttribute('viewBox', '0 0 68 30');
    el.setAttribute('width', '46');
    el.setAttribute('aria-hidden', 'true');
    el.style.cssText = `position:absolute;left:${Math.round(x)}px;top:${Math.round(y)}px;opacity:0;transform:rotate(-22deg);`;
    el.innerHTML = PAW_SVG;
    layer.appendChild(el);

    el.animate(
      [
        { opacity: 0 },
        { opacity: 0.75, offset: 0.12 },
        { opacity: 0.75, offset: 0.62 },
        { opacity: 0 },
      ],
      {
        duration: 2200,
        delay: i * 95,
        easing: 'ease-in-out',
        fill: 'both',
      },
    );
  }

  if (trailTimer) clearTimeout(trailTimer);
  trailTimer = setTimeout(() => {
    layer.innerHTML = '';
  }, 2200 + n * 95 + 300);
}

export function clearTrail() {
  if (typeof window === 'undefined') return;
  const layer = document.getElementById('footstep-layer');
  if (layer) layer.innerHTML = '';
  if (trailTimer) {
    clearTimeout(trailTimer);
    trailTimer = null;
  }
}

export default function FootprintLayer() {
  return (
    <div
      id="footstep-layer"
      style={{ position: 'fixed', inset: 0, zIndex: 40, pointerEvents: 'none' }}
    />
  );
}
