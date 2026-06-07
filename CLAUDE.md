# kove-site — Project Instructions

## What this is
Public-facing website for Kove — a Christchurch NZ AI automation consultancy (solo, founder: Balu Premkumar).
Target: Canterbury trades + professional services, 5–20 staff, owner-operators.

## Current state
HTML/CSS/JS prototype built by Claude Design ("Deep Cove" v2 design system).
Files are deployable as static HTML today. Future path is Astro 4 + Tailwind + Cloudflare Pages.

## Stack (current)
- Pure HTML + `styles-v2.css` + `site-v2.js` — no build step needed
- Deploy target: Cloudflare Pages (free, auto-deploy on push to main)

## Design system — "Deep Cove"
```css
--bg:      #070B12   /* abyssal blue-black */
--surface: #0D1320
--ice:     #9AE9FF   /* primary accent */
--azure:   #43A6F5
--text:    #EAF1F8
--muted:   #94A6BC
```
Fonts: Schibsted Grotesk (display) + JetBrains Mono (mono) — loaded from Google Fonts
Glass cards: `.glass` class — see styles-v2.css
Animations: scroll-reveal via `.reveal` class, parallax via `data-parallax`, magnetic buttons via `data-magnetic`

## Pages
| File | Route |
|---|---|
| index.html | / (homepage) |
| services.html | /services |
| work.html | /work |
| work-canterbury-lead-generator.html | /work/canterbury-lead-generator |
| work-forge-crm.html | /work/forge-crm |
| work-voice-dictation.html | /work/voice-dictation |
| work-podcast-pipeline.html | /work/podcast-pipeline |
| about.html | /about |
| contact.html | /contact |
| 404.html | 404 |

## Brand assets
`kove-brand/` contains:
- `logos/` — SVG wordmarks + favicon source
- `linkedin/` — banner PNGs (1x + 2x)
- `email/` — HTML email signatures + setup instructions
- `og-images/` — 1200×630 OG images per page

## Key source of truth
`personal-brand-build.md` — the locked build doc with all copy, design tokens, pricing, page specs, and LinkedIn assets. Read this before making any content or copy decisions.

## Placeholders to fill before launch
1. **Phone number** — appears in nav, footer, contact page, email signature
2. **Day job framing** — /about background section (role/industry, never named)
3. **NZBN number** — footer © strip (not required for v1 as sole trader)

## Tone rules (from build doc)
- NZ straight-talk. No "leverage", "synergy", "ecosystem", "transform", "AI-powered"
- First person singular — "I" not "we"
- Preferred words: build, ship, hand over, work, fix, save, find, run, automate

## Design files to ignore (not live pages)
- icon-concepts.html
- logo-concepts.html
- modern-marks.html
- sonar-variations.html
(These are design exploration files from the Claude Design session)

## Related projects
- Lead Generator: `C:\AI\projects\Lead Generator\` — pipeline that produces leads fed into outreach
- Forge CRM: `C:\AI\projects\Local Monday\` — internal CRM (also a case study on this site)

## Outstanding (before launch)
- [ ] Register kove.nz at Metaname ($25/yr)
- [ ] Set up Google Workspace → balu@kove.nz
- [ ] Configure DNS: MX, SPF, DKIM, DMARC
- [ ] Create GitHub remote repo `kove-site`
- [ ] Connect to Cloudflare Pages (auto-deploy on push to main)
- [ ] Fill phone number placeholder throughout
- [ ] Lighthouse audit — target 95+ all categories
- [ ] Mobile QA at 390px width
