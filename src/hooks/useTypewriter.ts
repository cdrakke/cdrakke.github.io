import { useRef, useEffect, useCallback } from "react";

interface UseTypewriterOptions {
  lines: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
  shuffle?: boolean;
}

/**
 * DOM-based cycling typewriter.
 * Shows first line immediately. Starts erase→type cycle when element is visible.
 */
export function useTypewriter({
  lines,
  typeSpeed = 40,
  deleteSpeed = 25,
  pauseAfterType = 2000,
  pauseAfterDelete = 400,
  shuffle = true,
}: UseTypewriterOptions) {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const attach = useCallback((node: HTMLSpanElement | null) => {
    textRef.current = node;
    // Show first line immediately
    if (node && lines.length > 0) {
      node.textContent = lines[0]!;
    }
  }, [lines]);

  const attachCursor = useCallback((node: HTMLSpanElement | null) => {
    cursorRef.current = node;
  }, []);

  useEffect(() => {
    const textEl = textRef.current;
    const cursorEl = cursorRef.current;
    if (!textEl || lines.length === 0) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      cursorEl?.classList.add("animate-blink");
      return;
    }

    const queue = shuffle ? [...lines].sort(() => Math.random() - 0.5) : [...lines];
    // Start from index 1 since first line is already shown
    let lineIndex = 1;
    let cancelled = false;

    function sleep(ms: number): Promise<void> {
      return new Promise((resolve) => {
        const id = setTimeout(resolve, ms);
        if (cancelled) clearTimeout(id);
      });
    }

    async function run() {
      // Wait for initial line to be read
      cursorEl?.classList.add("animate-blink");
      await sleep(pauseAfterType);
      if (cancelled) return;

      // Erase the initial line
      cursorEl?.classList.remove("animate-blink");
      const initial = textEl!.textContent ?? "";
      for (let i = initial.length; i >= 0; i--) {
        if (cancelled) return;
        textEl!.textContent = initial.slice(0, i);
        await sleep(deleteSpeed);
      }
      await sleep(pauseAfterDelete);

      // Normal cycle
      while (!cancelled) {
        const line = queue[lineIndex % queue.length]!;

        cursorEl?.classList.remove("animate-blink");
        for (let i = 0; i <= line.length; i++) {
          if (cancelled) return;
          textEl!.textContent = line.slice(0, i);
          await sleep(typeSpeed);
        }

        cursorEl?.classList.add("animate-blink");
        await sleep(pauseAfterType);
        if (cancelled) return;

        cursorEl?.classList.remove("animate-blink");
        for (let i = line.length; i >= 0; i--) {
          if (cancelled) return;
          textEl!.textContent = line.slice(0, i);
          await sleep(deleteSpeed);
        }

        await sleep(pauseAfterDelete);
        lineIndex++;
      }
    }

    // Start cycling only when the element is visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          observer.disconnect();
          run();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(textEl);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [lines, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete, shuffle]);

  return { textRef: attach, cursorRef: attachCursor };
}
