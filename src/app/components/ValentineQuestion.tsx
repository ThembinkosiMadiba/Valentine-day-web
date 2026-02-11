import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Heart, Sparkles } from "lucide-react";

interface ValentineQuestionProps {
  onYes: () => void;
}

const NO_MESSAGES = [
  "No", 
  "Are you sure? 🥺",
  "Really? 😟",
  "Bianca please... 😭",
  "Come on... 😔",
  "Pretty please? 🥹",
  "You're breaking my heart 💔",
  "Don't do this to me 😩",
  "One more chance? 😭",
  "I'm begging you! 🙏",
  "Final answer? 😭",
];

export const ValentineQuestion = ({ onYes }: ValentineQuestionProps) => {
  const [noCount, setNoCount] = useState(0);
  const [dodgePosition, setDodgePosition] = useState({ x: 0, y: 0 });
  const [crashStage, setCrashStage] = useState<'glitch' | 'blackout' | 'loading_1' | 'loading_2' | 'denied' | null>(null);

  // Trigger crash sequence when noCount reaches threshold (e.g., 10)
  useEffect(() => {
    if (noCount >= NO_MESSAGES.length) {
      setCrashStage('glitch');
      
      const t1 = setTimeout(() => setCrashStage('blackout'), 1500);
      const t2 = setTimeout(() => setCrashStage('loading_1'), 2500);
      const t3 = setTimeout(() => setCrashStage('loading_2'), 4500);
      const t4 = setTimeout(() => setCrashStage('denied'), 6500);
      const t5 = setTimeout(() => {
        setCrashStage(null);
        setNoCount(0);
        setDodgePosition({ x: 0, y: 0 });
      }, 8500);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
      };
    }
  }, [noCount]);

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
    const maxDistance = 150;
    const x = (Math.random() - 0.5) * maxDistance;
    const y = (Math.random() - 0.5) * maxDistance;
    setDodgePosition({ x, y });
  };

  const handleYesClick = () => {
      const duration = 3000;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#fbbf24', '#f43f5e', '#ec4899', '#fcd34d']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#fbbf24', '#f43f5e', '#ec4899', '#fcd34d']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f43f5e', '#ec4899', '#ffffff', '#fcd34d']
      });
      
      setTimeout(onYes, 500);
  };

  const yesScale = 1 + noCount * 0.15;
  const currentNoMessage = NO_MESSAGES[Math.min(noCount, NO_MESSAGES.length - 1)];

  // Crash Scene Overlay
  if (crashStage) {
    return (
      <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 font-mono overflow-hidden ${crashStage === 'glitch' ? 'bg-white' : 'bg-black text-white'}`}>
        
        {crashStage === 'glitch' && (
          <motion.div
            animate={{ 
              x: [-10, 10, -5, 5, 0],
              y: [-5, 5, -2, 2, 0],
              skew: [0, 10, -10, 0],
              filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"]
            }}
            transition={{ duration: 0.2, repeat: Infinity }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-red-600 tracking-tighter">ERROR 404</h1>
            <p className="text-xl md:text-2xl text-red-500 font-bold">Rejection Not Found 💔</p>
          </motion.div>
        )}

        {crashStage === 'blackout' && (
          <div className="absolute inset-0 bg-black"></div>
        )}

        <AnimatePresence mode="wait">
          {(crashStage === 'loading_1' || crashStage === 'loading_2' || crashStage === 'denied') && (
            <motion.div 
              key={crashStage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center z-10"
            >
              {crashStage === 'loading_1' && (
                <h2 className="text-2xl md:text-3xl text-gray-300 animate-pulse">Trying to process rejection...</h2>
              )}
              {crashStage === 'loading_2' && (
                <>
                  <h2 className="text-2xl md:text-3xl text-gray-300 animate-pulse mb-4">Processing...</h2>
                  <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto">
                    <motion.div 
                      className="h-full bg-red-600"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, ease: "linear" }}
                    />
                  </div>
                </>
              )}
              {crashStage === 'denied' && (
                <h1 className="text-4xl md:text-6xl font-bold text-red-600">Yeah... no 😭</h1>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Original Valentine Question UI
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-center overflow-hidden">
      
      <div className="absolute inset-0 bg-black/20" />

      {noCount > 3 && (
        <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 1, repeat: Infinity }}
        >
            <div className="w-[600px] h-[600px] bg-rose-500 rounded-full blur-[150px]" />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mb-16 relative z-20"
      >
        <motion.div
          className="mb-8 inline-block"
          animate={{
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="p-6 bg-gradient-to-br from-rose-500/30 to-purple-500/30 rounded-full border-2 border-rose-400/50 backdrop-blur-xl shadow-[0_0_40px_rgba(244,63,94,0.4)]">
            <Heart className="text-rose-200" size={60} fill="currentColor" />
          </div>
        </motion.div>

        <motion.h1 
          className="font-[Playfair_Display] text-5xl md:text-7xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-pink-200"
          animate={{
            textShadow: [
              "0 0 20px rgba(251,191,36,0.3)",
              "0 0 40px rgba(244,63,94,0.5)",
              "0 0 20px rgba(251,191,36,0.3)"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Bianca 💕
        </motion.h1>
        
        <p className="font-[Lato] text-xl md:text-3xl text-stone-200 font-light tracking-wide leading-relaxed max-w-2xl mx-auto">
          Will you be my Valentine?
        </p>

        <div className="flex justify-center gap-4 mt-6">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="text-amber-300" size={24} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="flex flex-col items-center gap-6 z-20 relative">
        <motion.button
          onClick={handleYesClick}
          style={{ scale: yesScale }}
          whileHover={{ scale: yesScale * 1.08 }}
          whileTap={{ scale: yesScale * 0.92 }}
          className="relative group bg-gradient-to-r from-rose-600 to-pink-600 text-white font-[Playfair_Display] text-2xl md:text-3xl tracking-wider py-6 px-16 rounded-full shadow-[0_0_40px_rgba(244,63,94,0.6)] border-2 border-rose-400/50 hover:shadow-[0_0_60px_rgba(244,63,94,0.8)] transition-all overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-200%', '200%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <span className="relative z-10 flex items-center gap-3 justify-center">
            YES! 
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 20, 0]
              }}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              💖
            </motion.div>
          </span>
        </motion.button>

        <motion.div
          animate={{ x: dodgePosition.x, y: dodgePosition.y }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <motion.button
            onMouseEnter={handleNoClick}
            onClick={handleNoClick}
            whileHover={{ scale: 0.95 }}
            className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 backdrop-blur-md text-stone-300 font-[Lato] py-3 px-8 rounded-full border border-stone-600/50 hover:border-stone-500 transition-all text-sm uppercase tracking-widest whitespace-nowrap shadow-lg"
          >
            {currentNoMessage}
          </motion.button>
        </motion.div>

        {noCount > 2 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-amber-200 text-sm italic mt-4"
          >
            Psst... the YES button is getting bigger 😉
          </motion.p>
        )}
      </div>

      {noCount > 5 && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute text-amber-300 pointer-events-none"
              style={{
                left: `${15 + i * 12}%`,
                top: `${25 + (i % 3) * 20}%`
              }}
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 180, 360],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles size={30} />
            </motion.div>
          ))}
        </>
      )}

      {noCount > 7 && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`desperate-heart-${i}`}
              className="absolute text-rose-400/40 pointer-events-none"
              style={{
                left: `${10 + i * 15}%`,
                top: `${70 + (i % 2) * 10}%`
              }}
              animate={{
                y: [-30, 30, -30],
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 1.5 + i * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart size={35} fill="currentColor" />
            </motion.div>
          ))}
        </>
      )}
    </div>
  );
};