import { writeFileSync } from 'node:fs';

// ---------- isometric helpers ----------
const T = 38, OX = 350, OY = 275, WALL_H = 255;
const P = (u, v, h = 0) => [OX + T * (u - v), OY + (T / 2) * (u + v) - h];
const pts = (...ps) => ps.map(p => p.map(n => +n.toFixed(2)).join(',')).join(' ');
const INK = '#3A2E3F';
const D = 0.894, E = 0.447; // unit direction along a wall in px

// A face parallel to the right wall (runs along +u). origin = top-left point (min u, given v, top h)
const faceU = (u, v, h) => { const [x, y] = P(u, v, h); return `matrix(${D} ${E} 0 1 ${x.toFixed(2)} ${y.toFixed(2)})`; };
// A face parallel to the left wall (runs along -v, text reads left→right). origin = top-left (max v, given u, top h)
const faceV = (u, v, h) => { const [x, y] = P(u, v, h); return `matrix(${D} ${-E} 0 1 ${x.toFixed(2)} ${y.toFixed(2)})`; };
// Floor plane in px units, origin at (u,v,h)
const floorAt = (u, v, h) => { const [x, y] = P(u, v, h); return `matrix(${D} ${E} ${-D} ${E} ${x.toFixed(2)} ${y.toFixed(2)})`; };

function box(u0, v0, u1, v1, h0, h1, c, extra = '') {
  const s = `stroke="${INK}" stroke-opacity=".55" stroke-width="1.3" stroke-linejoin="round"`;
  return `<g ${extra}>
  <polygon points="${pts(P(u0, v1, h0), P(u1, v1, h0), P(u1, v1, h1), P(u0, v1, h1))}" fill="${c.left}" ${s}/>
  <polygon points="${pts(P(u1, v0, h0), P(u1, v1, h0), P(u1, v1, h1), P(u1, v0, h1))}" fill="${c.right}" ${s}/>
  <polygon points="${pts(P(u0, v0, h1), P(u1, v0, h1), P(u1, v1, h1), P(u0, v1, h1))}" fill="${c.top}" ${s}/>
</g>`;
}
const WOOD = { top: '#E2C4A2', left: '#C9A27E', right: '#B88E6B' };
const PLUM = { top: '#5A4A60', left: '#3A2E3F', right: '#2E2432' };
const CREAM = { top: '#FFFDF8', left: '#F3E6EE', right: '#E6D3DF' };

function tag(x, y, text, opts = {}) {
  const fs = opts.size || 10;
  const w = Math.round(text.length * fs * 0.56 + 16);
  const h = fs + 10;
  const ax = opts.align === 'left' ? x : x - w / 2;
  const fill = opts.fill || '#FFFFFF';
  return `<g class="rtag">
  <rect x="${ax}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}" stroke="${INK}" stroke-opacity=".7" stroke-width="1.2"/>
  <text x="${ax + w / 2}" y="${y + fs * 0.36}" text-anchor="middle" font-size="${fs}" font-weight="800" fill="${INK}" font-family="Nunito, sans-serif">${text}</text>
</g>`;
}

// ---------- room ----------
let S = '';

// defs: patterns
S += `<defs>
  <pattern id="floorChk" patternUnits="userSpaceOnUse" width="2" height="2">
    <rect width="2" height="2" fill="#FFF8F1"/>
    <rect width="1" height="1" fill="#F3E6EE"/><rect x="1" y="1" width="1" height="1" fill="#F3E6EE"/>
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

// base slab shadow
const [lx, ly] = P(0, 8), [rx, ry] = P(8, 0), [fx, fy] = P(8, 8), [bx, by] = P(0, 0);
S += `<ellipse cx="${fx}" cy="${fy + 6}" rx="290" ry="26" fill="${INK}" fill-opacity=".08"/>`;
S += `<polygon points="${pts([lx, ly + 16], [fx, fy + 16], [rx, ry + 16], [rx, ry], [fx, fy], [lx, ly])}" fill="#B88E6B" stroke="${INK}" stroke-opacity=".55" stroke-width="1.3" stroke-linejoin="round"/>`;
S += `<line x1="${fx}" y1="${fy}" x2="${fx}" y2="${fy + 16}" stroke="${INK}" stroke-opacity=".35" stroke-width="1.2"/>`;

// walls
S += `<g transform="matrix(-${T} ${T / 2} 0 -1 ${OX} ${OY})"><rect x="0" y="0" width="8" height="${WALL_H}" fill="url(#wallStripeL)"/>
  <rect x="0" y="0" width="8" height="12" fill="#FFFDF8"/><rect x="0" y="${WALL_H - 14}" width="8" height="14" fill="#FFFDF8"/>
  <rect x="0" y="${WALL_H - 16}" width="8" height="2" fill="#E9C3D3"/></g>`;
S += `<g transform="matrix(${T} ${T / 2} 0 -1 ${OX} ${OY})"><rect x="0" y="0" width="8" height="${WALL_H}" fill="url(#wallStripeR)"/>
  <rect x="0" y="0" width="8" height="12" fill="#FFFDF8"/><rect x="0" y="${WALL_H - 14}" width="8" height="14" fill="#FFFDF8"/>
  <rect x="0" y="${WALL_H - 16}" width="8" height="2" fill="#E9C3D3"/></g>`;
// wall outlines
S += `<polyline points="${pts(P(0, 8, WALL_H), P(0, 8, 0), P(0, 0, 0), P(8, 0, 0), P(8, 0, WALL_H), P(0, 0, WALL_H), P(0, 8, WALL_H))}" fill="none" stroke="${INK}" stroke-opacity=".6" stroke-width="1.6" stroke-linejoin="round"/>`;
S += `<line x1="${bx}" y1="${by}" x2="${bx}" y2="${by - WALL_H}" stroke="${INK}" stroke-opacity=".45" stroke-width="1.4"/>`;

// floor
S += `<g transform="matrix(${T} ${T / 2} -${T} ${T / 2} ${OX} ${OY})"><rect x="0" y="0" width="8" height="8" fill="url(#floorChk)"/></g>`;
S += `<polygon points="${pts(P(0, 0), P(8, 0), P(8, 8), P(0, 8))}" fill="none" stroke="${INK}" stroke-opacity=".6" stroke-width="1.6" stroke-linejoin="round"/>`;

// rug
S += `<g transform="${floorAt(4.4, 4.9, 0)}">
  <ellipse cx="0" cy="0" rx="92" ry="70" fill="#F3E6EE" stroke="${INK}" stroke-opacity=".5" stroke-width="1.3"/>
  <ellipse cx="0" cy="0" rx="70" ry="50" fill="none" stroke="#F7D58B" stroke-width="7"/>
  <ellipse cx="0" cy="0" rx="34" ry="22" fill="#CDE8D8" stroke="${INK}" stroke-opacity=".35" stroke-width="1"/>
</g>`;

// ---- right wall items ----
// shelf
S += box(1.3, 0, 3.9, 0.34, 130, 137, WOOD);
S += box(1.45, 0, 1.6, 0.34, 100, 130, WOOD); S += box(3.6, 0, 3.75, 0.34, 100, 130, WOOD);
// medals on shelf (standing in small stands)
const medals = [[1.85, '#F7D58B', '#D9AF4C'], [2.6, '#E8E8F0', '#B8B8C8'], [3.35, '#F0C79C', '#C98F5C']];
for (const [u, c, c2] of medals) {
  const [mx, my] = P(u, 0.17, 137);
  S += `<g filter="url(#soft)">
    <path d="M${mx - 9} ${my - 50} L${mx} ${my - 30} L${mx + 9} ${my - 50}" fill="none" stroke="${INK}" stroke-opacity=".6" stroke-width="7.5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M${mx - 9} ${my - 50} L${mx} ${my - 30} L${mx + 9} ${my - 50}" fill="none" stroke="#E67A8A" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M${mx - 9} ${my - 50} L${mx} ${my - 30} L${mx + 9} ${my - 50}" fill="none" stroke="#FFF8F1" stroke-width="1.2" stroke-linejoin="round" stroke-dasharray="1.5 2"/>
    <circle cx="${mx}" cy="${my - 18}" r="12" fill="${c}" stroke="${INK}" stroke-opacity=".7" stroke-width="1.3"/>
    <circle cx="${mx}" cy="${my - 18}" r="8" fill="none" stroke="${c2}" stroke-width="1.6"/>
    <path d="M${mx} ${my - 24} l1.8 3.8 4.2 .5 -3.1 2.9 .8 4.1 -3.7 -2.1 -3.7 2.1 .8 -4.1 -3.1 -2.9 4.2 -.5 z" fill="${c2}"/>
  </g>`;
}
// medal labels stacked under the shelf
{ const [a,b]=P(1.35,0,75); S += tag(a, b, 'Cum Laude', { align: 'left', size: 9.5, fill: '#F7D58B' }); }
{ const [a,b]=P(1.35,0,52); S += tag(a, b, 'Best Capstone', { align: 'left', size: 9.5, fill: '#FFFFFF' }); }
{ const [a,b]=P(1.35,0,29); S += tag(a, b, 'Programmer of the Year', { align: 'left', size: 9.5, fill: '#F3E6EE' }); }

// certificate frame
S += `<g transform="${faceU(4.35, 0, 218)}" filter="url(#soft)">
  <rect x="0" y="0" width="82" height="60" rx="3" fill="#C9A27E" stroke="${INK}" stroke-opacity=".7" stroke-width="1.3"/>
  <rect x="5" y="5" width="72" height="50" rx="2" fill="#FFFDF8" stroke="${INK}" stroke-opacity=".3" stroke-width=".8"/>
  <text x="41" y="18" text-anchor="middle" font-size="7" font-weight="800" letter-spacing=".6" fill="${INK}" font-family="Nunito, sans-serif">CIVIL SERVICE</text>
  <text x="41" y="27" text-anchor="middle" font-size="6.5" font-weight="700" fill="${INK}" fill-opacity=".7" font-family="Nunito, sans-serif">Professional</text>
  <text x="41" y="46" text-anchor="middle" font-size="15" font-weight="600" fill="${INK}" font-family="Fredoka, sans-serif">PASSED</text>
  <circle cx="67" cy="45" r="4.5" fill="#E67A8A" stroke="${INK}" stroke-opacity=".5" stroke-width=".8"/>
</g>`;
{ const [a,b]=P(5.5,0,231); S += tag(a, b, 'Civil Service Pro PASSED', { size: 9.5 }); }

// barong on hanger
{
  const [hx, hy] = P(7.35, 0, 220);
  S += `<g filter="url(#soft)">
    <circle cx="${hx}" cy="${hy}" r="3" fill="#B88E6B" stroke="${INK}" stroke-opacity=".6" stroke-width="1"/>
    <path d="M${hx} ${hy + 3} q-2 4 -2 8 l-17 14 h38 l-17 -14 q0 -4 -2 -8" fill="none" stroke="#8C6A48" stroke-width="2" stroke-linejoin="round"/>
    <path d="M${hx - 18} ${hy + 25} l-10 13 l6 4 l3 -4 l1 48 h36 l1 -48 l3 4 l6 -4 l-10 -13 l-9 -2 q-9 7 -18 0 z" fill="#FFF8E8" stroke="${INK}" stroke-opacity=".7" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M${hx} ${hy + 30} v58" stroke="#E9D9B8" stroke-width="1"/>
    <path d="M${hx - 9} ${hy + 30} v56 M${hx + 9} ${hy + 30} v56" stroke="#EADFC7" stroke-width="1" stroke-dasharray="1 2"/>
    <path d="M${hx - 5} ${hy + 40} q5 -4 10 0 M${hx - 5} ${hy + 52} q5 -4 10 0 M${hx - 5} ${hy + 64} q5 -4 10 0 M${hx - 5} ${hy + 76} q5 -4 10 0" fill="none" stroke="#C9A27E" stroke-width="1"/>
    <circle cx="${hx}" cy="${hy + 46}" r="1.3" fill="#C9A27E"/><circle cx="${hx}" cy="${hy + 58}" r="1.3" fill="#C9A27E"/><circle cx="${hx}" cy="${hy + 70}" r="1.3" fill="#C9A27E"/>
  </g>`;
  S += tag(hx - 4, hy + 100, 'Barong', { size: 9.5, fill: '#FFF8E8' });
}

// ---- left wall: window ----
S += `<g transform="${faceV(0, 7.35, 200)}" filter="url(#soft)">
  <rect x="0" y="0" width="104" height="84" rx="6" fill="#FFFDF8" stroke="${INK}" stroke-opacity=".7" stroke-width="1.3"/>
  <rect x="6" y="6" width="92" height="72" rx="3" fill="url(#sunset)"/>
  <circle cx="60" cy="58" r="14" fill="#F7D58B" stroke="#F2B08C" stroke-width="1.5"/>
  <rect x="6" y="59" width="92" height="19" fill="#6E9FC9" fill-opacity=".75"/>
  <path d="M6 64 q10 -3 20 0 t20 0 t20 0 t20 0 t12 0" fill="none" stroke="#FFF8F1" stroke-opacity=".7" stroke-width="1"/>
  <path d="M6 71 q10 -3 20 0 t20 0 t20 0 t20 0 t12 0" fill="none" stroke="#FFF8F1" stroke-opacity=".5" stroke-width="1"/>
  <!-- tuna-shaped cloud -->
  <path d="M18 28 c6 -8 18 -10 30 -6 c5 -6 10 -5 12 -1 l8 -7 l-2 9 l2 9 l-8 -6 c-3 5 -9 6 -13 2 c-10 6 -22 6 -29 -2 c-5 3 -9 -1 -6 -5 c-3 -3 2 -6 6 -3 z" fill="#FFFFFF" stroke="#DCE8F3" stroke-width="1"/>
  <path d="M40 28 l3 -4" stroke="#E4EEF7" stroke-width="1.2" stroke-linecap="round"/><circle cx="26" cy="26" r="1.2" fill="#BFD9F2"/>
  <rect x="50" y="6" width="3" height="72" fill="#FFFDF8" stroke="${INK}" stroke-opacity=".35" stroke-width=".6"/>
  <rect x="6" y="40" width="92" height="3" fill="#FFFDF8" stroke="${INK}" stroke-opacity=".35" stroke-width=".6"/>
  <rect x="-2" y="82" width="108" height="6" rx="2" fill="#E2C4A2" stroke="${INK}" stroke-opacity=".6" stroke-width="1.1"/>
</g>`;
{ const [a,b]=P(0,5.95,70); S += tag(a, b, 'GenSan sunset', { size: 9.5, fill: '#F7D58B' }); }

// ---- desk ----
S += box(1.25, 0.85, 1.42, 1.02, 0, 56, WOOD);
S += box(1.25, 4.05, 1.42, 4.22, 0, 56, WOOD);
S += box(0.3, 4.05, 0.47, 4.22, 0, 56, WOOD);
S += box(0.22, 0.7, 1.5, 4.32, 56, 64, WOOD);
// monitor A (raidium)
S += box(0.5, 1.55, 0.75, 1.8, 64, 72, PLUM);
S += box(0.42, 0.9, 0.66, 2.85, 72, 132, PLUM);
S += `<g transform="${faceV(0.66, 2.85, 132)}">
  <rect x="3" y="3" width="68" height="52" rx="2" fill="#241B29"/>
  <rect x="3" y="3" width="68" height="9" fill="#3A2E3F"/>
  <circle cx="8" cy="7.5" r="1.6" fill="#E67A8A"/><circle cx="13" cy="7.5" r="1.6" fill="#F7D58B"/><circle cx="18" cy="7.5" r="1.6" fill="#7FE0A0"/>
  <text x="37" y="10" text-anchor="middle" font-size="5.6" font-weight="800" fill="#FFF8F1" font-family="Nunito, sans-serif">raidium.quest</text>
  <text x="8" y="22" font-size="5" font-weight="700" fill="#BFD9F2" font-family="Nunito, sans-serif">WORLD BOSS</text>
  <text x="8" y="34" font-size="10" font-weight="600" fill="#F7D58B" font-family="Fredoka, sans-serif">00:41:12</text>
  <rect x="8" y="39" width="58" height="4" rx="2" fill="#3A2E3F"/><rect x="8" y="39" width="40" height="4" rx="2" fill="#7FE0A0"/>
  <text x="8" y="51" font-size="4.6" font-weight="700" fill="#CDE8D8" font-family="Nunito, sans-serif">6+ guilds · attendance OCR on</text>
</g>`;
// monitor B (terminal)
S += box(0.5, 3.5, 0.75, 3.75, 64, 72, PLUM);
S += box(0.42, 3.05, 0.66, 4.2, 72, 122, PLUM);
S += `<g transform="${faceV(0.66, 4.2, 122)}">
  <rect x="3" y="3" width="38" height="42" rx="2" fill="#241B29"/>
  <text x="6" y="12" font-size="4.6" font-weight="700" fill="#7FE0A0" font-family="Nunito, sans-serif">$ docker ps</text>
  <text x="6" y="20" font-size="4.4" font-weight="700" fill="#FFF8F1" font-family="Nunito, sans-serif">api   up</text>
  <text x="6" y="27" font-size="4.4" font-weight="700" fill="#FFF8F1" font-family="Nunito, sans-serif">web   up</text>
  <text x="6" y="34" font-size="4.4" font-weight="700" fill="#FFF8F1" font-family="Nunito, sans-serif">bot   up</text>
  <text x="6" y="42" font-size="4.6" font-weight="700" fill="#7FE0A0" font-family="Nunito, sans-serif">$ _</text>
</g>`;
// keyboard + mug
S += box(1.05, 1.5, 1.35, 3.1, 64, 67, CREAM);
S += box(1.0, 3.55, 1.25, 3.8, 64, 76, { top: '#F3E6EE', left: '#E67A8A', right: '#D3687A' });
{ const [a,b]=P(2.4,1.6,0); S += tag(a, b, 'Desk · 2 monitors', { size: 9.5 }); }

// ---- server rack ----
S += box(0.35, 4.7, 1.2, 5.6, 0, 60, { top: '#5A4A60', left: '#3A2E3F', right: '#2E2432' });
S += `<g transform="${faceU(0.35, 5.6, 60)}">
  ${[8, 20, 32, 44].map(y => `<rect x="4" y="${y}" width="24" height="7" rx="2" fill="#5A4A60" stroke="#241B29" stroke-width=".8"/><rect x="7" y="${y + 2.5}" width="12" height="2" fill="#241B29"/>`).join('')}
  <circle cx="26" cy="11.5" r="1.6" fill="#7FE0A0"/><circle cx="26" cy="23.5" r="1.6" fill="#7FE0A0"/><circle cx="26" cy="35.5" r="1.6" fill="#F7D58B"/><circle cx="26" cy="47.5" r="1.6" fill="#7FE0A0"/>
</g>`;
{ const [gx, gy] = P(1.2, 5.6, 66); S += `<circle cx="${gx - 6}" cy="${gy - 2}" r="10" fill="url(#lampGlow)"/><circle cx="${gx - 6}" cy="${gy - 2}" r="3" fill="#7FE0A0" stroke="${INK}" stroke-opacity=".6" stroke-width="1"/><line x1="${gx - 6}" y1="${gy + 1}" x2="${gx - 6}" y2="${gy + 5}" stroke="${INK}" stroke-opacity=".5" stroke-width="1.2"/>`; }
{ const [a,b]=P(1.5,5.4,10); S += tag(a, b, 'VPS · Docker + Coolify', { align: 'left', size: 9.5, fill: '#CDE8D8' }); }

// ---- side table + record player ----
S += box(4.65, 0.45, 5.85, 1.65, 0, 44, WOOD);
S += box(4.72, 0.55, 5.78, 1.55, 44, 54, { top: '#F3E6EE', left: '#E6D3DF', right: '#D9C3CF' });
S += `<g transform="${floorAt(5.2, 1.05, 54)}">
  <circle cx="0" cy="0" r="19" fill="#241B29" stroke="${INK}" stroke-width="1.2"/>
  <circle cx="0" cy="0" r="14" fill="none" stroke="#4A3D50" stroke-width="1"/><circle cx="0" cy="0" r="10" fill="none" stroke="#4A3D50" stroke-width="1"/>
  <circle cx="0" cy="0" r="6.5" fill="#F7D58B" stroke="${INK}" stroke-opacity=".5" stroke-width=".8"/><circle cx="0" cy="0" r="1.2" fill="#241B29"/>
</g>`;
{ const [ax, ay] = P(5.75, 0.6, 58); S += `<circle cx="${ax}" cy="${ay}" r="3.5" fill="#E6D3DF" stroke="${INK}" stroke-opacity=".6" stroke-width="1"/><path d="M${ax} ${ay} l-14 8 l-3 5" fill="none" stroke="${INK}" stroke-opacity=".7" stroke-width="1.6" stroke-linecap="round"/>`; }
// notes floating
{ const [nx, ny] = P(5.2, 1.05, 54); S += `<g fill="${INK}" fill-opacity=".8"><path d="M${nx + 28} ${ny - 40} v-12 l7 -2 v10 a3 3 0 1 1 -2 -2.8 v-4.5 l-3 .9 v8 a3 3 0 1 1 -2 -2.8z"/><path d="M${nx + 40} ${ny - 62} v-9 l2 -.6 v7 a2.4 2.4 0 1 1 -2 -2.3z"/></g>`; }
// play/pause bubble
{ const [nx, ny] = P(5.2, 1.05, 54); const cx = nx - 34, cy = ny - 38;
  S += `<g filter="url(#soft)"><path d="M${cx - 16} ${cy} a16 16 0 1 1 32 0 a16 16 0 0 1 -12 15.5 l-4 8 l-4 -8 a16 16 0 0 1 -12 -15.5 z" fill="#FFFFFF" stroke="${INK}" stroke-opacity=".7" stroke-width="1.3"/>
  <rect x="${cx - 6}" y="${cy - 6}" width="4" height="12" rx="1.2" fill="${INK}"/><rect x="${cx + 2}" y="${cy - 6}" width="4" height="12" rx="1.2" fill="${INK}"/></g>`; }
{ const [a,b]=P(5.25,1.05,-40); S += tag(a, b, 'Hip Shop · Rouxls Kaard', { size: 9.5, fill: '#F3E6EE' }); }

// ---- plant ----
{ const [px, py] = P(0.75, 7.4, 0);
  S += `<g filter="url(#soft)">
    <ellipse cx="${px}" cy="${py + 2}" rx="15" ry="6" fill="${INK}" fill-opacity=".12"/>
    <path d="M${px - 13} ${py - 22} h26 l-4 24 h-18 z" fill="#E6A79A" stroke="${INK}" stroke-opacity=".65" stroke-width="1.3" stroke-linejoin="round"/>
    <rect x="${px - 15}" y="${py - 26}" width="30" height="7" rx="3" fill="#F3B8AC" stroke="${INK}" stroke-opacity=".65" stroke-width="1.3"/>
    <g fill="#8FC7A6" stroke="${INK}" stroke-opacity=".6" stroke-width="1.2" stroke-linejoin="round">
      <path d="M${px} ${py - 26} c-20 -6 -26 -24 -14 -40 c10 8 16 24 14 40z"/>
      <path d="M${px} ${py - 26} c20 -6 26 -24 14 -40 c-10 8 -16 24 -14 40z"/>
      <path d="M${px} ${py - 26} c-6 -18 -2 -38 0 -50 c2 12 6 32 0 50z" fill="#CDE8D8"/>
      <path d="M${px} ${py - 30} c-24 2 -32 -14 -30 -22 c12 2 26 8 30 22z"/>
      <path d="M${px} ${py - 30} c24 2 32 -14 30 -22 c-12 2 -26 8 -30 22z"/>
    </g>
  </g>`; }

// ---- discord-bot plush ----
{ const [qx, qy] = P(6.35, 6.3, 0); const cy = qy - 22;
  S += `<g filter="url(#soft)">
    <ellipse cx="${qx}" cy="${qy + 2}" rx="20" ry="7" fill="${INK}" fill-opacity=".12"/>
    <ellipse cx="${qx - 9}" cy="${qy - 2}" rx="7" ry="4" fill="#9DC4EC" stroke="${INK}" stroke-opacity=".65" stroke-width="1.2"/>
    <ellipse cx="${qx + 9}" cy="${qy - 2}" rx="7" ry="4" fill="#9DC4EC" stroke="${INK}" stroke-opacity=".65" stroke-width="1.2"/>
    <line x1="${qx}" y1="${cy - 22}" x2="${qx}" y2="${cy - 30}" stroke="${INK}" stroke-opacity=".65" stroke-width="1.4"/>
    <circle cx="${qx}" cy="${cy - 32}" r="3.5" fill="#E67A8A" stroke="${INK}" stroke-opacity=".65" stroke-width="1.2"/>
    <circle cx="${qx}" cy="${cy}" r="22" fill="#BFD9F2" stroke="${INK}" stroke-opacity=".7" stroke-width="1.4"/>
    <ellipse cx="${qx - 25}" cy="${cy + 4}" rx="5" ry="7" fill="#BFD9F2" stroke="${INK}" stroke-opacity=".65" stroke-width="1.2"/>
    <ellipse cx="${qx + 25}" cy="${cy + 4}" rx="5" ry="7" fill="#BFD9F2" stroke="${INK}" stroke-opacity=".65" stroke-width="1.2"/>
    <rect x="${qx - 15}" y="${cy - 9}" width="30" height="16" rx="8" fill="#3A2E3F"/>
    <circle cx="${qx - 6}" cy="${cy - 1}" r="2.6" fill="#F7D58B"/><circle cx="${qx + 6}" cy="${cy - 1}" r="2.6" fill="#F7D58B"/>
    <path d="M${qx - 3} ${cy + 3.5} q3 2.5 6 0" fill="none" stroke="#F7D58B" stroke-width="1.2" stroke-linecap="round"/>
    <circle cx="${qx - 15}" cy="${cy + 9}" r="2.5" fill="#F3B8AC"/><circle cx="${qx + 15}" cy="${cy + 9}" r="2.5" fill="#F3B8AC"/>
  </g>`;
  S += tag(qx + 2, qy + 22, 'GLiberator · 5 yrs', { size: 9.5, fill: '#BFD9F2' }); }

// room name sticker
S += `<g filter="url(#soft)"><rect x="16" y="12" width="126" height="28" rx="14" fill="#F7D58B" stroke="${INK}" stroke-opacity=".7" stroke-width="1.3"/>
<path d="M30 30 v-7 l6 -5 l6 5 v7 z" fill="#FFFDF8" stroke="${INK}" stroke-opacity=".8" stroke-width="1.2" stroke-linejoin="round"/><rect x="34" y="24" width="4" height="6" fill="${INK}" fill-opacity=".7"/>
<text x="52" y="30.5" font-size="12.5" font-weight="600" fill="${INK}" font-family="Fredoka, sans-serif">Drekyz's room</text></g>`;
S += `<g filter="url(#soft)"><rect x="540" y="12" width="144" height="28" rx="14" fill="#FFFFFF" stroke="${INK}" stroke-opacity=".7" stroke-width="1.3"/>
<circle cx="557" cy="26" r="5" fill="#CDE8D8" stroke="${INK}" stroke-opacity=".7" stroke-width="1.1"/><circle cx="557" cy="26" r="1.8" fill="#3A2E3F"/>
<text x="569" y="30.5" font-size="11" font-weight="800" fill="${INK}" font-family="Nunito, sans-serif">click a thing to visit</text></g>`;

const svg = `<svg class="room" viewBox="0 0 700 630" xmlns="http://www.w3.org/2000/svg" aria-label="Drekyz's minihompy room">${S}</svg>`;

// ---------- page ----------
const AVATAR = 'file:///home/drekyz/Documents/Programming/Personal/cdrakke.github.io/public/images/avatar.png';
const motif = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'><g fill='none' stroke='#3A2E3F' stroke-opacity='.28' stroke-width='1.2'><path d='M18 8 l4 4 l-4 4 l-4 -4 z' fill='#BFD9F2'/><path d='M18 20 l4 4 l-4 4 l-4 -4 z' fill='#F7D58B'/></g><circle cx='4' cy='16' r='1.6' fill='#3A2E3F' fill-opacity='.35'/><circle cx='32' cy='16' r='1.6' fill='#3A2E3F' fill-opacity='.35'/><circle cx='18' cy='2' r='1.2' fill='#E67A8A' fill-opacity='.6'/><circle cx='18' cy='34' r='1.2' fill='#E67A8A' fill-opacity='.6'/></svg>`);
const ico = {
  door: `<svg viewBox="0 0 16 16"><path d="M3 2.5h7v11H3z" fill="#FFFDF8" stroke="#3A2E3F" stroke-width="1.4" stroke-linejoin="round"/><circle cx="8" cy="8.5" r="1" fill="#3A2E3F"/><path d="M10.5 8h3m-1.5-1.8 1.8 1.8-1.8 1.8" fill="none" stroke="#3A2E3F" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  mail: `<svg viewBox="0 0 16 16"><rect x="2" y="3.5" width="12" height="9" rx="2" fill="#FFFDF8" stroke="#3A2E3F" stroke-width="1.4"/><path d="M2.5 5 8 9l5.5-4" fill="none" stroke="#3A2E3F" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
  pdf: `<svg viewBox="0 0 16 16"><path d="M4 2h5.5L13 5.5V14H4z" fill="#FFFDF8" stroke="#3A2E3F" stroke-width="1.4" stroke-linejoin="round"/><path d="M9.5 2v3.5H13" fill="none" stroke="#3A2E3F" stroke-width="1.4" stroke-linejoin="round"/><path d="M6 8.5h5M6 11h4" stroke="#3A2E3F" stroke-width="1.3" stroke-linecap="round"/></svg>`,
  home: `<svg viewBox="0 0 16 16"><path d="M2.5 8 8 3l5.5 5v5.5h-11z" fill="currentColor" stroke="#3A2E3F" stroke-width="1.4" stroke-linejoin="round"/><rect x="6.5" y="9.5" width="3" height="4" fill="#3A2E3F"/></svg>`,
  book: `<svg viewBox="0 0 16 16"><path d="M2.5 3.5h5v10h-5zM8.5 3.5h5v10h-5z" fill="currentColor" stroke="#3A2E3F" stroke-width="1.4" stroke-linejoin="round"/><path d="M4 6h2M4 8h2M10 6h2M10 8h2" stroke="#3A2E3F" stroke-width="1.1" stroke-linecap="round"/></svg>`,
  shelf: `<svg viewBox="0 0 16 16"><path d="M2 5h12M2 11h12" stroke="#3A2E3F" stroke-width="1.6" stroke-linecap="round"/><circle cx="5" cy="8" r="1.6" fill="currentColor" stroke="#3A2E3F" stroke-width="1.2"/><circle cx="9" cy="8" r="1.6" fill="currentColor" stroke="#3A2E3F" stroke-width="1.2"/></svg>`,
  ledger: `<svg viewBox="0 0 16 16"><rect x="3" y="2.5" width="10" height="11" rx="2" fill="currentColor" stroke="#3A2E3F" stroke-width="1.4"/><path d="M6 6h4M6 8.5h4M6 11h2.5" stroke="#3A2E3F" stroke-width="1.2" stroke-linecap="round"/></svg>`,
  note: `<svg viewBox="0 0 16 16"><path d="M10 2.5v8.2a2.3 2.3 0 1 1-1.5-2.1V2.5z" fill="#3A2E3F"/><path d="M10 2.5l4 1.5v3" fill="none" stroke="#3A2E3F" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  spark: `<svg viewBox="0 0 16 16"><path d="M8 1.5l1.6 4.4L14 7.5l-4.4 1.6L8 13.5 6.4 9.1 2 7.5l4.4-1.6z" fill="#F7D58B" stroke="#3A2E3F" stroke-width="1.3" stroke-linejoin="round"/></svg>`,
  gh: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#3A2E3F"/><path d="M5.5 9.5c1 1.6 4 1.6 5 0" stroke="#FFFDF8" stroke-width="1.2" stroke-linecap="round" fill="none"/><circle cx="6" cy="6.8" r="1" fill="#FFFDF8"/><circle cx="10" cy="6.8" r="1" fill="#FFFDF8"/></svg>`,
};

const diary = [
  ['2026', 'Ops platform for a real estate franchise', '56% of 2,004 commits · 730 PRs · 9-role RBAC in RLS'],
  ['2025', 'Raidium · raidium.quest', '505 commits · 225 routes · 33 models · 6+ guilds · on-chain billing · Android app'],
  ['2025', 'Alertison', 'family safety app · mobile · with Michael Panizales'],
  ['2025', 'Pickleball GenSan', 'PWA matchmaking · web'],
  ['2024', 'GYOCC.online', 'capstone · tracking workload cut 80%'],
];

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Drekyz's minihompy</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@600;700;800;900&display=swap" rel="stylesheet">
<style>
:root{--blush:#F3E6EE;--sky:#BFD9F2;--butter:#F7D58B;--ink:#3A2E3F;--mint:#CDE8D8;--wood:#C9A27E;--paper:#FFF8F1;--line:rgba(58,46,63,.45);--muted:rgba(58,46,63,.68)}
html,body{width:1440px;height:900px;overflow:hidden;margin:0}
body{font-family:Nunito,system-ui,sans-serif;color:var(--ink);background:var(--blush);-webkit-font-smoothing:antialiased}
*{box-sizing:border-box}
.frame{position:relative;width:1440px;height:900px;background-color:var(--blush);background-image:url("data:image/svg+xml,${motif}");background-size:36px 36px}
.frame::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,248,241,.25),rgba(255,248,241,0) 30%,rgba(255,248,241,0) 70%,rgba(255,248,241,.25));pointer-events:none}
.paper{position:absolute;inset:22px;background:var(--paper);border:2px solid var(--line);border-radius:22px;box-shadow:0 0 0 6px rgba(255,253,248,.7),0 10px 30px rgba(58,46,63,.14),inset 0 0 0 1px rgba(255,255,255,.8);padding:16px 18px;z-index:1}
.paper::before{content:"";position:absolute;inset:0;border-radius:20px;background:repeating-linear-gradient(0deg,rgba(58,46,63,.028) 0 1px,transparent 1px 22px);pointer-events:none}
.corner{position:absolute;width:38px;height:38px;z-index:2}
.corner i{position:absolute;width:12px;height:12px;border:1.4px solid rgba(58,46,63,.5);transform:rotate(45deg);border-radius:2px}
.corner i:nth-child(1){left:13px;top:0;background:var(--sky)}.corner i:nth-child(2){left:0;top:13px;background:var(--butter)}.corner i:nth-child(3){left:26px;top:13px;background:var(--mint)}.corner i:nth-child(4){left:13px;top:26px;background:#F3B8AC}
.c1{left:14px;top:14px}.c2{right:14px;top:14px}.c3{left:14px;bottom:14px}.c4{right:14px;bottom:14px}

.top{height:40px;display:flex;align-items:center;justify-content:space-between;position:relative}
.ribbon{display:inline-flex;align-items:center;gap:8px;background:var(--butter);border:2px solid var(--line);border-radius:999px;padding:6px 16px 6px 12px;font-family:Fredoka,sans-serif;font-weight:600;font-size:17px;box-shadow:0 3px 0 rgba(58,46,63,.14)}
.ribbon svg{width:18px;height:18px;color:#FFFDF8}
.chips{display:flex;gap:8px}
.chip{display:inline-flex;align-items:center;gap:6px;background:#fff;border:1.6px solid var(--line);border-radius:999px;padding:5px 12px;font-size:12px;font-weight:800;box-shadow:0 2px 0 rgba(58,46,63,.1)}
.chip svg{width:14px;height:14px}
.chip.sky{background:var(--sky)}.chip.mint{background:var(--mint)}.chip.blush{background:var(--blush)}

.main{margin-top:12px;display:grid;grid-template-columns:290px 1fr 322px;gap:14px;height:700px}
.panel{position:relative;background:rgba(255,255,255,.72);border:2px solid var(--line);border-radius:18px;box-shadow:0 4px 0 rgba(58,46,63,.12);padding:16px}
.ptitle{position:absolute;top:-14px;left:16px;display:inline-flex;align-items:center;gap:6px;background:var(--sky);border:1.6px solid var(--line);border-radius:999px;padding:4px 12px;font-family:Fredoka,sans-serif;font-weight:600;font-size:13px;box-shadow:0 2px 0 rgba(58,46,63,.1)}
.ptitle.butter{background:var(--butter)}.ptitle.mint{background:var(--mint)}.ptitle.blush{background:var(--blush)}
.ptitle svg{width:14px;height:14px;color:#FFFDF8}

/* left */
.profile{display:flex;flex-direction:column;align-items:center;text-align:center}
.portrait{position:relative;width:140px;height:140px;margin-top:12px;transform:rotate(-3deg)}
.portrait img{width:140px;height:140px;object-fit:cover;object-position:50% 20%;border-radius:22px;border:6px solid #fff;box-shadow:0 0 0 1.6px var(--line),0 6px 14px rgba(58,46,63,.18);display:block}
.tape{position:absolute;left:36px;top:-11px;width:62px;height:18px;background:rgba(247,213,139,.85);border:1px solid rgba(58,46,63,.25);transform:rotate(4deg);border-radius:2px;box-shadow:0 1px 2px rgba(58,46,63,.1)}
.tape::after{content:"";position:absolute;inset:3px;border-top:1px dashed rgba(58,46,63,.25);border-bottom:1px dashed rgba(58,46,63,.25)}
.name{font-family:Fredoka,sans-serif;font-weight:700;font-size:40px;line-height:1;margin-top:14px;letter-spacing:.5px}
.name small{display:block;font-family:Nunito,sans-serif;font-weight:800;font-size:12.5px;line-height:1.3;letter-spacing:0;margin-top:6px;color:var(--ink)}
.loc{font-size:11.5px;font-weight:700;color:var(--muted);margin-top:4px;display:inline-flex;align-items:center;gap:5px}
.loc i{width:7px;height:7px;border-radius:50%;background:#7FE0A0;border:1px solid var(--line);display:inline-block}
.note{position:relative;margin-top:16px;background:var(--blush);border:1.6px solid var(--line);border-radius:14px;padding:16px 12px 11px;font-size:12.3px;line-height:1.42;font-weight:700;text-align:left;width:100%}
.note b{position:absolute;top:-10px;left:10px;background:#fff;border:1.4px solid var(--line);border-radius:999px;padding:2px 9px;font-size:10px;font-weight:900;letter-spacing:.4px;text-transform:uppercase}
.counters{display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%;margin-top:12px}
.ct{background:#fff;border:1.6px solid var(--line);border-radius:12px;padding:6px 8px 6px;text-align:left;box-shadow:0 2px 0 rgba(58,46,63,.08)}
.ct span{display:block;font-size:9.4px;font-weight:900;letter-spacing:.4px;text-transform:uppercase;color:var(--muted)}
.ct em{display:flex;align-items:center;gap:6px;font-style:normal;font-family:Fredoka,sans-serif;font-weight:600;font-size:19px;line-height:1.15;margin-top:1px}
.ct em svg{width:16px;height:16px}
.ct.mood{background:var(--mint)}
.btns{display:flex;flex-direction:column;gap:8px;width:100%;margin-top:12px}
.btn{display:flex;align-items:center;gap:9px;border:2px solid var(--line);border-radius:999px;padding:9px 14px;font-family:Fredoka,sans-serif;font-weight:600;font-size:15px;box-shadow:0 3px 0 rgba(58,46,63,.18);text-decoration:none;color:var(--ink)}
.btn svg{width:18px;height:18px;flex:none}
.btn.mint{background:var(--mint)}.btn.sky{background:var(--sky)}.btn.butter{background:var(--butter)}
.btn .k{margin-left:auto;font-family:Nunito,sans-serif;font-size:10px;font-weight:900;background:rgba(255,255,255,.7);border:1px solid var(--line);border-radius:999px;padding:1px 7px}

/* centre */
.roompanel{padding:14px 10px 6px;background:rgba(255,255,255,.55);display:flex;flex-direction:column;justify-content:center}
.room{width:100%;height:auto;display:block;margin-top:4px}

/* right */
.diary{display:flex;flex-direction:column;gap:7px;margin-top:6px}
.entry{display:grid;grid-template-columns:46px 1fr;gap:8px;align-items:start;background:#fff;border:1.6px solid var(--line);border-radius:13px;padding:7px 9px;box-shadow:0 2px 0 rgba(58,46,63,.08)}
.entry .yr{font-family:Fredoka,sans-serif;font-weight:600;font-size:13px;background:var(--butter);border:1.4px solid var(--line);border-radius:999px;text-align:center;padding:2px 0;line-height:1.2;margin-top:1px}
.entry:nth-child(2) .yr{background:var(--sky)}.entry:nth-child(3) .yr{background:var(--blush)}.entry:nth-child(4) .yr{background:var(--mint)}.entry:nth-child(5) .yr{background:#F3B8AC}
.entry h4{margin:0;font-size:12.6px;font-weight:900;line-height:1.25}
.entry p{margin:2px 0 0;font-size:10.8px;font-weight:700;color:var(--muted);line-height:1.3}
.entry .live{display:inline-block;margin-left:5px;font-size:9px;font-weight:900;letter-spacing:.3px;background:var(--mint);border:1px solid var(--line);border-radius:999px;padding:0 6px;vertical-align:1px}
.ledger{margin-top:14px;background:var(--blush);border:1.6px solid var(--line);border-radius:14px;padding:12px 11px 11px;position:relative}
.ledger .lh{display:flex;align-items:center;justify-content:space-between}
.ledger h4{margin:0;font-family:Fredoka,sans-serif;font-weight:600;font-size:15px;display:flex;align-items:center;gap:6px}
.ledger h4 svg{width:15px;height:15px;color:#fff}
.ledger .sub{font-size:10.5px;font-weight:700;color:var(--muted)}
.field{display:flex;align-items:center;gap:8px;margin-top:9px}
.input{flex:1;background:#fff;border:1.6px solid var(--line);border-radius:999px;padding:7px 12px;font-size:12px;font-weight:700;color:var(--muted);display:flex;align-items:center;gap:8px;box-shadow:inset 0 2px 0 rgba(58,46,63,.06)}
.input i{width:2px;height:14px;background:var(--ink);display:inline-block;border-radius:1px}
.send{background:var(--butter);border:2px solid var(--line);border-radius:999px;padding:5px 14px;font-family:Fredoka,sans-serif;font-weight:600;font-size:13.5px;box-shadow:0 3px 0 rgba(58,46,63,.18)}
.ledger .mail{margin-top:8px;font-size:10.5px;font-weight:800;display:flex;align-items:center;gap:6px}
.ledger .mail svg{width:13px;height:13px}
.friends{margin-top:12px}
.friends .lbl,.shelfrow .lbl{font-size:10px;font-weight:900;letter-spacing:.5px;text-transform:uppercase;color:var(--muted);display:flex;align-items:center;gap:6px}
.friends .lbl::after,.shelfrow .lbl::after{content:"";flex:1;border-top:1.5px dotted var(--line)}
.frow{display:flex;gap:7px;margin-top:7px;flex-wrap:wrap}
.fchip{display:inline-flex;align-items:center;gap:7px;background:#fff;border:1.6px solid var(--line);border-radius:999px;padding:4px 11px 4px 5px;font-size:11.5px;font-weight:800;box-shadow:0 2px 0 rgba(58,46,63,.08)}
.fchip .av{width:20px;height:20px;border-radius:50%;background:var(--sky);border:1.4px solid var(--line);display:grid;place-items:center;font-family:Fredoka,sans-serif;font-size:11px;font-weight:600}
.fchip .av.gh{background:var(--butter)}.fchip .av svg{width:14px;height:14px}
.shelfrow{margin-top:12px}
.srow{display:flex;gap:5px;margin-top:7px;flex-wrap:wrap}
.srow span{background:#fff;border:1.4px solid var(--line);border-radius:999px;padding:2px 8px;font-size:10.3px;font-weight:800}
.srow span:nth-child(3n+1){background:var(--mint)}.srow span:nth-child(3n+2){background:var(--sky)}.srow span:nth-child(3n){background:var(--blush)}

/* nav */
.nav{margin-top:12px;height:58px;background:rgba(255,255,255,.75);border:2px solid var(--line);border-radius:999px;box-shadow:0 4px 0 rgba(58,46,63,.12);display:flex;align-items:center;padding:6px 8px;gap:6px}
.tab{display:inline-flex;align-items:center;gap:7px;border:2px solid transparent;border-radius:999px;padding:7px 16px;font-family:Fredoka,sans-serif;font-weight:600;font-size:15px;color:var(--ink);position:relative}
.tab svg{width:18px;height:18px;color:#FFFDF8}
.tab.on{background:var(--mint);border-color:var(--line);box-shadow:0 3px 0 rgba(58,46,63,.16)}
.tab.on::after{content:"";position:absolute;left:50%;bottom:-9px;width:16px;height:3px;background:var(--ink);border-radius:2px;transform:translateX(-50%);opacity:.7}
.tab .n{font-family:Nunito,sans-serif;font-size:10px;font-weight:900;background:#fff;border:1.4px solid var(--line);border-radius:999px;padding:0 6px}
.bgm{margin-left:auto;display:inline-flex;align-items:center;gap:10px;background:var(--blush);border:2px solid var(--line);border-radius:999px;padding:5px 14px 5px 6px;font-size:12.5px;font-weight:800;box-shadow:0 3px 0 rgba(58,46,63,.14)}
.bgm .pp{width:30px;height:30px;border-radius:50%;background:#fff;border:1.8px solid var(--line);display:grid;place-items:center}
.bgm .pp{display:flex;align-items:center;justify-content:center;gap:3px}.bgm .pp b{width:4.5px;height:12px;background:var(--ink);border-radius:1.5px;display:block}
.bgm .bars{display:flex;align-items:flex-end;gap:2.5px;height:16px}
.bgm .bars i{width:4px;background:var(--ink);border-radius:2px;display:block;opacity:.8}
.bgm .t{font-family:Fredoka,sans-serif;font-weight:500;font-size:14px}
.bgm .s{color:var(--muted);font-size:11px}
.bgm .vol{display:flex;gap:3px}.bgm .vol i{width:8px;height:8px;border-radius:50%;border:1.4px solid var(--line);background:var(--butter);display:block}.bgm .vol i.off{background:#fff}
</style></head><body>
<div class="frame">
  <div class="corner c1"><i></i><i></i><i></i><i></i></div><div class="corner c2"><i></i><i></i><i></i><i></i></div>
  <div class="corner c3"><i></i><i></i><i></i><i></i></div><div class="corner c4"><i></i><i></i><i></i><i></i></div>
  <div class="paper">
    <div class="top">
      <div class="ribbon">${ico.home}Drekyz's minihompy</div>
      <div class="chips">
        <span class="chip mint"><span style="width:8px;height:8px;border-radius:50%;background:#7FE0A0;border:1px solid var(--line)"></span>open to remote</span>
        <span class="chip sky">GenSan, PH · 2026.09.02</span>
        <span class="chip blush">${ico.note}Now spinning · Hip Shop</span>
      </div>
    </div>

    <div class="main">
      <!-- LEFT: profile -->
      <section class="panel profile">
        <div class="ptitle">${ico.home}Profile</div>
        <div class="portrait"><img src="${AVATAR}" alt="Calvin Drakke I. Rulete"><div class="tape"></div></div>
        <div class="name">Drekyz<small>Calvin Drakke I. Rulete<br>Full Stack Developer</small></div>
        <div class="loc"><i></i>General Santos City · Remote</div>
        <div class="note"><b>today's note</b>I ship and run whole products: schema, API, billing, infrastructure, deploy, and the frontend when it needs me.</div>
        <div class="counters">
          <div class="ct"><span>Projects</span><em>11</em></div>
          <div class="ct"><span>Commits on flagships</span><em>1,600+</em></div>
          <div class="ct"><span>Guilds served</span><em>6+</em></div>
          <div class="ct mood"><span>Mood</span><em>${ico.spark}shipping</em></div>
        </div>
        <div class="btns">
          <a class="btn mint" href="#work">${ico.door}Visit my work<span class="k">11 rooms</span></a>
          <a class="btn sky" href="mailto:drekyz.business@gmail.com">${ico.mail}Leave a note (email)</a>
          <a class="btn butter" href="#resume">${ico.pdf}Take my resume (PDF)</a>
        </div>
      </section>

      <!-- CENTRE: room -->
      <section class="panel roompanel">
        <div class="ptitle mint">${ico.home}Room</div>
        ${svg}
      </section>

      <!-- RIGHT: diary -->
      <section class="panel">
        <div class="ptitle butter">${ico.book}Diary <span style="font-family:Nunito;font-size:10px;font-weight:900;opacity:.7">· newest first</span></div>
        <div class="diary">
          ${diary.map(([y, t, f], i) => `<div class="entry"><div class="yr">${y}</div><div><h4>${t}${i < 2 ? `<span class="live">${i === 0 ? 'in service' : 'live'}</span>` : ''}</h4><p>${f}</p></div></div>`).join('\n          ')}
        </div>
        <div class="ledger">
          <div class="lh"><h4>${ico.ledger}Guest ledger</h4><span class="sub">this is the contact form</span></div>
          <div class="field"><div class="input">Leave a note...<i></i></div><div class="send">Send</div></div>
          <div class="mail">${ico.mail}or write to drekyz.business@gmail.com</div>
        </div>
        <div class="friends"><div class="lbl">Friends</div>
          <div class="frow"><span class="fchip"><span class="av">M</span>Michael Panizales</span><span class="fchip"><span class="av gh">${ico.gh}</span>GitHub · cdrakke</span></div>
        </div>
        <div class="shelfrow"><div class="lbl">Shelf · stack</div>
          <div class="srow"><span>TypeScript</span><span>Python</span><span>C#</span><span>NestJS</span><span>Next.js</span><span>Django</span><span>React Native</span><span>PostgreSQL</span><span>Redis</span><span>Docker</span><span>Coolify</span><span>NGINX</span></div>
        </div>
      </section>
    </div>

    <nav class="nav">
      <div class="tab on">${ico.home}Room</div>
      <div class="tab">${ico.book}Diary<span class="n">5</span></div>
      <div class="tab">${ico.shelf}Shelf<span class="n">4</span></div>
      <div class="tab">${ico.ledger}Ledger</div>
      <div class="bgm"><span class="pp"><b></b><b></b></span><span class="bars"><i style="height:6px"></i><i style="height:12px"></i><i style="height:16px"></i><i style="height:9px"></i><i style="height:13px"></i></span><span><span class="t">BGM · Hip Shop</span><span class="s"> · Rouxls Kaard</span></span><span class="vol"><i></i><i></i><i></i><i class="off"></i><i class="off"></i></span></div>
    </nav>
  </div>
</div>
</body></html>`;
writeFileSync('/tmp/claude-1000/-home-drekyz-Documents-Programming-Personal-cdrakke-github-io/a20c0d88-0177-4fcf-bcef-7187c939ff54/scratchpad/mocks/challenger-minihompy.html', html);
console.log('written', html.length);
