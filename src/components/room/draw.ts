/**
 * The room, drawn. Every function returns static SVG markup in the room's 700×630 viewBox.
 * Furniture is authored here in the world's own hand: plum outlines, pastel fills, soft drop shadows.
 * Room.astro wraps the visitable pieces in links; this file only draws.
 */
import { P, pts, faceU, faceV, floorAt, box, tag, WOOD, PLUM, CREAM, FROST, INK, WALL_H, ROOM } from "./iso";

export const VIEWBOX = "0 0 700 630";

export function defs(): string {
  return `<defs>
  <pattern id="floorChk" patternUnits="userSpaceOnUse" width="2" height="2">
    <rect width="2" height="2" fill="#FFF8F1"/>
    <rect width="1" height="1" fill="#E9EFF5"/><rect x="1" y="1" width="1" height="1" fill="#E9EFF5"/>
    <rect width="1" height="1" fill="none" stroke="${INK}" stroke-opacity=".12" stroke-width="1" vector-effect="non-scaling-stroke"/>
    <rect x="1" y="1" width="1" height="1" fill="none" stroke="${INK}" stroke-opacity=".12" stroke-width="1" vector-effect="non-scaling-stroke"/>
  </pattern>
  <pattern id="wallStripeR" patternUnits="userSpaceOnUse" width="0.5" height="${WALL_H}">
    <rect width="0.5" height="${WALL_H}" fill="#BFD9F2"/><rect width="0.22" height="${WALL_H}" fill="#CFE3F6"/>
  </pattern>
  <pattern id="wallStripeL" patternUnits="userSpaceOnUse" width="0.5" height="${WALL_H}">
    <rect width="0.5" height="${WALL_H}" fill="#B5D2EE"/><rect width="0.22" height="${WALL_H}" fill="#C6DDF3"/>
  </pattern>
  <linearGradient id="sunset" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#BFD9F2"/><stop offset=".45" stop-color="#F7D58B"/><stop offset=".72" stop-color="#F2B08C"/><stop offset=".73" stop-color="#8FB8D9"/><stop offset="1" stop-color="#6E9FC9"/>
  </linearGradient>
  <radialGradient id="lampGlow"><stop offset="0" stop-color="#7FE0A0" stop-opacity=".9"/><stop offset="1" stop-color="#7FE0A0" stop-opacity="0"/></radialGradient>
  <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="1.2" flood-color="${INK}" flood-opacity=".18"/></filter>
</defs>`;
}

/** Slab, walls, floor, rug: the static stage everything sits on. */
export function stage(): string {
  const [lx, ly] = P(0, ROOM);
  const [rx, ry] = P(ROOM, 0);
  const [fx, fy] = P(ROOM, ROOM);
  const [bx, by] = P(0, 0);
  const T = 38;
  const OX = 350;
  const OY = 275;
  let s = "";
  s += `<ellipse cx="${fx}" cy="${fy + 6}" rx="290" ry="26" fill="${INK}" fill-opacity=".08"/>`;
  s += `<polygon points="${pts([lx, ly + 16], [fx, fy + 16], [rx, ry + 16], [rx, ry], [fx, fy], [lx, ly])}" fill="#B88E6B" stroke="${INK}" stroke-opacity=".55" stroke-width="1.3" stroke-linejoin="round"/>`;
  s += `<line x1="${fx}" y1="${fy}" x2="${fx}" y2="${fy + 16}" stroke="${INK}" stroke-opacity=".35" stroke-width="1.2"/>`;
  // walls
  s += `<g transform="matrix(-${T} ${T / 2} 0 -1 ${OX} ${OY})"><rect x="0" y="0" width="${ROOM}" height="${WALL_H}" fill="url(#wallStripeL)"/>
  <rect x="0" y="0" width="${ROOM}" height="12" fill="#FFFDF8"/><rect x="0" y="${WALL_H - 14}" width="${ROOM}" height="14" fill="#FFFDF8"/>
  <rect x="0" y="${WALL_H - 16}" width="${ROOM}" height="2" fill="#C9D8E8"/></g>`;
  s += `<g transform="matrix(${T} ${T / 2} 0 -1 ${OX} ${OY})"><rect x="0" y="0" width="${ROOM}" height="${WALL_H}" fill="url(#wallStripeR)"/>
  <rect x="0" y="0" width="${ROOM}" height="12" fill="#FFFDF8"/><rect x="0" y="${WALL_H - 14}" width="${ROOM}" height="14" fill="#FFFDF8"/>
  <rect x="0" y="${WALL_H - 16}" width="${ROOM}" height="2" fill="#C9D8E8"/></g>`;
  s += `<polyline points="${pts(P(0, ROOM, WALL_H), P(0, ROOM, 0), P(0, 0, 0), P(ROOM, 0, 0), P(ROOM, 0, WALL_H), P(0, 0, WALL_H), P(0, ROOM, WALL_H))}" fill="none" stroke="${INK}" stroke-opacity=".6" stroke-width="1.6" stroke-linejoin="round"/>`;
  s += `<line x1="${bx}" y1="${by}" x2="${bx}" y2="${by - WALL_H}" stroke="${INK}" stroke-opacity=".45" stroke-width="1.4"/>`;
  // floor
  s += `<g transform="matrix(${T} ${T / 2} -${T} ${T / 2} ${OX} ${OY})"><rect x="0" y="0" width="${ROOM}" height="${ROOM}" fill="url(#floorChk)"/></g>`;
  s += `<polygon points="${pts(P(0, 0), P(ROOM, 0), P(ROOM, ROOM), P(0, ROOM))}" fill="none" stroke="${INK}" stroke-opacity=".6" stroke-width="1.6" stroke-linejoin="round"/>`;
  // rug
  s += `<g transform="${floorAt(4.4, 4.9, 0)}">
  <ellipse cx="0" cy="0" rx="92" ry="70" fill="#E9EFF5" stroke="${INK}" stroke-opacity=".5" stroke-width="1.3"/>
  <ellipse cx="0" cy="0" rx="70" ry="50" fill="none" stroke="#F7D58B" stroke-width="7"/>
  <ellipse cx="0" cy="0" rx="34" ry="22" fill="#CDE8D8" stroke="${INK}" stroke-opacity=".35" stroke-width="1"/>
</g>`;
  return s;
}

export interface Drawn {
  /** Static markup for the object. */
  svg: string;
  /** The sticker label, already placed. */
  label: string;
}

export function shelfMedals(): Drawn {
  let s = "";
  s += box(1.3, 0, 3.9, 0.34, 130, 137, WOOD);
  s += box(1.45, 0, 1.6, 0.34, 100, 130, WOOD);
  s += box(3.6, 0, 3.75, 0.34, 100, 130, WOOD);
  const medals: Array<[number, string, string]> = [
    [1.85, "#F7D58B", "#D9AF4C"],
    [2.6, "#E8E8F0", "#B8B8C8"],
    [3.35, "#F0C79C", "#C98F5C"],
  ];
  for (const [u, c, c2] of medals) {
    const [mx, my] = P(u, 0.17, 137);
    s += `<g filter="url(#soft)">
    <path d="M${mx - 9} ${my - 50} L${mx} ${my - 30} L${mx + 9} ${my - 50}" fill="none" stroke="${INK}" stroke-opacity=".6" stroke-width="7.5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M${mx - 9} ${my - 50} L${mx} ${my - 30} L${mx + 9} ${my - 50}" fill="none" stroke="#D9663F" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M${mx - 9} ${my - 50} L${mx} ${my - 30} L${mx + 9} ${my - 50}" fill="none" stroke="#FFF8F1" stroke-width="1.2" stroke-linejoin="round" stroke-dasharray="1.5 2"/>
    <circle cx="${mx}" cy="${my - 18}" r="12" fill="${c}" stroke="${INK}" stroke-opacity=".7" stroke-width="1.3"/>
    <circle cx="${mx}" cy="${my - 18}" r="8" fill="none" stroke="${c2}" stroke-width="1.6"/>
    <path d="M${mx} ${my - 24} l1.8 3.8 4.2 .5 -3.1 2.9 .8 4.1 -3.7 -2.1 -3.7 2.1 .8 -4.1 -3.1 -2.9 4.2 -.5 z" fill="${c2}"/>
  </g>`;
  }
  // The three stickers sit 10px up and right of their anchor so they tuck under the shelf instead of drifting toward the desk.
  const NUDGE_X = 10;
  const NUDGE_Y = -10;
  const [x1, y1] = P(1.35, 0, 75);
  const [x2, y2] = P(1.35, 0, 52);
  const [x3, y3] = P(1.35, 0, 29);
  const [a1, b1] = [x1 + NUDGE_X, y1 + NUDGE_Y];
  const [a2, b2] = [x2 + NUDGE_X, y2 + NUDGE_Y];
  const [a3, b3] = [x3 + NUDGE_X, y3 + NUDGE_Y];
  const label =
    tag(a1, b1, "Cum Laude", { align: "left", size: 9.5, fill: "#F7D58B" }) +
    tag(a2, b2, "Best Capstone", { align: "left", size: 9.5 }) +
    tag(a3, b3, "Programmer of the Year", { align: "left", size: 9.5, fill: "#E9EFF5" });
  return { svg: s, label };
}

export function certificate(): Drawn {
  const s = `<g transform="${faceU(4.35, 0, 218)}" filter="url(#soft)">
  <rect x="0" y="0" width="82" height="60" rx="3" fill="#C9A27E" stroke="${INK}" stroke-opacity=".7" stroke-width="1.3"/>
  <rect x="5" y="5" width="72" height="50" rx="2" fill="#FFFDF8" stroke="${INK}" stroke-opacity=".3" stroke-width=".8"/>
  <text x="41" y="17" text-anchor="middle" font-size="6.6" font-weight="800" letter-spacing=".6" fill="${INK}">CIVIL SERVICE</text>
  <text x="41" y="26" text-anchor="middle" font-size="6.2" font-weight="700" fill="${INK}" fill-opacity=".7">Professional</text>
  <rect x="17" y="33" width="48" height="14" rx="3" fill="none" stroke="#D9663F" stroke-width="1.6" transform="rotate(-6 41 40)"/>
  <text x="41" y="43.5" text-anchor="middle" font-size="9" font-weight="900" letter-spacing="1" fill="#D9663F" transform="rotate(-6 41 40)">PASSED</text>
  <circle cx="67" cy="49" r="4" fill="#F7D58B" stroke="${INK}" stroke-opacity=".5" stroke-width=".8"/>
</g>`;
  const [a, b] = P(5.5, 0, 231);
  return { svg: s, label: tag(a, b, "Civil Service · PASSED", { size: 9.5 }) };
}

export function barong(): Drawn {
  const [hx, hy] = P(7.35, 0, 220);
  const s = `<g filter="url(#soft)">
    <circle cx="${hx}" cy="${hy}" r="3" fill="#B88E6B" stroke="${INK}" stroke-opacity=".6" stroke-width="1"/>
    <path d="M${hx} ${hy + 3} q-2 4 -2 8 l-17 14 h38 l-17 -14 q0 -4 -2 -8" fill="none" stroke="#8C6A48" stroke-width="2" stroke-linejoin="round"/>
    <path d="M${hx - 18} ${hy + 25} l-10 13 l6 4 l3 -4 l1 48 h36 l1 -48 l3 4 l6 -4 l-10 -13 l-9 -2 q-9 7 -18 0 z" fill="#FFF8E8" stroke="${INK}" stroke-opacity=".7" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M${hx} ${hy + 30} v58" stroke="#E9D9B8" stroke-width="1"/>
    <path d="M${hx - 9} ${hy + 30} v56 M${hx + 9} ${hy + 30} v56" stroke="#EADFC7" stroke-width="1" stroke-dasharray="1 2"/>
    <path d="M${hx - 5} ${hy + 40} q5 -4 10 0 M${hx - 5} ${hy + 52} q5 -4 10 0 M${hx - 5} ${hy + 64} q5 -4 10 0 M${hx - 5} ${hy + 76} q5 -4 10 0" fill="none" stroke="#C9A27E" stroke-width="1"/>
    <circle cx="${hx}" cy="${hy + 46}" r="1.3" fill="#C9A27E"/><circle cx="${hx}" cy="${hy + 58}" r="1.3" fill="#C9A27E"/><circle cx="${hx}" cy="${hy + 70}" r="1.3" fill="#C9A27E"/>
  </g>`;
  return { svg: s, label: tag(hx - 4, hy + 100, "Barong · about me", { size: 9.5, fill: "#FFF8E8" }) };
}

/**
 * The window. With `viewHref` the pane shows a painted view (clipped to the pane, cover-fit);
 * without it the drawn sunset stands in, so the room still renders if the asset is missing.
 */
export function windowScene(viewHref?: string): Drawn {
  const drawnView = `<rect x="6" y="6" width="92" height="72" rx="3" fill="url(#sunset)"/>
  <circle cx="60" cy="58" r="14" fill="#F7D58B" stroke="#F2B08C" stroke-width="1.5"/>
  <rect x="6" y="59" width="92" height="19" fill="#6E9FC9" fill-opacity=".75"/>
  <path d="M6 64 q10 -3 20 0 t20 0 t20 0 t20 0 t12 0" fill="none" stroke="#FFF8F1" stroke-opacity=".7" stroke-width="1"/>
  <path d="M6 71 q10 -3 20 0 t20 0 t20 0 t20 0 t12 0" fill="none" stroke="#FFF8F1" stroke-opacity=".5" stroke-width="1"/>
  <path d="M18 28 c6 -8 18 -10 30 -6 c5 -6 10 -5 12 -1 l8 -7 l-2 9 l2 9 l-8 -6 c-3 5 -9 6 -13 2 c-10 6 -22 6 -29 -2 c-5 3 -9 -1 -6 -5 c-3 -3 2 -6 6 -3 z" fill="#FFFDF8" stroke="#DCE8F3" stroke-width="1"/>
  <path d="M40 28 l3 -4" stroke="#E4EEF7" stroke-width="1.2" stroke-linecap="round"/><circle cx="26" cy="26" r="1.2" fill="#BFD9F2"/>`;
  const paintedView = `<clipPath id="windowPane"><rect x="6" y="6" width="92" height="72" rx="3"/></clipPath>
  <image href="${viewHref}" x="6" y="6" width="92" height="72" preserveAspectRatio="xMidYMid slice" clip-path="url(#windowPane)"/>`;
  const s = `<g transform="${faceV(0, 7.35, 200)}" filter="url(#soft)">
  <rect x="0" y="0" width="104" height="84" rx="6" fill="#FFFDF8" stroke="${INK}" stroke-opacity=".7" stroke-width="1.3"/>
  ${viewHref ? paintedView : drawnView}
  <rect x="50" y="6" width="3" height="72" fill="#FFFDF8" stroke="${INK}" stroke-opacity=".35" stroke-width=".6"/>
  <rect x="6" y="40" width="92" height="3" fill="#FFFDF8" stroke="${INK}" stroke-opacity=".35" stroke-width=".6"/>
  <rect x="-2" y="82" width="108" height="6" rx="2" fill="#E2C4A2" stroke="${INK}" stroke-opacity=".6" stroke-width="1.1"/>
</g>`;
  const [a, b] = P(0, 5.95, 70);
  // 16px left of the sill so the sticker clears the server rack in front of it.
  return { svg: s, label: tag(a - 16, b, "Hometown · GenSan", { size: 9.5, fill: "#F7D58B" }) };
}

/** Desk with keyboard and mug; monitors are separate so each can be its own link. */
export function desk(): string {
  let s = "";
  s += box(1.25, 0.85, 1.42, 1.02, 0, 56, WOOD);
  s += box(1.25, 4.05, 1.42, 4.22, 0, 56, WOOD);
  s += box(0.3, 4.05, 0.47, 4.22, 0, 56, WOOD);
  s += box(0.22, 0.7, 1.5, 4.32, 56, 64, WOOD);
  s += box(1.05, 1.5, 1.35, 3.1, 64, 67, CREAM);
  s += box(1.0, 3.55, 1.25, 3.8, 64, 76, { top: "#E9EFF5", left: "#D9663F", right: "#C0532F" });
  return s;
}

export function monitorRaidium(): Drawn {
  let s = "";
  s += box(0.5, 1.55, 0.75, 1.8, 64, 72, PLUM);
  s += box(0.42, 0.9, 0.66, 2.85, 72, 132, PLUM);
  s += `<g transform="${faceV(0.66, 2.85, 132)}">
  <rect x="3" y="3" width="68" height="52" rx="2" fill="#241B29"/>
  <rect x="3" y="3" width="68" height="9" fill="#3A2E3F"/>
  <circle cx="8" cy="7.5" r="1.6" fill="#D9663F"/><circle cx="13" cy="7.5" r="1.6" fill="#F7D58B"/><circle cx="18" cy="7.5" r="1.6" fill="#7FE0A0"/>
  <text x="37" y="10" text-anchor="middle" font-size="5.6" font-weight="800" fill="#FFF8F1">raidium.quest</text>
  <text x="8" y="22" font-size="5" font-weight="700" fill="#BFD9F2">RED BOSS · NEXT SPAWN</text>
  <rect x="8" y="26" width="58" height="5" rx="2.5" fill="#3A2E3F"/><rect x="8" y="26" width="41" height="5" rx="2.5" fill="#F7D58B"/>
  <text x="8" y="40" font-size="4.6" font-weight="700" fill="#CDE8D8">6+ guilds · attendance OCR on</text>
  <text x="8" y="49" font-size="4.6" font-weight="700" fill="#CDE8D8">225 routes · 33 models</text>
</g>`;
  return { svg: s, label: "" };
}

export function monitorTerminal(): Drawn {
  let s = "";
  s += box(0.5, 3.5, 0.75, 3.75, 64, 72, PLUM);
  s += box(0.42, 3.05, 0.66, 4.2, 72, 122, PLUM);
  s += `<g transform="${faceV(0.66, 4.2, 122)}">
  <rect x="3" y="3" width="38" height="42" rx="2" fill="#241B29"/>
  <text x="6" y="12" font-size="4.6" font-weight="700" fill="#7FE0A0">$ docker ps</text>
  <text x="6" y="20" font-size="4.4" font-weight="700" fill="#FFF8F1">api   up</text>
  <text x="6" y="27" font-size="4.4" font-weight="700" fill="#FFF8F1">web   up</text>
  <text x="6" y="34" font-size="4.4" font-weight="700" fill="#FFF8F1">bot   up</text>
  <text x="6" y="42" font-size="4.6" font-weight="700" fill="#7FE0A0">$ _</text>
</g>`;
  const [a, b] = P(2.4, 1.6, 0);
  return { svg: s, label: tag(a, b, "Desk · my work", { size: 9.5 }) };
}

export function serverRack(): Drawn {
  let s = "";
  s += box(0.35, 4.7, 1.2, 5.6, 0, 60, { top: "#5A4A60", left: "#3A2E3F", right: "#2E2432" });
  s += `<g transform="${faceU(0.35, 5.6, 60)}">
  ${[8, 20, 32, 44]
    .map(
      (y) =>
        `<rect x="4" y="${y}" width="24" height="7" rx="2" fill="#5A4A60" stroke="#241B29" stroke-width=".8"/><rect x="7" y="${y + 2.5}" width="12" height="2" fill="#241B29"/>`,
    )
    .join("")}
  <circle cx="26" cy="11.5" r="1.6" fill="#7FE0A0"/><circle cx="26" cy="23.5" r="1.6" fill="#7FE0A0"/><circle cx="26" cy="35.5" r="1.6" fill="#F7D58B"/><circle cx="26" cy="47.5" r="1.6" fill="#7FE0A0"/>
</g>`;
  const [gx, gy] = P(1.2, 5.6, 66);
  s += `<circle class="lamp" cx="${gx - 6}" cy="${gy - 2}" r="10" fill="url(#lampGlow)"/><circle cx="${gx - 6}" cy="${gy - 2}" r="3" fill="#7FE0A0" stroke="${INK}" stroke-opacity=".6" stroke-width="1"/><line x1="${gx - 6}" y1="${gy + 1}" x2="${gx - 6}" y2="${gy + 5}" stroke="${INK}" stroke-opacity=".5" stroke-width="1.2"/>`;
  const [a, b] = P(1.5, 5.4, 10);
  return { svg: s, label: tag(a, b, "Bare metal · 41 services", { align: "left", size: 9.5, fill: "#CDE8D8" }) };
}

export function recordPlayer(): Drawn {
  let s = "";
  s += box(4.65, 0.45, 5.85, 1.65, 0, 44, WOOD);
  s += box(4.72, 0.55, 5.78, 1.55, 44, 54, FROST);
  s += `<g transform="${floorAt(5.2, 1.05, 54)}">
  <g class="vinyl">
    <circle cx="0" cy="0" r="19" fill="#241B29" stroke="${INK}" stroke-width="1.2"/>
    <circle cx="0" cy="0" r="14" fill="none" stroke="#4A3D50" stroke-width="1"/><circle cx="0" cy="0" r="10" fill="none" stroke="#4A3D50" stroke-width="1"/>
    <circle cx="0" cy="0" r="6.5" fill="#F7D58B" stroke="${INK}" stroke-opacity=".5" stroke-width=".8"/><circle cx="0" cy="0" r="1.2" fill="#241B29"/>
    <path d="M-2 -13 l4 0" stroke="#FFF8F1" stroke-opacity=".5" stroke-width="1" stroke-linecap="round"/>
  </g>
</g>`;
  const [ax, ay] = P(5.75, 0.6, 58);
  s += `<circle cx="${ax}" cy="${ay}" r="3.5" fill="#D2DEEA" stroke="${INK}" stroke-opacity=".6" stroke-width="1"/><path d="M${ax} ${ay} l-14 8 l-3 5" fill="none" stroke="${INK}" stroke-opacity=".7" stroke-width="1.6" stroke-linecap="round"/>`;
  const [nx, ny] = P(5.2, 1.05, 54);
  s += `<g class="notes" fill="${INK}" fill-opacity=".8"><path d="M${nx + 28} ${ny - 40} v-12 l7 -2 v10 a3 3 0 1 1 -2 -2.8 v-4.5 l-3 .9 v8 a3 3 0 1 1 -2 -2.8z"/><path d="M${nx + 40} ${ny - 62} v-9 l2 -.6 v7 a2.4 2.4 0 1 1 -2 -2.3z"/></g>`;
  const cx = nx - 34;
  const cy = ny - 38;
  s += `<g class="bubble" filter="url(#soft)"><path d="M${cx - 16} ${cy} a16 16 0 1 1 32 0 a16 16 0 0 1 -12 15.5 l-4 8 l-4 -8 a16 16 0 0 1 -12 -15.5 z" fill="#FFFDF8" stroke="${INK}" stroke-opacity=".7" stroke-width="1.3"/>
  <g class="ico-pause"><rect x="${cx - 6}" y="${cy - 6}" width="4" height="12" rx="1.2" fill="${INK}"/><rect x="${cx + 2}" y="${cy - 6}" width="4" height="12" rx="1.2" fill="${INK}"/></g>
  <path class="ico-play" d="M${cx - 5} ${cy - 7} v14 l11 -7 z" fill="${INK}"/></g>`;
  const [a, b] = P(5.25, 1.05, -40);
  return { svg: s, label: tag(a, b, "Hip Shop · Rouxls Kaard", { size: 9.5, fill: "#E9EFF5" }) };
}

export function plant(): string {
  const [px, py] = P(0.75, 7.4, 0);
  return `<g filter="url(#soft)">
    <ellipse cx="${px}" cy="${py + 2}" rx="15" ry="6" fill="${INK}" fill-opacity=".12"/>
    <path d="M${px - 13} ${py - 22} h26 l-4 24 h-18 z" fill="#E6A79A" stroke="${INK}" stroke-opacity=".65" stroke-width="1.3" stroke-linejoin="round"/>
    <rect x="${px - 15}" y="${py - 26}" width="30" height="7" rx="3" fill="#F2C29D" stroke="${INK}" stroke-opacity=".65" stroke-width="1.3"/>
    <g fill="#8FC7A6" stroke="${INK}" stroke-opacity=".6" stroke-width="1.2" stroke-linejoin="round">
      <path d="M${px} ${py - 26} c-20 -6 -26 -24 -14 -40 c10 8 16 24 14 40z"/>
      <path d="M${px} ${py - 26} c20 -6 26 -24 14 -40 c-10 8 -16 24 -14 40z"/>
      <path d="M${px} ${py - 26} c-6 -18 -2 -38 0 -50 c2 12 6 32 0 50z" fill="#CDE8D8"/>
      <path d="M${px} ${py - 30} c-24 2 -32 -14 -30 -22 c12 2 26 8 30 22z"/>
      <path d="M${px} ${py - 30} c24 2 32 -14 30 -22 c-12 2 -26 8 -30 22z"/>
    </g>
  </g>`;
}

export function botPlush(): Drawn {
  const [qx, qy] = P(6.35, 6.3, 0);
  const cy = qy - 22;
  const s = `<g filter="url(#soft)">
    <ellipse cx="${qx}" cy="${qy + 2}" rx="20" ry="7" fill="${INK}" fill-opacity=".12"/>
    <ellipse cx="${qx - 9}" cy="${qy - 2}" rx="7" ry="4" fill="#9DC4EC" stroke="${INK}" stroke-opacity=".65" stroke-width="1.2"/>
    <ellipse cx="${qx + 9}" cy="${qy - 2}" rx="7" ry="4" fill="#9DC4EC" stroke="${INK}" stroke-opacity=".65" stroke-width="1.2"/>
    <line x1="${qx}" y1="${cy - 22}" x2="${qx}" y2="${cy - 30}" stroke="${INK}" stroke-opacity=".65" stroke-width="1.4"/>
    <circle cx="${qx}" cy="${cy - 32}" r="3.5" fill="#D9663F" stroke="${INK}" stroke-opacity=".65" stroke-width="1.2"/>
    <circle cx="${qx}" cy="${cy}" r="22" fill="#BFD9F2" stroke="${INK}" stroke-opacity=".7" stroke-width="1.4"/>
    <ellipse cx="${qx - 25}" cy="${cy + 4}" rx="5" ry="7" fill="#BFD9F2" stroke="${INK}" stroke-opacity=".65" stroke-width="1.2"/>
    <ellipse cx="${qx + 25}" cy="${cy + 4}" rx="5" ry="7" fill="#BFD9F2" stroke="${INK}" stroke-opacity=".65" stroke-width="1.2"/>
    <rect x="${qx - 15}" y="${cy - 9}" width="30" height="16" rx="8" fill="#3A2E3F"/>
    <circle cx="${qx - 6}" cy="${cy - 1}" r="2.6" fill="#F7D58B"/><circle cx="${qx + 6}" cy="${cy - 1}" r="2.6" fill="#F7D58B"/>
    <path d="M${qx - 3} ${cy + 3.5} q3 2.5 6 0" fill="none" stroke="#F7D58B" stroke-width="1.2" stroke-linecap="round"/>
    <circle cx="${qx - 15}" cy="${cy + 9}" r="2.5" fill="#F2C29D"/><circle cx="${qx + 15}" cy="${cy + 9}" r="2.5" fill="#F2C29D"/>
  </g>`;
  return { svg: s, label: tag(qx + 2, qy + 22, "GLiberator · 5 yrs", { size: 9.5, fill: "#BFD9F2" }) };
}

/** A small open ledger on the floor by the front-right corner, with a pencil. */
export function guestbook(): Drawn {
  const [gx, gy] = P(3.4, 7.3, 0);
  const s = `<g filter="url(#soft)">
    <ellipse cx="${gx}" cy="${gy + 3}" rx="22" ry="8" fill="${INK}" fill-opacity=".1"/>
    <g transform="${floorAt(3.4, 7.3, 3)}">
      <path d="M-22 -14 h22 v28 h-22 q-3 0 -3 -3 v-22 q0 -3 3 -3 z" fill="#E9EFF5" stroke="${INK}" stroke-opacity=".7" stroke-width="1.3"/>
      <path d="M0 -14 h22 q3 0 3 3 v22 q0 3 -3 3 h-22 z" fill="#FFFDF8" stroke="${INK}" stroke-opacity=".7" stroke-width="1.3"/>
      <path d="M-17 -6 h13 M-17 0 h13 M-17 6 h9 M5 -6 h13 M5 0 h13 M5 6 h7" stroke="${INK}" stroke-opacity=".35" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M8 -9 l6 3" stroke="#D9663F" stroke-width="2" stroke-linecap="round"/>
      <path d="M26 -4 l10 -14" stroke="#F7D58B" stroke-width="4" stroke-linecap="round"/><path d="M26 -4 l10 -14" stroke="${INK}" stroke-opacity=".6" stroke-width="1" fill="none"/><path d="M25 -2 l2 -3 l2 2z" fill="${INK}"/>
    </g>
  </g>`;
  return { svg: s, label: tag(gx + 6, gy + 30, "Guest ledger · contact", { size: 9.5 }) };
}
