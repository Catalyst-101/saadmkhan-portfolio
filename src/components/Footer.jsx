import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Generate 8 random stars for the footer backdrop scene
  const footerStars = [
    { top: '15%', left: '8%', delay: '0s' },
    { top: '35%', left: '22%', delay: '0.4s' },
    { top: '60%', left: '12%', delay: '0.8s' },
    { top: '20%', left: '85%', delay: '0.6s' },
    { top: '70%', left: '90%', delay: '1.2s' },
    { top: '45%', left: '60%', delay: '0.2s' },
    { top: '80%', left: '40%', delay: '1.0s' },
    { top: '25%', left: '48%', delay: '1.4s' }
  ];

  return (
    <footer className="mt-24 border-t border-white/5 bg-[#000103] py-12 relative z-20 overflow-hidden">
      
      {/* Decorative Space Scene Backdrops */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Soft Purple/Blue Nebula glow */}
        <div className="absolute -top-10 right-10 w-48 h-48 rounded-full bg-secondary/5 blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-0 left-1/4 w-72 h-24 rounded-[100%] bg-primary/5 blur-2xl pointer-events-none" />

        {/* Twinkling Footer Stars */}
        {footerStars.map((star, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full bg-blue-100 shadow-[0_0_4px_1px_rgba(207,230,255,0.7)] animate-pulse"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        
        {/* Left Side: Brand Logo and Copyright */}
        <div className="text-center md:text-left">
          <p className="font-headline-md text-xl font-bold tracking-tighter text-primary">
            Saad Muhammad Khan
          </p>
          <p className="text-xs text-on-surface-variant/60 mt-1.5 font-medium">
            &copy; {new Date().getFullYear()} Engineering Portfolio. All rights reserved.
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors duration-300 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">link</span>
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant hover:text-secondary transition-colors duration-300 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">person</span>
            LinkedIn
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant hover:text-pink-400 transition-colors duration-300 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">photo_camera</span>
            Instagram
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors duration-300"
          >
            Contact
          </a>
        </div>

        {/* Right Side: Back to Top */}
        <button
          onClick={handleBackToTop}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/5 hover:border-primary/25 hover:bg-[#0a0f1d]/50 text-xs font-bold uppercase tracking-wider text-on-surface-variant hover:text-primary transition-all duration-300 group"
          id="back-to-top"
          aria-label="Scroll back to top"
        >
          <span className="material-symbols-outlined text-sm transition-transform duration-300 group-hover:-translate-y-1">
            rocket_launch
          </span>
          Back to top
        </button>
      </div>
    </footer>
  );
}
