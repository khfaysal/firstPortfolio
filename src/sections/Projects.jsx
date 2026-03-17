import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';

// Sample data - You can replace this with your actual projects later
const projectsData = [
  {
    id: 1,
    title: 'E-Commerce Dashboard',
    description: 'A full-stack admin dashboard for managing inventory, tracking sales, and analyzing customer data with real-time charts.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
    category: 'Full Stack',
    githubLink: 'https://github.com',
    liveLink: 'https://example.com'
  },
  {
    id: 2,
    title: 'Crypto Tracker Pro',
    description: 'Real-time cryptocurrency tracking application featuring live WebSocket feeds, portfolio management, and advanced charting.',
    tags: ['Next.js', 'TypeScript', 'WebSockets', 'Framer Motion'],
    category: 'Frontend',
    githubLink: 'https://github.com',
    liveLink: 'https://example.com'
  },
  {
    id: 3,
    title: 'Neural Style Transfer API',
    description: 'A RESTful API wrapper around a PyTorch machine learning model that applies artistic styles to user-uploaded images.',
    tags: ['Python', 'FastAPI', 'PyTorch', 'Docker'],
    category: 'Backend',
    githubLink: 'https://github.com'
  },
  {
    id: 4,
    title: 'Terminal Portfolio',
    description: 'An interactive portfolio website built entirely to look and function like a MacOS terminal environment.',
    tags: ['React', 'CSS Modules', 'Zustand'],
    category: 'Frontend',
    githubLink: 'https://github.com',
    liveLink: 'https://example.com'
  }
];

const categories = ['All', 'Frontend', 'Backend', 'Full Stack'];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = projectsData.filter(project => {
    if (activeCategory === 'All') return true;
    return project.category === activeCategory;
  });

  return (
    <section id="projects" className="py-24 relative z-10 bg-tech-bg/50 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 flex items-center">
            <span className="text-tech-primary font-mono text-2xl md:text-4xl mr-4">01.</span> 
            Featured Projects
          </h2>
          <div className="h-1 w-24 bg-tech-secondary rounded-full"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full font-mono text-sm transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-tech-primary/20 text-tech-primary border border-tech-primary/50 shadow-[0_0_10px_rgba(0,255,204,0.3)]'
                  : 'bg-transparent text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
              >
                <ProjectCard 
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  githubLink={project.githubLink}
                  liveLink={project.liveLink}
                  index={index}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More CTA */}
        <div className="mt-16 text-center text-gray-400 font-mono text-sm">
          <p>This is just a selection of my recent work.</p>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-tech-primary hover:text-white transition-colors underline decoration-tech-primary/30 hover:decoration-white underline-offset-4">
            View full archive on GitHub →
          </a>
        </div>

      </div>
    </section>
  );
};

export default Projects;
