import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Helper component for animated counting on scroll intersection
const AnimatedCounter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    let observer;
    let animationFrameId;

    if (elementRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            const duration = 1500; // milliseconds
            const startTime = performance.now();

            const step = (currentTime) => {
              const elapsedTime = currentTime - startTime;
              const progress = Math.min(1, elapsedTime / duration);
              
              // Cubic ease-out formula
              const easedProgress = 1 - Math.pow(1 - progress, 3);
              setCount(Math.round(value * easedProgress));

              if (progress < 1) {
                animationFrameId = requestAnimationFrame(step);
              } else {
                setCount(value);
              }
            };

            animationFrameId = requestAnimationFrame(step);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.2 }
      );

      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [value]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

export default function About() {
  const stats = [
    { label: 'Years Exp.', value: 4, suffix: '+', color: 'text-primary', glow: 'rgba(56,189,248,0.15)' },
    { label: 'Projects Completed', value: 50, suffix: '+', color: 'text-secondary', glow: 'rgba(139,92,246,0.15)' },
    { label: 'Technologies', value: 15, suffix: '+', color: 'text-tertiary', glow: 'rgba(34,211,238,0.15)' },
    { label: 'Happy Clients', value: 100, suffix: '%', color: 'text-[#10B981]', glow: 'rgba(16,185,129,0.15)' }
  ];

  return (
    <section id="about" className="py-24 max-w-[1280px] mx-auto px-6 md:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: About text, Stats, and Experience */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* About Me panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-3xl bg-[#0a0f1d]/60 backdrop-blur-xl border border-white/5 relative overflow-hidden group hover:border-primary/20 transition-all duration-300"
          >
            {/* Soft Ambient Corner Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-all duration-500" />
            
            <h2 className="font-headline-lg text-3xl md:text-4xl font-bold mb-6 text-on-surface">
              About <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">Me</span>
            </h2>
            <p className="text-on-surface-variant text-base leading-relaxed mb-8">
              Passionate Full Stack Developer with 4+ years of experience in building scalable web
              applications and AI-integrated solutions. I bridge the gap between complex backend
              engineering and fluid, intuitive frontend design.
            </p>
            
            {/* Grid of Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="relative p-5 rounded-2xl bg-white/5 border border-white/5 overflow-hidden flex flex-col justify-center items-center text-center transition-all duration-300 hover:border-white/10 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)]"
                  style={{ '--glow-color': stat.glow }}
                >
                  {/* Glowing backlight */}
                  <div
                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, ${stat.glow} 0%, transparent 70%)`
                    }}
                  />
                  <p className={`text-3xl font-extrabold tracking-tight ${stat.color} mb-1 z-10`}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-[10px] md:text-xs uppercase tracking-widest text-on-surface-variant/80 font-semibold z-10">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Professional Experience Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 rounded-3xl bg-[#0a0f1d]/60 backdrop-blur-xl border border-white/5 relative overflow-hidden group hover:border-primary/20 transition-all duration-300"
          >
            <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-secondary/5 blur-3xl group-hover:bg-secondary/10 transition-all duration-500" />
            
            <h3 className="font-headline-md text-xl md:text-2xl font-bold mb-8 flex items-center gap-3 text-on-surface">
              <span className="material-symbols-outlined text-primary text-2xl md:text-3xl">work</span>
              Professional Experience
            </h3>
            
            <div className="space-y-8 relative">
              {/* Timeline Connector Link */}
              <div className="absolute left-[5px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary via-secondary to-transparent opacity-30" />

              {/* Job 1 */}
              <div className="relative pl-8">
                <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1">
                  <div>
                    <h4 className="font-bold text-lg text-on-surface">Senior Full Stack Developer</h4>
                    <p className="text-primary text-sm font-semibold">TechCorp Global</p>
                  </div>
                  <span className="self-start text-[11px] font-bold text-on-surface-variant bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    2021 - Present
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant/80 leading-relaxed">
                  Led the development of a microservices-based financial platform, improving processing speed by 40%.
                  Mentored junior developers and designed robust automated CI/CD deployment pipelines.
                </p>
              </div>

              {/* Job 2 */}
              <div className="relative pl-8">
                <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-secondary shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1">
                  <div>
                    <h4 className="font-bold text-lg text-on-surface">MERN Stack Developer</h4>
                    <p className="text-secondary text-sm font-semibold">Innovate Solutions</p>
                  </div>
                  <span className="self-start text-[11px] font-bold text-on-surface-variant bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    2019 - 2021
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant/80 leading-relaxed">
                  Developed real-time collaboration platforms utilizing React and Socket.io. Integrated multiple AI model APIs to generate smart automated tags for content organization.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Education card */}
        <div className="lg:col-span-4 space-y-8 h-full flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-3xl bg-[#0a0f1d]/60 backdrop-blur-xl border border-white/5 relative overflow-hidden group hover:border-primary/20 transition-all duration-300 flex-grow flex flex-col justify-center"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-tertiary/5 blur-3xl group-hover:bg-tertiary/10 transition-all duration-500" />
            
            <h3 className="font-headline-md text-xl md:text-2xl font-bold mb-8 flex items-center gap-3 text-on-surface">
              <span className="material-symbols-outlined text-tertiary text-2xl md:text-3xl">school</span>
              Education
            </h3>
            
            <div className="space-y-8">
              {/* Degree 1 */}
              <div>
                <p className="text-xs text-primary font-bold uppercase tracking-widest mb-1.5">2017 - 2021</p>
                <h4 className="font-bold text-base text-on-surface">B.Sc Computer Science</h4>
                <p className="text-sm text-on-surface-variant/70">Stanford University (Online/Distance)</p>
              </div>

              {/* Degree 2 */}
              <div className="pt-6 border-t border-white/5">
                <p className="text-xs text-secondary font-bold uppercase tracking-widest mb-1.5">2021 - 2022</p>
                <h4 className="font-bold text-base text-on-surface">Deep Learning Specialization</h4>
                <p className="text-sm text-on-surface-variant/70">Coursera (DeepLearning.AI)</p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
