import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { Badge } from "@/components/ui/badge";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectDialog } from "@/components/shared/ProjectDialog";
import { projects } from "@/data/projects";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

const FEATURED_IDS = ["raidium", "alertison", "pickleball"];

const categoryColors: Record<string, string> = {
  saas: "bg-primary/10 text-primary",
  web: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  mobile: "bg-green-500/10 text-green-600 dark:text-green-400",
  desktop: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  bot: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  tool: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

function CompactProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <div
      className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20"
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden bg-muted flex items-center justify-center">
        <img
          src={project.coverImage}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        {/* Fallback letter — always rendered behind the image */}
        <span className="absolute text-4xl font-bold text-muted-foreground/20 select-none">
          {project.title[0]}
        </span>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-lg">{project.title}</CardTitle>
          <Badge
            variant="secondary"
            className={cn(
              "shrink-0 text-xs",
              categoryColors[project.category]
            )}
          >
            {project.category}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">{project.role}</p>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-2">
          {project.summary}
        </CardDescription>
        <div className="mt-3 flex flex-wrap gap-1">
          {project.techStack.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.techStack.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{project.techStack.length - 4}
            </Badge>
          )}
        </div>
      </CardContent>
    </div>
  );
}

export function OtherProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const otherProjects = projects.filter(
    (p) => !FEATURED_IDS.includes(p.id)
  );

  // Preload images on mount so they're cached before scroll
  useEffect(() => {
    otherProjects.forEach((p) => {
      const img = new Image();
      img.src = p.coverImage;
    });
  }, [otherProjects]);

  useLayoutEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeading title="Other Notable Projects" />
        </AnimatedSection>

        <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((project) => (
            <div key={project.id}>
              <CompactProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>

        <ProjectDialog
          project={selectedProject}
          open={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
