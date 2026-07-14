import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';

export default function FeaturedProjects() {
  // Select top projects: GeoPlot (1), SportScope (2), Multilingual Polarization Detection (3)
  const featuredList = projects.filter(p => [1, 2, 3].includes(p.id));

  return (
    <section id="featured-projects" className="py-24 max-w-[1280px] mx-auto px-6 md:px-16">
      <div className="mb-16 text-center md:text-left">
        <h2 className="font-headline-lg text-3xl md:text-4xl font-bold text-on-surface">
          Featured <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">Showcase</span>
        </h2>
        <p className="text-on-surface-variant max-w-xl mt-4 text-base">
          A hand-picked selection of full-scale applications and advanced systems representing my core capabilities.
        </p>
      </div>

      <div className="space-y-16 lg:space-y-24">
        {featuredList.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="group relative bg-[#0a0f1d]/40 backdrop-blur-xl border border-white/5 rounded-[32px] overflow-hidden hover:border-primary/20 transition-all duration-500 shadow-2xl"
            >
              {/* Soft sheen light catch reflection */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${isEven ? '20%' : '80%'} 30%, rgba(56, 189, 248, 0.05) 0%, transparent 60%)`
                }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 p-6 md:p-8 lg:p-12 items-center">
                {/* Image Side */}
                <div className={`lg:col-span-6 relative rounded-2xl overflow-hidden h-64 md:h-80 lg:h-96 group/img ${
                  isEven ? 'lg:order-1' : 'lg:order-2'
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#01030a] via-transparent to-transparent opacity-40 z-10" />
                  <img
                    className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 group-hover/img:scale-[1.03] transition-all duration-700 ease-out"
                    src={project.image}
                    alt={project.title}
                  />
                  {/* Floating badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3.5 py-1.5 rounded-xl bg-[#0a0f1d]/85 text-primary text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-primary/20 shadow-lg">
                      {project.badge}
                    </span>
                  </div>
                </div>

                {/* Content Side */}
                <div className={`lg:col-span-6 flex flex-col justify-center relative ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                }`}>
                  {/* Huge background index number */}
                  <div className="absolute -right-2 -top-10 lg:-top-16 text-[90px] md:text-[130px] font-black text-white/[0.02] select-none pointer-events-none font-headline-xl">
                    {`0${index + 1}`}
                  </div>

                  <h3 className="font-headline-md text-2xl md:text-3xl font-bold mb-4 text-on-surface group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-on-surface-variant/80 text-sm md:text-base leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.slice(0, 5).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[11px] font-semibold text-on-surface-variant/90 hover:border-primary/20 hover:text-primary transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/5">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-primary text-on-primary text-xs font-bold uppercase tracking-wider rounded-xl hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:scale-[1.02] transition-all duration-300 flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">rocket_launch</span> Live Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-white/5 hover:bg-white/10 text-on-surface text-xs font-bold uppercase tracking-wider rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">terminal</span> View Code
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
