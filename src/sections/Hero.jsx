import React from 'react';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import profileImg from '../assets/profile.png';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden"
    >
      <div className="container mx-auto px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Text Content (Left Side) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center lg:text-left order-2 lg:order-1"
          >
            <p className="text-tech-primary font-mono text-lg tracking-wider mb-2">
              Hi there, this is
            </p>

            <h1 className="text-5xl md:text-7xl lg:text-6xl xl:text-7xl font-bold text-white mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-tech-primary to-tech-secondary">
                Kamrul Hasan
              </span>
            </h1>

            <div className="text-2xl md:text-3xl lg:text-4xl font-mono text-gray-400 h-10 lg:h-12 mb-6">
              <Typewriter
                options={{
                  strings: [
                    '> Software Engineer_',
                    '> Frontend Developer_',
                    '> Tech Enthusiast_',
                    '> Designer_(sometimes)',
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                }}
              />
            </div>

            <p className="max-w-xl mx-auto lg:mx-0 text-gray-400 mt-6 text-lg xl:text-xl leading-relaxed">
              I build modern, high-performance web applications with a focus on
              clean code, dynamic user experiences, and scalable architecture.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <a
                href="#projects"
                className="px-8 py-3 rounded-md bg-tech-secondary text-white font-medium hover:bg-tech-secondary/80 transition-all duration-300 shadow-[0_0_15px_rgba(0,119,255,0.3)] hover:shadow-[0_0_25px_rgba(0,119,255,0.6)] transform hover:-translate-y-1 text-center"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-8 py-3 rounded-md border border-tech-primary text-tech-primary font-medium hover:bg-tech-primary/10 transition-all duration-300 text-center"
              >
                Contact Me
              </a>
            </motion.div>
          </motion.div>

          {/* Image/Avatar Section (Right Side) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center items-center order-1 lg:order-2 mb-8 lg:mb-0 relative"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 group">
              {/* Decorative Frame Elements */}
              <div className="absolute inset-0 border-2 border-tech-primary rounded-xl md:rounded-2xl transform translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500 z-0"></div>
              <div className="absolute inset-0 border border-tech-secondary rounded-xl md:rounded-2xl transform -translate-x-3 -translate-y-3 opacity-50 z-0"></div>

              {/* Core Image Container */}
              <div className="absolute inset-0 bg-[#0a1122] rounded-xl md:rounded-2xl overflow-hidden z-10 border border-t-[rgba(255,255,255,0.1)] border-l-[rgba(255,255,255,0.1)] border-b-[rgba(0,0,0,0.5)] border-r-[rgba(0,0,0,0.5)] shadow-2xl flex items-center justify-center relative">

                <img
                  src={profileImg}
                  alt="Kamrul Hasan"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 rounded-xl md:rounded-2xl"
                />

                {/* Subtle Overlay Effect */}
                <div className="absolute inset-0 bg-transparent group-hover:bg-tech-primary/10 mix-blend-overlay transition-colors duration-500 pointer-events-none"></div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Subtle bottom gradient fade to next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-tech-bg to-transparent pointer-events-none z-20"></div>
    </section>
  );
};

export default Hero;
