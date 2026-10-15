import { motion } from 'motion/react';
import { useEffect } from 'react';

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    // Extended the total animation to ~2.2 seconds for a smoother feel
    const timer = setTimeout(() => {
      onComplete();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black overflow-hidden pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 1.6 }}
    >
      <motion.div
        className="font-display font-bold text-white tracking-tighter origin-center"
        initial={{ scale: 0.4, opacity: 0, filter: 'blur(20px)' }}
        animate={{
          scale: [0.4, 1, 1, 80],
          opacity: [0, 1, 1, 0],
          filter: ['blur(20px)', 'blur(0px)', 'blur(0px)', 'blur(0px)'],
        }}
        transition={{
          duration: 1.8,
          ease: [0.6, 0.05, 0.15, 0.95], // Smoother cinematic ease curve
          times: [0, 0.25, 0.7, 1] // Hold the text readable for longer (between 0.25 and 0.7) before zooming
        }}
        style={{ fontSize: '15vw', whiteSpace: 'nowrap' }}
      >
        ARM.
      </motion.div>
    </motion.div>
  );
}
