import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FloatingBackground } from "@/app/components/FloatingBackground";
import { BirthdayIntro } from "@/app/components/BirthdayIntro";
import { BirthdayMessage } from "@/app/components/BirthdayMessage";
import { TwistInterruption } from "@/app/components/TwistInterruption";
import { ValentineQuestion } from "@/app/components/ValentineQuestion";
import { MemoryTimeline } from "@/app/components/MemoryTimeline";
import { LetterSection } from "@/app/components/LetterSection";
import { FinalConfirmation } from "@/app/components/FinalConfirmation";

type Step = 
  | "intro" 
  | "message" 
  | "twist" 
  | "valentine" 
  | "timeline" 
  | "letter" 
  | "final";

export default function App() {
  const [step, setStep] = useState<Step>("intro");

  // Helper to wrap components in a fade transition
  const renderStep = () => {
    const fadeProps = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 1 }
    };

    switch (step) {
      case "intro":
        return (
          <motion.div key="intro" {...fadeProps} className="absolute inset-0 w-full h-full">
            <BirthdayIntro onContinue={() => setStep("message")} />
          </motion.div>
        );
      case "message":
        return (
          <motion.div key="message" {...fadeProps} className="absolute inset-0 w-full h-full">
            <BirthdayMessage onContinue={() => setStep("twist")} />
          </motion.div>
        );
      case "twist":
        return (
          <motion.div key="twist" {...fadeProps} className="absolute inset-0 w-full h-full">
            <TwistInterruption onContinue={() => setStep("valentine")} />
          </motion.div>
        );
      case "valentine":
        return (
          <motion.div key="valentine" {...fadeProps} className="absolute inset-0 w-full h-full">
            <ValentineQuestion onYes={() => setStep("timeline")} />
          </motion.div>
        );
      case "timeline":
        return (
          <motion.div key="timeline" {...fadeProps} className="absolute inset-0 w-full h-full overflow-y-auto">
             {/* Timeline handles its own scrolling */}
            <MemoryTimeline onContinue={() => setStep("letter")} />
          </motion.div>
        );
      case "letter":
        return (
          <motion.div key="letter" {...fadeProps} className="absolute inset-0 w-full h-full">
            <LetterSection onContinue={() => setStep("final")} />
          </motion.div>
        );
      case "final":
        return (
          <motion.div key="final" {...fadeProps} className="absolute inset-0 w-full h-full">
            <FinalConfirmation />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black font-[Lato] overflow-hidden relative text-stone-200">
      {/* Background remains persistent until timeline/final scenes which have their own specific BGs */}
      {step !== 'timeline' && step !== 'twist' && <FloatingBackground />}

      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>
    </div>
  );
}
