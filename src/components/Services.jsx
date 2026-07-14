import React from 'react';
import { motion } from 'framer-motion';

export default function Services() {
  const servicesList = [
    {
      id: 1,
      title: "Full-Stack Development",
      description: "Building responsive, robust, and scalable web applications utilizing the modern MERN stack. Tailored for seamless user experience and business operations.",
      icon: "code",
      color: "primary",
      glow: "rgba(56, 189, 248, 0.15)",
      details: ["MERN Stack Applications", "Interactive Dashboards", "Responsive Web Design"]
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Designing and developing smooth, native-performance cross-platform mobile apps for iOS and Android using Flutter and robust backends like Firebase.",
      icon: "phone_android",
      color: "secondary",
      glow: "rgba(139, 92, 246, 0.15)",
      details: ["Flutter Cross-Platform", "State Management & APIs", "Offline Data Sync"]
    },
    {
      id: 3,
      title: "AI & Intelligent Systems",
      description: "Implementing cutting-edge artificial intelligence, natural language processing (NLP), deep learning model training, and computer vision pipelines.",
      icon: "psychology",
      color: "tertiary",
      glow: "rgba(34, 211, 238, 0.15)",
      details: ["NLP & Text Classification", "Deep Learning (PyTorch)", "Computer Vision (CNNs)"]
    },
    {
      id: 4,
      title: "API & Backend Solutions",
      description: "Architecting high-availability RESTful APIs, implementing JWT-based secure authentication protocols, and structuring relational/NoSQL databases.",
      icon: "database",
      color: "emerald-400",
      glow: "rgba(16, 185, 129, 0.15)",
      details: ["RESTful API Architecture", "Database Design (Mongo/SQL)", "Secure JWT Authentication"]
    }
  ];

  return (
    <section id="services" className="py-24 max-w-[1280px] mx-auto px-6 md:px-16">
      <div className="mb-16 text-center md:text-left">
        <h2 className="font-headline-lg text-3xl md:text-4xl font-bold text-on-surface">
          My <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">Services</span>
        </h2>
        <p className="text-on-surface-variant max-w-xl mt-4 text-base">
          Providing premium digital solutions, specialized engineering, and custom software architecture designed to bring your vision to life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {servicesList.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative p-8 rounded-3xl bg-[#0a0f1d]/50 backdrop-blur-xl border border-white/5 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-primary/20"
          >
            {/* Glowing backlight overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 20%, ${service.glow} 0%, transparent 60%)`
              }}
            />

            <div>
              {/* Service Icon with Glow */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 mb-8 group-hover:border-primary/30 transition-all duration-300 relative">
                <span className={`material-symbols-outlined text-2xl transition-colors duration-300 ${
                  service.color === 'primary' ? 'text-primary' : 
                  service.color === 'secondary' ? 'text-secondary' :
                  service.color === 'tertiary' ? 'text-tertiary' : 'text-emerald-400'
                }`}>
                  {service.icon}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-headline-md text-xl font-bold mb-4 text-on-surface group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-on-surface-variant/80 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
            </div>

            {/* Features List */}
            <ul className="space-y-2.5 pt-4 border-t border-white/5">
              {service.details.map((detail) => (
                <li key={detail} className="flex items-center gap-2.5 text-xs text-on-surface-variant/70">
                  <span className={`material-symbols-outlined text-[16px] ${
                    service.color === 'primary' ? 'text-primary' : 
                    service.color === 'secondary' ? 'text-secondary' :
                    service.color === 'tertiary' ? 'text-tertiary' : 'text-emerald-400'
                  }`}>
                    check_circle
                  </span>
                  {detail}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
