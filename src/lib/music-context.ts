import { createContext } from "react";

export interface MusicContextType {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  togglePlay: () => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
}

export const MusicContext = createContext<MusicContextType | undefined>(
  undefined
);
