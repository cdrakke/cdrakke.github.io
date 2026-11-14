/**
 * Site prose. Facts (figures, dates, links) live in src/content/*.json;
 * this file holds only the sentences that wrap them.
 */
export const copy = {
  oneTrueSentence:
    "I ship and run whole products: schema, API, billing, infrastructure, deploy, and the frontend when it needs me.",

  todayNote:
    "I ship and run whole products: schema, API, billing, infrastructure, and deploy.",

  intro:
    "I'm Calvin Drakke I. Rulete, Drekyz online, a full stack developer from General Santos City, Philippines. I build and run production systems end to end: a multi-tenant SaaS for MMORPG guilds, a family safety app, a fire safety decision engine, and the operations platform behind a real estate franchise. I've been writing scripts, bots, and apps since grade 7, long before I had a degree to show for it.",

  whatIDo: [
    {
      title: "Python & Django",
      body: "My foundation. I started with Django and PostgreSQL in college, designing the schemas, REST APIs, and payment integration for GYOCC.online, my capstone. That is where I learned to own the data and the logic behind a product, not just the code.",
    },
    {
      title: "NestJS, Next.js & Node.js",
      body: "My working stack. At Simply Expanding I owned the backend for multiple applications: APIs, databases, real-time systems on Socket.IO, and the deployment behind them, working alongside a frontend developer. Today I build on Next.js and Postgres for the operations platform of a real estate franchise, from row-level security to CI/CD.",
    },
    {
      title: "DevOps",
      body: "I run my own bare-metal server, and everything I ship lives on it. Owning the box is how I learned what a deploy really costs, and why I keep it boring: containers, a reverse proxy, monitoring that pages me.",
      link: { href: "#devops", label: "See how I run things" },
    },
    {
      title: "Gaming tools",
      body: "Outside of work I build for gaming communities. Raidium is the most ambitious: ~225 API routes, 33 data models, multi-tenant data isolation, on-chain Kaia payment verification, OCR-verified attendance, a Discord bot, and an Android app, serving 6+ guilds. I also built GLiberator, a Discord bot I maintained for 5 years.",
    },
  ],

  mindset:
    "The best way to grow is to ship things and solve real problems. Every project I work on, whether a capstone, a work assignment, or a personal tool, is built with real users in mind. I focus on automation, workflow improvement, and software that makes other people's lives easier. If it can be automated, it should be automated.",

  devops:
    "One 8-core box with mirrored SSDs hosts everything I ship: Raidium, its OCR service, the Pickleball GenSan backend, and the monitoring behind them, deployed through Coolify from a git push with NGINX and Certbot in front.",

  civilServiceStory:
    "I took the Civil Service Professional exam during my on-the-job training with no time to study, and passed on the first attempt.",

  aiDisclaimer:
    "Some of these projects are built with LLM-assisted development. AI is a tool; the architecture, the decisions, and the shipped products are mine.",

  seoDescription:
    "Calvin Drakke I. Rulete (Drekyz), full stack developer from General Santos City who ships and runs whole products: Django, Next.js, NestJS, bare-metal DevOps.",

  /** Positioning only: Raidium and the Realty ONE work each get their own entry right below, so the figures live there. */
  resumeSummary:
    "Full stack developer who ships and runs whole products: schema, API, billing, infrastructure, and deploy, hosted on my own bare-metal server. I built a multi-tenant SaaS alone and lead merges on a team platform in production.",
} as const;

export type Copy = typeof copy;
