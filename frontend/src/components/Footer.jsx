import React from "react";
import { Github, Instagram, Linkedin, Mail, ArrowUp, Heart, MapPin } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { 
      name: "GitHub", 
      icon: <Github size={20} />, 
      href: "https://github.com/Naveen-gale",
      color: "hover:text-white"
    },
    { 
      name: "Instagram", 
      icon: <Instagram size={20} />, 
      href: "https://instagram.com/codinginkannada",
      color: "hover:text-pink-500"
    },
    
    { 
      name: "Email", 
      icon: <Mail size={20} />, 
      href: "https://mail.google.com/mail/u/0/#inbox",
      color: "hover:text-red-500"
    },
  ];

  return (
    <footer className="relative bg-[#050505] pt-20 pb-10 overflow-hidden border-t border-white/5">
      
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* COLUMN 1: Brand Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                CK
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                CodingInKannada
              </span>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Building scalable web applications and digital experiences. 
              Focused on the MERN stack, Python, and creating intuitive user interfaces.
            </p>

            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <MapPin size={16} className="text-blue-500" />
              <span>Hubballi, Karnataka, India 🇮🇳</span>
            </div>
          </div>

          {/* COLUMN 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'About', 'Projects', 'Certifications'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Socials */}
          <div>
            <h3 className="text-white font-bold mb-6">Connect</h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-white/10 hover:scale-110 ${social.color}`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* SEPARATOR LINE */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Copyright */}
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} <span className="text-white font-semibold">Naveen</span>. All rights reserved.
          </p>

          {/* Made With Love */}
          

          {/* Back to Top Button */}
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-500 text-gray-400 hover:text-white transition-all duration-300 text-xs font-bold uppercase tracking-wider"
          >
            Back to Top
            <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
          </button>

        </div>
      </div>
    </footer>
  );
};

export default Footer;