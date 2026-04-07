import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { ArrowDown, Download, Send } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { buttonVariants } from "@/components/ui/button";
import { ContourBackground } from "@/components/shared/ContourBackground";
import { useTypewriter } from "@/hooks/useTypewriter";
import { getLenis } from "@/hooks/useSmoothScroll";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";
import { hasIntroPlayed, markIntroPlayed } from "@/lib/intro-state";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"drawing" | "name" | "reveal" | "done">(
    hasIntroPlayed() ? "done" : "drawing"
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

  // Mount-time scroll lock for the intro sequence.
  // Empty deps so this fires once and cleans up on unmount — no repeated
  // stop/start cycles on every phase transition.
  useEffect(() => {
    if (hasIntroPlayed()) return;

    window.scrollTo(0, 0);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      lenis.stop();
    }

    return () => {
      // Re-fetch in cleanup so a stale closure can't act on a destroyed instance.
      getLenis()?.start();
    };
  }, []);

  // Class coordination — fires once when the intro completes, swapping the
  // intro-playing class for intro-done so the navbar/music player CSS
  // transitions reveal them. Also unlocks Lenis as a belt-and-suspenders
  // safety in case the mount-time cleanup hasn't run yet.
  useEffect(() => {
    if (phase !== "done") return;
    document.documentElement.classList.remove("intro-playing");
    document.documentElement.classList.add("intro-done");
    getLenis()?.start();
  }, [phase]);

  // Phase timeline — drives the contour-loader transition.
  // Empty deps so the timer chain runs once on mount and is NOT cancelled
  // when intermediate phase changes trigger this effect's cleanup.
  useEffect(() => {
    if (hasIntroPlayed()) return;
    const timers = [
      setTimeout(() => setPhase("name"), 1500),
      setTimeout(() => setPhase("reveal"), 2200),
      setTimeout(() => {
        setPhase("done");
        markIntroPlayed();
      }, 2900),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // GSAP timeline for hero extras + scroll indicator. Single useLayoutEffect
  // with empty deps means ctx.revert() only runs on unmount, not on every
  // phase change — so the fade-in persists instead of being undone.
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const introWasSkipped = hasIntroPlayed();

    const ctx = gsap.context(() => {
      if (introWasSkipped || prefersReduced) {
        // Snap visible immediately — no intro to wait for.
        gsap.set(".hero-extras", { opacity: 1 });
      } else {
        // Hidden until the loader starts fading out.
        gsap.set(".hero-extras", { opacity: 0 });
        // Fade-in is timed to overlap with phase=reveal (loader fade-out
        // begins at 2.2s) so the handoff is continuous, not sequential.
        gsap.to(".hero-extras", {
          opacity: 1,
          duration: 0.6,
          delay: 2.2,
          ease: "power3.out",
        });
      }

      // Scroll-arrow bobbing — start after the intro completes
      // (or immediately if there is no intro).
      gsap.to(".hero-scroll", {
        y: 8,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: introWasSkipped || prefersReduced ? 0.3 : 3.0,
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
      {/* Loader backdrop — contour drawing animation. z-20 sits BELOW the
          hero content (z-30) so the "Drekyz" h1 can fade in on top of the
          still-drawing contours. Navbar/music/footer are hidden via the
          `intro-playing` CSS class, so we don't need z-60 to cover them. */}
      {showLoader && (
        <div
          className={cn(
            "fixed inset-0 z-20 transition-opacity duration-500",
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

        {/* THE one Drekyz — fades in after loader, stays */}
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
              href="/resume/Calvin_Drakke_Rulete_Resume.pdf"
              download
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2"
              )}
            >
              Download CV
              <Download className="h-4 w-4" />
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
