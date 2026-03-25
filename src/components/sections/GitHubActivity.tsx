import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { useTheme } from "@/hooks/useTheme";

export function GitHubActivity() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="py-16 px-4">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div className="flex flex-col items-center gap-4 overflow-hidden">
            <a
              href="https://github.com/cdrakke"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-md"
            >
              <img
                src={`https://github-readme-stats.vercel.app/api?username=cdrakke&show_icons=true&theme=${isDark ? "github_dark" : "default"}&hide_border=true&bg_color=00000000`}
                alt="GitHub Stats"
                className="h-auto w-full rounded-lg"
                loading="lazy"
                decoding="async"
              />
            </a>
            {/* Profile summary — hidden on mobile, too wide */}
            <a
              href="https://github.com/cdrakke"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block w-full max-w-2xl"
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
