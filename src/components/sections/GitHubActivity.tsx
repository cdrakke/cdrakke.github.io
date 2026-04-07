import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { useTheme } from "@/hooks/useTheme";

export function GitHubActivity() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="py-16 px-4">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div className="flex flex-col items-center gap-6 overflow-hidden">
            {/* Row 1 — Contribution activity graph (centered) */}
            <a
              href="https://github.com/cdrakke"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-5xl"
            >
              <img
                src={`https://github-readme-activity-graph.vercel.app/graph?username=cdrakke&theme=${isDark ? "github-dark" : "github-light"}&hide_border=true&area=true&days=60`}
                alt="GitHub Contribution Activity (last 90 days)"
                className="h-auto w-full rounded-lg"
                loading="lazy"
                decoding="async"
              />
            </a>

            {/* Row 2 — Profile summary card */}
            <a
              href="https://github.com/cdrakke"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-5xl flex items-center"
            >
              <img
                src={`https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=cdrakke&theme=${isDark ? "aura_dark" : "default"}`}
                alt="GitHub Profile Summary"
                className="h-auto w-full rounded-lg"
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
