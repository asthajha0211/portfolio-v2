'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

const IMG = '/images/fable-teardown';

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
  return (
    <div style={{ maxWidth: '68ch' }}>
      {children}
    </div>
  );
}

function Para({ children }: { children: ReactNode }) {
  return (
    <p style={{ fontSize: '17px', lineHeight: 1.7, color: '#6a6a6a', margin: '0 0 20px' }}>
      {children}
    </p>
  );
}

function MetricTag({ label }: { label: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        background: '#f2f2f2',
        fontSize: '11px',
        letterSpacing: '0.5px',
        padding: '5px 11px',
        color: '#6a6a6a',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {label}
    </span>
  );
}

function RiceBadge({ score, rank }: { score: number; rank: number }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: '#000',
        color: '#fff',
        fontSize: '13px',
        fontWeight: 700,
        letterSpacing: '0.5px',
        padding: '7px 16px',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      RICE: {score} | Priority #{rank}
    </span>
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

function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
  beforeCaption,
  afterCaption,
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  beforeCaption: string;
  afterCaption: string;
}) {
  return (
    <div
      style={{
        background: '#f5f5f5',
        border: '1px solid #e8e8e8',
        padding: '40px 32px',
        margin: '32px 0',
      }}
    >
      <div className="grid gap-8 md:grid-cols-2">
        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: '#8a8a8a',
              margin: '0 0 14px',
            }}
          >
            {beforeCaption}
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={before}
            alt={beforeAlt}
            style={{ maxWidth: '340px', width: '100%', height: 'auto', margin: '0 auto', display: 'block' }}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: '#8a8a8a',
              margin: '0 0 14px',
            }}
          >
            {afterCaption}
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={after}
            alt={afterAlt}
            style={{ maxWidth: '340px', width: '100%', height: 'auto', margin: '0 auto', display: 'block' }}
          />
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return <hr style={{ border: 'none', borderTop: '1px solid #e8e8e8', margin: '72px 0' }} />;
}

/* ───────────────────────── data ───────────────────────── */

const META_TAGS = ['Self-initiated product teardown', 'Product Strategy', 'UX', '2025'];

const COMPETITORS = [
  {
    name: 'The StoryGraph',
    does: 'Personalized book recommendations and reading statistics.',
    strengths: 'Friendly interface, mood-based recommendations, detailed analytics.',
    weaknesses: 'Smaller community; lacks integrated social features like book clubs.',
  },
  {
    name: 'Geneva',
    does: 'Group communication platform supporting various communities, including book clubs.',
    strengths: 'Strong community-building tools, flexible discussion features, supports offline meetups.',
    weaknesses: 'Not solely focused on books; needs setup for book-related communities.',
  },
  {
    name: 'Goodreads',
    does: 'Widely used platform for tracking reading, writing reviews, joining discussions.',
    strengths: 'Extensive user base, diverse community features, Amazon integration.',
    weaknesses: 'Outdated interface, ads, limited social engagement.',
  },
  {
    name: 'Wattpad',
    does: 'Users read and write original stories across genres.',
    strengths: 'Large engaged community, strong discoverability for new writers, potential for book deals.',
    weaknesses: 'Quality control issues; not focused on traditional books or book discussions.',
  },
  {
    name: 'AO3 (Archive of Our Own)',
    does: 'Nonprofit platform for fanfiction and original works.',
    strengths: 'No ads, extensive tagging system, strong fan community.',
    weaknesses: 'No official publishing or book club features; limited mainstream book discussion.',
  },
];

const PERSONAS = [
  {
    name: 'Rachael Green, 25',
    role: 'Software Engineer',
    img: `${IMG}/02-persona-rachael.png`,
    quote: 'After staring at the computer screen all day, I want to do something away from screen.',
    motivations:
      'Finding a community to discuss and explore books, discovering new titles, sharing reviews.',
    frustrations:
      'Limited local book clubs; wants discussion deeper than surface-level reviews.',
    goals:
      'Have meaningful conversations about books, get personalized recommendations, track reading progress.',
  },
  {
    name: 'Evan Anthony, 27',
    role: 'Social Media Marketer',
    img: `${IMG}/03-persona-evan.png`,
    quote: 'My creative inspiration mostly comes from watching different kinds of series!',
    motivations:
      'Discussing popular TV shows, sharing theories, connecting with people who watch what he watches.',
    frustrations:
      'Spoilers on social media; no dedicated space for in-depth show discussion.',
    goals:
      'Join spoiler-free discussion rooms, get updates on favourite shows, take part in community events.',
  },
  {
    name: 'Sam Jones, 52',
    role: 'Book Shop Owner',
    img: `${IMG}/04-persona-sam.png`,
    quote: 'My wife loved reading. Post her demise, I want to ensure there is a space for readers!',
    motivations:
      'Facilitating book discussions, managing club logistics, keeping members engaged.',
    frustrations:
      'Coordinating meetings, getting members to participate, sourcing discussion material.',
    goals:
      "Use Fable's club features to organize meetings, share reading milestones, keep discussions alive.",
  },
  {
    name: 'Ariel Totemham, 26',
    role: 'Author',
    img: `${IMG}/05-persona-ariel.png`,
    quote: 'I want to shape the world, one book at a time!',
    motivations:
      'Sharing her work, receiving constructive criticism, building a reader base.',
    frustrations:
      'Few platforms for new authors, difficulty reaching a target audience, little feedback.',
    goals:
      'Engage with readers, join discussions to understand audience preferences, promote her writing.',
  },
  {
    name: 'Rakhi Sharma, 24',
    role: 'Founder of an EdTech Firm',
    img: `${IMG}/06-persona-rakhi.png`,
    quote: 'My work is very stressful, I want to build a habit of reading everyday to unwind.',
    motivations:
      'Reading as a tool for relaxation, stress reduction and personal growth.',
    frustrations:
      'Overwhelmed by daily stressors; looking for a constructive outlet for mental wellness.',
    goals:
      'Explore curated recommendations around mental wellness, and use reading challenges and streaks to actually start reading.',
  },
];

const CHALLENGES = [
  {
    name: '30-Day Reading Challenge',
    desc: 'as the name suggests, the classic.',
  },
  {
    name: 'Around the World in 12 Books',
    desc: 'read 12 international authors from around the world, over 12 months.',
  },
  {
    name: 'Judge a Book by Its Cover',
    desc: "post what you think a book will be about based on its cover, then review it once you've read it.",
  },
  {
    name: 'March into the Classics',
    desc: 'every March, pick up a classic of your choice.',
  },
  {
    name: 'Book vs Movie',
    desc: 'read the book, watch the adaptation, compare the two.',
  },
];

const RICE_DATA = [
  { feature: 'Genre-based filtering', reach: 9, impact: 5, confidence: '95%', effort: 6, score: 71.3, rank: 1 },
  { feature: 'Reading challenges & badges', reach: 8, impact: 4, confidence: '90%', effort: 5, score: 57.6, rank: 2 },
  { feature: 'Yearly / bi-yearly Wrapped', reach: 7, impact: 3, confidence: '85%', effort: 4, score: 44.6, rank: 3 },
  { feature: 'Improved user page UI', reach: 5, impact: 3, confidence: '75%', effort: 3, score: 37.5, rank: 4 },
  { feature: 'Calendar view for streak logging', reach: 6, impact: 3, confidence: '80%', effort: 4, score: 36.0, rank: 5 },
];

/* ───────────────────────── component ───────────────────────── */

export default function FableTeardown() {
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
          Fable: A Product Teardown
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
          Where a book-club app builds habits, and where it drops them
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

        <p style={{ fontSize: '12px', color: '#8a8a8a', margin: '0 0 8px' }}>
          <strong style={{ fontWeight: 500 }}>Frameworks:</strong> RICE, persona-led problem framing
        </p>
      </Reveal>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${IMG}/fable-inner.png`}
        alt="Fable product teardown overview"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          margin: '48px 0',
          border: '1px solid #e8e8e8',
        }}
      />

      {/* ── 2. Competitive Set ── */}
      <Reveal>
        <SectionLabel>02 / competitive landscape</SectionLabel>
        <SectionHeading>The competitive set</SectionHeading>
        <Prose>
          <Para>
            {`Fable sits in a crowded room. Everyone here solves a slice of "reading, socially"; nobody owns all of it.`}
          </Para>
        </Prose>

        <div style={{ overflowX: 'auto', margin: '32px 0' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px',
              lineHeight: 1.6,
            }}
          >
            <thead>
              <tr>
                {['Competitor', 'What it does', 'Strengths', 'Weaknesses'].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: 'left',
                      padding: '12px 16px',
                      borderBottom: '2px solid #000',
                      fontSize: '11px',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      color: '#8a8a8a',
                      fontWeight: 500,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPETITORS.map((c) => (
                <tr key={c.name}>
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid #e8e8e8', fontWeight: 600, whiteSpace: 'nowrap', verticalAlign: 'top' }}>
                    {c.name}
                  </td>
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid #e8e8e8', color: '#6a6a6a', verticalAlign: 'top' }}>
                    {c.does}
                  </td>
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid #e8e8e8', color: '#6a6a6a', verticalAlign: 'top' }}>
                    {c.strengths}
                  </td>
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid #e8e8e8', color: '#6a6a6a', verticalAlign: 'top' }}>
                    {c.weaknesses}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Quote>
          <strong style={{ fontStyle: 'normal' }}>The gap I kept coming back to:</strong> StoryGraph
          owns the data, Geneva owns the group, Goodreads owns the scale. Fable is the only one
          trying to hold discovery, community and habit in one place, which is exactly why the habit
          loop deserves more attention than it currently gets.
        </Quote>
      </Reveal>

      <Divider />

      {/* ── 3. Personas ── */}
      <Reveal>
        <SectionLabel>03 / personas</SectionLabel>
        <SectionHeading>Who I designed for</SectionHeading>
        <Prose>
          <Para>
            Five personas, built around the different reasons someone opens a reading app.
          </Para>
        </Prose>

        <div
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          style={{ marginTop: '32px' }}
        >
          {PERSONAS.map((p) => (
            <div
              key={p.name}
              style={{
                border: '1px solid #e8e8e8',
                padding: '24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.img}
                  alt={p.name}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1px solid #e8e8e8',
                  }}
                />
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>{p.name}</p>
                  <p style={{ fontSize: '13px', color: '#8a8a8a', margin: 0 }}>{p.role}</p>
                </div>
              </div>
              <p
                style={{
                  fontSize: '14px',
                  fontStyle: 'italic',
                  color: '#4a4a4a',
                  margin: '0 0 16px',
                  lineHeight: 1.5,
                }}
              >
                &ldquo;{p.quote}&rdquo;
              </p>
              <div style={{ fontSize: '13px', lineHeight: 1.6, color: '#6a6a6a' }}>
                <p style={{ margin: '0 0 8px' }}>
                  <strong style={{ color: '#000', fontWeight: 600 }}>Motivations:</strong>{' '}
                  {p.motivations}
                </p>
                <p style={{ margin: '0 0 8px' }}>
                  <strong style={{ color: '#000', fontWeight: 600 }}>Frustrations:</strong>{' '}
                  {p.frustrations}
                </p>
                <p style={{ margin: 0 }}>
                  <strong style={{ color: '#000', fontWeight: 600 }}>Goals:</strong> {p.goals}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Divider />

      {/* ── Priority 1: Genre Filters ── */}
      <Reveal>
        <SectionLabel>priority 1 / feature</SectionLabel>
        <SectionHeading>Genre filters</SectionHeading>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <RiceBadge score={71.3} rank={1} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            <MetricTag label="search engagement rate" />
            <MetricTag label="NPS" />
            <MetricTag label="reduced drop-off at search" />
          </div>
        </div>

        <Prose>
          <Para>
            Users should be able to filter books and shows by genre. As an avid reader and
            binge-watcher, I search by mood. Am I in the mood for a thriller? A romantic comedy? Or
            do I want a knight in shining armour riding in to save his princess? Genre-based
            filtering makes that possible.
          </Para>
          <Para>
            There are a couple of ways to build it. The prerequisite either way is tagging genre on
            the book record in the database. After that, you can let users search a genre directly
            and return results.
          </Para>
          <Para>
            {`The simpler route is a "Filter" button that opens the available genres. The user selects the ones they want and hits Apply.`}
          </Para>
        </Prose>

        <BeforeAfter
          before={`${IMG}/16-explore-current.png`}
          after={`${IMG}/17-explore-filter-revised.png`}
          beforeAlt="Fable's Explore page with a filter icon added in the header"
          afterAlt="Genre filter panel wireframe with checkboxes and an Apply button"
          beforeCaption="Explore page, revised with filter entry point"
          afterCaption="Explore page, filter section"
        />
      </Reveal>

      <Divider />

      {/* ── Priority 2: Challenges & Badges ── */}
      <Reveal>
        <SectionLabel>priority 2 / feature</SectionLabel>
        <SectionHeading>Reading challenges and badges</SectionHeading>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <RiceBadge score={57.6} rank={2} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            <MetricTag label="avg. session duration" />
            <MetricTag label="sessions per user" />
            <MetricTag label="page views per session" />
            <MetricTag label="referral rate" />
          </div>
        </div>

        <Prose>
          <Para>
            One of the best ways to foster a community and build a new habit is to give people a way
            to bond over it.
          </Para>
          <Para>
            Samsung Health, a fairly basic healthcare app, sees over 300,000 MAU on its monthly
            walking challenges and the leaderboards that come with them.
          </Para>
          <Para>
            Duolingo, like Fable, uses streaks to build a habit. The difference is in the
            packaging: the animation that celebrates a streak increasing, badges for personal
            accomplishments, and notifications with actual personality. Worth noting for later:
            {` Duolingo has a "Mistake Mechanic": it rewards you for going back and fixing your mistakes. It gives you a badge, essentially, for having made them.`}
          </Para>
        </Prose>

        {/* Reference images */}
        <div
          style={{
            background: '#f5f5f5',
            border: '1px solid #e8e8e8',
            padding: '40px 32px',
            margin: '32px 0',
          }}
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8a8a8a', margin: '0 0 14px' }}>
                Walking challenges and badges on Samsung Health
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${IMG}/13-samsung-health-challenges.png`}
                alt="Samsung Health walking challenges, badges and personal records"
                style={{ maxWidth: '400px', width: '100%', height: 'auto', margin: '0 auto', display: 'block' }}
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8a8a8a', margin: '0 0 14px' }}>
                Milestone streak animation (Duolingo)
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${IMG}/14-duolingo-badges-streak.png`}
                alt="Duolingo 50, 100 and 365 day streak milestone screens"
                style={{ maxWidth: '400px', width: '100%', height: 'auto', margin: '0 auto', display: 'block' }}
              />
            </div>
          </div>
        </div>

        <Prose>
          <Para>
            {"Fable already has streaks. It hasn't yet turned them into a reason to open the app every single day."}
          </Para>
        </Prose>

        <SubHeading>Reading challenges</SubHeading>
        <div style={{ margin: '0 0 32px' }}>
          {CHALLENGES.map((c, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '14px',
                padding: '14px 0',
                borderBottom: '1px solid #f0f0f0',
                alignItems: 'baseline',
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
                }}
              >
                {i + 1}
              </span>
              <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#4a4a4a', margin: 0 }}>
                <strong style={{ color: '#000' }}>{c.name}</strong>: {c.desc}
              </p>
            </div>
          ))}
        </div>

        <SubHeading>Badges</SubHeading>
        <Prose>
          <div
            style={{
              padding: '20px 24px',
              border: '1px solid #e8e8e8',
              marginBottom: '16px',
            }}
          >
            <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#4a4a4a', margin: 0 }}>
              <strong style={{ color: '#000' }}>{`"Amateur Critique"`}</strong>: 10 book reviews
              written. And other milestone badges along the way.
            </p>
          </div>
          <div
            style={{
              padding: '20px 24px',
              border: '2px solid #000',
              background: '#fafafa',
            }}
          >
            <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#4a4a4a', margin: 0 }}>
              <strong style={{ color: '#000' }}>{`10 books in the "Did Not Finish" list.`}</strong>{' '}
              Why include that one? To credit the user for <em>starting</em> a book. It doesn{"'"}t
              matter that they didn{"'"}t like it. What matters is that they tried.
              <span style={{ color: '#8a8a8a' }}>
                {" (Duolingo's Mistake Mechanic, applied to reading.)"}
              </span>
            </p>
          </div>
        </Prose>
      </Reveal>

      <Divider />

      {/* ── Priority 3: Wrapped ── */}
      <Reveal>
        <SectionLabel>priority 3 / feature</SectionLabel>
        <SectionHeading>A yearly Wrapped</SectionHeading>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <RiceBadge score={44.6} rank={3} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            <MetricTag label="yearly retention" />
            <MetricTag label="referral rate" />
            <MetricTag label="long-term LTV" />
            <MetricTag label="virality coefficient" />
          </div>
        </div>

        <Prose>
          <Para>
            A basic version of Wrapped already exists as Monthly Wrapped. There is no one alive who
            could convince me against Wrapped, but I think bi-yearly or yearly makes far more sense
            here. Realistically, people read a median of about 4 books a year.
          </Para>
        </Prose>

        {/* Country data image */}
        <div
          style={{
            background: '#f5f5f5',
            border: '1px solid #e8e8e8',
            padding: '32px',
            margin: '28px 0',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8a8a8a', margin: '0 0 16px' }}>
            Books read per person per year · Source: World Population Review, 2024
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${IMG}/15-books-read-by-country.png`}
            alt="The five countries that read the most books per year"
            style={{ maxWidth: '600px', width: '100%', height: 'auto', margin: '0 auto', display: 'block' }}
          />
        </div>

        <Prose>
          <Para>
            {"Even in the countries that read the most, that's under two books a month. Which means a monthly Wrapped looks rather empty. I'm speaking from personal experience. Over six months or a year, there's actually something to show:"}
          </Para>
        </Prose>

        {/* Wrapped metrics grid */}
        <div
          className="grid gap-3 grid-cols-2 md:grid-cols-4"
          style={{ margin: '28px 0 32px' }}
        >
          {[
            'Total books read',
            'Most read author',
            'Most read genre',
            'Best reading streak',
            'Highest page count',
            'Books read across the year',
            'Year-over-year comparison',
          ].map((m) => (
            <div
              key={m}
              style={{
                border: '1px solid #e8e8e8',
                padding: '16px',
                fontSize: '14px',
                lineHeight: 1.4,
                color: '#4a4a4a',
              }}
            >
              {m}
            </div>
          ))}
        </div>

        <Prose>
          <Para>
            The same treatment works for people logging television and film.
          </Para>
          <Para>
            {`And instead of "Wrapped", the team could own the name: `}
            <strong>{`"Fable Footprints"`}</strong>
            {`, or `}
            <strong>{`"Chronicles of <year>"`}</strong>.
          </Para>
        </Prose>
      </Reveal>

      <Divider />

      {/* ── Priority 4 & 5: Streak Logging & User Page ── */}
      <Reveal>
        <SectionLabel>priority 4 & 5 / enhancement</SectionLabel>
        <SectionHeading>Streak logging and where it lives</SectionHeading>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <RiceBadge score={37.5} rank={4} />
          <RiceBadge score={36.0} rank={5} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            <MetricTag label="stickiness (DAU/MAU)" />
            <MetricTag label="DAU" />
            <MetricTag label="session duration" />
            <MetricTag label="session frequency" />
          </div>
        </div>

        <Prose>
          <Para>
            {"Fable's current streak log does its job. It's a list of dates, and you tap into one to log a book."}
          </Para>
          <Para>
            {"A calendar view would do the same job more intuitively, with the current date auto-selected. A green outline can mark the days a user already logged. To log another day, they tap that date, which takes them to the \"choose book\" page, and the date turns green. To deselect, tap the date again."}
          </Para>
        </Prose>

        <Quote>
          <strong style={{ fontStyle: 'normal' }}>Fun fact:</strong> a calendar view taps into the
          Zeigarnik effect: humans dislike incomplete patterns, so they{"'"}re motivated to close a
          streak.
        </Quote>

        <BeforeAfter
          before={`${IMG}/07-streaklog-current.png`}
          after={`${IMG}/08-streaklog-revised.png`}
          beforeAlt="Fable's current streak log, a vertical list of dates"
          afterAlt="Redesigned streak log as a three-month calendar with logged days outlined in green"
          beforeCaption="Current streak logging page"
          afterCaption="Streak logging page, revised"
        />

        <Prose>
          <Para>
            {"Then there's placement. Streak logging currently sits in the middle of the home feed, surrounded by unrelated information. Moving it to the user page segregates all the user's own data from that chaos."}
          </Para>
          <Para>
            {"While I'm on the user page: instead of a \"View Network\" link that leads off to following and followers, why not show that metric on the page itself? I've used \"Longest Streak\" as a third metric. It could just as easily be \"Lifetime Books\", \"Total Reading Time\" or \"Total Pages Read\"."}
          </Para>
        </Prose>

        <BeforeAfter
          before={`${IMG}/09-userpage-current.png`}
          after={`${IMG}/10-userpage-revised.png`}
          beforeAlt="Fable's current user page with a View network link"
          afterAlt="Redesigned user page showing longest streak, following and followers inline, plus streak logging"
          beforeCaption="Current user page"
          afterCaption="User page, revised"
        />
      </Reveal>

      <Divider />

      {/* ── UX Fix: Adding Books ── */}
      <Reveal>
        <SectionLabel>UX fix</SectionLabel>
        <SectionHeading>Adding books to a list</SectionHeading>

        <Prose>
          <Para>Three things about this sheet bother me as a user:</Para>
          <ol style={{ fontSize: '17px', lineHeight: 1.7, color: '#6a6a6a', paddingLeft: '24px', margin: '0 0 24px' }}>
            <li style={{ marginBottom: '10px' }}>
              <strong style={{ color: '#000' }}>No book name.</strong> Adding the book{"'"}s title
              to the sheet reassures the user they tapped the right book.
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong style={{ color: '#000' }}>Removing should be symmetrical.</strong> To remove a
              book from the library, tapping the selected radio button again should do the trick.
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong style={{ color: '#000' }}>{`"Remove from library" sits where "Save" should be.`}</strong>{' '}
              Because of its placement, it gets confused with Save. This page has a vertical
              decision-making flow, so the Save button belongs at the bottom of the sheet.
            </li>
          </ol>
        </Prose>

        <BeforeAfter
          before={`${IMG}/11-addbook-current.png`}
          after={`${IMG}/12-addbook-revised.png`}
          beforeAlt="Fable's Add to your library sheet with Save at top and Remove from library at bottom"
          afterAlt="Revised sheet showing the book title and Save moved to the bottom"
          beforeCaption="Explore, add book to list"
          afterCaption="Explore, add book to list, revised"
        />

        <Quote>
          <strong style={{ fontStyle: 'normal' }}>P.S.</strong> I am not a designer, so please
          consider these wireframes rather than designs.
        </Quote>
      </Reveal>

      <Divider />

      {/* ── Monetization ── */}
      <Reveal>
        <SectionLabel>thinking beyond features</SectionLabel>
        <SectionHeading>Monetization</SectionHeading>

        <Prose>
          <Para>Fable currently sustains itself through:</Para>
          <ul style={{ fontSize: '17px', lineHeight: 1.7, color: '#6a6a6a', paddingLeft: '24px', margin: '0 0 28px' }}>
            <li style={{ marginBottom: '6px' }}>
              <strong style={{ color: '#000' }}>Affiliate and direct book sales</strong>: Fable
              likely earns a cut of purchases made through the app.
            </li>
            <li>
              <strong style={{ color: '#000' }}>Partnerships and licensing</strong>: collaborations
              with authors and publishers.
            </li>
          </ul>
          <Para>To grow, it will need more than that. Some directions:</Para>
        </Prose>

        <div
          className="grid gap-5 md:grid-cols-2"
          style={{ marginTop: '24px' }}
        >
          <div style={{ border: '1px solid #e8e8e8', padding: '24px' }}>
            <p style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 12px' }}>
              Exclusive book clubs &amp; author access
            </p>
            <ul style={{ fontSize: '14px', lineHeight: 1.7, color: '#6a6a6a', paddingLeft: '18px', margin: 0 }}>
              <li>VIP book clubs: private, invite-only clubs led by experts or celebrities.</li>
              <li>Author Q&As: live chats, AMAs, video discussions.</li>
              <li>Curated reading paths: step-by-step guides by experts around a theme.</li>
            </ul>
          </div>

          <div style={{ border: '1px solid #e8e8e8', padding: '24px' }}>
            <p style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 12px' }}>
              Enhanced reading &amp; discussion tools
            </p>
            <ul style={{ fontSize: '14px', lineHeight: 1.7, color: '#6a6a6a', paddingLeft: '18px', margin: 0 }}>
              <li>Voice notes and personalized annotations to share in clubs.</li>
              <li>Share a quote as an image with different backgrounds and fonts.</li>
            </ul>
          </div>

          <div style={{ border: '1px solid #e8e8e8', padding: '24px' }}>
            <p style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 12px' }}>
              Gamification &amp; engagement
            </p>
            <ul style={{ fontSize: '14px', lineHeight: 1.7, color: '#6a6a6a', paddingLeft: '18px', margin: 0 }}>
              <li>Badges and rewards for reading consistency.</li>
              <li>Discussion leaderboards for top contributors.</li>
              <li>Premium detailed reading habit stats.</li>
            </ul>
          </div>

          <div style={{ border: '1px solid #e8e8e8', padding: '24px' }}>
            <p style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 12px' }}>
              Commerce &amp; partnerships
            </p>
            <ul style={{ fontSize: '14px', lineHeight: 1.7, color: '#6a6a6a', paddingLeft: '18px', margin: 0 }}>
              <li>Limited-edition books, author-signed copies, Fable-branded merchandise.</li>
              <li>Corporate wellness and school partnerships: revenue and community pipeline.</li>
              <li>Offline club discussions and seamless multi-device syncing.</li>
            </ul>
          </div>
        </div>
      </Reveal>

      <Divider />

      {/* ── Prioritization ── */}
      <Reveal>
        <SectionLabel>prioritization</SectionLabel>
        <SectionHeading>Prioritization</SectionHeading>

        <Prose>
          <Para>
            {"I obviously don't know what resources the Fable team has, so these are rough estimates. I used the RICE framework."}
          </Para>
        </Prose>

        <div style={{ overflowX: 'auto', margin: '32px 0' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px',
              lineHeight: 1.6,
            }}
          >
            <thead>
              <tr>
                {['Feature', 'Reach (1-10)', 'Impact (1-5)', 'Confidence', 'Effort (1-10)', 'RICE'].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: 'left',
                      padding: '12px 14px',
                      borderBottom: '2px solid #000',
                      fontSize: '11px',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      color: '#8a8a8a',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RICE_DATA.map((r) => (
                <tr key={r.feature}>
                  <td style={{ padding: '14px', borderBottom: '1px solid #e8e8e8', fontWeight: 500 }}>{r.feature}</td>
                  <td style={{ padding: '14px', borderBottom: '1px solid #e8e8e8', color: '#6a6a6a', textAlign: 'center' }}>{r.reach}</td>
                  <td style={{ padding: '14px', borderBottom: '1px solid #e8e8e8', color: '#6a6a6a', textAlign: 'center' }}>{r.impact}</td>
                  <td style={{ padding: '14px', borderBottom: '1px solid #e8e8e8', color: '#6a6a6a', textAlign: 'center' }}>{r.confidence}</td>
                  <td style={{ padding: '14px', borderBottom: '1px solid #e8e8e8', color: '#6a6a6a', textAlign: 'center' }}>{r.effort}</td>
                  <td
                    style={{
                      padding: '14px',
                      borderBottom: '1px solid #e8e8e8',
                      fontWeight: 700,
                      textAlign: 'center',
                    }}
                  >
                    {r.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <SubHeading>Build order, highest to lowest score</SubHeading>

        <div style={{ margin: '0 0 32px' }}>
          {RICE_DATA.map((r) => (
            <div
              key={r.feature}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 0',
                borderBottom: '1px solid #f0f0f0',
              }}
            >
              <span
                style={{
                  flex: 'none',
                  width: '32px',
                  height: '32px',
                  background: '#000',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {r.rank}
              </span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>{r.feature}</p>
              </div>
              <span
                style={{
                  flex: 'none',
                  fontWeight: 700,
                  fontSize: '18px',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {r.score}
              </span>
            </div>
          ))}
        </div>

        <Quote>
          {`The goal wasn't to produce the longest list of ideas, but to determine where product investment should go first.`}
        </Quote>
      </Reveal>

      <Divider />

      {/* ── Closing ── */}
      <Reveal>
        <Prose>
          <Para>
            I hope you enjoyed reading this as much as I enjoyed making it. I{"'"}m open to any
            feedback you have.
          </Para>
        </Prose>

        <a
          href="https://drive.google.com/file/d/1_ysaSPr0ZFC847ais8SHfeecu15IhDfW/view?usp=sharing"
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
            marginTop: '8px',
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
          Read the full teardown (PDF)
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 L17 7 M9 7 h8 v8" />
          </svg>
        </a>
      </Reveal>
    </article>
  );
}
