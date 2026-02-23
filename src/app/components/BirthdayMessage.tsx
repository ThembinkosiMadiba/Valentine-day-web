import { motion } from "motion/react";
interface BirthdayMessageProps {
  onContinue: () => void;
}

export const BirthdayMessage = ({ onContinue }: BirthdayMessageProps) => {
  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center p-6">
      {/* Image overlay with subtle darkening */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1759888107288-b9a8857e20e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvdXBsZSUyMHNpbGhvdWV0dGUlMjBuaWdodCUyMGNpbmVtYXRpY3xlbnwxfHx8fDE3NzAwOTY5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Couple Memory"
          className="w-full h-full object-cover opacity-30 filter blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      </div>

      <motion.div 
        className="relative z-10 max-w-xl space-y-8 bg-black/20 p-8 rounded-xl backdrop-blur-md border border-white/10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="font-[Dancing_Script] text-4xl text-amber-100">Bianca 🌙</h2>
        
        <div className="font-[Lato] text-lg md:text-xl text-stone-200 space-y-6 font-light leading-relaxed">
            <p>On this day, the world got brighter.</p>
            <p>Your kindness.<br/>Your strength.<br/>Your quiet way of loving.</p>
            <p className="text-rose-200/90 italic">
                I'm grateful I get to celebrate you<br/>
                not just today,<br/>
                but every day you allow me to.
            </p>
        </div>

        <button
            onClick={onContinue}
            className="mt-6 px-10 py-3 bg-rose-900/40 text-rose-50 border border-rose-800/50 rounded-sm hover:bg-rose-900/60 transition-all font-[Playfair_Display] tracking-wider"
        >
            Continue
        </button>
      </motion.div>
    </div>
  );
};
