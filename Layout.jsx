import React, { useEffect, useState, useRef } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import Footer from './Footer';

// Detect iOS
const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

export default function Layout() {
    const { isDark, toggleTheme } = useTheme();
    const [scrollProgress, setScrollProgress] = useState(0);
    const location = useLocation();
    const scrollRef = useRef(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Scroll Progress Logic - optimized for iOS
    useEffect(() => {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    if (scrollRef.current) {
                        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
                        const totalHeight = scrollHeight - clientHeight;
                        const progress = totalHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / totalHeight) * 100)) : 0;
                        setScrollProgress(progress);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
            // Initial calculation
            setTimeout(handleScroll, 100);
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

            {/* Premium Ambient Lighting Effect - Dark Mode (simplified for iOS) */}
            {isDark && (
                <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden will-change-auto">
                    <div className={`absolute -top-[20%] -left-[10%] w-[60vw] h-[60vh] rounded-full bg-purple-600/15 blur-[100px] ${isIOS ? '' : 'animate-ambient1'}`} />
                    <div className={`absolute -top-[10%] -right-[15%] w-[50vw] h-[50vh] rounded-full bg-cyan-500/12 blur-[80px] ${isIOS ? '' : 'animate-ambient2'}`} />
                    <div className={`absolute bottom-[10%] -left-[10%] w-[45vw] h-[45vh] rounded-full bg-blue-500/12 blur-[80px] ${isIOS ? '' : 'animate-ambient4'}`} />
                </div>
            )}

            {/* Premium Ambient Lighting Effect - Light Mode (simplified for iOS) */}
            {!isDark && (
                <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden will-change-auto">
                    <div className={`absolute -top-[20%] -left-[10%] w-[60vw] h-[60vh] rounded-full bg-purple-300/25 blur-[100px] ${isIOS ? '' : 'animate-ambient1'}`} />
                    <div className={`absolute -top-[10%] -right-[15%] w-[50vw] h-[50vh] rounded-full bg-cyan-300/20 blur-[80px] ${isIOS ? '' : 'animate-ambient2'}`} />
                    <div className={`absolute bottom-[10%] -left-[10%] w-[45vw] h-[45vh] rounded-full bg-blue-300/20 blur-[80px] ${isIOS ? '' : 'animate-ambient4'}`} />
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
                            className={`theme-toggle-btn w-9 h-9 rounded-full ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-200 border-gray-300'} border text-lg flex items-center justify-center active:scale-95`}
                            style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
                        >
                            <span className={`theme-icon ${isDark ? 'theme-sun' : 'theme-moon'}`}>
                                {isDark ? '☀️' : '🌙'}
                            </span>
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(prev => !prev)}
                            onTouchEnd={(e) => { e.preventDefault(); setIsMobileMenuOpen(prev => !prev); }}
                            className={`w-12 h-12 flex flex-col justify-center items-center gap-1.5 rounded-lg ${isDark ? 'active:bg-white/20' : 'active:bg-gray-200'}`}
                            aria-label="Toggle Menu"
                            style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
                        >
                            <span className={`w-6 h-0.5 block rounded-full ${isDark ? 'bg-white' : 'bg-gray-900'} transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <span className={`w-6 h-0.5 block rounded-full ${isDark ? 'bg-white' : 'bg-gray-900'} transition-opacity duration-200 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                            <span className={`w-6 h-0.5 block rounded-full ${isDark ? 'bg-white' : 'bg-gray-900'} transition-transform duration-200 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu - Right Side Slider */}
            {isMobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="fixed inset-0 z-[45] bg-black/50 md:hidden"
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                    />

                    {/* Slide-in Menu from Right */}
                    <div
                        className={`fixed right-0 w-[280px] z-[46] md:hidden overflow-hidden transform transition-transform duration-200 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-xl`}
                        style={{
                            top: 'calc(3.5rem + env(safe-area-inset-top, 0px))',
                            height: 'calc(100% - 3.5rem - env(safe-area-inset-top, 0px))',
                            borderLeft: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)'
                        }}
                    >
                        {/* Menu Items */}
                        <nav className="relative px-4 py-4 flex flex-col gap-2">
                            {[
                                { path: '/', label: 'Home', icon: '🏠', onClick: handleHomeClick },
                                { path: '/projects', label: 'Projects', icon: '💡' },
                                { path: '/gaming', label: 'Gaming', icon: '🎮' },
                                { path: '/#about-section', label: 'About', icon: 'logo', onClick: handleAboutClick },
                                { path: '/hire-me', label: 'Hire Me', icon: '💼' },
                                { path: '/resume', label: 'Resume', icon: '📄' }
                            ].map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={(e) => {
                                        if (link.onClick) link.onClick(e);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`flex items-center gap-3 py-3.5 px-4 rounded-xl active:scale-[0.98] ${isDark ? 'text-white active:bg-white/10' : 'text-gray-900 active:bg-gray-100'} ${location.pathname === link.path ? (isDark ? 'bg-white/10 border-l-2 border-purple-500' : 'bg-purple-50 border-l-2 border-purple-500') : ''}`}
                                    style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
                                >
                                    {link.icon === 'logo' ? (
                                        <img src="/Logo.ico" alt="About" className="w-5 h-5 object-contain" />
                                    ) : (
                                        <span className="text-xl">{link.icon}</span>
                                    )}
                                    <span className="font-semibold text-[15px]">{link.label}</span>
                                    {location.pathname === link.path && (
                                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-500" />
                                    )}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </>
            )}

            {/* Page Content */}
            <Outlet />

            <Footer isDark={isDark} />
        </div>
    );
}
