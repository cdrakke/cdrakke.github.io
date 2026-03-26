import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";

interface TerminalIntroProps {
  onComplete: () => void;
}

const COMMAND = `curl -X POST https://cdrakke.github.io/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email": "guest@drekyz.dev", "password": "••••••••"}'`;

const JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRHJla3l6In0...";

export function TerminalIntro({ onComplete }: TerminalIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);
  const [typedCmd, setTypedCmd] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [phase, setPhase] = useState<"typing" | "waiting" | "response" | "done">("typing");

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  // Type out the curl command
  useEffect(() => {
    if (phase !== "typing") return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < COMMAND.length) {
        setTypedCmd(COMMAND.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setPhase("waiting");
      }
    }, 12 + Math.random() * 8);
    return () => clearInterval(interval);
  }, [phase]);

  // Brief pause simulating network latency
  useEffect(() => {
    if (phase !== "waiting") return;
    const timer = setTimeout(() => setPhase("response"), 500);
    return () => clearTimeout(timer);
  }, [phase]);

  // Animate response lines in
  const animateResponse = useCallback(() => {
    const el = responseRef.current;
    if (!el) return;
    const lines = el.querySelectorAll("[data-line]");
    const tl = gsap.timeline({
      onComplete: () => {
        setPhase("done");
        setTimeout(onComplete, 200);
      },
    });
    tl.fromTo(
      lines,
      { opacity: 0, x: -6 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.12, ease: "power2.out" }
    );
  }, [onComplete]);

  useEffect(() => {
    if (phase !== "response") return;
    const timer = setTimeout(animateResponse, 100);
    return () => clearTimeout(timer);
  }, [phase, animateResponse]);

  const cursor = (
    <span
      className={`inline-block w-[7px] h-[14px] sm:h-[18px] bg-foreground ml-px align-middle ${
        showCursor ? "opacity-100" : "opacity-0"
      }`}
    />
  );

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center w-full h-full"
    >
      <div className="max-w-2xl w-full px-6 font-mono text-xs sm:text-sm leading-relaxed">
        {/* Command */}
        <div className="whitespace-pre-wrap">
          <span className="text-green-400">$ </span>
          <span className="text-foreground">{typedCmd}</span>
          {phase === "typing" && cursor}
        </div>

        {/* Response */}
        {(phase === "response" || phase === "done") && (
          <div ref={responseRef} className="mt-4 space-y-0.5">
            <div data-line className="opacity-0">
              <span className="text-muted-foreground">HTTP/1.1 </span>
              <span className="text-green-400 font-semibold">200 OK</span>
            </div>
            <div data-line className="opacity-0 text-muted-foreground/60">
              Content-Type: application/json
            </div>
            <div data-line className="opacity-0 h-2" />
            <div data-line className="opacity-0 text-muted-foreground">
              {"{"}
            </div>
            <div data-line className="opacity-0 pl-4">
              <span className="text-primary">&quot;token&quot;</span>
              <span className="text-muted-foreground">: </span>
              <span className="text-yellow-500/80 break-all">
                &quot;{JWT_TOKEN}&quot;
              </span>
              <span className="text-muted-foreground">,</span>
            </div>
            <div data-line className="opacity-0 pl-4">
              <span className="text-primary">&quot;user&quot;</span>
              <span className="text-muted-foreground">{": {"}</span>
            </div>
            <div data-line className="opacity-0 pl-8">
              <span className="text-primary">&quot;name&quot;</span>
              <span className="text-muted-foreground">: </span>
              <span className="text-green-400">&quot;Drekyz&quot;</span>
              <span className="text-muted-foreground">,</span>
            </div>
            <div data-line className="opacity-0 pl-8">
              <span className="text-primary">&quot;role&quot;</span>
              <span className="text-muted-foreground">: </span>
              <span className="text-green-400">
                &quot;Backend Developer&quot;
              </span>
            </div>
            <div data-line className="opacity-0 pl-4 text-muted-foreground">
              {"}"}
            </div>
            <div data-line className="opacity-0 text-muted-foreground">
              {"}"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
