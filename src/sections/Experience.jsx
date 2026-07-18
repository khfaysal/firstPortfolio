import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load experiences from Firestore
  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const { collection, getDocs, query, orderBy } = await import('firebase/firestore');
        const { db } = await import('../firebase');
        
        const q = query(collection(db, 'experiences'), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const firestoreExperiences = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setExperiences(firestoreExperiences);
        }
      } catch (err) {
        console.error('Error loading experiences:', err);
      } finally {
        setLoading(false);
      }
    };

    loadExperiences();
  }, []);

  return (
    <section id="experience" className="relative section-padding bg-bg-primary">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-primary/20 to-transparent" />
      
      {/* Purple glow */}
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-purple-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-text-primary uppercase tracking-tight">
            Work <span className="text-gradient-purple">Experience</span>
          </h2>
          <p className="text-text-muted text-sm mt-3">Building digital experiences</p>
          <div className="h-1 w-16 bg-gradient-purple rounded-full mt-3" />
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-2 border-purple-primary/30 border-t-purple-primary rounded-full animate-spin" />
          </div>
        ) : experiences.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center border border-border-default/50">
            <p className="text-text-muted text-base">No work experience added yet.</p>
            <p className="text-text-muted/60 text-xs mt-1">Please log in to the admin panel to add your work history.</p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={containerVariants}
            className="relative"
          >
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-purple-primary/40 via-purple-primary/20 to-transparent hidden md:block" />

            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.id || i}
                  variants={itemVariants}
                  className="relative flex gap-6 md:gap-10 group"
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex flex-col items-center shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-purple-primary/10 border border-purple-primary/30 flex items-center justify-center text-purple-primary group-hover:bg-purple-primary/20 group-hover:purple-glow transition-all duration-300 z-10">
                      <FaBriefcase size={18} />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 glass-card rounded-2xl p-6 md:p-8 group-hover:border-purple-primary/30 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-text-primary font-heading font-semibold text-lg">
                          {exp.role}
                        </h3>
                        <p className="text-purple-light text-sm font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-text-muted text-xs font-mono px-3 py-1 rounded-full bg-bg-elevated border border-border-default whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(exp.skills) ? exp.skills : []).map((skill, j) => (
                        <span
                          key={j}
                          className="px-2.5 py-1 text-[10px] font-mono rounded-full bg-purple-primary/10 text-purple-light border border-purple-primary/20 uppercase tracking-wider"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Experience;
