import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { MusicProvider } from "@/components/layout/MusicProvider";
import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/inter/wght-italic.css";
import App from "./App";
import "./index.css";

// Easter egg for devs who inspect
console.log(
  "%c Hey, you're inspecting! 👀",
  "color: #60a5fa; font-size: 16px; font-weight: bold;"
);
console.log(
  "%c Built by Drekyz with React + Vite + ShadCN/ui + GSAP",
  "color: #94a3b8; font-size: 12px;"
);
console.log(
  "%c Want to work together? → drekyz.business@gmail.com",
  "color: #60a5fa; font-size: 12px;"
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MusicProvider>
          <App />
        </MusicProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
