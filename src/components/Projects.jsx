import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';


export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Web Development', 'App Development', 'Game Development', 'AI', 'Other'];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeFilter === 'All' || project.tags.includes(activeFilter);
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 3D tilt hover handler for each card
  const Card = ({ project }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0 to 1
      const y = (e.clientY - rect.top) / rect.height; // 0 to 1
      const rotX = (y - 0.5) * -6; // Max rotation X degrees
      const rotY = (x - 0.5) * 8;  // Max rotation Y degrees

      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
      card.style.setProperty('--sheen-x', `${x * 100}%`);
      card.style.setProperty('--sheen-y', `${y * 100}%`);
    };

    const handleMouseLeave = () => {
      const card = cardRef.current;
      if (!card) return;
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    };

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="project-card bg-[#0a0f1d]/50 backdrop-blur-xl border border-white/5 group rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:border-primary/30 relative"
        style={{
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Soft sheen light catch reflection */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at var(--sheen-x, 50%) var(--sheen-y, 50%), rgba(56, 189, 248, 0.08) 0%, transparent 60%)`
          }}
        />

        {/* Card Image */}
        <div className="h-60 md:h-64 overflow-hidden relative">
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={project.image}
            alt={project.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#01030a] via-transparent to-transparent opacity-90" />
          <div className="absolute top-4 right-4">
            <span className="px-3.5 py-1 rounded-lg bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-primary/25">
              {project.badge}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-8 flex flex-col flex-grow relative z-10">
          <h3 className="font-headline-md text-xl md:text-2xl font-bold mb-3 text-on-surface group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-on-surface-variant/80 text-sm mb-6 leading-relaxed flex-grow">
            {project.description}
          </p>

          {/* Action links */}
          <div className="flex gap-6 pt-5 border-t border-white/5">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors duration-300"
            >
              <span className="material-symbols-outlined text-[18px]">terminal</span> Code
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors duration-300"
            >
              <span className="material-symbols-outlined text-[18px]">rocket_launch</span> Demo
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="py-24 max-w-[1280px] mx-auto px-6 md:px-16">
      {/* Header and Filter Controls */}
      <div className="mb-12">
        <h2 className="font-headline-lg text-3xl md:text-4xl font-bold text-on-surface mb-4">
          My <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">Projects</span>
        </h2>
        <p className="text-on-surface-variant max-w-xl mb-8 text-base">
          A collection of web applications, full-stack solutions, and creative digital experiences built with modern technologies
        </p>

        {/* Filter Categories & Search */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="flex flex-wrap gap-2.5 flex-grow">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeFilter === cat
                  ? 'bg-primary text-on-primary shadow-lg shadow-primary/20 hover:scale-[1.02]'
                  : 'bg-[#0a0f1d]/40 backdrop-blur-md border border-white/5 text-on-surface-variant hover:text-on-surface hover:border-white/10'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar input */}
          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/80 text-[20px] pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0f1d]/50 backdrop-blur-md border border-white/5 rounded-xl pl-11 pr-4 py-3 focus:border-primary/50 outline-none text-sm text-on-surface placeholder:text-on-surface-variant/50 transition-all duration-300 hover:border-white/10"
              placeholder="Search projects..."
            />
          </div>
        </div>
      </div>

      {/* Grid of Projects */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 rounded-3xl bg-[#0a0f1d]/30 border border-white/5">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 mb-3">
            folder_off
          </span>
          <p className="text-on-surface-variant">No matching projects found.</p>
        </div>
      )}
    </section>
  );
}
