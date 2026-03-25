import type { Skill } from "@/types";

export const skills: Skill[] = [
  // Languages
  { name: "Python", category: "language" },
  { name: "JavaScript", category: "language" },
  { name: "TypeScript", category: "language" },
  { name: "SQL", category: "language" },
  { name: "C#", category: "language" },

  // Frameworks
  { name: "Django", category: "framework" },
  { name: "Next.js", category: "framework" },
  { name: "NestJS", category: "framework" },
  { name: "React Native / Expo", category: "framework" },
  { name: "Bootstrap", category: "framework" },
  { name: ".NET", category: "framework" },

  // Tools
  { name: "Git & GitHub", category: "tool" },
  { name: "Firebase", category: "tool" },
  { name: "Stripe", category: "tool" },
  { name: "Prisma", category: "tool" },
  { name: "Socket.IO", category: "tool" },
  { name: "Docker", category: "tool" },
  { name: "Coolify", category: "tool" },
  { name: "NGINX", category: "tool" },
  { name: "Certbot / SSL", category: "tool" },
  { name: "Claude Code", category: "tool" },

  // Databases
  { name: "PostgreSQL", category: "database" },
  { name: "MongoDB", category: "database" },
  { name: "Firebase RTDB", category: "database" },
  { name: "SQLite", category: "database" },
  { name: "Redis", category: "database" },

  // Other
  { name: "REST API Design", category: "other" },
  { name: "System Design", category: "other" },
  { name: "VPS & Linux Admin", category: "other" },
  { name: "SSH Hardening", category: "other" },
  { name: "Agile Development", category: "other" },
];
