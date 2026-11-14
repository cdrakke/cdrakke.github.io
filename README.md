# cdrakke.github.io

Calvin Drakke I. Rulete's portfolio, built as a minihompy: an isometric room you can visit, with Work (a diary of shipped products at `/diary`), About (a shelf of awards and experience at `/shelf`), Contact (a guest ledger at `/ledger`), and the resume PDF. Live at [cdrakke.github.io](https://cdrakke.github.io).

## Stack

- [Astro 7](https://astro.build) as a static site, no UI framework. Interactivity is plain TypeScript in `<script>` blocks and one custom element (`<bgm-player>`).
- Plain CSS with design tokens (`src/styles/tokens.css`). Fonts (Fredoka, Nunito) are self-hosted at build through Astro's Fonts API.
- Content collections over JSON (`src/content/*.json`), typed by `src/content.config.ts`. The pages, the resume, and the social card all read the same data.
- Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server at `http://localhost:4321` |
| `npm run check` | Type-checks `.astro` and `.ts` files |
| `npm run build` | `astro build`, then renders `public/og.png` from `/og` |
| `npm run preview` | Serves `dist/` |
| `npm run resume:pdf` | Prints the built `/resume` page to `public/resume/Calvin_Drakke_Rulete_Resume.pdf` (run after a build) |
| `npm run avatar:cutout` | Removes the portrait background with rembg through `uvx` |
| `npm run gen:image` | Generates a raster with Gemini (needs `GEMINI_API_KEY`); see the script header |

Commit `public/og.png` and the resume PDF after regenerating them; CI builds without a browser.

## Where things live

- `src/content/projects.json` — the diary. Add an entry here and it appears on `/diary`, gets its own page at `/diary/<id>`, and shows up in the room's counters. Images are referenced relative to the JSON file (`../assets/images/...`).
- `src/content/experience.json`, `education.json`, `certificates.json`, `skills.json`, `socials.json` — the shelf and the resume.
- `src/data/site.ts` — name, handle, contact, nav, music track, web3forms key. `src/data/copy.ts` — the prose.
- `src/data/room.ts` — which furnishings are clickable and where they lead. `src/components/room/draw.ts` draws them; `Room.astro` wraps them in links.
- `PRODUCT.md` — product truth and constraints (audience, positioning, what may and may not be shown). `DESIGN.md` — the visual system, recorded from the built site.

## Adding a project

1. Add an object to `src/content/projects.json` with a unique `id` (the URL slug), `kind` (`saas`, `web`, `mobile`, `desktop`, `bot`, `tool`, or `infra`), `year`, `status`, and only real `figures`. `liveUrl`, `repoUrl`, and `documentUrl` each add an action button on the entry page.
2. Drop images under `src/assets/images/projects/<id>/` and reference them in `cover` / `screenshots`.
3. `npm run check && npm run build`.
