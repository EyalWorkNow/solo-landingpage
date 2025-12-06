import React from 'react';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Features from './components/Features';
import AudioDemo from './components/AudioDemo';
import TargetAudience from './components/TargetAudience';
import Footer from './components/Footer';
import CustomCursor from './components/ui/CustomCursor';
import Header from './components/Header';

function App() {
  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-[#ff6b6b] selection:text-white">
      <CustomCursor />
      <Header />
      
      <main>
        <Hero />
        <section id="problem">
           <Problem />
        </section>
        <section id="features">
            <Features />
        </section>
        <section id="demo">
            <AudioDemo />
        </section>
        <TargetAudience />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;