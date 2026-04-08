import {
  useRef,
  useLayoutEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { ExternalLink, FileText, Users, X } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ImageCarousel } from "@/components/shared/ImageCarousel";
import { ImageLightbox } from "@/components/shared/ImageLightbox";
import { getLenis } from "@/hooks/useSmoothScroll";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

export interface ProjectDetailPanelHandle {
  collapse: () => Promise<void>;
}

interface ProjectDetailPanelProps {
  project: Project;
  onClose: () => void;
}

export const ProjectDetailPanel = forwardRef<
  ProjectDetailPanelHandle,
  ProjectDetailPanelProps
>(function ProjectDetailPanel({ project, onClose }, ref) {
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [coverLightbox, setCoverLightbox] = useState(false);
  const [coverError, setCoverError] = useState(false);

  useImperativeHandle(ref, () => ({
    collapse: () =>
      new Promise<void>((resolve) => {
        const panel = panelRef.current;
        const content = contentRef.current;

        const prefersReduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        if (!panel || !content || prefersReduced) {
          resolve();
          return;
        }

        const tl = gsap.timeline({ onComplete: resolve });

        // Phase 1: fade out inner content
        tl.to(content.children, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          stagger: 0.03,
          ease: "power3.in",
        });

        // Phase 2: collapse height
        tl.to(panel, {
          height: 0,
          duration: 0.35,
          ease: "power4.in",
        });
      }),
  }));

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const content = contentRef.current;
    if (!panel || !content) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    // Scroll so the panel's top edge lands ~15% down the viewport.
    const panelTop = panel.getBoundingClientRect().top + window.scrollY;
    const offset = window.innerHeight * 0.15;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(panelTop - offset, { duration: 1.2 });
    } else {
      window.scrollTo({ top: panelTop - offset, behavior: "smooth" });
    }

    const tl = gsap.timeline({ delay: 0.25 });

    // Phase 1: expand the container height
    tl.fromTo(
      panel,
      { height: 0 },
      { height: "auto", duration: 0.5, ease: "power4.out" }
    );

    // Phase 2: fade + slide inner content up (starts slightly before height finishes)
    tl.fromTo(
      content.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.06,
        ease: "power3.out",
      },
      "-=0.2"
    );

    return () => {
      tl.kill();
    };
  }, []);

  const showcaseImages =
    project.showcaseImages && project.showcaseImages.length > 0
      ? project.showcaseImages
      : null;

  const hasImages = !!(showcaseImages || (project.coverImage && !coverError));

  return (
    <div ref={panelRef} className="col-span-full overflow-hidden">
      <div
        ref={contentRef}
        className="relative rounded-xl border border-primary/20 bg-card p-6 shadow-lg"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Close details"
        >
          <X className="h-4 w-4" />
        </button>

        <div className={cn("grid gap-6", hasImages && "md:grid-cols-2")}>
          {/* Left — Text content */}
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-bold">{project.title}</h3>
              <Badge variant="secondary" className="text-xs">
                {project.category}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {project.role} &middot; {project.date}
            </p>

            {project.collaborative && (
              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>
                  Collaborative project
                  {project.collaborator && (
                    <>
                      {" with "}
                      {project.collaboratorUrl ? (
                        <a
                          href={project.collaboratorUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-4 hover:text-foreground"
                        >
                          {project.collaborator}
                        </a>
                      ) : (
                        project.collaborator
                      )}
                    </>
                  )}
                </span>
              </div>
            )}

            <Separator className="my-4" />

            <p className="text-sm leading-relaxed text-foreground/90">
              {project.description}
            </p>

            {/* Features */}
            <div className="mt-5">
              <h4 className="mb-2 text-sm font-semibold">Key Features</h4>
              <ul className="space-y-1.5">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="mt-5">
              <h4 className="mb-2 text-sm font-semibold">Tech Stack</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="mt-5 flex flex-wrap gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ size: "sm" }), "gap-2")}
                >
                  <ExternalLink className="h-4 w-4" />
                  Visit Site
                </a>
              )}
              {project.documentUrl && (
                <a
                  href={project.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "gap-2"
                  )}
                >
                  <FileText className="h-4 w-4" />
                  View Document
                </a>
              )}
            </div>
          </div>

          {/* Right — Image carousel or cover */}
          {showcaseImages ? (
            <div className="flex flex-col justify-center">
              <ImageCarousel images={showcaseImages} alt={project.title} />
            </div>
          ) : project.coverImage && !coverError ? (
            <div className="flex flex-col justify-center">
              <div
                className="overflow-hidden rounded-lg border cursor-pointer group/cover"
                onClick={(e) => {
                  e.stopPropagation();
                  setCoverLightbox(true);
                }}
              >
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full object-cover aspect-video transition-transform duration-300 group-hover/cover:scale-105"
                  loading="lazy"
                  decoding="async"
                  onError={() => setCoverError(true)}
                />
              </div>
              {coverLightbox && (
                <ImageLightbox
                  images={[project.coverImage]}
                  alt={project.title}
                  initialIndex={0}
                  onClose={() => setCoverLightbox(false)}
                />
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
});
