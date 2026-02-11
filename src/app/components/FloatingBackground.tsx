import { motion, AnimatePresence } from "motion/react";
import { Star, Heart, Flower, Music, Volume2, VolumeX, Sparkles, Gift, Cake } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// Types of floating elements
type ElementType = "heart" | "star" | "flower" | "butterfly" | "bear" | "gift" | "cake" | "balloon";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  scale: number;
  opacity: number;
  type: ElementType;
  rotation: number;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
}

interface ParticleTrail {
  id: number;
  x: number;
  y: number;
  color: string;
}

interface CursorHeart {
  id: number;
  x: number;
  y: number;
}

export const FloatingBackground = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [particleTrail, setParticleTrail] = useState<ParticleTrail[]>([]);
  const [cursorHearts, setCursorHearts] = useState<CursorHeart[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      // Hearts follow cursor - more frequent
      if (Math.random() > 0.6) {
        const newHeart = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
        };
        setCursorHearts((prev) => [...prev.slice(-25), newHeart]);
        setTimeout(() => {
          setCursorHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
        }, 1500);
      }

      // Sparkles on mouse move
      if (Math.random() > 0.8) {
        const newSparkle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
        };
        setSparkles((prev) => [...prev.slice(-15), newSparkle]);
        setTimeout(() => {
          setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
        }, 1200);
      }

      // Add colorful particle trail
      if (Math.random() > 0.85) {
        const colors = ['#fbbf24', '#f43f5e', '#ec4899', '#a855f7', '#3b82f6'];
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          color: colors[Math.floor(Math.random() * colors.length)]
        };
        setParticleTrail((prev) => [...prev.slice(-20), newParticle]);
        setTimeout(() => {
          setParticleTrail((prev) => prev.filter((p) => p.id !== newParticle.id));
        }, 800);
      }
    };

    window.addEventListener("mousemove", handleWindowMouseMove);

    // Generate more floating elements with better distribution
    const newElements = Array.from({ length: 40 }).map((_, i) => {
      const types: ElementType[] = ["heart", "star", "flower", "butterfly", "bear", "gift", "cake", "balloon"];
      // Weighted selection favoring hearts and stars for birthday theme
      const weights = [0.25, 0.25, 0.15, 0.1, 0.1, 0.05, 0.05, 0.05];
      let random = Math.random();
      let type: ElementType = "heart";
      
      for (let j = 0; j < weights.length; j++) {
        if (random < weights[j]) {
          type = types[j];
          break;
        }
        random -= weights[j];
      }
      
      return {
        id: i,
        x: Math.random() * 100,
        y: 100 + Math.random() * 20, // Start below screen
        duration: 15 + Math.random() * 25,
        delay: Math.random() * 15,
        scale: 0.6 + Math.random() * 0.8,
        opacity: 0.2 + Math.random() * 0.5,
        type,
        rotation: Math.random() * 360,
      };
    });
    setElements(newElements);
    
    // Initialize audio
    audioRef.current = new Audio("https://cdn.pixabay.com/download/audio/2022/10/25/audio_2267562858.mp3?filename=romantic-piano-124976.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed interaction needed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
        className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* Multi-layered Animated Gradient Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-purple-950 via-rose-950 to-slate-950"
        animate={{
          background: [
            "linear-gradient(to bottom right, #4c1d95, #881337, #0f172a)",
            "linear-gradient(to bottom right, #581c87, #9f1239, #1e293b)",
            "linear-gradient(to bottom right, #4c1d95, #881337, #0f172a)",
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(236,72,153,0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 70%, rgba(168,85,247,0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, rgba(236,72,153,0.3) 0%, transparent 50%)",
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Floating Elements */}
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute pointer-events-none select-none will-change-transform"
          initial={{ 
            x: `${el.x}vw`, 
            y: `${el.y}vh`, 
            opacity: 0, 
            rotate: el.rotation,
            scale: el.scale * 0.5
          }}
          animate={{
            y: [`${el.y}vh`, `${el.y - 120}vh`], // Float upwards significantly
            x: [
              `${el.x}vw`,
              `${el.x + Math.sin(el.id) * 8}vw`,
              `${el.x + Math.cos(el.id) * 8}vw`,
              `${el.x}vw`
            ], // Wave motion
            opacity: [0, el.opacity, el.opacity, 0],
            rotate: [el.rotation, el.rotation + 180, el.rotation + 360],
            scale: [el.scale * 0.5, el.scale, el.scale * 1.2, el.scale * 0.5],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut",
          }}
        >
            {/* Element Rendering with Enhanced Glow */}
            <div 
              className={`
                relative
                ${el.type === 'heart' ? 'text-rose-400' : ''}
                ${el.type === 'star' ? 'text-amber-300' : ''}
                ${el.type === 'flower' ? 'text-pink-300' : ''}
                ${el.type === 'gift' ? 'text-purple-400' : ''}
                ${el.type === 'cake' ? 'text-orange-300' : ''}
                ${el.type === 'balloon' ? 'text-blue-400' : ''}
                text-2xl md:text-4xl
                drop-shadow-[0_0_10px_currentColor]
                filter brightness-110
              `}
              style={{
                filter: `drop-shadow(0 0 ${8 + el.scale * 10}px currentColor) brightness(1.2)`,
              }}
            >
                {el.type === "heart" && <Heart fill="currentColor" strokeWidth={0} />}
                {el.type === "star" && <Star fill="currentColor" strokeWidth={0} />}
                {el.type === "flower" && <Flower fill="currentColor" strokeWidth={1} />}
                {el.type === "gift" && <Gift strokeWidth={2} />}
                {el.type === "cake" && <Cake fill="currentColor" strokeWidth={1} />}
                {el.type === "butterfly" && <span className="text-3xl drop-shadow-2xl">🦋</span>}
                {el.type === "bear" && <span className="text-3xl drop-shadow-2xl">🧸</span>}
                {el.type === "balloon" && <span className="text-3xl drop-shadow-2xl">🎈</span>}
            </div>
        </motion.div>
      ))}

      {/* Cursor Hearts Trail */}
      <AnimatePresence>
        {cursorHearts.map(heart => (
            <motion.div
                key={heart.id}
                initial={{ opacity: 1, scale: 0.5, rotate: 0 }}
                animate={{ 
                  opacity: 0,
                  scale: [0.5, 1.5, 0],
                  rotate: [0, 15, -15, 0],
                  y: -50
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute pointer-events-none"
                style={{ 
                  left: heart.x - 16, 
                  top: heart.y - 16,
                }}
            >
                <Heart 
                  size={32} 
                  fill="#f43f5e"
                  className="text-rose-500 drop-shadow-[0_0_12px_rgba(244,63,94,0.8)]"
                  strokeWidth={0}
                />
            </motion.div>
        ))}
      </AnimatePresence>

      {/* Enhanced Sparkles on Hover */}
      <AnimatePresence>
        {sparkles.map(sparkle => (
            <motion.div
                key={sparkle.id}
                initial={{ opacity: 1, scale: 0, rotate: 0 }}
                animate={{ 
                  opacity: [1, 0.8, 0], 
                  scale: [0, 1.5, 2],
                  rotate: 360
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute pointer-events-none"
                style={{ 
                  left: sparkle.x - 12, 
                  top: sparkle.y - 12,
                }}
            >
                <Sparkles 
                  size={24} 
                  className="text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]"
                />
            </motion.div>
        ))}
      </AnimatePresence>

      {/* Particle Trail */}
      <AnimatePresence>
        {particleTrail.map(particle => (
            <motion.div
                key={particle.id}
                initial={{ opacity: 0.8, scale: 1 }}
                animate={{ 
                  opacity: 0,
                  scale: 0,
                  y: -20
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute pointer-events-none rounded-full"
                style={{ 
                  left: particle.x - 4, 
                  top: particle.y - 4,
                  width: '8px',
                  height: '8px',
                  backgroundColor: particle.color,
                  boxShadow: `0 0 12px ${particle.color}`
                }}
            />
        ))}
      </AnimatePresence>
      
      {/* Multiple Atmospheric Glows - More Dynamic */}
      <motion.div 
        className="absolute w-[60vw] h-[60vw] bg-rose-500/10 blur-[150px] rounded-full pointer-events-none"
        animate={{
          top: ["0%", "10%", "0%"],
          left: ["0%", "5%", "0%"],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute w-[60vw] h-[60vw] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none"
        animate={{
          bottom: ["0%", "10%", "0%"],
          right: ["0%", "5%", "0%"],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-amber-500/5 blur-[180px] rounded-full pointer-events-none"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* More Frequent Shooting Stars - Random Directions */}
      {[...Array(8)].map((_, i) => {
        const fromRight = i % 2 === 0;
        const startX = fromRight ? 100 + Math.random() * 20 : -20 + Math.random() * 20;
        const endX = fromRight ? -20 + Math.random() * 20 : 100 + Math.random() * 20;
        
        return (
          <motion.div
            key={`shooting-star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              boxShadow: '0 0 10px 2px rgba(255,255,255,0.8), 0 0 20px 4px rgba(255,255,255,0.4)'
            }}
            initial={{
              top: `${Math.random() * 40}%`,
              left: `${startX}%`,
              opacity: 0
            }}
            animate={{
              top: `${60 + Math.random() * 40}%`,
              left: `${endX}%`,
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0]
            }}
            transition={{
              duration: 1.5 + Math.random() * 1.5,
              delay: i * 3 + Math.random() * 3,
              repeat: Infinity,
              repeatDelay: 8 + Math.random() * 7,
              ease: "easeInOut"
            }}
          >
            {/* Shooting star tail */}
            <div 
              className="absolute w-24 h-0.5 bg-gradient-to-r from-white to-transparent origin-left"
              style={{
                transform: fromRight ? 'rotate(-45deg)' : 'rotate(45deg)'
              }}
            />
          </motion.div>
        );
      })}

      {/* Twinkling Stars Background */}
      {[...Array(80)].map((_, i) => (
        <motion.div
          key={`twinkle-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
          }}
          animate={{
            opacity: [0.1, 1, 0.1],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 1.5 + Math.random() * 2.5,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Music Control - Enhanced Design */}
      <div className="fixed bottom-8 right-8 z-50 pointer-events-auto">
        <motion.button
            onClick={toggleMusic}
            className="relative p-4 bg-gradient-to-br from-rose-500/20 to-purple-500/20 backdrop-blur-xl border-2 border-white/30 rounded-full text-white shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_48px_rgba(236,72,153,0.5)] transition-all group"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            title={isPlaying ? "Mute Music" : "Play Music"}
        >
            {/* Animated Ring */}
            {isPlaying && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-rose-400"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.8, 0, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            )}

            {isPlaying ? (
                <div className="relative">
                    <Volume2 size={24} className="drop-shadow-lg" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-lg shadow-green-500/50"></span>
                    </span>
                    
                    {/* Sound waves */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 bg-rose-400 rounded-full"
                        animate={{
                          height: ["4px", "12px", "4px"],
                          opacity: [0.4, 1, 0.4]
                        }}
                        transition={{
                          duration: 0.8,
                          delay: i * 0.2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{
                          right: `${-8 - i * 6}px`
                        }}
                      />
                    ))}
                </div>
            ) : (
                <VolumeX size={24} className="drop-shadow-lg" />
            )}
        </motion.button>
        
        {/* Music Label */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isPlaying ? 1 : 0, x: isPlaying ? 0 : 20 }}
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
        >
          <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-medium shadow-lg">
            <Music size={14} className="inline mr-2" />
            Now Playing
          </div>
        </motion.div>
      </div>
    </div>
  );
};