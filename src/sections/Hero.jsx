import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import profileImg from '../assets/Photo-2.jpg';

const stats = [
  { value: '1+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Delivered' },
  { value: '5+', label: 'Happy Clients' },
  { value: '12+', label: 'Technologies' },
];

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-bg-primary flex flex-col justify-between pt-24 pb-12 overflow-hidden"
    >
      {/* ─── Background Glows ─────────────────────────────── */}
      <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-purple-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-violet-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-purple-dark/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Mini top banner text matching reference */}
      <div className="w-full max-w-[1400px] mx-auto px-6 py-2 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-text-muted font-mono relative z-40">
        <div className="flex items-center gap-2">
          <span className="w-4 h-[1px] bg-text-muted"></span>
          <span>Creative Developer</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>Available for Freelance</span>
          <span className="text-purple-primary">✦</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1400px] w-full mx-auto px-6 relative flex-grow flex flex-col justify-center my-auto z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center relative">
          
          {/* LEFT COLUMN: Texts (7 cols on large screens) */}
          <div className="lg:col-span-7 flex flex-col justify-center z-30 relative select-none">
            {/* "CREATIVE" */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h1
                className="font-heading font-black uppercase leading-[0.8] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(3rem, 9.5vw, 10rem)' }}
              >
                <span className="block hero-text-creative">Creative</span>
              </h1>
            </motion.div>

            {/* "DEVELOPER" */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="mt-1"
            >
              <h1
                className="font-heading font-black uppercase leading-[0.8] tracking-[-0.04em] text-text-primary"
                style={{ fontSize: 'clamp(3rem, 9.5vw, 10rem)' }}
              >
                <span className="block">Developer</span>
              </h1>
            </motion.div>

            {/* Sub-tagline information */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8 space-y-2 select-text"
            >
              <p className="text-text-secondary text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold leading-relaxed">
                I Design & Code Digital Experiences That Inspire.
              </p>
              <div className="flex items-center gap-2 text-text-muted font-mono text-[9px] sm:text-xs">
                <span className="text-purple-primary">⚡</span>
                <Typewriter
                  options={{
                    strings: ['CODE. DESIGN. DEPLOY.', 'SOFTWARE ENGINEER', 'FRONTEND DEVELOPER'],
                    autoStart: true,
                    loop: true,
                    delay: 60,
                    deleteSpeed: 30,
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Photo + Monogram (5 cols on large screens) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative z-20 mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-[280px] h-[360px] sm:w-[320px] sm:h-[420px] md:w-[340px] md:h-[440px]"
            >
              {/* Purple glow behind photo */}
              <div className="absolute -inset-4 bg-gradient-to-br from-purple-primary/20 via-purple-glow/10 to-transparent rounded-3xl blur-xl opacity-60 pointer-events-none" />
              
              {/* Photo Frame */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-purple-primary/20 bg-bg-card">
                <img
                  src={profileImg}
                  alt="Kamrul Hasan"
                  className="w-full h-full object-cover object-top"
                />
                {/* Purple overlay tint matching reference */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-purple-dark/30 to-purple-primary/10 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/95 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-purple-primary/5 mix-blend-color" />
              </div>

              {/* Monogram Badge (CD) */}
              <div className="absolute -bottom-6 -right-6 z-40 w-20 h-20 sm:w-24 sm:h-24">
                <div className="absolute inset-0 animate-[spin_25s_linear_infinite] pointer-events-none">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <defs>
                      <path id="monogramCircle" d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                    </defs>
                    <text className="fill-text-muted/40 text-[9px] uppercase tracking-[0.38em] font-mono">
                      <textPath href="#monogramCircle">
                        • DEPLOY • CODE • DESIGN • CREATIVE DEVELOPER
                      </textPath>
                    </text>
                  </svg>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-bg-card border-2 border-purple-primary/20 flex items-center justify-center shadow-lg">
                    <span className="text-xs sm:text-sm font-heading font-bold text-purple-light uppercase">KH</span>
                  </div>
                </div>
              </div>

              {/* Status Badge (Available for projects) */}
              <div className="absolute -left-6 bottom-8 z-30 bg-bg-card/90 backdrop-blur-sm border border-border-default rounded-xl p-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-primary"></span>
                  <span className="text-text-secondary text-[8px] sm:text-[9px] uppercase tracking-widest font-semibold font-mono leading-tight">
                    Available<br />For Projects
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>

      {/* Stats Bar Container (Kept clean at bottom, no overlap) */}
      <div className="max-w-[1400px] w-full mx-auto px-6 relative z-30">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border-default/40"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-xl px-4 py-3 text-center hover:border-purple-primary/20 transition-all duration-300"
            >
              <div className="text-xl md:text-2xl font-heading font-bold text-text-primary">
                {stat.value}
              </div>
              <div className="text-text-muted text-[9px] uppercase tracking-[0.15em] mt-0.5 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
