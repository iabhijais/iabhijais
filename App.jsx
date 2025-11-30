import React from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';

// Abhishek Portfolio — r3hbr-style hero (fixed & stable)

const NeonButton = ({ title, subtitle, description, href = "#", glow = "from-fuchsia-500 to-violet-500", tilt = 0.8, icon = "🧪", iconClass = "text-2xl", showLine = false, openInNewTab = false, onClick }) => {
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

  return (
    <Wrapper>
      <motion.div
        whileHover={{ scale: 1.04, rotate: tilt }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className={`relative rounded-2xl p-[1px] bg-gradient-to-r ${glow} glow-outer hover-cursor-target ${showLine ? 'neon-btn-line' : ''}`}
        style={{ pointerEvents: 'auto' }}
      >
        <div className="relative rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 px-6 h-[88px] flex items-center justify-between overflow-hidden" style={{ pointerEvents: 'auto' }}>
          <span className="pointer-events-none absolute inset-0 sheen" />
          <div className="flex items-center gap-4" style={{ pointerEvents: 'none' }}>
            <div className={`w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center ${iconClass}`}>{icon}</div>
            <div>
              <div className="text-base text-white font-bold tracking-wide">{title}</div>
              {description && <div className="text-xs text-white/70 leading-snug max-w-[200px] mt-1 font-medium">{description}</div>}
            </div>
          </div>
          <div className="text-amber-300 font-bold text-sm whitespace-nowrap tracking-wide" style={{ pointerEvents: 'none' }}>{subtitle} →</div>
        </div>
      </motion.div>
    </Wrapper>
  );
};

export default function App() {
  const { isDark } = useTheme();

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

          <div className={`mt-8 text-[1.125rem] leading-[1.8] space-y-5 max-w-4xl ${isDark ? 'text-white' : 'text-gray-700'}`}>
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
          <div className="relative rounded-2xl overflow-hidden mt-10">
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
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-sm opacity-70">⚡</span>
                    <span className="text-xs font-semibold text-white/70">Core Stack</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Next.js', 'React', 'TypeScript', 'Node.js', 'JavaScript'].map((skill) => (
                      <span key={skill} className="px-3 py-1.5 text-[11px] font-medium rounded-lg border bg-white/[0.04] text-white/80 border-white/[0.06]">{skill}</span>
                    ))}
                  </div>
                </div>

                {/* AI & Agentic */}
                <div className="p-3.5 rounded-xl border bg-black/30 border-white/[0.08]">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-sm opacity-70">🤖</span>
                    <span className="text-xs font-semibold text-white/70">AI & Agentic Systems</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['LLMs', 'GenAI', 'TensorFlow', 'OpenCV', 'Gemini API', 'IBM WatsonX', 'Automation'].map((skill) => (
                      <span key={skill} className="px-3 py-1.5 text-[11px] font-medium rounded-lg border bg-white/[0.04] text-white/80 border-white/[0.06]">{skill}</span>
                    ))}
                  </div>
                </div>

                {/* Backend & DB */}
                <div className="p-3.5 rounded-xl border bg-black/30 border-white/[0.08]">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-sm opacity-70">🗄️</span>
                    <span className="text-xs font-semibold text-white/70">Backend & Databases</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Firebase', 'Firestore', 'Cloud Functions', 'REST APIs'].map((skill) => (
                      <span key={skill} className="px-3 py-1.5 text-[11px] font-medium rounded-lg border bg-white/[0.04] text-white/80 border-white/[0.06]">{skill}</span>
                    ))}
                  </div>
                </div>

                {/* UI/UX */}
                <div className="p-3.5 rounded-xl border bg-black/30 border-white/[0.08]">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-sm opacity-70">🎨</span>
                    <span className="text-xs font-semibold text-white/70">UI/UX & Frontend</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Tailwind', 'Data Viz', 'Product Design', 'Framer Motion'].map((skill) => (
                      <span key={skill} className="px-3 py-1.5 text-[11px] font-medium rounded-lg border bg-white/[0.04] text-white/80 border-white/[0.06]">{skill}</span>
                    ))}
                  </div>
                </div>

                {/* Cloud */}
                <div className="p-3.5 rounded-xl border bg-black/30 border-white/[0.08]">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-sm opacity-70">☁️</span>
                    <span className="text-xs font-semibold text-white/70">Cloud & Deployment</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Vercel', 'Firebase Cloud', 'Serverless'].map((skill) => (
                      <span key={skill} className="px-3 py-1.5 text-[11px] font-medium rounded-lg border bg-white/[0.04] text-white/80 border-white/[0.06]">{skill}</span>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div className="p-3.5 rounded-xl border bg-black/30 border-white/[0.08]">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-sm opacity-70">🧰</span>
                    <span className="text-xs font-semibold text-white/70">Tools</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['GitHub', 'Copilot', 'VS Code', 'Kiro', 'Windsurf', 'AntiGravity', 'DevOps'].map((skill) => (
                      <span key={skill} className="px-3 py-1.5 text-[11px] font-medium rounded-lg border bg-white/[0.04] text-white/80 border-white/[0.06]">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons aligned with nav */}
      <div className="hidden lg:flex flex-col gap-6 absolute top-[100px] right-2 w-[400px]">
        <NeonButton title="Shipped & Live" description="Production over prototypes." subtitle="View Projects" glow="from-violet-600 via-fuchsia-500 to-pink-500" tilt={0.8} icon="💡" href="/projects" />
        <div onClick={scrollToAbout} onKeyDown={(ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); scrollToAbout(ev); } }} tabIndex={0} className="group cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.04, rotate: -0.8 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="relative rounded-2xl p-[1px] bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 glow-outer neon-btn-line hover-cursor-target"
            style={{ pointerEvents: 'auto' }}
          >
            <div className="relative rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 px-6 h-[88px] flex items-center justify-between overflow-hidden" style={{ pointerEvents: 'auto' }}>
              <span className="pointer-events-none absolute inset-0 sheen" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden">
                  <img src="https://github.com/iabhijais.png" alt="Abhishek Jaisal" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-base text-white font-bold tracking-wide">Beyond the Syntax</div>
                  <div className="text-xs text-white/70 leading-snug max-w-[200px] mt-1 font-medium">Communication, clarity, and craft.</div>
                </div>
              </div>
              <div className="text-amber-300 font-bold text-sm whitespace-nowrap tracking-wide">Know Me →</div>
            </div>
          </motion.div>
        </div>
        <NeonButton title="Hard Evidence" description="No fluff. Just skills and wins." subtitle="View Resume" glow="from-blue-600 via-indigo-500 to-violet-500" tilt={0.8} icon="📄" href="/resume" />
        <NeonButton title="Steal This Talent" description="Before someone else does." subtitle="Hire Me" glow="from-pink-500 via-rose-500 to-red-500" tilt={-0.8} icon="💎" iconClass="text-3xl" showLine={true} href="/hire-me" />

        {/* Premium Glass Tech Stack Section - Inside Sidebar */}
        <motion.div
          id="tech-stack-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative rounded-2xl overflow-hidden mt-10"
        >
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
            <div
              onClick={() => {
                const el = document.getElementById('tech-stack-section');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              onKeyDown={(ev) => {
                if (ev.key === 'Enter' || ev.key === ' ') {
                  ev.preventDefault();
                  const el = document.getElementById('tech-stack-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              tabIndex={0}
              className="flex items-center justify-between cursor-pointer group mb-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl border flex items-center justify-center bg-blue-500/10 border-blue-400/20">
                  <span className="text-lg">⚙️</span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-white/90">Tech Stack</h3>
              </div>
              <span className="font-bold text-sm whitespace-nowrap tracking-wide group-hover:translate-y-0.5 transition-transform duration-200 text-cyan-400">▼</span>
            </div>

            <div id="tech-stack-content" className="space-y-3">
              {/* Core Stack */}
              <div className="p-3.5 rounded-xl border transition-all duration-300 bg-black/30 border-white/[0.08] hover:bg-black/40 hover:border-blue-400/30">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-sm opacity-70">⚡</span>
                  <span className="text-xs font-semibold text-white/70">Core Stack</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Next.js', 'React', 'TypeScript', 'Node.js', 'JavaScript'].map((skill) => (
                    <span key={skill} className="px-3 py-1.5 text-[11px] font-medium rounded-lg border transition-all duration-200 cursor-pointer bg-white/[0.04] text-white/80 border-white/[0.06] hover:bg-purple-500/20 hover:border-purple-400/50 hover:text-white hover:scale-110 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] hover-cursor-target">{skill}</span>
                  ))}
                </div>
              </div>

              {/* AI & Agentic */}
              <div className="p-3.5 rounded-xl border transition-all duration-300 bg-black/30 border-white/[0.08] hover:bg-black/40 hover:border-blue-400/30">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-sm opacity-70">🤖</span>
                  <span className="text-xs font-semibold text-white/70">AI & Agentic Systems</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['LLMs', 'GenAI', 'TensorFlow', 'OpenCV', 'Gemini API', 'IBM WatsonX', 'Automation'].map((skill) => (
                    <span key={skill} className="px-3 py-1.5 text-[11px] font-medium rounded-lg border transition-all duration-200 cursor-pointer bg-white/[0.04] text-white/80 border-white/[0.06] hover:bg-fuchsia-500/20 hover:border-fuchsia-400/50 hover:text-white hover:scale-110 hover:shadow-[0_0_15px_rgba(236,72,153,0.4)] hover-cursor-target">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Backend & DB */}
              <div className="p-3.5 rounded-xl border transition-all duration-300 bg-black/30 border-white/[0.08] hover:bg-black/40 hover:border-blue-400/30">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-sm opacity-70">🗄️</span>
                  <span className="text-xs font-semibold text-white/70">Backend & Databases</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Firebase', 'Firestore', 'Cloud Functions', 'REST APIs'].map((skill) => (
                    <span key={skill} className="px-3 py-1.5 text-[11px] font-medium rounded-lg border transition-all duration-200 cursor-pointer bg-white/[0.04] text-white/80 border-white/[0.06] hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:text-white hover:scale-110 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] hover-cursor-target">{skill}</span>
                  ))}
                </div>
              </div>

              {/* UI/UX */}
              <div className="p-3.5 rounded-xl border transition-all duration-300 bg-black/30 border-white/[0.08] hover:bg-black/40 hover:border-blue-400/30">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-sm opacity-70">🎨</span>
                  <span className="text-xs font-semibold text-white/70">UI/UX & Frontend</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Tailwind', 'Data Viz', 'Product Design', 'Framer Motion'].map((skill) => (
                    <span key={skill} className="px-3 py-1.5 text-[11px] font-medium rounded-lg border transition-all duration-200 cursor-pointer bg-white/[0.04] text-white/80 border-white/[0.06] hover:bg-pink-500/20 hover:border-pink-400/50 hover:text-white hover:scale-110 hover:shadow-[0_0_15px_rgba(236,72,153,0.4)] hover-cursor-target">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Cloud */}
              <div className="p-3.5 rounded-xl border transition-all duration-300 bg-black/30 border-white/[0.08] hover:bg-black/40 hover:border-blue-400/30">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-sm opacity-70">☁️</span>
                  <span className="text-xs font-semibold text-white/70">Cloud & Deployment</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Vercel', 'Firebase Cloud', 'Serverless'].map((skill) => (
                    <span key={skill} className="px-3 py-1.5 text-[11px] font-medium rounded-lg border transition-all duration-200 cursor-pointer bg-white/[0.04] text-white/80 border-white/[0.06] hover:bg-blue-500/20 hover:border-blue-400/50 hover:text-white hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] hover-cursor-target">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="p-3.5 rounded-xl border transition-all duration-300 bg-black/30 border-white/[0.08] hover:bg-black/40 hover:border-blue-400/30">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-sm opacity-70">🧰</span>
                  <span className="text-xs font-semibold text-white/70">Tools</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['GitHub', 'Copilot', 'VS Code', 'Kiro', 'Windsurf', 'AntiGravity', 'DevOps'].map((skill) => (
                    <span key={skill} className="px-3 py-1.5 text-[11px] font-medium rounded-lg border transition-all duration-200 cursor-pointer bg-white/[0.04] text-white/80 border-white/[0.06] hover:bg-emerald-500/20 hover:border-emerald-400/50 hover:text-white hover:scale-110 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] hover-cursor-target">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </main>
  );
}
