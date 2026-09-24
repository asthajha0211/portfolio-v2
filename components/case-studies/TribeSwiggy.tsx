'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

const IMG = '/images/tribe-swiggy';

/* ───────────────────────── helpers ───────────────────────── */

function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(18px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontSize: '11px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: '#8a8a8a',
        margin: '0 0 10px',
      }}
    >
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2
      style={{
        fontSize: '32px',
        fontWeight: 500,
        letterSpacing: '-0.5px',
        margin: '0 0 24px',
        lineHeight: 1.25,
      }}
    >
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3
      style={{
        fontSize: '22px',
        fontWeight: 500,
        letterSpacing: '-0.3px',
        margin: '40px 0 16px',
        lineHeight: 1.3,
      }}
    >
      {children}
    </h3>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return <div style={{ maxWidth: '68ch' }}>{children}</div>;
}

function Para({ children }: { children: ReactNode }) {
  return (
    <p style={{ fontSize: '17px', lineHeight: 1.7, color: '#6a6a6a', margin: '0 0 20px' }}>
      {children}
    </p>
  );
}

function Quote({ children }: { children: ReactNode }) {
  return (
    <blockquote
      style={{
        borderLeft: '3px solid #000',
        paddingLeft: '20px',
        margin: '28px 0',
        fontStyle: 'italic',
        fontSize: '16px',
        lineHeight: 1.7,
        color: '#4a4a4a',
        maxWidth: '68ch',
      }}
    >
      {children}
    </blockquote>
  );
}

function NumberedItem({ index, children }: { index: number; children: ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '14px',
        padding: '14px 0',
        borderBottom: '1px solid #f0f0f0',
        alignItems: 'flex-start',
      }}
    >
      <span
        style={{
          flex: 'none',
          width: '24px',
          height: '24px',
          background: '#000',
          color: '#fff',
          fontSize: '12px',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2px',
        }}
      >
        {index}
      </span>
      <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#4a4a4a', margin: 0 }}>{children}</p>
    </div>
  );
}

function Divider() {
  return <hr style={{ border: 'none', borderTop: '1px solid #e8e8e8', margin: '72px 0' }} />;
}

/* ───────────────────────── data ───────────────────────── */

const META_TAGS = ['Product teardown exercise', 'Assignment', 'Product Strategy', 'UX', '2025'];

const PERSONAS = [
  {
    name: 'Professionals',
    age: '23–30',
    desc: 'Busy work life, no time to cook. This group relies on delivery for food intake.',
  },
  {
    name: 'College Students',
    age: '',
    desc: 'They want to eat good food, but are also on a budget.',
  },
  {
    name: 'Family',
    age: '',
    desc: 'Either want to find good places to eat outside, or look at bulk ordering for monthly groceries — think Zepto, BlinkIt, Swiggy Instamart.',
  },
  {
    name: 'Food Critiques',
    age: '',
    desc: 'Find out new restaurants and cuisines to try out.',
  },
  {
    name: 'HRs / Community Leaders',
    age: '',
    desc: 'Find places to host events and gatherings — ideally looking at catering services and/or bulk ordering of food.',
  },
];

const PAIN_POINTS = [
  'High delivery costs.',
  'Inaccuracy of orders that leads to dissatisfaction, and inadequate customer support on top of it.',
  'No reviews on restaurant food items to understand if a delicacy is actually good at that establishment.',
  'No food community present as of now, where food influencers can come together. The closest thing is Instagram, plus offline events like Zomaland or Food Grub.',
];

const RISKS = [
  {
    title: 'Trolling and harassment',
    desc: 'Opening a community to general people invites trolling, bullying and harsh or offensive words within minutes.',
    solution: 'Place strong protocols using moderation models to ensure user safety.',
  },
  {
    title: 'Misuse of location-tagged media',
    desc: "This one's a little over the top, but sharing videos and pictures of big, famous restaurants can fall into the wrong hands: the Mumbai Taj attack, at a scale nowhere near that severe, is the extreme version of this risk.",
    solution: "Restaurants can flag images or videos they don't want appearing publicly; if the request is legitimate, remove them from the post.",
  },
  {
    title: 'Dietary sensitivity',
    desc: 'Certain vegetarians and vegans are very averse to the idea of anything non-vegetarian.',
    solution: 'A veg filter for exactly that group.',
  },
];

const WRAPPED_METRICS = [
  'Favorite cuisines',
  'Most ordered dishes',
  'Preferred meal times',
  'Top 3 dishes',
  'Top 5 restaurants',
  'Restaurants discovered',
  'Challenges taken part in',
];

/* ───────────────────────── component ───────────────────────── */

export default function TribeSwiggy() {
  return (
    <article>
      {/* ── Hero ── */}
      <Reveal>
        <h1
          style={{
            fontSize: '40px',
            fontWeight: 500,
            letterSpacing: '-0.5px',
            margin: '0 0 10px',
            lineHeight: 1.2,
          }}
        >
          Tribe: A Foodie Community on Swiggy
        </h1>
        <p
          style={{
            fontSize: '20px',
            lineHeight: 1.5,
            color: '#6a6a6a',
            margin: '0 0 24px',
            maxWidth: '52ch',
          }}
        >
          Designing the MVP feature set and the exact, step-by-step UX flow for a foodie community
          feature on Swiggy
        </p>

        {/* Meta tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
          {META_TAGS.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '10px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: '#8a8a8a',
                border: '1px solid #e0e0e0',
                padding: '5px 10px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <p style={{ fontSize: '12px', color: '#8a8a8a', margin: '0 0 20px' }}>
          <strong style={{ fontWeight: 500 }}>Frameworks:</strong> persona-led problem framing, MVP
          feature scoping
        </p>
      </Reveal>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${IMG}/tribe-inner.png`}
        alt="Tribe: A Foodie Community on Swiggy — hero banner"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          margin: '48px 0',
          border: '1px solid #e8e8e8',
        }}
      />

      {/* ── The brief ── */}
      <Reveal>
        <SectionLabel>01 / the brief</SectionLabel>

        <div
          style={{
            padding: '20px 24px',
            border: '2px solid #000',
            background: '#fafafa',
            marginBottom: '24px',
          }}
        >
          <p style={{ fontSize: '17px', lineHeight: 1.6, color: '#000', margin: 0, fontWeight: 600 }}>
            You, as a PM, have to build a community of foodies on Swiggy.
          </p>
        </div>

        <ul style={{ fontSize: '17px', lineHeight: 1.7, color: '#6a6a6a', paddingLeft: '24px', margin: '0 0 24px' }}>
          <li style={{ marginBottom: '8px' }}>
            What will the MVP look like? (Exact features, not generic ideas.)
          </li>
          <li>
            {"What's the exact UX flow? (Step-by-step: where do users start, what do they see, where do they click, how do they come back?)"}
          </li>
        </ul>

        <Prose>
          <Para>
            {"To make sure you know exactly what my thinking process is, I've left this document as unedited as possible. I've tried to fix grammatical errors, but I haven't changed the ordering of any point, so the thought process stays intact."}
          </Para>
        </Prose>
      </Reveal>

      <Divider />

      {/* ── Personas ── */}
      <Reveal>
        <SectionLabel>02 / personas</SectionLabel>
        <Prose>
          <Para>Five personas, built around the different reasons someone would open a food community.</Para>
        </Prose>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" style={{ marginTop: '32px' }}>
          {PERSONAS.map((p) => (
            <div key={p.name} style={{ border: '1px solid #e8e8e8', padding: '24px' }}>
              <p style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 4px' }}>
                {p.name}
                {p.age ? <span style={{ fontWeight: 400, color: '#8a8a8a' }}> · {p.age}</span> : null}
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#6a6a6a', margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Divider />

      {/* ── Pain points ── */}
      <Reveal>
        <SectionLabel>03 / problem space</SectionLabel>

        <div style={{ margin: '0 0 8px' }}>
          {PAIN_POINTS.map((p, i) => (
            <NumberedItem key={i} index={i + 1}>
              {p}
            </NumberedItem>
          ))}
        </div>
      </Reveal>

      <Divider />

      {/* ── Risks ── */}
      <Reveal>
        <SectionLabel>04 / risks</SectionLabel>
        <Prose>
          <Para>Opening any community up to the general public comes with predictable risks. Better to plan for them now than patch them later.</Para>
        </Prose>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" style={{ marginTop: '8px' }}>
          {RISKS.map((r) => (
            <div key={r.title} style={{ border: '1px solid #e8e8e8', padding: '24px' }}>
              <p style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 10px' }}>{r.title}</p>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#6a6a6a', margin: '0 0 12px' }}>{r.desc}</p>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#4a4a4a', margin: 0 }}>
                <strong style={{ color: '#000' }}>Potential fix:</strong> {r.solution}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <Divider />

      {/* ── Features ── */}
      <Reveal>
        <SectionLabel>05 / features</SectionLabel>

        <SubHeading>Interactive feed</SubHeading>
        <div style={{ margin: '0 0 8px' }}>
          <NumberedItem index={1}>
            Users upload images of food they&rsquo;ve ordered, with comments. To organically drive
            Swiggy Dineout usage, the initial rollout only lets people who booked the restaurant
            through Dineout post about it opening up to everyone once the community has legs.
          </NumberedItem>
          <NumberedItem index={2}>
            Recipe sharing, with the ability to link ingredients directly to Swiggy Instamart.
          </NumberedItem>
          <NumberedItem index={3}>
            Polls and challenges: timed activities like &ldquo;Where&rsquo;s the best biryani
            in Hyderabad?&rdquo;, where people vote and submit pictures with the restaurant&rsquo;s
            location.
          </NumberedItem>
        </div>

        <SubHeading>Restaurant-specific threads</SubHeading>
        <div style={{ margin: '0 0 8px' }}>
          <NumberedItem index={1}>A Q&amp;A section where users or restaurants answer queries.</NumberedItem>
          <NumberedItem index={2}>
            A crowdsourced &ldquo;Must Try&rdquo; dish section. Users can also rate specific dishes
            they&rsquo;ve tried, with average stars shown, this works even better folded into
            the main Swiggy app.
          </NumberedItem>
        </div>

        <SubHeading>Gamification</SubHeading>
        <Prose>
          <Para>
            <strong style={{ color: '#000' }}>Badges and achievements</strong>: milestones like
            an &ldquo;Amateur Critique&rdquo; badge for 15 reviews logged, or a &ldquo;Sweetest
            Tooth&rdquo; badge for regularly interacting with dessert posts.
          </Para>
          <Para>
            <strong style={{ color: '#000' }}>Monthly leaderboards</strong>: highly interactive
            users (posts, polls, answers, recipes) earn Swiggy Supercoins, redeemable for small
            discounts and promotions at specific restaurants, or even a free month of membership.
          </Para>
          <Para>
            <strong style={{ color: '#000' }}>Challenges</strong>: a challenge of the month for
            the whole community. &ldquo;Juicy June&rdquo; encourages sharing recipes that boost
            liquid intake over summer; &ldquo;Dash December&rdquo; is about quick, easy food for
            people who don&rsquo;t want to leave their bed in winter.
          </Para>
        </Prose>

        <div
          style={{
            background: '#f5f5f5',
            border: '1px solid #e8e8e8',
            padding: '32px',
            margin: '8px 0 24px',
          }}
        >
          <p style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 6px' }}>
            &ldquo;Flavor Finale&rdquo;
          </p>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#6a6a6a', margin: '0 0 20px' }}>
            A Spotify Wrapped, but for Swiggy users.
          </p>
          <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
            {WRAPPED_METRICS.map((m) => (
              <div
                key={m}
                style={{
                  border: '1px solid #e8e8e8',
                  background: '#fff',
                  padding: '14px',
                  fontSize: '13px',
                  lineHeight: 1.4,
                  color: '#4a4a4a',
                }}
              >
                {m}
              </div>
            ))}
          </div>
        </div>

        <Quote>
          <strong style={{ fontStyle: 'normal' }}>Note:</strong> do NOT show total money spent. It
          will definitely decrease customer orders.
        </Quote>
      </Reveal>

      <Divider />

      {/* ── UX Flow ── */}
      <Reveal>
        <SectionLabel>06 / ux flow</SectionLabel>
        <SectionHeading>How Tribe fits into Swiggy</SectionHeading>

        <Prose>
          <Para>
            There are two obvious ways to tackle this: a standalone application, or folding the new
            features into the existing app. Opening Swiggy made it clear the latter is the better
            approach, Food Delivery, Instamart, Dineout and Genie already live as divisions of
            the same platform, so a community feature belongs there too.
          </Para>
        </Prose>

        <div style={{ textAlign: 'center', margin: '28px 0' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${IMG}/swiggy-app-home.png`}
            alt="Swiggy application home screen"
            style={{ maxWidth: '420px', width: '100%', height: 'auto', margin: '0 auto', display: 'block', border: '1px solid #e8e8e8' }}
          />
          <p style={{ fontSize: '12px', color: '#8a8a8a', marginTop: '12px' }}>Swiggy application home</p>
        </div>

        <Prose>
          <Para>
            For this assignment I&rsquo;m taking complete creative control of the application, and
            assuming all the ideas and flows presented sit down well in the existing ecosystem.
          </Para>
        </Prose>

        <div style={{ margin: '0 0 8px' }}>
          <NumberedItem index={1}>
            Instead of &ldquo;Reorder&rdquo;, the home screen gets a new entry point: &ldquo;Tribe&rdquo;.
          </NumberedItem>
          <NumberedItem index={2}>
            Tapping Tribe opens a carousel-style feed - reviews from restaurants nearby, or
            recipes from food bloggers the user follows.
          </NumberedItem>
          <NumberedItem index={3}>
            {'Tribe’s own nav bar has three tabs: '}
            <strong style={{ color: '#000' }}>Search</strong>
            {' — people and restaurants (a user’s own page shows their posts, ratings and polls; a restaurant’s page splits into posts, a searchable delicacy rating list, and Q&A, with the crowdsourced “Must Try” dish sitting right under the restaurant’s name), '}
            <strong style={{ color: '#000' }}>Home</strong>
            {' — the carousel feed, and '}
            <strong style={{ color: '#000' }}>Challenge of the month</strong>
            {' — the current community challenge, plus any others the user has opted into.'}
          </NumberedItem>
          <NumberedItem index={4}>
            Badges and achievements show up on the user&rsquo;s profile in the main app,
            visible to anyone who opens that profile, not just the user themselves.
          </NumberedItem>
        </div>

        <SubHeading>UX flow diagram</SubHeading>
        <div style={{ textAlign: 'center', margin: '28px 0' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${IMG}/tribe-ux-flow.png`}
            alt="UX flow diagram for Tribe"
            style={{ maxWidth: '100%', width: '100%', height: 'auto', margin: '0 auto', display: 'block', border: '1px solid #e8e8e8' }}
          />
          <p style={{ fontSize: '12px', color: '#8a8a8a', marginTop: '12px' }}>UX flow for Tribe</p>
        </div>
      </Reveal>

      <Divider />

      {/* ── Closing ── */}
      <Reveal>
        <a
          href="https://drive.google.com/file/d/1BFBtNe2wVRiCNiukdV5xJdi4JorJOcRr/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            border: '2px solid #000',
            padding: '14px 28px',
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.5px',
            color: '#000',
            textDecoration: 'none',
            transition: 'background 0.15s ease, color 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#000';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#000';
          }}
        >
          View the original assignment here
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 L17 7 M9 7 h8 v8" />
          </svg>
        </a>
      </Reveal>
    </article>
  );
}
