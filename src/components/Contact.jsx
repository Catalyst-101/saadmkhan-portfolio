import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import resume from "../assets/resume.pdf";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'General Inquiry',
    message: ''
  });

  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name.';
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'An email address is required.';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please type a message before sending.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus('sending');

    try {
      const dataToSend = new FormData();
      dataToSend.append("access_key", "72b53302-5293-46f1-a051-17fb9957fd0b");
      dataToSend.append("name", formData.name);
      dataToSend.append("email", formData.email);
      dataToSend.append("subject", `New Contact Form Message: ${formData.inquiryType}`);
      dataToSend.append("inquiry_type", formData.inquiryType);
      dataToSend.append("message", formData.message);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: dataToSend
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          inquiryType: 'General Inquiry',
          message: ''
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 max-w-[1280px] mx-auto px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

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
              Open for remote opportunities worldwide. Whether it's a project, a question, or just a suggestion, I'd love to hear from you.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">

            <a
              href="mailto:skyisblack95@gmail.com"
              className="w-[120px] flex flex-col items-center justify-center gap-2 px-2 py-3 rounded-2xl bg-white/5 border border-white/5 hover:border-secondary/30 hover:bg-[#0a0f1d]/50 transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary group-hover:scale-110 transition-all duration-300 shadow-[0_0_16px_rgba(139,92,246,0.15)]">
                <span className="material-symbols-outlined text-[22px]">
                  mail
                </span>
              </div>

              <span className="text-sm font-semibold text-on-surface group-hover:text-secondary transition-colors">
                Email
              </span>
            </a>

            <a
              href="https://github.com/Catalyst-101"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[120px] flex flex-col items-center justify-center gap-2 px-1 py-3 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-[#0a0f1d]/50 transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-all duration-300 shadow-[0_0_16px_rgba(56,189,248,0.15)]">
                <FaGithub className="text-[22px]" />
              </div>

              <span className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                GitHub
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/smk-cs24"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[120px] flex flex-col items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-[#0a0f1d]/50 transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-all duration-300 shadow-[0_0_16px_rgba(56,189,248,0.15)]">
                <FaLinkedin className="text-[22px]" />
              </div>

              <span className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                LinkedIn
              </span>
            </a>

            <a
              href={resume}
              download="Saad_Muhammad_Khan_Resume.pdf"
              className="w-[120px] flex flex-col items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-[#0a0f1d]/50 transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-all duration-300 shadow-[0_0_16px_rgba(56,189,248,0.15)]">
                <span className="material-symbols-outlined text-[22px]">
                  download
                </span>
              </div>

              <span className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                Resume
              </span>
            </a>

          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-8 rounded-3xl bg-[#0a0f1d]/55 backdrop-blur-xl border border-white/10 hover:border-primary/20 transition-all duration-500 shadow-2xl relative group"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none rounded-3xl" />

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/75">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full bg-[#01030a]/40 border rounded-xl px-4 py-3 outline-none text-sm text-on-surface transition-all duration-300 hover:border-white/15 ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary/50'
                    }`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-xs text-red-400 mt-1">{errors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/75">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full bg-[#01030a]/40 border rounded-xl px-4 py-3 outline-none text-sm text-on-surface transition-all duration-300 hover:border-white/15 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary/50'
                    }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/75">
                Inquiry Type
              </label>
              <div className="relative">
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleInputChange}
                  className="w-full bg-[#01030a]/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 text-sm text-on-surface cursor-pointer appearance-none transition-all duration-300 hover:border-white/15"
                >
                  <option className="bg-[#0a0f1d]">General Inquiry</option>
                  <option className="bg-[#0a0f1d]">Project Collaboration</option>
                  <option className="bg-[#0a0f1d]">Job Opportunity</option>
                  <option className="bg-[#0a0f1d]">Consulting Inquiry</option>
                  <option className="bg-[#0a0f1d]">Feedback / Suggestion</option>
                  <option className="bg-[#0a0f1d]">Other</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-xl">
                  expand_more
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/75">
                Message
              </label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full bg-[#01030a]/40 border rounded-xl px-4 py-3 outline-none text-sm text-on-surface resize-none transition-all duration-300 hover:border-white/15 ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary/50'
                  }`}
                placeholder="Tell me what's on your mind..."
              />
              {errors.message && (
                <p className="text-xs text-red-400 mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-4 bg-primary text-on-primary font-bold rounded-xl hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden relative group disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
              <span className="material-symbols-outlined text-[18px]">send</span>

              <span className="absolute top-0 left-[-60%] w-[40%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover:left-[130%] transition-all duration-700 ease-out" />
            </button>

            {status === 'success' && (
              <p className="text-sm text-center text-primary font-semibold">
                Message sent! I'll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="text-sm text-center text-red-400 font-semibold">
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}