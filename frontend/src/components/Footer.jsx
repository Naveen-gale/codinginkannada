import React from "react";
import { Github, Instagram, Mail, ArrowUp, MapPin } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const socialLinks = [
    { name: "GitHub",    icon: <Github size={18} />,    href: "https://github.com/Naveen-gale",           hoverClass: "hover:text-white"     },
    { name: "Instagram", icon: <Instagram size={18} />, href: "https://instagram.com/n99av80n",    hoverClass: "hover:text-pink-400"  },
    { name: "Email",     icon: <Mail size={18} />,      href: "mailto:galennaver@gmail.com",              hoverClass: "hover:text-blue-400"  },
  ];

  const quickLinks = [
    { label: "Home",           href: "#home"           },
    { label: "About",          href: "#about"          },
    { label: "Projects",       href: "#projects"       },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact",        href: "#contact"        },
  ];

  return (
    <footer className="relative bg-[#050505] pt-14 sm:pt-20 pb-8 border-t border-white/5">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Top grid ────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="sm:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                CK
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                CodingInKannada
              </span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Building scalable web applications and digital experiences.
              Focused on the MERN stack, Python, and Generative AI.
            </p>

            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <MapPin size={14} className="text-blue-500 shrink-0" />
              <span>Hubballi, Karnataka, India 🇮🇳</span>
            </div>

            {/* Socials */}
            <div className="flex gap-3 pt-1">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className={`w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-200 hover:bg-white/10 hover:scale-110 ${social.hoverClass}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-5">Tech Stack</h3>
            <ul className="space-y-3">
              {["React", "Node.js", "Python", "MongoDB", "Express", "Flask"].map((t) => (
                <li key={t} className="text-gray-400 text-sm">{t}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Divider ─────────────────────────────────── */}
        <div className="h-px bg-white/8 mb-6" />

        {/* ── Bottom bar ──────────────────────────────── */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} <span className="text-gray-300 font-medium">Naveen Galennaver</span>. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all duration-200 text-xs font-semibold uppercase tracking-wider"
          >
            Back to Top
            <ArrowUp size={12} className="group-hover:-translate-y-1 transition-transform duration-200" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;