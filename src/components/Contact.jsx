import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'System Architecture',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, this would send form data to an API endpoint.
    alert(`Initializing connection for ${formData.name}!`);
  };

  return (
    <section id="contact" className="py-24 max-w-[1280px] mx-auto px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        
        {/* Left Side: Headline and Info Cards */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <h2 className="font-headline-lg text-3xl md:text-5xl font-bold leading-tight text-on-surface mb-4">
              Let's build the <br />
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-secondary bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(56,189,248,0.25)]">
                next frontier.
              </span>
            </h2>
            <p className="text-on-surface-variant max-w-md text-base leading-relaxed">
              Open for remote opportunities worldwide. Let's discuss your system requirements.
            </p>
          </div>

          {/* Contact Details List */}
          <div className="space-y-5">
            {/* Email Card */}
            <a
              href="mailto:saad.m.khan@dev.com"
              className="flex items-center gap-5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 hover:bg-[#0a0f1d]/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-[0_0_10px_rgba(56,189,248,0.1)]">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-0.5">
                  Email
                </p>
                <p className="font-bold text-sm md:text-base text-on-surface group-hover:text-primary transition-colors duration-300">
                  saad.m.khan@dev.com
                </p>
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href="https://linkedin.com/in/saad"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-secondary/20 hover:bg-[#0a0f1d]/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-300 shadow-[0_0_10px_rgba(139,92,246,0.1)]">
                <span className="material-symbols-outlined">person</span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-0.5">
                  LinkedIn
                </p>
                <p className="font-bold text-sm md:text-base text-on-surface group-hover:text-secondary transition-colors duration-300">
                  linkedin.com/in/saad
                </p>
              </div>
            </a>

            {/* Resume Card (Downloads) */}
            <a
              href="#"
              download="saad-cv-2026.pdf"
              className="flex items-center gap-5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-tertiary/20 hover:bg-[#0a0f1d]/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-tertiary/10 border border-tertiary/20 flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform duration-300 shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                <span className="material-symbols-outlined">description</span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-0.5">
                  Resume
                </p>
                <p className="font-bold text-sm md:text-base text-on-surface group-hover:text-tertiary transition-colors duration-300">
                  saad-cv-2026.pdf
                </p>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Right Side: Form Container */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-8 rounded-3xl bg-[#0a0f1d]/55 backdrop-blur-xl border border-white/10 hover:border-primary/20 transition-all duration-500 shadow-2xl relative group"
        >
          {/* Custom backing halo light */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none rounded-3xl" />

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/75">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-[#01030a]/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 text-sm text-on-surface transition-all duration-300 hover:border-white/15"
                  placeholder="John Doe"
                />
              </div>
              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/75">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-[#01030a]/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 text-sm text-on-surface transition-all duration-300 hover:border-white/15"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Project Type */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/75">
                Project Type
              </label>
              <div className="relative">
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="w-full bg-[#01030a]/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 text-sm text-on-surface cursor-pointer appearance-none transition-all duration-300 hover:border-white/15"
                >
                  <option className="bg-[#0a0f1d]">System Architecture</option>
                  <option className="bg-[#0a0f1d]">ML Integration</option>
                  <option className="bg-[#0a0f1d]">Full-Stack Project</option>
                  <option className="bg-[#0a0f1d]">Consulting Inquiry</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-xl">
                  expand_more
                </span>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/75">
                Message
              </label>
              <textarea
                name="message"
                required
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full bg-[#01030a]/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 text-sm text-on-surface resize-none transition-all duration-300 hover:border-white/15"
                placeholder="Tell me about your project..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-primary text-on-primary font-bold rounded-xl hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden relative group"
            >
              Initialize Connection
              <span className="material-symbols-outlined text-[18px]">send</span>
              
              {/* Glow Sweep */}
              <span className="absolute top-0 left-[-60%] w-[40%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover:left-[130%] transition-all duration-700 ease-out" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
