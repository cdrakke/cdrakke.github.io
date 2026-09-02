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
});
