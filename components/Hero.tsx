import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ChevronDown, Zap, Play, ArrowUpRight } from 'lucide-react';

// --- Components ---

// 1. Particle Flow Background (Canvas)
const ParticleFlow = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;
        
        const particles: Particle[] = [];
        const particleCount = 100; // Reduced count for cleaner look

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;
            alpha: number;

            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2;
                // Cyberpunk palette colors
                const colors = ['#ff6b6b', '#a855f7', '#3b82f6', '#ffffff']; 
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.alpha = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > w) this.vx *= -1;
                if (this.y < 0 || this.y > h) this.vy *= -1;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.alpha;
                ctx.fill();
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        let animationFrameId: number;

        const animate = () => {
            ctx.clearRect(0, 0, w, h);
            
            // Draw connections
            particles.forEach((p, index) => {
                p.update();
                p.draw();

                // Connect particles if close
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = p.color;
                        ctx.globalAlpha = (1 - dist / 150) * 0.15; // Fade out based on distance
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none" />;
};

// 2. Floating Glass Shard (3D Parallax Element)
const GlassShard = ({ 
    children, 
    className, 
    mouseX, 
    mouseY, 
    depth = 20, 
    initialRotation = 0 
}: { 
    children?: React.ReactNode, 
    className?: string, 
    mouseX: any, 
    mouseY: any, 
    depth?: number,
    initialRotation?: number
}) => {
    const x = useTransform(mouseX, [0, 1], [-depth, depth]);
    const y = useTransform(mouseY, [0, 1], [-depth, depth]);
    const rotate = useTransform(mouseX, [0, 1], [initialRotation - 5, initialRotation + 5]);

    return (
        <motion.div
            style={{ x, y, rotate }}
            className={`absolute backdrop-blur-md border border-white/10 bg-white/5 shadow-2xl overflow-hidden ${className}`}
        >
             <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
             {children}
        </motion.div>
    );
};

// 3. Magnetic Button
const MagneticButton = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            // Pull effect
            x.set((clientX - centerX) * 0.3); 
            y.set((clientY - centerY) * 0.3);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className={className}
            aria-label="Action Button"
        >
            {children}
        </motion.button>
    )
}

// --- Main Hero Component ---

const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth);
    mouseY.set(clientY / innerHeight);
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={ref} 
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505] perspective-1000"
      aria-label="Hero Section"
    >
        {/* Layer 0: Animated Canvas Background */}
        <ParticleFlow />

        {/* Layer 0.5: Vignette & Noise */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)] z-0 pointer-events-none" />
        
        {/* Layer 1: Floating Glass Shards (Abstract UI) */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
             {/* Left Top - Code/Text Shard */}
            <GlassShard mouseX={mouseX} mouseY={mouseY} depth={-40} initialRotation={-12} className="top-[15%] left-[5%] w-48 h-64 rounded-2xl opacity-40 hidden md:block">
                 <div className="p-4 space-y-2">
                     <div className="w-1/2 h-2 bg-white/20 rounded-full" />
                     <div className="w-3/4 h-2 bg-white/20 rounded-full" />
                     <div className="w-full h-32 bg-gradient-to-b from-white/10 to-transparent rounded-lg mt-4" />
                 </div>
            </GlassShard>

            {/* Right Bottom - Media Shard */}
            <GlassShard mouseX={mouseX} mouseY={mouseY} depth={-60} initialRotation={15} className="bottom-[20%] right-[10%] w-64 h-48 rounded-2xl opacity-40 hidden md:block">
                 <div className="flex items-center justify-center h-full">
                     <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center">
                         <Play fill="white" className="ml-1 opacity-50" />
                     </div>
                 </div>
            </GlassShard>
            
            {/* Center Deep - Glow */}
            <motion.div 
                style={{ 
                    x: useTransform(mouseX, [0, 1], [20, -20]),
                    y: useTransform(mouseY, [0, 1], [20, -20]),
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-[120px] rounded-full pointer-events-none" 
            />
        </div>

      {/* Layer 2: Main Content */}
      <motion.div 
        style={{ opacity, scale, y }}
        className="relative z-20 text-center w-full px-6 flex flex-col items-center"
      >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          >
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b6b] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff6b6b]"></span>
             </span>
             <span className="text-gray-300 text-xs font-mono tracking-widest uppercase">The Future of Learning</span>
          </motion.div>

          {/* Main Title - Prismatic Effect */}
          <div className="relative mb-8 inline-block px-2">
              <h1 className="text-[clamp(2.6rem,11vw,8.5rem)] font-black tracking-tight leading-[0.9] md:leading-[0.95] text-white mix-blend-overlay opacity-50 select-none" aria-hidden="true">KNOWLEDGE<br/>FLOW</h1>
              
              {/* Overlay Text with Gradient Mask */}
              <motion.h1 
                className="absolute inset-0 text-[clamp(2.6rem,11vw,8.5rem)] font-black tracking-tight leading-[0.9] md:leading-[0.95] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-transparent pointer-events-none"
                initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
                animate={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                aria-label="להפוך זמן מסך לזמן צמיחה"
              >
                  KNOWLEDGE<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b6b] via-purple-500 to-indigo-500 filter drop-shadow-[0_0_30px_rgba(255,107,107,0.3)]">
                    FLOW
                  </span>
              </motion.h1>
          </div>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-3xl text-gray-400 mb-12 max-w-2xl font-light leading-relaxed"
          >
            להפוך את הגלילה האינסופית למסע של ידע.
            <br />
            <span className="text-white/80 font-normal">מיקרו-למידה. אודיו חכם. פיד מותאם אישית.</span>
          </motion.p>

          {/* Buttons */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.8 }}
             className="flex flex-col sm:flex-row gap-6 items-center"
          >
            <MagneticButton 
                onClick={() => scrollToSection('join-beta')}
                className="group relative px-10 py-5 bg-white text-black rounded-full font-black text-lg overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-shadow duration-300"
            >
                <span className="relative z-10 flex items-center gap-2">
                    הצטרפו למהפכה <Zap size={20} className="fill-black" />
                </span>
                {/* Button Fill Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b6b] to-purple-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 text-white z-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </MagneticButton>

            <MagneticButton 
                onClick={() => scrollToSection('problem')}
                className="group px-10 py-5 rounded-full font-bold text-lg text-white border border-white/20 hover:bg-white/5 backdrop-blur-md transition-all flex items-center gap-3"
            >
                 איך זה עובד? <ArrowUpRight className="transition-transform group-hover:rotate-45" />
            </MagneticButton>
          </motion.div>

      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 mix-blend-difference flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll to Learn</span>
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;
