import { useRef, useLayoutEffect, useState, useEffect, useCallback } from "react";
import { ArrowDown, Send } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { buttonVariants } from "@/components/ui/button";
import { ContourBackground } from "@/components/shared/ContourBackground";
import { TerminalIntro } from "@/components/shared/TerminalIntro";
import { useTypewriter } from "@/hooks/useTypewriter";
import { getLenis } from "@/hooks/useSmoothScroll";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";
import { hasIntroPlayed, markIntroPlayed } from "@/lib/intro-state";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"terminal" | "name" | "reveal" | "done">(
    hasIntroPlayed() ? "done" : "terminal"
  );

  const { textRef, cursorRef } = useTypewriter({
    lines: [
      "I build systems that people actually use.",
      "Backend developer from General Santos City.",
      "Serving 6+ guilds on Raidium — and counting.",
      "I automate the boring stuff so you don't have to.",
      "If it can be a system, I'll build it.",
      "Shipped a capstone that cut workload by 80%.",
      "From Python scripts to SaaS platforms.",
      "Crypto payments? Built that. On-chain verification and all.",
      "TypeScript by day, C# for fun.",
      "I deploy on Vercel, Render, and bare metal VPS.",
      "Backend-first. I collaborate on frontends when needed.",
      "Cum Laude. Best Capstone. Programmer of the Year.",
      "Socket.IO, Redis, real-time everything.",
      "OCR-verified attendance. Screenshot or it didn't happen.",
      "I don't just write code — I ship products.",
      "Currently building the next thing.",
      "Always learning, always building, always improving.",
      "Let's connect and build something amazing together.",
      "I don't just build for today — I build for the future.",
      "Driven by curiosity, fueled by soda, and obsessed with quality.",
      "If it can be automated, it should be automated. That's my motto.",
      "I turn ideas into reality, one line of code at a time.",
      "From concept to deployment, I handle it all — because I love building things that work.",
      "I don't just write code — I create solutions that make a difference."
    ],
    typeSpeed: 35,
    deleteSpeed: 20,
  });

  // Scroll to top, block scrolling, hide UI until loading finishes
  useEffect(() => {
    if (phase === "done") {
      // Reveal navbar and music player via CSS transition
      document.documentElement.classList.remove("intro-playing");
      document.documentElement.classList.add("intro-done");
      return;
    }

    // Force scroll to top before locking
    window.scrollTo(0, 0);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      lenis.stop();
    }

    return () => {
      lenis?.start();
    };
  }, [phase]);

  // Terminal complete → start name/reveal/done sequence
  const handleTerminalComplete = useCallback(() => {
    setPhase("name");
    setTimeout(() => setPhase("reveal"), 700);
    setTimeout(() => {
      setPhase("done");
      markIntroPlayed();
    }, 1200);
  }, []);

  // GSAP for hero elements (avatar, subtitle, cta, scroll)
  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".hero-extras", { opacity: 0 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Fade in hero extras once done
  useEffect(() => {
    if (phase !== "done" || !containerRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.to(".hero-extras", {
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.to(".hero-scroll", {
        y: 8,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [phase]);

  const showName = phase !== "terminal";
  const showLoader = phase !== "done";

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100dvh] items-center justify-center px-4 overflow-hidden"
    >
      {/* Loader backdrop — terminal animation (z-[60] to cover navbar) */}
      {showLoader && (
        <div
          className={cn(
            "fixed inset-0 z-[60] transition-opacity duration-500",
            phase === "reveal" ? "opacity-0" : "opacity-100"
          )}
        >
          <div className="absolute inset-0 bg-background" />
          <div
            className={cn(
              "relative z-10 w-full h-full transition-opacity duration-500",
              phase === "terminal" ? "opacity-100" : "opacity-0"
            )}
          >
            <TerminalIntro onComplete={handleTerminalComplete} />
          </div>
        </div>
      )}

      <ContourBackground />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/[0.06] via-transparent to-transparent" />

      <div className="relative z-30 mx-auto max-w-3xl text-center">
        {/* These fade in after loader dissolves */}
        <div className="hero-extras">
          <img
            src="/images/avatar.png"
            alt={siteConfig.fullName}
            className="avatar-glow mx-auto mb-6 h-28 w-28 rounded-full border-2 border-primary/30 object-cover"
          />
        </div>

        {/* THE one Drekyz — fades in after terminal, stays */}
        <h1
          className={cn(
            "text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl transition-all duration-700",
            showName ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
        >
          {siteConfig.name}
        </h1>

        <div className="hero-extras">
          <p className="mt-2 text-sm sm:text-base md:text-lg text-muted-foreground">
            {siteConfig.fullName} &mdash; {siteConfig.title}
          </p>

          <div className="mx-auto mt-4 max-w-xl">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/80 font-mono">
              <span ref={textRef} />
              <span
                ref={cursorRef}
                className="inline-block w-[2px] h-5 bg-primary ml-0.5 align-middle opacity-100"
              />
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#projects"
              className={cn(buttonVariants({ size: "lg" }), "gap-2")}
            >
              View Projects
              <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2"
              )}
            >
              Contact Me
              <Send className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-16 left-1/2 -translate-x-1/2">
        <ArrowDown className="h-5 w-5 text-muted-foreground/50" />
      </div>
    </section>
  );
}
