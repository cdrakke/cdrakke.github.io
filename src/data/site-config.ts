import type { NavItem } from "@/types";

export const siteConfig = {
  name: "Drekyz",
  fullName: "Calvin Drakke I. Rulete",
  title: "Backend Developer",
  description:
    "Backend-focused developer with hands-on experience building APIs, system architecture, and automation tools using Django, Next.js, and NestJS. Comfortable across the stack when needed, but my strength is in the logic, data, and infrastructure behind the product.",
  url: "https://cdrakke.github.io",
};

export const homeNavItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const aboutNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
];
