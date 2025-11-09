import React from "react";
import Footer from './Footer.jsx';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Projects() {
  const [isDark, setIsDark] = React.useState(true);

  const toggleTheme = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = isDark ? 800 : 600;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
    
    setIsDark(!isDark);
  };

  React.useEffect(() => {
    document.body.className = isDark ? 'dark-mode' : 'light-mode';
  }, [isDark]);

  const projects = [
    {
      title: "GameGrid.gg — Esports Analytics & Community Platform",
      description: "Building an end-to-end Esports Analytics Platform for players, teams, and analysts under the project GameGrid.gg. Architected full-stack system using Next.js, Node.js, Firebase, and Tailwind CSS, featuring real-time stats, match insights, and player dashboards. Integrated GenAI modules for automated commentary and player performance analysis. Currently in closed beta with competitive BGMI teams.",
      tech: ["Next.js", "Node.js", "Firebase", "Tailwind CSS", "GenAI", "Real-time Analytics"],
      status: "In Progress",
      link: "https://game-grid-one.vercel.app/",
      github: "https://github.com/iabhijais",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "ShellShock Counter — Interactive Strategy Game Tracker",
      description: "A fun, interactive web app inspired by Buckshot Roulette, designed for strategic gameplay and shell tracking. Players can track Active and Blank shells, plan their moves visually, and enjoy a smooth, animated experience built with Next.js and TypeScript. The app features vibrant visuals, responsive design, and a dynamic counter system — making it a perfect mix of logic, fun, and frontend creativity!",
      tech: ["Next.js", "React.js", "TypeScript", "Animations", "Glassmorphism"],
      status: "Completed & Live",
      link: "https://shell-counter.vercel.app/",
      github: "https://github.com/iabhijais",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      title: "Driver Sleepiness Detection (AI-Based Safety System)",
      description: "Developed a real-time driver drowsiness detection system using Convolutional Neural Networks (CNN) and facial feature recognition. Integrated OpenCV for live camera feed and TensorFlow for model training. The project detects eye-blink patterns to alert the driver and prevent road accidents. Published research in ICIRB 2023 Conference.",
      tech: ["Python", "OpenCV", "TensorFlow", "CNN", "Facial Recognition"],
      status: "Completed",
      link: "#",
      credential: "https://confmanage.com/Author/ConferencePaper/PaperDetails/3832",
      paper: "https://drive.google.com/file/d/1sn9BYWQRvwpvnr8UGm2zMkitVSfcsU6Q/view?usp=sharing",
      gradient: "from-green-500 to-teal-500"
    },
    {
      title: "Helperly — Android Emergency Assistance Application",
      description: "Created an emergency Android app that sends secure SMS alerts to preset contacts when triggered by password. Built using Java, Firebase Authentication, and SQLite, the app runs silently in the background to enhance user safety. Accepted for oral presentation at 9th International Conference ICICSE 2021 and later published in IJSET Journal (Vol. 9, Issue 4, 2021).",
      tech: ["Java", "Android Studio", "Firebase", "SQLite"],
      status: "Completed",
      link: "#",
      credential: "https://www.ijset.in/volume-9-issue-4/",
      paper: "https://drive.google.com/file/d/1R7N3RaKoGRy5jPjfAB13tN1XsCijiKox/view?usp=sharing",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "All-in-One Calculator",
      description: "All-in-One Calculator is a responsive and modular web application designed to perform multiple calculation types in a single interface. Built with React.js + TypeScript, styled with Tailwind CSS, and deployed via Vercel, it provides a seamless user experience with real-time calculation, multiple themes, and precision. Features include Normal Mode (standard arithmetic), Scientific Mode (advanced math functions like sin, cos, tan, log, factorials, roots), BMI Calculator (health insights based on metric or imperial input), Age Calculator (instant age computation from birth date), and Currency Converter (custom rate and preset conversion options).",
      tech: ["React.js", "TypeScript", "Tailwind CSS", "Vercel"],
      status: "Completed & Live",
      link: "https://calc-all.vercel.app/",
      github: "https://github.com/iabhijais",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <div className={`min-h-screen h-full ${isDark ? 'bg-black text-white' : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900'} relative overflow-x-hidden transition-all duration-300`}>
      {/* floating gradient glows */}
      {isDark && (
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 w-[42rem] h-[42rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,.18),transparent_60%)] blur-3xl animate-glowPulse" />
          <div className="absolute -bottom-48 -right-48 w-[50rem] h-[50rem] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,.16),transparent_60%)] blur-3xl animate-glowPulse delay-300" />
          <div className="absolute top-1/3 -right-24 w-[36rem] h-[36rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,.18),transparent_60%)] blur-3xl animate-glowPulse delay-700" />
        </div>
      )}

      {/* NAV */}
      <header className={`w-full sticky top-0 z-20 ${isDark ? 'bg-black/50' : 'bg-white/80'} backdrop-blur-md transition-colors duration-300 ${!isDark && 'shadow-sm'}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className={`font-bold text-xl flex items-center gap-2 px-4 py-2 -ml-4`}>
            <a href="/" className="transition-all duration-300 rounded-lg nav-link-logo relative p-1 -m-1">
              <img src="/Logo.ico" alt="Logo" className="w-6 h-6 object-contain" />
            </a>
            <span className="flex items-center -mt-0.5">
              <span className={isDark ? 'text-white' : 'text-gray-900'}>/</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-300">Projects</span>
              <span className={`animate-blink ${isDark ? 'text-white' : 'text-gray-900'}`}>~</span>
            </span>
          </div>
          <nav className="flex items-center gap-0 text-base font-semibold">
            <Link className={`nav-link-tab cursor-pointer transition-all duration-300 px-4 py-2 relative`} to="/">Home</Link>
            <Link className={`nav-link-tab cursor-pointer transition-all duration-300 px-4 py-2 relative`} to="/projects">Projects</Link>
            <Link className={`nav-link-tab cursor-pointer transition-all duration-300 px-4 py-2 relative`} to="/gaming">Gaming</Link>
            <Link className={`nav-link-tab cursor-pointer transition-all duration-300 px-4 py-2 relative`} to="/hire-me">Hire Me</Link>
            <button 
              onClick={toggleTheme}
              className={`theme-toggle-btn w-10 h-10 rounded-full ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' : 'bg-gray-200 border-gray-300 hover:bg-gray-300 hover:border-gray-400'} border text-xl transition-all duration-500 hover:scale-110 hover:rotate-180 overflow-hidden relative ml-6`}
            >
              <span className={`theme-icon ${isDark ? 'theme-sun' : 'theme-moon'}`}>
                {isDark ? '☀️' : '🌙'}
              </span>
            </button>
          </nav>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-300">Projects</span>
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
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`group relative rounded-3xl p-8 ${isDark ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'} border backdrop-blur-xl transition-all duration-500`}
              >
                {/* Icon & Status Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-xl ${isDark ? 'bg-gradient-to-br from-white/10 to-white/5' : 'bg-gradient-to-br from-gray-200 to-gray-100'} flex items-center justify-center text-3xl border ${isDark ? 'border-white/10' : 'border-gray-300'}`}>
                    📁
                  </div>
                  
                  <div className="flex items-center gap-3">
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
                        <img src="/github-icon.png" alt="GitHub" className="w-6 h-6 object-contain" />
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
                        <span className="text-xl">🏆</span>
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
                        <span className="text-xl">📄</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Title */}
                <h3 className={`text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${project.gradient} group-hover:scale-[1.02] transition-transform duration-300`}>
                  {project.title}
                </h3>
                
                {/* Description */}
                <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-white/75' : 'text-gray-700'}`}>
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2.5">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className={`px-4 py-2 text-sm font-medium rounded-lg ${isDark ? 'bg-white/5 text-white/90 border border-white/10 hover:bg-white/10' : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50'} transition-all duration-300 hover:scale-105`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
