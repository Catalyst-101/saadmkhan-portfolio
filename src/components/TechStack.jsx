import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TechStack() {
  const scrollContainerRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const technologies = [
    { name: 'React', icon: 'animation', color: 'text-cyan-400', glow: 'shadow-cyan-500/20' },
    { name: 'Next.js', icon: 'schema', color: 'text-white', glow: 'shadow-white/20' },
    { name: 'Flutter', icon: 'tablet_android', color: 'text-blue-400', glow: 'shadow-blue-500/20' },
    { name: 'Node.js', icon: 'memory', color: 'text-green-400', glow: 'shadow-green-500/20' },
    { name: 'Express', icon: 'settings_ethernet', color: 'text-gray-300', glow: 'shadow-gray-400/20' },
    { name: 'MongoDB', icon: 'database', color: 'text-emerald-500', glow: 'shadow-emerald-500/20' },
    { name: 'Firebase', icon: 'local_fire_department', color: 'text-orange-400', glow: 'shadow-orange-500/20' },
    { name: 'Supabase', icon: 'bolt', color: 'text-emerald-400', glow: 'shadow-emerald-400/20' },
    { name: 'Tailwind', icon: 'palette', color: 'text-teal-400', glow: 'shadow-teal-500/20' },
    { name: 'JavaScript', icon: 'javascript', color: 'text-yellow-400', glow: 'shadow-yellow-500/20' },
    { name: 'TypeScript', icon: 'code', color: 'text-blue-500', glow: 'shadow-blue-500/20' },
    { name: 'Java', icon: 'coffee', color: 'text-red-400', glow: 'shadow-red-500/20' },
    { name: 'Python', icon: 'terminal', color: 'text-yellow-500', glow: 'shadow-yellow-500/20' },
    { name: 'Git', icon: 'commit', color: 'text-orange-600', glow: 'shadow-orange-600/20' },
    { name: 'GitHub', icon: 'folder_open', color: 'text-purple-400', glow: 'shadow-purple-500/20' }
  ];

  // Update arrow button visibility
  const updateScrollState = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollState, { passive: true });
      window.addEventListener('resize', updateScrollState);
      updateScrollState();
    }
    return () => {
      if (el) el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  const handleMouseDown = (e) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setIsMouseDown(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeft(el.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const el = scrollContainerRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll multiplier
    el.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsMouseDown(false);
  };

  const scrollBy = (amount) => {
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 max-w-[1280px] mx-auto px-6 md:px-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
      >
        <div>
          <h2 className="font-headline-lg text-3xl md:text-4xl font-bold text-on-surface">
            Tech <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">Stack</span>
          </h2>
          <p className="text-on-surface-variant mt-2 text-base">
            Powering projects with modern frontends, robust servers, and AI architectures.
          </p>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="flex gap-4">
          <button
            onClick={() => scrollBy(-320)}
            disabled={!canScrollLeft}
            className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${
              canScrollLeft
                ? 'border-primary/30 bg-primary/10 text-primary hover:bg-primary hover:text-on-primary hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                : 'border-white/5 bg-white/2 text-on-surface-variant/40 cursor-not-allowed'
            }`}
            aria-label="Scroll left"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button
            onClick={() => scrollBy(320)}
            disabled={!canScrollRight}
            className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${
              canScrollRight
                ? 'border-primary/30 bg-primary/10 text-primary hover:bg-primary hover:text-on-primary hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                : 'border-white/5 bg-white/2 text-on-surface-variant/40 cursor-not-allowed'
            }`}
            aria-label="Scroll right"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </motion.div>

      {/* Draggable Carousel Viewport */}
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`flex gap-6 overflow-x-auto pb-8 scrollbar-none cursor-grab active:cursor-grabbing select-none ${
          isMouseDown ? 'scroll-auto' : 'scroll-smooth'
        }`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {technologies.map((tech) => (
          <motion.div
            key={tech.name}
            whileHover={{ y: -8, scale: 1.03 }}
            className={`flex-shrink-0 w-[180px] p-6 rounded-2xl bg-[#0a0f1d]/50 backdrop-blur-xl border border-white/5 relative overflow-hidden group hover:border-primary/30 transition-all duration-300 shadow-lg hover:${tech.glow}`}
          >
            {/* Ambient inner soft lighting */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            
            {/* Icon logo */}
            <div className={`w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-4 transition-colors group-hover:bg-primary/10 ${tech.color}`}>
              <span className="material-symbols-outlined text-4xl drop-shadow-[0_0_8px_currentColor]">
                {tech.icon}
              </span>
            </div>

            {/* Name */}
            <h4 className="font-bold text-base text-on-surface group-hover:text-primary transition-colors">
              {tech.name}
            </h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
