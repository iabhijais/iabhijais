import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import ElectricBorder from './ElectricBorder';

// Abhishek Portfolio — r3hbr-style hero (fixed & stable)

const NeonButton = ({ title, subtitle, description, href = "#", glow = "from-fuchsia-500 to-violet-500", tilt = 0.8, icon = "🧪", iconClass = "text-2xl", showLine = false, openInNewTab = false, onClick, electricColor }) => {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      e.stopPropagation();
      onClick(e);
    } else if (openInNewTab && href !== "#") {
      e.preventDefault();
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };
  const isInternal = href.startsWith('/') && !openInNewTab;
  const isButton = onClick && href === "#";
  const Wrapper = ({ children }) => isButton ? (
    <button type="button" className="block group w-full text-left cursor-pointer" onClick={handleClick} style={{ pointerEvents: 'auto' }}>{children}</button>
  ) : isInternal ? (
    <Link to={href} className="block group cursor-pointer" onClick={handleClick} style={{ pointerEvents: 'auto' }}>{children}</Link>
  ) : (
    <a href={href} className="block group cursor-pointer" onClick={handleClick} target={openInNewTab ? "_blank" : undefined} rel={openInNewTab ? "noopener noreferrer" : undefined} style={{ pointerEvents: 'auto' }}>{children}</a>
  );

  const InnerContent = (
    <div
      className={`relative rounded-2xl p-[1px] bg-gradient-to-r ${glow} glow-outer hover-cursor-target ${showLine ? 'neon-btn-line' : ''}`}
      style={{ pointerEvents: 'auto' }}
    >
      <div className="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 px-5 h-[64px] flex items-center justify-between overflow-hidden" style={{ pointerEvents: 'auto' }}>
        <span className="pointer-events-none absolute inset-0 sheen" />
        <div className="flex items-center gap-3" style={{ pointerEvents: 'none' }}>
          <div className={`w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center ${iconClass}`}>{icon}</div>
          <div>
            <div className="text-sm text-white font-bold tracking-wide">{title}</div>
            {description && <div className="text-[10px] text-white/60 leading-tight max-w-[180px] font-medium">{description}</div>}
          </div>
        </div>
        <div className="text-amber-300 font-bold text-xs whitespace-nowrap tracking-wide" style={{ pointerEvents: 'none' }}>{subtitle} →</div>
      </div>
    </div>
  );

  return (
    <Wrapper>
      <motion.div
        whileHover={{ scale: 1.04, rotate: tilt }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        style={{ pointerEvents: 'auto' }}
      >
        {electricColor ? (
          <ElectricBorder color={electricColor} speed={1} chaos={0.5} thickness={2} style={{ borderRadius: 16 }}>
            {InnerContent}
          </ElectricBorder>
        ) : (
          InnerContent
        )}
      </motion.div>
    </Wrapper>
  );
};

export default function App() {
  const { isDark } = useTheme();
  const [isTechStackOpen, setIsTechStackOpen] = useState(false);

  const scrollToAbout = (e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    const el = document.getElementById('about-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="max-w-6xl mx-auto px-6 pt-4 pb-24 relative">
      <div className="lg:pr-[420px]">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[40px] sm:text-[56px] md:text-[72px] leading-[1.05] font-black tracking-tight pointer-events-none"
          >
            <span className="block text-anim cursor-pointer pointer-events-auto">I don't write code</span>
            <span className="block text-anim cursor-pointer pointer-events-auto">— I <motion.span className="pb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 hover-cursor-target animate-gradient">generate</motion.span> experiences...</span>
            <span className="block text-anim cursor-pointer pointer-events-auto">Powered by <motion.span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 hover-cursor-target animate-gradient">AI</motion.span>!</span>
            <span className="block text-anim cursor-pointer pointer-events-auto mb-6">Fueled by <motion.span className={`italic pr-2 text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-slate-400 via-gray-100 to-slate-400' : 'from-amber-500 via-orange-400 to-amber-500'} animate-gradient hover-cursor-target`}>caffeine</motion.span><span className="-ml-2">.</span></span>
          </motion.h1>

          <h2 className="mt-8 text-2xl sm:text-3xl font-bold tracking-tight text-anim leading-relaxed">
            My Superpower?
          </h2>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-anim leading-relaxed">
            I can turn <motion.span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-500 to-cyan-300 animate-gradient hover-cursor-target">prompts into production</motion.span>
          </h2>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-anim leading-relaxed">
            before you've even finished explaining.
          </h2>

          <h2 id="about-section" className="scroll-mt-20 mt-8 mb-6 pb-2 text-[2.5rem] sm:text-[3.5rem] font-extrabold tracking-tight text-anim">
            I'm <motion.span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDark ? 'from-neutral-600 via-neutral-100 to-neutral-600 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.5)]' : 'from-purple-600 via-fuchsia-500 to-purple-600 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]'} animate-gradient transition-all duration-300 hover-cursor-target`}>Abhishek...</motion.span>
          </h2>

          <div className={`mt-2 text-[1.125rem] leading-[1.8] space-y-5 max-w-4xl ${isDark ? 'text-white' : 'text-gray-700'}`}>
            <p className="text-anim cursor-pointer">
              I'm an <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">AI Enhanced Full-stack developer</span> and <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>founder</span>, currently building <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">GameGrid</span> — India's first esports performance analytics platform. I design <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>scalable systems</span>, build <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>real-time data pipelines</span>, and ship products fast with <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">AI-assisted workflows</span>.
            </p>

            <p className="text-anim cursor-pointer">
              My work blends <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">AI</span>, <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>UI/UX design</span>, and <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>data engineering</span>. I'm constantly exploring how AI can <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">accelerate development cycles</span>, optimize user experiences, and turn ideas into <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>production-grade products</span>.
            </p>

            <p className="text-anim cursor-pointer">
              I love <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>building at speed</span>, experimenting with <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">AI-driven workflows</span>, and solving <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>high-pressure problems</span> in both tech and esports. Whether it's architecting <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>scalable backends</span> or refining <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>pixel-perfect interfaces</span>, I enjoy the challenge of creating <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>systems that perform under pressure</span>.
            </p>

            <p className="text-anim cursor-pointer">
              Beyond development, I've led <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">esports teams</span> in <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>national tournaments</span>, managed <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>competitive rosters</span>, and built <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>communities</span> around gaming and strategy. This combination of <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>technical expertise</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">competitive leadership</span> has shaped how I approach <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>problem-solving</span> and <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>team collaboration</span>.
            </p>

            <p className="text-anim cursor-pointer">
              Here, I share my <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">projects, systems, and insights</span> from building <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>startups</span>, <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>esports analytics</span>, and <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">AI-powered tools</span>. <span className="block mt-3 text-[1.15rem]">If you're building something <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>ambitious</span>, <a href="https://www.linkedin.com/in/iabhijais/" target="_blank" rel="noopener noreferrer" className={`inline-block transition-all duration-300 font-bold px-4 py-1.5 rounded-lg text-white ${isDark ? 'bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]' : 'bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg'}`}>let's connect</a> →</span>
            </p>
          </div>

        </div>

        {/* Mobile Quick Actions - Horizontal Slider */}
        <div className="mt-6 lg:hidden">
          {/* Premium Glass Container */}
          <div className={`relative rounded-2xl overflow-hidden ${isDark ? 'bg-black/20' : 'bg-white/30'} backdrop-blur-xl border ${isDark ? 'border-white/10' : 'border-gray-200/50'}`}>
            {/* Subtle gradient overlay */}
            <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5' : 'bg-gradient-to-r from-purple-100/30 via-transparent to-cyan-100/30'}`} />

            {/* Horizontal Scroll Container */}
            <div className="relative flex gap-3 p-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
              {/* Projects Card */}
              <Link to="/projects" className="snap-start flex-shrink-0">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="relative w-[140px] h-[100px] rounded-xl p-[1px] bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500"
                >
                  <div className={`h-full rounded-xl ${isDark ? 'bg-black/60' : 'bg-white/80'} backdrop-blur-sm p-3 flex flex-col justify-between`}>
                    <div className={`w-8 h-8 rounded-lg ${isDark ? 'bg-white/10' : 'bg-purple-100'} flex items-center justify-center text-lg`}>💡</div>
                    <div>
                      <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Projects</div>
                      <div className="text-[10px] text-amber-400 font-semibold">View →</div>
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* About Card */}
              <div onClick={scrollToAbout} className="snap-start flex-shrink-0 cursor-pointer">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="relative w-[140px] h-[100px] rounded-xl p-[1px] bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500"
                >
                  <div className={`h-full rounded-xl ${isDark ? 'bg-black/60' : 'bg-white/80'} backdrop-blur-sm p-3 flex flex-col justify-between`}>
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
                      <img src="https://github.com/iabhijais.png" alt="Me" className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>About Me</div>
                      <div className="text-[10px] text-amber-400 font-semibold">Know →</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Resume Card */}
              <Link to="/resume" className="snap-start flex-shrink-0">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="relative w-[140px] h-[100px] rounded-xl p-[1px] bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500"
                >
                  <div className={`h-full rounded-xl ${isDark ? 'bg-black/60' : 'bg-white/80'} backdrop-blur-sm p-3 flex flex-col justify-between`}>
                    <div className={`w-8 h-8 rounded-lg ${isDark ? 'bg-white/10' : 'bg-blue-100'} flex items-center justify-center text-lg`}>📄</div>
                    <div>
                      <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Resume</div>
                      <div className="text-[10px] text-amber-400 font-semibold">View →</div>
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Hire Me Card */}
              <Link to="/hire-me" className="snap-start flex-shrink-0">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="relative w-[140px] h-[100px] rounded-xl p-[1px] bg-gradient-to-br from-pink-500 via-rose-500 to-red-500"
                >
                  <div className={`h-full rounded-xl ${isDark ? 'bg-black/60' : 'bg-white/80'} backdrop-blur-sm p-3 flex flex-col justify-between`}>
                    <div className={`w-8 h-8 rounded-lg ${isDark ? 'bg-white/10' : 'bg-pink-100'} flex items-center justify-center text-xl`}>💎</div>
                    <div>
                      <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Hire Me</div>
                      <div className="text-[10px] text-amber-400 font-semibold">Let's Talk →</div>
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Gaming Card */}
              <Link to="/gaming" className="snap-start flex-shrink-0">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="relative w-[140px] h-[100px] rounded-xl p-[1px] bg-gradient-to-br from-amber-500 via-orange-500 to-red-500"
                >
                  <div className={`h-full rounded-xl ${isDark ? 'bg-black/60' : 'bg-white/80'} backdrop-blur-sm p-3 flex flex-col justify-between`}>
                    <div className={`w-8 h-8 rounded-lg ${isDark ? 'bg-white/10' : 'bg-amber-100'} flex items-center justify-center text-lg`}>🎮</div>
                    <div>
                      <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Gaming</div>
                      <div className="text-[10px] text-amber-400 font-semibold">Explore →</div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </div>

            {/* Scroll Indicator Dots */}
            <div className="flex justify-center gap-1.5 pb-3">
              <div className={`w-6 h-1 rounded-full ${isDark ? 'bg-white/40' : 'bg-gray-400'}`} />
              <div className={`w-1.5 h-1 rounded-full ${isDark ? 'bg-white/20' : 'bg-gray-300'}`} />
              <div className={`w-1.5 h-1 rounded-full ${isDark ? 'bg-white/20' : 'bg-gray-300'}`} />
            </div>
          </div>
        </div>

        {/* Mobile Content Section */}
        <div className="mt-8 lg:hidden pb-12">

          {/* Mobile Tech Stack */}
          <div className="mt-10">
            <ElectricBorder color="#7df9ff" speed={1} chaos={0.5} thickness={2} style={{ borderRadius: 16 }}>
              <div className="relative rounded-2xl overflow-hidden">
                {/* Bluish glass outer layer */}
                <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-purple-500/10" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-[1px] rounded-2xl border border-blue-400/20" />

                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl border flex items-center justify-center bg-blue-500/10 border-blue-400/20">
                        <span className="text-lg">⚙️</span>
                      </div>
                      <h3 className="text-xl font-semibold tracking-tight text-white/90">Tech Stack</h3>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Core Stack */}
                    <div className="p-3.5 rounded-xl border bg-black/30 border-white/[0.08]">
                      <div className="flex items-center gap-2 mb-2.5 justify-center">
                        <span className="text-sm opacity-70">⚡</span>
                        <span className="text-xs font-semibold text-white/70">Core Stack</span>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {[
                          { name: 'Next.js', icon: '/TechStack/nextjs.svg' },
                          { name: 'React', icon: '/TechStack/reactjs.svg' },
                          { name: 'TypeScript', icon: '/TechStack/typescript.svg' },
                          { name: 'Node.js', icon: '/TechStack/nodejs.svg' },
                          { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' }
                        ].map((item) => (
                          <div key={item.name} className="group relative">
                            <img src={item.icon} alt={item.name} className="w-8 h-8" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI & Agentic */}
                    <div className="p-3.5 rounded-xl border bg-black/30 border-white/[0.08]">
                      <div className="flex items-center gap-2 mb-2.5 justify-center">
                        <span className="text-sm opacity-70">🤖</span>
                        <span className="text-xs font-semibold text-white/70">AI & Agentic Systems</span>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {[
                          { name: 'LLMs', icon: '/TechStack/openai.svg', invert: true },
                          { name: 'Gen AI', icon: '/TechStack/Google_Gemini_icon_2025.svg.png' },
                          { name: 'TensorFlow', icon: '/TechStack/tensorflow.svg' },
                          { name: 'OpenCV', icon: 'https://cdn.simpleicons.org/opencv/5C3EE8' },
                          { name: 'IBM WatsonX', icon: '/TechStack/IBM.svg' },
                          { name: 'n8n', icon: '/TechStack/n8n_pink+white_logo.svg' }
                        ].map((item) => (
                          <div key={item.name} className="group relative">
                            <img src={item.icon} alt={item.name} className={`w-8 h-8 ${item.invert ? 'invert' : ''}`} />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Backend & DB */}
                    <div className="p-3.5 rounded-xl border bg-black/30 border-white/[0.08]">
                      <div className="flex items-center gap-2 mb-2.5 justify-center">
                        <span className="text-sm opacity-70">🗄️</span>
                        <span className="text-xs font-semibold text-white/70">Backend & Databases</span>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {[
                          { name: 'Firebase', icon: '/TechStack/firebase.svg' },
                          { name: 'Supabase', icon: '/TechStack/supabase-logo-icon.svg' },
                          { name: 'Cloud Functions', icon: '/TechStack/google-cloud.svg' },
                          { name: 'REST APIs', icon: '/TechStack/fast-api.svg' }
                        ].map((item) => (
                          <div key={item.name} className="group relative">
                            <img src={item.icon} alt={item.name} className="w-8 h-8" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* UI/UX */}
                    <div className="p-3.5 rounded-xl border bg-black/30 border-white/[0.08]">
                      <div className="flex items-center gap-2 mb-2.5 justify-center">
                        <span className="text-sm opacity-70">🎨</span>
                        <span className="text-xs font-semibold text-white/70">UI/UX & Frontend</span>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {[
                          { name: 'Tailwind', icon: '/TechStack/tailwindcss.svg' },
                          { name: 'Data Viz', icon: '/TechStack/data_viz_icon.png' },
                          { name: 'Product Design', icon: '/TechStack/figma.svg' },
                          { name: 'Framer Motion', icon: '/TechStack/framer-light.svg' }
                        ].map((item) => (
                          <div key={item.name} className="group relative">
                            <img src={item.icon} alt={item.name} className="w-8 h-8" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cloud */}
                    <div className="p-3.5 rounded-xl border bg-black/30 border-white/[0.08]">
                      <div className="flex items-center gap-2 mb-2.5 justify-center">
                        <span className="text-sm opacity-70">☁️</span>
                        <span className="text-xs font-semibold text-white/70">Cloud & Deployment</span>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {[
                          { name: 'Vercel', icon: '/TechStack/vercel-light.svg' },
                          { name: 'Firebase Cloud', icon: '/TechStack/firebase.svg' },
                          { name: 'Serverless', icon: 'https://cdn.simpleicons.org/serverless/FD5750' },
                          { name: 'Namecheap', icon: '/TechStack/NameCheap.svg' }
                        ].map((item) => (
                          <div key={item.name} className="group relative">
                            <img src={item.icon} alt={item.name} className="w-8 h-8" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tools */}
                    <div className="p-3.5 rounded-xl border bg-black/30 border-white/[0.08]">
                      <div className="flex items-center gap-2 mb-2.5 justify-center">
                        <span className="text-sm opacity-70">🧰</span>
                        <span className="text-xs font-semibold text-white/70">Tools</span>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {[
                          { name: 'GitHub', icon: '/TechStack/github-light.svg' },
                          { name: 'Copilot', icon: isDark ? '/TechStack/githubcopilott.webp' : '/TechStack/githubcopilot.svg' },
                          { name: 'VS Code', icon: '/TechStack/vscode.svg' },
                          { name: 'Windsurf', icon: isDark ? '/TechStack/Windsurf-white-symbol.svg' : '/TechStack/Windsurf-black-symbol.svg' },
                          { name: 'AntiGravity', icon: '/TechStack/google-antigravity-logo-icon.webp' },
                          { name: 'DevOps', icon: '/TechStack/docker.svg' }
                        ].map((item) => (
                          <div key={item.name} className="group relative">
                            <img src={item.icon} alt={item.name} className="w-8 h-8" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ElectricBorder>
          </div>
        </div>

      </div>

      {/* Buttons aligned with nav */}
      <div className="hidden lg:flex flex-col gap-6 absolute top-[100px] right-2 w-[400px]">
        <NeonButton title="Shipped & Live" description="Production over prototypes." subtitle="View Projects" glow="from-violet-600 via-fuchsia-500 to-pink-500" tilt={0.8} icon="💡" href="/projects" electricColor="#d946ef" />
        <div onClick={scrollToAbout} onKeyDown={(ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); scrollToAbout(ev); } }} tabIndex={0} className="group cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.04, rotate: -0.8 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            style={{ pointerEvents: 'auto' }}
          >
            <ElectricBorder color="#14b8a6" speed={1} chaos={0.5} thickness={2} style={{ borderRadius: 16 }}>
              <div
                className="relative rounded-2xl p-[1px] bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 glow-outer neon-btn-line hover-cursor-target"
              >
                <div className="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 px-5 h-[64px] flex items-center justify-between overflow-hidden">
                  <span className="pointer-events-none absolute inset-0 sheen" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden">
                      <img src="https://github.com/iabhijais.png" alt="Abhishek Jaisal" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-sm text-white font-bold tracking-wide">Beyond the Syntax</div>
                      <div className="text-[10px] text-white/60 leading-tight max-w-[180px] font-medium">Communication, clarity, and craft.</div>
                    </div>
                  </div>
                  <div className="text-amber-300 font-bold text-xs whitespace-nowrap tracking-wide">Know Me →</div>
                </div>
              </div>
            </ElectricBorder>
          </motion.div>
        </div>
        <NeonButton
          title="The Arsenal"
          description="My weapons of choice."
          subtitle="View Stack"
          glow="from-cyan-500 via-blue-500 to-purple-500"
          tilt={0.4}
          icon="⚙️"
          onClick={(e) => {
            const el = document.getElementById('tech-stack-section');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          electricColor="#06b6d4"
        />
        <NeonButton title="Hard Evidence" description="No fluff. Just skills and wins." subtitle="View Resume" glow="from-pink-500 via-rose-500 to-red-500" tilt={-0.8} icon="📄" href="/resume" electricColor="#f43f5e" />
        <NeonButton title="Steal This Talent" description="Before someone else does." subtitle="Hire Me" glow="from-blue-600 via-indigo-500 to-violet-500" tilt={0.8} icon="💎" iconClass="text-3xl" showLine={true} href="/hire-me" electricColor="#6366f1" />

        {/* Premium Glass Tech Stack Section - Inside Sidebar */}
        <motion.div
          id="tech-stack-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 scroll-mt-20"
        >
          <ElectricBorder color="#7df9ff" speed={1} chaos={0.5} thickness={2} style={{ borderRadius: 16 }}>
            <div className="relative rounded-2xl overflow-hidden">
              {/* Bluish glass outer layer */}
              <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-purple-500/10" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-[1px] rounded-2xl border border-blue-400/20" />

              {/* Subtle blue glow at top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

              {/* Corner glows */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl" />

              <div className="relative p-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl border flex items-center justify-center bg-blue-500/10 border-blue-400/20">
                      <span className="text-lg">⚙️</span>
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-white/90">Tech Stack</h3>
                  </div>
                </div>

                <div id="tech-stack-content" className="space-y-4">
                  {/* Core Stack */}
                  <div className="p-4 rounded-xl border transition-all duration-300 bg-black/30 border-white/[0.08] hover:bg-black/40 hover:border-blue-400/30">
                    <div className="flex items-center gap-2 mb-3 justify-center">
                      <span className="text-sm opacity-70">⚡</span>
                      <span className="text-xs font-semibold text-white/70">Core Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {[
                        { name: 'Next.js', icon: '/TechStack/nextjs.svg' },
                        { name: 'React', icon: '/TechStack/reactjs.svg' },
                        { name: 'TypeScript', icon: '/TechStack/typescript.svg' },
                        { name: 'Node.js', icon: '/TechStack/nodejs.svg' },
                        { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' }
                      ].map((item) => (
                        <div key={item.name} className="group relative">
                          <img src={item.icon} alt={item.name} className="w-10 h-10 hover:scale-110 transition-transform cursor-pointer p-1" />
                          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] bg-black/90 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 border border-white/10">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI & Agentic */}
                  <div className="p-4 rounded-xl border transition-all duration-300 bg-black/30 border-white/[0.08] hover:bg-black/40 hover:border-blue-400/30">
                    <div className="flex items-center gap-2 mb-3 justify-center">
                      <span className="text-sm opacity-70">🤖</span>
                      <span className="text-xs font-semibold text-white/70">AI & Agentic Systems</span>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {[
                        { name: 'LLMs', icon: '/TechStack/openai.svg', invert: true },
                        { name: 'Gen AI', icon: '/TechStack/Google_Gemini_icon_2025.svg.png' },
                        { name: 'TensorFlow', icon: '/TechStack/tensorflow.svg' },
                        { name: 'OpenCV', icon: 'https://cdn.simpleicons.org/opencv/5C3EE8' },
                        { name: 'IBM WatsonX', icon: '/TechStack/IBM.svg' },
                        { name: 'n8n', icon: '/TechStack/n8n_pink+white_logo.svg' }
                      ].map((item) => (
                        <div key={item.name} className="group relative">
                          <img src={item.icon} alt={item.name} className={`w-10 h-10 hover:scale-110 transition-transform cursor-pointer p-1 ${item.invert ? 'invert' : ''}`} />
                          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] bg-black/90 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 border border-white/10">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Backend & DB */}
                  <div className="p-4 rounded-xl border transition-all duration-300 bg-black/30 border-white/[0.08] hover:bg-black/40 hover:border-blue-400/30">
                    <div className="flex items-center gap-2 mb-3 justify-center">
                      <span className="text-sm opacity-70">🗄️</span>
                      <span className="text-xs font-semibold text-white/70">Backend & Databases</span>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {[
                        { name: 'Firebase', icon: '/TechStack/firebase.svg' },
                        { name: 'Supabase', icon: '/TechStack/supabase-logo-icon.svg' },
                        { name: 'Cloud Functions', icon: '/TechStack/google-cloud.svg' },
                        { name: 'REST APIs', icon: '/TechStack/fast-api.svg' }
                      ].map((item) => (
                        <div key={item.name} className="group relative">
                          <img src={item.icon} alt={item.name} className="w-10 h-10 hover:scale-110 transition-transform cursor-pointer p-1" />
                          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] bg-black/90 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 border border-white/10">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* UI/UX */}
                  <div className="p-4 rounded-xl border transition-all duration-300 bg-black/30 border-white/[0.08] hover:bg-black/40 hover:border-blue-400/30">
                    <div className="flex items-center gap-2 mb-3 justify-center">
                      <span className="text-sm opacity-70">🎨</span>
                      <span className="text-xs font-semibold text-white/70">UI/UX & Frontend</span>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {[
                        { name: 'Tailwind', icon: '/TechStack/tailwindcss.svg' },
                        { name: 'Data Viz', icon: '/TechStack/data_viz_icon.png' },
                        { name: 'Product Design', icon: '/TechStack/figma.svg' },
                        { name: 'Framer Motion', icon: '/TechStack/framer-light.svg' }
                      ].map((item) => (
                        <div key={item.name} className="group relative">
                          <img src={item.icon} alt={item.name} className="w-10 h-10 hover:scale-110 transition-transform cursor-pointer p-1" />
                          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] bg-black/90 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 border border-white/10">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cloud */}
                  <div className="p-4 rounded-xl border transition-all duration-300 bg-black/30 border-white/[0.08] hover:bg-black/40 hover:border-blue-400/30">
                    <div className="flex items-center gap-2 mb-3 justify-center">
                      <span className="text-sm opacity-70">☁️</span>
                      <span className="text-xs font-semibold text-white/70">Cloud & Deployment</span>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {[
                        { name: 'Vercel', icon: '/TechStack/vercel-light.svg' },
                        { name: 'Firebase Cloud', icon: '/TechStack/firebase.svg' },
                        { name: 'Serverless', icon: 'https://cdn.simpleicons.org/serverless/FD5750' },
                        { name: 'Namecheap', icon: '/TechStack/NameCheap.svg' }
                      ].map((item) => (
                        <div key={item.name} className="group relative">
                          <img src={item.icon} alt={item.name} className="w-10 h-10 hover:scale-110 transition-transform cursor-pointer p-1" />
                          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] bg-black/90 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 border border-white/10">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tools */}
                  <div className="p-4 rounded-xl border transition-all duration-300 bg-black/30 border-white/[0.08] hover:bg-black/40 hover:border-blue-400/30">
                    <div className="flex items-center gap-2 mb-3 justify-center">
                      <span className="text-sm opacity-70">🧰</span>
                      <span className="text-xs font-semibold text-white/70">Tools</span>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {[
                        { name: 'GitHub', icon: '/TechStack/github-light.svg' },
                        { name: 'Copilot', icon: isDark ? '/TechStack/githubcopilott.webp' : '/TechStack/githubcopilot.svg' },
                        { name: 'VS Code', icon: '/TechStack/vscode.svg' },
                        { name: 'Windsurf', icon: isDark ? '/TechStack/Windsurf-white-symbol.svg' : '/TechStack/Windsurf-black-symbol.svg' },
                        { name: 'AntiGravity', icon: '/TechStack/google-antigravity-logo-icon.webp' },
                        { name: 'DevOps', icon: '/TechStack/docker.svg' }
                      ].map((item) => (
                        <div key={item.name} className="group relative">
                          <img src={item.icon} alt={item.name} className="w-10 h-10 hover:scale-110 transition-transform cursor-pointer p-1" />
                          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] bg-black/90 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 border border-white/10">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ElectricBorder>
        </motion.div>
      </div>

    </main >
  );
}
