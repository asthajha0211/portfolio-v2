---
title: "Tap Bonds: Product Teardown"
slug: tap-bonds-teardown
subtitle: "A page-by-page look at a bond research platform, and how I'd make it easier for every kind of investor to use."  # DRAFT, confirm with A
type: case-study
category: Product Teardown
year: 2025
scope: [UI/UX, Content, Functionality, Business Strategy]
platform: Web (mobile app was in development at the time)
cover_image: images/07-finance-wiki-proposed.png   # DRAFT, alternative: images/03-bond-detail-proposed.png
thumbnail: images/07-finance-wiki-proposed.png
logo: images/tapbonds-logo.png
---

<!--
=====================================================================
BUILD NOTES FOR CLAUDE CODE (do not render this block)
=====================================================================

WHAT THIS FILE IS
- Full copy for the Tap Bonds teardown case study page, in reading order.
- Everything between PAGE CONTENT START and PAGE CONTENT END is page copy.
- The IMAGE MANIFEST at the bottom is reference only. Do not render it.

FILES
- All images live in ./images/ next to this file. Copy them into the site's
  asset folder for this case study (e.g. /public/case-studies/tap-bonds/).
- Every image is a 2x PNG cropped from the original deck. Render at roughly
  half the pixel width listed in the manifest, or let them scale to the
  content column. Convert to WebP/AVIF if the site pipeline does that already.
- Persona avatars are circular PNGs with a transparent background and the
  blue ring already baked in. Do not add another border or border-radius.

HOW LAYOUT IS MARKED
- Standard markdown images: ![alt](path "caption"). The title string is the
  caption; render it as a <figcaption> under the image.
- Layout hints sit in HTML comments directly above the block they apply to:
    <!-- LAYOUT: full -->            image spans the wide/content column
    <!-- LAYOUT: split image-right --> text left, image right (stack on mobile, image after text)
    <!-- LAYOUT: split image-left -->  image left, text right (stack on mobile, image first)
    <!-- LAYOUT: pair -->             two images side by side as a before/after (stack on mobile)
    <!-- LAYOUT: persona-card -->     avatar + name/label + details card
    <!-- LAYOUT: chips -->            render list items as small pill tags
    <!-- LAYOUT: callout -->          render as an aside / highlighted note
  A hint applies until the next <!-- /LAYOUT --> marker.
- Screenshots already contain the original hand-drawn blue arrows and circles.
  Keep them. Some arrows are cut at the image edge because the arrow's tail
  pointed at a note that is now page text. That is expected.

STYLE
- Keep the site's existing case study template, type scale and colours.
- The deck's accent was a bright blue (#2563EB) which matches the annotation
  arrows. Use it for section numbers or eyebrow labels only if it fits the site.
- No em dashes anywhere in copy. Do not "fix" copy wording; ask A first.

DELIBERATELY LEFT OUT FROM THE DECK
- The closing "Hi, I am Astha Jha..." bio with personal email and phone.
  Use the site's normal footer/contact instead.
- A's phone number is blurred in images/01-onboarding-login.png.
=====================================================================
-->

<!-- PAGE CONTENT START -->

<!-- LAYOUT: hero -->
![Tap Bonds logo](images/tapbonds-logo.png)

# Tap Bonds: Product Teardown

This teardown looks at the UI/UX, content, functionality and business strategy of Tap Bonds. I focused only on the web version, since the mobile app was under major development at the time. I went through every page on the website, and wherever it helped, added a quick wireframe or flowchart to show how I think it could be improved.

<!-- LAYOUT: callout -->
**Mission:** Empower investors with deep research and analytics for the bond market, making fixed-income investing more accessible and transparent.
<!-- /LAYOUT -->

---

## Who uses Tap Bonds

Before getting into the changes, here are the kinds of people who are likely to use the website, and what gets in their way.

<!-- LAYOUT: persona-card -->
![Portrait of Rakhi Sharma, persona](images/persona-rakhi-sharma.png)

### Rakhi Sharma, 22
**Curious Beginner**

- **Occupation:** Recent graduate, working in her first job
- **Investment experience:** None, new to investing
- **Goals:** Wants to learn about investing, particularly bonds, but finds financial terms confusing
- **Pain points:**
  - Overwhelmed by financial jargon
  - Unsure how bonds compare to stocks or mutual funds
  - Struggles to evaluate which bond is safe or profitable
<!-- /LAYOUT -->

<!-- LAYOUT: persona-card avatar-right -->
![Portrait of Rakesh Mehta, persona](images/persona-rakesh-mehta.png)

### Rakesh Mehta, 45
**Seasoned Investor**

- **Occupation:** Senior IT Manager
- **Investment experience:** 15+ years in stocks, mutual funds and real estate; now exploring bonds for stability
- **Goals:** Wants a diversified portfolio with bonds, and efficient tools to research them without reading lengthy reports
- **Pain points:**
  - Finds bond data scattered across multiple sources
  - Needs quick, in-depth filtering on his own criteria (returns, maturity, credit rating, etc.)
<!-- /LAYOUT -->

<!-- LAYOUT: persona-card -->
![Portrait of Tamanna Kapoor, persona](images/persona-tamanna-kapoor.png)

### Tamanna Kapoor, 35
**Portfolio Manager**

- **Occupation:** Portfolio Manager at a financial advisory firm
- **Investment experience:** 10+ years in wealth management
- **Goals:** Needs in-depth, reliable bond data for clients, and efficient research tools to speed up investment decisions
- **Pain points:**
  - Needs bulk analysis tools for evaluating multiple bonds at once
  - Requires customised reports to present findings to clients
<!-- /LAYOUT -->

---

## The landscape

Some notable companies operating in the Indian fintech space:

<!-- LAYOUT: full -->
![Logos of Stable Money, Groww, Moneycontrol, TradingView, Navi, INDmoney, Zerodha and The Economic Times](images/competitor-logos.png)
<!-- /LAYOUT -->

<!-- TABLE: render as a compact comparison table; consider Yes/No as check/dash icons -->
| Company | Insights on bonds | Bond investment platform |
|---|---|---|
| Stable Money | Yes | Yes |
| Navi | No | No |
| Groww | No | No |
| INDmoney | Yes | Yes |
| Moneycontrol | Yes | No |
| The Economic Times | Yes | No |
| TradingView | No | No |
| Tap Invest | Yes | Yes |
| **Tap Bonds** | **Yes** | **No** |

---

## 1. Onboarding

<!-- LAYOUT: split image-left -->
![Tap Bonds sign-in screen asking for a phone number, with an arrow pointing at the pre-ticked WhatsApp notifications checkbox](images/01-onboarding-login.png "The WhatsApp opt-in is ticked by default on every sign-in.")

Sign-in is smooth, but having to log in with an OTP every single time gets frustrating. I had to log in three times within two days.

**Fix:** Introduce Google sign-in so users stay logged in. If phone number stays the norm, add a username and password option to make returning easier.

At every sign-in, the WhatsApp notifications box is ticked by default, which can read as a marketing tactic. It would be friendlier and more transparent to remember the user's previous choice.
<!-- /LAYOUT -->

---

## 2. Navigation bar

<!-- LAYOUT: split image-right -->
![Tools dropdown in the Tap Bonds navigation, with an arrow pointing at the chevron beside each tool](images/02-nav-tools-dropdown.png)

The arrow icons next to **Tools** and **Knowledge Centre** make sense, since both open a dropdown on hover. But the arrows beside every tool inside the dropdown aren't needed. Hovering already changes the box from white to light blue, so the arrows are repetitive and suggest there's another dropdown when there isn't.
<!-- /LAYOUT -->

<!-- LAYOUT: full -->
![Right side of the navigation bar showing Search, What's new and Sign in, with the Sign in menu open showing Dashboard and Bond community](images/02-nav-right-menu.png)
<!-- /LAYOUT -->

<!-- LAYOUT: split-text (two short text columns, stack on mobile) -->
**What's New** and **Search** feel out of place. Dashboard is already on the nav bar, and the community link is already in Knowledge Centre.

Dashboard could also live under the profile menu, alongside **Wishlist** and **Logout**, as well as on the nav bar.
<!-- /LAYOUT -->

And since we're looking at community: why not Telegram or Slack?

<!-- LAYOUT: full -->
![Flowchart of the proposed navigation: Logo, Dashboard, Tools, Knowledge Centre and User at the top level, with Tools, Knowledge Centre and User each expanding into their sub-pages](images/02-nav-ideal-flow.png "Ideal navigation bar flow")
<!-- /LAYOUT -->

---

## 3. Tools → Bond Finder

<!-- LAYOUT: pair -->
![Bond Finder results table with arrows pointing at the column headers and at an overlapping logo in the Available at column](images/03-bond-finder-table.png "Overlapping logos in the Available at column: a UI bug that goes away when the page is zoomed out.")
![Databento's data catalogue showing a hover tooltip that explains each column header](images/03-databento-reference.png "Reference: databento.com explains its headers with a simple hover tooltip.")
<!-- /LAYOUT -->

A lot of Tap Bonds users are new to investing too. It's good practice to give them a basic idea of what each column header means, and a simple hover tooltip does the job (see [databento.com](https://databento.com)).

<!-- LAYOUT: callout -->
**An open question from the FAQ:** Why is Bond Finder updated weekly when Bonds Directory updates daily at 2 AM? Doesn't a weekly refresh affect investor choices, or is daily updating planned for later?
<!-- /LAYOUT -->

### After clicking on an instrument

<!-- LAYOUT: full -->
![Bond detail page header where the ISIN appears in both the breadcrumb and the title row, with arrows marking the repetition](images/03-bond-detail-current.png "Current: the issuer name and ISIN are repeated in the breadcrumb and the title row.")
<!-- /LAYOUT -->

The issuer name and ISIN appear twice in a row. Here's a cleaner version:

<!-- LAYOUT: split image-left -->
![Proposed bond detail page with the title row removed and the Active tag and share icon moved up into the breadcrumb](images/03-bond-detail-proposed.png "Proposed: one row instead of two.")

No data is lost. The ISIN in the breadcrumb can carry the link that used to sit on the removed header.
<!-- /LAYOUT -->

---

## 4. Tools → Bond Screener

<!-- LAYOUT: split image-left -->
![Navi Finserv Limited page in Bond Screener, with arrows pointing at Pros and Cons text broken across lines and at the AI Generated Summary button](images/04-screener-pros-cons.png)

The Pros & Cons content isn't parsed into bullets correctly, so sentences break across separate points.
<!-- /LAYOUT -->

Clicking **AI Generated Summary** opens this:

<!-- LAYOUT: full -->
![AI generated summary text listing EPS, Current Ratio, Debt to Equity, Total Revenue and Net Income from March 2023](images/04-screener-ai-summary.png "The AI summary quotes March 2023 figures.")
<!-- /LAYOUT -->

<!-- LAYOUT: split image-right -->
![Key Metrics tab on the same page showing March 2024 figures for EPS, Current Ratio, Debt to Equity and more](images/04-screener-key-metrics.png "The Key Metrics tab on the same page already shows March 2024.")

Compare EPS and Current Ratio in the AI summary with the Key Metrics tab: the AI data is out of date.

So what's the point of the AI summary, when everything in it is already on the page, in a much better format?
<!-- /LAYOUT -->

---

## 5. Tools → Bonds Directory

<!-- LAYOUT: split image-left -->
![Bonds Directory page with arrows pointing at the small Bonds Directory eyebrow label and the large Bonds Directory heading](images/05-bonds-directory.png)

"Bonds Directory" is written twice, once as a small label and once as the heading. The upper label can go.
<!-- /LAYOUT -->

---

## 6. Tools → Talk to an Expert

<!-- LAYOUT: split image-right -->
![Talk to an expert booking modal at 100% zoom, with the confirm button cut off below the visible area](images/06-talk-to-expert-100-zoom.png "At 100% zoom.")

At 100% zoom, the button to book a consultation isn't visible. I had to zoom out to 80% to find it.
<!-- /LAYOUT -->

---

## 7. Knowledge Centre → Finance Wiki

<!-- LAYOUT: split image-right -->
![Finance Wiki page at 100% zoom where category filters and the alphabet bar push the glossary cards below the fold](images/07-finance-wiki-current.png "Current Finance Wiki at 100% zoom.")

At 100% zoom, the glossary is hard to read because the filters take up most of the space.

**Fix:** Let individual cards pop out when clicked.
<!-- /LAYOUT -->

<!-- LAYOUT: full -->
![Mockup of the Finance Wiki with an Accrued Interest card expanded into a pop-out showing its definition and an Investopedia link](images/07-finance-wiki-proposed.png "Proposed: a single term opens as a pop-out card.")
<!-- /LAYOUT -->

---

## 8. Knowledge Centre → Blogs

<!-- LAYOUT: split image-left -->
![Blog post page with the Categories list in the sidebar circled](images/08-blog-post-categories.png)

The categories only show up on individual blog posts. They should also be on the main blog page, so readers can pick the topics they care about.
<!-- /LAYOUT -->

<!-- LAYOUT: split image-right -->
![Mockup of the blogs page with Finance, Bonds, Asset Leasing and Invoice Discounting filters added under the header](images/08-blog-filter-proposed.png "One way to show category filters.")

This is just one example of how the filters could look. For design consistency, they could also follow the keyword chips already used on the Finance Wiki:

![Finance Wiki filter chips: All, Financial Terms, Financial Instruments, Mutual Funds, Derivatives, Trading Terms](images/08-finance-wiki-chips.png "Finance Wiki filter chips")
<!-- /LAYOUT -->

---

## 9. Knowledge Centre → 1 Minute News

<!-- LAYOUT: split image-right -->
![Get latest news in 1min section showing four news cards, the newest dated 28 January 2025](images/09-1mn-section-current.png)

The latest pieces don't show up first. 18 February was the newest piece on the news page, but it wasn't reflected on the homepage or in Knowledge Centre → 1 Minute News.
<!-- /LAYOUT -->

<!-- LAYOUT: pair -->
![Current 1 Minute News section in Knowledge Centre with paginated cards](images/09-1mn-blogs-before.png "Knowledge Centre → 1 Minute News")
![Proposed version with a single Check it out button, circled, in the top right](images/09-1mn-blogs-after.png "Knowledge Centre → 1 Minute News (updated)")
<!-- /LAYOUT -->

Instead of pagination, a single button can link to the full 1 Minute News page, with the latest story always on the first card. Ideally this page isn't needed at all, and users can go straight to [1minutenews.substack.com](https://1minutenews.substack.com/).

---

## Business strategy

<!-- LAYOUT: two-column (stack on mobile) -->
**If Tap Bonds eventually lets people invest on the platform, its competition is:**

<!-- LAYOUT: chips -->
- Stable Money
- Groww
- Navi
- INDmoney
- Zerodha
<!-- /LAYOUT -->

**If Tap Bonds stays a research-first platform, its competition is:**

<!-- LAYOUT: chips -->
- Moneycontrol
- TradingView
- Stable Money
- Groww
- Zerodha
- The Economic Times
<!-- /LAYOUT -->
<!-- /LAYOUT -->

<!-- LAYOUT: callout -->
**Assumption:** Tap Bonds wants to stay a research-oriented platform rather than become an investing platform.
<!-- /LAYOUT -->

That means it can focus on:

- **Deeper analytical focus:** a data-driven approach without pushing transactions.
- **Trust and independence:** users may trust the insights more because the platform isn't tied to investment commissions.
- **Flexible monetisation:** reports, subscriptions or partnerships instead of transaction fees, priced for the Indian market.

### Risks

- **Competition:** established players already cover equity and mutual funds as well as bonds.
- **International coverage:** Tap Bonds only covers the Indian market, while several of these companies have already expanded internationally.
- **Mobile app:** it's always easier to browse markets on a phone, and Tap Bonds doesn't have an app yet.

---

## Where I'd focus

After looking at the company's functions and goals, here's where I think Tap Bonds can improve:

<!-- LAYOUT: numbered-cards (3 cards in a row on desktop, stack on mobile) -->
### 1. Educational content and thought leadership
- Strengthen the Finance Wiki and Blogs to become an authority on bond research.
- Organise the YouTube channel into playlists like "Introduction to Bonds". The content already exists, it just needs structure.
- Once YouTube is established, run webinars, workshops or live Q&As with bond experts.

### 2. Community engagement and user trust
- Move beyond WhatsApp to Telegram, LinkedIn, Slack or a dedicated discussion forum.

### 3. Easier onboarding, UI fixes and retention
- Replace repeated OTP logins with Google sign-in.
- Introduce personalised bond recommendations based on user preferences and past activity (an ML model).
<!-- /LAYOUT -->

<!-- PAGE CONTENT END -->

<!--
=====================================================================
IMAGE MANIFEST (reference only, do not render)
=====================================================================
| File | Size (px, 2x) | Section | Layout | Alt text / caption source |
|---|---|---|---|---|
| tapbonds-logo.png | 480x204 | Hero | hero | alt in body |
| persona-rakhi-sharma.png | 484x484, transparent | Personas | persona-card | alt in body |
| persona-rakesh-mehta.png | 484x484, transparent | Personas | persona-card, avatar right | alt in body |
| persona-tamanna-kapoor.png | 484x484, transparent | Personas | persona-card | alt in body |
| competitor-logos.png | 2540x596 | Landscape | full | alt in body |
| 01-onboarding-login.png | 1750x760 | 1. Onboarding | split, image left | phone number blurred |
| 02-nav-tools-dropdown.png | 1766x776 | 2. Navigation | split, image right | |
| 02-nav-right-menu.png | 1984x280 | 2. Navigation | full (very wide, short) | |
| 02-nav-ideal-flow.png | 2380x1236 | 2. Navigation | full | caption: Ideal navigation bar flow |
| 03-bond-finder-table.png | 1192x614 | 3. Bond Finder | pair (left) | |
| 03-databento-reference.png | 1510x506 | 3. Bond Finder | pair (right) | |
| 03-bond-detail-current.png | 2006x348 | 3. Bond Finder | full (wide, short) | |
| 03-bond-detail-proposed.png | 1640x888 | 3. Bond Finder | split, image left | |
| 04-screener-pros-cons.png | 2112x970 | 4. Bond Screener | split, image left | |
| 04-screener-ai-summary.png | 2504x368 | 4. Bond Screener | full (wide, short) | |
| 04-screener-key-metrics.png | 2228x800 | 4. Bond Screener | split, image right | |
| 05-bonds-directory.png | 2094x918 | 5. Bonds Directory | split, image left | |
| 06-talk-to-expert-100-zoom.png | 1844x918 | 6. Talk to an Expert | split, image right | |
| 07-finance-wiki-current.png | 1974x858 | 7. Finance Wiki | split, image right | |
| 07-finance-wiki-proposed.png | 2534x1104 | 7. Finance Wiki | full; also cover/thumbnail | |
| 08-blog-post-categories.png | 1928x828 | 8. Blogs | split, image left | |
| 08-blog-filter-proposed.png | 1648x750 | 8. Blogs | split, image right | |
| 08-finance-wiki-chips.png | 836x222 | 8. Blogs | small inline, max ~420px wide | |
| 09-1mn-section-current.png | 2024x840 | 9. 1 Minute News | split, image right | |
| 09-1mn-blogs-before.png | 1390x558 | 9. 1 Minute News | pair (left) | |
| 09-1mn-blogs-after.png | 1390x558 | 9. 1 Minute News | pair (right) | |
=====================================================================
-->
