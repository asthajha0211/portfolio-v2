'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

const IMG = '/images/tapbonds-teardown';

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
        fontSize: 'clamp(24px, 6vw, 32px)',
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
        fontSize: 'clamp(18px, 4.5vw, 22px)',
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

function Callout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        padding: '20px 24px',
        border: '2px solid #000',
        background: '#fafafa',
        margin: '0 0 28px',
        maxWidth: '68ch',
      }}
    >
      <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#000', margin: 0 }}>{children}</p>
    </div>
  );
}

function Divider() {
  return <hr style={{ border: 'none', borderTop: '1px solid #e8e8e8', margin: 'clamp(40px, 10vw, 72px) 0' }} />;
}

function Figure({ src, alt, caption, maxWidth }: { src: string; alt: string; caption?: string; maxWidth?: string }) {
  return (
    <figure style={{ margin: '28px 0', textAlign: 'center' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: maxWidth || '100%',
          width: '100%',
          height: 'auto',
          display: 'block',
          margin: '0 auto',
          border: '1px solid #e8e8e8',
        }}
      />
      {caption ? (
        <figcaption style={{ fontSize: '12px', color: '#8a8a8a', marginTop: '12px', fontStyle: 'italic' }}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function SplitSection({
  image,
  imageSide = 'left',
  children,
}: {
  image: { src: string; alt: string; caption?: string };
  imageSide?: 'left' | 'right';
  children: ReactNode;
}) {
  const imageCol = (
    <div style={{ flex: '1 1 340px', minWidth: 0 }}>
      <Figure src={image.src} alt={image.alt} caption={image.caption} />
    </div>
  );
  const textCol = (
    <div style={{ flex: '1 1 340px', minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {children}
    </div>
  );
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center', margin: '0 0 8px' }}>
      {imageSide === 'left' ? (
        <>
          {imageCol}
          {textCol}
        </>
      ) : (
        <>
          {textCol}
          {imageCol}
        </>
      )}
    </div>
  );
}

function Pair({
  left,
  right,
}: {
  left: { src: string; alt: string; caption?: string };
  right: { src: string; alt: string; caption?: string };
}) {
  return (
    <div className="grid gap-8 md:grid-cols-2" style={{ margin: '28px 0' }}>
      <Figure src={left.src} alt={left.alt} caption={left.caption} />
      <Figure src={right.src} alt={right.alt} caption={right.caption} />
    </div>
  );
}

function PersonaCard({
  img,
  name,
  label,
  occupation,
  experience,
  goals,
  painPoints,
  avatarSide = 'left',
}: {
  img: string;
  name: string;
  label: string;
  occupation: string;
  experience: string;
  goals: string;
  painPoints: string[];
  avatarSide?: 'left' | 'right';
}) {
  const avatar = (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={img}
      alt={`Portrait of ${name}, persona`}
      style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', flex: 'none' }}
    />
  );
  const heading = (
    <div>
      <p style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>{name}</p>
      <p style={{ fontSize: '13px', color: '#8a8a8a', margin: 0 }}>{label}</p>
    </div>
  );
  return (
    <div style={{ border: '1px solid #e8e8e8', padding: '24px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          marginBottom: '16px',
          flexDirection: avatarSide === 'right' ? 'row-reverse' : 'row',
          justifyContent: avatarSide === 'right' ? 'flex-end' : 'flex-start',
        }}
      >
        {avatar}
        {heading}
      </div>
      <div style={{ fontSize: '13px', lineHeight: 1.6, color: '#6a6a6a' }}>
        <p style={{ margin: '0 0 8px' }}>
          <strong style={{ color: '#000', fontWeight: 600 }}>Occupation:</strong> {occupation}
        </p>
        <p style={{ margin: '0 0 8px' }}>
          <strong style={{ color: '#000', fontWeight: 600 }}>Experience:</strong> {experience}
        </p>
        <p style={{ margin: '0 0 8px' }}>
          <strong style={{ color: '#000', fontWeight: 600 }}>Goals:</strong> {goals}
        </p>
        <p style={{ margin: 0 }}>
          <strong style={{ color: '#000', fontWeight: 600 }}>Pain points:</strong>
        </p>
        <ul style={{ margin: '6px 0 0', paddingLeft: '18px' }}>
          {painPoints.map((p, i) => (
            <li key={i} style={{ marginBottom: '4px' }}>{p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: 'inline-block',
        background: '#f2f2f2',
        fontSize: '13px',
        padding: '7px 14px',
        color: '#4a4a4a',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {children}
    </span>
  );
}

const SEVERITY_STYLES: Record<string, { background: string; color: string; border: string }> = {
  Critical: { background: '#000', color: '#fff', border: '1px solid #000' },
  High: { background: '#3a3a3a', color: '#fff', border: '1px solid #3a3a3a' },
  'Medium-High': { background: '#6a6a6a', color: '#fff', border: '1px solid #6a6a6a' },
  Medium: { background: '#e8e8e8', color: '#000', border: '1px solid #e8e8e8' },
  'Low-Medium': { background: '#f2f2f2', color: '#4a4a4a', border: '1px solid #e0e0e0' },
  Low: { background: '#fff', color: '#8a8a8a', border: '1px solid #e0e0e0' },
};

function SeverityTag({ level }: { level: string }) {
  const s = SEVERITY_STYLES[level] || SEVERITY_STYLES.Low;
  return (
    <span
      style={{
        display: 'inline-block',
        whiteSpace: 'nowrap',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.5px',
        padding: '4px 10px',
        background: s.background,
        color: s.color,
        border: s.border,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {level}
    </span>
  );
}

function CriticalIssueCard({
  index,
  title,
  body,
  risk,
  fix,
}: {
  index: number;
  title: string;
  body: ReactNode;
  risk: string;
  fix: string;
}) {
  return (
    <div style={{ border: '2px solid #000', padding: '28px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
        <span
          style={{
            flex: 'none',
            width: '28px',
            height: '28px',
            background: '#000',
            color: '#fff',
            fontSize: '13px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {index}
        </span>
        <p style={{ fontSize: '17px', fontWeight: 600, margin: 0 }}>{title}</p>
      </div>
      <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#4a4a4a', margin: '0 0 14px' }}>{body}</p>
      <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#6a6a6a', margin: '0 0 6px' }}>
        <strong style={{ color: '#000' }}>Risk:</strong> {risk}
      </p>
      <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#6a6a6a', margin: 0 }}>
        <strong style={{ color: '#000' }}>Fix:</strong> {fix}
      </p>
    </div>
  );
}

/* ───────────────────────── data ───────────────────────── */

const META_TAGS = ['Self-initiated product teardown', 'UI/UX', 'Content', 'Functionality', 'Business Strategy', '2025'];

const COMPETITOR_TABLE = [
  { name: 'Stable Money', insights: true, platform: true },
  { name: 'Navi', insights: false, platform: false },
  { name: 'Groww', insights: false, platform: false },
  { name: 'INDmoney', insights: true, platform: true },
  { name: 'Moneycontrol', insights: true, platform: false },
  { name: 'The Economic Times', insights: true, platform: false },
  { name: 'TradingView', insights: false, platform: false },
  { name: 'Tap Invest', insights: true, platform: true },
  { name: 'Tap Bonds', insights: true, platform: false, highlight: true },
];

const INVEST_COMPETITORS = ['Stable Money', 'Groww', 'Navi', 'INDmoney', 'Zerodha'];
const RESEARCH_COMPETITORS = ['Moneycontrol', 'TradingView', 'Stable Money', 'Groww', 'Zerodha', 'The Economic Times'];

const CRITICAL_ISSUES = [
  {
    title: 'The AI Generated Summary quotes stale financial data',
    body:
      'On the Bond Screener, the AI summary pulls EPS, Current Ratio and Debt-to-Equity from March 2023, while the Key Metrics tab on the same page already shows March 2024 figures. A user who trusts the AI feature, which is the entire pitch of adding it, is making a bond decision on numbers a year out of date, with the correction sitting one tab away.',
    risk: 'Trust and decision quality. This isn’t a UI nit, it’s a flagship feature actively contradicting its own product.',
    fix: 'Pipe the AI summary from the same data source as Key Metrics, or disable the AI summary until it can be.',
  },
  {
    title: 'The “Talk to an Expert” confirm button is invisible at 100% zoom',
    body:
      'This is Tap Bonds’s conversion path into a paid, human-assisted service, and most users never zoom out to 80% to go looking for a button they don’t know is missing.',
    risk: 'Direct revenue leak on a lead-generation flow.',
    fix: 'A CSS layout bug. Should be a same-day fix.',
  },
];

const FINDINGS = [
  { finding: 'AI summary shows stale (2023) data vs. Key Metrics’ current data', severity: 'Critical', risk: 'Trust / decision quality', persona: 'Rakesh, Tamanna', effort: 'Low–Med' },
  { finding: '“Talk to an Expert” CTA invisible at 100% zoom', severity: 'High', risk: 'Revenue (lead-gen)', persona: 'All', effort: 'Low' },
  { finding: 'Bond Finder (weekly) vs. Bonds Directory (daily) refresh mismatch', severity: 'High', risk: 'Trust / decision quality', persona: 'Rakesh, Tamanna', effort: 'Investigate' },
  { finding: 'OTP required at every sign-in', severity: 'High', risk: 'Activation / retention', persona: 'Rakhi', effort: 'Medium' },
  { finding: '1 Minute News shows stale stories first', severity: 'Medium-High', risk: 'Trust (feature’s premise is freshness)', persona: 'All', effort: 'Low–Med' },
  { finding: 'No tooltip on Bond Finder column headers', severity: 'Medium', risk: 'Activation (beginners can’t use the tool)', persona: 'Rakhi', effort: 'Low' },
  { finding: 'Finance Wiki filters push glossary below the fold', severity: 'Medium', risk: 'Activation / education', persona: 'Rakhi', effort: 'Low' },
  { finding: 'Pros & Cons text breaks mid-sentence across bullets', severity: 'Low-Medium', risk: 'Perceived credibility', persona: 'Tamanna', effort: 'Low' },
  { finding: 'WhatsApp opt-in pre-ticked by default', severity: 'Medium', risk: 'Trust / compliance optics', persona: 'All', effort: 'Low' },
  { finding: 'Blog categories missing from main blog page', severity: 'Low-Medium', risk: 'Content discovery', persona: 'All', effort: 'Low' },
  { finding: 'Duplicate ISIN / issuer name in bond detail header', severity: 'Low', risk: 'Cosmetic', persona: '—', effort: 'Low' },
  { finding: 'Duplicate “Bonds Directory” label', severity: 'Low', risk: 'Cosmetic', persona: '—', effort: 'Low' },
  { finding: 'Redundant chevrons in Tools dropdown', severity: 'Low', risk: 'Cosmetic', persona: '—', effort: 'Low' },
  { finding: 'Overlapping logos in Bond Finder at certain zoom', severity: 'Low', risk: 'Cosmetic', persona: '—', effort: 'Low' },
];

const ROADMAP = [
  {
    title: 'Fix now',
    subtitle: 'High severity, low effort',
    items: [
      'AI summary data mismatch',
      '“Talk to an Expert” button visibility',
      'Timestamp Bond Finder’s refresh cadence',
    ],
  },
  {
    title: 'Next quarter',
    subtitle: 'High severity, more effort',
    items: [
      'Google sign-in to kill repeat OTP friction',
      'Column-header tooltips and Finance Wiki fold fix (both unblock the beginner persona)',
      'Fix 1 Minute News freshness ordering',
    ],
  },
  {
    title: 'Batch into one UI cleanup sprint',
    subtitle: 'Low severity, low effort each',
    items: [
      'Duplicate labels, redundant chevrons, overlapping logos',
      'Pre-ticked WhatsApp checkbox',
      'Blog categories on the main blog page',
    ],
  },
];

/* ───────────────────────── component ───────────────────────── */

export default function TapBondsTeardown() {
  return (
    <article>
      {/* ── Hero ── */}
      <Reveal>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${IMG}/tapbonds-logo.png`}
          alt="Tap Bonds logo"
          style={{ height: '40px', width: 'auto', marginBottom: '24px' }}
        />
        <h1
          style={{
            fontSize: 'clamp(28px, 7vw, 40px)',
            fontWeight: 500,
            letterSpacing: '-0.5px',
            margin: '0 0 10px',
            lineHeight: 1.2,
          }}
        >
          Tap Bonds: A Product Teardown
        </h1>
        <p
          style={{
            fontSize: '20px',
            lineHeight: 1.5,
            color: '#6a6a6a',
            margin: '0 0 24px',
            maxWidth: '58ch',
          }}
        >
          A page-by-page look at a bond research platform, and how I’d make it easier for every
          kind of investor to use.
        </p>

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

        <p style={{ fontSize: '12px', color: '#8a8a8a', margin: '0 0 24px' }}>
          <strong style={{ fontWeight: 500 }}>Platform:</strong> Web (mobile app was in
          development at the time)
        </p>

        <Prose>
          <Para>
            This teardown looks at the UI/UX, content, functionality and business strategy of Tap
            Bonds. I focused only on the web version, since the mobile app was under major
            development at the time. I went through every page on the website, and wherever it
            helped, added a quick wireframe or flowchart to show how I think it could be improved.
          </Para>
        </Prose>

        <Callout>
          <strong>Mission:</strong> Empower investors with deep research and analytics for the
          bond market, making fixed-income investing more accessible and transparent.
        </Callout>
      </Reveal>

      <Divider />

      {/* ── Personas ── */}
      <Reveal>
        <SectionLabel>01 / who uses tap bonds</SectionLabel>
        <SectionHeading>Who uses Tap Bonds</SectionHeading>
        <Prose>
          <Para>
            Before getting into the changes, here are the kinds of people who are likely to use
            the website, and what gets in their way.
          </Para>
        </Prose>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" style={{ marginTop: '24px' }}>
          <PersonaCard
            img={`${IMG}/persona-rakhi-sharma.png`}
            name="Rakhi Sharma, 22"
            label="Curious Beginner"
            occupation="Recent graduate, working in her first job"
            experience="None, new to investing"
            goals="Wants to learn about investing, particularly bonds, but finds financial terms confusing"
            painPoints={[
              'Overwhelmed by financial jargon',
              'Unsure how bonds compare to stocks or mutual funds',
              'Struggles to evaluate which bond is safe or profitable',
            ]}
          />
          <PersonaCard
            img={`${IMG}/persona-rakesh-mehta.png`}
            name="Rakesh Mehta, 45"
            label="Seasoned Investor"
            occupation="Senior IT Manager"
            experience="15+ years in stocks, mutual funds and real estate; now exploring bonds for stability"
            goals="Wants a diversified portfolio with bonds, and efficient tools to research them without reading lengthy reports"
            painPoints={[
              'Finds bond data scattered across multiple sources',
              'Needs quick, in-depth filtering on his own criteria (returns, maturity, credit rating, etc.)',
            ]}
            avatarSide="right"
          />
          <PersonaCard
            img={`${IMG}/persona-tamanna-kapoor.png`}
            name="Tamanna Kapoor, 35"
            label="Portfolio Manager"
            occupation="Portfolio Manager at a financial advisory firm"
            experience="10+ years in wealth management"
            goals="Needs in-depth, reliable bond data for clients, and efficient research tools to speed up investment decisions"
            painPoints={[
              'Needs bulk analysis tools for evaluating multiple bonds at once',
              'Requires customised reports to present findings to clients',
            ]}
          />
        </div>
      </Reveal>

      <Divider />

      {/* ── Critical issues ── */}
      <Reveal>
        <SectionLabel>02 / critical issues</SectionLabel>
        <SectionHeading>Critical issues</SectionHeading>
        <Prose>
          <Para>
            Not every finding below carries the same weight. Two things on this list aren’t
            cosmetic, they’re the kind of bug that costs the business money or trust if left
            alone. I’m surfacing them here first, instead of letting them sit buried in a
            nine-page walkthrough.
          </Para>
        </Prose>

        {CRITICAL_ISSUES.map((issue, i) => (
          <CriticalIssueCard
            key={issue.title}
            index={i + 1}
            title={issue.title}
            body={issue.body}
            risk={issue.risk}
            fix={issue.fix}
          />
        ))}

        <SubHeading>Findings at a glance</SubHeading>
        <Prose>
          <Para>
            The full list, triaged by severity and tied to the business risk and persona each one
            actually affects, rather than treating every finding as equally important.
          </Para>
        </Prose>

        <div style={{ overflowX: 'auto', margin: '12px 0 8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', lineHeight: 1.5 }}>
            <thead>
              <tr>
                {['Finding', 'Severity', 'Business risk', 'Persona', 'Fix effort'].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: 'left',
                      padding: '10px 14px',
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
              {FINDINGS.map((f) => (
                <tr key={f.finding}>
                  <td style={{ padding: '12px 14px', borderBottom: '1px solid #e8e8e8', color: '#4a4a4a', maxWidth: '320px' }}>
                    {f.finding}
                  </td>
                  <td style={{ padding: '12px 14px', borderBottom: '1px solid #e8e8e8' }}>
                    <SeverityTag level={f.severity} />
                  </td>
                  <td style={{ padding: '12px 14px', borderBottom: '1px solid #e8e8e8', color: '#6a6a6a' }}>
                    {f.risk}
                  </td>
                  <td style={{ padding: '12px 14px', borderBottom: '1px solid #e8e8e8', color: '#6a6a6a', whiteSpace: 'nowrap' }}>
                    {f.persona}
                  </td>
                  <td style={{ padding: '12px 14px', borderBottom: '1px solid #e8e8e8', color: '#6a6a6a', whiteSpace: 'nowrap' }}>
                    {f.effort}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <Divider />

      {/* ── The landscape ── */}
      <Reveal>
        <SectionLabel>03 / the landscape</SectionLabel>
        <SectionHeading>The landscape</SectionHeading>
        <Prose>
          <Para>Some notable companies operating in the Indian fintech space:</Para>
        </Prose>

        <Figure
          src={`${IMG}/competitor-logos.png`}
          alt="Logos of Stable Money, Groww, Moneycontrol, TradingView, Navi, INDmoney, Zerodha and The Economic Times"
        />

        <div style={{ overflowX: 'auto', margin: '32px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', lineHeight: 1.6 }}>
            <thead>
              <tr>
                {['Company', 'Insights on bonds', 'Bond investment platform'].map((h) => (
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
              {COMPETITOR_TABLE.map((c) => (
                <tr key={c.name} style={c.highlight ? { background: '#fafafa' } : undefined}>
                  <td
                    style={{
                      padding: '14px 16px',
                      borderBottom: '1px solid #e8e8e8',
                      fontWeight: c.highlight ? 700 : 600,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {c.name}
                  </td>
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid #e8e8e8', color: '#6a6a6a' }}>
                    {c.insights ? 'Yes' : '—'}
                  </td>
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid #e8e8e8', color: '#6a6a6a' }}>
                    {c.platform ? 'Yes' : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <Divider />

      {/* ── 1. Onboarding ── */}
      <Reveal>
        <SectionLabel>04 / page walkthrough</SectionLabel>
        <SectionHeading>1. Onboarding</SectionHeading>

        <SplitSection
          image={{
            src: `${IMG}/01-onboarding-login.png`,
            alt: 'Tap Bonds sign-in screen asking for a phone number, with an arrow pointing at the pre-ticked WhatsApp notifications checkbox',
            caption: 'The WhatsApp opt-in is ticked by default on every sign-in.',
          }}
          imageSide="left"
        >
          <Prose>
            <Para>
              Sign-in is smooth, but having to log in with an OTP every single time gets
              frustrating. I had to log in three times within two days.
            </Para>
            <Para>
              <strong style={{ color: '#000' }}>Fix:</strong> Introduce Google sign-in so users
              stay logged in. If phone number stays the norm, add a username and password option
              to make returning easier.
            </Para>
            <Para>
              At every sign-in, the WhatsApp notifications box is ticked by default, which can
              read as a marketing tactic. It would be friendlier and more transparent to remember
              the user’s previous choice.
            </Para>
          </Prose>
        </SplitSection>
      </Reveal>

      <Divider />

      {/* ── 2. Navigation bar ── */}
      <Reveal>
        <SectionHeading>2. Navigation bar</SectionHeading>

        <SplitSection
          image={{
            src: `${IMG}/02-nav-tools-dropdown.png`,
            alt: 'Tools dropdown in the Tap Bonds navigation, with an arrow pointing at the chevron beside each tool',
          }}
          imageSide="right"
        >
          <Prose>
            <Para>
              The arrow icons next to <strong style={{ color: '#000' }}>Tools</strong> and{' '}
              <strong style={{ color: '#000' }}>Knowledge Centre</strong> make sense, since both
              open a dropdown on hover. But the arrows beside every tool inside the dropdown
              aren’t needed. Hovering already changes the box from white to light blue, so the
              arrows are repetitive and suggest there’s another dropdown when there isn’t.
            </Para>
          </Prose>
        </SplitSection>

        <Figure
          src={`${IMG}/02-nav-right-menu.png`}
          alt="Right side of the navigation bar showing Search, What's new and Sign in, with the Sign in menu open showing Dashboard and Bond community"
        />

        <div className="grid gap-8 md:grid-cols-2" style={{ margin: '0 0 20px' }}>
          <Prose>
            <Para>
              <strong style={{ color: '#000' }}>What’s New</strong> and{' '}
              <strong style={{ color: '#000' }}>Search</strong> feel out of place. Dashboard is
              already on the nav bar, and the community link is already in Knowledge Centre.
            </Para>
          </Prose>
          <Prose>
            <Para>
              Dashboard could also live under the profile menu, alongside{' '}
              <strong style={{ color: '#000' }}>Wishlist</strong> and{' '}
              <strong style={{ color: '#000' }}>Logout</strong>, as well as on the nav bar.
            </Para>
          </Prose>
        </div>

        <Prose>
          <Para>And since we’re looking at community: why not Telegram or Slack?</Para>
        </Prose>

        <Figure
          src={`${IMG}/02-nav-ideal-flow.png`}
          alt="Flowchart of the proposed navigation: Logo, Dashboard, Tools, Knowledge Centre and User at the top level, with Tools, Knowledge Centre and User each expanding into their sub-pages"
          caption="Ideal navigation bar flow"
        />
      </Reveal>

      <Divider />

      {/* ── 3. Bond Finder ── */}
      <Reveal>
        <SectionHeading>3. Tools → Bond Finder</SectionHeading>

        <Pair
          left={{
            src: `${IMG}/03-bond-finder-table.png`,
            alt: 'Bond Finder results table with arrows pointing at the column headers and at an overlapping logo in the Available at column',
            caption: 'Overlapping logos in the Available at column: a UI bug that goes away when the page is zoomed out.',
          }}
          right={{
            src: `${IMG}/03-databento-reference.png`,
            alt: "Databento's data catalogue showing a hover tooltip that explains each column header",
            caption: 'Reference: databento.com explains its headers with a simple hover tooltip.',
          }}
        />

        <Prose>
          <Para>
            A lot of Tap Bonds users are new to investing too. It’s good practice to give them a
            basic idea of what each column header means, and a simple hover tooltip does the job
            (see{' '}
            <a
              href="https://databento.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#000', textDecoration: 'underline', textUnderlineOffset: '3px' }}
            >
              databento.com
            </a>
            ).
          </Para>
        </Prose>

        <Callout>
          <strong>An open question from the FAQ:</strong> Why is Bond Finder updated weekly when
          Bonds Directory updates daily at 2 AM? Doesn’t a weekly refresh affect investor choices,
          or is daily updating planned for later?
        </Callout>

        <Prose>
          <Para>
            <strong style={{ color: '#000' }}>My hypothesis:</strong> Bond Finder likely pulls
            from a third-party data vendor, priced or rate-limited per refresh, while Bonds
            Directory may run on an internally-maintained feed that’s cheaper to update. If that’s
            right, the fix isn’t necessarily “make Bond Finder daily too,” vendor economics may
            not allow it. The actual fix is to{' '}
            <strong style={{ color: '#000' }}>
              visibly timestamp Bond Finder’s “last updated”
            </strong>{' '}
            so an investor comparing it against Bonds Directory’s same-day data knows which one
            they’re looking at. The real risk here isn’t the refresh cadence, it’s two tools in
            the same product silently disagreeing with each other.
          </Para>
        </Prose>

        <SubHeading>After clicking on an instrument</SubHeading>

        <Figure
          src={`${IMG}/03-bond-detail-current.png`}
          alt="Bond detail page header where the ISIN appears in both the breadcrumb and the title row, with arrows marking the repetition"
          caption="Current: the issuer name and ISIN are repeated in the breadcrumb and the title row."
        />

        <Prose>
          <Para>The issuer name and ISIN appear twice in a row. Here’s a cleaner version:</Para>
        </Prose>

        <SplitSection
          image={{
            src: `${IMG}/03-bond-detail-proposed.png`,
            alt: 'Proposed bond detail page with the title row removed and the Active tag and share icon moved up into the breadcrumb',
            caption: 'Proposed: one row instead of two.',
          }}
          imageSide="left"
        >
          <Prose>
            <Para>
              No data is lost. The ISIN in the breadcrumb can carry the link that used to sit on
              the removed header.
            </Para>
          </Prose>
        </SplitSection>
      </Reveal>

      <Divider />

      {/* ── 4. Bond Screener ── */}
      <Reveal>
        <SectionHeading>4. Tools → Bond Screener</SectionHeading>

        <SplitSection
          image={{
            src: `${IMG}/04-screener-pros-cons.png`,
            alt: 'Navi Finserv Limited page in Bond Screener, with arrows pointing at Pros and Cons text broken across lines and at the AI Generated Summary button',
          }}
          imageSide="left"
        >
          <Prose>
            <Para>
              The Pros &amp; Cons content isn’t parsed into bullets correctly, so sentences break
              across separate points.
            </Para>
          </Prose>
        </SplitSection>

        <Prose>
          <Para>
            Clicking <strong style={{ color: '#000' }}>AI Generated Summary</strong> opens this:
          </Para>
        </Prose>

        <Figure
          src={`${IMG}/04-screener-ai-summary.png`}
          alt="AI generated summary text listing EPS, Current Ratio, Debt to Equity, Total Revenue and Net Income from March 2023"
          caption="The AI summary quotes March 2023 figures."
        />

        <SplitSection
          image={{
            src: `${IMG}/04-screener-key-metrics.png`,
            alt: 'Key Metrics tab on the same page showing March 2024 figures for EPS, Current Ratio, Debt to Equity and more',
            caption: 'The Key Metrics tab on the same page already shows March 2024.',
          }}
          imageSide="right"
        >
          <Prose>
            <Para>
              Compare EPS and Current Ratio in the AI summary with the Key Metrics tab: the AI
              data is out of date.
            </Para>
            <Para>
              So what’s the point of the AI summary, when everything in it is already on the
              page, in a much better format?
            </Para>
          </Prose>
        </SplitSection>
      </Reveal>

      <Divider />

      {/* ── 5. Bonds Directory ── */}
      <Reveal>
        <SectionHeading>5. Tools → Bonds Directory</SectionHeading>

        <SplitSection
          image={{
            src: `${IMG}/05-bonds-directory.png`,
            alt: 'Bonds Directory page with arrows pointing at the small Bonds Directory eyebrow label and the large Bonds Directory heading',
          }}
          imageSide="left"
        >
          <Prose>
            <Para>
              “Bonds Directory” is written twice, once as a small label and once as the heading.
              The upper label can go.
            </Para>
          </Prose>
        </SplitSection>
      </Reveal>

      <Divider />

      {/* ── 6. Talk to an Expert ── */}
      <Reveal>
        <SectionHeading>6. Tools → Talk to an Expert</SectionHeading>

        <SplitSection
          image={{
            src: `${IMG}/06-talk-to-expert-100-zoom.png`,
            alt: 'Talk to an expert booking modal at 100% zoom, with the confirm button cut off below the visible area',
            caption: 'At 100% zoom.',
          }}
          imageSide="right"
        >
          <Prose>
            <Para>
              At 100% zoom, the button to book a consultation isn’t visible. I had to zoom out to
              80% to find it.
            </Para>
          </Prose>
        </SplitSection>
      </Reveal>

      <Divider />

      {/* ── 7. Finance Wiki ── */}
      <Reveal>
        <SectionHeading>7. Knowledge Centre → Finance Wiki</SectionHeading>

        <SplitSection
          image={{
            src: `${IMG}/07-finance-wiki-current.png`,
            alt: 'Finance Wiki page at 100% zoom where category filters and the alphabet bar push the glossary cards below the fold',
            caption: 'Current Finance Wiki at 100% zoom.',
          }}
          imageSide="right"
        >
          <Prose>
            <Para>
              At 100% zoom, the glossary is hard to read because the filters take up most of the
              space.
            </Para>
            <Para>
              <strong style={{ color: '#000' }}>Fix:</strong> Let individual cards pop out when
              clicked.
            </Para>
          </Prose>
        </SplitSection>

        <Figure
          src={`${IMG}/07-finance-wiki-proposed.png`}
          alt="Mockup of the Finance Wiki with an Accrued Interest card expanded into a pop-out showing its definition and an Investopedia link"
          caption="Proposed: a single term opens as a pop-out card."
        />
      </Reveal>

      <Divider />

      {/* ── 8. Blogs ── */}
      <Reveal>
        <SectionHeading>8. Knowledge Centre → Blogs</SectionHeading>

        <SplitSection
          image={{
            src: `${IMG}/08-blog-post-categories.png`,
            alt: 'Blog post page with the Categories list in the sidebar circled',
          }}
          imageSide="left"
        >
          <Prose>
            <Para>
              The categories only show up on individual blog posts. They should also be on the
              main blog page, so readers can pick the topics they care about.
            </Para>
          </Prose>
        </SplitSection>

        <SplitSection
          image={{
            src: `${IMG}/08-blog-filter-proposed.png`,
            alt: 'Mockup of the blogs page with Finance, Bonds, Asset Leasing and Invoice Discounting filters added under the header',
            caption: 'One way to show category filters.',
          }}
          imageSide="right"
        >
          <Prose>
            <Para>
              This is just one example of how the filters could look. For design consistency,
              they could also follow the keyword chips already used on the Finance Wiki:
            </Para>
          </Prose>
        </SplitSection>

        <Figure
          src={`${IMG}/08-finance-wiki-chips.png`}
          alt="Finance Wiki filter chips: All, Financial Terms, Financial Instruments, Mutual Funds, Derivatives, Trading Terms"
          caption="Finance Wiki filter chips"
          maxWidth="420px"
        />
      </Reveal>

      <Divider />

      {/* ── 9. 1 Minute News ── */}
      <Reveal>
        <SectionHeading>9. Knowledge Centre → 1 Minute News</SectionHeading>

        <SplitSection
          image={{
            src: `${IMG}/09-1mn-section-current.png`,
            alt: 'Get latest news in 1min section showing four news cards, the newest dated 28 January 2025',
          }}
          imageSide="right"
        >
          <Prose>
            <Para>
              The latest pieces don’t show up first. 18 February was the newest piece on the news
              page, but it wasn’t reflected on the homepage or in Knowledge Centre → 1 Minute
              News.
            </Para>
          </Prose>
        </SplitSection>

        <Pair
          left={{
            src: `${IMG}/09-1mn-blogs-before.png`,
            alt: 'Current 1 Minute News section in Knowledge Centre with paginated cards',
            caption: 'Knowledge Centre → 1 Minute News',
          }}
          right={{
            src: `${IMG}/09-1mn-blogs-after.png`,
            alt: 'Proposed version with a single Check it out button, circled, in the top right',
            caption: 'Knowledge Centre → 1 Minute News (updated)',
          }}
        />

        <Prose>
          <Para>
            Instead of pagination, a single button can link to the full 1 Minute News page, with
            the latest story always on the first card. Ideally this page isn’t needed at all, and
            users can go straight to{' '}
            <a
              href="https://1minutenews.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#000', textDecoration: 'underline', textUnderlineOffset: '3px' }}
            >
              1minutenews.substack.com
            </a>
            .
          </Para>
        </Prose>
      </Reveal>

      <Divider />

      {/* ── Business strategy ── */}
      <Reveal>
        <SectionLabel>05 / business strategy</SectionLabel>
        <SectionHeading>Business strategy</SectionHeading>

        <div className="grid gap-8 md:grid-cols-2" style={{ margin: '0 0 24px' }}>
          <div>
            <p style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 14px' }}>
              If Tap Bonds eventually lets people invest on the platform, its competition is:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {INVEST_COMPETITORS.map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 14px' }}>
              If Tap Bonds stays a research-first platform, its competition is:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {RESEARCH_COMPETITORS.map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </div>
          </div>
        </div>

        <Callout>
          <strong>Assumption:</strong> Tap Bonds wants to stay a research-oriented platform rather
          than become an investing platform.
        </Callout>

        <Prose>
          <Para>That means it can focus on:</Para>
          <ul style={{ fontSize: '17px', lineHeight: 1.7, color: '#6a6a6a', paddingLeft: '24px', margin: '0 0 28px' }}>
            <li style={{ marginBottom: '8px' }}>
              <strong style={{ color: '#000' }}>Deeper analytical focus:</strong> a data-driven
              approach without pushing transactions.
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong style={{ color: '#000' }}>Trust and independence:</strong> users may trust
              the insights more because the platform isn’t tied to investment commissions.
            </li>
            <li>
              <strong style={{ color: '#000' }}>Flexible monetisation:</strong> reports,
              subscriptions or partnerships instead of transaction fees, priced for the Indian
              market.
            </li>
          </ul>
        </Prose>

        <SubHeading>Risks</SubHeading>
        <Prose>
          <ul style={{ fontSize: '17px', lineHeight: 1.7, color: '#6a6a6a', paddingLeft: '24px', margin: 0 }}>
            <li style={{ marginBottom: '8px' }}>
              <strong style={{ color: '#000' }}>Competition:</strong> established players already
              cover equity and mutual funds as well as bonds.
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong style={{ color: '#000' }}>International coverage:</strong> Tap Bonds only
              covers the Indian market, while several of these companies have already expanded
              internationally.
            </li>
            <li>
              <strong style={{ color: '#000' }}>Mobile app:</strong> it’s always easier to browse
              markets on a phone, and Tap Bonds doesn’t have an app yet.
            </li>
          </ul>
        </Prose>
      </Reveal>

      <Divider />

      {/* ── Where I'd focus ── */}
      <Reveal>
        <SectionLabel>06 / recommendations</SectionLabel>
        <SectionHeading>Where I’d focus</SectionHeading>
        <Prose>
          <Para>
            Rather than an unranked list of ideas, this is a roadmap: severity and effort decide
            what ships first, and what gets batched into cleanup.
          </Para>
        </Prose>

        <div className="grid gap-5 md:grid-cols-3" style={{ marginTop: '24px', marginBottom: '32px' }}>
          {ROADMAP.map((group, i) => (
            <div key={group.title} style={{ border: i === 0 ? '2px solid #000' : '1px solid #e8e8e8', padding: '24px' }}>
              <p style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 4px', lineHeight: 1.35 }}>{group.title}</p>
              <p style={{ fontSize: '12px', color: '#8a8a8a', margin: '0 0 16px' }}>{group.subtitle}</p>
              <ul style={{ fontSize: '14px', lineHeight: 1.6, color: '#6a6a6a', paddingLeft: '18px', margin: 0 }}>
                {group.items.map((p, j) => (
                  <li key={j} style={{ marginBottom: '6px' }}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <SubHeading>Strategic</SubHeading>
        <Prose>
          <Para>
            On top of the fixes above, the research-platform-vs-investing-platform fork,
            monetisation directions and competitive risk covered in Business strategy are the
            longer-horizon bets, worth revisiting once the roadmap above is clear.
          </Para>
        </Prose>
      </Reveal>

      <Divider />

      {/* ── Closing ── */}
      <Reveal>
        <a
          href="https://drive.google.com/file/d/16wLKbjddqxL3J7eUrWxN6nT4QVlNATb4/view"
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
          Read the full teardown (PDF)
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 L17 7 M9 7 h8 v8" />
          </svg>
        </a>
      </Reveal>
    </article>
  );
}
