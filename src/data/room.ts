/**
 * The furnishings that can be visited. Room.astro draws each one and wraps it in a link
 * (or a button for the record player), so the room and the site's routes never drift apart.
 */
export type RoomAction = { href: string } | { event: "bgm:toggle" };

export interface RoomObject {
  id: string;
  /** Sticker label shown beside the object. */
  label: string;
  /** Screen-reader name for the link. */
  aria: string;
  action: RoomAction;
}

export const roomObjects: RoomObject[] = [
  { id: "monitor-raidium", label: "raidium.quest", aria: "Raidium, open its project page", action: { href: "/diary/raidium" } },
  { id: "monitor-terminal", label: "Desk · my work", aria: "The work desk, see all my work", action: { href: "/diary" } },
  // The container count mirrors the first figure of the "server" entry in src/content/projects.json; update both together.
  { id: "server-rack", label: "Bare metal · 41 services", aria: "The server rack, the bare-metal server I run", action: { href: "/diary/server" } },
  { id: "record-player", label: "Hip Shop · Rouxls Kaard", aria: "Record player, play or pause the music", action: { event: "bgm:toggle" } },
  { id: "shelf-medals", label: "Cum Laude · Best Capstone · Programmer of the Year", aria: "The medal shelf, awards and education", action: { href: "/shelf#awards" } },
  { id: "certificate", label: "Civil Service · PASSED", aria: "Civil Service Professional certificate, passed", action: { href: "/shelf#certificates" } },
  { id: "barong", label: "Barong · about me", aria: "The barong, about me", action: { href: "/shelf" } },
  { id: "bot-plush", label: "GLiberator · 5 yrs", aria: "GLiberator plush, the Discord bot", action: { href: "/diary/gliberator" } },
  { id: "window", label: "Hometown · GenSan", aria: "The window, General Santos City", action: { href: "/shelf#about" } },
  { id: "guestbook", label: "Guest ledger · contact", aria: "The guest ledger, contact me", action: { href: "/ledger" } },
];
