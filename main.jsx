import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Resume from './Resume.jsx';
import Projects from './Projects.jsx';
import HireMe from './HireMe.jsx';
import Gaming from './GamingPage.jsx';
import './index.css';

// Global cursor effect hook
function useCursorGlow() {
  useEffect(() => {
    const glow = document.getElementById("cursorGlow");
    const dot = document.getElementById("cursorDot");
    if (!glow || !dot) return;

    document.documentElement.classList.add("hide-native-cursor");
    glow.style.opacity = "0.6";
    dot.style.opacity = "1";

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
    let lastHot = null;

    const smoothMove = () => {
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;
      dotX += (mouseX - dotX) * 0.25;
      dotY += (mouseY - dotY) * 0.25;
      const scale = isHot ? 'scale(1.5)' : 'scale(1)';
      glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
      dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%) ${scale}`;
      requestAnimationFrame(smoothMove);
    };
    smoothMove();

    const HOT_SELECTOR = 'a, h2, h3, h4, h5, h6, p, mark, li, .hover-cursor-target, button';
    const onOver = (e) => {
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

function CursorWrapper({ children }) {
  useCursorGlow();
  return (
    <>
      {children}
      <div id="cursorGlow" className="cursor-glow"></div>
      <div id="cursorDot" className="cursor-dot"></div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CursorWrapper>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/hire-me" element={<HireMe />} />
          <Route path="/gaming" element={<Gaming />} />
        </Routes>
      </CursorWrapper>
    </BrowserRouter>
  </React.StrictMode>
);