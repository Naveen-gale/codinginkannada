import React, { useEffect, useRef, useState } from 'react';
import { 
  Code2, 
  Database, 
  Layout, 
  Server, 
  Smartphone, 
  Terminal, 
  Cpu, 
  Globe, 
  GitBranch, 
  Box
} from 'lucide-react';

const skills = [
  { name: 'React', color: '#61DAFB', level: 'Expert', type: 'Frontend', icon: Layout },
  { name: 'Node.js', color: '#68A063', level: 'Advanced', type: 'Backend', icon: Server },
  { name: 'Express', color: '#ffffff', level: 'Advanced', type: 'Backend', icon: Server },
  { name: 'MongoDB', color: '#4DB33D', level: 'Advanced', type: 'Database', icon: Database },
  { name: 'GitHub', color: '#f0f6fc', level: 'Daily', type: 'Tool', icon: GitBranch },
  { name: 'HTML5', color: '#E34F26', level: 'Expert', type: 'Frontend', icon: Globe },
  { name: 'CSS3', color: '#1572B6', level: 'Expert', type: 'Frontend', icon: Layout },
  { name: 'JS (ES6+)', color: '#F7DF1E', level: 'Expert', type: 'Language', icon: Code2 },
  { name: 'Python', color: '#3776AB', level: 'Expert', type: 'Language', icon: Terminal },
  { name: 'Flask', color: '#ffffff', level: 'Expert', type: 'Backend', icon: Server },
  { name: 'C', color: '#A8B9CC', level: 'Academic', type: 'Language', icon: Cpu },
  { name: 'C++', color: '#00599C', level: 'Academic', type: 'Language', icon: Cpu },
  { name: 'Tailwind', color: '#38BDF8', level: 'Expert', type: 'Frontend', icon: Layout },
  { name: 'Flutter', color: '#02569B', level: 'Beginner', type: 'Mobile', icon: Smartphone },
  { name: 'Dart', color: '#0175C2', level: 'Beginner', type: 'Language', icon: Code2 }
];

const Skill = () => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const [hoveredSkill, setHoveredSkill] = useState(null); 
  
  const rotationRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.001, y: 0.001 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const points = skills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      return {
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi)
      };
    });

    let animationFrameId;

    const animate = () => {
      if (!isDraggingRef.current) {
        targetRotationRef.current.x *= 0.95;
        targetRotationRef.current.y *= 0.95;
        if (Math.abs(targetRotationRef.current.x) < 0.001) targetRotationRef.current.x = 0.001;
        if (Math.abs(targetRotationRef.current.y) < 0.001) targetRotationRef.current.y = 0.001;
      }

      rotationRef.current.x += targetRotationRef.current.x;
      rotationRef.current.y += targetRotationRef.current.y;

      const rotX = rotationRef.current.x;
      const rotY = rotationRef.current.y;

      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        const point = points[i];

        let x = point.x * Math.cos(rotY) - point.z * Math.sin(rotY);
        let z = point.x * Math.sin(rotY) + point.z * Math.cos(rotY);
        let y = point.y * Math.cos(rotX) - z * Math.sin(rotX);
        z = point.y * Math.sin(rotX) + z * Math.cos(rotX);

        const radius = containerRef.current ? containerRef.current.offsetWidth / 2.2 : 150;
        let scale = (z + 2) / 3;
        let opacity = Math.max(0.15, Math.min(1, scale));
        const blur = (1 - scale) * 3;

        item.style.transform = `translate3d(${x * radius}px, ${y * radius}px, 0) scale(${scale})`;
        item.style.opacity = opacity;
        item.style.zIndex = Math.floor(scale * 100);
        item.style.filter = `blur(${blur}px)`;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleStart = (clientX, clientY) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: clientX, y: clientY };
    targetRotationRef.current = { x: 0, y: 0 };
  };

  const handleMove = (clientX, clientY) => {
    if (!isDraggingRef.current) return;
    const deltaX = clientX - lastMouseRef.current.x;
    const deltaY = clientY - lastMouseRef.current.y;
    lastMouseRef.current = { x: clientX, y: clientY };
    targetRotationRef.current = { x: -deltaY * 0.003, y: deltaX * 0.003 };
  };

  const handleEnd = () => { isDraggingRef.current = false; };

  return (
    <div 
      id="skills"
      className="reveal-section relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 select-none bg-black" 
      onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={handleEnd}
    >
      
      {/* Background Decor - EXACT MATCH with Hero Section */}
      

      {/* Dynamic Background Glow based on Hover */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] transition-colors duration-700 pointer-events-none opacity-20"
        style={{ backgroundColor: hoveredSkill ? hoveredSkill.color : 'transparent' }}
      ></div>

      {/* Header */}
      <div className="text-center mb-16 relative z-10 pointer-events-none">
        <div className="inline-block px-3 py-1 mb-4 rounded-full border border-white/10 bg-white/5 text-gray-400 text-xs font-medium uppercase tracking-widest">
           My Tech Stack
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Skills</span>
        </h2>
        <p className="text-gray-500 text-sm mt-3 uppercase tracking-widest animate-pulse">
          Drag sphere • Hover to inspect
        </p>
      </div>

      {/* 3D Container */}
      <div 
        ref={containerRef}
        className="relative w-[320px] h-[320px] md:w-[600px] md:h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing perspective-1000"
      >
        {/* Core Glow */}
        <div 
           className="absolute w-4 h-4 rounded-full transition-all duration-500"
           style={{ 
             backgroundColor: hoveredSkill ? hoveredSkill.color : '#fff',
             boxShadow: hoveredSkill ? `0 0 120px 80px ${hoveredSkill.color}30` : `0 0 80px 40px rgba(59,130,246,0.1)`
           }}
        ></div>

        {skills.map((skill, index) => {
          const IconComponent = skill.icon || Box;
          
          return (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform z-10"
              onMouseEnter={() => {
                 setHoveredSkill(skill);
                 document.body.style.cursor = 'pointer'; 
              }}
              onMouseLeave={() => {
                 setHoveredSkill(null);
                 document.body.style.cursor = 'default';
              }}
            >
              {/* The Premium Glass Tag */}
              <div 
                className={`
                  group relative pl-3 pr-5 py-2.5 border backdrop-blur-xl rounded-2xl flex items-center gap-3 
                  transition-all duration-300 transform shadow-2xl
                  ${hoveredSkill?.name === skill.name 
                    ? 'scale-125 bg-white/20 border-white/40 z-50 ring-2 ring-white/20' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'}
                `}
                style={{ 
                  boxShadow: hoveredSkill?.name === skill.name ? `0 0 40px ${skill.color}50` : `0 4px 10px rgba(0,0,0,0.3)` 
                }}
              >
                {/* Icon Box */}
                <div 
                  className={`
                    p-2 rounded-xl transition-all duration-300
                    ${hoveredSkill?.name === skill.name ? 'bg-white/20 text-white' : 'bg-black/20 text-gray-300'}
                  `}
                  style={{ color: hoveredSkill?.name === skill.name ? '#fff' : skill.color }}
                >
                  <IconComponent size={18} strokeWidth={2.5} />
                </div>
                
                {/* Text Info */}
                <div className="flex flex-col text-left">
                  <span className={`font-bold text-sm whitespace-nowrap drop-shadow-md transition-colors ${hoveredSkill?.name === skill.name ? 'text-white' : 'text-gray-200'}`}>
                    {skill.name}
                  </span>
                  
                  {/* Category Type (Frontend/Backend) */}
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">
                    {skill.type}
                  </span>

                  {/* Level Badge (Hidden until hover) */}
                  <div 
                    className={`
                      overflow-hidden transition-all duration-300 ease-in-out absolute -bottom-8 left-0 w-full flex justify-center
                      ${hoveredSkill?.name === skill.name ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
                    `}
                  >
                     <span className="text-[10px] text-black font-bold px-2 py-0.5 rounded shadow-lg" style={{ backgroundColor: skill.color }}>
                       {skill.level}
                     </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skill;