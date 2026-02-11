import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Sparkles, Heart, Gift } from "lucide-react";

interface MemoryTimelineProps {
  onContinue: () => void;
}

const timelineData = [
  {
    year: "First Glance",
    title: "When I First Saw You",
    text: "From the moment our eyes met, I knew there was something special about you. Something worth waiting for.",
    image: "https://images.unsplash.com/photo-1661757476655-604bdac3f890?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZGhvb2QlMjBtZW1vcnklMjB2aW50YWdlJTIwc2Nob29sJTIwYWJzdHJhY3R8ZW58MXx8fHwxNzcwMDk3MDIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Sparkles,
  },
  {
    year: "Growing Closer",
    title: "Every Moment Together",
    text: "Through laughter, conversations, and quiet moments—every second with you has been a gift I treasure.",
    image: "https://images.unsplash.com/photo-1709754997217-68fb6d37a226?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm93dGglMjB0cmVlJTIwdGltZWxhcHNlJTIwbmF0dXJlJTIwYWJzdHJhY3R8ZW58MXx8fHwxNzcwMDk3MDIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Heart,
  },
  {
    year: "This Valentine's",
    title: "Today & Always",
    text: "Today I celebrate you, us, and everything we share. You're my heart, my smile, my everything.",
    image: "https://images.unsplash.com/photo-1649228166964-4d187f79b7dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBob2xkaW5nJTIwaGFuZHMlMjBzdW5zZXQlMjBzaWxob3VldHRlfGVufDF8fHx8MTc3MDA5NzAyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Heart,
  },
];

export const MemoryTimeline = ({ onContinue }: MemoryTimelineProps) => {
  return (
    <div className="bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 text-white">
      {timelineData.map((item, index) => (
        <TimelineSection key={index} item={item} index={index} />
      ))}
      
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1696186622511-efe49a666732?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBjYWxtJTIwaW50aW1hdGUlMjBtb29kfGVufDF8fHx8MTc3MDA5Njk2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')] bg-cover bg-center opacity-30 blur-sm" />
          
          {/* Gradient Overlays */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-rose-600/20 via-purple-600/20 to-pink-600/20"
            animate={{
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Floating Hearts */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-rose-400/20"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 20}%`
              }}
              animate={{
                y: [-20, 20, -20],
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart size={30} fill="currentColor" />
            </motion.div>
          ))}

          {/* Content */}
          <motion.div 
            className="z-10 text-center p-8 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="inline-block text-amber-300 mb-4" size={40} />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-[Playfair_Display] mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-pink-200">
              One More Thing...
            </h2>
            
            <p className="text-xl text-stone-300 mb-10 font-light leading-relaxed">
              There's a special Valentine's message waiting for you
            </p>

            <motion.button
                onClick={onContinue}
                className="group px-12 py-5 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-full font-[Lato] tracking-widest hover:shadow-[0_0_40px_rgba(244,63,94,0.6)] transition-all shadow-[0_8px_32px_rgba(244,63,94,0.4)] border-2 border-rose-400/30 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <span className="relative z-10 flex items-center gap-3 justify-center">
                  READ YOUR LETTER
                  <Heart className="group-hover:scale-110 transition-transform" size={20} fill="currentColor" />
                </span>
            </motion.button>
          </motion.div>
      </div>
    </div>
  );
};

const TimelineSection = ({ item, index }: { item: typeof timelineData[0]; index: number }) => {
  const Icon = item.icon;
  
  return (
    <section className="min-h-screen w-full relative flex items-center justify-center overflow-hidden py-20">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.5 }}
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-purple-950/70 to-slate-950/90" />
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-5 opacity-20">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-400"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles size={20} />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          {/* Icon */}
          <motion.div 
            className="inline-block mb-6"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="p-4 bg-gradient-to-br from-rose-500/20 to-purple-500/20 rounded-full border-2 border-rose-400/30 backdrop-blur-sm">
              <Icon className="text-rose-300" size={40} />
            </div>
          </motion.div>

          {/* Year Badge */}
          <motion.span 
            className="inline-block px-6 py-2 bg-gradient-to-r from-amber-500/20 to-rose-500/20 backdrop-blur-md border border-amber-400/30 rounded-full text-amber-200 font-mono text-sm tracking-[0.3em] mb-6 uppercase shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            {item.year}
          </motion.span>

          {/* Title */}
          <h2 className="text-5xl md:text-6xl font-[Playfair_Display] text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-pink-100 mb-8 leading-tight">
            {item.title}
          </h2>

          {/* Description */}
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-500/10 to-transparent blur-xl" />
            <p className="relative text-xl md:text-2xl font-[Lato] text-stone-200 font-light leading-relaxed max-w-2xl px-8 py-4">
              {item.text}
            </p>
          </motion.div>

          {/* Decorative Line */}
          <motion.div 
            className="mt-10 mx-auto w-24 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-5" />
    </section>
  );
};