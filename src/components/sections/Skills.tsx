import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SkillBadge } from "@/components/shared/SkillBadge";
import { skills } from "@/data/skills";

const categories = [
  { key: "language" as const, label: "Languages" },
  { key: "framework" as const, label: "Frameworks" },
  { key: "tool" as const, label: "Tools" },
  { key: "database" as const, label: "Databases" },
  { key: "other" as const, label: "Other" },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 px-4 bg-muted/30">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeading
            title="Skills"
            subtitle="Technologies and tools I work with"
          />
        </AnimatedSection>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const categorySkills = skills.filter(
              (s) => s.category === cat.key
            );
            return (
              <AnimatedSection key={cat.key} delay={i * 0.08}>
                <div className="rounded-xl border border-border/50 bg-card p-5">
                  <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {cat.label}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <SkillBadge key={skill.name} skill={skill} />
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
