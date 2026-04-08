import { useState, useRef, useLayoutEffect, useEffect, useCallback, type ReactNode } from "react";
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
import {
  ProjectDetailPanel,
  type ProjectDetailPanelHandle,
} from "@/components/shared/ProjectDetailPanel";
import { useGridColumns } from "@/hooks/useGridColumns";
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
  isExpanded,
  onClick,
}: {
  project: Project;
  isExpanded: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={cn(
        "group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1",
        isExpanded
          ? "border-primary/30 shadow-md shadow-primary/10"
          : "border-border hover:border-primary/20"
      )}
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
        <span className="absolute text-4xl font-bold text-muted-foreground/20 select-none">
          {project.title[0]}
        </span>
      </div>
      <CardHeader className="pt-4 pb-2">
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
      <CardContent className="flex flex-1 flex-col pb-5">
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
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<ProjectDetailPanelHandle>(null);
  const columns = useGridColumns(gridRef);

  const otherProjects = projects.filter(
    (p) => !FEATURED_IDS.includes(p.id)
  );

  const expandedIndex = expandedId
    ? otherProjects.findIndex((p) => p.id === expandedId)
    : -1;

  const handleCardClick = useCallback(
    async (projectId: string) => {
      if (isAnimating) return;

      if (expandedId === projectId) {
        // Collapse current
        setIsAnimating(true);
        await panelRef.current?.collapse();
        setExpandedId(null);
        setIsAnimating(false);
      } else if (expandedId) {
        // Switch: collapse current, then open new
        setIsAnimating(true);
        await panelRef.current?.collapse();
        setExpandedId(projectId);
        setIsAnimating(false);
      } else {
        // Open new
        setExpandedId(projectId);
      }
    },
    [expandedId, isAnimating]
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
        el.querySelectorAll("[data-grid-card]"),
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

  // Build flat children with detail panel injected after the correct row
  const gridChildren: ReactNode[] = [];
  const insertAfterIndex =
    expandedIndex >= 0
      ? Math.min(
          Math.ceil((expandedIndex + 1) / columns) * columns - 1,
          otherProjects.length - 1
        )
      : -1;

  let panelInserted = false;
  for (let i = 0; i < otherProjects.length; i++) {
    const project = otherProjects[i];
    gridChildren.push(
      <div key={project.id} data-grid-card className="h-full">
        <CompactProjectCard
          project={project}
          isExpanded={expandedId === project.id}
          onClick={() => handleCardClick(project.id)}
        />
      </div>
    );

    if (i === insertAfterIndex && expandedId && !panelInserted) {
      const expandedProject = otherProjects[expandedIndex];
      panelInserted = true;
      gridChildren.push(
        <ProjectDetailPanel
          key={`detail-${expandedId}`}
          ref={panelRef}
          project={expandedProject}
          onClose={() => handleCardClick(expandedId)}
        />
      );
    }
  }

  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeading title="Other Notable Projects" />
        </AnimatedSection>

        <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gridChildren}
        </div>
      </div>
    </section>
  );
}
