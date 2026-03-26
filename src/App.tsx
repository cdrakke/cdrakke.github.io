import { lazy, Suspense, useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MusicPlayer } from "@/components/layout/MusicPlayer";
import { useSmoothScroll, getLenis } from "@/hooks/useSmoothScroll";
import { hasIntroPlayed } from "@/lib/intro-state";

const HomePage = lazy(() =>
  import("@/pages/HomePage").then((m) => ({ default: m.HomePage }))
);
const AboutPage = lazy(() =>
  import("@/pages/AboutPage").then((m) => ({ default: m.AboutPage }))
);

export default function App() {
  useSmoothScroll();
  const { pathname } = useLocation();

  // Mark root as ready before first paint (unhides #root hidden by inline style)
  useLayoutEffect(() => {
    document.getElementById("root")?.setAttribute("data-ready", "");
  }, []);

  // Manage intro class and scroll to top BEFORE paint
  useLayoutEffect(() => {
    // Scroll to top immediately
    window.scrollTo(0, 0);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }

    if (pathname === "/" && !hasIntroPlayed()) {
      document.documentElement.classList.add("intro-playing");
      document.documentElement.classList.remove("intro-done");
    } else {
      document.documentElement.classList.remove("intro-playing");
      document.documentElement.classList.remove("intro-done");
    }
  }, [pathname]);

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
