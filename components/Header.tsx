import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

// --- Utilities ---

// 1. Scramble Text Effect Hook
const useScramble = (text: string) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 30);
  };

  return { display, scramble };
};

// 2. Magnetic Button Component
const Magnetic = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const position = { x: useMotionValue(0), y: useMotionValue(0) };
    
    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        position.x.set(middleX * 0.2); // Magnetic strength
        position.y.set(middleY * 0.2);
    }

    const reset = () => {
        position.x.set(0);
        position.y.set(0);
    }

    const { x, y } = position;
    return (
        <motion.div
            style={{ x, y }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// --- Main Header Component ---

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();

  // Scroll detection logic (Header appearance)
  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  // Scroll Spy Logic (Active Link)
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = navLinks.map(link => link.href.substring(1));
      
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section is in the middle of the viewport or near top
          if (rect.top <= 300 && rect.bottom >= 300) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      // Smooth scroll
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false); // Close mobile menu if open
    }
  };

  const handleJoinClick = () => {
    const element = document.getElementById('join-beta');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  // Logo Effect
  const { display, scramble } = useScramble("SOLO");

  // Spotlight Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Hook must be called unconditionally at the top level
  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      300px circle at ${mouseX}px ${mouseY}px,
      rgba(255, 107, 107, 0.4),
      transparent 80%
    )
  `;

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const navLinks = [
    { name: "About", href: "#problem" },
    { name: "Features", href: "#features" },
    { name: "Demo", href: "#demo" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-6 pointer-events-none"
      >
        <motion.div
          layout
          onMouseMove={handleMouseMove}
          style={{
            width: isScrolled ? "auto" : "100%",
            maxWidth: isScrolled ? "fit-content" : "1200px",
          }}
          className={`
            group relative flex items-center justify-between px-2 py-2 rounded-full pointer-events-auto transition-all duration-500
            ${isScrolled ? 'bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl' : 'bg-transparent border border-transparent'}
          `}
        >
          {/* Spotlight Glow Border (Visible only when scrolled and container is small) */}
          {isScrolled && (
              <motion.div
                className="absolute -inset-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: spotlightBackground,
                }}
              />
          )}

          {/* --- Logo --- */}
          <Magnetic>
             <div 
                onMouseEnter={scramble}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`relative z-10 flex items-center justify-center px-6 py-3 cursor-pointer ${isScrolled ? '' : 'bg-black/20 backdrop-blur-md rounded-full border border-white/5'}`}
             >
                <span className="font-black text-xl tracking-tighter text-white mix-blend-difference font-mono min-w-[60px] text-center">
                    {display}
                </span>
             </div>
          </Magnetic>

          {/* --- Desktop Nav --- */}
          <nav className="hidden md:flex items-center gap-1 mx-2">
             {navLinks.map((link) => {
               const isActive = activeSection === link.href.substring(1);
               return (
                 <Magnetic key={link.name}>
                     <a 
                       href={link.href}
                       onClick={(e) => handleScrollTo(e, link.href)}
                       className={`relative px-5 py-2 text-sm font-medium transition-colors group/link ${isActive ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                     >
                       <span className="relative z-10">{link.name}</span>
                       {/* Hover pill (also acts as Active background) */}
                       <span className={`absolute inset-0 bg-white/10 rounded-full transition-transform duration-300 ease-out ${isActive ? 'scale-100' : 'scale-0 group-hover/link:scale-100'}`} />
                     </a>
                 </Magnetic>
               );
             })}
          </nav>

          {/* --- Actions --- */}
          <div className="flex items-center gap-2">
             <Magnetic>
                <button 
                  onClick={handleJoinClick}
                  className={`
                    relative z-10 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 overflow-hidden group/btn
                    ${isScrolled ? 'bg-white text-black hover:bg-[#ff6b6b] hover:text-white' : 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black'}
                `}>
                   <span className="relative z-10 flex items-center gap-2">
                       Join Beta
                   </span>
                </button>
             </Magnetic>
             
             {/* Mobile Menu Toggle */}
             <div className="md:hidden ml-2">
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  aria-label="Open menu"
                  className="p-3 bg-white/10 rounded-full text-white"
                >
                    <Menu size={20} />
                </button>
             </div>
          </div>

        </motion.div>
      </motion.header>

      {/* --- Mobile Fullscreen Menu --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
                exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center"
            >
                <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                    className="absolute top-8 right-8 p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="flex flex-col gap-8 text-center">
                    {navLinks.map((link, i) => (
                        <motion.a
                           key={link.name}
                           href={link.href}
                           onClick={(e) => handleScrollTo(e, link.href)}
                           initial={{ y: 20, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.1 + i * 0.1 }}
                           className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white hover:to-[#ff6b6b] transition-all"
                        >
                            {link.name}
                        </motion.a>
                    ))}
                    <motion.button
                        onClick={handleJoinClick}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 px-10 py-4 bg-[#ff6b6b] text-white rounded-full text-xl font-bold"
                    >
                        Join The Flow
                    </motion.button>
                </div>

                {/* Background Noise */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;