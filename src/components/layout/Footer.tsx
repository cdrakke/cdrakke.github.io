import { GithubIcon, TwitterIcon } from "@/components/shared/Icons";
import { siteConfig } from "@/data/site-config";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.fullName}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/cdrakke"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/CDrakke"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Twitter"
            >
              <TwitterIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground/60">
          Some of these projects are built with LLM-assisted development. AI is a tool — the architecture, decisions, and shipped products are mine.
        </p>
      </div>
    </footer>
  );
}
