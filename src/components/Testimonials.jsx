import React from 'react';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const testimonialList = [
    {
      id: 1,
      name: "Arsalan Shah",
      role: "Lead Architect at AptechMedia",
      feedback: "Saad's ability to turn complex logic into a clean MERN interface was outstanding. He is an excellent full-stack developer who communicates clearly and writes clean, production-ready code.",
      rating: 5,
      initials: "AS",
      gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
      glow: "rgba(56, 189, 248, 0.15)"
    },
    {
      id: 2,
      name: "David Miller",
      role: "Product Manager / Tech Lead",
      feedback: "The Flutter application Saad built is extremely fast and responsive. His grasp of cross-platform state management and custom offline caching exceeded our team's expectations. A top-tier developer!",
      rating: 5,
      initials: "DM",
      gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
      glow: "rgba(139, 92, 246, 0.15)"
    },
    {
      id: 3,
      name: "Dr. Amina Yusuf",
      role: "AI Research Director",
      feedback: "We integrated Saad's multilingual XLM-RoBERTa model into our text classification pipeline. His deep learning solution was highly accurate, robust, and easily integrated. Outstanding work!",
      rating: 5,
      initials: "AY",
      gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
      glow: "rgba(16, 185, 129, 0.15)"
    }
  ];

  return (
    <section id="testimonials" className="py-24 max-w-[1280px] mx-auto px-6 md:px-16">
      <div className="mb-16 text-center md:text-left">
        <h2 className="font-headline-lg text-3xl md:text-4xl font-bold text-on-surface">
          Client & Collaborator <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">Feedback</span>
        </h2>
        <p className="text-on-surface-variant max-w-xl mt-4 text-base">
          What tech leaders and project coordinators say about my engineering standards, reliability, and solution architectures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonialList.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative p-8 rounded-3xl bg-[#0a0f1d]/50 backdrop-blur-xl border border-white/5 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-primary/20 shadow-xl min-h-[320px]"
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}
