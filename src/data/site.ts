/** Site-wide facts that are not a collection. Everything else lives in src/content/*.json. */
const resumePath = "/resume/Calvin_Drakke_Rulete_Resume.pdf";

export const site = {
  handle: "Drekyz",
  name: "Calvin Drakke I. Rulete",
  shortName: "Calvin Drakke Rulete",
  role: "Full Stack Developer",
  location: "General Santos City, Philippines",
  locationShort: "General Santos City",
  availability: "Open to remote",
  email: "drekyz.business@gmail.com",
  phone: "+63 908 160 0631",
  url: "https://cdrakke.github.io",
  github: "https://github.com/cdrakke",
  twitterHandle: "@CDrakke",
  resumePath,
  /** Kept on purpose: the room's record player. */
  music: {
    src: "/audio/deltarune-rouxl-kard.mp3",
    title: "Hip Shop",
    artist: "Rouxls Kaard",
    source: "Deltarune",
    defaultVolume: 0.3,
  },
  /** web3forms access keys are public by design; the form still needs a honeypot. */
  web3formsKey: "7e8d5943-a358-4e09-9373-250488759333",
  /**
   * Tabs say what a visitor is looking for; the room keeps its own words (diary, shelf, ledger) as subtitles.
   * `file` tabs open a document outside the client router: new tab, no prefetch, never active.
   */
  nav: [
    { label: "Room", href: "/", icon: "home" },
    { label: "Work", href: "/diary", icon: "book" },
    { label: "About", href: "/shelf", icon: "shelf" },
    { label: "Contact", href: "/ledger", icon: "ledger" },
    { label: "Resume", href: resumePath, icon: "pdf", file: true },
  ],
  /** People he builds with. Michael on the mobile and web projects; Casey on the current team platform. */
  friends: [
    { name: "Michael Panizales", url: "https://michaelpanizales.vercel.app/", initial: "M" },
    { name: "Casey Sinoy", url: "https://caseysinoy.dev/projects", initial: "C" },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];
