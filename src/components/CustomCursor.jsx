import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMagnetic, setIsMagnetic] = useState(false);
  
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRefs = useRef([]);

  const mouseCoords = useRef({ x: 0, y: 0 });
  const dotCoords = useRef({ x: 0, y: 0 });
  const ringCoords = useRef({ x: 0, y: 0 });
  const magneticTargetRef = useRef(null);

  useEffect(() => {
    // Check if device supports coarse pointer (mobile touch)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsMobile(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;
      
      // Update trail particle head
      const particles = trailRefs.current;
      if (particles.length > 0) {
        const head = particles[particles.length - 1];
        if (head && Math.hypot(e.clientX - head.x, e.clientY - head.y) > 10) {
          // Cycle particles
          const popped = particles.pop();
          if (popped) {
            popped.x = e.clientX;
            popped.y = e.clientY;
            popped.life = 1;
            popped.el.style.opacity = '0.35';
            popped.el.style.transform = `translate(${popped.x}px, ${popped.y}px) translate(-50%, -50%)`;
            particles.unshift(popped);
          }
        }
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      
      const hoverable = target.closest('a, button, input, textarea, select, .faq-item, [role="button"], .project-card, .tech-icon');
      if (hoverable) {
        setIsHovered(true);
        if (hoverable.classList.contains('glow-btn')) {
          setIsMagnetic(true);
          magneticTargetRef.current = hoverable;
        } else {
          setIsMagnetic(false);
          magneticTargetRef.current = null;
        }
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (!target) return;

      const hoverable = target.closest('a, button, input, textarea, select, .faq-item, [role="button"], .project-card, .tech-icon');
      if (hoverable && (!e.relatedTarget || !e.relatedTarget.closest('a, button, input, textarea, select, .faq-item, [role="button"], .project-card, .tech-icon'))) {
        setIsHovered(false);
        setIsMagnetic(false);
        magneticTargetRef.current = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    // Initialize particles array
    const PARTICLE_COUNT = 5;
    const initialParticles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const el = document.createElement('div');
      el.className = 'cx-particle fixed top-0 left-0 w-[4px] h-[4px] rounded-full bg-purple-500/40 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2';
      el.style.opacity = '0';
      document.body.appendChild(el);
      initialParticles.push({ el, x: 0, y: 0, life: 0 });
    }
    trailRefs.current = initialParticles;

    // Smooth animation loop
    let animationFrameId;
    const tick = () => {
      let aimX = mouseCoords.current.x;
      let aimY = mouseCoords.current.y;

      // Handle magnetic pull
      if (magneticTargetRef.current) {
        const r = magneticTargetRef.current.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        aimX = mouseCoords.current.x + (cx - mouseCoords.current.x) * 0.3;
        aimY = mouseCoords.current.y + (cy - mouseCoords.current.y) * 0.3;
      }

      // Linear interpolation (lerp) for smooth tracking
      dotCoords.current.x += (aimX - dotCoords.current.x) * 0.22;
      dotCoords.current.y += (aimY - dotCoords.current.y) * 0.22;
      
      ringCoords.current.x += (aimX - ringCoords.current.x) * 0.1;
      ringCoords.current.y += (aimY - ringCoords.current.y) * 0.1;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotCoords.current.x}px, ${dotCoords.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringCoords.current.x}px, ${ringCoords.current.y}px) translate(-50%, -50%)`;
      }

      // Animate trail particles decay
      trailRefs.current.forEach((p) => {
        p.life *= 0.88;
        p.el.style.opacity = String(Math.max(0, p.life * 0.3));
        const scale = 0.4 + p.life * 0.6;
        p.el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) scale(${scale})`;
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
      
      // Cleanup particles
      initialParticles.forEach((p) => {
        if (p.el && p.el.parentNode) {
          p.el.parentNode.removeChild(p.el);
        }
      });
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
          isHovered
            ? 'bg-purple-300 shadow-[0_0_15px_4px_rgba(168,85,247,0.7)] w-2 h-2'
            : 'bg-cyan-300 shadow-[0_0_12px_2px_rgba(56,189,248,0.8)]'
        }`}
      />

      {/* Outer Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${
          isHovered
            ? 'w-12 h-12 border-purple-400/40 bg-purple-500/5 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
            : 'w-7.5 h-7.5 border-cyan-400/35 bg-transparent'
        }`}
        style={{ width: isHovered ? '48px' : '30px', height: isHovered ? '48px' : '30px' }}
      />
    </>
  );
}
