import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Testimonials', href: '#testimonials', id: 'testimonials' },
    { label: 'Contact', href: '#contact', id: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // IntersectionObserver to highlight active nav link
    const sections = ['home', 'about', 'services', 'projects', 'testimonials', 'contact'];
    const observers = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
      );
      observer.observe(el);
      observers.push({ observer, el });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observers.forEach(({ observer, el }) => observer.unobserve(el));
    };
  }, []);

  const handleHireMeClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Dark Semi-transparent Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 min-[1025px]:hidden z-[90]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isMobileMenuOpen
            ? 'bg-[#0a0f1d]/40 backdrop-blur-xl border-b border-primary/20 py-4'
            : isScrolled
              ? 'bg-[#01030a]/80 backdrop-blur-md border-b border-primary/20 shadow-[0_4px_30px_rgba(56,189,248,0.15)] py-4'
              : 'bg-transparent py-6'
        }`}
      >
        <div className="flex justify-between items-center px-6 md:px-16 w-full max-w-[1280px] mx-auto">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="font-headline-md text-2xl font-bold tracking-tighter text-primary select-none"
          >
            Saad.<span className="text-on-surface">dev</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden min-[1025px]:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`font-label-sm text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${
                  activeSection === link.id
                    ? 'text-primary drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Hire Me Button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleHireMeClick}
              className="relative hidden sm:inline-flex bg-primary/10 border border-primary/30 text-primary px-6 py-2 rounded-xl font-label-sm text-sm font-bold hover:bg-primary hover:text-on-primary transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.2)] overflow-hidden group"
            >
              Hire Me
              <span className="absolute top-0 left-[-60%] w-[40%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover:left-[130%] transition-all duration-700 ease-out" />
            </button>

            {/* Hamburger Icon */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="min-[1025px]:hidden flex items-center text-on-surface p-2 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-3xl">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`min-[1025px]:hidden fixed inset-x-0 top-[72px] bg-[#0a0f1d]/40 backdrop-blur-xl border-b border-primary/20 shadow-2xl transition-all duration-300 ease-in-out origin-top overflow-hidden ${
            isMobileMenuOpen ? 'max-h-[450px] opacity-100 py-6' : 'max-h-0 opacity-0 py-0'
          }`}
        >
          <div className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`font-label-sm text-base font-semibold tracking-wide uppercase transition-colors ${
                  activeSection === link.id ? 'text-primary' : 'text-on-surface-variant'
                }`}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                handleHireMeClick();
              }}
              className="w-4/5 py-3 bg-primary text-on-primary text-center font-bold rounded-xl shadow-lg hover:shadow-primary/30 transition-all duration-300"
            >
              Hire Me
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
