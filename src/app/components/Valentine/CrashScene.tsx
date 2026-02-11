import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface CrashSceneProps {
  onReset: () => void;
}

export const CrashScene: React.FC<CrashSceneProps> = ({ onReset }) => {
  const [text, setText] = useState("ERROR: This love cannot be rejected 💔");
  const [phase, setPhase] = useState<'error' | 'black' | 'reloading'>('error');

  useEffect(() => {
    // Phase 1: Glitch Error
    const timer1 = setTimeout(() => {
      setPhase('black');
    }, 3000);

    return () => clearTimeout(timer1);
  }, []);

  useEffect(() => {
    if (phase === 'black') {
      const timer2 = setTimeout(() => {
        setPhase('reloading');
      }, 1500);
      return () => clearTimeout(timer2);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'reloading') {
      const texts = [
        "Replaying memories...",
        "Grade 6...",
        "Still in love."
      ];
      let i = 0;
      
      const interval = setInterval(() => {
        if (i < texts.length) {
            setText(texts[i]);
            i++;
        } else {
            clearInterval(interval);
            setTimeout(onReset, 1000);
        }
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [phase, onReset]);

  if (phase === 'black') {
    return <div className="fixed inset-0 bg-black z-50" />;
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-8 text-center font-mono">
      {phase === 'error' && (
        <motion.div
          animate={{ x: [-5, 5, -5, 5, 0], opacity: [1, 0.8, 1, 0.9, 1] }}
          transition={{ duration: 0.2, repeat: Infinity }}
          className="text-red-500 text-xl md:text-3xl font-bold"
        >
          {text}
        </motion.div>
      )}
      
      {phase === 'reloading' && (
        <div className="text-green-500 text-lg md:text-2xl">
          <span className="mr-2">{'>'}</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={text}
          >
            {text}
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          >
            _
          </motion.span>
        </div>
      )}
    </div>
  );
};
