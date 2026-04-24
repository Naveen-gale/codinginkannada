import React, { useRef, useEffect, useState } from "react";
import photo from "../assets/naveen2.png";

const HeroSec = () => {
  // 1. Interactive Refs
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const bgGlowRef = useRef(null);

  // 2. State for Animations
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // A. Trigger Entry Animation
    setTimeout(() => setIsLoaded(true), 100);

    // B. Handle Scroll (Parallax Logic) - Optimized with requestAnimationFrame
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Mouse Move Handler (3D Tilt - Preserved!)
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
        rotateY(${x * 15}deg) 
        rotateX(${-y * 15}deg) 
        scale(1.02)
      `;
    }
    // Animate Background (Opposite direction for depth)
    if (bgGlowRef.current) {
      bgGlowRef.current.style.transform = `translate(${-x * 40}px, ${-y * 40}px)`;
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '4px', verticalAlign: 'middle' }}>
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
      className="reveal-section relative min-h-[85vh] md:min-h-screen flex items-center justify-center bg-black overflow-hidden pt-24 md:pt-20"
    >

      {/* ========= Background Glow (Scroll Parallax + Mouse Parallax) ========= */}
      {/* We apply Scroll Parallax (translateY) to the Wrapper, and Mouse Parallax (translate X/Y) to the Ref */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }} // Scroll Parallax (Moves at 50% speed)
      >
        <div
          ref={bgGlowRef} // Mouse Interaction Ref
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-900/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-900/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* ========= Main Content (Scroll Parallax) ========= */}
      {/* This wrapper moves slightly slower than scroll (0.2), creating a 3D depth effect */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-6 w-full"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* ================= LEFT SIDE ================= */}
          <div className="flex flex-col space-y-8">

            {/* Top Row: Text + Mobile Image */}
            <div className="flex flex-row items-center justify-between md:block">

              {/* Text Block */}
              <div className={`flex-1 pr-2 md:pr-0 transition-all duration-1000 ease-out transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="inline-block px-3 py-1 mb-3 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] md:text-sm font-medium">
                  Full Stack Developer
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  Hi, I'm <br />
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                    Naveen
                  </span>
                </h1>
                <p className="text-gray-400 mt-3 text-sm md:text-lg max-w-md leading-relaxed">
                  MERN Stack, Python, C/C++. <br />
                  Developer and Creator @ <span className="inline-flex items-center">codinginkannada <VerifiedBadge /></span>
                </p>
              </div>

              {/* Mobile Image (Static) */}
              <div className={`md:hidden shrink-0 ml-2 transition-all duration-1000 delay-200 ease-out transform ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                <div className="relative w-40 h-40 sm:w-48 sm:h-48">
                  <div className="absolute inset-0 bg-blue-500/30 blur-xl animate-pulse rounded-xl"></div>
                  <img src={photo} alt="Naveen - Full Stack Developer and Coding in Kannada Founder" className="w-full h-full object-cover rounded-xl border-2 border-white/20 shadow-lg relative z-10" />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto transition-all duration-1000 delay-300 ease-out transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <a href="#projects" className="px-8 py-3 bg-white text-black font-bold rounded-xl text-center hover:scale-105 transition shadow-[0_0_20px_rgba(255,255,255,0.3)]">View Work</a>
              <a href="#contact" className="px-8 py-3 border border-white/20 text-white font-medium rounded-xl text-center hover:bg-white/10 transition">Contact Me</a>
            </div>

            {/* Tech Stack */}
            <div className={`transition-all duration-1000 delay-500 ease-out transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-gray-500 text-xs uppercase mb-3 tracking-widest">Tech Arsenal</p>
              <div className="flex flex-wrap gap-2">
                {["Node", "Express", "Python", "React", "C", "C++"].map((skill) => (
                  <div key={skill} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs md:text-sm font-mono hover:bg-white/10 hover:text-blue-400 hover:border-blue-500/30 transition cursor-default">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE (3D Interactive Image) ================= */}
          <div className={`hidden md:flex justify-end relative transition-all duration-1000 delay-300 ease-out transform ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div
              ref={imageRef}
              className="relative w-72 h-72 lg:w-96 lg:h-96 group transition-transform duration-100 ease-out will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition duration-500"></div>

              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-gray-900 shadow-2xl">
                <img src={photo} alt="Naveen - MERN Stack and Python Developer" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>

              <div
                className="absolute -bottom-6 -left-6 bg-black/80 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl flex items-center gap-3 transition-transform duration-300"
                style={{ transform: 'translateZ(20px)' }}
              >
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <div className="flex flex-col">
                  <span className="text-white text-sm font-bold">Open to Work</span>
                  <span className="text-gray-400 text-xs">MERN & Python Dev</span>
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