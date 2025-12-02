import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';

export default function NotFound() {
  const { isDark } = useTheme();

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-[120px] sm:text-[180px] font-black leading-none">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 animate-gradient">404</span>
        </h1>
        
        <h2 className={`text-2xl sm:text-3xl font-bold mt-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Page Not Found
        </h2>
        
        <p className={`mt-4 text-lg max-w-md mx-auto ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`mt-8 px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300`}
          >
            ← Back to Home
          </motion.button>
        </Link>
      </motion.div>
    </main>
  );
}
