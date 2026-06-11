# kove-site — Project Instructions

## What this is
Public-facing website for Kove — a Christchurch NZ AI automation consultancy (solo, founder: Balu Premkumar).
Target: Canterbury trades + professional services, 5–20 staff, owner-operators. Second lane: M365 professional services firms (Power Platform / Copilot agents).

## Current state
HTML/CSS/JS static site ("Deep Cove" v2 design system + V3 polish), live at https://kove.nz.

## Stack (current)
- Pure HTML + `styles-v2.css` + `site-v2.js` — no build step needed
- Deploy: Cloudflare Workers static assets + worker.js, auto-deploy on push to master

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
| power-platform.html | /power-platform |
| work.html | /work |
| work-canterbury-lead-generator.html | /work/canterbury-lead-generator |
| work-forge-crm.html | /work/forge-crm |
| work-voice-dictation.html | /work/voice-dictation |
| work-podcast-pipeline.html | /work/podcast-pipeline |
| about.html | /about |
| contact.html | /contact |
| insights.html | /insights |
| insights/leaving-workflowmax.html | /insights/leaving-workflowmax |
| lp/workflow-review.html | /lp/workflow-review (noindex) |
| lp/power-platform-review.html | /lp/power-platform-review (noindex) |
| 404.html | 404 |

Note: pages in subfolders (insights/, lp/) — injected nav/footer links are depth-aware via the `R` prefix in site-v2.js; subfolder pages reference assets with `../`.

## Brand assets
`kove-brand/` contains:
- `logos/` — SVG wordmarks + favicon source
- `linkedin/` — banner PNGs (1x + 2x)
- `email/` — HTML email signatures + setup instructions
- `og-images/` — 1200×630 OG images per page

## Key source of truth
`personal-brand-build.md` — original build doc (copy, design tokens, page specs). For case study copy, `C:\AI\Wiki\Balu-Wiki\wiki\projects\*.md` is canonical.

## Tone rules (from build doc)
- NZ straight-talk. No "leverage", "synergy", "ecosystem", "transform", "AI-powered"
- First person singular — "I" not "we"
- Preferred words: build, ship, hand over, work, fix, save, find, run, automate
- Minimal em dashes (de-AI pass standard)

## Design files to ignore (not live pages)
- icon-concepts.html
- logo-concepts.html
- modern-marks.html
- sonar-variations.html

## Related projects
- Lead Generator: `C:\AI\projects\Lead Generator\` — SEPARATE project, no cross-modification. Read-only data feed for content.
- Forge CRM: `C:\AI\projects\Local Monday\` — internal CRM (also a case study on this site)
