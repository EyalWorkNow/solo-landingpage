import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, Check, Send, Instagram, Twitter, Linkedin, Github, Sparkles } from 'lucide-react';

// --- Warp Speed Background Component ---
const WarpBackground = ({ isAccelerating }: { isAccelerating: boolean }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const stars: { x: number; y: number; z: number; pz: number }[] = [];
        const numStars = 800;
        let speed = 0.5; // Base speed

        // Initialize stars
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width - width / 2,
                y: Math.random() * height - height / 2,
                z: Math.random() * width,
                pz: 0 // Previous Z
            });
            stars[i].pz = stars[i].z;
        }

        let animationFrameId: number;

        const render = () => {
            // Smoothly interpolate speed based on prop
            const targetSpeed = isAccelerating ? 30 : 2;
            speed += (targetSpeed - speed) * 0.05;

            // Fade trail effect
            ctx.fillStyle = isAccelerating ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 1)';
            ctx.fillRect(0, 0, width, height);
            
            const cx = width / 2;
            const cy = height / 2;

            stars.forEach(star => {
                star.z -= speed;
                
                if (star.z <= 0) {
                    star.z = width;
                    star.x = Math.random() * width - width / 2;
                    star.y = Math.random() * height - height / 2;
                    star.pz = width;
                }

                // Calculate projected position
                const x = (star.x / star.z) * width + cx;
                const y = (star.y / star.z) * height + cy;

                // Previous position for trails
                const px = (star.x / star.pz) * width + cx;
                const py = (star.y / star.pz) * height + cy;
                
                star.pz = star.z;

                if (x >= 0 && x <= width && y >= 0 && y <= height) {
                    const size = (1 - star.z / width) * (isAccelerating ? 4 : 2);
                    const alpha = (1 - star.z / width);
                    
                    ctx.beginPath();
                    if (isAccelerating) {
                        // Draw line trail
                        ctx.moveTo(px, py);
                        ctx.lineTo(x, y);
                        ctx.strokeStyle = `rgba(255, 107, 107, ${alpha})`;
                        ctx.lineWidth = size;
                        ctx.stroke();
                    } else {
                        // Draw dot
                        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isAccelerating]);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

// --- Social Link Component ---
const SocialLink = ({ href, icon: Icon }: { href: string; icon: any }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
    >
        <Icon size={18} />
    </a>
);

// --- Main Footer Component ---
const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    // Simulate warp speed processing
    setIsFocused(true); 
    setTimeout(() => {
        setStatus('success');
        setIsFocused(false);
    }, 2000);
  };

  return (
    <footer id="join-beta" className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-black">
      
      {/* 1. Dynamic Background */}
      <WarpBackground isAccelerating={isFocused} />
      
      {/* 2. Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-80 pointer-events-none z-0" />

      {/* 3. Main Content Wrapper */}
      <div className="relative z-10 flex-grow flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Text */}
            <div className="text-center lg:text-right space-y-8 order-2 lg:order-1">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-mono mb-6">
                        <Sparkles size={14} /> JOIN THE BETA
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter mb-6">
                        העתיד של<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#ff6b6b] to-purple-600">הלמידה כאן.</span>
                    </h2>
                    <p className="text-gray-400 text-xl leading-relaxed max-w-lg ml-auto">
                        אל תשארו מאחור. הצטרפו לרשימת ההמתנה וקבלו גישה מוקדמת לפיצ'רים שמשנים את חוקי המשחק.
                    </p>
                </motion.div>
                
                <div className="flex justify-center lg:justify-end gap-4 pt-4">
                     <SocialLink href="#" icon={Twitter} />
                     <SocialLink href="#" icon={Instagram} />
                     <SocialLink href="#" icon={Linkedin} />
                     <SocialLink href="#" icon={Github} />
                </div>
            </div>

            {/* Right Column: Interactive Card */}
            <div className="relative order-1 lg:order-2 flex justify-center">
                 {/* Moving Gradient Border Effect */}
                 <div className={`absolute -inset-[3px] bg-gradient-to-r from-[#ff6b6b] via-purple-600 to-[#ff6b6b] rounded-[2.5rem] blur-lg transition-opacity duration-500 ${isFocused ? 'opacity-100 animate-spin-slow' : 'opacity-30'}`} style={{ animationDuration: '3s' }}></div>
                 
                 <motion.div 
                    className="relative bg-[#050505]/90 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 w-full max-w-md shadow-2xl overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                 >
                     {/* Glass Sheen */}
                     <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

                     <div className="relative z-10">
                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-10"
                                >
                                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(34,197,94,0.5)]">
                                        <Check className="text-black w-10 h-10" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-2">You're In!</h3>
                                    <p className="text-gray-400">Welcome to the future.</p>
                                    <button 
                                        onClick={() => { setStatus('idle'); setEmail(''); }}
                                        className="mt-8 text-sm text-gray-500 hover:text-white underline underline-offset-4"
                                    >
                                        Register another email
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form 
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit} 
                                    className="flex flex-col gap-6"
                                >
                                    <div className="text-center mb-2">
                                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                                            <Mail className="text-white/80" size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">Get Early Access</h3>
                                        <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[#ff6b6b] to-transparent mx-auto mt-4 rounded-full"></div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="relative group">
                                            <input 
                                                type="email" 
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                onFocus={() => setIsFocused(true)}
                                                onBlur={() => !email && setIsFocused(false)}
                                                placeholder="Enter your email..."
                                                className="w-full bg-black/50 border-b-2 border-white/20 px-4 py-4 text-white placeholder-gray-500 outline-none focus:border-[#ff6b6b] transition-all text-center font-mono text-lg"
                                                required
                                            />
                                            {/* Corner Accents */}
                                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 group-focus-within:border-[#ff6b6b] transition-colors" />
                                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30 group-focus-within:border-[#ff6b6b] transition-colors" />
                                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30 group-focus-within:border-[#ff6b6b] transition-colors" />
                                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 group-focus-within:border-[#ff6b6b] transition-colors" />
                                        </div>

                                        <button 
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full bg-white text-black font-black text-lg py-5 rounded-xl hover:bg-[#ff6b6b] hover:text-white transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 translate-x-[-200%] group-hover:animate-shine" />
                                            
                                            {status === 'loading' ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                                                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                                </div>
                                            ) : (
                                                <>
                                                    LAUNCH <ArrowRight className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    
                                    <p className="text-center text-xs text-gray-600 font-mono">
                                        LIMITED SPOTS AVAILABLE • BATCH #04
                                    </p>
                                </motion.form>
                            )}
                        </AnimatePresence>
                     </div>
                 </motion.div>
            </div>
        </div>
      </div>

      {/* 4. Footer Links Bottom */}
      <div className="relative z-10 border-t border-white/10 bg-black">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 text-sm font-mono">
                  © 2024 SOLO INC.
              </p>
              <div className="flex gap-6 text-sm text-gray-500 font-mono">
                  <a href="#" className="hover:text-white transition-colors">Privacy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms</a>
                  <a href="#" className="hover:text-white transition-colors">Contact</a>
              </div>
          </div>
      </div>
    </footer>
  );
};

export default Footer;