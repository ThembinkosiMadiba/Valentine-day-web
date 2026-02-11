import { motion } from "motion/react";
import { useState } from "react";

interface EnvelopeSceneProps {
  onContinue: () => void;
}

export const EnvelopeScene = ({ onContinue }: EnvelopeSceneProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50">
      {!isOpen ? (
        <motion.div
          className="relative cursor-pointer group"
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Envelope Body - Luxurious Deep Color */}
          <div className="w-96 h-60 bg-gradient-to-br from-slate-800 via-slate-900 to-black shadow-[0_20px_60px_rgba(0,0,0,0.4)] rounded-2xl relative overflow-hidden border-2 border-amber-700/30 flex items-center justify-center">
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            {/* Decorative Corner Elements */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-500/40 rounded-tl-lg" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-500/40 rounded-br-lg" />
            
            {/* Inner Border */}
            <div className="absolute inset-4 border border-amber-600/20 rounded-lg" />

            <div className="text-center z-10">
              <span className="font-[Dancing_Script] text-4xl text-amber-100 tracking-widest drop-shadow-lg">
                Bianca
              </span>
              <div className="mt-2 text-amber-300/60 text-sm font-serif tracking-[0.3em]">
                WITH LOVE
              </div>
            </div>
            
            {/* Elegant Wax Seal */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-red-800 via-red-900 to-red-950 rounded-full shadow-[0_8px_20px_rgba(127,29,29,0.6)] flex items-center justify-center border-2 border-red-700/50 group-hover:scale-110 transition-transform duration-300">
              <div className="w-12 h-12 rounded-full border border-amber-500/30 flex items-center justify-center">
                <span className="text-amber-400 text-lg font-serif font-bold">M</span>
              </div>
            </div>
            
            {/* Sparkle Effects */}
            <div className="absolute top-8 right-20 w-2 h-2 bg-amber-400/40 rounded-full animate-pulse" />
            <div className="absolute bottom-12 left-16 w-1 h-1 bg-amber-300/50 rounded-full animate-pulse delay-75" />
          </div>
          
          <motion.div 
            className="mt-8 text-center text-slate-700 font-serif italic text-base tracking-widest"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ✨ Tap to Open Your Birthday Card ✨
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="bg-white max-w-2xl w-full p-10 md:p-16 shadow-[0_30px_80px_rgba(0,0,0,0.3)] rounded-2xl relative border border-stone-200"
          initial={{ rotateX: 90, opacity: 0, scale: 0.8 }}
          animate={{ rotateX: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 60, damping: 15 }}
        >
          {/* Decorative Border */}
          <div className="absolute inset-6 border-2 border-rose-200/50 rounded-xl pointer-events-none" />
          
          {/* Corner Flourishes */}
          <div className="absolute top-8 left-8 text-rose-300 text-2xl">❀</div>
          <div className="absolute top-8 right-8 text-rose-300 text-2xl">❀</div>
          <div className="absolute bottom-8 left-8 text-rose-300 text-2xl">❀</div>
          <div className="absolute bottom-8 right-8 text-rose-300 text-2xl">❀</div>
          
          <div className="relative z-10">
            {/* Birthday Header */}
            <div className="text-center mb-8">
              <h1 className="font-[Playfair_Display] text-5xl md:text-6xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 bg-clip-text text-transparent mb-3">
                Happy Birthday
              </h1>
              <div className="text-rose-400 text-xl tracking-[0.5em] font-serif">
                ✦ ✦ ✦
              </div>
            </div>

            <div className="font-[Dancing_Script] text-2xl md:text-3xl leading-relaxed text-stone-700 space-y-5 text-center">
              <p className="font-serif text-xl text-stone-600 italic mb-6">
                To the one who holds my heart,
              </p>
              
              <p>
                Every moment with you feels like a gift I never knew I needed.
              </p>
              
              <p>
                You light up the darkest days, turn ordinary moments into magic, and make life infinitely sweeter.
              </p>
              
              <p className="text-rose-700 font-semibold">
                Today, the world celebrates the day you were born—and so do I, with all my heart.
              </p>
              
              <p>
                You deserve all the happiness, all the laughter, and all the love this year can bring.
              </p>
              
              <p className="text-2xl md:text-4xl text-rose-600 my-8">
                Thank you for being my everything.
              </p>
              
              <div className="pt-6 border-t border-rose-200 mt-8">
                <p className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text">
                  Forever yours,
                </p>
                <p className="text-rose-400 text-xl mt-3">
                  💕 🎂 ✨
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center relative z-10">
            <motion.button
              onClick={onContinue}
              className="px-12 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-[Playfair_Display] text-xl rounded-full shadow-[0_10px_30px_rgba(225,29,72,0.4)] hover:shadow-[0_15px_40px_rgba(225,29,72,0.6)] transition-all transform hover:-translate-y-1 border-2 border-rose-400/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue the Celebration
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};