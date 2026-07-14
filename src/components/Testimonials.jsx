import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Testimonials() {
  const testimonialList = [
    {
      id: 1,
      name: "Shah Khalid",
      role: "Electrician",
      feedback: "GeoPlot is very good. I used it to calculate the roof area of a house to install solar plates. It is easy to use and very accurate.",
      rating: 5,
      initials: "SK",
      gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
      glow: "rgba(245, 158, 11, 0.15)"
    },
    {
      id: 2,
      name: "Muhammad Kaif bin Abubakar",
      role: "CS Student at NUST",
      feedback: "I built SportScope with Saad. He made a beautiful user interface and did all the frontend integration perfectly. Excellent developer.",
      rating: 5,
      initials: "MK",
      gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
      glow: "rgba(56, 189, 248, 0.15)"
    },
    {
      id: 3,
      name: "Aftab Wahab",
      role: "CFO at AptechMedia",
      feedback: "Saad was a great intern at our company. He is very fast, hardworking, and completes all tasks on time. We highly recommend him.",
      rating: 5,
      initials: "AW",
      gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
      glow: "rgba(139, 92, 246, 0.15)"
    },
    {
      id: 4,
      name: "Muhammad Ullah",
      role: "Principal at Pen & Page Academia",
      feedback: "Saad is a fantastic teacher and developer. He made learning easy for our students and built high-quality software for our school.",
      rating: 5,
      initials: "MU",
      gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
      glow: "rgba(16, 185, 129, 0.15)"
    },
    {
      id: 5,
      name: "Sami",
      role: "Clinic Owner",
      feedback: "Saad created a website for my clinic. It looks very beautiful and loads fast. My patients love using it!",
      rating: 5,
      initials: "SM",
      gradient: "from-rose-500/20 via-red-500/10 to-transparent",
      glow: "rgba(244, 63, 94, 0.15)"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Autoplay functionality
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, isMobile]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonialList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === testimonialList.length - 1 ? 0 : prev + 1));
  };

  // Determine which testimonials are currently visible
  const getVisibleTestimonials = () => {
    if (isMobile) {
      return [testimonialList[currentIndex]];
    }
    // On desktop, show 3 testimonials starting at currentIndex
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(testimonialList[(currentIndex + i) % testimonialList.length]);
    }
    return visible;
  };

  const visibleList = getVisibleTestimonials();

  // Slide variants for smooth animation
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <section id="testimonials" className="py-24 max-w-[1280px] mx-auto px-6 md:px-16 overflow-hidden">
      <div className="mb-16 flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
        <div className="text-center md:text-left">
          <h2 className="font-headline-lg text-3xl md:text-4xl font-bold text-on-surface">
            Client & Collaborator <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">Feedback</span>
          </h2>
          <p className="text-on-surface-variant max-w-xl mt-4 text-base">
            What local clients and project coordinators say about my work.
          </p>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="p-3 rounded-2xl border border-white/5 bg-[#0a0f1d]/40 text-on-surface-variant hover:text-on-surface hover:border-primary/30 transition-all duration-300 active:scale-95 shadow-md"
            aria-label="Previous Testimonial"
          >
            <span className="material-symbols-outlined block text-[22px]">chevron_left</span>
          </button>
          <button
            onClick={handleNext}
            className="p-3 rounded-2xl border border-white/5 bg-[#0a0f1d]/40 text-on-surface-variant hover:text-on-surface hover:border-primary/30 transition-all duration-300 active:scale-95 shadow-md"
            aria-label="Next Testimonial"
          >
            <span className="material-symbols-outlined block text-[22px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Moving Carousel Container */}
      <div className="relative min-h-[340px] md:min-h-[320px] w-full flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
          >
            {visibleList.map((item) => (
              <div
                key={item.id}
                className="group relative p-8 rounded-3xl bg-[#0a0f1d]/50 backdrop-blur-xl border border-white/5 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-primary/20 shadow-xl h-full"
              >
                {/* Glowing quote background */}
                <span className="material-symbols-outlined absolute right-6 top-6 text-white/[0.02] group-hover:text-primary/[0.04] text-7xl select-none pointer-events-none transition-colors duration-500">
                  format_quote
                </span>

                {/* Glowing backlight overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 10% 10%, ${item.glow} 0%, transparent 60%)`
                  }}
                />

                <div>
                  {/* Star Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(item.rating)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[18px] text-amber-400 select-none drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
                        star
                      </span>
                    ))}
                  </div>

                  {/* Feedback Content */}
                  <p className="text-on-surface-variant/90 text-sm leading-relaxed mb-8 italic">
                    "{item.feedback}"
                  </p>
                </div>

                {/* User Metadata */}
                <div className="flex items-center gap-4 pt-5 border-t border-white/5">
                  {/* Initials Avatar */}
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center border border-white/10 text-white font-bold text-sm tracking-wider shadow-[0_0_15px_rgba(255,255,255,0.05)] shrink-0`}>
                    {item.initials}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors duration-300 truncate">
                      {item.name}
                    </h4>
                    <p className="text-on-surface-variant/60 text-xs truncate">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination indicators (Dots) */}
      <div className="flex justify-center items-center gap-2.5 mt-10">
        {testimonialList.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? 'w-6 bg-primary shadow-[0_0_8px_rgba(56,189,248,0.5)]'
                : 'w-2 bg-white/10 hover:bg-white/30'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
