import React, { useState } from "react";
import { ExternalLink, X, AlertTriangle, ArrowRight, Code2, Server, Layout, Database } from "lucide-react";
import stylesyncImg from "../assets/stylesync.png";
import photoShopImg from "../assets/photoshop.png";
import karnatakaFcImg from "../assets/restaurant.png";

const projectsData = [
  {
    id: 1,
    title: "StyleSync Fashion",
    category: "Full Stack E-Commerce",
    tech: ["MongoDB", "Express", "React", "Node.js", "Redux"],
    image: stylesyncImg,
    description: "A premium MERN stack fashion platform. Features secure user authentication, real-time cart management, and seamless payment processing (Cash on Delivery included).",
    link: "https://e-commerse-web-frontend.vercel.app/",
    color: "from-orange-500 to-pink-500",
    shadow: "shadow-orange-500/20",
    icon: <Layout className="w-5 h-5" />
  },
  {
    id: 2,
    title: "Karnataka F.C.",
    category: "Restaurant Menu",
    tech: ["HTML5", "CSS3", "JavaScript", "Python (Flask)"],
    image: karnatakaFcImg,
    description: "A dynamic restaurant website powered by a Flask backend. Features an interactive menu, table booking system, and smooth UI animations.",
    link: "https://karnataka-fc.onrender.com/",
    color: "from-green-400 to-emerald-600",
    shadow: "shadow-green-500/20",
    icon: <Server className="w-5 h-5" />
  },
  {
    id: 3,
    title: "PhotoShop Portfolio",
    category: "Creative Portfolio",
    tech: ["MERN Stack", "Canvas API", "Tailwind CSS"],
    image: photoShopImg,
    description: "A visually stunning portfolio website built with the MERN stack, featuring custom canvas animations and a fully responsive layout.",
    link: "https://photo-shop-4m8p.vercel.app",
    color: "from-blue-400 to-cyan-500",
    shadow: "shadow-blue-500/20",
    icon: <Code2 className="w-5 h-5" />
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenWarning = (project) => {
    setSelectedProject(project);
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  const handleProceed = () => {
    if (selectedProject?.link) {
      window.open(selectedProject.link, "_blank");
      setSelectedProject(null);
    }
  };

  return (
    <div
      id="projects"
      className="reveal-section relative min-h-screen bg-black py-24 px-4 md:px-8 overflow-hidden"
    >

      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="mb-24 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 text-blue-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            My Work
          </div>
          <h2 className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
            Innovative web applications built with modern technologies, focusing on performance, scalability, and user experience.
          </p>
        </div>

        {/* Projects Showcase */}
        <div className="flex flex-col gap-24 md:gap-32">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className={`group relative flex flex-col md:flex-row gap-10 md:gap-20 items-center 
                ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >

              {/* IMAGE CARD (3D Effect) */}
              <div className="w-full md:w-3/5 perspective-1000">
                <div className={`relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 transform group-hover:rotate-1 group-hover:scale-[1.02] ${project.shadow}`}>

                  {/* Glass Sheen Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-tr ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10 mix-blend-overlay`}></div>

                  <img
                    src={project.image}
                    alt={`${project.title} - ${project.category} project by Naveen`}
                    loading="lazy"
                    className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                  />

                  {/* Floating Tech Stack (Bottom Left) */}
                  <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-2 pr-4">
                    {project.tech.map((t, i) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 text-[10px] md:text-xs font-bold text-white bg-black/60 border border-white/10 backdrop-blur-xl rounded-lg shadow-lg transform transition-transform duration-500 hover:-translate-y-1"
                        style={{ transitionDelay: `${i * 100}ms` }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* TEXT INFO CARD */}
              <div className="w-full md:w-2/5 flex flex-col justify-center text-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${project.color} bg-opacity-20 text-white shadow-lg`}>
                    {project.icon}
                  </div>
                  <span className={`text-sm font-bold uppercase tracking-widest bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
                    {project.category}
                  </span>
                </div>

                <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 group-hover:text-blue-200 transition-colors leading-tight">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 border-l-2 border-white/10 pl-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => handleOpenWarning(project)}
                    className="group/btn relative px-8 py-3.5 rounded-full bg-white text-black font-bold text-sm overflow-hidden transition-all duration-300 hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-1"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Live Demo <ExternalLink size={16} />
                    </span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* ================= SERVER WAKE-UP MODAL (Glassmorphism) ================= */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

          {/* Animated Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-opacity duration-300"
            onClick={handleClose}
          ></div>

          {/* Modal Box */}
          <div className="relative bg-[#0a0a0a]/90 border border-white/10 rounded-3xl p-8 max-w-sm md:max-w-md w-full shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300 ring-1 ring-white/5">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-500 blur-xl opacity-20 animate-pulse"></div>
                <div className="relative w-20 h-20 bg-gradient-to-b from-yellow-500/20 to-transparent rounded-full flex items-center justify-center mb-6 border border-yellow-500/20">
                  <AlertTriangle size={36} className="text-yellow-500" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                Backend Initializing...
              </h3>

              <div className="bg-white/5 rounded-2xl p-5 mb-8 border border-white/5">
                <p className="text-gray-300 text-sm leading-relaxed">
                  This project is hosted on a <span className="text-white font-bold">Free Tier Server</span>.
                  It may take <span className="text-yellow-400 font-bold">50-60 seconds</span> to wake up from sleep mode.
                  <br /><br />
                  <span className="text-xs text-gray-500 uppercase tracking-widest">Thanks for your patience! </span>
                </p>
              </div>

              <div className="flex gap-4 w-full">
                <button
                  onClick={handleClose}
                  className="flex-1 py-3.5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProceed}
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all text-sm flex items-center justify-center gap-2"
                >
                  Visit Site <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Projects;