import React, { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import SpaceBackground from './components/SpaceBackground';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Glowing divider streak element between major sections
const SectionDivider = ({ delay = 0 }) => {
  return (
    <div className="relative h-16 w-full max-w-[1280px] mx-auto overflow-hidden select-none pointer-events-none">
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div
        className="absolute top-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-divider-move opacity-70"
        style={{
          boxShadow: '0 0 10px rgba(34,211,238,0.7)',
          animationDelay: `${delay}s`,
          animationDuration: '5.5s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'linear'
        }}
      />
    </div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    // Check if skipping loading screen
    if (sessionStorage.getItem('portfolio-loaded')) {
      setIsLoading(false);
    }

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pct = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      setScrollPercent(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="w-full min-h-screen relative text-[#f1f5f9] select-text selection:bg-primary/30 selection:text-white">
      {/* Loading Entrance Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Global Interactive Backgrounds & Cursor */}
      <CustomCursor />
      <SpaceBackground />

      {/* Main Content Layout */}
      <div
        className={`relative z-10 transition-opacity duration-1000 ${isLoading ? "opacity-0" : "opacity-100"
          }`}
      >
        <Navbar />

        <main className="relative z-10 w-full">
          <Hero />

          <SectionDivider delay={0.1} />

          <About />

          <SectionDivider delay={1.5} />


          <Projects />

          <SectionDivider delay={3.0} />

          <FAQ />

          <SectionDivider delay={4.5} />

          <Contact />
        </main>

        <Footer />
      </div>

      {/* Custom Right-Side Vertical Scroll Satellite Indicator */}
      {!isLoading && (
        <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-[90] flex-col items-center h-64 pointer-events-none w-5 select-none">
          <svg className="overflow-visible" height="100%" width="20">
            <line stroke="rgba(255,255,255,0.06)" strokeWidth="1" x1="10" x2="10" y1="0" y2="100%" />
            <line
              stroke="#38bdf8"
              strokeWidth="1"
              x1="10"
              x2="10"
              y1="0"
              y2={scrollPercent * 256}
              style={{ filter: 'drop-shadow(0 0 4px rgba(56,189,248,0.8))' }}
            />
          </svg>
          {/* Satellite orbiter tracking progress */}
          <div
            className="absolute left-1 w-3 h-3 transition-transform duration-75 ease-out"
            style={{
              transform: `translateY(${scrollPercent * 256 - 6}px)`
            }}
          >
            <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_2px_rgba(34,211,238,0.8)]" />
          </div>
        </div>
      )}
    </div>
  );
}
