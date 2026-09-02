---
target: "today's changes: shelf DevOps panel, server diary entry, Raidium figures"
total_score: 19
max_score: 28
na_heuristics: 7,9,10
p0_count: 1
p1_count: 2
target_identity: "file:/home/drekyz/Documents/Programming/Personal/cdrakke.github.io/src/pages/shelf.astro"
target_fingerprint: "sha256:6f71d4a70c55461bd6fd239348090fdbe04e62536ca20dfa12b6800695bd68e9"
target_path: /home/drekyz/Documents/Programming/Personal/cdrakke.github.io/src/pages/shelf.astro
timestamp: 2026-09-02T02-16-29Z
slug: src-pages-shelf-astro
closed: true
---
Method: dual-agent (A: design-review sub-agent · B: detector sub-agent)

Target: today's changes on `src/pages/shelf.astro` (DevOps panel, About card), the new `/diary/server` entry, and the Raidium figures, inspected on the preview at 1440 and 390 wide.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | "live" dots, "Feb 2026 – present", "since May 2026" on the traffic figure: honest and current. |
| 2 | Match System / Real World | 2 | "2 SSDs, mirrored", "Owner / operator", "Valkey / Redis" speak sysadmin, not hiring manager. |
| 3 | User Control and Freedom | 3 | "The details are under How I run things." on the About card is plain text, not a link. |
| 4 | Consistency and Standards | 3 | "Certbot / SSL" on the shelf vs "Certbot" on the entry; chip tones are index-cycled so Coolify is butter on one page, mint on another. |
| 5 | Error Prevention | 4 | Read-only surface; external links carry noopener. |
| 6 | Recognition Rather Than Recall | 2 | The server entry's paragraph and its 7-item checklist say the same five things twice. |
| 7 | Flexibility and Efficiency | n/a | Experience surface, no expert path needed. |
| 8 | Aesthetic and Minimalist Design | 1 | 14 tech chips on the server entry, 20 on Raidium, 13 stickers in the DevOps panel; a 330px empty column under Built-with. |
| 9 | Error Recovery | n/a | No error states on these pages. |
| 10 | Help and Documentation | n/a | Experience surface. |
| **Total** | | **19/28** | **Acceptable (68%)** |

## Design Specificity Verdict

**LLM assessment:** Authored for this product, with one interchangeable organ. The server entry is specific in the way PRODUCT.md demands: real counts, the InvoicePlane→Sure polling hack with its reason, and what is deliberately not claimed. The rack appears three times in one hand (room, shelf SVG, panel icon) so infra is part of the world, not bolted on. The interchangeable organ is the Built-with panel: 14 chips on the server entry and 20 on Raidium are the skills cloud DESIGN.md forbids, and the rebuilt DevOps panel on the shelf is the entry's first screen at 80% scale with a button to see it again.

**Deterministic scan:** the static detector is clean on all four scanned files (shelf, diary slug, DiaryEntry, index). The in-page detector found 4 items on `/diary/server`: two 10px "Newer / Older" pager labels (undersized functional text, `[slug].astro`) and two nested-card flags on the What-it-is and Built-with panels (panel inside sheet, by design). On `/shelf` and `/` it found 15 to 20 items, all pre-existing: 11px medal subtitles and certificate issuers, uppercase certificate titles, 10px stat labels on the home profile, h1 to h3 heading jumps on both pages, and 133-character lines in the mindset and AI-disclaimer paragraphs at 1440. None of those were touched today.

**Visual overlays:** injection succeeded, but the tab was closed during cleanup, so no overlay is left open in your browser. Detector output was read from the console instead.

## Overall Impression

The server entry lands its one job in two seconds: "41 containers · 17 sites" under a title that is clearly not a resume bullet proves the whole-product claim. Then it keeps going. The paragraph, the checklist that repeats it, 14 tool chips, and the same content re-rendered on the shelf turn proof into inventory. The single biggest opportunity is subtraction: one canonical place for the box, outcomes instead of specs on the figures, and a way out of the entry toward email or the resume.

## What's Working

- **The InvoicePlane→Sure sentence** ("no webhooks, so a small bash script on a systemd timer polls its database every 5 minutes") is the best line on the page. It shows judgment, not inventory, and it is what an interviewer will ask about.
- **The rack is drawn three times in one hand.** Room rack with the pulsing lamp, shelf SVG with the BARE METAL plate, panel icon. The aria text "the bare-metal server I run" is good copy too.
- **Honesty discipline holds.** No hostname, no firewall or backup claims, "since May 2026" on the visitor count, and the Raidium traffic is attributed to public game tools rather than implied to be paying users.

## Priority Issues

**[P0] The tech chips are a skills cloud** (14 on `/diary/server`, 20 on `/diary/raidium`).
- Why it matters: DESIGN.md forbids the cloud; after the fifth chip nothing carries signal. On Raidium at 390px the chips run 7 rows and push "Visit raidium.quest", the one action, almost three screens down.
- Fix: cap tech at 6 to 8 chips per entry, moving tool-adjacent items (Jest, Discourse, Cloudinary, QStash, Discord Webhooks, OCR.space, Docker Compose, Bash) into the feature lines where they already appear. On the entry page, move the action buttons above the Built-with panel in the sidebar.
- Suggested command: /impeccable distill

**[P1] The box is described three times on `/shelf` and once more on the entry.**
- Why it matters: the About DevOps card, the DevOps panel prose, and the entry summary are the same sentence in three phrasings, and "If it can be automated, it should be automated" now appears twice on the shelf. Repetition reads as padding to a reader with six tabs open.
- Fix: one job per surface. About card: the why, two sentences, ending in a real link to `#devops`. DevOps panel: the four figures plus the button, one sentence of prose, no tool chips. Entry: the only place tools are enumerated. Drop the duplicated tagline from the panel prose.
- Suggested command: /impeccable distill

**[P1] Figure labels are written for the operator, not the reader.**
- Why it matters: "8 cores, 32 GB RAM" parses as "8 | cores, 32 GB RAM" once the number is bolded; "2 SSDs, mirrored" means nothing to a recruiter; "containers running" is inventory where "services" would be proof.
- Fix: rewrite the server figures so the bold number is the proof and the label is the outcome, e.g. 41 "services running", 17 "sites behind one proxy", 8 "cores · 32 GB", and replace the SSD figure with one a hiring manager values, such as the number of his own products hosted there. Keep "Two SSDs in a RAID1 mirror" in the feature list.
- Suggested command: /impeccable clarify

**[P2] "Owner / operator" is not a role, and the DevOps panel breaks at phone width.**
- Why it matters: every other entry uses a job-shaped role; at 390px the panel keeps its 80px rack column, leaving a 212px text column about 30 characters wide and a 572px-tall panel.
- Fix: role becomes "Built and run by me" or "Sysadmin". In the existing ≤720px media block set the devops grid to one column and shrink or hide the rack SVG.
- Suggested command: /impeccable adapt

**[P2] `/diary/server` has no action and a dead column.**
- Why it matters: it is the only entry with no live, repo, or document link, so the links block never renders; the sidebar ends 330px above the body, and the entry that best proves "runs whole products" offers neither email nor resume, the two actions the site exists to trigger.
- Fix: when an entry has no external link, render the existing sticker buttons for the resume (butter) and email (sky) in the sidebar.
- Suggested command: /impeccable polish

## Persona Red Flags

**Jordan (first-time hiring manager, non-infra):** the 655-character description carries eight unglossed product names (Coolify, Certbot, Uptime Kuma, GlitchTip, Umami, InvoicePlane, Sure, pgAdmin); "2 SSDs, mirrored" and "8 cores, 32 GB RAM" attach no outcome; "Pickleball GenSan backend, Nextmarket Sniper" appear in the summary with no descriptor.

**Casey (distracted, 390px):** the title wraps as "My bare- / metal server"; on Raidium the visit button sits under 15 features and 7 chip rows; the DevOps panel is 572px tall with the button as its 14th sticker; nothing below the fold on the server entry changes shape, so there is no reason to keep scrolling.

**Sam (screen reader, keyboard):** figure and tech rows are runs of spans with no list semantics, announced as one sentence; panels have no h2, so heading navigation jumps from "Shelf" to "Python & Django" and never reaches "How I run things"; the About card's reference to the panel is not a link.

## Minor Observations

- The two 10px "Newer / Older" pager labels on every entry page are under the 11px functional-text floor (the only detector finding on today's surfaces).
- "Certbot / SSL" vs "Certbot"; "Owner / operator", "Certbot / SSL" and "Valkey / Redis" are the site's only slashed chips, all new today.
- The Raidium figure row wraps "76 countries" alone onto a second line at 1440; the home diary row for Raidium is 72px tall against 57px for the others because six figures wrap. Cap compact rows at three figures.
- Home diary order puts the server entry (2026, unfeatured) above Raidium (2025, featured first); featured should win on the home column.
- The room tag "41 containers" is a literal in `draw.ts` and in `room.ts`, not read from the entry's figure.
- The About panel renders the four practice titles twice (chips, then dt headings).

## Questions to Consider

- If the server entry lost its Built-with panel and feature list, keeping the title, four figures, the InvoicePlane paragraph, and a resume button, would a hiring manager be less convinced, or more?
- Five surfaces describe one box (About card, DevOps panel, entry, home row, room tag). Which is canonical, and what do the other four do that it cannot?
- Raidium's strongest new fact is 16,700 visitors from 76 countries drawn by public tools. Why is it a sixth chip orphaned on a second row instead of the first sentence a visitor reads?
