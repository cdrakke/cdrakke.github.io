import { Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MusicPlayer } from "@/components/layout/MusicPlayer";
import { HomePage } from "@/pages/HomePage";
import { AboutPage } from "@/pages/AboutPage";

export default function App() {
  return (
    <>
      <div className="min-h-screen overflow-x-hidden bg-background text-foreground pb-12">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <MusicPlayer />
    </>
  );
}
