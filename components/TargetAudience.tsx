import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Section from './ui/Section';
import { Briefcase, BookOpen, GraduationCap, PenTool, ArrowUpLeft, Zap, Sparkles, ScanLine, Share2, Layers } from 'lucide-react';

// --- Shared Types ---
interface CardProps {
  className?: string;
}

// --- 1. Career Card: "Warp Speed" (Efficiency) ---
const CareerCard: React.FC<CardProps> = ({ className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  // Smooth out the mouse movement
  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  // Calculate warp origin based on mouse
  const warpOriginX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const warpOriginY = useTransform(springY, [0, 1], ["0%", "100%"]);

  // Calculate dynamic line properties
  const pulseScale = useTransform(springX, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  return (
    <motion.div 
      ref={ref}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className={`relative overflow-hidden rounded-[2rem] bg-[#0c0c0c] border border-white/10 group cursor-crosshair ${className}`}
    >
      {/* Warp Speed Background */}
      <div className="absolute inset-0 overflow-hidden opacity-30" aria-hidden="true">
        <motion.div 
            style={{ 
                background: useMotionTemplate`radial-gradient(circle at ${warpOriginX} ${warpOriginY}, transparent 0%, #4c1d95 50%, #000 100%)`,
            }}
            className="absolute inset-0 z-0 transition-opacity duration-300"
        />
        
        {/* Dynamic Lines */}
        {[...Array(12)].map((_, i) => (
             <motion.div
                key={i}
                style={{
                    left: '50%',
                    top: '50%',
                    rotate: i * 30,
                    scale: pulseScale
                }}
                className="absolute w-[200%] h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent origin-left -translate-y-1/2 -translate-x-1/2"
             />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        <div>
          <div className="bg-purple-900/30 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/30 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <Briefcase className="text-purple-400 w-7 h-7" aria-hidden="true" />
          </div>
          <h3 className="text-3xl font-black text-white mb-2">אנשי קריירה</h3>
          <p className="text-gray-400 text-lg max-w-sm leading-relaxed">
            הפכו "זמן מת" בפקקים או ברכבת ליתרון יחסי. התחילו מאמר, המשיכו בנהיגה.
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-purple-400 text-xs font-mono tracking-widest mt-4">
           <Zap size={14} className="animate-pulse" aria-hidden="true" /> OPTIMIZING_ROUTE...
        </div>
      </div>
    </motion.div>
  );
};

// --- 2. Student Card: "Magic Lens / Highlighter" (Focus) ---
const StudentCard: React.FC<CardProps> = ({ className }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Generate masks unconditionally
  const maskImage = useMotionTemplate`radial-gradient(120px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className={`relative rounded-[2rem] bg-[#0a0a0a] border border-white/10 overflow-hidden group ${className}`}
    >
      {/* Layer 1: Blurred, Dense Content (The Chaos) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 blur-[2px] contrast-50" aria-hidden="true">
         <div className="text-[10px] text-gray-500 font-serif leading-tight p-4 break-words select-none" style={{ wordSpacing: '5px' }}>
            {Array(40).fill("lorem ipsum dolor sit amet abstract complexity theory quantum physics history of time economic growth models cognitive load theory attention economy ").join(" ")}
         </div>
      </div>

      {/* Layer 2: The Reveal (The Insight) - Masked by Mouse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          maskImage: maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
          <div className="absolute inset-0 bg-[#ffd700]/10" /> {/* Highlighter Yellow Tint */}
          <div className="text-[10px] text-yellow-100 font-bold font-serif leading-tight p-4 break-words select-none drop-shadow-[0_0_5px_rgba(255,215,0,0.5)]" style={{ wordSpacing: '5px' }}>
            {Array(40).fill("lorem ipsum dolor sit amet abstract complexity theory quantum physics history of time economic growth models cognitive load theory attention economy ").join(" ")}
         </div>
      </motion.div>
      
      {/* Content */}
      <div className="relative z-20 p-8 h-full flex flex-col justify-between pointer-events-none">
         <div>
            <div className="bg-yellow-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-yellow-500/30">
               <ScanLine className="text-yellow-400 w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">סטודנטים</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              למצוא את המחט בערימת השחת. סיכומים חכמים של חומר מורכב.
            </p>
         </div>
      </div>
    </motion.div>
  );
};

// --- 3. Creator Card: "Viral Fluid" (Influence) ---
const CreatorCard: React.FC<CardProps> = ({ className }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    // Transform hooks moved to top level
    const blobX = useTransform(mouseX, val => val - 80);
    const blobY = useTransform(mouseY, val => val - 80);

    return (
      <motion.div
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className={`relative rounded-[2rem] bg-[#0a0a0a] border border-white/10 overflow-hidden group ${className}`}
      >
        {/* Dynamic Gradient blob following mouse */}
        <motion.div
            className="absolute bg-gradient-to-r from-pink-500 to-cyan-500 blur-[60px] opacity-40 rounded-full w-40 h-40 pointer-events-none"
            style={{
                x: blobX,
                y: blobY,
            }}
            aria-hidden="true"
        />

        {/* Mesh Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" aria-hidden="true" />
  
        {/* Content */}
        <div className="relative z-10 p-8 h-full flex flex-col justify-between">
           <div>
              <div className="bg-pink-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-pink-500/30">
                 <Share2 className="text-pink-400 w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">יוצרי תוכן</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                תהפכו לרפרנס. הפלטפורמה המושלמת להפצת רעיונות מורכבים.
              </p>
           </div>
           
           {/* Floating Likes/Reactions */}
           <motion.div 
             animate={{ y: [0, -10, 0] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="absolute bottom-6 right-6"
             aria-hidden="true"
           >
                <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-pink-500 border-2 border-black flex items-center justify-center text-[10px]">❤️</div>
                    <div className="w-8 h-8 rounded-full bg-cyan-500 border-2 border-black flex items-center justify-center text-[10px]">👍</div>
                </div>
           </motion.div>
        </div>
      </motion.div>
    );
  };

// --- 4. Learner Card: "Deep Space" (Infinite Curiosity) ---
const LearnerCard: React.FC<CardProps> = ({ className }) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  
  // Parallax layers
  const rotateX = useTransform(y, [0, 1], [5, -5]);
  const rotateY = useTransform(x, [0, 1], [-5, 5]);
  const moveBackX = useTransform(x, [0, 1], [20, -20]);
  const moveBackY = useTransform(y, [0, 1], [20, -20]);
  const moveFrontX = useTransform(x, [0, 1], [-10, 10]);
  const moveFrontY = useTransform(y, [0, 1], [-10, 10]);
  
  const bubble1X = useTransform(x, val => -val * 30);
  const bubble1Y = useTransform(y, val => -val * 30);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className={`${className}`}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full rounded-[2rem] bg-[#051e18] border border-emerald-500/20 overflow-hidden group transition-all duration-200 ease-out shadow-2xl"
      >
         {/* Background Starfield (Deep Layer) */}
         <motion.div 
            style={{ x: moveBackX, y: moveBackY, translateZ: -50 }}
            className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 mix-blend-screen scale-110"
            aria-hidden="true"
         />
         
         {/* Abstract Knowledge Shapes (Middle Layer) */}
         <motion.div 
            style={{ x: moveFrontX, y: moveFrontY, translateZ: 20 }}
            className="absolute top-10 right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] mix-blend-screen pointer-events-none"
            aria-hidden="true"
         />
         <motion.div 
            style={{ x: bubble1X, y: bubble1Y, translateZ: 10 }}
            className="absolute bottom-10 left-20 w-20 h-20 bg-blue-500/10 rounded-full blur-[30px] mix-blend-screen pointer-events-none"
            aria-hidden="true"
         />

         {/* Content Layer (Front) */}
         <div className="relative z-10 p-8 h-full flex flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
            <div>
                <div className="bg-emerald-500/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <BookOpen className="text-emerald-400 w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="text-3xl font-black text-white mb-2">Lifelong Learners</h3>
                <p className="text-gray-400 text-lg max-w-sm leading-relaxed">
                    למי שאוהב ללמוד פשוט כי זה כיף. הרחיבו אופקים בתחומים שמעולם לא חשבתם שתגיעו אליהם.
                </p>
            </div>
            
            <div className="flex justify-between items-end">
                <div className="flex items-center gap-2 text-emerald-500/70 text-xs font-mono">
                    <Layers size={14} aria-hidden="true"/> INFINITE_DEPTH
                </div>
                <div className="p-2 rounded-full border border-white/10 group-hover:bg-emerald-500 group-hover:text-black transition-colors duration-300">
                    <ArrowUpLeft className="w-6 h-6 transition-transform group-hover:rotate-45" aria-hidden="true" />
                </div>
            </div>
         </div>
      </motion.div>
    </motion.div>
  );
};


// --- Main Component ---
const TargetAudience: React.FC = () => {
  return (
    <Section className="bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 text-sm mb-6"
           >
              <Sparkles size={14} className="text-[#ff6b6b]" aria-hidden="true" /> TARGET_AUDIENCE
           </motion.div>
           <motion.h2 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="text-5xl md:text-7xl font-black mb-6"
           >
               למי זה מתאים?
           </motion.h2>
           <p className="text-gray-400 text-xl font-light">לכל מי שהמוח שלו רעב ליותר</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
          {/* 1. Career (Large) */}
          <CareerCard className="md:col-span-2" />
          
          {/* 2. Students (Small) */}
          <StudentCard className="" />

          {/* 3. Creators (Small) */}
          <CreatorCard className="" />

          {/* 4. Learners (Large) */}
          <LearnerCard className="md:col-span-2" />
        </div>
      </div>
    </Section>
  );
};

export default TargetAudience;