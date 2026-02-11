import React, { useState } from 'react';
import { motion } from 'motion/react';

interface LetterSceneProps {
  onContinue: () => void;
}

export const LetterScene: React.FC<LetterSceneProps> = ({ onContinue }) => {
  const [isOpen, setIsOpen] = useState(false);

  const paperTexture = "https://images.unsplash.com/photo-1708554908409-fe89ec8a696e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhbSUyMHBhcGVyJTIwdGV4dHVyZXxlbnwxfHx8fDE3Njk5ODE3NjR8MA&ixlib=rb-4.1.0&q=80&w=1080";

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center overflow-hidden relative p-4">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-200 to-transparent" />
      
      {!isOpen ? (
        <motion.div 
          className="cursor-pointer relative z-10"
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsOpen(true)}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Envelope Visual */}
          <div className="w-80 h-52 bg-rose-200 relative shadow-2xl rounded-sm flex items-center justify-center border-b-2 border-rose-300">
             {/* Flap */}
             <div className="absolute top-0 left-0 w-0 h-0 border-l-[160px] border-r-[160px] border-t-[110px] border-l-transparent border-r-transparent border-t-rose-300 origin-top transform-gpu" style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))' }}></div>
             
             {/* Wax Seal or Stamp */}
             <div className="absolute z-20 w-12 h-12 rounded-full bg-red-800 border-4 border-red-700 flex items-center justify-center shadow-md">
                <span className="text-white text-xs font-serif">JM</span>
             </div>
             
             <div className="absolute bottom-4 font-handwriting text-rose-800 text-xl font-bold font-great-vibes">
               For MaMKhize
             </div>
          </div>
          <div className="text-center mt-8 text-rose-400 animate-bounce">
            Tap to open
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg w-full bg-cover relative shadow-2xl p-8 md:p-12 rounded-sm rotate-1"
          style={{ backgroundImage: `url(${paperTexture})` }}
        >
          <div className="absolute inset-0 bg-white/40" /> {/* Overlay for readability */}
          
          <div className="relative z-10 font-great-vibes text-gray-800 leading-relaxed text-xl md:text-2xl space-y-4">
            <p className="font-bold text-3xl mb-6 text-rose-900">Dear MaMKhize,</p>
            
            <p>I met you when we were just kids. Grade 6. Back when love didn’t have a name yet — just a feeling I didn’t understand.</p>
            
            <p>Somehow, through growing up, changing, and life doing its thing… that feeling never left.</p>
            
            <p>Years passed. We became different people. But every version of me still chose you.</p>
            
            <p>And then 2026 came… and life finally said, “Now.”</p>
            
            <p>Now you’re not just the girl I loved quietly — you’re my girlfriend. My person. My heart 😌</p>
            
            <p className="font-bold text-rose-800 my-4 text-2xl">
              Gcwabe, Khabazela, kaMavovo kaZihlandla, Gubhela 
            </p>
            <p>— strength, legacy, and beauty live in your name.</p>
            
            <p>This letter isn’t me asking if I love you… It’s me choosing you. Again. On purpose. With my whole heart.</p>
            
            <div className="mt-8 flex justify-center">
              <button 
                onClick={onContinue}
                className="bg-rose-500 hover:bg-rose-600 text-white font-nunito py-2 px-6 rounded-full shadow-lg transform transition hover:scale-105 active:scale-95 text-lg"
              >
                Continue 💖
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
