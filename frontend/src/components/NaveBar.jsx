import React, { useState, useEffect } from 'react';
import { Menu, X, Github } from 'lucide-react';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // 1. Handle Scroll Logic
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Added 'Certifications' back to the list
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' }, // ✅ Restored
    { name: 'Contact', href: '#contact' },
  ];

  return (
    // OUTER CONTAINER
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-out 
      ${isScrolled ? 'pt-4' : 'pt-0'}`}
    >

      {/* INNER NAV */}
      <nav
        className={`
          transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] border overflow-hidden
          ${
          // STATE 1: Mobile Menu OPEN (Big Box)
          isOpen
            ? 'w-[95%] md:w-[90%] bg-black rounded-3xl border-white/10 shadow-2xl'
            : // STATE 2: Scrolled Down (Floating Capsule)
            isScrolled
              ? 'w-[90%] md:w-[75%] lg:w-[65%] bg-black/60 backdrop-blur-xl rounded-full border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
              : // STATE 3: Top of Page (Full Width)
              'w-full bg-transparent border-transparent rounded-none'
          }
        `}
      >
        <div className={`px-6 md:px-8 flex justify-between items-center ${isScrolled ? 'py-3' : 'py-5'} transition-all duration-300`}>

          {/* ================= LOGO ================= */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-bold text-xs shadow-lg group-hover:rotate-12 transition-transform duration-300">
              CK
            </div>
            <span className="font-bold text-lg tracking-wide text-white group-hover:text-blue-400 transition-colors">
              CodingInKannada
            </span>
          </div>

          {/* ================= DESKTOP LINKS ================= */}
          {/* Hidden on Mobile, Visible on Desktop */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1 border border-white/5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-3 py-1.5 text-xs lg:text-sm font-medium text-gray-300 hover:text-white transition-all rounded-full hover:bg-white/10"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* ================= RIGHT ACTION (GitHub) ================= */}
          <div className="hidden md:flex items-center">
            <a
              href="https://github.com/Naveen-gale"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all
               ${isScrolled ? 'bg-white text-black hover:bg-gray-200' : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'}`}
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
          </div>

          {/* ================= MOBILE TOGGLE ================= */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 hover:bg-white/10 rounded-full transition-colors focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU CONTENT ================= */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 pb-6' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="flex flex-col items-center gap-2 px-4 pt-2">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all border border-transparent hover:border-white/5"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

      </nav>
    </div>
  );
};

export default NavBar;