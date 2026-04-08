export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  role: string;
  techStack: string[];
  features: string[];
  coverImage: string;
  showcaseImages?: string[];
  liveUrl?: string;
  repoUrl?: string;
  documentUrl?: string;
  date: string;
  category: "web" | "mobile" | "desktop" | "bot" | "tool" | "saas";
  collaborative?: boolean;
  collaborator?: string;
  collaboratorUrl?: string;
}

export interface Education {
  id: string;
  level: string;
  years: string;
  institution: string;
  description: string;
  achievements?: string[];
  images?: string[];
  logo?: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  responsibilities: string[];
  logo?: string;
}

export interface Skill {
  name: string;
  category: "language" | "framework" | "tool" | "database" | "other";
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  username: string;
}

export interface NavItem {
  label: string;
  href: string;
}
