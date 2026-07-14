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

const SectionDivider = ({ d = 0 }) => {
  return (
    <div className="relative h-16 w-full max-w-[1280px] mx-auto overflow-hidden select-none pointer-events-none">
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div
        className="absolute top-1/2 w-32 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-divider-move"
        style={{
          boxShadow: '0 0 12px 2px rgba(127, 232, 248, 0.9)',
          animationDuration: '5.5s',
          animationDelay: `${d}s`,
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
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('portfolio-loaded')) {
      setIsLoading(false);
    }

    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct =
        maxScroll > 0
          ? Math.min(1, Math.max(0, window.scrollY / maxScroll))
          : 0;

      setScrollPercent(pct);
      setShowBackToTop(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen relative text-[#f1f5f9] select-text selection:bg-primary/30 selection:text-white">
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      <CustomCursor />
      <SpaceBackground />

      <div
        className={`relative z-10 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'
          }`}
      >
        <Navbar />

        <main className="relative z-10 w-full">
          <Hero />

          <SectionDivider d={0.5} />

          <About />

          <SectionDivider d={2.5} />

          <Projects />

          <SectionDivider d={3.5} />

          <FAQ />

          <SectionDivider d={4.5} />

          <Contact />
        </main>

        <Footer />
      </div>

      {!isLoading && (
        <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-[90] flex-col items-center h-64 pointer-events-none w-5 select-none">
          <svg className="overflow-visible" height="100%" width="20">
            <line
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
              x1="10"
              x2="10"
              y1="0"
              y2="100%"
            />
            <line
              stroke="#38bdf8"
              strokeWidth="1"
              x1="10"
              x2="10"
              y1="0"
              y2={scrollPercent * 256}
              style={{
                filter: 'drop-shadow(0 0 4px rgba(56,189,248,0.8))'
              }}
            />
          </svg>

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

      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-[100] p-3 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:border-cyan-400 hover:text-white transition-all duration-300 backdrop-blur-sm ${showBackToTop
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        aria-label="Back to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
          />
        </svg>
      </button>
    </div>
  );
}