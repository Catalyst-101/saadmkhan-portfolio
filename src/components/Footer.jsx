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

      <div className="max-w-[1280px] mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-center items-center gap-8 relative z-10">

        {/* Left Side: Brand Logo and Copyright */}
        <div className="text-center justify-center items-center">
          <p className="font-headline-md text-5xl font-bold tracking-tighter text-primary">
            SAAD MUHAMMAD KHAN
          </p>
          <p className="text-sm text-on-surface-variant/60 mt-1.5 font-medium">
            &copy; {new Date().getFullYear()} Personal Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
