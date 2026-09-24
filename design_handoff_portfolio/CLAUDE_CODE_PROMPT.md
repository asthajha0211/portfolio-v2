# Prompt to paste into Claude Code

> Paste everything below the line into Claude Code, with the handoff folder present in the repo (or attached). Add the handoff link where marked.

---

I'm building my personal portfolio site. A working HTML design prototype and a full design spec are in `design_handoff_portfolio/` — read `README.md` there first, and open `reference/Portfolio.dc.html` in a browser to see the intended behavior. Handoff link: **https://claude.ai/design/p/62fb1762-54db-4e0f-b605-acb4a5ae08af?file=Portfolio.dc.html**
Also read these files the selection imports:
- `support.js`
- `uploads/illustration self 2.png`
- `uploads/pasted-1784189851024-0.png`
- `uploads/pasted-1784191130590-0.png`

The HTML prototype is a design reference, not production code. Do not copy its markup or its custom `<x-dc>` runtime. Recreate the design faithfully in the stack below.

## Stack

- Next.js (App Router) with TypeScript, static export (`output: 'export'`)
- Tailwind CSS for styling
- `react-markdown` (+ `remark-gfm`) for project case-study bodies
- Framer Motion only if a CSS/Web Animations approach gets awkward; prefer the lighter option
- No CMS, no database, no API routes
- Deploy target: Vercel or GitHub Pages

## Architecture rules

These are firm — the point is that I can change all copy and add projects without touching component code.

**All text lives in data files.**
- `data/page.ts` — every string that isn't project-specific: nav labels, section headings, the about paragraphs, contact intro copy, social link labels and URLs, resume link, the landing line.
- `data/projects/<project-slug>.ts` — one file per project. Exports metadata (`slug`, `title`, `blurb`, `tag`, `image`, `imageAlt`, `date`) plus a `body` markdown string as a template literal.
- `data/projects/index.ts` — a barrel that imports each project file and exports the ordered array. One line to add per new project. No filesystem globbing.
- Components read from these files. No hardcoded copy in any component, ever.

**Types.**
- Define a `Project` type in `data/types.ts`. `tag` is `string`, deliberately not a union.
- Required fields should be required so a missing `imageAlt` or `slug` is a build error.

**Filters are derived, never declared.**
- The work page filter chips come from `['all', ...unique(projects.map(p => p.tag.toLowerCase()))]`. Adding a project with a new tag makes a new chip appear with zero code changes.
- Optional `tagOrder: string[]` in `data/page.ts` controls display order; tags not listed sort alphabetically after the listed ones. A missing or stale `tagOrder` must never break the page.

**Rich text.**
- The about page has an inline link inside a paragraph. Handle prose-with-markup by running those paragraphs through `react-markdown` too, so `data/page.ts` stays plain markdown strings rather than JSX or escaped HTML.

**Assets.**
- `public/assets/<page_name>/<asset>.svg|png`, referenced as `/assets/<page_name>/...`. Note this is `public/assets/`, not a top-level `/assets/` — Next only serves static files from `public/`.
- Use plain `<img>` or `next/image` with `unoptimized: true` (required for static export).
- The prototype's decorative doodles are inline SVG. Move each into its own file under `public/assets/landing/` and reference them from a list in `data/page.ts` (position, rotation, width, opacity as data).

**Routing.**
- `/` — landing + the four in-page sections (home, work, about, contact) as the prototype has them
- `/work/[slug]` — project case study pages, statically generated from the projects array via `generateStaticParams`
- `/resume` — resume link page
- Slugs come explicitly from the project files. Never slugify a title at runtime.

**Animation.**
- Timings, step counts, and easings are behavior, not content. Keep them beside the component that uses them, not in `data/`.

## Quality bar

- Accessible: real focus states, `aria-label`s on the icon links, `prefers-reduced-motion` respected for the footprint trail and letter reveal.
- Responsive: the prototype is desktop-first. Below 768px the project grid goes single column, the fixed decorative illustrations shrink or hide, and the nav stays reachable.
- Typecheck and lint clean. No `any`.

## What I want first

Do not write any implementation code yet. Read the handoff, then write **`plan.md`** at the repo root containing:

1. The full file tree you intend to create, with a one-line purpose for each file
2. The exact TypeScript types for `Project` and the `page.ts` shape, written out
3. An example `data/projects/<slug>.ts` filled with real content from the handoff, so I can see the authoring experience I'm signing up for
4. How the derived filters and `tagOrder` logic works, in code
5. The landing → section transition and footprint-trail approach, and why you chose CSS vs Framer Motion
6. Build/deploy steps for static export
7. Open questions for me, and anything in the design spec you think is a mistake

Then stop and wait for me to approve the plan.
