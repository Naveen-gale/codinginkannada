import React, { useEffect, useState } from "react";
import photo from "../assets/naveen2.png";

const TECH_STACK = ["Node.js", "Express", "Python", "React", "C", "C++"];

const VerifiedBadge = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 inline-block -mt-0.5">
    <path d="M22.5 12.5L20.3 14.9L20.8 18.1L17.7 18.8L15.9 21.4L13 20.2L10.1 21.4L8.3 18.8L5.2 18.1L5.7 14.9L3.5 12.5L5.7 10.1L5.2 6.9L8.3 6.2L10.1 3.6L13 4.8L15.9 3.6L17.7 6.2L20.8 6.9L20.3 10.1L22.5 12.5Z" fill="#1DA1F2" />
    <path d="M10 15.5L7 12.5L8.4 11.1L10 12.7L16.6 6.1L18 7.5L10 15.5Z" fill="white" />
  </svg>
);

const HeroSec = () => {
  // Simple state for a clean fade-in on mount
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoaded(true);
  }, []);

  return (
    <div
      id="home"
      className={`relative min-h-[100svh] flex items-center justify-center bg-[#050505] pt-20 pb-14 md:pt-20 md:pb-0 selection:bg-blue-500/30 selection:text-white transition-opacity duration-700 ease-in ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{ willChange: 'opacity' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* ================= LEFT SIDE (Text & CTA) ================= */}
          <div className="flex flex-col space-y-8 z-10">

            <div className="flex flex-row items-center justify-between md:block">
              <div className="flex-1 pr-4 md:pr-0">

                {/* Status Pill */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-gray-800 bg-gray-900/50">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-gray-300 text-xs md:text-sm font-medium tracking-wide uppercase">
                    Full Stack Developer
                  </span>
                </div>

                {/* Hero Headline */}
                <h1 className="text-[2.4rem] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight">
                  Hi, I'm <br />
                  <span className="text-blue-500">
                    Naveen
                  </span>
                </h1>

                {/* Bio */}
                <p className="text-gray-400 mt-4 text-sm sm:text-base md:text-lg max-w-lg leading-relaxed">
                  Specializing in MERN Stack, Python, and C/C++. <br className="hidden md:block" />
                  Creator & Developer behind <span className="font-medium text-gray-200">codinginkannada</span> <VerifiedBadge />
                </p>
              </div>

              {/* Mobile Image */}
              <div className="md:hidden shrink-0 ml-2">
                <img
                  src={photo}
                  alt="Naveen"
                  className="w-28 h-36 sm:w-36 sm:h-44 object-cover object-top rounded-2xl border border-gray-800 shadow-lg"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col xs:flex-row sm:flex-row gap-4 w-full pt-2">
              <a
                href="#projects"
                className="flex-1 sm:flex-none px-8 py-3.5 bg-white text-black font-bold rounded-xl text-center hover:bg-gray-200 transition-colors duration-200"
              >
                View Work
              </a>
              <a
                href="#contact"
                className="flex-1 sm:flex-none px-8 py-3.5 border border-gray-700 text-white font-medium rounded-xl text-center hover:bg-gray-800 transition-colors duration-200"
              >
                Contact Me
              </a>
            </div>

            {/* Tech Stack */}
            <div className="pt-4">
              <p className="text-gray-500 text-xs uppercase mb-4 tracking-widest font-semibold">Tech Arsenal</p>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK.map((skill) => (
                  <div
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-300 text-sm font-medium hover:border-gray-600 transition-colors cursor-default"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE (Photo) ================= */}
          <div className="hidden md:flex justify-end relative">
            <div className="relative w-72 lg:w-[360px]">

              {/* Main Image — natural portrait ratio */}
              <div className="relative w-full rounded-3xl overflow-hidden border border-gray-800 bg-[#0a0a0a] shadow-2xl transition-transform duration-500 ease-out hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                <img
                  src={photo}
                  alt="Naveen - Developer"
                  className="w-full h-auto object-cover object-top opacity-95 hover:opacity-100 hover:scale-105 transition-all duration-500 ease-out"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-5 -left-8 md:-left-10 bg-black/80 backdrop-blur-md border border-gray-800/80 p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 transition-transform duration-500 hover:-translate-y-1">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-900 border border-gray-700/50 text-blue-500 shadow-inner">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-100 text-sm font-bold tracking-wide">Developer</span>
                  <span className="text-gray-400 text-xs mt-0.5">MERN &amp; Python</span>
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