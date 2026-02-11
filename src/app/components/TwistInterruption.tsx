import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface TwistInterruptionProps {
  onContinue: () => void;
}

export const TwistInterruption = ({ onContinue }: TwistInterruptionProps) => {
  const [phase, setPhase] = useState<'glitch' | 'message' | 'button'>('glitch');

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('message'), 1500);
    const timer2 = setTimeout(() => setPhase('button'), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center p-8 font-mono">
      <AnimatePresence mode="wait">
        {/* Glitch Phase */}
        {phase === 'glitch' && (
          <motion.div
            key="glitch"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              x: [-5, 5, -5, 5, 0],
              filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(0deg)']
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, repeat: 5 }}
            className="text-center"
          >
            <div className="text-red-500 text-4xl md:text-6xl font-bold mb-4">
              WAIT...
            </div>
            <div className="text-red-400 text-xl md:text-2xl">
              System Error 💔
            </div>
          </motion.div>
        )}

        {/* Message Phase */}
        {phase === 'message' && (
          <motion.div
            key="message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-white max-w-2xl"
          >
            <div className="text-3xl md:text-5xl font-bold mb-6">
              I'm not done...
            </div>
            <div className="text-lg md:text-xl text-gray-400">
              The story continues...
            </div>
          </motion.div>
        )}

        {/* Button Phase */}
        {phase === 'button' && (
          <motion.div
            key="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="text-green-400 text-xl md:text-2xl mb-8">
              Ready to continue?
            </div>
            <motion.button
              onClick={onContinue}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-green-500 text-green-500 font-mono text-lg hover:bg-green-500 hover:text-black transition-colors uppercase tracking-wider"
            >
              Continue
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};