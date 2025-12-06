import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, Rewind, Volume2 } from 'lucide-react';
import Section from './ui/Section';

const AudioDemo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);

  // Toggle play state
  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <Section className="bg-[#080808] overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* Text Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-2 md:order-1 text-right"
        >
          <div className="inline-block px-4 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-bold mb-6">
            AUDIO EXPERIENCE
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            הטקסט שלכם,<br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#ff6b6b] to-purple-500">עכשיו ב-Audio.</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            לא צריך לבחור בין לקרוא ללהקשיב. עם SOLO, כל מאמר הופך לפודקאסט איכותי בלחיצת כפתור. 
            קריינות AI חכמה שמשנה אינטונציה לפי ההקשר.
          </p>
          
          <div className="flex gap-4">
            <div className="flex -space-x-4 space-x-reverse">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">
                   User
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-bold text-white">10k+ מאזינים</span>
              <span className="text-sm text-gray-500">הצטרפו למהפכת השמע</span>
            </div>
          </div>
        </motion.div>

        {/* Interactive Player Side */}
        <div className="order-1 md:order-2 relative flex justify-center">
          
          {/* Background Glow */}
          <motion.div 
            animate={{ scale: isPlaying ? [1, 1.1, 1] : 1, opacity: isPlaying ? 0.6 : 0.3 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-[#ff6b6b] rounded-full blur-[100px] opacity-30 z-0" 
          />

          {/* The Player Card */}
          <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[3rem] w-full max-w-md shadow-2xl">
            
            {/* Spinning Record / Cover */}
            <div className="relative w-64 h-64 mx-auto mb-10 group interactive cursor-pointer" onClick={togglePlay} role="button" aria-label="Toggle playback">
              <motion.div 
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-full h-full rounded-full p-1 bg-gradient-to-tr from-gray-800 to-black shadow-xl relative overflow-hidden"
              >
                 {/* Vinyl Texture */}
                 <div className="absolute inset-0 rounded-full border-[10px] border-black opacity-80" />
                 <div className="absolute inset-0 rounded-full border-[25px] border-black opacity-40" />
                 <div className="absolute inset-0 rounded-full border-[40px] border-black opacity-20" />
                 
                 {/* Center Label/Image */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full overflow-hidden border-4 border-[#1a1a1a]">
                    <img src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="Album Cover" loading="lazy" width="200" height="200" />
                 </div>
              </motion.div>

              {/* Play Button Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center text-white shadow-lg transition-transform duration-300 scale-0 group-hover:scale-100">
                {isPlaying ? <Pause fill="white" /> : <Play fill="white" className="ml-1" />}
              </div>
            </div>

            {/* Song Info */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-1">קיצור תולדות המחר</h3>
              <p className="text-[#ff6b6b] font-medium">יובל נח הררי</p>
            </div>

            {/* Scrubber */}
            <div className="mb-8 group interactive" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Audio progress">
               <div className="h-2 bg-gray-700 rounded-full overflow-hidden relative">
                 <motion.div 
                   className="absolute top-0 right-0 h-full bg-[#ff6b6b]"
                   style={{ width: `${progress}%` }}
                 />
                 {/* Draggable Knob (Visual only) */}
                 <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" style={{ right: `calc(${progress}% - 8px)` }}></div>
               </div>
               <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
                 <span>12:30</span>
                 <span>04:15</span>
               </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between px-4">
              <button aria-label="Mute" className="text-gray-400 hover:text-white interactive"><Volume2 size={20}/></button>
              <div className="flex items-center gap-6">
                <button aria-label="Rewind" className="text-white hover:text-[#ff6b6b] transition-colors interactive"><Rewind size={28} /></button>
                <button 
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg interactive"
                >
                  {isPlaying ? <Pause fill="black" size={24} /> : <Play fill="black" size={24} className="ml-1" />}
                </button>
                <button aria-label="Skip Forward" className="text-white hover:text-[#ff6b6b] transition-colors interactive"><SkipForward size={28} /></button>
              </div>
              <div className="w-5"></div>
            </div>

          </div>
        </div>
      </div>
    </Section>
  );
};

export default AudioDemo;