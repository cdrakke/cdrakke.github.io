import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Every fact the site shows lives in src/content/*.json.
 * The pages, the resume, and the OG image all read these collections,
 * so nothing can drift between them again.
 */

const figure = z.object({
  label: z.string(),
  value: z.string(),
});

const collaborator = z.object({
  name: z.string(),
  url: z.string().url().optional(),
});

const projects = defineCollection({
  loader: file("./src/content/projects.json"),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      title: z.string(),
      kind: z.enum(["saas", "web", "mobile", "desktop", "bot", "tool", "infra"]),
      /** Sort key: newest first. */
      year: z.number().int(),
      period: z.string(),
      status: z.enum([
        "live",
        "in-service",
        "in-development",
        "handed-off",
        "delivered",
        "paused",
        "retired",
      ]),
      role: z.string(),
      /** True when Calvin no longer works on the project (it may still be live under others). */
      former: z.boolean().default(false),
      summary: z.string(),
      description: z.string(),
      features: z.array(z.string()).default([]),
      tech: z.array(z.string()).default([]),
      /** Only real, sourced numbers (see PRODUCT.md). */
      figures: z.array(figure).default([]),
      cover: image().optional(),
      screenshots: z.array(image()).default([]),
      liveUrl: z.string().url().optional(),
      /** Public source repository, shown as a "Source on GitHub" action. */
      repoUrl: z.string().url().optional(),
      documentUrl: z.string().optional(),
      /** People the entry was built with, in credit order. */
      collaborators: z.array(collaborator).default([]),
      /** True for work that must stay unnamed (no product name, URL, or images). */
      generic: z.boolean().default(false),
      /** Lower comes first among featured entries; undefined = not featured. */
      featured: z.number().int().optional(),
    }),
});

const experience = defineCollection({
  loader: file("./src/content/experience.json"),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      role: z.string(),
      organization: z.string(),
      location: z.string(),
      period: z.string(),
      /** ISO month, e.g. "2026-05". */
      start: z.string(),
      /** ISO month or null when current. */
      end: z.string().nullable(),
      description: z.string(),
      responsibilities: z.array(z.string()).default([]),
      tech: z.array(z.string()).default([]),
      logo: image().optional(),
    }),
});

const education = defineCollection({
  loader: file("./src/content/education.json"),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      level: z.string(),
      institution: z.string(),
      years: z.string(),
      description: z.string(),
      achievements: z.array(z.string()).default([]),
      logo: image().optional(),
      images: z.array(image()).default([]),
    }),
});

const certificates = defineCollection({
  loader: file("./src/content/certificates.json"),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      title: z.string(),
      issuer: z.string(),
      date: z.string(),
      /** What the framed certificate shows instead of a score, e.g. "PASSED". */
      display: z.string(),
      note: z.string().optional(),
      image: image().optional(),
    }),
});

const skills = defineCollection({
  loader: file("./src/content/skills.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    category: z.enum(["language", "framework", "tool", "database", "other"]),
  }),
});

const socials = defineCollection({
  loader: file("./src/content/socials.json"),
  schema: z.object({
    id: z.string(),
    platform: z.string(),
    url: z.string(),
    username: z.string(),
  }),
});

export const collections = {
  projects,
  experience,
  education,
  certificates,
  skills,
  socials,
};
