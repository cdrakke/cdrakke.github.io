import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { ImageLightbox } from "@/components/shared/ImageLightbox";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const prev = () =>
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () =>
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <>
      <div className="relative overflow-hidden rounded-lg border group/carousel">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, i) => (
            <div key={i} className="relative w-full shrink-0">
              <img
                src={img}
                alt={`${alt} screenshot ${i + 1}`}
                className="w-full shrink-0 object-cover aspect-video cursor-pointer"
                loading="lazy"
                decoding="async"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(i);
                }}
              />
              {/* Expand hint on hover */}
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 hover:bg-black/20 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(i);
                }}
              >
                <Expand className="h-6 w-6 text-white opacity-0 transition-opacity duration-200 group-hover/carousel:opacity-70 drop-shadow-lg" />
              </div>
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-black/70 text-white ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-black/90 shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-black/70 text-white ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-black/90 shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(i);
                  }}
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors",
                    i === currentIndex ? "bg-white" : "bg-white/40"
                  )}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={images}
          alt={alt}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
