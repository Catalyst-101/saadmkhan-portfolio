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

    const STAR_COLORS = [
      '#ffffff', // Pure white
      '#f0f9ff', // Extremely light sky blue
      '#e0f2fe', // Soft light blue
      '#bae6fd', // Light blue-sky
      '#f8fafc', // Slate white
      '#f1f5f9', // Slate light blue
      '#e2e8f0'  // Muted light blue
    ];

    // Initialize stars with positions, sizes, opacities, speeds, and zDepth
    const initStars = (initial = false) => {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        // pseudo-3D zDepth: closer stars (higher zDepth) are larger, faster, and react more
        const zDepth = Math.random() * 0.8 + 0.2;

        // Delicate sizing: 0.5px to 2px mapped to zDepth [0.2, 1.0]
        const r = 0.5 + ((zDepth - 0.2) / 0.8) * 1.5;

        // Continuous alpha pulse setup
        const alpha = initial ? 0 : Math.random() * 0.8 + 0.2;
        const pulseSpeed = (Math.random() * 0.006 + 0.002) * (Math.random() < 0.5 ? 1 : -1);

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          zDepth: zDepth,
          r: r,
          alpha: alpha,
          pulseSpeed: pulseSpeed,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
          // Amplified parallax range scaling with zDepth
          parallax: (Math.random() * 5 + 10) * zDepth,
          // Deeper background stars drift subtly (vx, vy scaled by zDepth)
          vx: (Math.random() - 0.5) * 0.04 * zDepth,
          vy: (Math.random() - 0.5) * 0.04 * zDepth
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

    // Tracking states
    let pointerX = 0;
    let pointerY = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;
    let pointerActive = false;
    let idleTimer = 0;

    // Scroll delta variables
    let scrollVelocity = 0;
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

    const handleScroll = () => {
      const delta = window.scrollY - targetScrollOffset;
      targetScrollOffset = window.scrollY;
      scrollVelocity += delta * 0.03;
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
        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.fillStyle = s.color;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
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

      // 4. Smooth pointer interpolation (inertia = 0.12)
      pointerX += (targetPointerX - pointerX) * 0.12;
      pointerY += (targetPointerY - pointerY) * 0.12;

      // 2. Decay scroll velocity momentum
      scrollVelocity *= 0.92;

      idleTimer += dt;

      ctx.clearRect(0, 0, width, height);

      // Dark background
      ctx.fillStyle = '#000103';
      ctx.fillRect(0, 0, width, height);

      const mousePixelX = (pointerX * 0.5 + 0.5) * width;
      const mousePixelY = (pointerY * 0.5 + 0.5) * height;
      const speedMultiplier = dt * 60;

      const GLOW_DISTANCE = 300;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Organic background drifting (drifts subtly)
        s.x += s.vx * speedMultiplier;
        s.y += s.vy * speedMultiplier;

        // Apply relative scroll velocity
        s.y -= scrollVelocity * (s.parallax * 0.02) * speedMultiplier;

        // Wrap base coordinates so stars stay on screen
        s.x = ((s.x % width) + width) % width;
        s.y = ((s.y % height) + height) % height;

        // Continuous alpha pulse animation
        s.alpha += s.pulseSpeed * speedMultiplier;
        if (s.alpha >= 1.0) {
          s.alpha = 1.0;
          s.pulseSpeed = -Math.abs(s.pulseSpeed);
        } else if (s.alpha <= 0.15) {
          s.alpha = 0.15;
          s.pulseSpeed = Math.abs(s.pulseSpeed);
        }

        // 3. Proximity Tracking: active physical pixel distance between mouse and star
        let distX = s.x - mousePixelX;
        let distY = s.y - mousePixelY;

        // Shortest distance calculation in wrapped coordinate system
        if (distX > width / 2) distX -= width;
        if (distX < -width / 2) distX += width;
        if (distY > height / 2) distY -= height;
        if (distY < -height / 2) distY += height;

        const distToCursor = Math.hypot(distX, distY);

        let offsetX = 0;
        let offsetY = 0;
        let glowBoost = 0;

        if (pointerActive && distToCursor < GLOW_DISTANCE) {
          glowBoost = 1 - distToCursor / GLOW_DISTANCE;

          // Vector deflection to create plastic spatial distortion around cursor
          // Closer stars (higher zDepth) react more sharply
          const deflection = glowBoost * 10 * s.zDepth;
          offsetX = (distX / (distToCursor || 1)) * deflection;
          offsetY = (distY / (distToCursor || 1)) * deflection;
        }

        // Calculate final coordinate positioning math with parallax and spatial distortion
        let drawX = s.x - pointerX * s.parallax + offsetX;
        let drawY = s.y - pointerY * s.parallax + offsetY;

        // Wrap drawing coordinates to canvas boundaries
        drawX = ((drawX % width) + width) % width;
        drawY = ((drawY % height) + height) % height;

        // 5. Expand Interactive Glow & Smoothly blend shadowBlur and globalAlpha
        ctx.save();

        const blendedAlpha = s.alpha + (1.0 - s.alpha) * glowBoost;
        ctx.globalAlpha = blendedAlpha;

        if (glowBoost > 0) {
          // Native glow using shadowBlur and sky blue color
          ctx.shadowBlur = glowBoost * 8 * s.zDepth;
          ctx.shadowColor = '#38bdf8';
        }

        // Draw star core
        ctx.beginPath();
        ctx.fillStyle = s.color;
        ctx.arc(drawX, drawY, s.r, 0, Math.PI * 2);
        ctx.fill();

        // Extra premium soft halo/glow overlay for visual feedback
        if (glowBoost > 0) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(56, 189, 248, ${glowBoost * 0.3 * s.zDepth})`;
          ctx.arc(drawX, drawY, s.r * (1.5 + glowBoost * 1.8), 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(frame);
    };

    animationFrameId = requestAnimationFrame(frame);

    // Clean up event listeners and animation frames
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
