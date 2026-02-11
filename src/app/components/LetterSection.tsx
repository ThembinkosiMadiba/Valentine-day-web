import { motion } from "motion/react";

interface LetterSectionProps {
  onContinue: () => void;
}

export const LetterSection = ({ onContinue }: LetterSectionProps) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden">
       {/* Subtle overlay to improve text readability without blocking the background */}
       <div className="absolute inset-0 bg-black/30" />
       
       {/* Floating Dust Particles (Simplified) */}
       <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

       <motion.div
         className="relative z-10 max-w-2xl w-full bg-[#1c1917]/60 p-8 md:p-16 rounded-sm shadow-[0_0_40px_rgba(0,0,0,0.6)] border border-white/10 backdrop-blur-md"
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 1.5 }}
       >
         <h2 className="font-[Dancing_Script] text-3xl md:text-4xl text-amber-100/90 mb-8 border-b border-white/10 pb-4">
           Bianca 🌙
         </h2>

         <div className="font-[Lato] text-stone-300 space-y-6 text-lg font-light leading-relaxed">
           <p>
             Loving you was never a question.<br />
             It was patience.<br />
             Timing.<br />
             Trusting life would meet us halfway.
           </p>

           <p className="font-medium text-white">
             May this year bring you everything your heart desires,<br />
             And remind you how truly special you are.
           </p>

           <p>
             You are my peace.<br />
             My safe place.<br />
             My Heart.
           </p>

           <p className="font-medium text-white">
             This isn't a moment.<br />
             It's a continuation.
           </p>
         </div>

         <div className="mt-12 flex justify-end">
           <button
             onClick={onContinue}
             className="px-6 py-2 text-sm text-stone-400 hover:text-white border-b border-transparent hover:border-white transition-all uppercase tracking-widest font-mono"
           >
             One last thing →
           </button>
         </div>
       </motion.div>
    </div>
  );
};