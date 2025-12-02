export default function Footer({ isDark }) {
  const year = new Date().getFullYear();
  return (
    <footer
      className={`w-full border-t ${isDark ? 'border-white/10 bg-black/30' : 'border-gray-200 bg-gray-50'} backdrop-blur-md mt-20 pb-20 sm:pb-8`}
    >
      <div className='max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-8'>
        {/* Mobile Layout - Stacked & Compact */}
        <div className='flex flex-col items-center gap-3 text-sm'>

          {/* Made with Love - First on mobile */}
          <div className={`${isDark ? 'text-white/60' : 'text-gray-600'} flex items-center gap-2 font-medium hover-cursor-target`}>
            <span>Made with</span>
            <span className="animate-pulse text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">❤️</span>
            <span>by</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-300 font-bold animate-gradient">iabhijais</span>
          </div>

          {/* Social Links - Icons only on mobile */}
          <div className='flex items-center gap-5 sm:gap-6'>
            <a href='https://www.linkedin.com/in/iabhijais/' target='_blank' rel='noopener noreferrer' className={`flex items-center gap-2 transition-transform hover:scale-110 active:scale-95 !no-underline p-2 -m-2 ${isDark ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              <img src="/linkedin-icon.png" alt="LinkedIn" className="w-5 h-5 sm:w-4 sm:h-4 object-contain" />
              <span className="font-medium !no-underline hidden sm:inline">LinkedIn</span>
            </a>
            <a href='https://github.com/iabhijais' target='_blank' rel='noopener noreferrer' className={`flex items-center gap-2 transition-transform hover:scale-110 active:scale-95 !no-underline p-2 -m-2 ${isDark ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              <img src="/github-icon.png" alt="GitHub" className={`w-5 h-5 sm:w-4 sm:h-4 object-contain ${!isDark ? 'invert' : ''}`} />
              <span className="font-medium !no-underline hidden sm:inline">GitHub</span>
            </a>
            <a href='https://lablab.ai/u/@iabhijais' target='_blank' rel='noopener noreferrer' className={`flex items-center gap-2 transition-transform hover:scale-110 active:scale-95 !no-underline p-2 -m-2 ${isDark ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              <img src="/lablabnew.png" alt="Lablab.ai" className="w-5 h-5 sm:w-4 sm:h-4 object-contain" />
              <span className="font-medium !no-underline hidden sm:inline">Lablab.ai</span>
            </a>
            <a href='mailto:iabhijais@gmail.com' className={`flex items-center gap-2 transition-transform hover:scale-110 active:scale-95 !no-underline p-2 -m-2 ${isDark ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              <span className="text-xl sm:text-lg">📧</span>
              <span className="font-medium !no-underline hidden sm:inline">Email</span>
            </a>
          </div>

          {/* Copyright */}
          <div className={`${isDark ? 'text-white/40' : 'text-gray-400'} text-[11px] sm:text-sm`}>
            © {year} Abhishek Jaisal
          </div>
        </div>
      </div>

      {/* iOS Safari Safe Area Spacer */}
      <div className="h-0 sm:h-0" style={{ height: 'env(safe-area-inset-bottom, 0px)' }} />
    </footer>
  );
}