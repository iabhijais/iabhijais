import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from './ThemeContext';
import { projects } from './data/projects';
import { useLocation } from 'react-router-dom';

export default function Projects() {
  const { isDark } = useTheme();
  const location = useLocation();

  // Handle scroll to project from navigation state
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const targetId = location.state.scrollTo;
      const element = document.getElementById(targetId);
      if (element) {
        // Small delay to ensure rendering is complete
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, [location]);

  // Tailwind Safelist to ensure classes are generated without server restart
  const safelist = [
    "from-amber-400 to-orange-500",
    "from-blue-500 to-teal-400",
    "from-cyan-400 to-purple-600",
    "from-purple-500 to-pink-500",
    "from-cyan-500 to-blue-500",
    "from-green-500 to-teal-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-purple-500"
  ];


  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 hover-cursor-target">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 animate-gradient">Projects</span>
          </h1>
          <p className={`text-xl md:text-2xl max-w-3xl ${isDark ? 'text-white' : 'text-gray-600'}`}>
            An assortment of projects I've been actively involved in or have crafted<span className="animate-blink">.</span>
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              id={project.title.toLowerCase().replace(/\s+/g, '-')}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`group relative rounded-3xl p-8 ${isDark ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'} border backdrop-blur-xl transition-all duration-500`}
            >
              {/* Icon & Status Badge */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 gap-4 sm:gap-0">
                <div className={`w-14 h-14 rounded-xl ${isDark ? 'bg-gradient-to-br from-white/10 to-white/5' : 'bg-gradient-to-br from-gray-200 to-gray-100'} flex items-center justify-center text-3xl border ${isDark ? 'border-white/10' : 'border-gray-300'}`}>
                  📁
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${isDark ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30' : 'bg-green-100 text-green-700 border border-green-300'}`}>
                    {project.status}
                  </div>
                  {project.link !== "#" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-lg ${isDark ? 'bg-white/5 hover:bg-white/10 border-white/10' : 'bg-gray-200 hover:bg-gray-300 border-gray-300'} border flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
                      title="View Live Project"
                    >
                      <span className="text-xl">↗</span>
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-lg ${isDark ? 'bg-white/5 hover:bg-white/10 border-white/10' : 'bg-gray-200 hover:bg-gray-300 border-gray-300'} border flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
                      title="GitHub Repository"
                    >
                      <img src="/github-icon.png" alt="GitHub" className={`w-6 h-6 object-contain ${!isDark ? 'invert' : ''}`} />
                    </a>
                  )}
                  {project.credential && (
                    <a
                      href={project.credential}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-lg ${isDark ? 'bg-white/5 hover:bg-white/10 border-white/10' : 'bg-gray-200 hover:bg-gray-300 border-gray-300'} border flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
                      title="View Credential"
                    >
                      {project.credential.includes('lablab.ai') ? (
                        <img src="/lablabnew.png" alt="Lablab.ai" className="w-6 h-6 object-contain" />
                      ) : (
                        <span className="text-xl">🏆</span>
                      )}
                    </a>
                  )}
                  {project.paper && (
                    <a
                      href={project.paper}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-lg ${isDark ? 'bg-white/5 hover:bg-white/10 border-white/10' : 'bg-gray-200 hover:bg-gray-300 border-gray-300'} border flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
                      title="View Research Paper"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              {/* Project Title */}
              <h3 className={`text-3xl md:text-4xl font-bold mb-4 pb-1 bg-clip-text text-transparent bg-gradient-to-r ${project.gradient} group-hover:scale-[1.02] transition-transform duration-300`}>
                {project.title}
              </h3>

              {/* Description */}
              <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-white/75' : 'text-gray-700'}`}>
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2.5">
                {project.tech.map((tech, i) => {
                  const iconMap = {
                    "IBM watsonx Orchestrate": "/TechStack/IBM.svg",
                    "Agentic AI": "https://cdn.simpleicons.org/robotframework/00C0B5",
                    "Python (FastAPI)": "/TechStack/fast-api.svg",
                    "Generative AI / LLMs": "/TechStack/openai.svg",
                    "Next.js": "/TechStack/nextjs.svg",
                    "Vercel": "/TechStack/vercel-light.svg",
                    "AI Automation": "/TechStack/n8n_pink+white_logo.svg",
                    "Node.js": "/TechStack/nodejs.svg",
                    "Firebase": "/TechStack/firebase.svg",
                    "Tailwind CSS": "/TechStack/tailwindcss.svg",
                    "GenAI": "/TechStack/openai.svg",
                    "Generative AI": "/TechStack/Google_Gemini_icon_2025.svg.png",
                    "Real-time Analytics": "/TechStack/data_viz_icon.png",
                    "React.js": "/TechStack/reactjs.svg",
                    "TypeScript": "/TechStack/typescript.svg",
                    "Animations": "/TechStack/framer-light.svg",
                    "Glassmorphism": "/TechStack/figma.svg",
                    "Python": "https://cdn.simpleicons.org/python/3776AB",
                    "OpenCV": "https://cdn.simpleicons.org/opencv/5C3EE8",
                    "TensorFlow": "/TechStack/tensorflow.svg",
                    "CNN": "/TechStack/tensorflow.svg",
                    "Facial Recognition": "https://cdn.simpleicons.org/opencv/5C3EE8",
                    "Java": "/TechStack/Java.svg",
                    "Android Studio": "https://cdn.simpleicons.org/androidstudio/3DDC84",
                    "SQLite": "https://cdn.simpleicons.org/sqlite/003B57",
                    "Claude": "https://cdn.simpleicons.org/anthropic/D97757",
                    "LLM Orchestration": "/TechStack/openai.svg",
                    "Legal Technology": "https://cdn.simpleicons.org/googlescholar/4285F4"
                  };
                  const icon = iconMap[tech];

                  return (
                    <span
                      key={i}
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg ${isDark ? 'bg-white/5 text-white/90 border border-white/10 hover:bg-white/10' : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50'} transition-all duration-300 hover:scale-105 hover-cursor-target`}
                    >
                      {icon && <img src={icon} alt={tech} className={`w-4 h-4 object-contain ${isDark && icon.includes('openai.svg') ? 'invert' : ''} ${!isDark && icon.includes('vercel-light.svg') ? 'invert' : ''}`} />}
                      {tech}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
