import { Badge } from "@/components/ui/badge";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTilt } from "@/hooks/useTilt";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const categoryColors: Record<string, string> = {
  saas: "bg-primary/10 text-primary",
  web: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  mobile: "bg-green-500/10 text-green-600 dark:text-green-400",
  desktop: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  bot: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  tool: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { tiltStyle, spotlightStyle, handlers } = useTilt(8);

  return (
    <div
      className="group cursor-pointer"
      style={tiltStyle}
      onClick={onClick}
      {...handlers}
    >
      <div className="relative overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-primary/10 group-hover:border-primary/20">
        {/* Spotlight overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-xl"
          style={spotlightStyle}
        />

        <div className="relative aspect-video overflow-hidden bg-muted flex items-center justify-center">
          <img
            src={project.coverImage}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <span className="absolute text-4xl font-bold text-muted-foreground/20 select-none">
            {project.title[0]}
          </span>
          {/* Image gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
    </div>
  );
}
