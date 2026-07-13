import React, { useEffect, useRef } from 'react';

export default function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const STAR_COUNT = 300;
    const stars = [];

    // Initialize stars with positions, sizes, opacities, and speeds
    const initStars = (initial = false) => {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        const target = Math.random() * 0.8 + 0.2;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.2 + 0.3,
          // Fade in from 0 on initial mount, or start with random opacity if resizing
          a: initial ? 0 : Math.random() * target,
          target: target,
          speed: Math.random() * 0.02 + 0.008,
          parallax: Math.random() * 70 + 40,
          // Extremely subtle drifting velocity (pixels per frame at 60 FPS)
          vx: (Math.random() - 0.5) * 0.05,
          vy: (Math.random() - 0.5) * 0.05
        });
      }
    };

    let isInitial = true;
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initStars(isInitial);
      isInitial = false;

      if (prefersReducedMotion) {
        renderStatic();
      }
    };

    // Keep event listeners and states for mouse, scroll, and touch interaction
    let pointerX = 0;
    let pointerY = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;
    let pointerActive = false;
    let idleTimer = 0;

    let scrollOffset = window.scrollY;
    let targetScrollOffset = window.scrollY;

    const handleMouseMove = (e) => {
      targetPointerX = (e.clientX / width) * 2 - 1;
      targetPointerY = (e.clientY / height) * 2 - 1;
      pointerActive = true;
      idleTimer = 0;
    };

    const handleMouseLeave = () => {
      pointerActive = false;
    };

    const handleWheel = (e) => {
      targetScrollOffset += e.deltaY * 0.5;
      idleTimer = 0;
    };

    const handleScroll = () => {
      targetScrollOffset = window.scrollY;
      idleTimer = 0;
    };

    const handleTouchMove = (e) => {
      if (!e.touches || !e.touches[0]) return;
      const t = e.touches[0];
      targetPointerX = (t.clientX / width) * 2 - 1;
      targetPointerY = (t.clientY / height) * 2 - 1;
      pointerActive = true;
      idleTimer = 0;
    };

    // Attach listeners
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Initialize layout and stars
    resize();

    let animationFrameId;
    let lastTime = performance.now();

    // Render static starfield if prefers-reduced-motion is active
    const renderStatic = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#000103';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        ctx.beginPath();
        ctx.fillStyle = `rgba(200,210,225,${s.target})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Main animation frame loop
    const frame = (now) => {
      if (prefersReducedMotion) {
        renderStatic();
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Smooth pointer interpolation
      pointerX += (targetPointerX - pointerX) * 0.05;
      pointerY += (targetPointerY - pointerY) * 0.05;

      // Smooth scrolling interpolation
      scrollOffset += (targetScrollOffset - scrollOffset) * 0.08;

      idleTimer += dt;

      ctx.clearRect(0, 0, width, height);

      // Dark background
      ctx.fillStyle = '#000103';
      ctx.fillRect(0, 0, width, height);

      const mouseX = (pointerX * 0.5 + 0.5) * width;
      const mouseY = (pointerY * 0.5 + 0.5) * height;
      const speedMultiplier = dt * 60;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // 1. Organic drifting (almost invisible, alive feeling)
        s.x += s.vx * speedMultiplier;
        s.y += s.vy * speedMultiplier;

        // Wrap base coordinates so stars stay on screen
        s.x = ((s.x % width) + width) % width;
        s.y = ((s.y % height) + height) % height;

        // 2. Twinkling (opacity animation from LoadingScreen)
        s.a += (s.target - s.a) * s.speed * speedMultiplier;
        if (Math.abs(s.target - s.a) < 0.01) {
          s.target = Math.random() * 0.8 + 0.2;
        }

        // 3. Gentle parallax (mouse) and scroll offsetting
        let drawX = s.x - pointerX * s.parallax;
        let drawY = s.y - pointerY * s.parallax - scrollOffset * (s.parallax * 0.05);

        // Wrap coordinates to keep stars on screen
        drawX = ((drawX % width) + width) % width;
        drawY = ((drawY % height) + height) % height;

        // 4. Drawing star core (exact logic from LoadingScreen)
        ctx.beginPath();
        ctx.fillStyle = `rgba(200,210,225,${s.a})`;
        ctx.arc(drawX, drawY, s.r, 0, Math.PI * 2);
        ctx.fill();

        // 5. Mouse hovering proximity glow effect
        if (pointerActive) {
          const dxp = drawX - mouseX;
          const dyp = drawY - mouseY;
          const distToCursor = Math.sqrt(dxp * dxp + dyp * dyp);
          const glowBoost = Math.max(0, 1 - distToCursor / 160);

          if (glowBoost > 0) {
            ctx.beginPath();
            ctx.fillStyle = `rgba(56, 189, 248, ${glowBoost * 0.4 * s.a})`;
            ctx.arc(drawX, drawY, s.r * (2.0 + glowBoost * 2.5), 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(frame);
    };

    animationFrameId = requestAnimationFrame(frame);

    // Clean up event listeners and animation frames
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#000103] z-[0] overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
