import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';

const FEATURED_COUNT = 3;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load projects from Firestore
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { collection, getDocs, query, orderBy } = await import('firebase/firestore');
        const { db } = await import('../firebase');
        
        const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const firestoreProjects = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProjects(firestoreProjects);
        }
      } catch (err) {
        console.error('Error loading projects:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const featuredProjects = projects.filter(p => p.featured).slice(0, FEATURED_COUNT);
  const additionalProjects = projects.filter(p => !featuredProjects.find(f => f.id === p.id));
  const displayedProjects = showAll ? projects : featuredProjects;

  return (
    <section id="projects" className="relative section-padding bg-bg-primary">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-text-primary uppercase tracking-tight">
              Featured <span className="text-gradient-purple">Projects</span>
            </h2>
            <div className="h-1 w-16 bg-gradient-purple rounded-full mt-3" />
          </div>
          {additionalProjects.length > 0 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-purple-light text-sm font-medium hover:text-text-primary transition-colors group flex items-center gap-2"
            >
              {showAll ? 'Show Less' : 'View All Projects'}
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </button>
          )}
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-purple-primary/30 border-t-purple-primary rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center border border-border-default/50">
            <p className="text-text-muted text-base">No projects added yet.</p>
            <p className="text-text-muted/60 text-xs mt-1">Please log in to the admin panel to add your projects.</p>
          </div>
        ) : (
          /* Projects Grid */
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                >
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* See More hint */}
        {!showAll && additionalProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 rounded-full border border-purple-primary/30 text-purple-light text-sm font-medium hover:bg-purple-primary/10 hover:border-purple-primary/50 transition-all duration-300 group"
            >
              See More Projects
              <span className="inline-block ml-2 group-hover:translate-y-0.5 transition-transform">↓</span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
