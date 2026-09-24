# Portfolio Site — Implementation Plan

## 1. File Tree

```
├── next.config.ts                    # Static export config (output: 'export', images: unoptimized)
├── tailwind.config.ts                # Custom colors, fonts, spacing tokens
├── tsconfig.json                     # TypeScript config
├── package.json                      # Dependencies
├── postcss.config.mjs                # Tailwind PostCSS plugin
│
├── data/
│   ├── types.ts                      # Project type definition
│   ├── page.ts                       # All non-project copy: nav labels, about paragraphs, contact intro, social links, resume URL, landing text, doodle positions, tagOrder
│   └── projects/
│       ├── index.ts                  # Barrel — ordered array of all projects
│       ├── ledger-rewrite.ts         # One file per project
│       ├── onboarding-v2.ts
│       ├── why-latency-lies.ts
│       ├── search-revamp.ts
│       ├── pricing-page-teardown.ts
│       ├── kathak-archive.ts
│       ├── design-tokens-pipeline.ts
│       ├── retention-teardown.ts
│       ├── field-notes-goa.ts
│       └── roadmap-rituals.ts
│
├── app/
│   ├── layout.tsx                    # Root layout: Google Fonts (Inter + Cedarville Cursive), global styles
│   ├── globals.css                   # Tailwind directives + keyframes (inkIn, cueIn, bounceArrow, stepIn)
│   ├── page.tsx                      # Landing + single-page app shell (work, about, contact sections)
│   └── work/
│       └── [slug]/
│           └── page.tsx              # Project case study page with generateStaticParams
│
├── components/
│   ├── Landing.tsx                   # Full-viewport overlay: letter animation, scroll cue, doodles, drag logic
│   ├── TopChrome.tsx                 # Fixed nav, [marauder's map] toggle, [resume] link, white top bar
│   ├── WorkSection.tsx               # "my projects" heading, filter chips, project grid
│   ├── ProjectCard.tsx               # Single project card (image area, tag badge, title, blurb, open button)
│   ├── AboutSection.tsx              # Cursive heading, paragraphs (via react-markdown), illustration
│   ├── ContactSection.tsx            # Heading, intro, social icons row, illustration
│   ├── FootprintTrail.tsx            # Imperative paw-print animation layer (Web Animations API)
│   └── MarkdownProse.tsx             # Thin wrapper around react-markdown + remark-gfm
│
├── public/
│   └── assets/
│       ├── landing/
│       │   ├── star-1.svg            # Small 4-point star (repeated 5× with different sizes/opacities)
│       │   ├── coffee-cup.svg        # Coffee/tea cup
│       │   ├── plant.svg             # Potted plant
│       │   ├── cat-ears.svg          # Cat ears silhouette
│       │   ├── cloud-1.svg           # Cloud shape (repeated 3×)
│       │   ├── water-bottle.svg      # Water bottle / tumbler
│       │   ├── sun-face.svg          # Sun with face
│       │   ├── book-shelf.svg        # Bookshelf
│       │   ├── notebook.svg          # Spiral notebook with girl
│       │   ├── flower-yellow.svg     # Yellow 5-petal flower
│       │   ├── flower-pink.svg       # Pink 5-petal flower
│       │   ├── flower-white.svg      # White 5-petal flower
│       │   ├── boat.svg              # Boat on waves with sun
│       │   ├── cherry.svg            # Cherry/acorn on branch
│       │   ├── whale.svg             # Whale
│       │   ├── ice-cream.svg         # Ice cream cone
│       │   ├── castle.svg            # Sandcastle
│       │   ├── tacos.svg             # Taco
│       │   ├── umbrella.svg          # Beach umbrella
│       │   ├── people.svg            # Stick figures
│       │   ├── moon.svg              # Crescent moon
│       │   ├── buildings.svg         # Buildings with flag
│       │   ├── pie.svg               # Pie/pastry
│       │   ├── paw.svg               # Paw print glyph (used by footprint trail)
│       │   ├── planet-saturn.svg     # Saturn doodle
│       │   ├── planet-jupiter.svg    # Jupiter doodle
│       │   ├── planet-earth.svg      # Earth doodle
│       │   ├── planet-uranus.svg     # Uranus doodle
│       │   ├── planet-neptune.svg    # Neptune doodle
│       │   ├── planet-pluto.svg      # Pluto doodle
│       │   ├── planet-mars.svg       # Mars doodle
│       │   ├── planet-venus.svg      # Venus doodle
│       │   ├── planet-mercury.svg    # Mercury doodle
│       │   └── flower-painting.png   # Flower painting image (uploads/pasted-1784189851024-0.png)
│       ├── about/
│       │   └── illustration.png      # "illustration self 2.png" — girl on ledge
│       ├── contact/
│       │   ├── illustration.png      # Girl reading with cat
│       │   ├── email.svg
│       │   ├── twitter.svg
│       │   ├── linkedin.svg
│       │   ├── substack.svg
│       │   ├── medium.svg
│       │   └── github.svg
│       └── work/                     # Project card images (to be added later)
```

---

## 2. TypeScript Types

```ts
// data/types.ts

export interface Project {
  slug: string;
  title: string;
  blurb: string;
  tag: string;
  image: string;       // path relative to /assets/work/, e.g. "ledger-rewrite.png"
  imageAlt: string;
  date: string;        // e.g. "2024-03" — for optional sorting, not displayed
  body: string;        // markdown template literal
}
```

```ts
// data/page.ts — shape

export interface SocialLink {
  label: string;       // aria-label, e.g. "email"
  url: string;
  icon: string;        // path to SVG, e.g. "/assets/contact/email.svg"
}

export interface DoodleItem {
  src: string;         // path to SVG or PNG, e.g. "/assets/landing/star-1.svg"
  left: string;        // CSS percentage, e.g. "13.09%"
  top: string;
  width: number;       // px
  rotation: number;    // degrees, 0 if none
  opacity: number;     // 0–1
}

export interface PageData {
  siteTitle: string;                   // "astha jha"
  landingText: string;                 // "welcome to my little corner of the world"
  navLabels: string[];                 // ["home", "work", "about", "contact"]
  tagOrder: string[];                  // ["tech", "product", "blogs", "misc"]

  work: {
    heading: string;                   // "my projects"
  };

  about: {
    heading: string;                   // "welcome to my little corner of the world!"
    paragraphs: string[];              // 4 markdown strings (last has [here](#contact) link)
    illustrationSrc: string;           // "/assets/about/illustration.png"
    illustrationAlt: string;
  };

  contact: {
    heading: string;                   // "say hello!"
    intro: string;
    socialLinks: SocialLink[];
    illustrationSrc: string;           // "/assets/contact/illustration.png"
    illustrationAlt: string;
  };

  resume: {
    heading: string;                   // "resume"
    description: string;
    linkText: string;                  // "view resume"
    linkUrl: string;
  };

  doodles: DoodleItem[];
}

export const pageData: PageData = { /* ... */ };
```

---

## 3. Example Project Data File

```ts
// data/projects/ledger-rewrite.ts

import { Project } from '../types';

const project: Project = {
  slug: 'ledger-rewrite',
  title: 'ledger rewrite',
  blurb: 'rebuilt the billing core for a fintech platform.',
  tag: 'tech',
  image: 'ledger-rewrite.png',
  imageAlt: 'Screenshot of the ledger rewrite project',
  date: '2024-06',
  body: `
## Overview

Rebuilt the billing core for a fintech platform, replacing a fragile legacy
system with an event-sourced ledger that handles double-entry accounting.

## Problem

The original billing pipeline was a chain of cron jobs writing to a single
Postgres table. Edge cases (refunds, prorations, currency conversions) were
patched in with conditional logic until the code was unreadable and the
month-end reconciliation took two engineers a full day.

## Approach

- Modeled every financial mutation as an immutable event
- Built a projection layer that materializes balances on demand
- Added idempotency keys so retries never double-charge

## Results

- Month-end reconciliation went from ~8 hours to < 5 minutes (automated)
- Zero billing disputes in the three months after launch
- New payment methods can be added by writing a single event handler
`,
};

export default project;
```

```ts
// data/projects/index.ts

import ledgerRewrite from './ledger-rewrite';
import onboardingV2 from './onboarding-v2';
import whyLatencyLies from './why-latency-lies';
import searchRevamp from './search-revamp';
import pricingPageTeardown from './pricing-page-teardown';
import kathakArchive from './kathak-archive';
import designTokensPipeline from './design-tokens-pipeline';
import retentionTeardown from './retention-teardown';
import fieldNotesGoa from './field-notes-goa';
import roadmapRituals from './roadmap-rituals';

// Display order — add new projects here
export const projects = [
  ledgerRewrite,
  onboardingV2,
  whyLatencyLies,
  searchRevamp,
  pricingPageTeardown,
  kathakArchive,
  designTokensPipeline,
  retentionTeardown,
  fieldNotesGoa,
  roadmapRituals,
];
```

**Authoring experience**: To add a project, create `data/projects/my-new-project.ts` with the same shape, import it in `index.ts`, and add it to the array. One line, one file. The filter chip appears automatically if the tag is new.

---

## 4. Derived Filters + tagOrder Logic

```ts
// Inside WorkSection.tsx

import { projects } from '@/data/projects';
import { pageData } from '@/data/page';

function useFilters() {
  const rawTags = [...new Set(projects.map(p => p.tag.toLowerCase()))];
  const { tagOrder = [] } = pageData;

  // Tags in tagOrder come first (in that order), then remaining tags alphabetically
  const ordered = [
    ...tagOrder.filter(t => rawTags.includes(t)),
    ...rawTags.filter(t => !tagOrder.includes(t)).sort(),
  ];

  return ['all', ...ordered];
}

// If tagOrder is missing or stale (e.g. references a tag no longer used),
// .filter(t => rawTags.includes(t)) silently drops it — the page never breaks.
// If tagOrder is empty, all tags sort alphabetically.
```

Filtering:
```ts
const visible = activeFilter === 'all'
  ? projects
  : projects.filter(p => p.tag.toLowerCase() === activeFilter);
```

---

## 5. Landing Transition + Footprint Trail — CSS vs Framer Motion

### Landing Overlay Exit

**Approach: Pure CSS transitions.**

The overlay is a fixed `div` with:
```css
transition: transform 0.9s cubic-bezier(0.7, 0, 0.2, 1), opacity 0.9s ease;
```

When `entered` flips to `true`, we toggle classes that set `transform: translateY(-100%)` and `opacity: 0`, then after the transition ends, `pointer-events: none`. This is a single property toggle — CSS handles it perfectly. No library needed.

### Letter-by-letter Reveal

**Approach: CSS `@keyframes inkIn` with staggered `animation-delay`.**

Each character is an `inline-block` `<span>` with:
```css
opacity: 0;
animation: inkIn 0.6s ease forwards;
animation-delay: calc(var(--i) * 0.055s);
```

The delay index is computed at render time and set as an inline style. When `[home]` is clicked, we bump a `key` on the container to force React to remount it, replaying the CSS animation from scratch.

### Scroll Cue + Hint

Same pattern: CSS `@keyframes cueIn` with a computed delay based on total character count.

### Footprint Trail

**Approach: Imperative DOM + Web Animations API (no Framer Motion).**

This is the one animation where CSS-only or declarative React doesn't work well:
- 16 paw prints must be created, animated, and removed
- Re-triggering on repeated nav clicks requires fresh DOM nodes (React's reconciler will reuse keyed nodes and skip replay)
- The Web Animations API gives us `element.animate()` with the exact keyframes from the spec, individual delays, and auto-cleanup

Implementation (in `FootprintTrail.tsx`):
```ts
export function fireTrail() {
  const layer = document.getElementById('footstep-layer');
  if (!layer) return;
  layer.innerHTML = '';
  const w = window.innerWidth, h = window.innerHeight;
  const n = 16;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const x = 60 + t * (w - 170);
    const y = h * 0.72 - t * h * 0.42 + (i % 2 === 0 ? 26 : -8);
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    // ... set attributes, innerHTML = paw path ...
    el.style.cssText = `position:absolute;left:${x}px;top:${y}px;opacity:0;transform:rotate(-22deg);`;
    layer.appendChild(el);
    el.animate(
      [{ opacity: 0 }, { opacity: 0.75, offset: 0.12 }, { opacity: 0.75, offset: 0.62 }, { opacity: 0 }],
      { duration: 2200, delay: i * 95, easing: 'ease-in-out', fill: 'both' }
    );
  }
  setTimeout(() => { layer.innerHTML = ''; }, 2200 + n * 95 + 300);
}
```

**Why not Framer Motion?** All animations here are either:
- Simple CSS transitions (overlay, hover states, nav fades)
- CSS keyframe animations (letter reveal, scroll cue)
- Imperative DOM manipulation (footprint trail — React state doesn't help here)

Framer Motion would add ~30KB gzipped for no benefit. The entire animation layer stays under 2KB of custom code.

### Doodle Drag

Imperative pointer events on the landing layer. Positions persisted to `sessionStorage` under key `doodlePos`. Each doodle is an `<img>` tag referencing the extracted SVG file from `public/assets/landing/`. `cursor: grab` / `grabbing`, dragged item gets `z-index: 999`.

### prefers-reduced-motion

All CSS animations wrapped in:
```css
@media (prefers-reduced-motion: no-preference) {
  /* animations here */
}
```

The footprint trail checks `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and skips if true. Letter reveal shows all characters immediately with `opacity: 1` and no animation.

---

## 6. Build & Deploy Steps

```bash
# Install
npm install

# Dev
npm run dev          # http://localhost:3000

# Build static export
npm run build        # Outputs to `out/`

# Preview locally
npx serve out

# Deploy to Vercel
# - Push to GitHub
# - Connect repo in Vercel dashboard
# - Framework: Next.js (auto-detected)
# - Output: static (auto-detected from next.config.ts)

# Deploy to GitHub Pages (alternative)
# - npm run build
# - Push `out/` to gh-pages branch, or use GitHub Actions
```

`next.config.ts`:
```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

---

## 7. Open Questions + Design Notes

### Questions for you

1. **Project content**: The 10 projects in the prototype have placeholder titles/blurbs. Should I use those exact titles and blurbs as-is, or will you provide real project content before I start building? (I'll use the prototype content as defaults either way.)

2. **Social URLs**: The contact icons all point to `#`. Do you have the real URLs for email, Twitter, LinkedIn, Substack, Medium, and GitHub? I'll leave them as `#` placeholders in `data/page.ts` if not.

3. **Resume link**: Same — do you have a URL for the resume PDF, or should I leave a placeholder?

4. **Project card images**: These are grey placeholders in the prototype. Will you provide images, or should I keep the placeholder styling for now?

5. **Case study body layout**: The spec says "layout for those is not yet designed." I'll build a sensible prose column (max ~68ch, 17px/1.7 line-height, markdown-rendered) as a starting point. Want any specific layout elements (hero image, metadata sidebar, table of contents)?

6. **The flower painting** on the landing (`pasted-1784189851024-0.png`): This is an `<img>` positioned at `left: 89.54%; top: 33.56%; width: 132px`. Is this intentional content or a design-tool artifact? I'll include it as a doodle entry in `data/page.ts` either way.

7. **Font weight 600**: The Google Fonts link loads Inter weights 400, 500, 600, but the spec only references 400, 500, 700. Should I load 700 instead of 600 (or load all three: 500, 600, 700)?

### Design observations

- **No border-radius or shadows anywhere** — noted and respected. Every element is sharp-cornered.
- **The about illustration is `position: fixed`** — it stays pinned to the bottom-left while the about text scrolls. Same for the contact illustration (pinned bottom-right). This means on short viewports they may overlap text. I'll add a responsive breakpoint that hides or shrinks them below 768px.
- **Chrome fade on about**: The nav, marauder's map, and resume links fade out when the user scrolls past 90px on the about section. I'll use an `IntersectionObserver` or scroll listener scoped to the about section, not global scroll position, so it doesn't trigger on other sections.
- **The `[home]` nav item returns to landing and replays the letter animation** — I'll use a React `key` bump on the Landing component to force remount, same approach as the prototype.
- **Doodle clip-path IDs** in the prototype (e.g., `bdmclip`, `psat`, `pjup`) are not globally unique. When extracting to individual SVG files, I'll namespace them per file to avoid collisions.
