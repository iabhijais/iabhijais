import React, { useEffect, lazy, Suspense, memo } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import { ThemeProvider } from './ThemeContext.jsx';
import './index.css';

// Lazy load pages for better initial load performance
const App = lazy(() => import('./App.jsx'));
const Resume = lazy(() => import('./Resume.jsx'));
const Projects = lazy(() => import('./Projects.jsx'));
const HireMe = lazy(() => import('./HireMe.jsx'));
const Gaming = lazy(() => import('./GamingPage.jsx'));
const Chatbot = lazy(() => import('./Chatbot.jsx'));
const NotFound = lazy(() => import('./NotFound.jsx'));

// Minimal loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

// Check if device is touch/mobile - cached result
let _isTouchDevice = null;
const isTouchDevice = () => {
  if (_isTouchDevice !== null) return _isTouchDevice;
  _isTouchDevice = (('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0) ||
    window.matchMedia('(hover: none)').matches ||
    window.innerWidth <= 1024);
  return _isTouchDevice;
};

// Global cursor effect hook - ULTRA OPTIMIZED
function useCursorGlow() {
  useEffect(() => {
    if (isTouchDevice()) {
      document.documentElement.classList.remove("hide-native-cursor");
      return;
    }

    const glow = document.getElementById("cursorGlow");
    const dot = document.getElementById("cursorDot");
    if (!glow || !dot) return;

    document.documentElement.classList.add("hide-native-cursor");

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    let isHot = false;
    let rafId = null;

    // Instant dot update on mouse move - zero lag
    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px,${mouseY}px,0) translate(-50%,-50%) scale(${isHot ? 1.6 : 1})`;
    };

    // Smooth glow animation loop
    const animate = () => {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      glow.style.transform = `translate3d(${glowX}px,${glowY}px,0) translate(-50%,-50%)`;
      rafId = requestAnimationFrame(animate);
    };

    // Hover detection - no throttle for reliability
    const onOver = (e) => {
      const t = e.target;
      if (!t) return;
      
      // Check for interactive elements - comprehensive selector
      const isInteractive = 
        t.tagName === 'A' || 
        t.tagName === 'BUTTON' || 
        t.tagName === 'IMG' ||
        t.closest?.('a,button,.hover-cursor-target,.text-anim,.group,span[class*="rounded"]');

      if (isInteractive) {
        if (!isHot) {
          isHot = true;
          dot.style.boxShadow = 'inset 0 1px 2px rgba(255,255,255,0.5),0 12px 30px rgba(168,85,247,0.4)';
          glow.style.boxShadow = '0 0 60px 15px rgba(168,85,247,0.3)';
          dot.style.transform = `translate3d(${mouseX}px,${mouseY}px,0) translate(-50%,-50%) scale(1.6)`;
        }
      } else if (isHot) {
        isHot = false;
        dot.style.boxShadow = '';
        glow.style.boxShadow = '';
        dot.style.transform = `translate3d(${mouseX}px,${mouseY}px,0) translate(-50%,-50%) scale(1)`;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("hide-native-cursor");
      cancelAnimationFrame(rafId);
    };
  }, []);
}

// Memoized cursor wrapper to prevent unnecessary re-renders
const CursorWrapper = memo(function CursorWrapper({ children }) {
  useCursorGlow();
  const showCursor = !isTouchDevice();

  return (
    <>
      {children}
      {showCursor && <div id="cursorGlow" className="cursor-glow" />}
      {showCursor && <div id="cursorDot" className="cursor-dot" />}
    </>
  );
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CursorWrapper>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<App />} />
                <Route path="resume" element={<Resume />} />
                <Route path="projects" element={<Projects />} />
                <Route path="hire-me" element={<HireMe />} />
                <Route path="gaming" element={<Gaming />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
          <Chatbot />
        </CursorWrapper>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
