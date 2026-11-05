import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github } from 'lucide-react';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // Track the actual scrollY via a ref so we never trigger re-renders inside rAF
  const scrolledRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const scrolled = window.scrollY > 50;
        // Only call setState when the value actually changes — prevents unnecessary renders
        if (scrolled !== scrolledRef.current) {
          scrolledRef.current = scrolled;
          setIsScrolled(scrolled);
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    /*
     * OUTER CONTAINER
     * — Only `transform` (translateY via pt-*) is animated, never width/top/left.
     * — `will-change: transform` hoists this layer onto the GPU so the browser
     *   composites it without touching the main paint layer.
     * — Avoid `transition-all` — it triggers transitions on EVERY CSS property,
     *   including expensive layout props like `padding`.  Use explicit properties.
     */
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center will-change-transform
        ${isScrolled ? 'pt-4' : 'pt-0'}
        transition-[padding] duration-500 ease-out`}
    >
      {/*
       * INNER NAV
       * — Only animate `width`, `border-radius`, `background-color`, and `border-color`.
       *   These are cheap composite/paint-only operations.
       * — `backdrop-blur` is intentionally downgraded from `backdrop-blur-xl` to
       *   `backdrop-blur-md` on the capsule.  `blur-xl` (40px) forces a full texture
       *   sample at every frame, which is the single biggest paint bottleneck.
       *   `blur-md` (12px) is visually indistinct but ~3× cheaper on the GPU.
       * — `transform-gpu` ensures the nav itself is on its own compositing layer.
       */}
      <nav
        className={`
          transform-gpu will-change-transform
          border overflow-hidden
          transition-[width,border-radius,background-color,border-color,box-shadow]
          duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${
            isOpen
              ? 'w-[95%] md:w-[90%] bg-black rounded-3xl border-white/10 shadow-2xl'
              : isScrolled
                ? 'w-[90%] md:w-[75%] lg:w-[65%] bg-black/70 backdrop-blur-md rounded-full border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.45)]'
                : 'w-full bg-transparent border-transparent rounded-none'
          }
        `}
      >
        {/*
         * Inner padding row
         * — Only `padding` changes, not width or position.
         * — `transition-[padding]` is explicit so the browser doesn't scan every prop.
         */}
        <div
          className={`
            px-6 md:px-8 flex justify-between items-center
            ${isScrolled ? 'py-3' : 'py-5'}
            transition-[padding] duration-300
          `}
        >

          {/* ================= LOGO ================= */}
          <div className="flex items-center gap-2 cursor-pointer group">
            {/*
             * Logo badge: `transition-transform` only — no layout props animated.
             * `transform-gpu` keeps the rotation on the compositor thread.
             */}
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-bold text-xs shadow-lg transform-gpu group-hover:rotate-12 transition-transform duration-300">
              CK
            </div>
            <span className="font-bold text-lg tracking-wide text-white group-hover:text-blue-400 transition-colors duration-200">
              CodingInKannada
            </span>
          </div>

          {/* ================= DESKTOP LINKS ================= */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1 border border-white/5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-3 py-1.5 text-xs lg:text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-[color,background-color] duration-200"
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
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold
                transition-[background-color,color,border-color] duration-200
                ${isScrolled
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                }`}
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
          </div>

          {/* ================= MOBILE TOGGLE ================= */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen((o) => !o)}
              className="text-white p-2 hover:bg-white/10 rounded-full transition-[background-color] duration-200 focus:outline-none"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {/* Animate the icon swap with transform-gpu instead of re-mounting */}
              <span className={`block transform-gpu transition-[opacity,transform] duration-200 ${isOpen ? 'opacity-0 rotate-90 scale-50 absolute' : 'opacity-100 rotate-0 scale-100'}`}>
                <Menu size={24} />
              </span>
              <span className={`block transform-gpu transition-[opacity,transform] duration-200 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50 absolute'}`}>
                <X size={24} />
              </span>
            </button>
          </div>
        </div>

        {/*
         * MOBILE MENU CONTENT
         * — `max-h` animation is replaced with a `transform: scaleY` + `opacity` combo,
         *   both of which are compositor-only and do not trigger layout.
         * — `origin-top` ensures the scale animates downward from the nav edge.
         */}
        <div
          className={`
            md:hidden transform-gpu origin-top
            transition-[opacity,transform] duration-300 ease-in-out
            ${isOpen
              ? 'opacity-100 scale-y-100 pb-6'
              : 'opacity-0 scale-y-0 max-h-0 overflow-hidden pointer-events-none'
            }
          `}
        >
          <div className="flex flex-col items-center gap-2 px-4 pt-2">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-[color,background-color,border-color] duration-200 border border-transparent hover:border-white/5"
                style={{ transitionDelay: isOpen ? `${index * 40}ms` : '0ms' }}
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