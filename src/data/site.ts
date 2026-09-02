/** Site-wide facts that are not a collection. Everything else lives in src/content/*.json. */
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
  resumePath: "/resume/Calvin_Drakke_Rulete_Resume.pdf",
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
  nav: [
    { label: "Room", href: "/", icon: "home" },
    { label: "Diary", href: "/diary", icon: "book" },
    { label: "Shelf", href: "/shelf", icon: "shelf" },
    { label: "Ledger", href: "/ledger", icon: "ledger" },
  ],
  /** People he builds with. Michael on the mobile and web projects; Casey on the current team platform. */
  friends: [
    { name: "Michael Panizales", url: "https://michaelpanizales.vercel.app/", initial: "M" },
    { name: "Casey Sinoy", url: "https://caseysinoy.dev/projects", initial: "C" },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];
