import React from "react";
import { motion } from "framer-motion";
import { useTheme } from './ThemeContext';
import { services } from './data/services';

export default function HireMe() {
  const { isDark } = useTheme();


  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 hover-cursor-target">
          🤝 Let's Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 animate-gradient">Together</span>
        </h1>
        <p className={`text-xl mb-12 max-w-3xl mx-auto ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
          Whether you're hiring, collaborating, or just curious about my work —<br />
          I'd love to connect.<br />
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
          transition={{ duration: 0.3, delay: 0 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <motion.a
              href="mailto:iabhijais@gmail.com"
              whileHover={{ scale: 1.06, y: -6, boxShadow: "0 25px 50px rgba(168, 85, 247, 0.5)" }}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0 }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0 }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0 }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0 }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0 }}
              className={`group flex items-center gap-3 p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-50'} border ${isDark ? 'border-white/10 hover:border-green-400/50' : 'border-gray-200 hover:border-green-400/50'} transition-all duration-150 cursor-default hover-cursor-target`}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-150">
                <span className="text-2xl">📍</span>
              </div>
              <div className="text-left flex-1">
                <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'} group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-fuchsia-400 group-hover:to-cyan-300 transition-all duration-150`}>Location</div>
                <div className="font-medium group-hover:scale-105 transition-transform duration-150">Delhi NCR, India 🇮🇳</div>
              </div>
            </motion.div>

            <motion.a
              href="https://lablab.ai/u/@iabhijais"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.06, y: -6, boxShadow: "0 25px 50px rgba(249, 115, 22, 0.5)" }}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0 }}
              className={`group flex items-center gap-3 p-4 rounded-xl ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'} border ${isDark ? 'border-white/10 hover:border-orange-400/50' : 'border-gray-200 hover:border-orange-400/50'} transition-all duration-150 cursor-pointer`}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-150">
                <img src="/lablabnew.png" alt="Lablab.ai" className="w-8 h-8 object-contain" />
              </div>
              <div className="text-left flex-1">
                <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'} group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-fuchsia-400 group-hover:to-cyan-300 transition-all duration-150`}>Lablab.ai</div>
                <div className="font-medium group-hover:scale-105 transition-transform duration-150">@iabhijais</div>
              </div>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
