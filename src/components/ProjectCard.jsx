import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaImages, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

const ProjectCard = ({ project, index }) => {
  const [showGallery, setShowGallery] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Filter out empty URLs and safety limit to 10 screenshots max
  const screenshots = Array.isArray(project.screenshots)
    ? project.screenshots.filter(url => url.trim() !== '').slice(0, 10)
    : [];

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -6, transition: { duration: 0.25 } }}
        className="glass-card rounded-2xl overflow-hidden group hover:border-purple-primary/30 transition-all duration-300 flex flex-col h-full"
      >
        {/* Project Thumbnail */}
        <div className="relative h-48 overflow-hidden bg-bg-elevated">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-dark/30 to-bg-card">
              <span className="text-5xl font-heading font-black text-purple-primary/20">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          )}

          {/* Screenshot Count Overlay Icon */}
          {screenshots.length > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setShowGallery(true); }}
              className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-bg-primary/80 backdrop-blur-sm border border-border-default/60 hover:border-purple-primary/40 text-text-secondary hover:text-text-primary text-[10px] font-mono transition-all z-30"
            >
              <FaImages size={12} className="text-purple-primary" />
              <span>{screenshots.length} visual{screenshots.length !== 1 ? 's' : ''}</span>
            </button>
          )}

          {/* Hover Overlay with links */}
          <div className="absolute inset-0 bg-bg-primary/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            {screenshots.length > 0 && (
              <button
                onClick={() => setShowGallery(true)}
                className="px-4 py-2 rounded-xl bg-purple-primary text-white text-xs font-semibold uppercase tracking-wider hover:bg-purple-glow transition-all"
              >
                View Gallery
              </button>
            )}
            <div className="flex gap-2">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-text-primary/10 backdrop-blur-sm flex items-center justify-center text-text-primary hover:bg-bg-elevated border border-border-default/50 transition-all"
                  title="Source Code"
                >
                  <FaGithub size={16} />
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-text-primary/10 backdrop-blur-sm flex items-center justify-center text-text-primary hover:bg-bg-elevated border border-border-default/50 transition-all"
                  title="Live Site"
                >
                  <FaExternalLinkAlt size={14} />
                </a>
              )}
            </div>
          </div>

          {/* Number badge */}
          <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-bg-primary/70 backdrop-blur-sm flex items-center justify-center border border-border-default">
            <span className="text-xs font-mono text-purple-light font-semibold">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-text-primary font-heading font-semibold text-lg mb-1 group-hover:text-purple-light transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-text-muted text-xs uppercase tracking-wider mb-3">
            {project.category}
          </p>
          <p className="text-text-secondary text-sm leading-relaxed flex-grow">
            {project.description}
          </p>

          {/* Tech Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags?.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-[10px] font-mono rounded-full bg-purple-primary/10 text-purple-light border border-purple-primary/20 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ─── SCREENSHOTS LIGHTBOX MODAL ─────────────────────── */}
      <AnimatePresence>
        {showGallery && screenshots.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-bg-primary/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
            onClick={() => setShowGallery(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-bg-card border border-border-default flex items-center justify-center text-text-secondary hover:text-text-primary transition-all z-50"
            >
              <FaTimes size={18} />
            </button>

            {/* Slider container */}
            <div
              className="relative max-w-4xl w-full aspect-video rounded-2xl overflow-hidden border border-border-default bg-bg-card flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={screenshots[currentImgIndex]}
                alt={`Screenshot ${currentImgIndex + 1}`}
                className="w-full h-full object-contain"
              />

              {/* Navigation Arrows */}
              {screenshots.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 w-10 h-10 rounded-xl bg-bg-primary/80 border border-border-default/60 flex items-center justify-center text-text-secondary hover:text-text-primary transition-all"
                  >
                    <FaChevronLeft size={14} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 w-10 h-10 rounded-xl bg-bg-primary/80 border border-border-default/60 flex items-center justify-center text-text-secondary hover:text-text-primary transition-all"
                  >
                    <FaChevronRight size={14} />
                  </button>
                </>
              )}

              {/* Progress counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-bg-primary/80 border border-border-default text-text-secondary text-xs font-mono">
                {currentImgIndex + 1} / {screenshots.length}
              </div>
            </div>
            
            {/* Title / Description */}
            <div className="text-center mt-6 max-w-lg">
              <h4 className="text-text-primary font-heading font-bold text-lg">{project.title}</h4>
              <p className="text-text-muted text-xs uppercase tracking-wider mt-1">{project.category}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;
