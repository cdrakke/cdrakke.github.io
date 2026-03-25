import { useState, useCallback, type MouseEvent } from "react";

interface TiltState {
  rotateX: number;
  rotateY: number;
  spotlightX: number;
  spotlightY: number;
}

const INITIAL: TiltState = {
  rotateX: 0,
  rotateY: 0,
  spotlightX: 50,
  spotlightY: 50,
};

export function useTilt(maxTilt = 8) {
  const [tilt, setTilt] = useState<TiltState>(INITIAL);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      setTilt({
        rotateX: (0.5 - y) * maxTilt * 2,
        rotateY: (x - 0.5) * maxTilt * 2,
        spotlightX: x * 100,
        spotlightY: y * 100,
      });
    },
    [maxTilt]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTilt(INITIAL);
  }, []);

  const style = {
    transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
    transition: isHovering
      ? "transform 0.1s ease-out"
      : "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
  };

  const spotlightStyle = {
    background: `radial-gradient(circle at ${tilt.spotlightX}% ${tilt.spotlightY}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
    opacity: isHovering ? 1 : 0,
    transition: "opacity 0.3s ease-out",
  };

  return {
    tiltStyle: style,
    spotlightStyle,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}
