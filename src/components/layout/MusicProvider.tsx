import { useCallback, useEffect, useRef, useState } from "react";
import { MusicContext } from "@/lib/music-context";

const AUDIO_SRC = "/audio/deltarune-rouxl-kard.mp3";
const DEFAULT_VOLUME = 0.3;

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prevVolumeRef = useRef(DEFAULT_VOLUME);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("music-volume");
      return stored ? parseFloat(stored) : DEFAULT_VOLUME;
    }
    return DEFAULT_VOLUME;
  });
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("music-muted") === "true";
    }
    return false;
  });

  // Initialize audio element once
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.preload = "metadata";
    audio.volume = isMuted ? 0 : volume;
    audioRef.current = audio;

    // Resume-on-return: if user had music playing last session,
    // start playback after first user interaction (browser autoplay policy)
    const wasPlaying = localStorage.getItem("music-was-playing") === "true";
    if (wasPlaying) {
      const resumeOnInteraction = () => {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      };
      document.addEventListener("click", resumeOnInteraction, { once: true });
      document.addEventListener("keydown", resumeOnInteraction, { once: true });
      document.addEventListener("touchstart", resumeOnInteraction, { once: true });

      return () => {
        document.removeEventListener("click", resumeOnInteraction);
        document.removeEventListener("keydown", resumeOnInteraction);
        document.removeEventListener("touchstart", resumeOnInteraction);
        audio.pause();
        audio.src = "";
      };
    }

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync volume to audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("music-volume", String(volume));
  }, [volume]);

  useEffect(() => {
    localStorage.setItem("music-was-playing", String(isPlaying));
  }, [isPlaying]);

  useEffect(() => {
    localStorage.setItem("music-muted", String(isMuted));
  }, [isMuted]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying]);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (v > 0) {
      prevVolumeRef.current = v;
      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      setIsMuted(false);
      setVolumeState(prevVolumeRef.current || DEFAULT_VOLUME);
    } else {
      prevVolumeRef.current = volume;
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  return (
    <MusicContext.Provider
      value={{ isPlaying, volume, isMuted, togglePlay, setVolume, toggleMute }}
    >
      {children}
    </MusicContext.Provider>
  );
}
