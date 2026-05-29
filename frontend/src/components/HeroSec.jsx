import React, { useRef, useEffect, useState } from "react";
import photo from "../assets/naveen2.png";

// Defined outside to prevent recreation on every render
const TECH_STACK = ["Node.js", "Express", "Python", "React", "C", "C++"];

const HeroSec = () => {
  // 1. Interactive Refs
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const bgGlowRef = useRef(null);
  const parallaxBgRef = useRef(null);
  const parallaxContentRef = useRef(null);

  // 2. State for Animations
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // A. Trigger Entry Animation
    const timer = setTimeout(() => setIsLoaded(true), 100);

    // B. Handle Scroll (Parallax Logic) - Optimized with requestAnimationFrame
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scroll = window.scrollY;
          if (parallaxBgRef.current) {
            parallaxBgRef.current.style.transform = `translate3d(0, ${scroll * 0.4}px, 0)`;
          }
          if (parallaxContentRef.current) {
            parallaxContentRef.current.style.transform = `translate3d(0, ${scroll * 0.15}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 3. Mouse Move Handler (3D Tilt)
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const x = (clientX - innerWidth / 2) / (innerWidth / 2);
    const y = (clientY - innerHeight / 2) / (innerHeight / 2);

    // Animate Image Tilt
    if (imageRef.current) {
      imageRef.current.style.transform = `
        perspective(1000px) 
        rotateY(${x * 12}deg) 
        rotateX(${-y * 12}deg) 
        scale(1.03)
      `;
    }
    // Animate Background (Opposite direction for depth)
    if (bgGlowRef.current) {
      bgGlowRef.current.style.transform = `translate(${-x * 30}px, ${-y * 30}px)`;
    }
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)`;
    }
    if (bgGlowRef.current) {
      bgGlowRef.current.style.transform = `translate(0px, 0px)`;
    }
  };

  const VerifiedBadge = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 inline-block -mt-0.5">
      <path d="M22.5 12.5L20.3 14.9L20.8 18.1L17.7 18.8L15.9 21.4L13 20.2L10.1 21.4L8.3 18.8L5.2 18.1L5.7 14.9L3.5 12.5L5.7 10.1L5.2 6.9L8.3 6.2L10.1 3.6L13 4.8L15.9 3.6L17.7 6.2L20.8 6.9L20.3 10.1L22.5 12.5Z" fill="#1DA1F2" />
      <path d="M10 15.5L7 12.5L8.4 11.1L10 12.7L16.6 6.1L18 7.5L10 15.5Z" fill="white" />
    </svg>
  );

  return (
    <div
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="reveal-section relative min-h-[85vh] md:min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden pt-24 md:pt-20 selection:bg-blue-500/30 selection:text-white"
    >
      {/* ========= Ambient Background Glow ========= */}
      <div
        ref={parallaxBgRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
      >
        <div
          ref={bgGlowRef}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-purple-900/30 rounded-full blur-[150px] mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] bg-blue-900/30 rounded-full blur-[150px] mix-blend-screen animate-pulse delay-700"></div>
        </div>
      </div>

      {/* ========= Main Content ========= */}
      <div
        ref={parallaxContentRef}
        className="relative z-10 max-w-7xl mx-auto px-6 w-full will-change-transform"
      >
        <div className="grid md:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ================= LEFT SIDE (Text & CTA) ================= */}
          <div className="flex flex-col space-y-8 z-20">
            
            <div className="flex flex-row items-center justify-between md:block">
              <div className={`flex-1 pr-4 md:pr-0 transition-all duration-1000 ease-out transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                
                {/* Status Pill */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                  <span className="text-blue-300 text-xs md:text-sm font-semibold tracking-wide uppercase">
                    Full Stack Developer
                  </span>
                </div>

                {/* Hero Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
                  Hi, I'm <br />
                  <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 text-transparent bg-clip-text drop-shadow-sm">
                    Naveen
                  </span>
                </h1>

                {/* Bio */}
                <p className="text-gray-400 mt-5 text-base md:text-lg max-w-lg leading-relaxed font-light">
                  Specializing in MERN Stack, Python, and C/C++. <br className="hidden md:block" />
                  Creator & Developer behind <span className="font-medium text-gray-200">codinginkannada</span> <VerifiedBadge />
                </p>
              </div>

              {/* Mobile Image (Static) */}
              <div className={`md:hidden shrink-0 ml-2 transition-all duration-1000 delay-200 ease-out transform ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                <div className="relative w-32 h-32 sm:w-44 sm:h-44">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-purple-500/40 blur-2xl animate-pulse rounded-full"></div>
                  <img src={photo} alt="Naveen" className="w-full h-full object-cover rounded-2xl border border-white/10 shadow-2xl relative z-10" />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2 transition-all duration-1000 delay-300 ease-out transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <a 
                href="#projects" 
                className="px-8 py-3.5 bg-white text-black font-bold rounded-xl text-center hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
              >
                View Work
              </a>
              <a 
                href="#contact" 
                className="px-8 py-3.5 border border-white/20 text-white font-medium rounded-xl text-center hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/40"
              >
                Contact Me
              </a>
            </div>

            {/* Tech Stack */}
            <div className={`pt-4 transition-all duration-1000 delay-500 ease-out transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <p className="text-gray-500 text-xs uppercase mb-4 tracking-widest font-semibold">Tech Arsenal</p>
              <div className="flex flex-wrap gap-2.5">
                {TECH_STACK.map((skill) => (
                  <div 
                    key={skill} 
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm text-gray-300 text-sm font-medium hover:bg-blue-500/10 hover:text-blue-300 hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default shadow-sm"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE (3D Interactive Image) ================= */}
          <div className={`hidden md:flex justify-end relative transition-all duration-1000 delay-300 ease-out transform ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'}`}>
            <div
              ref={imageRef}
              className="relative w-80 h-80 lg:w-[420px] lg:h-[420px] group transition-transform duration-200 ease-out will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Image Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>

              {/* Main Image Container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl z-10">
                <img 
                  src={photo} 
                  alt="Naveen - MERN Stack and Python Developer" 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" 
                />
                {/* Subtle overlay gradient to blend image bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
              </div>

              {/* 3D Floating Badge */}
              <div
                className="absolute -bottom-6 -left-8 bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-4 transition-all duration-500 group-hover:-translate-y-2 z-20"
                style={{ transform: 'translateZ(40px)' }}
              >
                <div className="relative flex items-center justify-center w-4 h-4">
                  <div className="absolute w-full h-full rounded-full bg-green-500 animate-ping opacity-75"></div>
                  <div className="relative w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
                <div className="flex flex-col pr-2">
                  <span className="text-white text-sm font-bold tracking-wide">Available for Work</span>
                  <span className="text-gray-400 text-xs mt-0.5">MERN & Python</span>
                </div>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroSec;