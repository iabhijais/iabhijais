import React from "react";
import Footer from './Footer.jsx';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HireMe() {
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

  const services = [
    {
      icon: "⚡",
      title: "Full-Stack Development",
      description: "End-to-end web applications with modern tech stack. React, Node.js, Next.js, and more.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: "🤖",
      title: "AI Integration",
      description: "Integrate AI-powered features into your products. LLMs, automation, and intelligent workflows.",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: "📊",
      title: "Real-time Analytics",
      description: "High-performance data pipelines and dashboards that handle millions of events.",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: "🎨",
      title: "UI/UX Design",
      description: "Pixel-perfect interfaces with smooth animations and exceptional user experience.",
      gradient: "from-orange-500 to-red-500"
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-300">Hire Me</span>
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
      <main className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            🤝 Let's Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-300">Together</span>
          </h1>
          <p className={`text-xl mb-12 max-w-3xl mx-auto ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
            Whether you're hiring, collaborating, or just curious about my work —<br/>
            I'd love to connect.<br/>
            Drop a message or reach out directly on LinkedIn or email..<span className="animate-blink">.</span>
          </p>

          {/* Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ scale: 1.06, y: -10, boxShadow: "0 30px 60px rgba(168, 85, 247, 0.5)" }}
                whileTap={{ scale: 0.96 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 500, 
                  damping: 20,
                  duration: 0.15,
                  delay: index * 0.05
                }}
                className={`group relative rounded-2xl p-6 ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/8' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'} border backdrop-blur-xl cursor-pointer`}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                <h3 className={`text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${service.gradient} group-hover:scale-105 transition-transform duration-300`}>
                  {service.title}
                </h3>
                <p className={`${isDark ? 'text-white/90' : 'text-gray-600'} group-hover:text-white transition-colors duration-300`}>
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <motion.a
                href="mailto:iabhijais@gmail.com"
                whileHover={{ scale: 1.06, y: -6, boxShadow: "0 25px 50px rgba(168, 85, 247, 0.5)" }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 500, damping: 20, duration: 0.15 }}
                className={`group flex items-center gap-3 p-4 rounded-xl ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'} border ${isDark ? 'border-white/10 hover:border-fuchsia-400/50' : 'border-gray-200 hover:border-fuchsia-400/50'} transition-all duration-150 cursor-pointer`}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-150">
                  <span className="text-2xl">📧</span>
                </div>
                <div className="text-left flex-1">
                  <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'} group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-fuchsia-400 group-hover:to-cyan-300 transition-all duration-150`}>Email</div>
                  <div className="font-medium group-hover:scale-105 transition-transform duration-150">iabhijais@gmail.com</div>
                </div>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/iabhijais/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.06, y: -6, boxShadow: "0 25px 50px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 500, damping: 20, duration: 0.15 }}
                className={`group flex items-center gap-3 p-4 rounded-xl ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'} border ${isDark ? 'border-white/10 hover:border-cyan-400/50' : 'border-gray-200 hover:border-cyan-400/50'} transition-all duration-150 cursor-pointer`}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-150">
                  <img src="/linkedin-icon.png" alt="LinkedIn" className="w-8 h-8 object-contain" />
                </div>
                <div className="text-left flex-1">
                  <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'} group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-fuchsia-400 group-hover:to-cyan-300 transition-all duration-150`}>LinkedIn</div>
                  <div className="font-medium group-hover:scale-105 transition-transform duration-150">linkedin.com/in/iabhijais</div>
                </div>
              </motion.a>

              <motion.a
                href="https://github.com/iabhijais"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.06, y: -6, boxShadow: "0 25px 50px rgba(107, 114, 128, 0.5)" }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 500, damping: 20, duration: 0.15 }}
                className={`group flex items-center gap-3 p-4 rounded-xl ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'} border ${isDark ? 'border-white/10 hover:border-gray-400/50' : 'border-gray-200 hover:border-gray-400/50'} transition-all duration-150 cursor-pointer`}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-500/20 to-slate-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-150">
                  <img src="/github-icon.png" alt="GitHub" className="w-8 h-8 object-contain" />
                </div>
                <div className="text-left flex-1">
                  <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'} group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-fuchsia-400 group-hover:to-cyan-300 transition-all duration-150`}>GitHub</div>
                  <div className="font-medium group-hover:scale-105 transition-transform duration-150">github.com/iabhijais</div>
                </div>
              </motion.a>

              <motion.a
                href="https://iabhijais.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.06, y: -6, boxShadow: "0 25px 50px rgba(139, 92, 246, 0.5)" }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 500, damping: 20, duration: 0.15 }}
                className={`group flex items-center gap-3 p-4 rounded-xl ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'} border ${isDark ? 'border-white/10 hover:border-purple-400/50' : 'border-gray-200 hover:border-purple-400/50'} transition-all duration-150 cursor-pointer`}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-150">
                  <span className="text-2xl">🌐</span>
                </div>
                <div className="text-left flex-1">
                  <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'} group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-fuchsia-400 group-hover:to-cyan-300 transition-all duration-150`}>Portfolio</div>
                  <div className="font-medium group-hover:scale-105 transition-transform duration-150">iabhijais.vercel.app</div>
                </div>
              </motion.a>

              <motion.div 
                whileHover={{ scale: 1.06, y: -6, boxShadow: "0 25px 50px rgba(34, 197, 94, 0.5)" }}
                transition={{ type: "spring", stiffness: 500, damping: 20, duration: 0.15 }}
                className={`group flex items-center gap-3 p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-50'} border ${isDark ? 'border-white/10 hover:border-green-400/50' : 'border-gray-200 hover:border-green-400/50'} transition-all duration-150 cursor-default`}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-150">
                  <span className="text-2xl">📍</span>
                </div>
                <div className="text-left flex-1">
                  <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'} group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-fuchsia-400 group-hover:to-cyan-300 transition-all duration-150`}>Location</div>
                  <div className="font-medium group-hover:scale-105 transition-transform duration-150">Delhi NCR, India</div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.06, y: -6, boxShadow: "0 25px 50px rgba(249, 115, 22, 0.5)" }}
                transition={{ type: "spring", stiffness: 500, damping: 20, duration: 0.15 }}
                className={`group flex items-center gap-3 p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-50'} border ${isDark ? 'border-white/10 hover:border-orange-400/50' : 'border-gray-200 hover:border-orange-400/50'} transition-all duration-150 cursor-default`}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-150">
                  <span className="text-2xl">⏰</span>
                </div>
                <div className="text-left flex-1">
                  <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'} group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-fuchsia-400 group-hover:to-cyan-300 transition-all duration-150`}>Timezone</div>
                  <div className="font-medium group-hover:scale-105 transition-transform duration-150">IST (UTC+5:30)</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
