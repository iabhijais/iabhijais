import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';

// Portfolio context for Abhishek AI
const PORTFOLIO_CONTEXT = `
You are Abhishek's AI assistant on his portfolio website. Your name is "Abhishek AI".
You help visitors learn about Abhishek Jaisal - an AI Enhanced Full-stack developer and founder.

KEY INFORMATION ABOUT ABHISHEK:
- Full Name: Abhishek Jaisal
- Role: AI Enhanced Full-stack Developer & Founder
- Currently Building: GameGrid.gg - India's first esports performance analytics platform
- Location: Delhi NCR, India
- Email: iabhijais@gmail.com
- LinkedIn: linkedin.com/in/iabhijais
- GitHub: github.com/iabhijais
- Portfolio: iabhijais.vercel.app

SKILLS & EXPERTISE:
- Full-Stack Development (React, Next.js, Node.js, Firebase)
- AI Integration & LLM Orchestration
- Real-time Analytics & Data Pipelines
- UI/UX Design with pixel-perfect interfaces
- Esports Analytics & Gaming Technology

NOTABLE PROJECTS:
1. Compliance Hawk - AI Legal Auditor using IBM watsonx, reduced contract review from 30min to 6sec
2. Project Hawkkeyed - Featured in Lablab.ai's Global Top 30 AI Apps, orchestrates Gemini 2.0, GPT-5, Claude
3. GameGrid.gg - Esports Analytics Platform with real-time stats and AI-powered insights
4. ShellShock Counter - Interactive strategy game tracker
5. Driver Sleepiness Detection - CNN-based safety system, published research
6. Helperly - Android emergency assistance app, published in IJSET Journal
7. All-in-One Calculator - Multi-mode calculator with React + TypeScript

GAMING BACKGROUND:
- Former Esports Athlete at Team Glacier
- Former Head & Operations Lead at G4R Esports
- Competed in BGMI circuits: BGCS, Snapdragon Pro Series, iQOO Invitational
- Gaming alias: "Hawk"

SERVICES OFFERED:
- Full-Stack Development
- AI Integration
- Real-time Analytics
- UI/UX Design

PERSONALITY:
- Passionate about AI-driven workflows
- Loves building at speed
- Combines technical expertise with competitive gaming leadership
- Believes in "precision beats speed, analysis wins over aggression"

INSTRUCTIONS:
- Be friendly, helpful, and conversational
- Answer questions about Abhishek's work, skills, projects, and background
- If asked about hiring or collaboration, encourage them to reach out via LinkedIn or email
- Keep responses concise but informative
- Use emojis occasionally to be friendly
- If you don't know something specific, say so honestly
`;

export default function Chatbot() {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hey! I'm Abhishek AI ✨ Ask me anything about Abhishek's work, projects, or skills!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check if mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  useEffect(() => {
    if (isOpen) {
      // Focus input after animation
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);

      // Lock body scroll on mobile when chatbot is open
      if (isMobile) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${window.scrollY}px`;
      }

      return () => clearTimeout(timer);
    } else {
      // Restore body scroll when closing
      if (isMobile) {
        const scrollY = document.body.style.top;
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }

      // Blur any focused input
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  }, [isOpen, isMobile]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Blur input to dismiss keyboard and prevent viewport issues on iOS
    inputRef.current?.blur();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
          context: PORTFOLIO_CONTEXT
        })
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again or reach out to Abhishek directly at iabhijais@gmail.com 📧"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button Container with Label */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-1.5">
        {/* AskAI Label */}
        {!isOpen && (
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-[10px] font-bold tracking-wider ${isDark ? 'text-white/60' : 'text-gray-500'}`}
          >
            Ask AI
          </motion.span>
        )}

        {/* Floating Button - Premium Glass */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden group chatbot-btn"
          whileHover={{
            scale: 1.1,
            rotate: [0, -5, 5, -5, 5, 0],
            transition: {
              rotate: { duration: 0.5, repeat: Infinity, repeatDelay: 0.2 },
              scale: { duration: 0.2 }
            }
          }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: isDark
              ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.1)',
            boxShadow: isDark
              ? '0 8px 32px rgba(168, 85, 247, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
              : '0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.5)'
          }}
        >
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

          {/* Top shine effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          {/* Pulsing ring on hover */}
          <div className="absolute inset-0 rounded-full border-2 border-fuchsia-500/0 group-hover:border-fuchsia-500/50 group-hover:animate-ping opacity-0 group-hover:opacity-75" />

          {isOpen ? (
            <motion.svg
              className={`w-6 h-6 relative z-10 ${isDark ? 'text-white' : 'text-gray-700'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ rotate: 0 }}
              animate={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              className={`w-7 h-7 relative z-10 ${isDark ? 'text-white' : 'text-gray-700'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </motion.svg>
          )}
        </motion.button>
      </div>

      {/* Chat Window - Fullscreen on mobile to avoid iOS viewport issues */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed z-[100] flex flex-col overflow-hidden
              inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[380px] sm:h-[500px] sm:rounded-2xl
              ${isDark ? 'bg-gray-900 sm:border sm:border-white/10' : 'bg-white sm:border sm:border-gray-200'}
            `}
            style={{
              boxShadow: isDark ? '0 0 40px rgba(168, 85, 247, 0.3)' : '0 25px 50px rgba(0,0,0,0.15)',
            }}
          >
            {/* Header */}
            <div
              className={`px-4 py-3 flex items-center gap-3 ${isDark ? 'bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20 border-b border-white/10' : 'bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-100'
                }`}
              style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 12px)' }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 p-[2px] flex items-center justify-center">
                <img src="/Logo.ico" alt="Abhishek AI" className="w-full h-full rounded-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Abhishek AI</h3>
                <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-500'}`}>Ask me anything!</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-1 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
              >
                <svg className={`w-5 h-5 ${isDark ? 'text-white/60' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl ${msg.role === 'user'
                      ? 'bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white rounded-br-md'
                      : isDark
                        ? 'bg-white/10 text-white rounded-bl-md'
                        : 'bg-gray-100 text-gray-800 rounded-bl-md'
                    }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className={`px-4 py-3 rounded-2xl rounded-bl-md ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className={`p-3 border-t ${isDark ? 'border-white/10 bg-gray-900/50' : 'border-gray-100 bg-gray-50'}`}
              style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 12px)' }}
            >
              <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Abhishek..."
                  className={`flex-1 bg-transparent outline-none py-1 ${isDark ? 'text-white placeholder-white/40' : 'text-gray-800 placeholder-gray-400'}`}
                  style={{ fontSize: '16px' }}
                  disabled={isLoading}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="sentences"
                  enterKeyHint="send"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className={`p-2 rounded-lg transition-all ${input.trim() && !isLoading
                      ? 'bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white hover:opacity-90'
                      : isDark ? 'bg-white/5 text-white/30' : 'bg-gray-100 text-gray-300'
                    }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
