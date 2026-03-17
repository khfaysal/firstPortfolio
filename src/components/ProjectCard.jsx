import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ title, description, tags, githubLink, liveLink, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group bg-[#0a1122] rounded-xl overflow-hidden shadow-lg hover:shadow-[0_10px_30px_rgba(0,119,255,0.15)] border border-gray-800 hover:border-tech-secondary/50 transition-all duration-300 flex flex-col h-full relative"
    >
      {/* Decorative top border line */}
      <div className="h-1 w-full bg-gradient-to-r from-tech-primary via-tech-secondary to-tech-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="p-6 flex flex-col flex-grow">
        {/* Header Title & Icons */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-tech-primary transition-colors duration-300">
            {title}
          </h3>
          <div className="flex space-x-3 mt-1">
            {githubLink && (
              <a href={githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FaGithub size={20} />
              </a>
            )}
            {liveLink && (
              <a href={liveLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-tech-primary transition-colors">
                <FaExternalLinkAlt size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Short Description */}
        <p className="text-gray-400 text-sm leading-relaxed flex-grow">
          {description}
        </p>

        {/* Tech Stack Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span 
              key={i} 
              className="px-3 py-1 text-xs font-mono rounded-full bg-tech-primary/10 text-tech-primary border border-tech-primary/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
