import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { useTilt } from "@/hooks/useTilt";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

function SubFeaturedCard({ project }: { project: Project }) {
  const { tiltStyle, spotlightStyle, handlers } = useTilt(6);

  return (
    <div style={tiltStyle} {...handlers} className="group">
      <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-primary/10 group-hover:border-primary/20">
        {/* Spotlight */}
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-xl"
          style={spotlightStyle}
        />

        <div className="relative aspect-video overflow-hidden">
          <img
            src={project.coverImage}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-card/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <Badge
              variant="secondary"
              className="mb-2 bg-primary/10 text-primary text-xs"
            >
              {project.category}
            </Badge>
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {project.role}
            </p>
          </div>
        </div>

        <div className="p-4">
          <p className="text-sm text-foreground/80 line-clamp-3">
            {project.summary}
          </p>
          <div className="mt-3 flex flex-wrap gap-1">
            {project.techStack.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "mt-4 gap-2 w-full justify-center"
              )}
            >
              Visit Site
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function SubFeaturedProjects() {
  const alertison = projects.find((p) => p.id === "alertison")!;
  const pickleball = projects.find((p) => p.id === "pickleball")!;

  return (
    <section className="py-16 px-4 bg-muted/30 overflow-x-hidden">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-6 md:grid-cols-2">
          <AnimatedSection direction="left" delay={0}>
            <SubFeaturedCard project={alertison} />
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.1}>
            <SubFeaturedCard project={pickleball} />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
