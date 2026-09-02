/**
 * Isometric helpers for the minihompy room.
 * Room space is (u, v, h): u runs along the right wall, v along the left wall, h is height.
 * The projection is a classic 2:1 dimetric grid, T px per unit.
 */
export const T = 38;
export const OX = 350;
export const OY = 275;
export const WALL_H = 255;
export const ROOM = 8; // units per side
export const INK = "#3A2E3F";

const D = 0.894;
const E = 0.447;

export type Pt = [number, number];

/** Project a room-space point to SVG px. */
export const P = (u: number, v: number, h = 0): Pt => [
  OX + T * (u - v),
  OY + (T / 2) * (u + v) - h,
];

/** Format points for a polygon attribute. */
export const pts = (...ps: Pt[]) =>
  ps.map((p) => p.map((n) => +n.toFixed(2)).join(",")).join(" ");

/** Transform for a face parallel to the right wall (runs along +u). Origin = top-left. */
export const faceU = (u: number, v: number, h: number) => {
  const [x, y] = P(u, v, h);
  return `matrix(${D} ${E} 0 1 ${x.toFixed(2)} ${y.toFixed(2)})`;
};

/** Transform for a face parallel to the left wall (runs along -v; text reads left→right). */
export const faceV = (u: number, v: number, h: number) => {
  const [x, y] = P(u, v, h);
  return `matrix(${D} ${-E} 0 1 ${x.toFixed(2)} ${y.toFixed(2)})`;
};

/** Transform for a floor-plane group in px units, origin at (u, v, h). */
export const floorAt = (u: number, v: number, h: number) => {
  const [x, y] = P(u, v, h);
  return `matrix(${D} ${E} ${-D} ${E} ${x.toFixed(2)} ${y.toFixed(2)})`;
};

export interface Palette {
  top: string;
  left: string;
  right: string;
}

export const WOOD: Palette = { top: "#E2C4A2", left: "#C9A27E", right: "#B88E6B" };
export const PLUM: Palette = { top: "#5A4A60", left: "#3A2E3F", right: "#2E2432" };
export const CREAM: Palette = { top: "#FFFDF8", left: "#E9EFF5", right: "#D2DEEA" };
export const FROST: Palette = { top: "#E9EFF5", left: "#D2DEEA", right: "#BFCFDF" };

const STROKE = `stroke="${INK}" stroke-opacity=".55" stroke-width="1.3" stroke-linejoin="round"`;

/** An axis-aligned box from (u0,v0,h0) to (u1,v1,h1), drawn as three visible faces. */
export function box(
  u0: number,
  v0: number,
  u1: number,
  v1: number,
  h0: number,
  h1: number,
  c: Palette,
): string {
  return `<g>
  <polygon points="${pts(P(u0, v1, h0), P(u1, v1, h0), P(u1, v1, h1), P(u0, v1, h1))}" fill="${c.left}" ${STROKE}/>
  <polygon points="${pts(P(u1, v0, h0), P(u1, v1, h0), P(u1, v1, h1), P(u1, v0, h1))}" fill="${c.right}" ${STROKE}/>
  <polygon points="${pts(P(u0, v0, h1), P(u1, v0, h1), P(u1, v1, h1), P(u0, v1, h1))}" fill="${c.top}" ${STROKE}/>
</g>`;
}

export interface TagOpts {
  size?: number;
  align?: "left" | "center";
  fill?: string;
}

/** A rounded sticker label at px (x, y). Returned markup is static SVG. */
export function tag(x: number, y: number, text: string, opts: TagOpts = {}): string {
  const fs = opts.size ?? 10;
  const w = Math.round(text.length * fs * 0.56 + 16);
  const h = fs + 10;
  const ax = opts.align === "left" ? x : x - w / 2;
  const fill = opts.fill ?? "#FFFFFF";
  return `<g class="rtag">
  <rect x="${ax}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}" stroke="${INK}" stroke-opacity=".7" stroke-width="1.2"/>
  <text x="${ax + w / 2}" y="${y + fs * 0.36}" text-anchor="middle" font-size="${fs}" font-weight="800" fill="${INK}">${escapeXml(text)}</text>
</g>`;
}

export function escapeXml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
