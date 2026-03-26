import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageLightboxProps {
  images: string[];
  alt: string;
  initialIndex: number;
  onClose: () => void;
}

export function ImageLightbox({
  images,
  alt,
  initialIndex,
  onClose,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const translateStart = useRef({ x: 0, y: 0 });

  const resetTransform = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      resetTransform();
    },
    [resetTransform]
  );

  const prev = useCallback(
    () => goTo(currentIndex === 0 ? images.length - 1 : currentIndex - 1),
    [currentIndex, images.length, goTo]
  );

  const next = useCallback(
    () => goTo(currentIndex === images.length - 1 ? 0 : currentIndex + 1),
    [currentIndex, images.length, goTo]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          prev();
          break;
        case "ArrowRight":
          next();
          break;
        case "0":
          resetTransform();
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, prev, next, resetTransform]);

  // Lock body scroll
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Pan via pointer drag (only when zoomed)
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (scale <= 1) return;
      e.preventDefault();
      setIsDragging(true);
      dragStart.current = { x: e.clientX, y: e.clientY };
      translateStart.current = { ...translate };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [scale, translate]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      setTranslate({
        x: translateStart.current.x + (e.clientX - dragStart.current.x),
        y: translateStart.current.y + (e.clientY - dragStart.current.y),
      });
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Double-click to toggle zoom
  const handleDoubleClick = useCallback(() => {
    if (scale > 1) {
      resetTransform();
    } else {
      setScale(2.5);
    }
  }, [scale, resetTransform]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      {/* Close button — top right */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 h-10 w-10 flex items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Image area — fills all available space */}
      <div
        className={cn(
          "relative flex-1 flex items-center justify-center overflow-hidden select-none",
          scale > 1 ? "cursor-grab" : "cursor-zoom-in",
          isDragging && "cursor-grabbing"
        )}
        onClick={(e) => {
          // Close on backdrop click only when not zoomed
          if (scale <= 1 && e.target === e.currentTarget) onClose();
        }}
        onDoubleClick={handleDoubleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <img
          src={images[currentIndex]}
          alt={`${alt} screenshot ${currentIndex + 1}`}
          className="max-h-full max-w-full object-contain transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)`,
          }}
          draggable={false}
        />

        {/* Prev / Next overlays */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 text-sm text-white/70">
          <span className="tabular-nums">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  i === currentIndex
                    ? "bg-white scale-125"
                    : "bg-white/30 hover:bg-white/50"
                )}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}

        <div className="text-xs text-white/40">
          Double-click to zoom
        </div>
      </div>
    </div>
  );
}
