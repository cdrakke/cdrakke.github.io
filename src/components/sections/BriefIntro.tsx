import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const topSkills = [
  "Python",
  "TypeScript",
  "Django",
  "Next.js",
  "NestJS",
  "React Native",
  "PostgreSQL",
  "MongoDB",
];

export function BriefIntro() {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-3xl text-center">
        <AnimatedSection>
          <p className="text-base sm:text-lg leading-relaxed text-foreground/85">
            I'm a backend-focused developer from General Santos City, Philippines.
            I build the APIs, business logic, and infrastructure behind
            production systems — from SaaS platforms managing MMORPG guilds
            to family safety apps and fire safety decision engines.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {topSkills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="px-3 py-1.5 text-sm transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_15px_-3px] hover:shadow-primary/30"
              >
                {skill}
              </Badge>
            ))}
          </div>
          <Link
            to="/about"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Learn more about me
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
