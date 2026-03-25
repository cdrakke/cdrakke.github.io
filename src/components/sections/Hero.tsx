import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { ArrowDown, Send } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { buttonVariants } from "@/components/ui/button";
import { ContourBackground } from "@/components/shared/ContourBackground";
import { useTypewriter } from "@/hooks/useTypewriter";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"drawing" | "name" | "reveal" | "done">("drawing");

  const { textRef, cursorRef } = useTypewriter({
    lines: [
      "I build systems that people actually use.",
      "Backend developer from General Santos City.",
      "Django was my first love. Next.js is my current one.",
      "Serving 6+ guilds on Raidium — and counting.",
      "I automate the boring stuff so you don't have to.",
      "If it can be a system, I'll build it.",
      "Shipped a capstone that cut workload by 80%.",
      "From Python scripts to SaaS platforms.",
      "I think in REST endpoints and database schemas.",
      "Crypto payments? Built that. On-chain verification and all.",
      "TypeScript by day, C# for fun.",
      "My Discord bot has been running for 5+ years.",
      "I deploy on Vercel, Render, and bare metal VPS.",
      "Backend-first. I collaborate on frontends when needed.",
      "Cum Laude. Best Capstone. Programmer of the Year.",
      "Fire safety DSS? 217 tests. All passing.",
      "Socket.IO, Redis, real-time everything.",
      "OCR-verified attendance. Screenshot or it didn't happen.",
      "I don't just write code — I ship products.",
      "Currently building the next thing.",
    ],
    typeSpeed: 35,
    deleteSpeed: 20,
  });

  // Phase timeline
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("name"), 1800),
      setTimeout(() => setPhase("reveal"), 2800),
      setTimeout(() => setPhase("done"), 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // GSAP for hero elements (avatar, subtitle, cta, scroll)
  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".hero-extras", { opacity: 0 });

      gsap.to(".hero-extras", {
        opacity: 1,
        duration: 0.6,
        delay: 3.0,
        ease: "power3.out",
      });

      gsap.to(".hero-scroll", {
        y: 8,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 4.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const showName = phase !== "drawing";
  const showLoader = phase !== "done";

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100dvh] items-center justify-center px-4 overflow-hidden"
    >
      {/* Loader backdrop — contours + solid bg */}
      {showLoader && (
        <div
          className={cn(
            "absolute inset-0 z-20 transition-opacity duration-500",
            phase === "reveal" ? "opacity-0" : "opacity-100"
          )}
        >
          <div className="absolute inset-0 bg-background" />
          <svg
            className="absolute inset-0 w-full h-full text-primary/[0.18]"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <style>{`
                .lc{fill:none;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-dasharray:1600;stroke-dashoffset:1600;animation:di 1.8s cubic-bezier(.25,1,.5,1) forwards}
                .lc2{animation-delay:.1s}.lc3{animation-delay:.2s}.lc4{animation-delay:.15s}
                .lc5{animation-delay:.25s}.lc6{animation-delay:.3s}.lc7{animation-delay:.35s}
                @keyframes di{to{stroke-dashoffset:0}}
              `}</style>
            </defs>
            <path className="lc" d="M-100,200 Q200,100 400,250 T800,180 T1200,300 T1600,200" />
            <path className="lc lc2" d="M-50,350 Q150,280 350,400 T750,320 T1150,450 T1550,350" />
            <path className="lc lc3" d="M-80,500 Q180,420 380,550 T780,470 T1180,580 T1580,500" />
            <path className="lc lc4" d="M-60,120 Q250,50 500,150 T900,80 T1300,180 T1700,100" opacity=".7" />
            <path className="lc lc5" d="M-40,650 Q200,580 450,680 T850,600 T1250,720 T1650,640" opacity=".5" />
            <path className="lc lc6" d="M100,280 Q300,220 500,310 T800,250 T1100,340" opacity=".6" />
            <path className="lc lc7" d="M50,450 Q250,380 450,470 T750,400 T1050,490" opacity=".4" />
            <ellipse className="lc lc2" cx="85%" cy="15%" rx="120" ry="80" opacity=".5" />
            <ellipse className="lc lc4" cx="85%" cy="15%" rx="180" ry="120" opacity=".35" />
            <ellipse className="lc lc6" cx="85%" cy="15%" rx="250" ry="170" opacity=".2" />
            <ellipse className="lc lc3" cx="10%" cy="80%" rx="100" ry="70" opacity=".5" />
            <ellipse className="lc lc5" cx="10%" cy="80%" rx="160" ry="110" opacity=".35" />
            <ellipse className="lc lc7" cx="10%" cy="80%" rx="230" ry="160" opacity=".2" />
          </svg>
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

        {/* THE one Drekyz — always here, fades in during loader, stays */}
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

      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2">
        <ArrowDown className="h-5 w-5 text-muted-foreground/50" />
      </div>
    </section>
  );
}
