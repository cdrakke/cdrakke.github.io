import { memo } from "react";

export const ContourBackground = memo(function ContourBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full text-primary/[0.14]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>{`
            .contour {
              fill: none;
              stroke: currentColor;
              stroke-width: 1.5;
              stroke-linecap: round;
            }
            .c1 { stroke-dasharray: 800; animation: dash 25s linear infinite; }
            .c2 { stroke-dasharray: 600; animation: dash 30s linear infinite reverse; }
            .c3 { stroke-dasharray: 700; animation: dash 35s linear infinite; }
            .c4 { stroke-dasharray: 500; animation: dash 20s linear infinite reverse; }
            .c5 { stroke-dasharray: 900; animation: dash 40s linear infinite; }
            .c6 { stroke-dasharray: 650; animation: dash 28s linear infinite reverse; }
            .c7 { stroke-dasharray: 750; animation: dash 33s linear infinite; }
            @keyframes dash {
              to { stroke-dashoffset: -1600; }
            }
          `}</style>
        </defs>

        {/* Layer 1 - Large sweeping curves */}
        <path className="contour c1" d="M-100,200 Q200,100 400,250 T800,180 T1200,300 T1600,200" />
        <path className="contour c2" d="M-50,350 Q150,280 350,400 T750,320 T1150,450 T1550,350" />
        <path className="contour c3" d="M-80,500 Q180,420 380,550 T780,470 T1180,580 T1580,500" />

        {/* Layer 2 - Mid curves */}
        <path className="contour c4" d="M-60,120 Q250,50 500,150 T900,80 T1300,180 T1700,100" opacity="0.7" />
        <path className="contour c5" d="M-40,650 Q200,580 450,680 T850,600 T1250,720 T1650,640" opacity="0.5" />

        {/* Layer 3 - Tighter contours */}
        <path className="contour c6" d="M100,280 Q300,220 500,310 T800,250 T1100,340" opacity="0.6" />
        <path className="contour c7" d="M50,450 Q250,380 450,470 T750,400 T1050,490" opacity="0.4" />

        {/* Concentric ring cluster - top right */}
        <ellipse className="contour c2" cx="85%" cy="15%" rx="120" ry="80" opacity="0.5" />
        <ellipse className="contour c4" cx="85%" cy="15%" rx="180" ry="120" opacity="0.35" />
        <ellipse className="contour c6" cx="85%" cy="15%" rx="250" ry="170" opacity="0.2" />

        {/* Concentric ring cluster - bottom left */}
        <ellipse className="contour c3" cx="10%" cy="80%" rx="100" ry="70" opacity="0.5" />
        <ellipse className="contour c5" cx="10%" cy="80%" rx="160" ry="110" opacity="0.35" />
        <ellipse className="contour c7" cx="10%" cy="80%" rx="230" ry="160" opacity="0.2" />
      </svg>
    </div>
  );
});
