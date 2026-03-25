import { useRef, useLayoutEffect } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = lineRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.6,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div className={cn("mb-12 text-center", className)}>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">{title}</h2>
      <div
        ref={lineRef}
        className="mx-auto mt-3 h-px w-16 bg-primary"
        style={{ transformOrigin: "center" }}
      />
      {subtitle && <p className="mt-3 text-sm sm:text-base text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
