// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://cdrakke.github.io",
  output: "static",
  trailingSlash: "ignore",
  // Explicit so `astro:prefetch` can be imported (the room prefetches its links by hand, see Room.astro);
  // these are the values the ClientRouter would otherwise set on its own.
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith("/og/") && !page.endsWith("/resume/"),
    }),
  ],
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Fredoka",
      cssVariable: "--font-display",
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["Trebuchet MS", "Verdana", "sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Nunito",
      cssVariable: "--font-body",
      weights: [600, 700, 800, 900],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
    },
  ],
  image: {
    responsiveStyles: true,
  },
  build: {
    inlineStylesheets: "auto",
  },
  vite: {
    build: {
      // Each page's own stylesheet rides inside its HTML, which is what the room prefetches, so the first click
      // to a page never waits on a stylesheet request during the ClientRouter's preparation. Only the layout's
      // shared sheet (Base.*.css, on every page and cached after the first) stays external, so the rule cannot
      // silently regress as a page's styles grow. Non-CSS assets keep Vite's default limit.
      assetsInlineLimit: (file) => (file.endsWith(".css") ? !/(^|\/)Base\.[^/]+\.css$/.test(file) : undefined),
    },
  },
});
