# Handoff: Personal Portfolio Site

## Overview
A single-page personal portfolio for Astha Jha, with a scroll-to-enter landing screen, four in-page sections (home, work, about, contact), a resume page, and per-project case study pages. The visual language is deliberately eclectic: a clean monochrome Inter grid for work, a handwriting-font about page with illustrated characters, and a doodle-covered landing screen.

## About the Design Files
The files in `reference/` are **design references created in HTML** — a prototype showing intended look and behavior, not production code to copy. `reference/Portfolio.dc.html` uses a custom template runtime (`<x-dc>`, `<sc-for>`, `<sc-if>`, `support.js`); ignore that runtime entirely. The task is to **recreate the design in Next.js + TypeScript + Tailwind** following the architecture in `CLAUDE_CODE_PROMPT.md`.

Open the HTML file directly in a browser to see the real behavior — especially the landing transition, the footprint trail, and the hover states.

## Fidelity
**High-fidelity.** Colors, type sizes, spacing, and interactions are final. Recreate pixel-faithfully. Two exceptions:
- Project card images are grey `image` placeholders. Real images go in `public/assets/work/`.
- Project case study page bodies are unbuilt (`case study layout coming soon` placeholder). Layout for those is still open.

## Screens / Views

### 1. Landing (`entered: false`)
Full-viewport white overlay, `z-index: 50`, centered content, `overflow: hidden`.

- **Headline**: the landing line, animated in letter by letter. Each character is `display: inline-block; opacity: 0` with `inkIn 0.6s ease forwards`, staggered `0.055s` per character (spaces count toward the stagger). `inkIn`: `from { opacity: 0; transform: translateY(7px) } to { opacity: 1; transform: none }`.
- **Scroll cue**: `position: absolute; bottom: 64px; left: 50%; translateX(-50%)`, column flex, `gap: 10px`, cursor pointer. Fades in via `cueIn 1s ease forwards` at delay `stagger × textLength + 0.8s`. Contains a downward arrow animating `bounceArrow` (`0%,100% translateY(0); 50% translateY(7px)`).
- **Hint text**: `margin-top: 22px`, centered, Inter 11px, `letter-spacing: 1px`, `#b8b8b8`. Fades in at delay `stagger × textLength + 1.3s`.
- **Doodles**: ~14 inline SVG illustrations (star, coffee cup, plant, cat ears, cloud, water bottle, sun face, book, etc.) absolutely positioned by percentage with per-item rotation and opacity 0.88–0.93, widths 34–120px. Each is **draggable** by pointer; positions persist in `sessionStorage` under key `doodlePos` as `{ [index]: {x, y} }`. Cursor `grab` / `grabbing`, dragged item gets `z-index: 999`.
- **Exit**: scrolling down, or clicking the cue, sets entered. Overlay animates `transform: translateY(-100%)` and `opacity: 0` over `0.9s cubic-bezier(0.7, 0, 0.2, 1)`, then `pointer-events: none`. Entering lands on the **work** section.
- Clicking `[home]` in the nav returns to the landing and replays the letter animation (the prototype does this by bumping a key to force remount).

### 2. Top chrome (all sections)
- **`[marauder's map]`** — `position: fixed; left: 40px; top: 38px`, `z-index: 21`, Inter 12px, `letter-spacing: 1.5px`, `#8a8a8a`, hover `#000`. Toggles the nav. Fades out (`opacity 0.25s`) when the nav is open.
- **Nav** — `position: fixed; left: 40px; top: 34px`, `z-index: 22`, row flex, `align-items: baseline`, `gap: 22px`. Items `[home] [work] [about] [contact]`. Inactive: Inter 12px, weight 500, `#8a8a8a`. Active: 15px, weight 700, `#000`. Hover: `translateY(-3px)`. Nav shell animates `opacity` + `translateY(-6px → 0)` over `0.3s`.
- **`[resume]`** — `position: fixed; right: 40px; top: 38px`, `z-index: 21`, same type treatment as the marauder's map link.
- **White top bar** — `position: fixed; top: 0; left/right: 0; height: 76px; background: #fff; border-bottom: 1px solid #000; z-index: 18`. Present on the **work** and **project** views so content scrolls under it. Absent on about and contact (those pages fade the chrome instead — see Interactions).
- **Main container** — `max-width: 1080px; margin: 0 auto; padding: 128px 48px 96px; min-height: 100vh`.

### 3. Work (default section after entering)
Header row: `display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 16px; margin-bottom: 28px`.
- **`my projects`** — 40px, weight 500, `letter-spacing: -0.5px`, margin 0.
- **Filter chips**, right-aligned in a row, `gap: 22px`, baseline aligned. Inactive: Inter 12px, weight 500, `#8a8a8a`, no underline. Active: 15px, weight 700, `#000`, underline with `text-underline-offset: 5px`. Both `letter-spacing: 0.5px`, cursor pointer, `transition: color 0.15s ease`.

**Project grid**: `display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; background: #fff`. Whitespace between cards must stay white when a filter leaves gaps.

**Project card** (an `<a>`): `display: block; background: #fff; border: 2px solid #3a3a3a; color: #000; text-decoration: none`. Hover: `background: #f2f2f2`.
- **Image area**: wrapper `position: relative; border-bottom: 2px solid #3a3a3a`. Inside, `aspect-ratio: 16/10; background: #e8e8e8`, centered Inter 11px `letter-spacing: 2px` uppercase `#9a9a9a` placeholder text.
- **Tag badge**: `position: absolute; top: 0; right: 0; background: #3a3a3a; color: #fff`, Inter 10px, `letter-spacing: 1.5px`, uppercase, `padding: 6px 10px`.
- **Body**: `padding: 18px 20px 22px; display: flex; align-items: flex-start; gap: 14px`.
  - Text column (`flex: 1`): title Inter 17px weight 700 uppercase `letter-spacing: -0.2px`, `margin-bottom: 6px`; blurb Inter 13px, `line-height: 1.5`, `#6a6a6a`.
  - **Open button**: `flex: none; width: 32px; height: 32px; border: 2px solid #3a3a3a; color: #3a3a3a`, centered 14px external-link arrow SVG (`stroke-width: 2.4`, `stroke: currentColor`, path `M7 17 L17 7 M9 7 h8 v8`), `transition: background 0.15s ease, color 0.15s ease`. **On hover of anywhere on the card**: `background: #3a3a3a`, icon stroke `#fff`.
- Clicking the card opens that project's page and scrolls to top.

Prototype content (10 projects — replace with real ones):

| title | blurb | tag |
|---|---|---|
| ledger rewrite | rebuilt the billing core for a fintech platform. | tech |
| onboarding v2 | cut signup drop-off with a three step flow. | product |
| why latency lies | a short essay on averages and percentiles. | blogs |
| search revamp | query parsing and ranking for a catalog of 40k items. | tech |
| pricing page teardown | notes on how five companies frame value. | blogs |
| kathak archive | a small site cataloguing bandish and bols. | misc |
| design tokens pipeline | one source of truth from figma to production. | tech |
| retention teardown | mapping the first thirty days of a habit app. | product |
| field notes, goa | photographs and scribbles from a week off. | misc |
| roadmap rituals | how a small team plans without theatre. | product |

Tag display order: `tech, product, blogs, misc`, preceded by `all`.

### 4. Project page (`/work/[slug]`)
Has the white top bar. Header stack, tightly spaced:
- **`[back to work]`** — Inter 12px, `letter-spacing: 1.5px`, `#8a8a8a`, hover `#000`, `margin-bottom: 12px`.
- **Title** — 40px, weight 500, `letter-spacing: -0.5px`, `margin-bottom: 8px`.
- **Description row** — `display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-bottom: 34px`. Left: blurb 17px, `line-height: 1.7`, `#6a6a6a`, `max-width: 52ch`. Right (`flex: none`): tag badge, same treatment as the card badge.
- **Body area** — currently a placeholder: `aspect-ratio: 16/7; border: 2px solid #000; background: #e8e8e8`, centered uppercase 11px `#9a9a9a` text. This is where the markdown case study renders. Layout for it is not yet designed — build a sensible prose column (max ~68ch, 17px/1.7) and expect to revise.

### 5. About
- **Illustration** — `uploads/illustration self 2.png`, `position: fixed; left: 0; bottom: 0; z-index: 0; width: 30vw; max-width: 420px; pointer-events: none`. Goes to `public/assets/about/`.
- Content block `position: relative; z-index: 1; text-align: right`.
- **Heading** — `'Cedarville Cursive', cursive`, 44px, weight 400, `line-height: 1.5`, `margin-bottom: 32px`, `padding: 0 4px 6px 0`. Text: `welcome to my little corner of the world!`
- **Paragraphs** — column flex, `gap: 20px`, `max-width: 62ch`, `margin-left: auto`. Each 16px, `line-height: 1.75`, `#000`, `text-wrap: pretty`. Four paragraphs; the last contains an inline link on the word `here` (`text-decoration: underline; text-underline-offset: 3px`, `#000`) that navigates to contact. Exact copy is in `reference/Portfolio.dc.html` — copy it verbatim.
- On scroll, the top chrome (nav, marauder's map, resume) fades out on this section so it doesn't sit over the text.

### 6. Contact
- **Illustration** — `uploads/pasted-1784191130590-0.png` (girl reading with a cat), `position: fixed; right: 0; bottom: 0; width: min(46vw, 500px); pointer-events: none; z-index: 0`. Goes to `public/assets/contact/`.
- **Heading** — `say hello!`, 40px, weight 500, `letter-spacing: -0.5px`, `margin-bottom: 28px`.
- **Intro** — 17px, `line-height: 1.7`, `max-width: 46ch`, `margin-bottom: 30px`: `I'd love to hear from you and always welcome any feedback. Feel free to say hello!`
- **Social row** — row flex, `gap: 22px`, `align-items: center`. Six 24px icon links: email, twitter, linkedin, substack, medium, github. Each `display: inline-flex`, `color: #000`, `aria-label` set, hover `translateY(-3px)` over `0.15s`. **Hrefs are currently `#`** — real URLs go in `data/page.ts`. Icons should move to `public/assets/contact/*.svg`.

### 7. Resume
Heading `resume` (40px, weight 500), paragraph 17px `line-height: 1.7` `max-width: 46ch`, then a `view resume` link (17px, underline, `text-underline-offset: 4px`). Placeholder copy — real resume URL goes in `data/page.ts`.

## Interactions & Behavior
- **Footprint trail** — fires on every nav click to work / about / contact (not home). 16 paw prints drawn into a fixed full-viewport layer (`z-index: 40`, `pointer-events: none`), laid along a diagonal from bottom-left to top-right: `x = 60 + t(vw - 170)`, `y = 0.72vh - t·0.42vh`, alternating `+26px / -8px` offset, each 46px wide and rotated `-22deg`, fill `#111`. Each animates opacity `0 → 0.75 (12%) → 0.75 (62%) → 0` over `2200ms` with `i × 95ms` delay, `ease-in-out`, `fill: both`. Layer clears `2200 + 16×95 + 300ms` after firing, and clears immediately on entering from the landing. **Important:** in React this must not be driven by keyed list state — reused DOM nodes silently skip the animation on repeat navigation. Drive it imperatively (Web Animations API on freshly created nodes) or force new keys per fire.
- **Nav toggle** — `[marauder's map]` toggles nav visibility. Opening the nav fades the marauder's map link out; both are `pointer-events`-gated so hidden items aren't clickable.
- **Scroll to enter** — a wheel listener on the landing triggers the transition.
- **Doodle drag** — pointer events on the landing layer, positions persisted to `sessionStorage`.
- **Card hover** — background lightens and the open button inverts; both must trigger from anywhere on the card.
- All transitions are `0.15s ease` for hover-level changes, `0.25–0.3s ease` for chrome fades, `0.9s cubic-bezier(0.7, 0, 0.2, 1)` for the landing exit.

## State Management
Local component state only — no store needed.
- `entered: boolean` — landing dismissed
- `section: 'work' | 'project' | 'about' | 'contact' | 'resume'` — replaced by routing where sensible
- `openProject: string` — becomes the `[slug]` route param
- `filter: string` — active tag, defaults `'all'`
- `menuOpen: boolean` — nav visibility
- `scrolled: boolean` — drives chrome fade on about
- `landKey: number` — forces the landing letter animation to replay

## Design Tokens

**Colors**
| token | value | use |
|---|---|---|
| ink | `#000000` | body text, active nav, headings |
| ink-soft | `#3a3a3a` | card borders, tag badge, open button |
| grey-600 | `#6a6a6a` | card blurbs, project description |
| grey-500 | `#8a8a8a` | inactive nav, chrome links |
| grey-400 | `#9a9a9a` | placeholder labels |
| grey-300 | `#b8b8b8` | landing hint |
| surface-hover | `#f2f2f2` | card hover |
| placeholder | `#e8e8e8` | image placeholder fill |
| white | `#ffffff` | all backgrounds |

Doodle palette (landing only, decorative): `#ebc23f`, `#f2c14e`, `#f1e2c4`, `#8a5a2e`, `#3b2a1d`, `#6f9463`, `#3f5e3a`, `#d98aa8`, `#7d9bb0`, `#9fb2bd`, `#fbf6ee`, `#2a2a2a`.

**Typography** — Inter (400, 500, 600, 700) + Cedarville Cursive (400), both Google Fonts.

| role | size | weight | tracking | leading |
|---|---|---|---|---|
| page title | 40px | 500 | -0.5px | default |
| about heading (cursive) | 44px | 400 | 0 | 1.5 |
| body large | 17px | 400 | — | 1.7 |
| body | 16px | 400 | — | 1.75 |
| card title | 17px | 700 | -0.2px, uppercase | default |
| card blurb | 13px | 400 | — | 1.5 |
| nav active / filter active | 15px | 700 | 0.5px | — |
| nav inactive / filter inactive / chrome | 12px | 500 | 0.5px (1.5px on chrome) | — |
| placeholder label | 11px | 400 | 2px, uppercase | — |
| tag badge | 10px | 400 | 1.5px, uppercase | — |

**Spacing** — 6, 8, 10, 12, 14, 16, 18, 20, 22, 26, 28, 32, 34, 40, 48, 76, 96, 128 px. Content max-width 1080px. Prose measures: 46ch, 52ch, 62ch.

**Borders / radius / shadow** — 2px solid borders on cards and buttons; 1px on the top bar. **No border radius anywhere. No shadows anywhere.** This is intentional.

**Z-index** — top bar 18, chrome links 21, nav 22, footprint layer 40, landing overlay 50, dragged doodle 999.

## Assets
| asset | source | destination |
|---|---|---|
| about illustration | `reference/uploads/illustration self 2.png` (user-provided) | `public/assets/about/` |
| contact illustration | `reference/uploads/pasted-1784191130590-0.png` (user-provided) | `public/assets/contact/` |
| social icons ×6 | inline SVG in the prototype (hand-drawn paths) | `public/assets/contact/*.svg` |
| landing doodles ×14 | inline SVG in the prototype | `public/assets/landing/*.svg` |
| footprint glyph | inline SVG in the prototype | keep inline or `public/assets/landing/paw.svg` |
| project card images | **not yet provided** | `public/assets/work/` |

Extract the SVGs directly out of `reference/Portfolio.dc.html` — the paths are all there.

## Files
- `CLAUDE_CODE_PROMPT.md` — the implementation prompt, including the required data architecture
- `reference/Portfolio.dc.html` — the design prototype (open in a browser)
- `reference/support.js` — prototype runtime; **do not port**
- `reference/uploads/` — the two user-provided illustrations
