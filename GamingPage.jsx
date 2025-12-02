import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { Link } from 'react-router-dom';

import { Gamepad2 } from 'lucide-react';

export default function Gaming() {
  const { isDark } = useTheme();

  const socialLinks = [
    { title: 'Discord', subtitle: 'Join the Server', icon: '/discord-icon.svg', isImage: true, link: 'https://discord.gg/TVDZjZFXMS', gradient: 'from-indigo-500 to-purple-500' },
    { title: 'Instagram', subtitle: '@hawkkeyed', icon: '/instagram-icon.png', isImage: true, link: 'https://instagram.com/hawkkeyed', gradient: 'from-pink-500 to-rose-500' },
    { title: 'YouTube', subtitle: 'Watch Highlights', icon: '/youtube-icon.png', isImage: true, link: 'https://youtu.be/a7nJA2BND6Y?si=sW_Y9cobdYt_NgMw', gradient: 'from-red-500 to-orange-500' }
  ];

  const achievements = [
    'Former Esports Athlete at Team Glacier',
    'Former Head & Operations Lead at G4R Esports',
    'Represented teams in BGMI circuits including BGCS, Snapdragon Pro Series, and iQOO Invitational',
    'Led data-driven strategy building for competitive lineups',
    <>Currently developing <Link to="/projects" state={{ scrollTo: 'gamegrid.gg-—-esports-analytics-&-community-platform' }} className="inline-flex items-center font-bold text-white bg-purple-600 px-2 py-0.5 rounded-md shadow-md transition-all duration-300 hover:bg-purple-700 !no-underline">GameGrid.gg</Link> — analytics & performance insights for esports</>
  ];

  const currentFocus = [
    <>Expanding <Link to="/projects" state={{ scrollTo: 'gamegrid.gg-—-esports-analytics-&-community-platform' }} className="inline-flex items-center font-bold text-white bg-purple-600 px-2 py-0.5 rounded-md shadow-md transition-all duration-300 hover:bg-purple-700 !no-underline">GameGrid.gg</Link>'s AI-based esports analytics</>,
    'Building a community of competitive and creative gamers',
    'Collaborating with AI & gaming enthusiasts through my Discord'
  ];

  return (
    <main className='max-w-6xl mx-auto px-6 py-12'>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className='mb-16'>
        <div className='flex items-center gap-4 mb-4'>
          <Gamepad2 className="w-12 h-12 md:w-16 md:h-16 text-purple-400 drop-shadow-[0_0_10px_rgba(192,132,252,0.5)]" />
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-black tracking-tight'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 animate-gradient bg-300%'>Gaming Journey</span>
          </h1>
        </div>
        <p className='text-2xl md:text-3xl font-bold mb-2'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'>"From the Lobby to the Cloud"</span>
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className={`space-y-6 text-lg leading-relaxed mb-16 ${isDark ? 'text-white' : 'text-gray-700'}`}>
        <p>When most people were learning to press play, I was learning to strategize every frame. That's where <span className='font-bold text-white bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 px-2 py-0.5 rounded-md shadow-[0_0_18px_rgba(217,70,239,0.35)]'>Hawk</span> was born — not just another gamer tag, but a mindset.</p>
        <p>I started my journey as a competitive <span className='font-bold'>BGMI player</span>, leading teams, managing scrims, and building strategies that turned underdogs into tournament-ready squads. From <span className='text-cyan-400 font-bold'>Team Glacier</span> to <span className='text-cyan-400 font-bold'>G4R Esports</span>, every lineup taught me something deeper — not just how to win a match, but how to lead, adapt, and analyze under fire.</p>
        <p>Soon, my curiosity evolved beyond the game itself. I wanted to understand why we won, why we lost, and how data could predict performance. That's when my love for gaming turned into something bigger — <span className='font-bold'>building tools for gamers</span>.</p>
        <p>Today, I channel the same competitive fire into <Link to="/projects" state={{ scrollTo: 'gamegrid.gg-—-esports-analytics-&-community-platform' }} className='inline-flex items-center font-bold text-white bg-purple-600 px-2 py-0.5 rounded-md shadow-md transition-all duration-300 hover:bg-purple-700 !no-underline'>GameGrid.gg</Link>, an esports analytics platform I'm building from scratch — combining gaming, AI, and data visualization to give players and teams the insights I once wished I had.</p>
        <p>I still hop into lobbies, call shots, and break down strats — but now I also code dashboards, automate match logs, and experiment with AI-driven esports intelligence. Because for me, <span className='font-bold'>gaming isn't just a passion — it's my foundation, my inspiration, and my reason to build</span>.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className='mb-16'>
        <h2 className='text-3xl font-bold mb-16 flex items-center gap-3'>
          <span>⚡</span>
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-300'>Where You'll Find Me</span>
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {socialLinks.map((social, i) => (
            <motion.a
              key={i}
              href={social.link}
              target='_blank'
              rel='noopener noreferrer'
              whileHover={{ scale: 1.05, y: -8, boxShadow: social.gradient === 'from-indigo-500 to-purple-500' ? '0 25px 50px rgba(99, 102, 241, 0.5)' : social.gradient === 'from-pink-500 to-rose-500' ? '0 25px 50px rgba(236, 72, 153, 0.5)' : '0 25px 50px rgba(239, 68, 68, 0.5)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={`relative group rounded-2xl p-[1px] bg-gradient-to-r ${social.gradient} !no-underline`}
            >
              <div className={`relative rounded-2xl ${isDark ? 'bg-black' : 'bg-white'} p-6 h-full border ${isDark ? 'border-white/10' : 'border-gray-200'} transition-all duration-300 flex flex-col items-center text-center min-h-[180px] justify-center`}>
                <div className='flex flex-col items-center gap-4'>
                  <div className='w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                    {social.isImage ? (
                      <img src={social.icon} alt={social.title} className='w-full h-full object-contain' />
                    ) : (
                      <div className='text-5xl'>{social.icon}</div>
                    )}
                  </div>
                  <div>
                    <div className={`font-bold text-xl mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{social.title}</div>
                    <div className={`text-sm ${isDark ? 'text-white/80' : 'text-gray-600'}`}>{social.subtitle}</div>
                  </div>
                </div>
                <div className='absolute bottom-4 right-4 text-2xl opacity-0 group-hover:opacity-100 transition-opacity'>→</div>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className='mb-16'>
        <h2 className='text-3xl font-bold mb-12 flex items-center gap-3'>
          <span>🕹️</span>
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-300'>Gaming Roles & Achievements</span>
        </h2>
        <div className={`rounded-2xl ${isDark ? 'bg-white/10 border-white/20' : 'bg-gray-100 border-gray-200'} border p-8`}>
          <ul className='space-y-4'>
            {achievements.map((a, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }} className='flex items-start gap-3'>
                <span className='text-purple-400 text-xl mt-1'>▸</span>
                <span className={`text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>{a}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.0 }} className='mb-16'>
        <div className={`rounded-2xl ${isDark ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-purple-400/40' : 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300'} border-2 p-8 text-center`}>
          <p className={`text-xl md:text-2xl font-bold italic`}>💬 <span className={isDark ? 'text-white' : 'text-gray-900'}>"In gaming and in life, </span><span className='font-bold text-white bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 px-2 py-0.5 rounded-md shadow-[0_0_18px_rgba(217,70,239,0.35)]'>precision beats speed</span><span className={isDark ? 'text-white' : 'text-gray-900'}> — and </span><span className='font-bold text-white bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-400 px-2 py-0.5 rounded-md shadow-[0_0_18px_rgba(56,189,248,0.35)]'>analysis wins over aggression</span><span className={isDark ? 'text-white' : 'text-gray-900'}>."</span></p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }} className='mb-16'>
        <h2 className='text-3xl font-bold mb-12 flex items-center gap-3'>
          <span>🧠</span>
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-300'>Current Focus</span>
        </h2>
        <div className={`rounded-2xl ${isDark ? 'bg-white/10 border-white/20' : 'bg-gray-100 border-gray-200'} border p-8`}>
          <ul className='space-y-4'>
            {currentFocus.map((f, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 1.4 + i * 0.1 }} className='flex items-start gap-3'>
                <span className='text-cyan-400 text-xl mt-1'>▸</span>
                <span className={`text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>{f}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </main>
  );
}