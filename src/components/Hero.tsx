import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Hero() {
  const { openAuth, user } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/10 text-white/70 mb-8 font-mono text-xs tracking-wider uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Recruitment Open 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight mb-8 text-white leading-[1.1]"
          >
            Engineering the <br />
            <span className="text-white/40 italic">Autonomous</span> Future.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mb-12 font-light leading-relaxed"
          >
            ARM is a student-led club focused on robotics, automation, autonomous systems, and mechatronics. Through hands-on projects, workshops, and experimentation, we turn concepts into working solutions and build the skills to engineer what’s next.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <button 
              onClick={user ? () => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'}) : openAuth}
              className="px-8 py-4 bg-white text-black hover:bg-white/90 font-medium transition-colors flex items-center justify-center gap-2 group w-full sm:w-auto"
            >
              {user ? 'View Dashboard' : 'Apply Now'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="#projects" className="px-8 py-4 bg-transparent border border-white/20 hover:border-white/50 text-white font-medium transition-colors w-full sm:w-auto text-center inline-block">
              Explore Systems
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
