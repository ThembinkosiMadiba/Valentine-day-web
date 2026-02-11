import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Heart, Sparkles } from "lucide-react";

export const FinalConfirmation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const duration = 15 * 1000;
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

    // Heart burst in center
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#fbbf24'],
        shapes: ['circle'],
        scalar: 1.2
      });
    }, 300);
  }, []);

  return (
    <div 
        ref={containerRef}
        className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden p-6 text-center"
    >
       {/* Subtle overlay for readability */}
       <div className="absolute inset-0 bg-black/25" />

       {/* Enhanced Glow Effects */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-rose-500/10 blur-[200px] rounded-full pointer-events-none" />
       
       <motion.div
         className="absolute top-1/3 left-1/4 w-[40vw] h-[40vw] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none"
         animate={{
           scale: [1, 1.2, 1],
           opacity: [0.3, 0.5, 0.3]
         }}
         transition={{
           duration: 8,
           repeat: Infinity,
           ease: "easeInOut"
         }}
       />

       <motion.div
         initial={{ scale: 0.9, opacity: 0, y: 20 }}
         animate={{ scale: 1, opacity: 1, y: 0 }}
         transition={{ duration: 1.2, ease: "easeOut" }}
         className="relative z-10 max-w-2xl w-full"
       >
         {/* Decorative sparkles at top */}
         <div className="flex justify-center gap-6 mb-6">
           {[...Array(5)].map((_, i) => (
             <motion.div
               key={i}
               animate={{
                 scale: [1, 1.5, 1],
                 opacity: [0.4, 1, 0.4],
                 rotate: [0, 180, 360]
               }}
               transition={{
                 duration: 3,
                 delay: i * 0.2,
                 repeat: Infinity,
                 ease: "easeInOut"
               }}
             >
               <Sparkles className="text-amber-300" size={20} />
             </motion.div>
           ))}
         </div>

         {/* Image with enhanced styling */}
         <motion.div 
           className="mb-6 relative inline-block"
           whileHover={{ scale: 1.05 }}
           transition={{ type: "spring", stiffness: 300 }}
         >
            <motion.div 
              className="absolute -inset-6 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 opacity-30 blur-2xl rounded-full"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Decorative corner hearts */}
            <Heart 
              className="absolute -top-4 -right-4 text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" 
              size={28} 
              fill="currentColor"
            />
            <Heart 
              className="absolute -bottom-4 -left-4 text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]" 
              size={24} 
              fill="currentColor"
            />
            
            <img 
                src="https://media4.giphy.com/media/v1.Y2lkPTZjMDliOTUycHZ3azBsN2o0OHIyanhvMGw1b2gwYmF3eWFiandiczJtNzdoNHg5biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/c3Q2EdrCKAsE8z94ZF/giphy.gif"
                alt="Us" 
                className="w-56 h-56 rounded-full object-cover border-4 border-white/20 shadow-[0_0_50px_rgba(244,63,94,0.3)] relative z-10"
            />
         </motion.div>
         
         {/* Caption with better styling */}
         <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           className="mb-8 px-6 py-3 bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-purple-500/20 backdrop-blur-xl rounded-full border border-white/10 inline-block"
         >
           <p className="text-stone-200 text-base font-[Lato] font-light">
              Pretty face… I can't wait to do this to your cheeks 🥹💕
           </p>
         </motion.div>

         {/* Main content with enhanced card */}
         <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-8 bg-black/20 backdrop-blur-xl p-10 rounded-2xl border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.3)]"
         >
             {/* Journey label */}
             <motion.p 
               className="text-rose-300 tracking-[0.4em] uppercase text-xs font-bold flex items-center justify-center gap-2"
               animate={{
                 opacity: [0.7, 1, 0.7]
               }}
               transition={{
                 duration: 3,
                 repeat: Infinity
               }}
             >
               <Heart size={12} fill="currentColor" />
               From Grade Strangers… to Lovers
               <Heart size={12} fill="currentColor" />
             </motion.p>
             
             {/* Timeline */}
             <motion.h1 
               className="text-5xl md:text-6xl font-[Playfair_Display] text-white"
               animate={{
                 textShadow: [
                   "0 0 20px rgba(244,63,94,0.3)",
                   "0 0 40px rgba(244,63,94,0.5)",
                   "0 0 20px rgba(244,63,94,0.3)"
                 ]
               }}
               transition={{
                 duration: 3,
                 repeat: Infinity,
                 ease: "easeInOut"
               }}
             >
                 2022 <span className="text-rose-400/60 mx-4">→</span> 2026
             </motion.h1>
             
             {/* Divider */}
             <div className="flex items-center gap-4 justify-center py-4">
               <div className="h-px w-20 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />
               <Heart className="text-rose-400" size={16} fill="currentColor" />
               <div className="h-px w-20 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />
             </div>
             
             {/* Main declaration */}
             <div className="py-6 space-y-5">
                 <p className="text-3xl md:text-4xl text-amber-50 font-[Playfair_Display] leading-relaxed">
                   I choose you, <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-300 to-amber-200">Bianca</span>
                 </p>
                 
                 {/* Clan names with enhanced styling */}
                 <motion.p 
                   className="text-stone-300 text-sm tracking-[0.25em] uppercase font-light px-6 py-3 bg-white/5 rounded-full inline-block backdrop-blur-sm"
                   whileHover={{ scale: 1.05 }}
                 >
                    Queen of my heart, my forever, my home 🌙

                 </motion.p>
             </div>
             
             {/* Signature */}
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1 }}
               className="pt-6 border-t border-white/5"
             >
               <p className="text-xl italic text-stone-400 font-[Dancing_Script] text-3xl">
                 Always. — Junior
               </p>
             </motion.div>
         </motion.div>

         {/* Bottom decorative sparkles */}
         <div className="flex justify-center gap-6 mt-8">
           {[...Array(3)].map((_, i) => (
             <motion.div
               key={`bottom-${i}`}
               animate={{
                 y: [-5, 5, -5],
                 opacity: [0.3, 0.8, 0.3]
               }}
               transition={{
                 duration: 2,
                 delay: i * 0.3,
                 repeat: Infinity,
                 ease: "easeInOut"
               }}
             >
               <Sparkles className="text-rose-300" size={18} />
             </motion.div>
           ))}
         </div>
       </motion.div>

       {/* Enhanced Floating Hearts with variety */}
       {[...Array(12)].map((_, i) => {
         const size = 20 + Math.random() * 40;
         const startX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000);
         const color = ['text-rose-500/20', 'text-pink-500/20', 'text-red-400/20'][Math.floor(Math.random() * 3)];
         
         return (
           <motion.div
             key={i}
             className={`absolute ${color} pointer-events-none`}
             initial={{ 
                 x: startX, 
                 y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000
             }}
             animate={{ 
                 y: -100,
                 x: startX + (Math.random() - 0.5) * 100,
                 rotate: [0, 360],
                 opacity: [0, 0.6, 0]
             }}
             transition={{ 
                 duration: 12 + Math.random() * 8,
                 repeat: Infinity,
                 delay: i * 1.5,
                 ease: "easeInOut"
             }}
           >
               <Heart size={size} fill="currentColor" />
           </motion.div>
         );
       })}
    </div>
  );
};