import React, { useEffect } from "react";
import { motion } from "framer-motion";

// Abhishek Portfolio — r3hbr-style hero (fixed & stable)
// Single-file React + Tailwind classes (paste into canvas / Next.js page)

const NeonButton = ({ title, subtitle, href = "#", glow = "from-fuchsia-500 to-violet-500", tilt = 0.8, icon = "🧪", showLine = false, openInNewTab = false, onClick }) => {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    } else if (openInNewTab && href !== "#") {
      e.preventDefault();
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <a href={href} className="block group" onClick={handleClick} target={openInNewTab ? "_blank" : undefined} rel={openInNewTab ? "noopener noreferrer" : undefined}>
      <motion.div
        whileHover={{ scale: 1.04, rotate: tilt }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className={`relative rounded-2xl p-[1px] bg-gradient-to-r ${glow} glow-outer hover-cursor-target ${showLine ? 'neon-btn-line' : ''}`}
      >
        <div className="relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-4 flex items-center justify-between overflow-hidden">
          <span className="pointer-events-none absolute -inset-[40%] rotate-[20deg] sheen" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">{icon}</div>
            <div>
              <div className="text-sm text-white/80">{title}</div>
            </div>
          </div>
          <div className="text-amber-300 font-semibold">{subtitle} →</div>
        </div>
      </motion.div>
    </a>
  );
};

function DevCheck() {
  // Runtime checks (lightweight tests) to ensure DOM wiring works
  useEffect(() => {
    const results = [];
    const push = (label, ok) => results.push(`${ok ? "✅" : "❌"} ${label}`);

    const glow = document.getElementById("cursorGlow");
    const dot = document.getElementById("cursorDot");
    const btns = document.querySelectorAll(".hover-cursor-target").length;

    push("cursorGlow present", !!glow);
    push("cursorDot present", !!dot);
    push("≥ 3 neon buttons", btns >= 3);
    push("style tag exists", document.querySelectorAll("style").length >= 1);
    push("motion imported", typeof motion === "object");

    console.log(`DevCheck: mounted OK\n${results.join("\n")}`);
  }, []);
  return null;
}

// Cursor glow + glass dot follow
function useCursorGlow() {
  useEffect(() => {
    const glow = document.getElementById("cursorGlow");
    const dot = document.getElementById("cursorDot");
    if (!glow || !dot) return;

    // Always show custom cursor
    document.documentElement.classList.add("hide-native-cursor");
    glow.style.opacity = "0.6";
    dot.style.opacity = "1";

    // Use transform for better performance and smoothness
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    let dotX = 0;
    let dotY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    let isHot = false;

    // Smooth animation loop using requestAnimationFrame
    const smoothMove = () => {
      // Smooth follow with easing for glow (slower)
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;
      
      // Faster follow for dot
      dotX += (mouseX - dotX) * 0.25;
      dotY += (mouseY - dotY) * 0.25;

      const scale = isHot ? 'scale(1.5)' : 'scale(1)';
      glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
      dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%) ${scale}`;

      requestAnimationFrame(smoothMove);
    };

    smoothMove();

    // Treat links, headings, paragraphs, spans, list items and any .hover-cursor-target as interactive
    const HOT_SELECTOR = 'a, h2, h3, h4, h5, h6, p, mark, li, .hover-cursor-target';
    let lastHot = null;
    const onOver = (e) => {
      // Check if target itself is a text-anim span first
      let el = null;
      if (e.target && e.target.classList && e.target.classList.contains('text-anim')) {
        el = e.target;
      } else if (e.target && e.target.closest) {
        el = e.target.closest(HOT_SELECTOR);
      }
      
      if (el) {
        isHot = true;
        dot.classList.add('hot');
        glow.classList.add('hot');
        if (lastHot && lastHot !== el) lastHot.classList.remove('hot-text');
        el.classList.add('hot-text');
        lastHot = el;
      } else {
        isHot = false;
        dot.classList.remove('hot');
        glow.classList.remove('hot');
        if (lastHot) lastHot.classList.remove('hot-text');
        lastHot = null;
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("hide-native-cursor");
    };
  }, []);
}

export default function App() {
  useCursorGlow();
  const [isDark, setIsDark] = React.useState(true);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  const toggleTheme = () => {
    // Play pleasant click sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = isDark ? 800 : 600; // Higher pitch for sun, lower for moon
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

  React.useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900'} relative overflow-hidden transition-all duration-300`}>
      {/* Electric Neon Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent">
        <div 
          className="h-full electric-progress"
          style={{ width: `${scrollProgress}%` }}
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
            <a href="#" className="transition-all duration-300 rounded-lg nav-link-logo relative p-1 -m-1">
              <img src="/Logo.ico" alt="Logo" className="w-6 h-6 object-contain" />
            </a>
            <span className="flex items-center -mt-0.5">
              <span className={isDark ? 'text-white' : 'text-gray-900'}>/</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-300">iabhijais</span>
              <span className={`animate-blink ${isDark ? 'text-white' : 'text-gray-900'}`}>~</span>
            </span>
          </div>
          <nav className="flex items-center gap-0 text-base font-semibold">
            <a className={`nav-link-tab cursor-pointer transition-all duration-300 px-4 py-2 relative`} href="#">Home</a>
            <a className={`nav-link-tab cursor-pointer transition-all duration-300 px-4 py-2 relative`} href="#">Projects</a>
            <a className={`nav-link-tab cursor-pointer transition-all duration-300 px-4 py-2 relative`} href="#">Gaming</a>
            <a className={`nav-link-tab cursor-pointer transition-all duration-300 px-4 py-2 relative`} href="#">About</a>
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

      {/* HERO */}
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
              <span className="block text-anim cursor-pointer pointer-events-auto">— I <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400">generate</span> experiences...</span>
              <span className="block text-anim cursor-pointer pointer-events-auto">Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">AI</span>!</span>
              <span className="block text-anim cursor-pointer pointer-events-auto mb-6">Fueled by <span className={`italic ${isDark ? 'text-gray-300' : 'text-neutral-500'}`}>caffeine</span>.</span>
            </motion.h1>

            <h2 className="mt-8 text-2xl sm:text-3xl font-bold tracking-tight text-anim leading-relaxed">
              My Superpower?
            </h2>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-anim leading-relaxed">
              I can turn <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-300">prompts into production</span>
            </h2>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-anim leading-relaxed">
              before you've even finished explaining.
            </h2>
            
            <h2 id="about-section" className="mt-8 mb-6 pb-2 text-[2.5rem] sm:text-[3.5rem] font-extrabold tracking-tight text-anim">
              I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-cyan-300 drop-shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:drop-shadow-[0_0_35px_rgba(168,85,247,0.8)] transition-all duration-300">Abhishek</span>..<span className="animate-blink">.</span>
            </h2>

            <div className={`mt-8 text-[1.125rem] leading-[1.8] space-y-5 max-w-4xl ${isDark ? 'text-white/85' : 'text-gray-700'}`}>
              <p className="text-anim cursor-pointer">
                I'm an <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-300">AI Enhanced Full-stack developer</span> and founder, currently building <a href="https://gamegrid.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-cyan-400/30 hover:decoration-cyan-400">GameGrid</a> — India's first <span className="font-semibold text-white">esports performance analytics</span> platform. I design <span className="text-white font-medium">scalable systems</span>, build <span className="text-white font-medium">real-time data pipelines</span>, and ship products fast with <span className="text-white font-medium">AI-assisted workflows</span>.
              </p>
              
              <p className="text-anim cursor-pointer">
                My work blends <span className="text-white font-semibold">AI</span>, <span className="text-white font-semibold">UI/UX design</span>, and <span className="text-white font-semibold">data engineering</span>. I'm constantly exploring how AI can <span className="text-cyan-400 font-medium">accelerate development cycles</span>, optimize user experiences, and turn ideas into <span className="text-white font-medium">production-grade products</span>.
              </p>
              
              <p className="text-anim cursor-pointer">
                I love <span className="text-white font-semibold">building at speed</span>, experimenting with <span className="text-white font-semibold">AI-driven workflows</span>, and solving <span className="text-white font-semibold">high-pressure problems</span> in both tech and esports. Whether it's architecting scalable backends or refining <span className="text-cyan-400 font-medium">pixel-perfect interfaces</span>, I enjoy the challenge of creating systems that <span className="text-white font-medium">perform under pressure</span>.
              </p>
              
              <p className="text-anim cursor-pointer">
                Beyond development, I've <span className="text-white font-semibold">led esports teams</span> in national tournaments, managed competitive rosters, and built communities around gaming and strategy. This combination of <span className="text-white font-medium">technical expertise</span> and <span className="text-white font-medium">competitive leadership</span> has shaped how I approach problem-solving and team collaboration.
              </p>
              
              <p className="text-anim cursor-pointer">
                Here, I share my projects, systems, and insights from building startups, esports analytics, and AI-powered tools. <span className="block mt-3 text-[1.15rem]">If you're building something ambitious, <a href="mailto:iabhijais@gmail.com" className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-300 hover:from-fuchsia-300 hover:via-purple-300 hover:to-cyan-200 transition-all duration-300 underline decoration-fuchsia-400/40 hover:decoration-fuchsia-400/60">let's connect</a> →</span>
              </p>
            </div>
          </div>
        </div>

        {/* Buttons aligned with nav */}
        <div className="hidden lg:flex flex-col gap-8 absolute top-[160px] right-6 w-[380px]">
          <NeonButton title="Ideas → Reality" subtitle="View Projects →" glow="from-purple-500/70 to-pink-500/70" tilt={0.8} icon="💡" />
          <NeonButton title="Beyond the Code" subtitle="Know Me →" glow="from-teal-500/70 to-cyan-500/70" tilt={-0.8} icon="👤" showLine={true} onClick={() => {
            const aboutSection = document.getElementById('about-section');
            if (aboutSection) {
              const yOffset = -20;
              const y = aboutSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }} />
          <NeonButton title="Built to Prove" subtitle="View Resume →" glow="from-indigo-500/70 to-violet-500/70" tilt={0.8} icon="📄" href="/resume" />
          <NeonButton title="Let's Build Together" subtitle="Hire Me →" glow="from-pink-500/70 to-red-500/70" tilt={-0.8} icon="🤝" showLine={true} />
        </div>
      </main>

      <footer className={`max-w-6xl mx-auto px-6 pb-10 pt-20 ${isDark ? 'text-white/50' : 'text-gray-500'} transition-colors duration-300`}>
        <div className="text-center space-y-2">
          <div>© 2025 Abhishek Jaisal — Founder & AI Enhanced Full-Stack Developer</div>
          <div className="text-sm">
            Let's connect → <a href="https://www.linkedin.com/in/iabhijais/" target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-400 transition-colors">LinkedIn</a> · <a href="https://github.com/iabhijais" target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-400 transition-colors">GitHub</a> · <a href="mailto:iabhijais@gmail.com" className="hover:text-fuchsia-400 transition-colors">Email</a>
          </div>
        </div>
      </footer>

      {/* inline glow + glass animations */}
      <style>{`
        @keyframes glowPulse {
          0% { opacity: .55; transform: scale(1); }
          50% { opacity: .85; transform: scale(1.05); }
          100% { opacity: .55; transform: scale(1); }
        }
        .animate-glowPulse { animation: glowPulse 6s ease-in-out infinite; }
        .delay-300 { animation-delay: .3s; }
        .delay-700 { animation-delay: .7s; }

        /* blink animation */
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .animate-blink { animation: blink 1s ease-in-out infinite; }

        /* button outer halo */
        .glow-outer { box-shadow: 0 0 44px -12px rgba(168,85,247,0.7); transition: box-shadow .3s ease; }
        .group:hover .glow-outer { box-shadow: 0 0 64px -8px rgba(168,85,247,0.9); }

        /* neon button animated line (buttons 2 & 4) */
        .neon-btn-line::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: auto;
          right: 0;
          width: 0%;
          height: 2px;
          background: linear-gradient(90deg, #a855f7, #06b6d4);
          transition: width 0.3s ease;
          border-radius: 0 0 0 16px;
        }
        .group:hover .neon-btn-line::after {
          width: 50%;
        }

        /* sheen sweep */
        @keyframes sheenSweep{ 0%{ transform: rotate(20deg) translateX(-130%); opacity:0 } 30%{ opacity:.35 } 100%{ transform: rotate(20deg) translateX(130%); opacity:0 } }
        .sheen{ background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.45) 45%, rgba(255,255,255,0) 70%); filter: blur(6px); opacity:0; }
        .group:hover .sheen{ animation: sheenSweep .9s ease; opacity:1; }

        /* logo link with box highlight + animated underline */
        .nav-link-logo {
          background: transparent;
          transition: all 0.3s ease;
        }
        .nav-link-logo::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 8px;
        }
        .nav-link-logo:hover::before {
          opacity: 1;
        }
        body.light-mode .nav-link-logo::before {
          background: linear-gradient(135deg, rgba(192, 38, 211, 0.1) 0%, rgba(8, 145, 178, 0.1) 100%);
        }
        .nav-link-logo::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: auto;
          width: 0%;
          height: 2px;
          background: #a855f7;
          transition: width 0.3s ease, left 0.3s ease, right 0.3s ease;
        }
        .nav-link-logo:hover::after {
          width: 100%;
          left: 0;
          right: auto;
        }
        .nav-link-logo:not(:hover)::after {
          left: auto;
          right: 0;
        }
        body.light-mode .nav-link-logo::after {
          background: #c026d3;
        }

        /* nav tab highlight + underline effect */
        .nav-link-tab {
          background: transparent;
          transition: all 0.3s ease;
        }
        .nav-link-tab::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 8px;
        }
        .nav-link-tab:hover::before {
          opacity: 1;
        }
        body.light-mode .nav-link-tab::before {
          background: linear-gradient(135deg, rgba(192, 38, 211, 0.1) 0%, rgba(8, 145, 178, 0.1) 100%);
        }
        .nav-link-tab::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: auto;
          width: 0%;
          height: 2px;
          background: #a855f7;
          transition: width 0.3s ease, left 0.3s ease, right 0.3s ease;
        }
        .nav-link-tab:hover::after {
          width: 100%;
          left: 0;
          right: auto;
        }
        .nav-link-tab:not(:hover)::after {
          left: auto;
          right: 0;
        }
        body.light-mode .nav-link-tab::after {
          background: #c026d3;
        }

        /* theme toggle animation */
        .theme-toggle-btn {
          position: relative;
        }
        .theme-icon {
          display: inline-block;
          transition: transform 0.5s ease, opacity 0.5s ease;
        }
        .theme-sun {
          animation: sunrise 0.5s ease;
        }
        .theme-moon {
          animation: moonrise 0.5s ease;
        }
        @keyframes sunrise {
          0% { transform: translateY(20px) scale(0.5) rotate(-180deg); opacity: 0; }
          100% { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes moonrise {
          0% { transform: translateY(-20px) scale(0.5) rotate(180deg); opacity: 0; }
          100% { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; }
        }

        /* nav pills glass */
        header button{ transition: transform .2s ease, background .2s ease, box-shadow .2s ease; }
        header button:hover{ transform: translateY(-1px); background: rgba(255,255,255,.12); box-shadow: 0 6px 24px -10px rgba(255,255,255,.35); }

        /* cursor glow follow */
        .cursor-glow {
          position: fixed;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          pointer-events: none;
          mix-blend-mode: screen;
          filter: blur(50px);
          left: 0;
          top: 0;
          will-change: transform;
          transition: opacity .25s ease, background .3s ease;
          opacity: .6;
          z-index: 50;
        }
        body.dark-mode .cursor-glow {
          background: radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 70%);
        }
        body.light-mode .cursor-glow {
          background: radial-gradient(circle, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 70%);
          mix-blend-mode: multiply;
        }
        .cursor-glow.hot { box-shadow: 0 0 60px 10px rgba(168,85,247,0.25), 0 0 80px 20px rgba(59,130,246,0.2); }

        /* glass cursor dot */
        .cursor-dot {
          position: fixed;
          width: 14px;
          height: 14px;
          border-radius: 9999px;
          pointer-events: none;
          left: 0;
          top: 0;
          will-change: transform;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          transition: box-shadow .2s ease, background .3s ease, border-color .3s ease;
          opacity: 1;
          z-index: 60;
        }
        body.dark-mode .cursor-dot {
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.35);
          box-shadow: inset 0 1px 2px rgba(255,255,255,0.35), 0 8px 24px rgba(255,255,255,0.12);
        }
        body.light-mode .cursor-dot {
          background: rgba(0,0,0,0.08);
          border: 1px solid rgba(0,0,0,0.25);
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.15);
        }
        .cursor-dot::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          transition: background .3s ease;
        }
        body.dark-mode .cursor-dot::after {
          background: radial-gradient(120% 120% at 30% 20%, rgba(255,255,255,.5) 0%, rgba(255,255,255,0) 60%);
        }
        body.light-mode .cursor-dot::after {
          background: radial-gradient(120% 120% at 30% 20%, rgba(0,0,0,.3) 0%, rgba(0,0,0,0) 60%);
        }
        /* enlarge + brighten when over interactive targets (toggled by JS) */
        body.dark-mode .cursor-dot.hot {
          box-shadow: inset 0 1px 2px rgba(255,255,255,0.45), 0 10px 28px rgba(168,85,247,0.35);
          background: rgba(255,255,255,0.16);
          border-color: rgba(255,255,255,0.6);
        }
        body.light-mode .cursor-dot.hot {
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.25), 0 8px 20px rgba(168,85,247,0.4);
          background: rgba(0,0,0,0.15);
          border-color: rgba(0,0,0,0.4);
        }
        /* hide native cursor globally while custom dot is active */
        .hide-native-cursor, .hide-native-cursor * { cursor: none !important; }

        /* text highlight sweep */
        .text-anim {
          position: relative;
          background-image: linear-gradient(90deg, rgba(168,85,247,0.22), rgba(59,130,246,0.22));
          background-repeat: no-repeat;
          background-size: 0% 60%;
          background-position: 0 88%;
          transition: background-size .35s ease;
          border-radius: 4px;
          pointer-events: auto !important;
        }
        .text-anim:hover, .text-anim.hot-text { 
          background-size: 100% 60%; 
        }

        /* link underline slide */
        a { text-decoration: none; background-image: linear-gradient(currentColor, currentColor); background-position: 0 100%; background-repeat: no-repeat; background-size: 0% 2px; transition: background-size .25s ease; }
        a:hover { background-size: 100% 2px; }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #a855f7, #e879f9);
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #c084fc, #f0abfc);
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: #a855f7 rgba(0, 0, 0, 0.1);
        }

        /* Electric Neon Progress Bar */
        .electric-progress {
          background: linear-gradient(90deg, 
            #a855f7 0%, 
            #c084fc 25%, 
            #e879f9 50%, 
            #22d3ee 75%, 
            #06b6d4 100%
          );
          box-shadow: 
            0 0 10px rgba(168,85,247,0.8),
            0 0 20px rgba(168,85,247,0.6),
            0 0 30px rgba(192,132,252,0.4),
            0 0 40px rgba(34,211,238,0.3);
          transition: width 0.1s ease-out;
          position: relative;
          animation: electricPulse 2s ease-in-out infinite;
        }
        
        .electric-progress::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255,255,255,0.4) 50%, 
            transparent 100%
          );
          animation: electricShine 2.5s linear infinite;
        }
        
        .electric-progress::after {
          content: '';
          position: absolute;
          top: -2px;
          right: 0;
          width: 20px;
          height: 5px;
          background: radial-gradient(ellipse at center, 
            #fff 0%, 
            #e879f9 30%, 
            #a855f7 60%, 
            transparent 100%
          );
          filter: blur(3px);
          animation: electricSpark 0.4s ease-in-out infinite;
        }
        
        @keyframes electricPulse {
          0%, 100% { 
            filter: brightness(1) saturate(1);
            box-shadow: 
              0 0 10px rgba(168,85,247,0.8),
              0 0 20px rgba(168,85,247,0.5),
              0 0 30px rgba(192,132,252,0.3);
          }
          50% { 
            filter: brightness(1.2) saturate(1.3);
            box-shadow: 
              0 0 15px rgba(168,85,247,0.9),
              0 0 30px rgba(168,85,247,0.7),
              0 0 45px rgba(192,132,252,0.5),
              0 0 60px rgba(34,211,238,0.4);
          }
        }
        
        @keyframes electricShine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        
        @keyframes electricSpark {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>

      <DevCheck />
      <div id="cursorGlow" className="cursor-glow"></div>
      <div id="cursorDot" className="cursor-dot"></div>
    </div>
  );
}
