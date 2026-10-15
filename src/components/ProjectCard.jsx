import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

const getProjectYear = (project) => {
  if (project.year) return project.year;
  if (project.createdAt?.toDate) return project.createdAt.toDate().getFullYear();
  if (project.createdAt?.seconds) return new Date(project.createdAt.seconds * 1000).getFullYear();
  return '—';
};

const ProjectCard = ({ project, index }) => {
  const [showGallery, setShowGallery] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const screenshots = Array.isArray(project.screenshots) ? project.screenshots.filter(Boolean).slice(0, 10) : [];

  useEffect(() => {
    if (!showGallery) return undefined;
    const handleKey = (event) => {
      if (event.key === 'Escape') setShowGallery(false);
      if (event.key === 'ArrowRight') setCurrentImgIndex((current) => (current + 1) % screenshots.length);
      if (event.key === 'ArrowLeft') setCurrentImgIndex((current) => (current - 1 + screenshots.length) % screenshots.length);
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKey);
    };
  }, [showGallery, screenshots.length]);

  const visual = project.thumbnail || screenshots[0];

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className={`case-study ${index % 2 ? 'case-study-reverse' : ''}`}
      >
        <div className="project-visual">
          {visual ? <img src={visual} alt={`${project.title} project preview`} loading="lazy" /> : <div className="project-placeholder">{String(index + 1).padStart(2, '0')}</div>}
          {screenshots.length > 0 && (
            <button type="button" onClick={() => setShowGallery(true)} className="gallery-trigger focus-ring" aria-label={`Open ${project.title} gallery`}>
              View gallery <span>{String(screenshots.length).padStart(2, '0')}</span>
            </button>
          )}
        </div>

        <div className="project-copy">
          <div className="project-kicker"><span>Case {String(index + 1).padStart(2, '0')}</span><span>{project.category || 'Digital project'}</span></div>
          <h3>{project.title}</h3>
          <p className="project-description">{project.description}</p>

          <dl className="project-meta">
            <div><dt>Year</dt><dd>{getProjectYear(project)}</dd></div>
            <div><dt>Role</dt><dd>{project.role || project.category || '—'}</dd></div>
            <div><dt>Stack</dt><dd>{project.tags?.length ? project.tags.join(' / ') : '—'}</dd></div>
          </dl>

          <div className="project-actions">
            {project.liveLink && <a href={project.liveLink} target="_blank" rel="noreferrer" className="editorial-link focus-ring">Live preview <span>↗</span></a>}
            {project.githubLink && <a href={project.githubLink} target="_blank" rel="noreferrer" className="editorial-link focus-ring">Source code <span>↗</span></a>}
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {showGallery && screenshots.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="gallery-modal" role="dialog" aria-modal="true" aria-label={`${project.title} project gallery`} onClick={() => setShowGallery(false)}>
            <button type="button" className="gallery-close focus-ring" onClick={() => setShowGallery(false)} aria-label="Close gallery"><FaTimes /></button>
            <div className="gallery-stage" onClick={(event) => event.stopPropagation()}>
              <img src={screenshots[currentImgIndex]} alt={`${project.title} screenshot ${currentImgIndex + 1}`} />
              {screenshots.length > 1 && (
                <>
                  <button type="button" className="gallery-arrow left focus-ring" onClick={() => setCurrentImgIndex((current) => (current - 1 + screenshots.length) % screenshots.length)} aria-label="Previous image"><FaChevronLeft /></button>
                  <button type="button" className="gallery-arrow right focus-ring" onClick={() => setCurrentImgIndex((current) => (current + 1) % screenshots.length)} aria-label="Next image"><FaChevronRight /></button>
                </>
              )}
              <span className="gallery-count">{currentImgIndex + 1} / {screenshots.length}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;
