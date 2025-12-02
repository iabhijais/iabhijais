import React from "react";
import { motion } from "framer-motion";
import { useTheme } from './ThemeContext';

export default function Resume() {
  const { isDark } = useTheme();

  const handlePdfMouseEnter = () => {
    // Hide custom cursor when entering PDF area
    const cursorGlow = document.querySelector('.cursor-glow');
    const cursorDot = document.querySelector('.cursor-dot');
    if (cursorGlow) cursorGlow.style.opacity = '0';
    if (cursorDot) cursorDot.style.opacity = '0';
  };

  const handlePdfMouseLeave = () => {
    // Show custom cursor when leaving PDF area
    const cursorGlow = document.querySelector('.cursor-glow');
    const cursorDot = document.querySelector('.cursor-dot');
    if (cursorGlow) cursorGlow.style.opacity = '';
    if (cursorDot) cursorDot.style.opacity = '';
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          📄 My <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 animate-gradient">Resume</span>
        </h1>
        <p className={`text-xl mb-12 max-w-3xl mx-auto ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
          A comprehensive overview of my experience, skills, and education.<br />
          Feel free to download or view it directly below..<span className="animate-blink">.</span>
        </p>

        {/* Resume Viewer */}
        <div
          className={`w-full h-[85vh] rounded-2xl overflow-hidden border ${isDark ? 'border-white/10' : 'border-gray-200 bg-gray-50'} shadow-2xl relative group mb-8`}
          onMouseEnter={handlePdfMouseEnter}
          onMouseLeave={handlePdfMouseLeave}
        >
          {/* White background for PDF readability in dark mode */}
          <div className="w-full h-full bg-white">
            <iframe
              src="/Resume_AbhishekJaisal.pdf"
              className="w-full h-full"
              title="Resume PDF"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-6 pb-12">
          <motion.a
            href="/Resume_AbhishekJaisal.pdf"
            download="Abhishek_Jaisal_Resume.pdf"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base ${isDark ? 'bg-white/10 text-white hover:bg-white/20 border-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border-gray-200'} border transition-all duration-300 cursor-pointer !no-underline`}
          >
            <span className="text-xl">⬇️</span>
            <span>Download PDF</span>
          </motion.a>

          <motion.a
            href="/Resume_AbhishekJaisal.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base ${isDark ? 'bg-white/10 text-white hover:bg-white/20 border-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border-gray-200'} border transition-all duration-300 !no-underline`}
          >
            <span className="text-xl">🔗</span>
            <span>Open in New Tab</span>
          </motion.a>
        </div>
      </motion.div>
    </main>
  );
}
