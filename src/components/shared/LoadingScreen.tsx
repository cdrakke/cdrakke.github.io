import { useState, useEffect, type ReactNode } from "react";

interface LoadingScreenProps {
  children: ReactNode;
}

export function LoadingScreen({ children }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"drawing" | "name" | "fading" | "done">(
    "drawing"
  );

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("name"), 1800),
      setTimeout(() => setPhase("fading"), 2800),
      setTimeout(() => setPhase("done"), 3300),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      {/* Site always rendered underneath */}
      {children}

      {/* Full loader overlay — fades out entirely */}
      {phase !== "done" && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ${
            phase === "fading" ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="absolute inset-0 bg-background" />

          <svg
            className="absolute inset-0 w-full h-full text-primary/[0.18]"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <style>{`
                .loader-contour {
                  fill: none;
                  stroke: currentColor;
                  stroke-width: 1.5;
                  stroke-linecap: round;
                  stroke-dasharray: 1600;
                  stroke-dashoffset: 1600;
                  animation: draw-in 1.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                }
                .lc2 { animation-delay: 0.1s; }
                .lc3 { animation-delay: 0.2s; }
                .lc4 { animation-delay: 0.15s; }
                .lc5 { animation-delay: 0.25s; }
                .lc6 { animation-delay: 0.3s; }
                .lc7 { animation-delay: 0.35s; }
                .lc8 { animation-delay: 0.1s; }
                .lc9 { animation-delay: 0.2s; }
                .lc10 { animation-delay: 0.3s; }
                .lc11 { animation-delay: 0.15s; }
                .lc12 { animation-delay: 0.25s; }
                .lc13 { animation-delay: 0.35s; }
                @keyframes draw-in {
                  to { stroke-dashoffset: 0; }
                }
              `}</style>
            </defs>

            <path className="loader-contour" d="M-100,200 Q200,100 400,250 T800,180 T1200,300 T1600,200" />
            <path className="loader-contour lc2" d="M-50,350 Q150,280 350,400 T750,320 T1150,450 T1550,350" />
            <path className="loader-contour lc3" d="M-80,500 Q180,420 380,550 T780,470 T1180,580 T1580,500" />
            <path className="loader-contour lc4" d="M-60,120 Q250,50 500,150 T900,80 T1300,180 T1700,100" opacity="0.7" />
            <path className="loader-contour lc5" d="M-40,650 Q200,580 450,680 T850,600 T1250,720 T1650,640" opacity="0.5" />
            <path className="loader-contour lc6" d="M100,280 Q300,220 500,310 T800,250 T1100,340" opacity="0.6" />
            <path className="loader-contour lc7" d="M50,450 Q250,380 450,470 T750,400 T1050,490" opacity="0.4" />
            <ellipse className="loader-contour lc8" cx="85%" cy="15%" rx="120" ry="80" opacity="0.5" />
            <ellipse className="loader-contour lc9" cx="85%" cy="15%" rx="180" ry="120" opacity="0.35" />
            <ellipse className="loader-contour lc10" cx="85%" cy="15%" rx="250" ry="170" opacity="0.2" />
            <ellipse className="loader-contour lc11" cx="10%" cy="80%" rx="100" ry="70" opacity="0.5" />
            <ellipse className="loader-contour lc12" cx="10%" cy="80%" rx="160" ry="110" opacity="0.35" />
            <ellipse className="loader-contour lc13" cx="10%" cy="80%" rx="230" ry="160" opacity="0.2" />
          </svg>

          <span
            className={`relative z-10 mt-20 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground transition-all duration-700 ${
              phase === "name" || phase === "fading"
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
          >
            Drekyz
          </span>
        </div>
      )}
    </>
  );
}
