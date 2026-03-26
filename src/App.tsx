import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MusicPlayer } from "@/components/layout/MusicPlayer";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const HomePage = lazy(() =>
  import("@/pages/HomePage").then((m) => ({ default: m.HomePage }))
);
const AboutPage = lazy(() =>
  import("@/pages/AboutPage").then((m) => ({ default: m.AboutPage }))
);

export default function App() {
  useSmoothScroll();

  return (
    <>
      <div className="min-h-screen overflow-x-hidden bg-background text-foreground pb-12">
        <Navbar />
        <main>
          <Suspense>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
      <MusicPlayer />
    </>
  );
}
