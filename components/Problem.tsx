import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, MotionValue } from 'framer-motion';
import { Clock, Brain, Smartphone, TriangleAlert, Ban } from 'lucide-react';

// --- Types ---
interface CardProps {
  i: number;
  title: string;
  description: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

// --- Specific Card Designs ---

// 1. The Paradox (Glitch / Chaos)
const ParadoxContent = ({ title, description }: { title: string, description: string }) => {
    return (
        <div className="relative h-full flex flex-col justify-between p-8 md:p-12 overflow-hidden bg-[#0a0a0a] border border-red-500/20">
            {/* Glitch Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
                 <div className="absolute top-10 left-0 w-full h-1 bg-red-500 animate-pulse"></div>
                 <div className="absolute bottom-20 left-0 w-full h-1 bg-cyan-500 animate-pulse delay-75"></div>
                 <div className="absolute top-1/2 left-10 w-1 h-20 bg-white mix-blend-overlay"></div>
            </div>
            
            <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/50 text-red-500 text-xs font-mono mb-6">
                    <TriangleAlert size={14} aria-hidden="true" /> SYSTEM_OVERLOAD
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white mb-4 relative">
                    <span className="absolute -left-[2px] -top-[2px] text-red-500 opacity-70 mix-blend-screen animate-pulse" aria-hidden="true">{title}</span>
                    <span className="absolute -right-[2px] -bottom-[2px] text-cyan-500 opacity-70 mix-blend-screen animate-pulse" aria-hidden="true">{title}</span>
                    <span className="relative">{title}</span>
                </h2>
            </div>

            <div className="relative z-10 border-l-4 border-red-500 pl-6">
                <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Decorative Noise */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" aria-hidden="true"></div>
        </div>
    );
}

// 2. Time Waste (Draining / Clock)
const TimeContent = ({ title, description }: { title: string, description: string }) => {
    return (
        <div className="relative h-full flex flex-col justify-between p-8 md:p-12 overflow-hidden bg-[#080808] border border-orange-500/20">
            {/* Background Clock SVG */}
            <div className="absolute -right-20 -top-20 opacity-10 animate-[spin_60s_linear_infinite]" aria-hidden="true">
                <svg width="400" height="400" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" fill="none" className="text-orange-500" strokeDasharray="4 4" />
                    <line x1="50" y1="50" x2="50" y2="10" stroke="currentColor" strokeWidth="1" className="text-orange-500" />
                </svg>
            </div>

            <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/50 text-orange-500 text-xs font-mono mb-6">
                    <Clock size={14} aria-hidden="true" /> TIME_CRITICAL
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white mb-4">
                    {title}
                </h2>
            </div>

            <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                     <div className="text-6xl font-mono font-bold text-orange-500 tracking-tighter">2.5</div>
                     <div className="text-sm font-mono text-gray-500 uppercase tracking-widest">
                         Hours<br/>Lost / Day
                     </div>
                </div>
                <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-lg">
                    {description}
                </p>
            </div>
        </div>
    );
}

// 3. Cognitive Load (Blur / Focus)
const CognitiveContent = ({ title, description }: { title: string, description: string }) => {
    return (
        <div className="relative h-full flex flex-col justify-between p-8 md:p-12 overflow-hidden bg-[#050510] border border-indigo-500/20 group">
             {/* Background Blur Blobs */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px]" aria-hidden="true"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px]" aria-hidden="true"></div>

            <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/50 text-indigo-500 text-xs font-mono mb-6">
                    <Brain size={14} aria-hidden="true" /> MEMORY_LEAK
                </div>
                {/* Text Effect: Blurs out when NOT hovered (simulated via props in parent, but simple here) */}
                <h2 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                    {title}
                </h2>
            </div>

            <div className="relative z-10 backdrop-blur-sm bg-black/20 p-6 rounded-2xl border border-white/5">
                <p className="text-xl md:text-2xl text-indigo-100 font-light leading-relaxed">
                    {description}
                </p>
            </div>
            
            {/* Floating particles */}
            <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
                 {[...Array(5)].map((_,i) => (
                     <div key={i} className="absolute w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ top: `${Math.random()*100}%`, left: `${Math.random()*100}%`, animationDelay: `${i*0.5}s` }} />
                 ))}
            </div>
        </div>
    );
}

// 4. Inflexibility (Rigid / Mobile)
const InflexibilityContent = ({ title, description }: { title: string, description: string }) => {
    return (
        <div className="relative h-full flex flex-col justify-between p-8 md:p-12 overflow-hidden bg-[#050505] border border-emerald-500/20">
             {/* Grid Background */}
             <div className="absolute inset-0 opacity-20" 
                  aria-hidden="true"
                  style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
             </div>

            <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/50 text-emerald-500 text-xs font-mono mb-6">
                    <Smartphone size={14} aria-hidden="true" /> FORMAT_ERROR
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white mb-4">
                    {title}
                </h2>
            </div>

            <div className="relative z-10">
                 <div className="flex gap-4 mb-6 opacity-50" aria-hidden="true">
                     <div className="w-12 h-16 border-2 border-emerald-500/50 rounded-md"></div>
                     <div className="w-12 h-16 border-2 border-emerald-500/50 rounded-md border-dashed"></div>
                     <div className="w-12 h-16 border-2 border-emerald-500/50 rounded-md border-dotted"></div>
                 </div>
                <p className="text-xl md:text-2xl text-emerald-100 font-light leading-relaxed">
                    {description}
                </p>
            </div>
            
             <div className="absolute bottom-10 right-10 rotate-12 opacity-20" aria-hidden="true">
                 <Ban size={120} className="text-emerald-500" />
             </div>
        </div>
    );
}


// --- Main Card Wrapper (Handles Mouse & Scroll Physics) ---

const Card: React.FC<CardProps> = ({ i, title, description, progress, range, targetScale }) => {
  const container = useRef<HTMLDivElement>(null);
  
  // 1. Scroll Physics
  const scale = useTransform(progress, range, [1, targetScale]);
  // Entrance animation
  const rotateXEntrance = useTransform(progress, [range[0] - 0.2, range[0]], [60, 0]);
  const opacityEntrance = useTransform(progress, [range[0] - 0.2, range[0]], [0, 1]);
  const yEntrance = useTransform(progress, [range[0] - 0.2, range[0]], [500, 0]);
  
  // 2. Mouse Physics (Tilt & Shine)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const shineBg = useMotionTemplate`radial-gradient(circle at ${mouseX.get() * 100 + 50}% ${mouseY.get() * 100 + 50}%, rgba(255,255,255,0.1) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    // Calculate normalized position (-0.5 to 0.5)
    x.set((mouseXPos / width) - 0.5);
    y.set((mouseYPos / height) - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0 perspective-1000">
      <motion.div 
        style={{ 
          scale,
          y: i === 0 ? 0 : yEntrance,
          opacity: i === 0 ? 1 : opacityEntrance,
          rotateX: i === 0 ? rotateX : rotateXEntrance, // Combine or switch based on state logic? For simplicity, we prioritize scroll entrance then interactive tilt via the inner wrapper
          top: `calc(-5vh + ${i * 30}px)`,
        }} 
        className="relative w-[90vw] md:w-[65vw] h-[65vh] origin-top transform-gpu"
      >
        {/* Interactive Tilt Wrapper */}
        <motion.div
            style={{ 
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: "preserve-3d"
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full h-full relative rounded-[2.5rem] bg-[#1a1a1a] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] border border-white/10 overflow-hidden"
        >
            {/* Dynamic Content Switching */}
            {i === 0 && <ParadoxContent title={title} description={description} />}
            {i === 1 && <TimeContent title={title} description={description} />}
            {i === 2 && <CognitiveContent title={title} description={description} />}
            {i === 3 && <InflexibilityContent title={title} description={description} />}
            
            {/* Global Shine/Spotlight Overlay */}
            <motion.div 
                className="absolute inset-0 pointer-events-none mix-blend-overlay z-20"
                style={{ background: shineBg }}
                aria-hidden="true"
            />
            
            {/* Scanline Overlay */}
             <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0.03)_50%,rgba(255,255,255,0))] h-full w-full pointer-events-none z-10 bg-[length:100%_4px]" aria-hidden="true" />

        </motion.div>
      </motion.div>
    </div>
  )
}

// --- Main Container ---

const Problem: React.FC = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  const projects = [
    {
      title: "פרדוקס הקשב",
      description: "אנחנו מוצפים במידע אך רעבים לידע. הגלילה האינסופית היא מלכודת זמן.",
    },
    {
      title: "בזבוז זמן",
      description: "שעתיים וחצי ביום. זה הזמן הממוצע שהולך לאיבוד ברשתות חברתיות ללא ערך.",
    },
    {
      title: "עומס קוגניטיבי",
      description: "יותר מדי רעש. המוח לא מצליח לסנן את התוכן האיכותי ופשוט מוותר.",
    },
    {
      title: "חוסר גמישות",
      description: "רוצים ללמוד? תתיישבו. ספרים ומאמרים לא מתאימים לעולם דינמי של תנועה.",
    }
  ];

  return (
    <div ref={container} className="relative mt-[10vh] bg-black">
      
      {/* Header Section */}
      <div className="sticky top-0 h-[30vh] flex items-center justify-center z-0 pointer-events-none mb-20 overflow-hidden">
        <motion.div 
            style={{ 
                opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]),
                scale: useTransform(scrollYProgress, [0, 0.2], [1, 0.8]),
                y: useTransform(scrollYProgress, [0, 0.2], [0, -50])
            }} 
            className="text-center relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-full bg-red-500/10 blur-[100px] rounded-full mix-blend-screen" aria-hidden="true" />
          
          <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 text-white/50 font-mono text-xs mb-4 tracking-widest backdrop-blur-md rounded-full">
             /// SYSTEM DIAGNOSTIC
          </div>
          <h2 className="text-5xl md:text-8xl font-black text-white relative z-10">
            האתגר
          </h2>
          <p className="text-gray-400 mt-4 text-xl md:text-2xl font-light">
             למה קשה כל כך <span className="text-white border-b border-red-500">ללמוד</span> היום?
          </p>
        </motion.div>
      </div>

      {projects.map((project, i) => {
        // Calculate dynamic scale: later cards are smaller to create depth stack effect
        const targetScale = 1 - ( (projects.length - i) * 0.05);
        
        return (
            <Card 
                key={i} 
                i={i} 
                {...project} 
                progress={scrollYProgress} 
                range={[i * 0.25, 1]} 
                targetScale={targetScale}
            />
        );
      })}
    </div>
  );
};

export default Problem;