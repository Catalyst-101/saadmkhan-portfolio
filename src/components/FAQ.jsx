import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const [activeId, setActiveId] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What is your primary tech stack?",
      answer:
        "I primarily build full-stack web applications using the MERN Stack (MongoDB, Express.js, React, and Node.js). I also develop cross-platform mobile applications with Flutter and Firebase, and work with Python for AI, machine learning, and computer vision projects."
    },
    {
      id: 2,
      question: "Are you available for freelance projects?",
      answer:
        "Yes. I'm available for freelance work, internships, and collaborative software projects involving web development, mobile applications, AI solutions, and custom software."
    },
    {
      id: 3,
      question: "What services do you provide?",
      answer:
        "I develop responsive websites, MERN stack applications, Flutter mobile apps, REST APIs, admin dashboards, AI-powered solutions, and database-driven systems tailored to client requirements."
    },
    {
      id: 4,
      question: "How can we work together?",
      answer:
        "You can contact me through the contact section or email me directly. After discussing your requirements, I'll propose the best technology stack, timeline, and development plan for your project."
    }
  ];

  const handleToggle = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 max-w-[1280px] mx-auto px-6 md:px-16">
      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-start">
        
        {/* LEFT COLUMN: Accordion container */}
        <div className="space-y-4 order-2 lg:order-1">
          {faqs.map((faq) => {
            const isOpen = activeId === faq.id;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ x: 5 }}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden cursor-pointer bg-[#0a0f1d]/50 backdrop-blur-xl relative ${
                  isOpen
                    ? 'border-secondary/40 shadow-[0_0_20px_rgba(var(--secondary-rgb,236,72,153),0.1)] bg-[#0a0f1d]/70'
                    : 'border-white/5 hover:border-white/10 hover:bg-[#0a0f1d]/60'
                }`}
                onClick={() => handleToggle(faq.id)}
              >
                {/* Thin top gradient line when active */}
                {isOpen && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-secondary to-cyan-400" />
                )}

                {/* Accordion Header */}
                <div className="flex justify-between items-center p-7 select-none">
                  <h4 className={`font-bold text-sm md:text-base transition-colors duration-300 ${
                    isOpen ? 'text-secondary' : 'text-on-surface'
                  }`}>
                    {faq.question}
                  </h4>
                  
                  {/* Arrow Icon rotating 270 degrees when active */}
                  <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${
                    isOpen ? 'transform rotate-270 text-secondary' : ''
                  }`}>
                    expand_more
                  </span>
                </div>

                {/* Accordion Content wrapper */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-7 pb-7 pt-0 text-on-surface-variant/80 text-sm leading-7 border-t border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: Technical Insights Heading Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:sticky lg:top-28 relative order-1 lg:order-2"
        >
          <h2 className="font-headline-lg text-4xl font-bold text-on-surface leading-tight">
            Technical{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              Insights
            </span>
          </h2>
          <p className="mt-6 text-on-surface-variant leading-relaxed">
            Answers to some of the most common questions about my technical expertise,
            development process, and the technologies I use to build modern digital
            products.
          </p>
          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">verified</span>
              <p className="text-on-surface-variant">Full Stack Development</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">verified</span>
              <p className="text-on-surface-variant">Flutter Mobile Apps</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">verified</span>
              <p className="text-on-surface-variant">Artificial Intelligence</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}