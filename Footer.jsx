import React from 'react';

export default function Footer({ isDark }) {
  const year = new Date().getFullYear();
  return (
    <footer className={`w-full border-t ${isDark ? 'border-white/10 bg-black/30' : 'border-gray-200 bg-gray-50'} backdrop-blur-md mt-20`}>
      <div className='max-w-6xl mx-auto px-6 py-8'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
          <div className={`${isDark ? 'text-white/60' : 'text-gray-600'} text-center md:text-left`}>
            © {year} Abhishek Jaisal — Founder & AI Enhanced Full-Stack Developer
          </div>
          <div className='flex items-center gap-6'>
            <a href='https://www.linkedin.com/in/iabhijais/' target='_blank' rel='noopener noreferrer' className={`transition-colors ${isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>LinkedIn</a>
            <a href='https://github.com/iabhijais' target='_blank' rel='noopener noreferrer' className={`transition-colors ${isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>GitHub</a>
            <a href='mailto:iabhijais@gmail.com' className={`transition-colors ${isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}