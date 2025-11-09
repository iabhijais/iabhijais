import React from "react";
import Footer from './Footer.jsx';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Resume() {
  const [isDark, setIsDark] = React.useState(true);

  const toggleTheme = () => {
    // Play pleasant click sound
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

  return (
    <div className={`min-h-screen h-full ${isDark ? 'bg-black text-white' : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900'} relative overflow-x-hidden transition-all duration-300`}>
      {/* Electric Neon Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent">
        <div 
          className="h-full electric-progress"
          style={{ width: `${typeof window !== 'undefined' ? (window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100) : 0}%` }}
        />
      </div>

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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-300">Resume</span>
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

      {/* RESUME CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 flex justify-center gap-4">
            <a
              href="/Resume_AbhishekJaisal.pdf"
              download
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' : 'bg-gray-200 border-gray-300 hover:bg-gray-300 text-gray-900'} border`}
            >
              📥 Download PDF
            </a>
            <a
              href="/Resume_AbhishekJaisal.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' : 'bg-gray-200 border-gray-300 hover:bg-gray-300 text-gray-900'} border`}
            >
              🔗 Open in New Tab
            </a>
          </div>

          {/* PDF Embed with full toolbar */}
          <div className={`rounded-2xl overflow-hidden border-2 ${isDark ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'} shadow-2xl`}>
            <iframe
              src="/Resume_AbhishekJaisal.pdf"
              className="w-full min-h-screen"
              style={{ height: '100vh' }}
              title="Abhishek Jaisal Resume"
              frameBorder="0"
            />
          </div>
        </motion.div>
      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
