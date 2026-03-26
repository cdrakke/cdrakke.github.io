import { useEffect, useState } from "react";
import { Play, Pause, Volume2, Volume1, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMusic } from "@/hooks/useMusic";
import { cn } from "@/lib/utils";

function SoundBars({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-end gap-[2px] h-4" aria-hidden="true">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={cn(
            "w-[3px] rounded-full bg-primary origin-bottom transition-transform",
            isPlaying ? `sound-bar sound-bar-${i}` : "scale-y-[0.3]"
          )}
          style={{ height: i === 2 ? "14px" : "10px" }}
        />
      ))}
    </div>
  );
}

function VolumeIcon({ volume, isMuted }: { volume: number; isMuted: boolean }) {
  if (isMuted || volume === 0) return <VolumeX className="size-4" />;
  if (volume < 0.5) return <Volume1 className="size-4" />;
  return <Volume2 className="size-4" />;
}

export function MusicPlayer() {
  const { isPlaying, volume, isMuted, togglePlay, setVolume, toggleMute } =
    useMusic();
  const [mounted, setMounted] = useState(false);

  // Entrance animation delay
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      data-music-player
      role="region"
      aria-label="Music player"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 h-12 border-t border-border/40 bg-background/80 backdrop-blur-md transition-all duration-500 ease-out",
        mounted ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      )}
    >
      <div className="mx-auto flex h-full max-w-5xl items-center gap-3 px-4 sm:px-6">
        {/* Sound bars + track name */}
        <div className="flex items-center gap-2 min-w-0">
          <SoundBars isPlaying={isPlaying} />
          <span className="truncate max-w-[180px] sm:max-w-[200px] text-xs text-muted-foreground">
            Hip Shop — Rouxls Kaard
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Controls */}
        <div className="flex items-center gap-1">
          {/* Play / Pause */}
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlay}
            aria-label={
              isPlaying ? "Pause background music" : "Play background music"
            }
          >
            {isPlaying ? (
              <Pause className="size-4" />
            ) : (
              <Play className="size-4" />
            )}
          </Button>

          {/* Volume */}
          <div className="group/volume flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              <VolumeIcon volume={volume} isMuted={isMuted} />
            </Button>

            {/* Volume slider — hidden on mobile, visible on hover for desktop */}
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              aria-label="Volume"
              className="music-volume-slider hidden sm:block w-0 sm:w-20 opacity-0 group-hover/volume:opacity-100 transition-opacity duration-200"
            />
          </div>
        </div>
      </div>

      {/* Screen reader announcements */}
      <span className="sr-only" aria-live="polite">
        {isPlaying ? "Music playing" : "Music paused"}
      </span>
    </div>
  );
}
