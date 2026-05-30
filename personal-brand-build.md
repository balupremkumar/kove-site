# Personal Brand Build — Balu / Kove
**Single-source build document for Claude Code design sessions**
**Last updated:** 2026-05-29
**Status:** Ready to execute — all decisions locked, all copy written, all specs included

---

## 0. How to use this document

This is a self-contained build doc. You should not need to ask the user clarifying questions for any of the assets listed here. Every decision has been made. Every piece of copy is written. Every spec is locked.

If something is genuinely missing or contradictory, flag it and continue with the rest. Do not block on it.

**Execution order:**
1. Read this entire document before starting
2. Set up the `kove-site` repo and brand asset folder
3. Build assets in the order listed in §11 Asset Checklist
4. Deploy site to Cloudflare Pages on push to main
5. Hand profile copy + visuals to user for LinkedIn manual update

**Skills to invoke during build:**
- `/soft` — for the Astro site (cinematic dark premium UI)
- `/design` — for LinkedIn banner and email signature visuals
- `/linkedin-nz-voice` — for tone-checking LinkedIn posts before saving

---

## 1. Brand foundation

### 1.1 The setup
- **Business name:** Kove
- **Personal brand name:** Balu (single name in personal contexts, "Balu Premkumar" in formal contexts only)
- **Tagline:** AI automation for NZ businesses
- **Founder:** Balu Premkumar, Christchurch, NZ
- **Domain:** kove.co.nz (one site, no separate personal domain)
- **Email:** balu@kove.co.nz
- **Phone:** [user to provide]
- **Day job:** Industry referenced only — never named (NDA / professional courtesy)

### 1.2 Positioning
**One-liner (use everywhere):**
> I automate the work that's slowing your team down.

**Extended positioning (for /about, bios, LinkedIn):**
> I build the kind of tools most consultants charge $50K for — then I hand them to your team and make sure they actually use them.

**Why this works:**
- Direct, outcome-led, no jargon
- Implicit pricing differentiator
- Implicit competence claim (I can build, not just recommend)
- "Actually use them" addresses the #1 SMB software fear

### 1.3 Three positioning pillars
1. **Hands-on, not advisory** — I build it, I deploy it, I train your team. No slide decks.
2. **NZ-specific** — I know the NZ market and the tools NZ businesses actually use (Xero, Tradify, ServiceM8, MYOB, Vend, Hnry).
3. **No lock-in** — Everything I build is yours. Source code, hosting, credentials. You own it.

### 1.4 ICP — Ideal client profile
- **Industry:** Trades (plumbers, builders, electricians, roofers) + professional services (architects, accountants, surveyors, consultants)
- **Geography:** Canterbury (Christchurch, Rangiora, Rolleston, Ashburton) — phase 2: Wellington + Auckland
- **Size:** 5–20 staff, $1M–$10M revenue
- **Structure:** Owner-operator or small management team, no in-house IT
- **Tech maturity:** Has Xero or similar, has a website, has at least one SaaS subscription. Not green-field.
- **Trigger signals:** Hiring (admin or ops role), recent growth, public mention of "spending too much time on X"

### 1.5 Client fears (write copy that addresses these)
1. Wasting money on tools that don't get used
2. Big agency relationship with no accountability
3. Locked into subscriptions they don't understand
4. Looking out-of-touch in front of their team
5. AI replacing their team (it won't — frame as augmentation)

### 1.6 Client desires (write copy that activates these)
1. Time back — especially evenings and weekends
2. Less admin friction
3. Things that "just work"
4. Looking sharp in front of their team
5. Growth without proportional headcount

### 1.7 Tone of voice
**Three rules:**
1. **NZ straight-talk** — no "leverage," no "synergy," no "ecosystem." If you wouldn't say it at a BBQ in Rolleston, don't write it.
2. **Warm but sharp** — confident without being arrogant. Opinions are fine; condescension is not.
3. **First person, singular** — "I" not "we." Solo. Honest.

**Banned words:** leverage, synergy, ecosystem, transform, innovative, cutting-edge, revolutionary, game-changing, world-class, best-in-class, unlock, empower, enable, robust, scalable (use "grows with you"), AI-powered (just say what it does)

**Preferred words:** build, ship, hand over, work, fix, save, find, run, automate, replace, remove

**Voice reference:** Linear blog posts. 37signals. Basecamp. Direct. Opinionated. No fluff.

---

## 2. Visual system (the design tokens)

### 2.1 Colour palette
```css
:root {
  /* Surfaces */
  --void:      #0B0D0E;   /* Background */
  --surface:   #111318;   /* Cards, nav, raised elements */
  --elevated:  #1A1D24;   /* Modals, dropdowns, popovers */
  --border:    rgba(255, 255, 255, 0.07);
  --border-strong: rgba(255, 255, 255, 0.12);

  /* Text */
  --text:      #F0F0F0;   /* Primary text */
  --text-muted: #9CA3AF;  /* Secondary text */
  --text-faint: #6B7280;  /* Tertiary, captions, timestamps */

  /* Accents */
  --amber:     #F59E0B;   /* CTA, primary action, brand */
  --amber-hover: #FBBF24;
  --emerald:   #10B981;   /* Metrics, positive signals, success */
  --red:       #EF4444;   /* Urgency, errors, warnings (use sparingly) */
  --blue:      #3B82F6;   /* Links, secondary actions */

  /* Effects */
  --glow-amber: 0 0 24px rgba(245, 158, 11, 0.25);
  --shadow-card: 0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 24px rgba(0,0,0,0.4);
  --shadow-elevated: 0 1px 0 rgba(255,255,255,0.06) inset, 0 20px 40px rgba(0,0,0,0.6);
}
```

### 2.2 Typography
**Headings:** `Inter`, fallback `system-ui, -apple-system, sans-serif`
**Body:** `Inter`, same fallback
**Mono:** `JetBrains Mono`, fallback `ui-monospace, "SF Mono", Menlo, monospace`

**Type scale (rem, mobile-first):**
```css
--text-xs:    0.75rem;   /* 12px — captions, timestamps */
--text-sm:    0.875rem;  /* 14px — secondary body, nav */
--text-base:  1rem;      /* 16px — body */
--text-lg:    1.125rem;  /* 18px — large body, lead paragraphs */
--text-xl:    1.5rem;    /* 24px — section subheadings */
--text-2xl:   2rem;      /* 32px — page H1 secondary */
--text-3xl:   2.75rem;   /* 44px — section headlines */
--text-4xl:   3.75rem;   /* 60px — page H1 */
--text-hero:  5.5rem;    /* 88px — hero on desktop (clamp on mobile) */
```

**Weights:** 400 (body), 500 (UI), 600 (subheadings), 700 (headlines)
**Tracking:** -0.02em for headlines ≥ 2rem, 0 for body, 0.02em for ALL-CAPS labels

### 2.3 Spacing scale (use Tailwind defaults)
4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192 px

### 2.4 Radius scale
```css
--radius-sm:  6px;    /* Buttons, chips */
--radius-md:  10px;   /* Cards, inputs */
--radius-lg:  16px;   /* Modals, large surfaces */
--radius-xl:  24px;   /* Hero containers */
```

### 2.5 Motion
**Duration:** 200ms (UI), 400ms (page transitions), 600–900ms (entrance animations)
**Easing:**
```css
--ease-out:    cubic-bezier(0.16, 1, 0.3, 1);    /* Default — exits and entrances */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);   /* State changes */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Playful — use sparingly */
```

**Principles:**
- Everything that enters fades + translates up 12px
- Everything that hovers lifts (translate-y -2px) + amber glow
- No bouncing, no parallax that breaks scroll
- Respect `prefers-reduced-motion`

### 2.6 Iconography
- **Library:** Lucide React (or Lucide Astro Icons)
- **Stroke:** 1.5px
- **Size:** 16px (inline), 20px (UI), 24px (feature), 32px+ (decorative)
- **Colour:** inherits text colour or amber for emphasis

### 2.7 Photography style
- Dark dominant, high contrast
- Subjects partially in shadow
- No stock photo energy — no fake handshakes, no diverse-team-around-laptop shots
- For headshot: see §10 headshot brief

### 2.8 Logo / wordmark spec
- **Wordmark:** `Kove` in Inter 600, tracked -0.04em
- **Colour:** white (#F0F0F0) or amber (#F59E0B) — never both
- **Sizes:** 24px (nav), 32px (footer), 48px (hero/about), 64px+ (banners)
- **Clearspace:** 0.5x height of the wordmark on all sides
- **Personal mark:** lowercase `balu` in same treatment, used on /about and email sig only

---

## 3. Site architecture — kove.co.nz

### 3.1 Stack and infrastructure
- **Framework:** Astro 4 (static-first, MDX for case studies)
- **Styling:** Tailwind CSS + custom CSS variables for tokens
- **Hosting:** Cloudflare Pages (free, automatic HTTPS, global CDN)
- **Deploy:** GitHub → Cloudflare Pages auto-deploy on push to `main`
- **Forms:** Cloudflare Pages Functions (serverless) → forwards to balu@kove.co.nz
- **Analytics:** Cloudflare Web Analytics (privacy-first, no cookies)
- **Performance budget:** Lighthouse 95+ all categories, < 50kb initial JS

### 3.2 Repo structure
```
kove-site/
├── public/
│   ├── og-default.jpg          (1200×630, dark void with Kove wordmark)
│   ├── favicon.svg
│   └── fonts/                  (Inter + JetBrains Mono self-hosted)
├── src/
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── Hero.astro
│   │   ├── ServicePillar.astro
│   │   ├── PricingTable.astro
│   │   ├── CaseStudyCard.astro
│   │   ├── ProofStrip.astro
│   │   └── ContactForm.astro
│   ├── content/
│   │   ├── config.ts           (Astro content collections)
│   │   └── work/               (MDX case studies)
│   ├── layouts/
│   │   └── Base.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── services.astro
│   │   ├── work/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   └── 404.astro
│   └── styles/
│       └── globals.css         (token vars, base resets)
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── README.md
```

### 3.3 Component specs

**Nav.astro**
- Sticky, transparent → solid surface on scroll
- Height 64px, padding-x 32px desktop / 16px mobile
- Layout: `[Kove wordmark left] [Work · Services · About centre] [Phone right]`
- Phone in amber, weight 500, with phone icon
- Mobile: hamburger → fullscreen overlay, same items stacked
- Scroll behaviour: backdrop-filter blur 12px when scrolled > 24px

**Footer.astro**
- 96px top padding, 48px bottom
- 3 columns desktop, stacked mobile:
  - Col 1: Kove wordmark + tagline + Christchurch, NZ
  - Col 2: Sitemap (Work, Services, About, Contact)
  - Col 3: Contact — phone, email (balu@kove.co.nz), LinkedIn link
- Bottom strip: `© 2026 Kove · Built in Christchurch · NZBN [number]`

**Button.astro**
- Variants: `primary` (amber bg, void text), `secondary` (transparent, amber border + text), `ghost` (transparent, text only)
- Sizes: `sm` (32px), `md` (44px), `lg` (56px)
- Hover: translate-y -1px, amber glow on primary, border brightens on secondary
- Always include focus-visible ring (2px amber)
- Loading state: spinner replaces label, button width preserved

**Card.astro**
- Background `--surface`, border `--border`, radius `--radius-md`
- Padding 24px
- Hover: border `--border-strong`, translate-y -2px, shadow lifts

**ContactForm.astro**
- Fields: Name, Email, Phone (optional), Business name, "What's slowing your team down?" (textarea, required, 500 char limit)
- Submission: POST to `/api/contact` (Cloudflare Pages Function)
- Function sends email to balu@kove.co.nz via Resend or MailChannels (free)
- Honeypot field for spam
- Success state: replace form with `Thanks. I'll be in touch within 1 working day.`

### 3.4 SEO baseline (every page)
- Unique `<title>` and `<meta description>` per page
- Open Graph image (1200×630, generated per page or default void+wordmark)
- Schema.org `LocalBusiness` markup on contact page
- Sitemap.xml + robots.txt auto-generated by Astro
- Canonical URLs set
- All images lazy-loaded, modern formats (WebP/AVIF)

### 3.5 Responsive breakpoints
- Mobile-first
- `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px
- Hero text uses `clamp(2.5rem, 8vw, 5.5rem)` for fluid scaling
- Test target: iPhone 12 (390px) up to 4K (2560px+)

---

## 4. Site pages — full copy and structure

### 4.1 Homepage (`/`)

**`<title>`:** Kove — AI automation for NZ businesses
**Meta description:** I build AI automation tools for Canterbury trades and professional services businesses. Save your team 10+ hours a week. Christchurch, NZ.

**Section 1 — Hero (full viewport)**

Headline (H1):
> I automate the work that's slowing your team down.

Sub-headline:
> I build the kind of tools most consultants charge $50K for — then I hand them to your team and make sure they actually use them.

CTAs:
- Primary: `Book a free 20-min call` → /contact
- Secondary: `See the work` → /work

Below fold (still in hero):
- 3 proof numbers in a row, separated by thin dividers:
  - `10+ hours / week saved per client`
  - `$0 lock-in — you own everything`
  - `Built in Christchurch, NZ`

Background: void black with subtle radial gradient (amber 5% opacity, top-right corner), animated grain texture overlay

Animation:
- Headline letters fade in left-to-right, 40ms stagger, 600ms total
- Sub-headline fades in at 800ms
- CTAs fade in + translate-up at 1100ms
- Proof numbers fade in at 1400ms with 100ms stagger between them

**Section 2 — What I do (three pillars)**

Section heading: `What I build`
Section intro (1 line): `Three things, done well. Not a menu of services I'll never deliver.`

Three cards, equal width, side by side desktop / stacked mobile:

Card 1 — Workflow automation
> **Workflow automation**
> Take the repetitive bits — quoting, invoicing, follow-ups, data entry — and make them run themselves. Most teams get 10+ hours a week back.

Card 2 — Custom internal tools
> **Custom internal tools**
> The CRM, dashboard, or job tracker you wish existed. Built for your business, not a generic SaaS template.

Card 3 — AI integration
> **AI integration**
> Claude, GPT, or local models doing real work — summarising emails, drafting quotes, reading PDFs, generating reports. Not chatbots. Actual tools.

Each card has a small Lucide icon (Zap, Wrench, Sparkles) at top in amber.

**Section 3 — Why work with me**

Section heading: `Why me, not an agency`
Three rows, alternating left-right image/text on desktop, stacked mobile:

Row 1 — Hands-on
> **I build, I don't just consult**
> Most "AI consultants" sell you a roadmap and disappear. I write the code, deploy it, and sit with your team until it's running. If it doesn't work, that's on me.

Row 2 — NZ-specific
> **I know the NZ stack**
> Xero, Tradify, ServiceM8, MYOB, Vend, Workflow Max. I've integrated with all of them. I won't waste your time learning what your business uses.

Row 3 — No lock-in
> **You own everything**
> Source code, accounts, credentials, hosting. The day we finish, it's yours. No retainer required, no SaaS dependency I control.

**Section 4 — Pricing teaser**

Section heading: `Pricing`
Section intro: `Three ways to work together. Start anywhere.`

Simplified 3-card pricing strip (link through to /services for detail):

| Workflow Review | Audit + Build | Monthly retainer |
|---|---|---|
| **$250–350** | **$8,500–14,000** | **$1,800–3,200/mo** |
| 90-minute deep dive, written plan, no pitch | Full build — discovery, design, deploy, train | Ongoing automation partner |
| `Start here →` | `See scope →` | `Talk to me →` |

**Section 5 — Selected work**

Section heading: `Selected work`
Section intro: `Anonymised because clients prefer it that way.`

Grid of 3 case study cards (latest first). Each card:
- Industry badge (amber, small)
- Headline (e.g. "Cut quoting time from 3 hours to 20 minutes")
- 1-sentence summary
- `Read case study →` link

`See all work →` link at bottom.

**Section 6 — Final CTA strip**

Centred, generous padding:
> **What would you do with 10 hours back this week?**
> Book a free 20-minute call. No pitch. I'll ask about your business and tell you what I'd automate first.
>
> `Book a call →`

Or, contact form embedded inline.

---

### 4.2 Services (`/services`)

**`<title>`:** Services — Kove
**Meta description:** Three ways to work together. Workflow Review from $250, full Audit + Build from $8,500, monthly retainers from $1,800.

**Hero**
H1: `Three ways to work together`
Sub: `Start small. Scale as it makes sense. Never anything you don't need.`

**Tier 1 — Workflow Review**

```
WORKFLOW REVIEW                                          $250–350
─────────────────────────────────────────────────────────────────
A 90-minute deep dive into how your team actually works.

I sit with you (in person if Canterbury, video otherwise) and walk
through your current workflow. I'll identify the highest-impact
automation opportunities and write you a plan — what to build,
in what order, and what it would take.

You get:
  • 90-minute working session
  • Written report (5-10 pages)
  • Prioritised list of automation opportunities
  • Estimated hours saved + rough build cost for each

You do not get:
  • A sales pitch for my services
  • Vague advice you can't act on
  • A 60-page slide deck

Why this exists:
  Most businesses don't know which automation to build first.
  This makes that decision easy — and gives you something useful
  even if you never work with me again.

[Book a Workflow Review →]
```

**Tier 2 — Audit + Build**

```
AUDIT + BUILD                                       $8,500–14,000
─────────────────────────────────────────────────────────────────
End-to-end. Discovery to deployment.

I work with you for 4–8 weeks to find the highest-impact
automation in your business, build it, deploy it, and train your
team until it's actually being used. Most projects pay back the
fee within 3–6 months.

Typical scope:
  • Week 1–2: Discovery, scope, requirements
  • Week 2–6: Build, iterate, test
  • Week 6–8: Deploy, train, handover

You get:
  • Working software in production
  • All source code in your GitHub
  • All credentials in your accounts
  • Written documentation
  • Team training sessions
  • 30 days post-launch support

Typical projects:
  • Automated quoting and proposal generation
  • Custom CRM or job tracking system
  • Document/PDF processing pipelines
  • AI-assisted email triage and drafting
  • Internal dashboards that pull from multiple sources

[Start with a Workflow Review →]
```

**Tier 3 — Monthly retainer**

```
MONTHLY RETAINER                                $1,800–3,200/month
─────────────────────────────────────────────────────────────────
For businesses where automation is now a competitive advantage.

You get me on call. I maintain what I've built, ship new
automations as opportunities emerge, and treat your tech stack
as mine to look after.

Typical commitment:
  • 1–2 days per week of build time
  • Response within 1 working day
  • Monthly check-in + strategy session
  • Minimum 3-month commitment

Good fit if:
  • You've already worked with me on an Audit + Build
  • You have 3+ automation ideas in the queue
  • Your team is hitting limits the current tools can't solve

[Talk to me about retainers →]
```

**Section — What I don't do**

> **What I don't do**
> - Lead generation services or marketing automation
> - Website builds (this site is the exception)
> - Generic "AI strategy" or training workshops
> - Chatbots
> - Anything I don't believe will pay for itself

**Section — FAQ**

5 questions:
1. **How quickly can you start?** Usually 2–4 weeks from Workflow Review to first build day.
2. **Do you work onsite?** In Canterbury, yes — happy to spend a day with your team. Elsewhere, video and async.
3. **What happens if I don't like what you build?** First milestone is paid 50% on signing, 50% on acceptance. If you don't accept, you don't pay the second half.
4. **Can I see examples?** See /work. Most are anonymised because clients prefer it.
5. **Do you do retainers without an Audit + Build first?** Rarely. Retainers work when there's already infrastructure to maintain.

**Final CTA**
Same as homepage — `Book a Workflow Review` or contact form embed.

---

### 4.3 Work index (`/work`)

**`<title>`:** Work — Kove
**Meta description:** Selected automation projects for NZ trades and professional services businesses. Anonymised because clients prefer it.

**Hero**
H1: `Selected work`
Sub: `Most clients prefer to stay anonymous. The work and the numbers are real.`

**Grid**
- 2 columns desktop, 1 mobile
- Each card: industry badge, headline, 1-sentence summary, 2-3 metric chips, `Read case study →`

**Default content (use these even before real client wins, as "What I've built" rather than client case studies):**

Card 1 — `/work/canterbury-lead-generator`
- Badge: `Internal tool`
- Headline: `Cut lead research from a full day to zero`
- Summary: `Built an automated pipeline that finds, enriches and scores Canterbury business leads overnight — replacing 6+ hours per week of manual research.`
- Chips: `Python` · `Claude API` · `Saved 6 hrs/week`

Card 2 — `/work/forge-crm`
- Badge: `Internal tool`
- Headline: `Replaced 3 SaaS subscriptions with one custom CRM`
- Summary: `Built a fast, dark, kanban-first CRM after every off-the-shelf option had too much friction. Now used daily for lead pipeline, project tracking, and follow-ups.`
- Chips: `Node.js` · `SQLite` · `React`

Card 3 — `/work/voice-dictation`
- Badge: `Internal tool`
- Headline: `Speech-to-text that pastes into any Windows app`
- Summary: `Built a background dictation tool that learns from corrections over time. Faster than typing, works in VS Code, email, and any focused window.`
- Chips: `Python` · `Whisper` · `Personal productivity`

---

### 4.4 Work case study template (`/work/[slug]`)

Each case study (MDX) uses this structure:

```markdown
---
title: [Headline — outcome-led]
industry: [e.g. "Canterbury engineering firm, 25 staff" or "Internal tool"]
date: 2026-MM-DD
metrics:
  - "6 hours / week saved"
  - "Replaces 3 SaaS subscriptions"
  - "Built in 4 weeks"
tags: [Python, Claude API, etc]
ogImage: /og/[slug].jpg
---

## The problem
[1–2 paragraphs — what was happening before, what it was costing]

## What I built
[2–3 paragraphs — the actual solution, decisions made, technical approach
at a level your client could read]

## How it works
[Optional — diagram or numbered list if helpful]

## The result
- [Metric 1 with context]
- [Metric 2 with context]
- [Metric 3 with context]

## Tech used
[Tags / list]

---

[CTA — Want something similar? Book a Workflow Review →]
```

**First three case studies to write (use the showcase content from §6):**
1. `/work/canterbury-lead-generator`
2. `/work/forge-crm`
3. `/work/voice-dictation`

---

### 4.5 About (`/about`)

**`<title>`:** About — Balu, founder of Kove
**Meta description:** I'm Balu. I build AI automation tools for NZ businesses from Christchurch. Here's why and how I work.

**Section 1 — Hero**

Layout: 2 columns desktop, stacked mobile.
- Left: photo (placeholder until real headshot — see §10)
- Right:
  - Eyebrow (small caps, amber): `ABOUT`
  - H1: `I'm Balu.`
  - Lead paragraph (text-lg):
    > I build AI automation tools for NZ businesses. I work alone, I build the actual software, and I make sure your team can use it without me.

**Section 2 — The story**

H2: `Why this exists`
Body (3 short paragraphs):

> I spent years watching businesses spend thousands on software that sits unused. Tools bought because they were on a shortlist, deployed because someone approved a budget, abandoned because no one had time to make them work.
>
> The problem was never the tool. It was that no one was responsible for making it land — for shaping it to how the team actually works, for sitting next to people while they figured it out, for fixing the friction that always shows up in week two.
>
> So I started building the tools myself. And the more I built, the clearer it got: the work was always 30% software and 70% craft.

**Section 3 — What I've built**

H2: `Things I've shipped`
Sub: `Side projects, internal tools, things built because they didn't exist yet.`

Three showcase cards (from §6 "What I've built"):

Card 1 — **Canterbury Lead Generator**
> A multi-source lead pipeline I built for my own outreach. Scrapes 14 NZ business directories, enriches each lead with Claude, SMTP-verifies emails, scores against 18 signals, and auto-drafts personalised cold emails. Replaced a full day of weekly manual research.
> `Python · Playwright · Claude Haiku · SQLite`

Card 2 — **Forge**
> A custom CRM I built after every off-the-shelf tool felt too slow. Kanban-first, dark, fast. Custom fields, automation rules, dashboard. Used daily for project tracking and lead pipeline.
> `Node.js · SQLite · React · Tailwind`

Card 3 — **Voice Dictation**
> A Windows background app that records on a hotkey, transcribes with Whisper, and pastes the result into whatever app I'm in. Learns from my corrections — over time it stops making the same mistakes twice.
> `Python · Whisper · Tkinter · Win32`

**Section 4 — How I work**

H2: `How I work`

Three principles:

> **I build, I don't consult.**
> You get working software, not a slide deck. If you can't run it on day 90, I haven't done my job.
>
> **You own everything.**
> Source code in your GitHub. Credentials in your accounts. Hosting on your bill. No lock-in, ever.
>
> **Your team has to actually use it.**
> I don't count a project as done until adoption is real. That means training, documentation, and being available to fix the friction that always shows up.

**Section 5 — Background**

H2: `Background`
Body:
> By day I work as a [role/title] in [industry — referenced not named]. I've spent the last several years automating internal processes that save my team thousands of hours a year, building internal tools that replaced expensive vendor software, and being the person who gets asked "can you just make this work?"
>
> Kove is what I do in the evenings and weekends — and where I'm taking the same approach to other NZ businesses.

[User: fill in the specifics about the role/industry framing before this goes live.]

**Section 6 — CTA**

Centred:
> **Want to talk?**
> If you've got a workflow that's eating your team's time, I'd like to hear about it. The first call is free and there's no pitch.
>
> `Book a 20-min call →`

---

### 4.6 Contact (`/contact`)

**`<title>`:** Contact — Kove
**Meta description:** Get in touch. I reply within 1 working day. Christchurch, NZ.

**Layout:** 2 columns desktop, stacked mobile.

**Left column — Contact form**

Fields:
- Name (required)
- Email (required)
- Phone (optional)
- Business name (optional)
- "What's slowing your team down?" (textarea, required, 500 char limit)
- Submit button — `Send`

Success state replaces form:
> **Got it. Thanks.**
> I'll reply within 1 working day — usually faster. If it's urgent, the phone number's faster.

**Right column — Direct contact**

> **Or skip the form**
>
> 📧 balu@kove.co.nz
> 📞 [phone number]
> 📍 Christchurch, Canterbury, NZ
>
> **Reply time**
> 1 working day or less, every time.
>
> **For Workflow Reviews**
> Mention "Workflow Review" in your message and I'll send a calendar link.

---

### 4.7 404 page

H1: `Not here.`
Sub: `That URL doesn't exist. Probably never did.`
CTA: `← Back to kove.co.nz`

---

## 5. LinkedIn — full asset pack

### 5.1 Banner image
**Dimensions:** 1584×396px (LinkedIn standard), 3168×792 for retina (provide both)
**Format:** PNG, max 4MB
**File:** `kove-brand/linkedin-banner.png` and `linkedin-banner@2x.png`

**Design spec:**
- Background: void black `#0B0D0E`, subtle radial gradient amber 5% top-right
- Subtle grain/noise overlay (5–8% opacity)
- Optional: very faint thin grid lines (5% white opacity, 80px spacing)

**Content layout (left-aligned, vertically centred):**
- Eyebrow (small caps, tracked +0.1em, amber #F59E0B, 14px): `KOVE · CHRISTCHURCH NZ`
- Headline (Inter 600, 56px, white): `Balu`
- Sub (Inter 400, 22px, #9CA3AF): `I automate the work that's slowing your team down.`

**Right side (bottom-right, 64px margin):**
- Small Kove wordmark (amber, 18px)
- Small text below (12px, #6B7280): `kove.co.nz`

**Safe zones:**
- Mobile crops to centre — keep important content within centre 1200px
- Profile photo overlaps bottom-left — leave 200×200px safe area there

### 5.2 Profile photo
- 400×400px minimum, 800×800px ideal
- Background: dark surface `#111318` (lift edges with subtle vignette)
- See §10 headshot brief for capture spec

### 5.3 LinkedIn copy — paste-ready

**Name:** Balu Premkumar

**Headline (220 char max — current: 158):**
> AI Automation Consultant · Founder, Kove · I build tools that save NZ businesses 10+ hours a week · Canterbury

**Location:** Christchurch, Canterbury, New Zealand

**Industry:** Business Consulting and Services

**About section (paste verbatim):**

```
Most NZ businesses are one automation away from getting 10 hours back a week. I find it, build it, and make sure your team actually uses it.

I'm Balu. I run Kove — a Christchurch-based AI automation consultancy for trades and professional services businesses. Plumbers, builders, electricians, architects, accountants. Teams of 5 to 20 who know they're losing time to admin but haven't had the right person to fix it.

What makes me different from an agency:
→ I build the actual software. Not a roadmap, not a slide deck.
→ I know the NZ stack — Xero, Tradify, ServiceM8, MYOB, Workflow Max.
→ You own everything. Source code, accounts, credentials. No lock-in.

What I've shipped:
→ A multi-source lead pipeline that finds and scores Canterbury business leads automatically. Replaced 6+ hours per week of manual research.
→ A custom CRM that replaced three SaaS subscriptions, built because every off-the-shelf option had too much friction.
→ A Windows speech-to-text tool that learns from corrections and pastes into any app — built for my own productivity.

I work three ways:
1. Workflow Review — $250–350 for a 90-minute deep dive and written plan. No pitch.
2. Audit + Build — $8,500–14,000 for end-to-end project delivery.
3. Monthly retainer — $1,800–3,200/mo for ongoing automation partnership.

If your team's losing hours to repetitive work, I'd like to hear about it.

→ kove.co.nz
→ balu@kove.co.nz
```

**Featured section (3 items, configure after site launches):**
1. Link to kove.co.nz (image: OG image)
2. Link to /work/canterbury-lead-generator (image: case study OG image)
3. Pinned post — your first strong LinkedIn post (see §5.4)

**Experience entry:**
- **Title:** Founder & AI Automation Consultant
- **Company:** Kove
- **Dates:** Jan 2026 – Present
- **Location:** Christchurch, Canterbury, NZ
- **Description:**
```
I build AI automation tools for NZ trades and professional services businesses. End-to-end — discovery, design, build, deploy, train, handover.

Recent work includes a multi-source lead generation pipeline, a custom CRM, and AI-assisted document processing tools.

Working with businesses of 5–20 staff across Canterbury who want to get serious about automation without locking themselves into agencies or SaaS subscriptions they don't understand.

→ kove.co.nz
```

**Skills to add (top 10, in this order):**
1. Workflow Automation
2. AI Integration
3. Python
4. Process Improvement
5. Business Analysis
6. API Integration
7. Claude API / Anthropic
8. No-Code/Low-Code Development
9. Internal Tooling
10. Small Business Consulting

**Services section** (LinkedIn lets you list services):
- Workflow Automation
- AI Consulting
- Custom Software Development
- Process Consulting

### 5.4 Content strategy — first 10 posts

**Posting cadence:** 3x per week — Tuesday, Thursday, Friday 7:30am NZT
**Pillars:** Proof (40%) · Education (40%) · Build log (20%)

#### Post 1 — Education / Hook (Tuesday, week 1)

```
3 hours a week.

That's what a Canterbury plumber I know spends on quotes that never close.

Not the quotes that win. The quotes that go nowhere. Pricing them up, formatting them, emailing them, following up twice, then closing the file when they don't reply.

If you're running an SMB and you can name the thing that does this in your business — congratulations, you've already done the hardest part of automating it.

What's yours?
```

#### Post 2 — Proof / Build log (Thursday, week 1)

```
I built a thing that finds Canterbury business leads automatically.

14 NZ directories. Scrapes them overnight. Enriches every lead with Claude — owner name, website, tech stack, whether they're hiring. Verifies the email actually works. Scores each one against 18 signals. Drafts a personalised cold email.

What used to take me a full day of manual research now runs while I sleep.

The tools have been free or near-free the whole time. The only scarce resource was someone willing to wire it together.

Most businesses I talk to have the same shape of problem — some piece of work that's "just admin" but is eating someone's day. Almost always automatable. Almost never automated.
```

#### Post 3 — Education / Opinion (Friday, week 1)

```
The first automation I'd build for any trades business:

Not the CRM.
Not the dashboard.
Not the "AI-powered" anything.

I'd automate the quote-to-invoice handoff.

Why: it's the moment money is most at risk. A quote that doesn't get followed up. An invoice that gets sent late. A variation that doesn't make it into the final bill.

Three days a year of that adds up to real money — usually 5 figures for a 10-person team.

It's also boring enough that no one wants to fix it manually. Which is exactly why automating it pays back fast.
```

#### Post 4 — Education / Research (Tuesday, week 2)

```
I mapped every software a typical Canterbury plumbing business uses.

I counted 9.

Xero. Tradify. Google Workspace. Banks portal. Suppliers portal x2. Compliance portal. Bookings tool. Personal phone WhatsApp groups.

Of those 9, exactly zero talk to each other natively.

Every "process" in the business is a person manually moving information between them. That person is usually the owner, usually after dinner.

This is what AI automation actually fixes. It's not "AI" — it's plumbing. (Pun intended.)
```

#### Post 5 — Positioning / Opinion (Thursday, week 2)

```
What $250 buys you before you spend $10K on software:

A 90-minute conversation with someone who knows the NZ stack, asking your team how they actually work, and writing down what to automate first.

I call it a Workflow Review. It exists because I watched too many businesses spend $30K on tools nobody used, when $250 of clear thinking would have told them what to build instead.

No pitch at the end. If you don't want to work with me after, that's fine. The report is yours either way.

(Yes, this is the trojan horse. But it's also genuinely useful even if you never call me back. That's the deal.)
```

#### Post 6 — Build log (Friday, week 2)

```
I built my own CRM in a weekend.

Not because the market needed another CRM. Because every existing one had something that made me grit my teeth — slow, bloated, ugly, locked-in.

So: SQLite. Node. React. Tailwind. Kanban view, dashboard, custom fields, automation rules. Dark mode that's actually dark. Loads in under a second.

I now use it every day for project tracking and lead pipeline. It replaced three SaaS subscriptions.

The point isn't that everyone should build their own CRM. The point is: when your tools are slowing you down, the cheapest fix often isn't buying a fancier tool. It's building exactly what you need.

That's true for businesses too.
```

#### Post 7 — Education / Demystifying (Tuesday, week 3)

```
Here's what "AI automation" actually means for a 10-person electrical company:

→ A quote comes in via the contact form. Claude reads it, classifies it (emergency / install / inspection), drafts a response in your voice, and queues it for review.

→ A site photo goes into a folder. The system extracts the materials list, matches it to your supplier catalogue, and pre-fills an order.

→ Friday afternoon, the system summarises the week — jobs done, hours logged, invoices sent vs unpaid — and emails it to the owner.

None of this involves a chatbot. None of it replaces a tradesperson. All of it removes admin work that nobody wants to do anyway.

That's the deal. AI does the boring bits. The skilled work stays where it should — with your team.
```

#### Post 8 — Process / Opinion (Thursday, week 3)

```
3 questions I ask every business before touching their workflow:

1. What's the work your team does that doesn't need a human?
2. What's the work that nobody owns and so it just leaks time?
3. What's the work where you keep saying "we should fix that one day"?

90% of automation opportunities live in those three answers.

I don't need a software stack audit. I don't need a discovery deck. I need 30 minutes of honest answers from someone who knows where the time actually goes.

The good ones always know. They just haven't been asked.
```

#### Post 9 — Personal / Differentiation (Friday, week 3)

```
Why I don't use "we" on my website.

I'm one person.

If you hire me, you get me. Not an account manager, not a developer pool, not a slide deck written by someone you'll never meet.

This is a feature, not a limitation:
→ I show up to every meeting.
→ I write every line of code.
→ I sit with your team during rollout.
→ When something breaks, I'm the one fixing it.

It also means I can only take on so many clients at a time. That's by design.

If you've worked with an agency before and felt like the talent disappeared after the kick-off — this isn't that.
```

#### Post 10 — Technical credibility (Tuesday, week 4)

```
The Canterbury Lead Generator — under the hood.

For anyone who wants to know how the thing actually works:

→ 14 source scrapers (Playwright + BeautifulSoup)
→ Enrichment pipeline: Claude Haiku extracts owner, role, suburb, tech stack from each company's website
→ NZBN API for director name, company age, GST status
→ SMTP RCPT verification (so emails actually deliver)
→ 18 scoring signals weighted to filter for ICP fit
→ Haiku again to draft a personalised cold email per lead

122 unit tests. Checkpoint/resume. Outputs a ranked CSV.

The whole thing cost ~$8 in API credits to build. Now finds me 50+ qualified Canterbury leads a week.

Code patterns happily shared — DM me if you want to talk through how something like this would work for your business.
```

### 5.5 Connection request templates

**Cold (to ICP):**
> Hi [name] — saw [specific observation about their business]. I run a small AI automation consultancy in Christchurch, would be good to be connected.

**Warm (referrals or context):**
> Hi [name] — [mutual context]. Happy to be connected here, will reach out properly soon.

**Founder-to-founder:**
> Hi [name] — fellow Canterbury small business owner here, building Kove. Would be good to be connected.

---

## 6. Email signature (HTML)

### 6.1 Full signature — paste-ready HTML

```html
<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1a1a1a;">
  <tr>
    <td style="padding-bottom: 8px;">
      <span style="font-size: 16px; font-weight: 600; color: #0B0D0E;">Balu Premkumar</span>
    </td>
  </tr>
  <tr>
    <td style="padding-bottom: 12px;">
      <span style="font-size: 13px; color: #6B7280;">AI Automation Consultant · </span>
      <a href="https://kove.co.nz" style="font-size: 13px; color: #F59E0B; text-decoration: none; font-weight: 600;">Kove</a>
    </td>
  </tr>
  <tr>
    <td style="padding-bottom: 4px;">
      <a href="tel:+64[number]" style="font-size: 13px; color: #1a1a1a; text-decoration: none;">📞 +64 [phone]</a>
    </td>
  </tr>
  <tr>
    <td style="padding-bottom: 4px;">
      <a href="mailto:balu@kove.co.nz" style="font-size: 13px; color: #1a1a1a; text-decoration: none;">✉ balu@kove.co.nz</a>
    </td>
  </tr>
  <tr>
    <td style="padding-bottom: 12px;">
      <a href="https://kove.co.nz" style="font-size: 13px; color: #1a1a1a; text-decoration: none;">🔗 kove.co.nz</a>
    </td>
  </tr>
  <tr>
    <td style="border-top: 1px solid #e5e5e5; padding-top: 8px;">
      <span style="font-size: 11px; color: #9CA3AF; letter-spacing: 0.05em;">CHRISTCHURCH, NZ</span>
    </td>
  </tr>
</table>
```

### 6.2 Short signature (for reply threads)

```html
<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <tr>
    <td>
      <span style="font-size: 14px; font-weight: 600; color: #0B0D0E;">Balu</span>
      <span style="font-size: 14px; color: #6B7280;"> · </span>
      <a href="https://kove.co.nz" style="font-size: 14px; color: #F59E0B; text-decoration: none; font-weight: 600;">Kove</a>
    </td>
  </tr>
</table>
```

### 6.3 Setup instructions (paste-ready for user)
1. Open Gmail → Settings → See all settings → Signature
2. Create new signature called "Kove full"
3. Paste full HTML above
4. Replace `[number]` and `[phone]` with real values
5. Set as default for new emails
6. Create second signature "Kove short" with short HTML
7. Set as default for replies/forwards

---

## 7. Outreach kit

### 7.1 Cold email template (replaces generic AI draft opener)

**Subject line options:**
- `Quick question about [business name]`
- `[business name] — 20 min worth of your time?`
- `Spotted [specific signal] — wanted to reach out`

**Body template:**
```
Hi [first name],

[Line 1 — specific observation from lead data. e.g. "Saw you're hiring a site supervisor on Seek" or "Noticed [business] just opened in Rolleston"]

I run a small AI automation consultancy in Christchurch — I build software that takes repetitive work off your team's plate. Most clients save 10+ hours a week within the first month.

I'm not pitching here — wanted to offer a Workflow Review. It's a 90-minute deep dive where I sit with you, walk through how your business actually works, and write up a plan for what to automate first. $250–350. No pitch at the end, no obligation to work with me. You get a useful report either way.

Worth a 15-minute call to see if it's a fit?

— Balu
balu@kove.co.nz · kove.co.nz · 📞 [phone]
```

### 7.2 LinkedIn DM template (for warmer prospects)

```
Hey [name] — saw [specific thing about them or their business].

I run Kove — small AI automation consultancy in Christchurch. The kind of work I'd guess would be relevant for [business] is [specific suggestion — e.g. "automating quote follow-ups" or "tightening the supplier ordering pipeline"].

If it'd be useful, I do a paid 90-min Workflow Review ($250) where I walk through your operation and write up a plan. Worth a quick call to see if it's the right fit?
```

### 7.3 Follow-up email (6 days after initial cold email)

```
Hi [first name],

Following up on the note from last week — no pressure, just wanted to make sure it didn't get buried.

If now's not the right time, totally fine — I'll close the loop and you can reach out whenever. If you want to chat, just hit reply with a couple of times that work.

— Balu
```

### 7.4 Follow-up email (14 days, final)

```
Hi [first name],

Last note from me — I won't keep nudging.

If you ever want to talk about what AI automation could look like for [business], I'm at balu@kove.co.nz. I've also written a handful of pieces on how I think about this for NZ trades and professional services — kove.co.nz/work has a few examples.

All the best,
Balu
```

### 7.5 Bio variants — paste-ready

**One-liner (for Twitter, LinkedIn headline backup, etc.):**
> AI automation consultant · Building Kove · Christchurch, NZ

**50-word bio:**
> Balu is the founder of Kove, a Christchurch-based AI automation consultancy. He builds workflow automation tools for Canterbury trades and professional services businesses — handling the repetitive work so owners can focus on the job.

**150-word bio (for speaking, podcasts, guest articles):**
> Balu Premkumar is an AI automation specialist and founder of Kove, a Christchurch-based consultancy that builds practical AI tools for NZ businesses. He works with trades contractors and professional services firms — plumbers, builders, architects, electrical companies — to find and automate the admin work that drains time without adding value.
>
> His approach is hands-on: he builds the system, deploys it, and trains the team. Every client owns everything he builds — no lock-in, no SaaS dependency.
>
> Alongside Kove, Balu has built several production tools including a multi-source Canterbury lead generation pipeline, a custom CRM for SMB workflows, and a speech-to-text productivity tool for Windows. He spends his days as a [role] in [industry] and his evenings building the tools he wishes already existed.

**300-word bio (for detailed speaker profiles):**

Use 150-word version + add:
> Originally trained as a [field], Balu has spent the last several years automating internal processes inside larger organisations — saving thousands of hours per year and replacing expensive vendor tools with purpose-built internal software. Kove is the same approach applied to NZ small and medium businesses.
>
> He writes regularly on LinkedIn about AI automation for NZ businesses, and is available for paid consulting, custom builds, and ongoing retainers. He works exclusively with Canterbury businesses face-to-face and the rest of NZ via video.

---

## 8. Case studies — full content for first three

### 8.1 `/work/canterbury-lead-generator.mdx`

```markdown
---
title: "Cut lead research from a full day to zero"
industry: "Internal tool — built for my own outreach"
date: 2026-05-16
metrics:
  - "6+ hours / week saved"
  - "50+ qualified leads / week"
  - "Cost: ~$8 in API credits"
tags: [Python, Claude API, Playwright, SQLite]
ogImage: /og/canterbury-lead-generator.jpg
---

## The problem

I needed a steady flow of Canterbury business leads for cold outreach. The manual version of this work was brutal — search a directory, copy a name, look up the website, find an owner, verify the email, score the lead, draft a personalised email, log it, follow up.

A few hours every week, every week, before I'd done any actual outreach.

The shape of the problem was obvious: it was 100% structured work I was doing manually because no off-the-shelf tool covered all 14 NZ-specific directories I wanted to scrape from. Apollo and ZoomInfo don't index this market well, and the ones that do charge enterprise prices.

## What I built

A multi-stage pipeline that runs overnight on a laptop:

**1. Scrape (14 sources).** Playwright for the JavaScript-heavy directories (Google Maps, TradeMe Services, nocowboys), BeautifulSoup for the static HTML ones (finda, neighbourly, houzz, hotfrog, PGDB). Each source has its own scraper module — easy to add or remove sources.

**2. Deduplicate.** Same business often appears across 3–5 directories. Soft-matching on normalised business name plus suburb.

**3. Enrich.** For each business, crawl the homepage and contact page. Detect tech stack (Tradify? ServiceM8? Wix?). Send the page text to Claude Haiku, which extracts owner name, role, email, and notes about what the business does.

**4. Verify.** Hit the NZBN API for company status, director name, GST registration. SMTP RCPT verify each email — discard the ones that don't deliver. WHOIS lookup on .co.nz domains (NZ has no privacy shield, so registrant emails are public).

**5. Score.** 18 weighted signals — email present, SMTP verified, owner found, NZ Ltd, GST registered, mobile phone present, hiring signal active, 2+ source appearances, fresh website, job management software installed, etc.

**6. Draft.** For every lead scoring 6+, Claude drafts a personalised cold email body using the enrichment data. Each draft mentions something specific to the business — a recent hire, a tool they use, a service they offer.

Output is a ranked CSV sorted by score, plus a `hot_leads.csv` of score-7-plus leads ready to send.

## How it works

```
Sources (14)
  ↓
Dedupe → Enrich (Claude) → NZBN → SMTP verify → WHOIS
  ↓
Score (18 signals, 0–10)
  ↓
Draft email (Claude, score ≥ 6)
  ↓
ranked CSV + hot_leads CSV
```

Checkpoint/resume after each phase — if the run crashes, it picks up from the last successful step. 122 unit tests cover every pure function (scoring, deduplication, email validation).

## The result

- **6+ hours / week saved** of manual research
- **50+ qualified leads / week** produced unattended
- **~$8 in API credits** to build (Claude Haiku is cheap)
- **122 unit tests** — runs reliably, fails loudly

## Tech used

`Python` · `Playwright` · `BeautifulSoup` · `Claude Haiku API` · `NZBN API` · `SMTP verification` · `SQLite` · `pytest`

---

**Want something similar for your business?**
[Book a Workflow Review →](/contact)
```

### 8.2 `/work/forge-crm.mdx`

```markdown
---
title: "Replaced 3 SaaS subscriptions with one custom CRM"
industry: "Internal tool — built for my own pipeline"
date: 2026-05-27
metrics:
  - "3 SaaS subscriptions retired"
  - "< 1s page load — Notion takes 8s"
  - "Built in ~3 weekends"
tags: [Node.js, React, SQLite, Tailwind]
ogImage: /og/forge-crm.jpg
---

## The problem

Every off-the-shelf CRM I tried had something that made me grit my teeth. Notion was slow. HubSpot was bloated. Pipedrive looked like 2014. Monday wanted $40 per user per month for features I'd already paid for in three other tools.

The work I needed it to do wasn't complicated — kanban view of leads, custom fields, dashboard, follow-up reminders, automation triggers when status changes. Every tool had 80% of what I needed plus 200% of what I didn't.

## What I built

Forge — a fast, dark, kanban-first CRM that does exactly what I need and nothing more.

**Core features:**
- Multiple boards with custom stages
- Custom fields per board (text, number, date, select, person)
- Automation rules — when-this-happens-do-that, evaluated on every status change
- Dashboard with 14-day activity sparkline
- Search across all items, all boards
- Drag-and-drop kanban with optimistic updates (no lag)
- Dark UI — void black background, emerald/amber/red signal colours
- < 1 second cold load

**Stack:**
- Backend: Node.js + Express, SQLite via `node:sqlite` (no native compile)
- Frontend: React 18 + Vite + Tailwind + @dnd-kit
- Single binary deploy — runs on my laptop, accessible via Tailscale from anywhere

**Notable engineering decisions:**
- `node:sqlite` instead of `better-sqlite3` because I'm on Node 24 and native compile was a nightmare
- Optimistic UI everywhere — the perceived speed is the feature
- Server-side rendering for the initial load, client-side for everything after
- No build step in dev — Vite hot reload + tsx for backend

## The result

- **3 SaaS subscriptions retired** — Notion ($16/mo), Pipedrive ($35/mo), one calendar tool
- **< 1 second page load** vs Notion's 8 seconds for the same data
- **Used daily** for lead pipeline (from the Canterbury Lead Generator), project tracking, follow-up reminders, and the Kove sales pipeline
- **Total dev time:** ~3 weekends

## Tech used

`Node.js` · `Express` · `SQLite (node:sqlite)` · `React 18` · `Vite` · `Tailwind` · `@dnd-kit`

---

**Want a CRM or internal tool built specifically for how your business works?**
[Book a Workflow Review →](/contact)
```

### 8.3 `/work/voice-dictation.mdx`

```markdown
---
title: "Speech-to-text that pastes into any Windows app"
industry: "Personal productivity tool"
date: 2026-05-27
metrics:
  - "Faster than typing for messages over 30 words"
  - "46 unit tests"
  - "Learns from corrections over time"
tags: [Python, Whisper, Tkinter, Win32]
ogImage: /og/voice-dictation.jpg
---

## The problem

I write a lot — emails, code comments, LinkedIn posts, this site. Typing is the bottleneck.

Off-the-shelf dictation tools (Otter, Dragon, even Windows built-in) all required me to break flow — open a separate app, dictate, copy, paste. By the time I'd done that I could have typed it.

I wanted: hit a hotkey, speak, release, have the text appear in whatever app I'm in. Like a really fast assistant typing for me.

## What I built

A background Windows app:

**1. Listen.** Tray app holds a global hotkey. Press-and-hold to record, release to transcribe.

**2. Transcribe.** Local Whisper model (small for speed, swap to medium for accuracy). All on-device — no API costs, no internet required.

**3. Paste.** Uses Win32 `AttachThreadInput` + simulated Ctrl+V keystrokes to paste into whatever window has focus. Works in VS Code, browsers, Slack, Electron apps — anywhere a paste action works.

**4. Learn.** Speech profile (SQLite) tracks corrections. After I edit a transcription 3 times the same way, it starts applying the correction automatically next time.

**5. Show feedback.** Tray icon pulses while recording. Live silence-countdown badge so I know when it'll cut off. Confidence-bordered preview panel for low-confidence transcriptions so I can review before pasting.

## The result

- **Faster than typing** for messages over ~30 words
- **46 unit tests** covering hotkey state, paste logic, profile learning
- **Free** — local Whisper, no API costs, runs entirely offline
- **Personal — but the pattern generalises.** This is exactly the kind of small productivity tool I'd build for a client whose team has a repetitive transcription / data-entry task. Same approach, different shape.

## Tech used

`Python` · `Whisper` · `Tkinter (tray UI)` · `Win32 API` · `SQLite (speech profile)` · `pytest`

---

**Got a manual transcription or data-entry workflow draining your team's time?**
[Book a Workflow Review →](/contact)
```

---

## 9. Brand asset folder structure

Create alongside the site repo:

```
kove-brand/
├── logos/
│   ├── kove-wordmark.svg
│   ├── kove-wordmark-amber.svg
│   ├── kove-wordmark-white.svg
│   ├── balu-monogram.svg
│   └── favicon-source.svg
├── linkedin/
│   ├── banner-1584x396.png
│   ├── banner-3168x792.png         (2x retina)
│   ├── banner.fig                   (Figma source)
│   ├── profile-photo-placeholder.png
│   └── post-image-template.fig      (1200x1200 for square LI posts)
├── email/
│   ├── signature-full.html
│   ├── signature-short.html
│   └── setup-instructions.md
├── og-images/
│   ├── kove-default.jpg            (1200×630, void + wordmark)
│   ├── work-canterbury-lead-generator.jpg
│   ├── work-forge-crm.jpg
│   └── work-voice-dictation.jpg
├── outreach/
│   ├── cold-email-templates.md
│   ├── linkedin-dm-templates.md
│   ├── follow-up-emails.md
│   └── bios.md
├── content/
│   └── linkedin-posts-batch-1.md   (first 10 posts ready to schedule)
└── README.md
```

---

## 10. Headshot brief — DIY iPhone setup

### 10.1 When to shoot
- **Time:** Golden hour (7–8am or 5–6pm) for outdoor; any time for indoor near a window
- **Weather:** Overcast is ideal (soft, even, no harsh shadows). Avoid bright direct sun.

### 10.2 Location options (any of these)
- Indoor near a large window — stand 1.5m from window, face turned 30° toward it
- Outdoor against a dark wall (brick, concrete, industrial)
- Outdoor against blurred greenery (use iPhone portrait mode)
- Studio-style: dark sheet hung as backdrop

**Avoid:** cluttered backgrounds, busy patterns, anything that looks like a home office, bookshelves with visible spines

### 10.3 Wardrobe
- Dark shirt or dark jacket — black, charcoal, navy, dark olive
- No logos, no slogans, no busy patterns
- Solid colour or very subtle texture only
- Something you'd wear to a client meeting — not too formal (you're not a banker), not too casual

### 10.4 Pose and expression
- Shoulders square to camera, head turned 15–20° off-centre
- Chin slightly forward and down (not lifted)
- Slight genuine smile — think "amused, not delighted"
- Look slightly off-camera (more confident than direct stare) OR direct into lens (more personal)
- Take 30+ shots at different micro-expressions

### 10.5 Camera setup
- iPhone, latest model preferred — Portrait mode ON
- Distance: photographer 2–3 metres back
- Height: camera at your eye level (not below, not above)
- Stability: photographer braces against a wall or uses a tripod
- Burst mode for natural in-between expressions

### 10.6 Post-processing
1. **Pick 3 finalists** from the 30+ shots
2. **Upload to Adobe Firefly or Remini** for free AI upscale + light skin smoothing
3. **Remove background** with [remove.bg](https://remove.bg) — free for up to 50 images
4. **Replace background** with solid `#111318` (dark surface) or subtle dark gradient
5. **Crop variants:**
   - 400×400px (LinkedIn profile)
   - 800×800px (site /about)
   - 1200×1200px (LinkedIn post hero, master file)

### 10.7 Placeholder strategy until real shoot

For initial site launch, use one of:
- A dark gradient panel where the photo would go, with `Photo coming` in small caps amber
- A blurred abstract dark image (gradient + grain)
- A typographic "B" monogram in amber on void black

Do NOT use:
- Cartoon avatars (Bitmoji, Memoji)
- Stock photos of any person
- Silhouette icons
- Random "professional man" images

The placeholder reads as deliberate restraint, not absence.

---

## 11. Asset checklist — build order

Tick off as each asset ships.

### Foundation (do first)
- [ ] Register kove.co.nz at Metaname
- [ ] Set up Google Workspace → balu@kove.co.nz
- [ ] Configure DNS (MX, SPF, DKIM, DMARC) on Metaname
- [ ] Create GitHub repo `kove-site`
- [ ] Create brand asset folder `kove-brand/`

### Site assets (Phase 1)
- [ ] `astro.config.mjs` + `tailwind.config.mjs` + `package.json`
- [ ] `Base.astro` layout with design tokens loaded
- [ ] `Nav.astro` component
- [ ] `Footer.astro` component
- [ ] `Button.astro` component
- [ ] `Card.astro` component
- [ ] `Hero.astro` component
- [ ] `ContactForm.astro` + Cloudflare Pages Function
- [ ] `/` (Homepage)
- [ ] `/services`
- [ ] `/work` (index)
- [ ] `/work/canterbury-lead-generator`
- [ ] `/work/forge-crm`
- [ ] `/work/voice-dictation`
- [ ] `/about`
- [ ] `/contact`
- [ ] `/404`
- [ ] `og-default.jpg` (1200×630)
- [ ] Per-page OG images (4× case study + 4× page)
- [ ] favicon.svg + favicon.ico
- [ ] Deploy to Cloudflare Pages, point kove.co.nz DNS
- [ ] Lighthouse audit — 95+ all categories
- [ ] Mobile QA on iPhone 12 width (390px)

### LinkedIn assets (Phase 2)
- [ ] LinkedIn banner 1584×396px
- [ ] LinkedIn banner 3168×792px (retina)
- [ ] Profile photo (placeholder or real)
- [ ] Profile headline updated
- [ ] About section updated
- [ ] Experience entry for Kove
- [ ] Skills updated
- [ ] Services section configured
- [ ] Featured section populated (3 items)

### Content assets (Phase 3)
- [ ] First 10 LinkedIn posts saved to `kove-brand/content/linkedin-posts-batch-1.md`
- [ ] Posts 1–3 scheduled (Tue/Thu/Fri week 1)
- [ ] Posts 4–6 scheduled (week 2)
- [ ] Posts 7–10 scheduled (weeks 3–4)

### Outreach assets (Phase 4)
- [ ] Full email signature configured in Gmail
- [ ] Short email signature configured in Gmail
- [ ] Cold email template saved
- [ ] LinkedIn DM templates saved
- [ ] Follow-up email templates saved
- [ ] 50w / 150w / 300w bios saved

### Proof system (Phase 5)
- [ ] Day job case study #1 written (anonymised, save for after first real client)
- [ ] Day job case study #2 written
- [ ] Testimonial capture script saved
- [ ] Testimonial display template ready on site

### Photography (Phase 6 — when ready)
- [ ] DIY iPhone headshot done
- [ ] AI post-processing done
- [ ] All photo variants exported (400px, 800px, 1200px)
- [ ] Site /about updated with real photo
- [ ] LinkedIn profile photo updated

---

## 12. Decisions still owned by user

The build doc above is complete to ship. These three items need a user input before launch:

1. **Phone number** — fill into ContactForm, footer, email signature, LinkedIn About, cold email template
2. **Day job framing** — what role/industry to reference in /about and 150w bio (without naming employer)
3. **NZBN number** — once Kove is registered as a NZ entity (not required for v1; can launch as sole trader)

The build can complete around these placeholders — they're substitutions, not blockers.

---

## 13. Skills to invoke during execution

| Phase | Skill | Why |
|---|---|---|
| Site build | `/soft` | Cinematic dark premium UI matches the visual system |
| LinkedIn banner | `/design` | Dedicated design execution for the banner asset |
| Email signature | `/design` | HTML email design is its own craft |
| Content posts | `/linkedin-nz-voice` | Tone-check posts before they're saved |
| Final review | `/squad` | Arch + Design + Growth review pre-launch |

---

**End of build doc.** This document is the single source of truth for the personal brand + Kove site build. Update this file as decisions evolve. All other build artefacts reference this one.
