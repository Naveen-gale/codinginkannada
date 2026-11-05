import React, { useEffect, useRef, useState } from "react";
import { Folder, GitFork, Star, ArrowUpRight, Github } from "lucide-react";

const GITHUB_USERNAME = "Naveen-gale";

// GitHub language colors
const getLanguageColor = (language) => {
  const colors = {
    JavaScript: "#F7DF1E",
    TypeScript: "#3178C6",
    Python: "#3776AB",
    Java: "#ED8B00",
    "C++": "#00599C",
    C: "#A8B9CC",
    React: "#61DAFB",
    "React Native": "#61DAFB",
    CSS: "#2965F1",
    HTML: "#E34F26",
    Dart: "#0175C2",
    Flutter: "#02569B",
    PHP: "#777BB4",
    Go: "#00ADD8",
    Rust: "#DEA584",
    Kotlin: "#A97BFF",
    Swift: "#F05138",
    Ruby: "#CC342D",
    Shell: "#89E051",
    "Jupyter Notebook": "#F37626",
  };

  return colors[language] || "#9CA3AF";
};

// Project Card
const ProjectCard = ({ project }) => {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-56 sm:w-64 md:w-72 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md mx-2 sm:mx-3 hover:bg-white/10 hover:border-blue-500/30 transition-all group relative overflow-hidden whitespace-normal"
    >
      {/* Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-1.5 rounded-lg bg-white/5 text-blue-400 group-hover:text-white group-hover:bg-blue-600 transition-colors shadow-inner flex-shrink-0">
            <Folder size={16} />
          </div>

          <h3
            className="text-white font-bold text-sm tracking-wide group-hover:text-blue-300 transition-colors truncate"
            title={project.name}
          >
            {project.name}
          </h3>
        </div>

        <ArrowUpRight
          size={14}
          className="text-gray-500 group-hover:text-white transition-colors flex-shrink-0"
        />
      </div>

      {/* Description */}
      <p
        className="text-gray-400 text-xs leading-relaxed mb-4 h-8 line-clamp-2 relative z-10"
        title={project.desc}
      >
        {project.desc}
      </p>

      {/* Bottom */}
      <div className="flex items-center justify-between mt-auto relative z-10 pt-3 border-t border-white/5">
        {/* Language */}
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]"
            style={{
              backgroundColor: project.color,
              color: project.color,
            }}
          />

          <span className="text-gray-300 text-[10px] font-mono font-medium">
            {project.lang || "Other"}
          </span>
        </div>

        {/* GitHub Stats */}
        <div className="flex gap-3 text-gray-500 text-[10px] font-medium">
          <span className="flex items-center gap-1 hover:text-yellow-400 transition-colors">
            <Star size={10} />
            <span>{project.stars}</span>
          </span>

          <span className="flex items-center gap-1 hover:text-white transition-colors">
            <GitFork size={10} />
            <span>{project.forks}</span>
          </span>
        </div>
      </div>
    </a>
  );
};

const GitHubProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const pauseRow1Ref = useRef(false);
  const pauseRow2Ref = useRef(false);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch GitHub repositories");
        }

        const data = await response.json();

        // Remove fork repositories
        const repositories = data
          .filter((repo) => !repo.fork)
          .map((repo) => ({
            name: repo.name,
            repo: repo.name,
            desc: repo.description || "No description available.",
            lang: repo.language || "Other",
            color: getLanguageColor(repo.language),
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            url: repo.html_url,
            updated: repo.updated_at,
          }));

        setProjects(repositories);
      } catch (err) {
        console.error("GitHub API Error:", err);
        setError("Unable to load GitHub repositories.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  // Split repositories between two rows
  const firstRow = projects.filter((_, index) => index % 2 === 0);
  const secondRow =
    projects.length > 1
      ? projects.filter((_, index) => index % 2 !== 0)
      : projects;

  // Repeat 4x so both halves of the track are wider than any screen
  const firstRowLoop = [...firstRow, ...firstRow, ...firstRow, ...firstRow];
  const secondRowLoop = [...secondRow, ...secondRow, ...secondRow, ...secondRow];

  // GPU-accelerated opposite-direction scroll loop
  useEffect(() => {
    if (loading || error || projects.length === 0) return;

    let animationFrameId;
    let x1 = 0;
    let x2 = null; // Initialized once DOM width is measured
    let lastTime = performance.now();
    const speed = 45; // Pixels per second (adjust higher for faster, lower for slower)

    const animate = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const el1 = row1Ref.current;
      const el2 = row2Ref.current;

      // ROW 1 -> Moves LEFT (0 to -halfWidth)
      if (el1) {
        const halfWidth1 = el1.scrollWidth / 2;
        if (halfWidth1 > 0 && !pauseRow1Ref.current) {
          x1 -= speed * dt;
          if (Math.abs(x1) >= halfWidth1) {
            x1 += halfWidth1;
          }
          el1.style.transform = `translate3d(${x1}px, 0, 0)`;
        }
      }

      // ROW 2 -> Moves RIGHT / OPPOSITE (-halfWidth to 0)
      if (el2) {
        const halfWidth2 = el2.scrollWidth / 2;
        if (halfWidth2 > 0) {
          if (x2 === null) {
            x2 = -halfWidth2;
          }
          if (!pauseRow2Ref.current) {
            x2 += speed * dt;
            if (x2 >= 0) {
              x2 -= halfWidth2;
            }
            el2.style.transform = `translate3d(${x2}px, 0, 0)`;
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [loading, error, projects]);

  return (
    <div className="reveal-section relative bg-[#050505] py-16 overflow-hidden">
      {/* ================= HEADER ================= */}
      <div className="relative z-10 text-center mb-10 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-white/10 bg-white/5 text-gray-400 text-[10px] font-medium uppercase tracking-widest">
          <Github size={12} />
          Codebase
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          GitHub{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Repositories
          </span>
        </h2>

        <p className="text-gray-500 text-sm mt-3">
          Open-source projects and experiments from my GitHub
        </p>
      </div>

      {/* ================= LOADING ================= */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="flex items-center gap-3 text-gray-400 text-sm">
            <div className="w-4 h-4 border-2 border-gray-600 border-t-blue-400 rounded-full animate-spin" />
            Loading repositories...
          </div>
        </div>
      )}

      {/* ================= ERROR ================= */}
      {!loading && error && (
        <div className="flex justify-center py-10">
          <div className="px-5 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        </div>
      )}

      {/* ================= EMPTY ================= */}
      {!loading && !error && projects.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          No repositories found.
        </div>
      )}

      {/* ================= PROJECT SLIDER ================= */}
      {!loading && !error && projects.length > 0 && (
        <div className="flex flex-col gap-6">
          {/* ================= ROW 1 (Moves Left ⬅️) ================= */}
          <div
            className="relative w-full overflow-hidden"
            onMouseEnter={() => (pauseRow1Ref.current = true)}
            onMouseLeave={() => (pauseRow1Ref.current = false)}
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <div
              ref={row1Ref}
              className="flex items-center w-max will-change-transform"
            >
              {firstRowLoop.map((project, index) => (
                <ProjectCard
                  key={`row1-${project.repo}-${index}`}
                  project={project}
                />
              ))}
            </div>
          </div>

          {/* ================= ROW 2 (Moves Right ➡️) ================= */}
          <div
            className="relative w-full overflow-hidden"
            onMouseEnter={() => (pauseRow2Ref.current = true)}
            onMouseLeave={() => (pauseRow2Ref.current = false)}
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <div
              ref={row2Ref}
              className="flex items-center w-max will-change-transform"
            >
              {secondRowLoop.map((project, index) => (
                <ProjectCard
                  key={`row2-${project.repo}-${index}`}
                  project={project}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= VIEW GITHUB ================= */}
      {!loading && (
        <div className="relative z-10 flex justify-center mt-10">
          <a
            href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-sm hover:bg-white/10 hover:text-white hover:border-blue-500/30 transition-all"
          >
            <Github size={16} />
            View All Repositories
            <ArrowUpRight size={14} />
          </a>
        </div>
      )}
    </div>
  );
};

export default GitHubProjects;