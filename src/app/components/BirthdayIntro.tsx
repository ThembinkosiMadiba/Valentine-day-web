import { motion } from "motion/react";

interface BirthdayIntroProps {
  onContinue: () => void;
}

export const BirthdayIntro = ({ onContinue }: BirthdayIntroProps) => {
  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Background Image with Better Transparency */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://i.pinimg.com/1200x/a5/f4/42/a5f44243bd073181af44200473b46b63.jpg"
          alt="Birthday Memory"
          className="w-full h-full object-cover opacity-20 filter blur-md scale-110"
        />
        {/* Gradient overlay to blend with animated background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-950/30 via-transparent to-rose-950/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 space-y-8 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="space-y-4"
        >
          <motion.h1 
            className="font-[Playfair_Display] text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-pink-200 tracking-wide drop-shadow-[0_2px_10px_rgba(251,191,36,0.5)]"
            animate={{
              textShadow: [
                "0 0 20px rgba(251,191,36,0.3)",
                "0 0 30px rgba(244,63,94,0.4)",
                "0 0 20px rgba(251,191,36,0.3)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Happy Birthday, <br /> Bianca <span className="text-4xl">🎂✨</span>
          </motion.h1>
          <p className="font-[Lato] text-rose-300 text-xl tracking-[0.5em] uppercase drop-shadow-lg">
            12 February
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 2 }}
          className="font-[Lato] text-amber-100 text-2xl font-light italic drop-shadow-lg"
        >
          Today is about you.
        </motion.p>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.5, duration: 2 }}
            className="space-y-3 text-rose-200 font-light text-lg drop-shadow-lg"
        >
            <p>You are loved.</p>
            <p>You are cherished.</p>
            <p>You are seen.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 7, duration: 1 }}
        >
          <motion.button
            onClick={onContinue}
            className="mt-8 px-10 py-4 bg-gradient-to-r from-rose-500/30 to-purple-500/30 text-white border-2 border-white/40 rounded-full backdrop-blur-xl font-[Lato] tracking-widest text-sm shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_48px_rgba(236,72,153,0.5)]"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 8px 48px rgba(236,72,153,0.6)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            CONTINUE
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};