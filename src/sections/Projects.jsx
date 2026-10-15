import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';

const FEATURED_COUNT = 4;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { collection, getDocs, query, orderBy } = await import('firebase/firestore');
        const { getDb } = await import('../firebase');
        const db = await getDb();
        const snapshot = await getDocs(query(collection(db, 'projects'), orderBy('order', 'asc')));
        setProjects(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const featuredProjects = projects.filter((project) => project.featured).slice(0, FEATURED_COUNT);
  const initialProjects = featuredProjects.length ? featuredProjects : projects.slice(0, FEATURED_COUNT);
  const displayedProjects = showAll ? projects : initialProjects;

  return (
    <section id="projects" className="editorial-section border-section scroll-mt-24">
      <div className="site-shell">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-heading-grid">
          <p className="section-index">02 / Selected work</p>
          <h2>Projects built<br />with intent.</h2>
          <p className="section-summary">A selection of digital products combining clear interfaces, responsive engineering, and practical outcomes.</p>
        </motion.div>

        {loading ? (
          <div className="loading-state" role="status"><span /> Loading selected work</div>
        ) : projects.length === 0 ? (
          <div className="empty-state"><p>Projects are being prepared.</p><span>Check back soon for selected case studies.</span></div>
        ) : (
          <div className="case-study-list">
            <AnimatePresence initial={false}>
              {displayedProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
            </AnimatePresence>
          </div>
        )}

        {projects.length > initialProjects.length && (
          <button type="button" className="show-more focus-ring" onClick={() => setShowAll((current) => !current)}>
            {showAll ? 'Show selected projects' : `View all projects (${projects.length})`} <span aria-hidden="true">{showAll ? '↑' : '↓'}</span>
          </button>
        )}
      </div>
    </section>
  );
};

export default Projects;
