import { ExternalLink, FileText, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectDialogProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

export function ProjectDialog({ project, open, onClose }: ProjectDialogProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0">
        <div className="overflow-y-auto max-h-[85vh] p-6">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <DialogTitle className="text-2xl">
                {project.title}
              </DialogTitle>
              <Badge variant="secondary" className="text-xs">
                {project.category}
              </Badge>
            </div>
            <DialogDescription className="text-sm">
              {project.role} &middot; {project.date}
            </DialogDescription>
          </DialogHeader>

          {project.collaborative && (
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>
                Collaborative project
                {project.collaborator &&
                  ` with ${project.collaborator}`}
              </span>
            </div>
          )}

          <Separator className="my-4" />

          <p className="text-sm leading-relaxed text-foreground/90">
            {project.description}
          </p>

          {/* Features */}
          <div className="mt-6">
            <h4 className="mb-3 text-sm font-semibold">Key Features</h4>
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
          <div className="mt-6">
            <h4 className="mb-3 text-sm font-semibold">Tech Stack</h4>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Showcase Images */}
          {project.showcaseImages && project.showcaseImages.length > 0 && (
            <div className="mt-6">
              <h4 className="mb-3 text-sm font-semibold">Screenshots</h4>
              <div className="grid gap-3">
                {project.showcaseImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-full rounded-lg border"
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="mt-6 flex flex-wrap gap-2">
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
      </DialogContent>
    </Dialog>
  );
}
