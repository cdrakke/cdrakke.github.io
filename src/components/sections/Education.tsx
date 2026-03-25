import { Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TimelineItem } from "@/components/shared/TimelineItem";
import { education, certifications } from "@/data/education";

export function Education() {
  return (
    <section id="education" className="py-20 px-4">
      <div className="mx-auto max-w-3xl">
        <AnimatedSection>
          <SectionHeading title="Education" />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div>
            {education.map((edu, i) => (
              <TimelineItem
                key={edu.id}
                title={edu.level}
                subtitle={edu.institution}
                period={edu.years}
                description={edu.description}
                items={edu.achievements}
                isLast={i === education.length - 1}
              />
            ))}
          </div>
        </AnimatedSection>

        {/* Awards & Certifications */}
        <AnimatedSection delay={0.2}>
          <div className="mt-8 rounded-xl border border-border/50 bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Awards & Certifications</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <Badge
                  key={cert.title}
                  variant="secondary"
                  className="px-3 py-1.5 text-sm"
                >
                  {cert.title}
                  {cert.detail && (
                    <span className="ml-1 text-muted-foreground">
                      ({cert.detail})
                    </span>
                  )}
                </Badge>
              ))}
              <Badge variant="secondary" className="px-3 py-1.5 text-sm">
                Cum Laude Graduate
              </Badge>
              <Badge variant="secondary" className="px-3 py-1.5 text-sm">
                Best Capstone Project Awardee
              </Badge>
              <Badge variant="secondary" className="px-3 py-1.5 text-sm">
                Programmer of the Year Awardee
              </Badge>
            </div>

            {/* Achievement Images */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <AnimatedSection delay={0.3}>
                <div className="overflow-hidden rounded-lg border border-border/50">
                  <img
                    src="/images/education/medals.png"
                    alt="Graduation medals and awards"
                    className="w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </AnimatedSection>
              <div className="space-y-4">
                <AnimatedSection delay={0.35}>
                  <div className="overflow-hidden rounded-lg border border-border/50">
                    <img
                      src="/images/education/outstanding-capstone-project.jpg"
                      alt="Outstanding Capstone Project Award"
                      className="w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </AnimatedSection>
                <AnimatedSection delay={0.4}>
                  <div className="overflow-hidden rounded-lg border border-border/50">
                    <img
                      src="/images/education/cse-result.png"
                      alt="Civil Service Exam Result - 82.4 Rating"
                      className="w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
