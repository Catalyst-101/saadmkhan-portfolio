import React, { useState, useEffect } from 'react';
import img from "../assets/images/img.jfif";
import resume from "../assets/resume.pdf";
import { motion } from 'framer-motion';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const words = [
    "Full Stack Developer",
    "MERN Stack Developer",
    "Flutter Developer",
    "AI Enthusiast",
    "Computer Science Student @ NUST"
  ];

  // Typing effect loop
  useEffect(() => {
    let timer;
    const currentWord = words[wordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentWord.substring(0, typedText.length - 1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentWord.substring(0, typedText.length + 1));
      }, 100);
    }

    if (!isDeleting && typedText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 2000); // Wait before starting delete
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIndex]);

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const projectsSec = document.getElementById('projects');
    if (projectsSec) {
      projectsSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col lg:flex-row justify-center items-center pt-32 pb-16 gap-12 max-w-[1280px] mx-auto px-6 md:px-16"
    >
      {/* Left side text content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex-1 max-w-2xl text-left"
      >
        <span className="inline-block font-label-sm text-xs md:text-sm text-tertiary mb-3 tracking-[0.2em] uppercase select-none">
          Driven by Curiosity, Powered by Code
        </span>
        <h1 className="font-headline-xl text-4xl md:text-6xl mb-4 leading-tight font-bold tracking-tight text-on-surface">
          Hi, I'm <br />
          <span className="bg-gradient-to-r from-primary via-cyan-400 to-secondary bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            Saad Muhammad Khan
          </span>
        </h1>
        <div className="font-headline-md text-xl md:text-2xl text-on-surface-variant mb-6 min-h-[1.6em]">
          I am a{' '}
          <span className="text-primary font-bold border-r-2 border-primary pr-1 typing-cursor animate-pulse">
            {typedText}
          </span>
        </div>
        <p className="text-on-surface-variant/80 text-sm md:text-base mb-8 leading-relaxed max-w-lg">
          Full-stack developer passionate about building modern web apps, mobile applications, and AI-powered solutions.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#projects"
            onClick={handleScrollToProjects}
            className="px-8 py-4 bg-primary text-on-primary font-bold rounded-xl transition-all hover:shadow-[0_0_30px_rgba(56,189,248,0.45)] flex items-center gap-2 hover:scale-[1.03] transition-transform duration-300 relative group overflow-hidden"
          >
            View Projects
            <span className="material-symbols-outlined text-[18px]">north_east</span>
            <span className="absolute top-0 left-[-60%] w-[40%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover:left-[130%] transition-all duration-700 ease-out" />
          </a>
          <a
            href={resume}
            download="Saad_Muhammad_Khan_Resume.pdf"
            className="px-8 py-4 bg-white/5 backdrop-blur-md text-on-surface font-bold rounded-xl hover:bg-white/10 transition-all border border-white/10 flex items-center gap-2 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] transition-transform duration-300"
          >
            Download Resume
            <span className="material-symbols-outlined text-[18px]">download</span>
          </a>
        </div>
      </motion.div>

      {/* Right side interactive profile animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, ease: 'easeOut', delay: 0.2 }}
        className="flex-1 relative flex justify-center items-center"
      >
        <motion.div
          animate={{
            y: [-12, 12, -12],
            rotate: [-1, 1.5, -1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="relative w-72 h-72 md:w-[420px] md:h-[420px]"
        >
          {/* Orbit glowing circles */}
          <div className="absolute inset-0 rounded-full border border-primary/20 shadow-[0_0_30px_rgba(56,189,248,0.15)] animate-pulse" />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-4 rounded-full border border-secondary/15 shadow-[inset_0_0_20px_rgba(139,92,246,0.1)]"
          />

          {/* Profile Container */}
          <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-white/10 bg-surface-variant shadow-2xl flex items-center justify-center">
            <img
              alt="Saad Muhammad Khan"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
              src={img}
            />
          </div>

          {/* Pulsing visual ring overlays */}
          <div className="absolute inset-0 rounded-full border border-primary/40 animate-ping opacity-20 pointer-events-none" style={{ animationDuration: '3s' }} />

          {/* Satellites orbiting */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_12px_4px_rgba(34,211,238,0.8)]" />
          </motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 rounded-sm bg-purple-400 shadow-[0_0_12px_3px_rgba(168,85,247,0.7)] rotate-45" />
          </motion.div>

          {/* Drifting space dust / flares */}
          <div className="absolute top-[8%] left-[15%] w-8 h-8 rounded-full bg-primary/20 blur-xl animate-pulse" />
          <div className="absolute bottom-[10%] right-[12%] w-10 h-10 rounded-full bg-secondary/20 blur-xl animate-pulse" style={{ animationDelay: '1.5s' }} />

          {/* Tiny corner planetoids */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full blur-[1px] animate-bounce" style={{ animationDuration: '4s' }} />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-secondary rounded-full blur-[2px] animate-pulse" style={{ animationDuration: '5s' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
