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

// Custom cursor disabled - using normal system cursor
function useCursorGlow() {
  // Disabled - no custom cursor
}

// Simple wrapper - custom cursor disabled
const CursorWrapper = memo(function CursorWrapper({ children }) {
  return <>{children}</>;
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
