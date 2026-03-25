import { Badge } from "@/components/ui/badge";
import type { Skill } from "@/types";

interface SkillBadgeProps {
  skill: Skill;
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className="px-3 py-1.5 text-sm transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_15px_-3px] hover:shadow-primary/30"
    >
      {skill.name}
    </Badge>
  );
}
