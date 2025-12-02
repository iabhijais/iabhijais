import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import { ThemeProvider } from './ThemeContext.jsx';
import App from './App.jsx';
import Resume from './Resume.jsx';
import Projects from './Projects.jsx';
import HireMe from './HireMe.jsx';
import Gaming from './GamingPage.jsx';
import Chatbot from './Chatbot.jsx';
import NotFound from './NotFound.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
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
        <Chatbot />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
