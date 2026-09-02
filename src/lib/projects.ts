import { getCollection, type CollectionEntry } from "astro:content";

export type Project = CollectionEntry<"projects">;
export type ProjectData = Project["data"];
export type Status = ProjectData["status"];
export type Kind = ProjectData["kind"];

export const statusLabel: Record<Status, string> = {
  live: "live",
  "in-service": "in service",
  "in-development": "in development",
  "handed-off": "handed off",
  delivered: "delivered",
  paused: "paused",
  retired: "retired",
};

export const statusTone: Record<Status, "mint" | "sky" | "butter" | "peach" | "field" | "white"> = {
  live: "mint",
  "in-service": "mint",
  "in-development": "sky",
  "handed-off": "field",
  delivered: "butter",
  paused: "peach",
  retired: "field",
};

/** Shown beside the status when Calvin is no longer on the project. */
export const formerLabel = "no longer active";

export const kindLabel: Record<Kind, string> = {
  saas: "SaaS",
  web: "web",
  mobile: "mobile",
  desktop: "desktop",
  bot: "Discord bot",
  tool: "tool",
  infra: "infrastructure",
};

/** "API routes", "commits": the label with its first word lowercased unless it is an acronym. */
export function figureLabel(f: { label: string }): string {
  return /^[A-Z]{2}/.test(f.label) ? f.label : f.label.charAt(0).toLowerCase() + f.label.slice(1);
}

/** "225 API routes", "9 RBAC roles". */
export function figureText(f: { value: string; label: string }): string {
  return `${f.value} ${figureLabel(f)}`;
}

/** Newest first; ties broken by featured order, then title. */
export async function allProjects(): Promise<Project[]> {
  const list = await getCollection("projects");
  return list.sort((a, b) => {
    if (b.data.year !== a.data.year) return b.data.year - a.data.year;
    const fa = a.data.featured ?? 99;
    const fb = b.data.featured ?? 99;
    if (fa !== fb) return fa - fb;
    return a.data.title.localeCompare(b.data.title);
  });
}

export async function featuredProjects(): Promise<Project[]> {
  const list = await getCollection("projects", (p) => p.data.featured !== undefined);
  return list.sort((a, b) => (a.data.featured ?? 99) - (b.data.featured ?? 99));
}

/** The year-pill colour cycles so the diary reads as a stack of stickers, not a table. */
export const yearTones = ["butter", "sky", "field", "mint", "peach"] as const;
export const yearTone = (i: number) => yearTones[i % yearTones.length];
