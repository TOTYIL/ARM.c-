/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Events from './components/Events';
import Footer from './components/Footer';
import InteractiveBackground from './components/InteractiveBackground';
import AuthPortal from './components/AuthPortal';
import IntroAnimation from './components/IntroAnimation';
import { AuthProvider, useAuth } from './context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

function AppContent() {
  const { isAuthOpen } = useAuth();
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>
      <InteractiveBackground />
      <motion.div 
        animate={{ 
          scale: isAuthOpen ? 0.96 : 1, 
          opacity: isAuthOpen ? 0.3 : 1,
          filter: isAuthOpen ? 'blur(12px)' : 'blur(0px)'
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen flex flex-col relative"
      >
        <Navbar />
        <main className="flex-grow relative z-10">
          <Hero />
          <Projects />
          <Events />
        </main>
        <Footer />
      </motion.div>
      <AuthPortal />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
