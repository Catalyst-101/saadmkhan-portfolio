import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const [activeId, setActiveId] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'What is your primary tech stack?',
      answer: 'I focus on the TypeScript ecosystem (React, Next.js, Node.js) for frontend/backend, coupled with Python (PyTorch, TensorFlow) for machine learning. For high-performance infrastructure, I utilize Go and Rust.'
    },
    {
      id: 2,
      question: 'Are you available for freelance projects?',
      answer: 'Yes, I am currently open to high-impact collaborations and architectural consulting for startups and enterprise teams.'
    },
    {
      id: 3,
      question: 'What kind of AI services do you offer?',
      answer: 'My expertise includes LLM fine-tuning, RAG (Retrieval-Augmented Generation) systems, custom predictive models, and integrating AI features into existing web ecosystems.'
    }
  ];

  const handleToggle = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="py-24 max-w-[768px] mx-auto px-6 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="font-headline-lg text-3xl md:text-4xl font-bold text-on-surface mb-3">
          Technical <span className="bg-gradient-to-r from-tertiary to-cyan-400 bg-clip-text text-transparent">Insights</span>
        </h2>
        <p className="text-on-surface-variant text-base">
          Common inquiries regarding my workflow and methodology.
        </p>
      </motion.div>

      {/* Accordion container */}
      <div className="space-y-4">
        {faqs.map((faq) => {
          const isOpen = activeId === faq.id;

          return (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer bg-[#0a0f1d]/50 backdrop-blur-xl ${
                isOpen
                  ? 'border-primary/40 shadow-[0_0_20px_rgba(56,189,248,0.12)] bg-[#0a0f1d]/70'
                  : 'border-white/5 hover:border-white/10 hover:bg-[#0a0f1d]/60'
              }`}
              onClick={() => handleToggle(faq.id)}
            >
              {/* Accordion Header */}
              <div className="flex justify-between items-center p-6 select-none">
                <h4 className={`font-bold text-sm md:text-base transition-colors duration-300 ${
                  isOpen ? 'text-primary' : 'text-on-surface'
                }`}>
                  {faq.question}
                </h4>
                
                {/* Arrow Icon */}
                <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${
                  isOpen ? 'transform rotate-180 text-primary' : ''
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
                    <div className="px-6 pb-6 pt-0 text-on-surface-variant/80 text-xs md:text-sm leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
