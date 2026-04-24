import React, { useState } from "react";
import { Trophy, Calendar, ExternalLink, Award, FileText, X, ZoomIn, CheckCircle2 } from "lucide-react";

// 1. Your Specific Local Imports
import hackathonImg from "../assets/hackathon.png";
import offerLetterImg from "../assets/offerlater.png";
import edcCompImg from "../assets/edc.png";

const certificatesData = [
  {
    id: 1,
    title: "Hackathon Achievement",
    issuer: "Tech Event / Organizer",
    date: "2025",
    image: hackathonImg, 
    description: "Participated and built an innovative solution in a competitive coding hackathon environment.",
    tags: ["Problem Solving", "Teamwork", "Innovation"],
    color: "from-blue-500 to-cyan-500",
    icon: <Trophy className="w-5 h-5 text-yellow-400" />
  },
  {
    id: 2,
    title: "EDC Campus Offer Letter",
    issuer: "Entrepreneurship Development Cell",
    date: "2025",
    image: offerLetterImg, 
    description: "Official offer letter recognizing my selection and role within the Campus EDC program.",
    tags: ["Leadership", "Management", "Selection"],
    color: "from-purple-500 to-pink-500",
    icon: <FileText className="w-5 h-5 text-purple-400" />
  },
  {
    id: 3,
    title: "EDC Course Completion",
    issuer: "Entrepreneurship Development Cell",
    date: "2025",
    image: edcCompImg, 
    description: "Successfully completed the EDC entrepreneurship and skills development training program.",
    tags: ["Entrepreneurship", "Business Skills", "Certified"],
    color: "from-green-500 to-emerald-500",
    icon: <Award className="w-5 h-5 text-green-400" />
  },
];

const Certifications = () => {
  // State for the Lightbox (Popup)
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div
      id="certifications"
      className="reveal-section relative min-h-screen bg-black py-24 px-4 md:px-8 overflow-hidden"
    >

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-white/10 bg-white/5 text-blue-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            <CheckCircle2 size={14} />
            Achievements
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Certifications 
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Recognition of my technical skills, participation, and professional development.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {certificatesData.map((cert) => (
            <div
              key={cert.id}
              className="group relative bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col"
            >
              
              {/* IMAGE SECTION (Clickable for Popup) */}
              <div 
                className="relative h-60 w-full bg-[#111] overflow-hidden cursor-pointer group/image"
                onClick={() => setSelectedImage(cert.image)}
              >
                {/* 1. Blurred Background (Fills space) */}
                <div 
                   className="absolute inset-0 opacity-30 blur-xl scale-110 transition-transform duration-700 group-hover/image:scale-125"
                   style={{ backgroundImage: `url(${cert.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                ></div>

                {/* 2. Main Image (Smart Fit) */}
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="relative z-10 w-full h-full object-contain p-4 transition-transform duration-500 group-hover/image:scale-105"
                />

                {/* Overlay Zoom Icon */}
                <div className="absolute inset-0 z-20 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                   <div className="bg-white/10 p-3 rounded-full border border-white/20 backdrop-blur-md text-white">
                      <ZoomIn size={24} />
                   </div>
                </div>

                {/* Icon Badge */}
                <div className="absolute top-4 right-4 z-20">
                   <div className="bg-black/60 backdrop-blur-md border border-white/10 p-2 rounded-xl">
                      {cert.icon}
                   </div>
                </div>
              </div>

              {/* CONTENT SECTION */}
              <div className="p-6 md:p-8 flex-1 flex flex-col relative">
                {/* Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${cert.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 pointer-events-none`}></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                      <Calendar size={12} />
                      {cert.date} • {cert.issuer}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {cert.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {cert.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {cert.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 text-[10px] font-bold text-white bg-white/5 border border-white/10 rounded-lg">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Button (Triggers Popup) */}
                    <button
                      onClick={() => setSelectedImage(cert.image)}
                      className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-blue-400 transition-colors group/link"
                    >
                      View Credential
                      <ExternalLink size={14} className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ================= IMAGE MODAL (POPUP) ================= */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        >
          {/* Backdrop (Click to close) */}
          <div 
             className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300"
             onClick={() => setSelectedImage(null)}
          ></div>

          {/* Modal Content */}
          <div className="relative z-10 max-w-5xl w-full max-h-full flex flex-col items-center animate-in zoom-in-95 duration-300">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-gray-400 hover:text-white transition-colors bg-white/10 p-2 rounded-full backdrop-blur-md"
            >
              <X size={24} />
            </button>

            {/* Full Image */}
            <div className="relative rounded-lg overflow-hidden shadow-2xl border border-white/10 bg-[#0a0a0a]">
               <img 
                 src={selectedImage} 
                 alt="Certificate Full View" 
                 className="max-h-[85vh] w-auto object-contain"
               />
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
};

export default Certifications;