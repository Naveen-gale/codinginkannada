import React, { useEffect, useRef } from "react";

const About = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    // 1. Setup the Intersection Observer (Scroll Animation)
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show-content");
            // Optional: Stop observing once shown so it doesn't flicker
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 } // Wait until 15% is visible
    );

    const hiddenElements = document.querySelectorAll(".hidden-content");
    hiddenElements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return (
    <div
      id="about"
      className="reveal-section relative min-h-screen flex items-center justify-center bg-black overflow-hidden py-24 md:py-32"
    >

      {/* ================= BACKGROUND ATMOSPHERE ================= */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
        
        {/* ================= TITLE HEADER ================= */}
        <div className="mb-20 md:mb-28 text-left hidden-content opacity-0 translate-y-10 transition-all duration-1000 ease-out">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:bg-blue-500/10 transition-colors">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            About Me
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
             
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 drop-shadow-sm">
              Full Stack Developer
            </span>
          </h2>
        </div>

        {/* ================= TIMELINE CONTENT ================= */}
        <div className="relative border-l-2 border-white/5 ml-2  md:ml-4 space-y-20 md:space-y-32">
          
          {/* Animated Glowing Line Overlay */}
          <div className="absolute top-0 -left-[2px] w-[2px] h-full bg-gradient-to-b from-blue-500 via-purple-500 to-transparent opacity-0 transition-opacity duration-1000 show-line"></div>

          {/* --- BLOCK 1: INTRO --- */}
          <div className="relative pl-10 md:pl-16 hidden-content opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-100">
            {/* Timeline Dot */}
            <span className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-black border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)] z-10"></span>
            
            <h3 className="text-2xl md:text-3xl text-white font-bold mb-6 tracking-wide">Who I Am</h3>
            <p className="text-gray-400 text-base md:text-xl leading-relaxed max-w-2xl font-light">
              Hi, I’m <span className="text-white font-semibold border-b-2 border-blue-500/50 pb-0.5 hover:border-blue-400 transition-colors cursor-default">Naveen</span>. 
              I am a passionate Full Stack and App Developer who loves building smart, practical digital solutions. 
              I specialize in <span className="text-blue-400 font-medium">Python, MERN Stack</span>, and system-level programming with C. 
              I enjoy turning complex ideas into real-world applications.
            </p>
          </div>

          {/* --- BLOCK 2: EDUCATION (Glass Card) --- */}
          <div className="relative pl-10 md:pl-16 hidden-content opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-200">
             {/* Timeline Dot */}
             <span className="absolute -left-[9px] top-8 w-4 h-4 rounded-full bg-black border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)] z-10"></span>

            <div className="group relative p-8 md:p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden hover:bg-white/[0.07] hover:border-white/20 transition-all duration-500 hover:-translate-y-1 shadow-2xl">
              {/* Inner Glow - Adjusted for smoother feel */}
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all duration-700"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <h4 className="text-2xl md:text-3xl text-white font-bold">BCA Student</h4>
                  <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 text-xs font-mono text-blue-300 border border-white/10 backdrop-blur-sm">
                    First Year • Hubballi
                  </span>
                </div>
                
                <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light mb-8">
                  Currently pursuing my Bachelor of Computer Applications. I balance my academic studies with hands-on development.
                  I am also a content creator on <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400 font-bold hover:brightness-110 transition-all cursor-pointer">Instagram</span>, 
                  where I share my coding journey.
                </p>

                <div className="flex flex-wrap gap-3">
                  {['Student Management Systems', 'AI & Automation', 'Engineering'].map((tag) => (
                    <span key={tag} className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 text-xs text-gray-400 font-mono hover:text-white hover:border-white/20 transition-colors cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* --- BLOCK 3: WHAT I DO --- */}
          <div className="relative pl-10 md:pl-16 hidden-content opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-300">
            {/* Timeline Dot */}
            <span className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-black border-2 border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.6)] z-10"></span>

            <h3 className="text-2xl md:text-3xl text-white font-bold mb-6 tracking-wide">What I Build</h3>
            <p className="text-gray-400 text-base md:text-xl leading-relaxed mb-10 max-w-3xl font-light">
              I have built projects ranging from <span className="text-gray-200 font-medium">E-commerce websites <span className="text-gray-400 font-medium">many of them </span></span> to 
              <span className="text-gray-200 font-medium"> AI-integrated web applications </span> and <span className="text-gray-200 font-medium">apps</span> for <span  className="text-gray-200 font-medium">iOS</span> and <span className="text-gray-200 font-medium">Android</span>. 
              My focus is always on writing clean code, designing user-friendly interfaces, and delivering reliable backend performance.
            </p>
            
            {/* Quote Block - Enhanced */}
            <div className="relative p-8 rounded-2xl bg-gradient-to-r from-blue-900/10 to-purple-900/10 border border-white/5 border-l-4 border-l-blue-500 backdrop-blur-sm">
              <p className="text-gray-200 text-lg md:text-xl italic font-light tracking-wide">
                "My goal is simple — build software that is fast, useful, and impactful."
              </p>
            </div>
          </div>

          {/* --- BLOCK 4: CTA --- */}
          <div className="relative pl-10 md:pl-16 pb-10 hidden-content opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-500">
             <p className="text-gray-500 text-sm font-bold uppercase tracking-[0.25em] animate-pulse hover:text-gray-300 transition-colors cursor-default">
              Let's create something amazing together.
            </p>
          </div>

        </div>
      </div>

      {/* ================= CSS ANIMATION UTILS ================= */}
      <style>{`
        .show-content {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .show-line {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default About;