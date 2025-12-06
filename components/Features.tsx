import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Layers, Headphones, FileText, Users, ArrowLeft, Play, Smartphone, AlignLeft } from 'lucide-react';

const features = [
  {
    id: "intro",
    type: "intro",
    title: "SOLO FLOW",
    subtitle: "Welcome to the Stream",
    desc: "גללו למטה כדי להיכנס לזרימה",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200" // Optimized width
  },
  {
    id: "feed",
    title: "Smart Feed",
    subtitle: "האלגוריתם שלומד אותך",
    desc: "לא עוד סרטוני חתולים. הפיד שלנו מזהה את הסקרנות שלך ומגיש לך מנות מדויקות של ידע.",
    icon: <Layers size={32} />,
    color: "#3b82f6", // Blue
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600" // Optimized width
  },
  {
    id: "audio",
    title: "Audio First",
    subtitle: "הטקסט הופך לקול",
    desc: "התחלתם לקרוא אבל חייבים לצאת? לחיצה אחת והמאמר הופך לפודקאסט בזמן אמת עם קריינות AI.",
    icon: <Headphones size={32} />,
    color: "#ef4444", // Red
    img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=600" // Optimized width
  },
  {
    id: "micro",
    title: "Micro Curation",
    subtitle: "חוק 3 העמודים",
    desc: "העולם עמוס. כל תוכן ב-SOLO מזוקק למהות שלו. מקסימום 3 עמודים, מקסימום ערך.",
    icon: <FileText size={32} />,
    color: "#a855f7", // Purple
    img: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=600" // Optimized width
  },
  {
    id: "social",
    title: "Knowledge Graph",
    subtitle: "קהילת המוחות",
    desc: "רשת חברתית לאנשים שחושבים. עקבו אחרי אוצרים ובנו את 'נבחרת הידע' שלכם.",
    icon: <Users size={32} />,
    color: "#10b981", // Emerald
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=600" // Optimized width
  }
];

// --- Interactive Visual Components ---

// 1. 3D Tilt Effect for Feed
const FeedVisual = ({ img }: { img: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  // Map mouse position to rotation
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    // Normalize -0.5 to 0.5
    x.set((mouseXPos / width) - 0.5);
    y.set((mouseYPos / height) - 0.5);
  };

  // Fixed hooks - moved to top level
  const floatingX = useTransform(mouseX, [-0.5, 0.5], [20, -20]);
  const floatingY = useTransform(mouseY, [-0.5, 0.5], [20, -20]);

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative w-full h-full bg-black/50 overflow-hidden flex items-center justify-center perspective-1000 cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10 pointer-events-none"></div>
      
      {/* 3D Container */}
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-48 h-80 rounded-[2rem] border-4 border-gray-800 bg-gray-900 shadow-2xl z-20"
      >
         {/* Reflection Gloss */}
         <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent z-30 pointer-events-none rounded-[1.8rem]"></div>
         
         <img src={img} alt="Smart Feed Interface" loading="lazy" width="400" height="800" className="absolute inset-0 w-full h-full object-cover opacity-60 rounded-[1.8rem]" />
         
         {/* Floating UI Elements inside phone (Parallax) */}
         <div className="absolute inset-0 flex flex-col gap-3 p-3 overflow-hidden transform-style-3d">
            {[1, 2, 3].map((i) => (
               <motion.div 
                 key={i}
                 initial={{ y: 0 }}
                 animate={{ y: -100 }}
                 transition={{ repeat: Infinity, duration: 5, ease: "linear", delay: i }}
                 style={{ translateZ: 20 + i * 10 }}
                 className="w-full aspect-[4/5] rounded-xl bg-white/10 backdrop-blur-md border border-white/5 p-2 shadow-lg"
               >
                  <div className="w-full h-2/3 bg-white/10 rounded-lg mb-2"></div>
                  <div className="w-2/3 h-2 bg-white/20 rounded-full mb-1"></div>
                  <div className="w-1/2 h-2 bg-white/20 rounded-full"></div>
               </motion.div>
            ))}
         </div>
      </motion.div>

      {/* Floating Elements Outside */}
      <motion.div 
        style={{ x: floatingX, y: floatingY }}
        className="absolute top-10 right-10 z-30 bg-blue-500/20 backdrop-blur-md border border-blue-500/50 p-3 rounded-xl pointer-events-none"
      >
        <Smartphone className="text-blue-400" />
      </motion.div>
    </div>
  );
};

// 2. Interactive Equalizer for Audio
const AudioVisual = ({ img }: { img: string }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // We'll generate bars that react to mouse proximity horizontally
  const bars = 24;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    // Calculate which bar index we are closest to
    const index = Math.floor((x / rect.width) * bars);
    setHoverIndex(index);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverIndex(null)}
      className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center cursor-crosshair"
    >
        <img src={img} alt="Audio Experience" loading="lazy" width="600" height="400" className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
        
        {/* Interactive Waveform */}
        <div className="relative z-20 flex items-end justify-center gap-[4px] h-40 w-full px-10">
            {Array.from({ length: bars }).map((_, i) => {
                // Calculate height based on proximity to hoverIndex
                let heightScale = 1;
                if (hoverIndex !== null) {
                    const distance = Math.abs(hoverIndex - i);
                    if (distance === 0) heightScale = 3;
                    else if (distance === 1) heightScale = 2;
                    else if (distance === 2) heightScale = 1.5;
                }

                return (
                    <motion.div
                        key={i}
                        animate={{ 
                            height: hoverIndex !== null 
                                ? [20 * heightScale, 25 * heightScale, 20 * heightScale] 
                                : ["20%", "40%", "20%"] 
                        }}
                        transition={{ 
                            duration: hoverIndex !== null ? 0.2 : 1.5,
                            repeat: hoverIndex !== null ? 0 : Infinity,
                            delay: i * 0.05
                        }}
                        className={`w-2 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-colors duration-200 ${hoverIndex !== null && Math.abs(hoverIndex - i) < 2 ? 'bg-white' : 'bg-red-500'}`}
                    />
                );
            })}
        </div>

        <div className="absolute bottom-6 left-6 z-30 flex items-center gap-3">
             <motion.div 
                animate={{ scale: hoverIndex !== null ? 1.2 : 1 }}
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center"
             >
                <Play size={16} fill="black" />
             </motion.div>
             <div className="text-sm font-mono text-white/70">
                 {hoverIndex !== null ? "INTERACTIVE_MODE" : "NOW PLAYING..."}
             </div>
        </div>
    </div>
  );
};

// 3. Fanning Pages for Micro
const MicroVisual = ({ img }: { img: string }) => {
  const y = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    const percentage = Math.min(Math.max(mouseY / rect.height, 0), 1);
    y.set(percentage);
  };

  const fanSeparation = useTransform(y, [0, 1], [0, 80]); // Pixels to separate
  const fanRotation = useTransform(y, [0, 1], [0, 15]);   // Degrees to rotate

  // Fixed hooks - moved to top level
  const backPageY = useTransform(fanSeparation, s => -s * 2);
  const backPageRotate = useTransform(fanRotation, r => -r * 2);
  const midPageY = useTransform(fanSeparation, s => -s);
  const midPageRotate = useTransform(fanRotation, r => -r);
  const barWidth = useTransform(y, [0, 1], ["0%", "100%"]);
  const instructionOpacity = useTransform(y, [0, 0.1], [1, 0]);

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => y.set(0)}
      className="relative w-full h-full flex items-center justify-center bg-[#0a0a0a] cursor-ns-resize"
    >
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>
        
        {/* Stacked Pages Effect */}
        <div className="relative z-10 w-56 h-72 perspective-1000">
             
             {/* Back Page */}
             <motion.div 
                style={{ 
                    y: backPageY,
                    rotate: backPageRotate,
                    scale: 0.9 
                }}
                className="absolute inset-0 bg-gray-800 rounded-xl border border-gray-700 shadow-xl origin-bottom-left flex items-center justify-center text-gray-600 font-mono text-4xl font-bold"
             >
                03
             </motion.div>

             {/* Middle Page */}
             <motion.div 
                style={{ 
                    y: midPageY,
                    rotate: midPageRotate,
                    scale: 0.95 
                }}
                className="absolute inset-0 bg-gray-700 rounded-xl border border-gray-600 shadow-xl origin-bottom-right flex items-center justify-center text-gray-500 font-mono text-4xl font-bold"
             >
                02
             </motion.div>

             {/* Top Page (Main) */}
             <motion.div 
                className="absolute inset-0 bg-black border border-purple-500/50 rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.2)] flex flex-col p-4 overflow-hidden z-30"
             >
                <div className="w-full h-32 bg-purple-900/20 rounded-lg mb-4 overflow-hidden relative group">
                    <img src={img} alt="Micro Learning" loading="lazy" width="400" height="200" className="w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="space-y-3">
                    <div className="h-2 w-full bg-gray-800 rounded overflow-hidden">
                        <motion.div className="h-full bg-purple-500" style={{ width: barWidth }} />
                    </div>
                    <div className="h-2 w-5/6 bg-gray-800 rounded"></div>
                    <div className="h-2 w-4/6 bg-gray-800 rounded"></div>
                </div>
                <div className="mt-auto flex justify-between items-end">
                    <AlignLeft className="text-purple-500" size={16}/>
                    <span className="text-[10px] text-gray-500 font-mono">PAGE 01/03</span>
                </div>
             </motion.div>
        </div>
        
        {/* Instruction Hint */}
        <motion.div style={{ opacity: instructionOpacity }} className="absolute bottom-10 text-white/20 text-xs font-mono">
            MOVE DOWN TO EXPAND
        </motion.div>
    </div>
  );
};

// 4. Magnetic Connection for Social
const SocialVisual = ({ img }: { img: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    });
    setIsHovering(true);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovering(false)}
      className="relative w-full h-full overflow-hidden bg-black cursor-none"
    >
        <img src={img} alt="Social Graph Background" loading="lazy" width="600" height="400" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        
        {/* SVG Layer for Connections */}
        <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none">
            {/* Static connections */}
            <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="#10b981" strokeWidth="1" opacity="0.2" />
            <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="#10b981" strokeWidth="1" opacity="0.2" />
            <line x1="50%" y1="50%" x2="30%" y2="80%" stroke="#10b981" strokeWidth="1" opacity="0.2" />

            {/* Dynamic Connection to Mouse */}
            {isHovering && (
                <motion.line 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    x1="50%" y1="50%" 
                    x2={mousePos.x} 
                    y2={mousePos.y} 
                    stroke="#10b981" 
                    strokeWidth="2"
                    strokeDasharray="5,5" 
                />
            )}
        </svg>

        {/* Center Node */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <div className="relative">
                <div className="w-20 h-20 rounded-full border-2 border-[#10b981] p-1 shadow-[0_0_50px_#10b981]">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" alt="Profile Center" loading="lazy" width="80" height="80" className="w-full h-full rounded-full object-cover grayscale" />
                </div>
                {/* Ping Animation */}
                <div className="absolute inset-0 rounded-full border border-[#10b981] animate-ping opacity-50"></div>
            </div>
        </div>

        {/* Floating Peripheral Nodes - Reveal on Hover */}
        <motion.div 
            animate={{ 
                x: isHovering ? (mousePos.x - 200) / 10 : 0, // Parallax opposite to mouse
                y: isHovering ? (mousePos.y - 200) / 10 : 0 
            }}
            className="absolute inset-0 z-20 pointer-events-none"
        >
             <div className="absolute top-[20%] left-[20%] w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm overflow-hidden">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="User 1" loading="lazy" width="48" height="48" className="opacity-60" />
             </div>
             <div className="absolute top-[30%] right-[20%] w-10 h-10 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm overflow-hidden">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100" alt="User 2" loading="lazy" width="40" height="40" className="opacity-60" />
             </div>
             <div className="absolute bottom-[20%] left-[30%] w-14 h-14 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm overflow-hidden">
                <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=100" alt="User 3" loading="lazy" width="56" height="56" className="opacity-60" />
             </div>
        </motion.div>

        {/* Custom Mouse Follower inside this card */}
        {isHovering && (
            <motion.div 
                className="absolute w-4 h-4 bg-[#10b981] rounded-full blur-[2px] z-40 pointer-events-none mix-blend-screen"
                animate={{ x: mousePos.x - 8, y: mousePos.y - 8 }}
                transition={{ type: "tween", ease: "linear", duration: 0 }}
            />
        )}
    </div>
  );
};


// --- Main Features Component ---

const Features: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Keep the previous reliable calculation logic
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "350vw"]);

  // Calculate width for progress bar unconditionally
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="bg-[#050505] relative">
      
      {/* Sticky Container */}
      <section ref={targetRef} className="relative h-[500vh]">
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
          
          {/* Subtle Global Background */}
          <div className="absolute inset-0 w-full h-full z-0 bg-[#050505]">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
          </div>

          {/* Progress & HUD */}
          <div className="absolute bottom-10 left-10 right-10 z-30 flex items-center gap-4 mix-blend-screen pointer-events-none">
             <div className="text-xs font-mono text-white/50">START</div>
             <div className="flex-1 h-[1px] bg-white/10 relative overflow-hidden">
                <motion.div 
                    style={{ width: progressWidth }}
                    className="absolute top-0 right-0 h-full bg-[#ff6b6b] shadow-[0_0_15px_#ff6b6b]"
                />
             </div>
             <div className="text-xs font-mono text-white/50">END</div>
          </div>

          {/* Content Track */}
          <div className="flex-1 flex items-center relative z-10 overflow-visible pointer-events-none">
             <motion.div style={{ x }} className="flex flex-row items-center h-full pr-[5vw] pl-[10vw]">
                {features.map((feature, i) => {
                  
                  // 1. Intro Slide
                  if (feature.type === 'intro') {
                    return (
                       <div key={feature.id} className="w-[80vw] md:w-[60vw] flex-shrink-0 flex flex-col justify-center relative pl-20 pointer-events-auto">
                         <div className="relative z-10">
                            <h2 className="text-[12vw] leading-[0.85] font-black text-white tracking-tighter">
                                SOLO
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b6b] to-purple-600">
                                    FLOW
                                </span>
                            </h2>
                            <p className="mt-8 text-xl text-gray-400 max-w-md border-l-2 border-[#ff6b6b] pl-6 ml-2">
                                {feature.desc}
                            </p>
                            <div className="mt-12 flex items-center gap-2 text-white/60 animate-pulse">
                                <ArrowLeft /> 
                                <span className="font-mono text-sm tracking-widest uppercase">Start Scrolling</span>
                            </div>
                         </div>
                         {/* Background abstract shape */}
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-br from-indigo-500/10 to-transparent blur-[100px] rounded-full -z-10"></div>
                       </div>
                    )
                  }
                  
                  // 2. Feature Cards
                  return (
                    <div key={feature.id} className="w-[90vw] md:w-[85vw] lg:w-[70vw] flex-shrink-0 px-4 md:px-8 pointer-events-auto h-[70vh]">
                      
                      <div className="w-full h-full flex flex-col md:flex-row bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden group hover:border-white/20 transition-all duration-500 shadow-2xl relative">
                        
                        {/* Glow Effect on Hover */}
                        <div 
                            className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 pointer-events-none"
                            style={{ background: `linear-gradient(45deg, ${feature.color}20, transparent)` }}
                        />

                        {/* Content Side (Left) */}
                        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center relative z-10 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-transparent pointer-events-none">
                            <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/5 border border-white/10 text-white shadow-inner group-hover:scale-110 transition-transform duration-500" style={{ color: feature.color }}>
                                {feature.icon}
                            </div>
                            
                            <div className="text-xs font-mono text-gray-500 mb-2 tracking-[0.2em]">FEATURE_0{i}</div>
                            
                            <h3 className="text-4xl md:text-6xl font-black text-white mb-4 leading-none tracking-tight">
                                {feature.title}
                            </h3>
                            
                            <h4 className="text-xl md:text-2xl font-medium mb-6 font-mono" style={{ color: feature.color }}>
                                {feature.subtitle}
                            </h4>
                            
                            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                                {feature.desc}
                            </p>

                            <div className="mt-auto pt-8 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 pointer-events-auto">
                                <button aria-label={`Explore ${feature.title}`} className="px-6 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors text-sm font-bold">
                                    EXPLORE
                                </button>
                            </div>
                        </div>

                        {/* Visual Side (Right) - Render component based on ID */}
                        <div className="flex-1 relative overflow-hidden bg-black pointer-events-auto">
                            {feature.id === 'feed' && <FeedVisual img={feature.img!} />}
                            {feature.id === 'audio' && <AudioVisual img={feature.img!} />}
                            {feature.id === 'micro' && <MicroVisual img={feature.img!} />}
                            {feature.id === 'social' && <SocialVisual img={feature.img!} />}
                            
                            {/* Corner Tech Detail */}
                            <div className="absolute top-6 right-6 z-20 pointer-events-none">
                                <div className="flex gap-1">
                                    <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                                    <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                                    <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
             </motion.div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Features;