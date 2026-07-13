import React, { useEffect, useRef, useState } from 'react';

export default function LoadingScreen({ onComplete }) {
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [showPercent, setShowPercent] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Fast path: if already loaded in this session, skip loader
    if (sessionStorage.getItem('portfolio-loaded')) {
      onComplete();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);

    // Stars data
    const stars = [];
    const STAR_COUNT = 300;
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.2 + 0.3,
        a: 0,
        target: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.008
      });
    }
    let animationFrameId;
    let startTimestamp = performance.now();

    const draw = () => {
      const elapsed = performance.now() - startTimestamp;
      ctx.clearRect(0, 0, width, height);

      // Dark background
      ctx.fillStyle = '#000103';
      ctx.fillRect(0, 0, width, height);

      // Draw stars fading in
      stars.forEach((s) => {
        s.a += (s.target - s.a) * s.speed;
        ctx.beginPath();
        ctx.fillStyle = `rgba(200, 210, 225, ${s.a})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Loading stages timers
    const logoTimeout = setTimeout(() => setShowLogo(true), 150);
    const percentTimeout = setTimeout(() => setShowPercent(true), 350);

    return () => {
      window.removeEventListener('resize', resize);
      clearTimeout(logoTimeout);
      clearTimeout(percentTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  // Handle fake progress count increments
  useEffect(() => {
    if (!showPercent) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.ceil(Math.random() * 12);
        if (next >= 100) {
          clearInterval(interval);
          triggerExitSequence();
          return 100;
        }
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [showPercent]);

  const triggerExitSequence = () => {
    // Zoom flythrough feeling
    setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        sessionStorage.setItem('portfolio-loaded', 'true');
        onComplete();
      }, 600); // match transition speed
    }, 200);
  };

  // If already loaded skip
  if (sessionStorage.getItem('portfolio-loaded')) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#000103] overflow-hidden transition-all duration-700 ease-out ${isFadingOut ? 'opacity-0 scale-[1.08] pointer-events-none' : 'opacity-100 scale-100'
        }`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative flex flex-col items-center gap-6 z-10 select-none">
        {/* Logo brand */}
        <div
          className={`font-headline-md text-2xl tracking-[0.3em] uppercase text-on-surface transition-opacity duration-500 ${showLogo ? 'opacity-100' : 'opacity-0'
            }`}
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Saad<span className="text-primary">.</span>dev
        </div>

        {/* Loading track line */}
        <div className="w-56 h-[1px] bg-white/10 relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-primary transition-all duration-100"
            style={{
              width: `${progress}%`,
              boxShadow: '0 0 12px rgba(56,189,248,0.8)'
            }}
          />
        </div>

        {/* Percent readout */}
        <p
          className={`font-label-sm text-[11px] tracking-[0.2em] text-on-surface-variant/70 transition-opacity duration-300 ${showPercent ? 'opacity-100' : 'opacity-0'
            }`}
        >
          ENTERING UNIVERSE &mdash; {progress}%
        </p>
      </div>
    </div>
  );
}
