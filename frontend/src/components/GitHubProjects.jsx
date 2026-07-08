import React from "react";
import { Folder, GitFork, Star, ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "E-Commerce Web",
    repo: "E-commerse-web",
    desc: "Full-stack shopping platform with cart features.",
    lang: "JavaScript",
    color: "#F7DF1E", 
  },
  {
    name: "EcoGuardX",
    repo: "EcoGuardX",
    desc: "Environmental monitoring system using Python.",
    lang: "Python",
    color: "#3776AB", 
  },
  {
    name: "PhotoShop Clone",
    repo: "photo-shop",
    desc: "Web-based image editing tool with canvas API.",
    lang: "JavaScript",
    color: "#61DAFB", 
  },
  {
    name: "Zomato App Clone",
    repo: "zoomato-app---Copy",
    desc: "Food delivery app UI clone with responsive design.",
    lang: "React Native",
    color: "#61DAFB",
  },
  {
    name: "Real-Time Tracer",
    repo: "REAL-TIME-TRACER",
    desc: "Live location tracking system using WebSockets.",
    lang: "Node.js",
    color: "#68A063", 
  },
  {
    name: "Chat App",
    repo: "chat-app",
    desc: "Real-time messaging application.",
    lang: "CSS/JS",
    color: "#563D7C",
  },
  {
    name: "AI Projects",
    repo: "ai-projects",
    desc: "Collection of Artificial Intelligence experiments.",
    lang: "Python",
    color: "#3776AB",
  },
  {
    name: "Restaurant Menu",
    repo: "RESTOTANT-WEB-MENU",
    desc: "Digital menu interface for restaurants.",
    lang: "CSS",
    color: "#2965f1",
  },
];

const firstRow = projects.slice(0, 4);
const secondRow = projects.slice(4, 8);

const ProjectCard = ({ project }) => (
  <a 
    href={`https://github.com/Naveen-gale/${project.repo}`} 
    target="_blank" 
    rel="noopener noreferrer"
    // CHANGED: Width reduced to w-64 (mobile) and w-72 (PC). Padding reduced to p-4.
    className="flex-shrink-0 w-64 md:w-72 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md mx-3 hover:bg-white/10 hover:border-blue-500/30 transition-all group relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    <div className="flex items-center justify-between mb-3 relative z-10">
      <div className="flex items-center gap-2">
        {/* CHANGED: Smaller Icon Container */}
        <div className="p-1.5 rounded-lg bg-white/5 text-blue-400 group-hover:text-white group-hover:bg-blue-600 transition-colors shadow-inner">
          <Folder size={16} />
        </div>
        {/* CHANGED: Smaller Text */}
        <h3 className="text-white font-bold text-sm tracking-wide group-hover:text-blue-300 transition-colors">
          {project.name}
        </h3>
      </div>
      <ArrowUpRight size={14} className="text-gray-500 group-hover:text-white transition-colors" />
    </div>

    {/* CHANGED: Smaller Description Text */}
    <p className="text-gray-400 text-xs leading-relaxed mb-4 h-8 line-clamp-2 relative z-10">
      {project.desc}
    </p>

    <div className="flex items-center justify-between mt-auto relative z-10 pt-3 border-t border-white/5">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: project.color, color: project.color }}></span>
        <span className="text-gray-300 text-[10px] font-mono font-medium">{project.lang}</span>
      </div>
      
      <div className="flex gap-3 text-gray-500 text-[10px] font-medium">
         <span className="flex items-center gap-1 hover:text-yellow-400 transition-colors">
            <Star size={10} /> <span>{(project.name.length * 3) % 10 + 1}</span>
         </span>
         <span className="flex items-center gap-1 hover:text-white transition-colors">
            <GitFork size={10} /> <span>{(project.name.length * 2) % 5}</span>
         </span>
      </div>
    </div>
  </a>
);

const GitHubProjects = () => {
  return (
    <div className="reveal-section relative bg-black py-16 overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
         <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-900/10 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-900/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 text-center mb-10 px-4">
        <div className="inline-block px-3 py-1 mb-3 rounded-full border border-white/10 bg-white/5 text-gray-400 text-[10px] font-medium uppercase tracking-widest">
          Codebase
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          GitHub <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Repositories</span>
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* ROW 1: Scroll LEFT */}
        <div className="relative w-full overflow-hidden mask-gradient">
          <div className="flex items-center animate-scroll-left whitespace-nowrap">
            {[...firstRow, ...firstRow, ...firstRow, ...firstRow].map((project, index) => (
              <ProjectCard key={`row1-${index}`} project={project} />
            ))}
          </div>
        </div>

        {/* ROW 2: Scroll RIGHT */}
        <div className="relative w-full overflow-hidden mask-gradient">
          <div className="flex items-center animate-scroll-right whitespace-nowrap">
            {[...secondRow, ...secondRow, ...secondRow, ...secondRow].map((project, index) => (
              <ProjectCard key={`row2-${index}`} project={project} />
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .mask-gradient {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }

        /* Adjusted animations for smaller cards (need less distance) */
        @keyframes scrollLeft {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-25%, 0, 0); } 
        }

        @keyframes scrollRight {
          from { transform: translate3d(-25%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }

        .animate-scroll-left {
          display: flex;
          animation: scrollLeft 40s linear infinite;
          width: max-content;
          will-change: transform;
        }

        .animate-scroll-right {
          display: flex;
          animation: scrollRight 40s linear infinite;
          width: max-content;
          will-change: transform;
        }

        .animate-scroll-left:hover, 
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default GitHubProjects;