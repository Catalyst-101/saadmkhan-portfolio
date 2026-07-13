import React, { useState, useEffect, useRef } from 'react';
import { techStack } from '../data/techStack';
import { experience } from '../data/experience';
import { motion, AnimatePresence } from "framer-motion";

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

  const startDate = new Date(2024, 6);
  const currentDate = new Date();

  const months =
    (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
    (currentDate.getMonth() - startDate.getMonth());

  const years = Number((months / 12).toFixed(1));

  const ITEMS_PER_PAGE = 8;

  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(techStack.length / ITEMS_PER_PAGE);

  const visibleTech = techStack.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const education = [
    {
      degree: "BS Computer Science",
      institute: "(SEECS) NUST Islamabad",
      duration: "2024 - Present",
      color: "primary",
    },
    {
      degree: "FSc Pre-Engineering",
      institute: "Govt. College Peshawar",
      duration: "2022 - 2024",
      color: "secondary",
    },
    {
      degree: "Matriculation",
      institute: "Army Public School Risalpur Cantt",
      duration: "2020 - 2022",
      color: "primary",
    },
  ];

  const stats = [
    { label: 'Years Exp.', value: years, suffix: '+', color: 'text-primary', glow: 'rgba(56,189,248,0.15)' },
    { label: 'Projects Completed', value: 17, suffix: '+', color: 'text-secondary', glow: 'rgba(139,92,246,0.15)' },
    { label: 'Technologies', value: techStack.length - 1, suffix: '+', color: 'text-tertiary', glow: 'rgba(34,211,238,0.15)' },
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
              Passionate Full Stack and App Developer with a strong interest in AI, building modern web and mobile applications that are scalable, efficient, and user-focused. I enjoy turning ideas into impactful digital solutions through clean code and continuous learning.
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
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 rounded-3xl bg-[#0a0f1d]/60 backdrop-blur-xl border border-white/5 relative overflow-hidden group hover:border-primary/20 transition-all duration-300"
          >
            <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-secondary/5 blur-3xl group-hover:bg-secondary/10 transition-all duration-500" />

            <h3 className="font-headline-md text-xl md:text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl">
                work
              </span>
              Experience
            </h3>

            <div className="space-y-8 relative">

              <div className="absolute left-[5px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary via-secondary to-tertiary opacity-30" />

              {experience.map((job) => (

                <div
                  key={job.title + job.company}
                  className="relative pl-8"
                >

                  <div
                    className={`absolute left-0 top-2 w-3 h-3 rounded-full ${job.color === "primary"
                      ? "bg-primary"
                      : job.color === "secondary"
                        ? "bg-secondary"
                        : "bg-tertiary"
                      }`}
                  />

                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-2">

                    <div>

                      <h4 className="font-bold text-lg">
                        {job.title}
                      </h4>

                      <p
                        className={`text-sm font-semibold ${job.color === "primary"
                          ? "text-primary"
                          : job.color === "secondary"
                            ? "text-secondary"
                            : "text-tertiary"
                          }`}
                      >
                        {job.company}
                      </p>

                    </div>

                    <span className="text-xs">
                      {job.duration}
                    </span>

                  </div>

                  <p className="text-sm text-on-surface-variant/80 leading-relaxed">
                    {job.description}
                  </p>

                </div>

              ))}

            </div>
          </motion.div>

        </div>

        {/* Right Column: Education card + Tech Stack */}
        <div className="lg:col-span-4 space-y-8">

          {/* ================= Tech Stack ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="p-8 rounded-3xl bg-[#0a0f1d]/60 backdrop-blur-xl border border-white/5 relative overflow-hidden group hover:border-primary/20 transition-all duration-300"
          >
            <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-all duration-500" />

            <div className="flex justify-between items-center mb-8">
              <h3 className="font-headline-md text-xl md:text-2xl font-bold flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">
                  memory
                </span>
                Tech Stack
              </h3>

              <div className="flex gap-2">
                <button
                  onClick={() => setPage((page - 1 + totalPages) % totalPages)}
                  className="w-9 h-9"
                >
                  <span className="material-symbols-outlined text-xl">
                    chevron_left
                  </span>
                </button>

                <button
                  onClick={() => setPage((page + 1) % totalPages)}
                  className="w-9 h-9"
                >
                  <span className="material-symbols-outlined text-xl">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={page}
                  initial={{ x: 80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -80, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="grid grid-cols-4 gap-4 absolute inset-0"
                >
                  {visibleTech.map((tech) => {
                    const Icon = tech.icon;

                    return (
                      <div
                        key={tech.name}
                        className="flex flex-col items-center justify-center p-4 hover:scale-110 transition-all duration-300"
                      >
                        <Icon
                          size={30}
                          style={{ color: tech.color }}
                        />

                        <span className="mt-3 text-[11px] uppercase tracking-wide font-semibold text-center">
                          {tech.name}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ================= Education ================= */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="p-8 rounded-3xl bg-[#0a0f1d]/60 backdrop-blur-xl border border-white/5 relative overflow-hidden group hover:border-primary/20 transition-all duration-300"
          >

            <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-tertiary/5 blur-3xl group-hover:bg-tertiary/10 transition-all duration-500" />

            <h3 className="font-headline-md text-xl md:text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary text-2xl">
                school
              </span>
              Education
            </h3>

            <div className="space-y-8">

              {education.map((item, index) => (

                <div
                  key={item.degree}
                  className={index !== 0 ? "pt-6 border-t border-white/5" : ""}
                >

                  <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${item.color === "primary"
                    ? "text-primary"
                    : "text-secondary"
                    }`}>
                    {item.duration}
                  </p>

                  <h4 className="font-bold text-base">
                    {item.degree}
                  </h4>

                  <p className="text-sm text-on-surface-variant/70">
                    {item.institute}
                  </p>

                </div>

              ))}

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
