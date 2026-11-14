# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (latest, 7.2.x at time of writing) as a static site, deployed to GitHub Pages as the user site `https://cdrakke.github.io` (no custom domain). Full rebuild: the incumbent React 19 + Vite + shadcn + GSAP + Lenis site is replaced, not migrated. Node 26 / npm are the local toolchain; Bun 1.4 is also available.

## Users

Primary: hiring managers and technical recruiters evaluating Calvin for a full-time (remote-friendly) software developer role. They arrive from a resume link, GitHub, LinkedIn, or X, usually with several other candidates open in adjacent tabs, and are deciding within a minute or two whether to shortlist and interview.

Secondary: freelance and contract clients deciding whether to pay Calvin to build or run a product or internal tool. Welcome, but hiring leads.

Tertiary: peers and gaming-community people who know him as "Drekyz" (Raidium users, Discord communities).

## Product Purpose

The personal career portfolio of **Calvin Drakke I. Rulete** ("Drekyz"), a full stack developer from General Santos City, Philippines. The site is where his career lives: it must establish who he is, prove what he has shipped, and make it trivial to act.

Confirmed visitor path, in priority order: (1) look at the work, (2) email him, (3) download the resume.

Success: a visitor can say, an hour after leaving, who Calvin is and what he built, and has either emailed him or downloaded the resume.

## Positioning

**A full stack developer who ships and runs whole products.** Not "backend-focused" anymore (that was the old site's framing; confirmed retired). The claim a neighbor cannot copy: he owns products end to end, from schema and API to billing, infrastructure, deployment, and the frontend when needed.

Proof that backs the claim:

- **Raidium** (`https://raidium.quest`): a multi-tenant guild-management SaaS he built alone (502 commits, 98% his excluding bots, merges excluded), serving 6+ MMORPG guilds. ~225 API route handlers, 33 data models, 4-tier guild RBAC plus a separate platform-admin identity, on-chain USDt subscription verification on the Kaia blockchain plus PayMongo fiat, a Discord bot with slash commands and a self-rescheduling reminder chain, OCR-verified attendance with reversible recalculation, a points economy and auction marketplace with atomic operations, a cross-guild alliance system, a Capacitor Android app with FCM push, Docker + Coolify self-hosted deployment behind nginx/certbot, Jest integration tests in CI.
- **The team platform** (never named; must be described generically, see constraints): top contributor (865 commits, merges excluded) with 381 PRs authored, and the sole merger of every PR the team lands, reviewing all of his teammates' (808 on the platform and 77 on the website, 885 in all, as of 2026-11-14; counting his own, 1,187 platform merges and 1,294 across both), on a Next.js 16 + Supabase internal operations platform for a real estate franchise: 9-role RBAC enforced in Postgres RLS, a concurrency-safe commission engine, e-signature and document pipelines, 72-task onboarding state machine, three-environment CI/CD with migration gates and integration tests on a full local Supabase stack. Since October 2026 it also feeds the franchise's new public website (co-built, 107 PRs merged), cut over in early October 2026 from the old website builder and listings database. The public site is described generically too.
- Academic record: BS Information Technology, STI College General Santos, Cum Laude, Best Capstone Project, Programmer of the Year; capstone GYOCC.online cut a real organization's tracking workload by 80%.
- Range: web (Django, Next.js, NestJS), mobile (React Native/Expo), desktop (C#/.NET, PySide6), bots (discord.py, 5 years maintained), blockchain payments, DevOps on bare-metal VPS.

## Operating Context

- Visitors compare candidates quickly; the site competes with other tabs and with a PDF resume.
- Deployed as static files on GitHub Pages via GitHub Actions (push to `main`). Existing workflow: `.github/workflows/deploy.yml` (Node 20, `npm ci`, build, upload `dist`). The rebuild replaces its build step.
- Resume is generated from `public/resume/index.html` to `public/resume/Calvin_Drakke_Rulete_Resume.pdf` via `scripts/build-resume.mjs` (Puppeteer). The resume duplicates experience/projects/education content; the rebuild should make the site data the single source and avoid a third copy.
- Contact goes through web3forms (`https://api.web3forms.com/submit`, access key currently hardcoded in `src/components/sections/Contact.tsx`).
- Google Search Console verification file `public/google536676315ede3734.html` must keep being served at the same path.

## Capabilities and Constraints

Confirmed content (source of truth: `src/data/*.ts`, `src/components/sections/About.tsx`, `FeaturedProject.tsx`, `Hero.tsx`, `public/resume/index.html`):

- Identity: Calvin Drakke I. Rulete, handle Drekyz, General Santos City, Philippines, open to remote. Email `drekyz.business@gmail.com`, phone `+63 908 160 0631`. GitHub `cdrakke`, X `@CDrakke`, LinkedIn `calvin-drakke-r-94935b128`, Discord `Drekyz`.
- Experience: Realty ONE Group Philippines, Full Stack Developer, May 2026 to present, contract, remote. Simply Expanding Digital Marketing Services, Software Developer, Aug 2025 to Apr 2026 (led Alertison and Ultima Productivity; maintained Better Teaching Solutions and Leaf to Life CRM). CMO-ICTD LGU General Santos City, Hardware & Network Support IT Intern, Jan to May 2025.
- Education: STI College GenSan BSIT 2021 to 2025 (Cum Laude, Best Capstone Project, Programmer of the Year). GSCNHS Senior High STEM 2019 to 2021. Civil Service Professional, passed March 2, 2025. Outstanding Capstone Project Awardee, June 20, 2025.
- Projects (12, incl. the bare-metal server entry): Raidium, Alertison (`alertison.com.au`, with Michael Panizales / dustgrau), Integrated Fire Services DSS, Pickleball GenSan (`pickleballgensan.vercel.app`), Ultima Productivity, GYOCC.online (capstone, PDF on hand), SE Scraper, GLiberator, Nextmarket Sniper, WUWA FPS Unlock. Collaborator credit for dustgrau (`https://michaelpanizales.vercel.app/`) must stay on the shared projects.
- Skills (37) grouped language / framework / tool / database / other, including Claude Code as a tool. Existing disclaimer to preserve in spirit: some projects are built with LLM-assisted development; the architecture, decisions, and shipped products are his.
- Old About text says "As a Software Developer at Simply Expanding" in present tense; that role ended April 2026 and must be rewritten as past.
- As of September 2026 Calvin is **no longer active** on Integrated Fire Services DSS (handed off), Alertison (still live under others), or Ultima Productivity (paused). Show all three as former involvement; never present them as current work.
- Friends/collaborators to credit: Michael Panizales (`https://michaelpanizales.vercel.app/`, the shared mobile/web projects) and Casey Sinoy (`https://caseysinoy.dev/projects`, co-worker on the current team platform). His own GitHub is a social link, not a "friend".

Constraints:

- **The Realty ONE Group work is presented generically**: "internal operations platform for a real estate franchise" style. No product name, no URL, no screenshots, no brand assets from that repo. Engineering specifics may be described only in a way that does not identify the product. (Confirmed 2026-09-02.)
- **Raidium** may be named and linked (`raidium.quest`). Imagery on hand is limited to `public/images/projects/raidium/cover.png` plus Raidium brand and feature art in the Raidium repo (`logo.png`, `boss.png`, `attendance.png`, Play Store feature graphic). No fresh UI screenshots were promised.
- **Must survive the rebuild**: the music player (Deltarune "Hip Shop", `public/audio/deltarune-rouxl-kard.mp3`, 14.5 MB, persisted volume/mute/was-playing behavior) and a working contact form via web3forms. Everything else may be replaced ("nothing is sacred").
- Dark/light toggle is **not** required; a single committed look is allowed.
- **Civil Service Professional eligibility: show it framed, marked "PASSED", never the rating.** The rating is only a little above the passing mark and must not appear as a number or stat anywhere, this file included. The honest detail worth telling: he took the exam during his On-the-Job Training with no time to study, first attempt, and passed (March 2025). (Confirmed 2026-09-02.)
- The new site must be static-hostable on GitHub Pages (no server runtime).
- Accessibility baseline: honor `prefers-reduced-motion` (the incumbent does this thoroughly); keep it.
- Undecided: whether the resume PDF continues to be generated from HTML in-repo or is supplied as a finished PDF by Calvin. A current PDF exists at `public/resume/Calvin_Drakke_Rulete_Resume.pdf` and will be provided/updated by him.

## Brand Commitments

- Name and handle: "Drekyz" as the brand, full name Calvin Drakke I. Rulete alongside.
- Photo: `public/images/avatar.png` (studio portrait in a barong on a dark ground). Background removal is explicitly permitted.
- Voice (from existing copy, confirmed by reuse): direct, builder-first, unhedged. "I don't just write code, I ship products." "If it can be automated, it should be automated."
- Music player with the Deltarune track is a personality signature, kept deliberately.
- No visual style, palette, or typography has been pinned; the old Ocean/Blue OKLCH theme, Inter, and shadcn look are anti-reference.

## Evidence on Hand

- Project imagery under `public/images/projects/` (raidium, alertison, pickleball, ifs-dss, nextmarket-sniper, se-scraper, gyocc with showcase set). Missing covers: fm-lps-up, gliberator, wuwa-fps-unlock.
- Education proof: `public/images/education/medals.png` (10.9 MB, needs compression), `outstanding-capstone-project.jpg`, `cse-result.png`. Logos under `public/images/logos/`.
- Capstone paper PDF under `public/documents/` (17.7 MB).
- Resume PDF and its HTML source under `public/resume/`.
- Repo statistics gathered 2026-09-02 from GitHub (commit counts, contributor shares, route/model counts) for Raidium and the team platform; safe to cite as "as of Sept 2026".
- Server facts gathered 2026-09-02 on Calvin's own bare-metal server (the site calls it "my bare-metal server", never by hostname or IP): Debian 13, 8-core Xeon, 32 GB RAM, two SSDs in RAID1, 41 running containers, 17 NGINX vhosts, Coolify 4 deploys, self-hosted Uptime Kuma / GlitchTip / Umami, InvoicePlane→Sure sync on a 5-minute systemd timer, pgAdmin, SSH key-only on a non-default port. Do not claim a firewall or a backup cadence. Do not mention third-party, employer, or hobby services hosted on the box; only Calvin's own products and the tooling behind them appear.
- Raidium analytics from the self-hosted Umami, 2026-05-18 to 2026-09-02: 66k pageviews, 16.7k sessions, 76 countries, sessions rising month over month. Cite as "since May 2026". Raidium's OCR is OCR.space first, then a self-hosted FastAPI + EasyOCR service (`ocr.raidium.quest`, repo `raidium-ocr`); the old "Azure OCR" claim is retired.
- Absent, do not fabricate: testimonials, client quotes, user counts beyond "6+ guilds", revenue, screenshots of the real estate platform, a Raidium UI screenshot set beyond the single cover.

## Product Principles

1. **Proof over adjectives.** Every claim on the page points at a shipped thing with a real number, link, or artifact.
2. **You first, then the work, then the ask.** The visitor meets Calvin, then the products, then email and resume in that order.
3. **Whole-product ownership is the story.** Show the full loop (schema, API, billing, infra, deploy) rather than a skills cloud.
4. **Facts live in one place.** Content is data-driven so the site, the resume, and the SEO metadata cannot drift again.
5. **Personality is allowed, dishonesty is not.** The music player, the voice, and gaming roots stay; invented metrics never appear.
