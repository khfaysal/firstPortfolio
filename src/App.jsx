import React from 'react';
import Navbar from './components/Navbar';
import ParticlesBackground from './components/ParticlesBackground';
import Hero from './sections/Hero';
import Projects from './sections/Projects';

function App() {
  return (
    <div className="relative min-h-screen bg-transparent selection:bg-tech-primary/30 selection:text-tech-primary font-sans text-gray-300">
      {/* Dynamic Background */}
      <ParticlesBackground />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content Sections */}
      <main>
        <Hero />
        <Projects />
        {/* Placeholder for Contact section */}
        <section id="contact" className="py-24 relative z-10 bg-[#050a15]/90 min-h-[50vh] flex items-center justify-center">
             <div className="text-center">
                 <h2 className="text-4xl font-bold text-white mb-6">Let's Connect</h2>
                 <p className="text-gray-400 max-w-lg mx-auto mb-8 font-mono">
                     I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                 </p>
                 <a href="mailto:your.email@example.com" className="inline-block px-8 py-3 rounded-md bg-tech-primary/10 text-tech-primary border border-tech-primary hover:bg-tech-primary/20 transition-all shadow-[0_0_15px_rgba(0,255,204,0.15)] hover:shadow-[0_0_20px_rgba(0,255,204,0.3)]">
                     Say Hello
                 </a>
             </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 bg-[#03060c] py-8 text-center border-t border-gray-800">
          <p className="text-gray-500 font-mono text-xs">
              Designed & Built with React and Tailwind <br/>
              <span className="text-tech-primary/70">Terminal Portfolio Environment</span>
          </p>
      </footer>
    </div>
  );
}

export default App;
