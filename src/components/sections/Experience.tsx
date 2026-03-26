import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TimelineItem } from "@/components/shared/TimelineItem";
import { experiences } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="mx-auto max-w-3xl">
        <AnimatedSection>
          <SectionHeading title="Experience" />
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div>
            {experiences.map((exp, i) => (
              <TimelineItem
                key={exp.id}
                title={exp.role}
                subtitle={exp.organization}
                period={exp.period}
                description={exp.description}
                items={exp.responsibilities}
                logo={exp.logo}
                isLast={i === experiences.length - 1}
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
