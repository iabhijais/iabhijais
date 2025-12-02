import React, { useEffect, useState, useRef } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTheme } from './ThemeContext';
import Footer from './Footer';

export default function Layout() {
    const { isDark, toggleTheme } = useTheme();
    const [scrollProgress, setScrollProgress] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const scrollRef = useRef(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Scroll Progress Logic
    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
                const totalHeight = scrollHeight - clientHeight;
                const progress = totalHeight > 0 ? (scrollTop / totalHeight) * 100 : 0;
                setScrollProgress(progress);
            }
        };

        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();
            return () => scrollContainer.removeEventListener('scroll', handleScroll);
        }
    }, [location.pathname]);

    // Handle Hash Navigation and Scroll to Top
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Scroll to top of the container
            if (scrollRef.current) {
                scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }, [location]);

    const handleHomeClick = (e) => {
        if (location.pathname === '/') {
            e.preventDefault();
            if (scrollRef.current) {
                scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    const handleAboutClick = (e) => {
        if (location.pathname === '/') {
            e.preventDefault();
            const el = document.getElementById('about-section');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div
            ref={scrollRef}
            className={`h-screen overflow-y-auto overflow-x-hidden ${isDark ? 'bg-black text-white' : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900'} relative transition-all duration-300`}
            style={{ paddingTop: 'env(safe-area-inset-top)' }}
        >

            {/* Electric Neon Progress Bar - Below header */}
            <div
                className="fixed left-0 w-full h-1 z-[60] bg-gray-800/30"
                style={{ top: 'calc(env(safe-area-inset-top, 0px) + 3.5rem)', marginTop: '-1px' }}
                onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const percentage = (clickX / rect.width) * 100;
                    if (scrollRef.current) {
                        const { scrollHeight, clientHeight } = scrollRef.current;
                        const totalHeight = scrollHeight - clientHeight;
                        const targetScroll = (percentage / 100) * totalHeight;
                        scrollRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
                    }
                }}
            >
                <div
                    className="h-full electric-progress cursor-pointer"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Premium Ambient Lighting Effect - Dark Mode */}
            {isDark && (
                <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                    <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vh] rounded-full bg-purple-600/20 blur-[120px] animate-ambient1" />
                    <div className="absolute -top-[10%] -right-[15%] w-[50vw] h-[50vh] rounded-full bg-cyan-500/15 blur-[100px] animate-ambient2" />
                    <div className="absolute top-[30%] left-[20%] w-[40vw] h-[40vh] rounded-full bg-pink-500/10 blur-[80px] animate-ambient3" />
                    <div className="absolute bottom-[10%] -left-[10%] w-[45vw] h-[45vh] rounded-full bg-blue-500/15 blur-[100px] animate-ambient4" />
                    <div className="absolute -bottom-[15%] -right-[10%] w-[55vw] h-[55vh] rounded-full bg-emerald-500/12 blur-[120px] animate-ambient5" />
                    <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
                </div>
            )}

            {/* Premium Ambient Lighting Effect - Light Mode */}
            {!isDark && (
                <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                    <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vh] rounded-full bg-purple-300/30 blur-[120px] animate-ambient1" />
                    <div className="absolute -top-[10%] -right-[15%] w-[50vw] h-[50vh] rounded-full bg-cyan-300/25 blur-[100px] animate-ambient2" />
                    <div className="absolute top-[30%] left-[20%] w-[40vw] h-[40vh] rounded-full bg-pink-300/20 blur-[80px] animate-ambient3" />
                    <div className="absolute bottom-[10%] -left-[10%] w-[45vw] h-[45vh] rounded-full bg-blue-300/25 blur-[100px] animate-ambient4" />
                    <div className="absolute -bottom-[15%] -right-[10%] w-[55vw] h-[55vh] rounded-full bg-emerald-300/20 blur-[120px] animate-ambient5" />
                </div>
            )}

            {/* NAV */}
            <header
                className={`w-full sticky top-0 z-[55] ${isDark ? 'bg-black/70 border-b border-white/10' : 'bg-white/90 shadow-sm'} backdrop-blur-xl transition-all duration-300`}
                style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
                    <div className={`font-bold text-xl flex items-center gap-2 px-4 py-2 -ml-4`}>
                        <Link to="/" onClick={handleHomeClick} className="transition-all duration-300 rounded-lg nav-link-logo relative p-1 -m-1 bg-transparent border-0">
                            <img src="/Logo.ico" alt="Logo" className="w-6 h-6 object-contain" />
                        </Link>
                        <span className="flex items-center -mt-0.5">
                            <span className={isDark ? 'text-white' : 'text-gray-900'}>/</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-gray-100 to-slate-400 animate-gradient">
                                {location.pathname === '/' ? 'iabhijais' :
                                    location.pathname === '/projects' ? 'Projects' :
                                        location.pathname === '/gaming' ? 'Gaming' :
                                            location.pathname === '/hire-me' ? 'Hire Me' :
                                                location.pathname === '/resume' ? 'Resume' : 'iabhijais'}
                            </span>
                            <span className={`animate-blink ${isDark ? 'text-white' : 'text-gray-900'}`}>~</span>
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-0 text-base font-semibold relative z-10">
                        <Link className={`nav-link-tab cursor-pointer transition-all duration-300 px-4 py-2 relative z-10`} to="/" onClick={handleHomeClick}>Home</Link>
                        <Link className={`nav-link-tab cursor-pointer transition-all duration-300 px-4 py-2 relative z-10`} to="/projects">Projects</Link>
                        <Link className={`nav-link-tab cursor-pointer transition-all duration-300 px-4 py-2 relative z-10`} to="/gaming">Gaming</Link>
                        <Link className={`nav-link-tab cursor-pointer transition-all duration-300 px-4 py-2 relative z-10`} to="/#about-section" onClick={handleAboutClick}>About</Link>
                        <Link className={`nav-link-tab cursor-pointer transition-all duration-300 px-4 py-2 relative z-10`} to="/hire-me">Hire Me</Link>
                        <Link className={`nav-link-tab cursor-pointer transition-all duration-300 px-4 py-2 relative z-10`} to="/resume">Resume</Link>
                        <button
                            onClick={toggleTheme}
                            className={`theme-toggle-btn w-10 h-10 rounded-full ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' : 'bg-gray-200 border-gray-300 hover:bg-gray-300 hover:border-gray-400'} border text-xl transition-all duration-500 hover:scale-110 hover:rotate-180 overflow-hidden relative ml-6`}
                        >
                            <span className={`theme-icon ${isDark ? 'theme-sun' : 'theme-moon'}`}>
                                {isDark ? '☀️' : '🌙'}
                            </span>
                        </button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-4 md:hidden z-[60]">
                        <button
                            onClick={toggleTheme}
                            className={`theme-toggle-btn w-9 h-9 rounded-full ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-200 border-gray-300'} border text-lg flex items-center justify-center transition-all duration-300`}
                        >
                            <span className={`theme-icon ${isDark ? 'theme-sun' : 'theme-moon'}`}>
                                {isDark ? '☀️' : '🌙'}
                            </span>
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'} transition-colors`}
                            aria-label="Toggle Menu"
                        >
                            <motion.span
                                animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                className={`w-6 h-0.5 block rounded-full transition-colors ${isDark ? 'bg-white' : 'bg-gray-900'}`}
                            />
                            <motion.span
                                animate={isMobileMenuOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                                className={`w-6 h-0.5 block rounded-full transition-colors ${isDark ? 'bg-white' : 'bg-gray-900'}`}
                            />
                            <motion.span
                                animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                className={`w-6 h-0.5 block rounded-full transition-colors ${isDark ? 'bg-white' : 'bg-gray-900'}`}
                            />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu - Right Side Slider */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 z-[45] bg-black/50 backdrop-blur-sm md:hidden"
                        />

                        {/* Slide-in Menu from Right - Premium Glass */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                            className="fixed right-0 w-[280px] z-[46] md:hidden overflow-hidden"
                            style={{
                                top: 'calc(3.5rem + env(safe-area-inset-top, 0px))',
                                height: 'calc(100% - 3.5rem - env(safe-area-inset-top, 0px))'
                            }}
                        >
                            {/* Glass background layers */}
                            <div className={`absolute inset-0 ${isDark ? 'bg-black/40' : 'bg-white/40'}`} />
                            <div className={`absolute inset-0 backdrop-blur-2xl`} />
                            <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-purple-500/10 via-transparent to-cyan-500/10' : 'bg-gradient-to-b from-purple-100/50 via-transparent to-cyan-100/50'}`} />
                            <div className={`absolute inset-y-0 left-0 w-px ${isDark ? 'bg-gradient-to-b from-purple-500/50 via-white/20 to-cyan-500/50' : 'bg-gradient-to-b from-purple-300 via-gray-200 to-cyan-300'}`} />

                            {/* Top shine */}
                            <div className={`absolute top-0 left-0 right-0 h-px ${isDark ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' : 'bg-gradient-to-r from-transparent via-purple-300/50 to-transparent'}`} />

                            {/* Menu Items */}
                            <nav className="relative px-4 py-4 flex flex-col gap-2">
                                {[
                                    { path: '/', label: 'Home', icon: '🏠', onClick: handleHomeClick },
                                    { path: '/projects', label: 'Projects', icon: '💡' },
                                    { path: '/gaming', label: 'Gaming', icon: '🎮' },
                                    { path: '/#about-section', label: 'About', icon: <img src="/Logo.ico" alt="About" className="w-5 h-5 object-contain" />, onClick: handleAboutClick },
                                    { path: '/hire-me', label: 'Hire Me', icon: '💼' },
                                    { path: '/resume', label: 'Resume', icon: '📄' }
                                ].map((link, index) => (
                                    <motion.div
                                        key={link.path}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + index * 0.05 }}
                                    >
                                        <Link
                                            to={link.path}
                                            onClick={(e) => {
                                                if (link.onClick) link.onClick(e);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className={`flex items-center gap-3 py-3.5 px-4 rounded-xl transition-all duration-300 ${isDark ? 'text-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]' : 'text-gray-900 hover:bg-white/50 hover:shadow-md'} ${location.pathname === link.path ? (isDark ? 'bg-white/10 border-l-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'bg-white/60 border-l-2 border-purple-500 shadow-sm') : ''}`}
                                        >
                                            <span className="text-xl">{link.icon}</span>
                                            <span className="font-semibold text-[15px]">{link.label}</span>
                                            {location.pathname === link.path && (
                                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                                            )}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Page Content */}
            <Outlet />

            <Footer isDark={isDark} />
        </div>
    );
}
