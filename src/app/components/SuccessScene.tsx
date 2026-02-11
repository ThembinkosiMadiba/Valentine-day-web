import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import { Camera } from "lucide-react";

export const SuccessScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    // Gold and Rose colors for confetti
    const colors = ['#fbbf24', '#f43f5e', '#e2e8f0'];

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 40 * (timeLeft / duration);
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: colors,
        disableForReducedMotion: true,
        shapes: ['circle'], 
        scalar: 0.8
      });
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: colors,
        disableForReducedMotion: true,
        shapes: ['circle'],
        scalar: 0.8
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleScreenshot = async () => {
    if (containerRef.current) {
      try {
        const canvas = await html2canvas(containerRef.current, {
          backgroundColor: '#0f172a', // Hex color for background
          scale: 2,
          useCORS: true, // Help with loading images
          // Attempt to filter out unneeded elements if necessary
        });
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "Valentine-MaMkhize.png";
        link.click();
      } catch (err) {
        console.error("Screenshot failed:", err);
        alert("Could not capture screenshot automatically. Please take a manual screenshot! 📸");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative z-20 flex flex-col items-center justify-center min-h-screen p-4 text-center"
      // Force text color to hex to avoid oklch issues in html2canvas
      style={{ color: '#d6d3d1' }} 
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="backdrop-blur-md p-8 md:p-12 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-2xl w-full"
        // Explicitly set hex colors for background and border
        style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.4)', 
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: '1px',
            borderStyle: 'solid'
        }}
      >
        <div className="mb-8 flex justify-center">
             <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="relative w-48 h-48 rounded-full overflow-hidden shadow-[0_0_30px_rgba(251,191,36,0.1)]"
                style={{
                    border: '1px solid rgba(254, 243, 199, 0.2)' // amber-100/20 in rgba
                }}
             >
                <img 
                    src="https://images.unsplash.com/photo-1641085809270-71f722611ce1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwdGVkZHklMjBiZWFyJTIwdmFsZW50aW5lfGVufDF8fHx8MTc2OTkzNzMwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                    alt="Teddy Bears"
                    className="w-full h-full object-cover opacity-90"
                    crossOrigin="anonymous" 
                />
             </motion.div>
        </div>

        {/* Use inline styles or explicit hex classes for text to avoid oklch */}
        <h1 className="font-[Playfair_Display] text-4xl md:text-5xl mb-8 tracking-wide" style={{ color: '#fffbeb' }}>
          I knew it.
        </h1>
        
        <div className="font-[Lato] text-lg md:text-xl space-y-6 mb-10 font-light" style={{ color: '#d6d3d1' }}>
            <p className="tracking-widest uppercase text-sm" style={{ color: '#fecdd3' }}>From Grade 6… to now.</p>
            <p style={{ color: '#a8a29e' }}>2015 <span className="mx-2" style={{ color: '#57534e' }}>—</span> 2026</p>
            
            <div className="py-4">
                <p className="text-3xl font-[Dancing_Script]" style={{ color: '#fef3c7' }}>Happy Valentine’s Day, MaMkhize</p>
            </div>
            
            <p className="text-xs md:text-sm font-medium uppercase tracking-[0.2em]" style={{ color: '#78716c' }}>
                Gcwabe • Khabazela • kaMavovo kaZihlandla • Gubhela
            </p>
            
            <div className="pt-6 w-1/2 mx-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="text-xl font-serif" style={{ color: '#ffffff' }}>I choose you.</p>
                <p className="italic mt-2" style={{ color: '#78716c' }}>— Junior</p>
            </div>
        </div>

        {/* The screenshot button itself is hidden from the screenshot often, but if included, it needs hex too */}
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleScreenshot}
          className="px-8 py-3 rounded-sm flex items-center gap-3 mx-auto transition-all backdrop-blur-sm"
          style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.05)', 
              borderColor: 'rgba(255, 255, 255, 0.1)',
              borderWidth: '1px',
              borderStyle: 'solid',
              color: '#d6d3d1'
          }}
          data-html2canvas-ignore="true" // Option to ignore the button in screenshot if desired
        >
          <Camera size={18} />
          <span className="tracking-widest uppercase text-xs">Capture Moment</span>
        </motion.button>
      </motion.div>
    </div>
  );
};
