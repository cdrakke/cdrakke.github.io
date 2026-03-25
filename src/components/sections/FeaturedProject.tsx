import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

export function FeaturedProject() {
  const raidium = projects.find((p) => p.id === "raidium")!;

  return (
    <section id="projects" className="py-20 px-4 overflow-x-hidden">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeading
            title="Featured Project"
            subtitle="The one I'm most proud of"
          />
        </AnimatedSection>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          {/* Cover image with parallax */}
          <AnimatedSection direction="left">
            <div
              className="overflow-hidden rounded-xl border border-border/50 shadow-2xl shadow-primary/5"
            >
              <img
                src={raidium.coverImage}
                alt={raidium.title}
                className="w-full object-cover aspect-video"
              />
            </div>
          </AnimatedSection>

          {/* Details */}
          <AnimatedSection direction="right" delay={0.15}>
            <div>
              <Badge
                variant="secondary"
                className="mb-3 bg-primary/10 text-primary"
              >
                {raidium.category}
              </Badge>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {raidium.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {raidium.role} &middot; {raidium.date}
              </p>

              <p className="mt-4 text-foreground/85 leading-relaxed">
                A multi-tenant guild management SaaS serving{" "}
                <strong className="text-foreground">6+ guilds</strong> in
                LordNine. From red boss kill-time tracking and attendance
                verification to points economies and a full marketplace with
                auctions — Raidium is the backbone of how guilds organize.
                Monetized through{" "}
                <strong className="text-foreground">
                  KAIA blockchain USDt payments
                </strong>{" "}
                with a 5-tier modular subscription system ($3–$10/mo), featuring
                automatic on-chain transaction verification and zero payment
                processor fees.
              </p>

              <div className="mt-5 space-y-2">
                {[
                  "Red Boss Tracking — spawn scheduling, Discord reminders, kill logs",
                  "Attendance — screenshot verification via OCR, skip detection",
                  "Points Economy — weekly rankings, leaderboards, atomic transactions",
                  "Marketplace — listings + auction system with point reservation",
                  "Crypto Payments — KAIA USDt subscriptions with auto-scan verification",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {feature}
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {raidium.techStack.slice(0, 6).map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>

              {raidium.liveUrl && (
                <a
                  href={raidium.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "mt-6 gap-2"
                  )}
                >
                  Visit Raidium
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
