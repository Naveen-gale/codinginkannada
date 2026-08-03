import React, { useEffect, useRef } from "react";

/* ─── Content blocks ────────────────────────────────────── */
const BLOCKS = [
  {
    label: "Who I Am",
    text: `Hi, I'm Naveen, a BCA student from India with a strong passion for Artificial Intelligence, Machine Learning, and Generative AI. I enjoy transforming ideas into real-world AI products by taking projects from concept to deployment. My journey is driven by curiosity, continuous learning, and a desire to build technology that makes a meaningful impact.`,
  },
  {
    label: "What I Focus On",
    text: `Over the past few years I have focused on developing AI-powered applications, training custom language models, creating high-quality datasets, and deploying scalable AI solutions. I enjoy exploring how Large Language Models can solve practical problems and improve user experiences through intelligent automation.`,
  },
  {
    label: "How I Build",
    text: `One of my key interests is building custom AI models rather than relying only on existing APIs. I have worked on training GPT-based models, experimenting with fine-tuning techniques, designing datasets, and deploying inference APIs for production use. Alongside AI development, I build full-stack web and mobile applications that integrate machine learning into modern user interfaces.`,
  },
  {
    label: "My Philosophy",
    text: `I believe the best way to learn is by building. Every project I create helps me deepen my understanding of artificial intelligence, software engineering, and cloud deployment while improving my ability to solve complex technical challenges.`,
    quote: `"My goal is simple — build software that is fast, useful, and impactful."`,
  },
  {
    label: "My Goal",
    text: `As an aspiring AI Engineer, my goal is to contribute to the future of Generative AI by building innovative, scalable, and accessible AI products. I am always exploring new technologies, improving my skills, and challenging myself with projects that push the boundaries of what AI can achieve.`,
  },
  {
    label: "Beyond Code",
    text: `Outside of development, I enjoy learning about emerging AI research, experimenting with new technologies, contributing to personal projects, and sharing knowledge with others. I am committed to continuous growth and excited about creating intelligent solutions that can make a positive impact on people around the world.`,
  },
];

const FOCUS_TAGS = [
  "Generative AI",
  "LLM Fine-tuning",
  "MERN Stack",
  "Python",
  "Machine Learning",
  "Cloud Deployment",
];

/* ─── Component ─────────────────────────────────────────── */
const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ab-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = sectionRef.current?.querySelectorAll(".ab-item");
    items?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="about"
      ref={sectionRef}
      className="reveal-section relative bg-[#050505] py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* ── Section label ─────────────────────────────── */}
        <div className="ab-item" style={{ transitionDelay: "0ms" }}>
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-gray-300 text-xs font-semibold uppercase tracking-widest mb-6">
            About Me
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            AI Engineer &amp;{" "}
            <span className="text-gray-300">Full Stack Developer</span>
          </h2>
          <p className="mt-4 text-gray-400 text-base font-medium">
            BCA Student · Hubballi, India
          </p>
        </div>

        {/* ── Divider ───────────────────────────────────── */}
        <div className="ab-item my-10 h-px bg-white/8" style={{ transitionDelay: "80ms" }} />

        {/* ── Focus tags ────────────────────────────────── */}
        <div className="ab-item flex flex-wrap gap-2.5 mb-16" style={{ transitionDelay: "140ms" }}>
          {FOCUS_TAGS.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-lg bg-white/6 border border-white/12 text-gray-200 text-sm font-medium hover:bg-white/10 transition-colors cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ── Timeline blocks ───────────────────────────── */}
        <div className="relative border-l border-white/10 ml-1 space-y-12">

          {BLOCKS.map((block, i) => (
            <div
              key={block.label}
              className="ab-item relative pl-8 sm:pl-12"
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              {/* Timeline dot */}
              <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-[#050505] border-2 border-gray-500" />

              {/* Block label */}
              <p className="text-white text-sm font-bold uppercase tracking-widest mb-3">
                {block.label}
              </p>

              {/* Block text */}
              <p className="text-gray-300 text-base sm:text-[1.05rem] md:text-lg leading-[1.85] font-light">
                {block.text}
              </p>

              {/* Optional quote */}
              {block.quote && (
                <blockquote className="mt-6 pl-5 border-l-2 border-gray-600">
                  <p className="text-white text-base sm:text-lg md:text-xl italic font-normal leading-relaxed">
                    {block.quote}
                  </p>
                </blockquote>
              )}
            </div>
          ))}

        </div>

        {/* ── Divider ───────────────────────────────────── */}
        <div
          className="ab-item mt-16 h-px bg-white/8"
          style={{ transitionDelay: `${200 + BLOCKS.length * 100}ms` }}
        />

        {/* ── Bottom CTA ────────────────────────────────── */}
        <div
          className="ab-item mt-10"
          style={{ transitionDelay: `${260 + BLOCKS.length * 100}ms` }}
        >
          <p className="text-gray-400 text-base leading-relaxed">
            Let&apos;s build something meaningful together.{" "}
            <a
              href="#contact"
              className="text-white font-semibold underline underline-offset-4 hover:text-gray-300 transition-colors"
            >
              Get in touch →
            </a>
          </p>
        </div>

      </div>

      {/* ── Animation CSS ─────────────────────────────────── */}
      <style>{`
        .ab-item {
          opacity: 0;
          transform: translateX(-28px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ab-item.ab-visible {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </div>
  );
};

export default About;