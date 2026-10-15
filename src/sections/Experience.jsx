import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const { collection, getDocs, query, orderBy } = await import('firebase/firestore');
        const { getDb } = await import('../firebase');
        const db = await getDb();
        const snapshot = await getDocs(query(collection(db, 'experiences'), orderBy('order', 'asc')));
        setExperiences(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error loading experiences:', error);
      } finally {
        setLoading(false);
      }
    };
    loadExperiences();
  }, []);

  return (
    <section id="experience" className="editorial-section border-section scroll-mt-24">
      <div className="site-shell">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-heading-grid">
          <p className="section-index">04 / Experience</p>
          <h2>Learning through<br />building.</h2>
          <p className="section-summary">A timeline of professional work and hands-on experience creating digital products.</p>
        </motion.div>

        {loading ? (
          <div className="loading-state" role="status"><span /> Loading experience</div>
        ) : experiences.length === 0 ? (
          <div className="empty-state"><p>Experience details are being prepared.</p><span>New entries can be managed securely through the admin portal.</span></div>
        ) : (
          <div className="experience-list">
            {experiences.map((experience, index) => (
              <motion.article key={experience.id || index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="experience-row">
                <span className="experience-number">{String(index + 1).padStart(2, '0')}</span>
                <div><h3>{experience.role}</h3><p className="experience-company">{experience.company}</p></div>
                <p className="experience-description">{experience.description}</p>
                <div className="experience-meta"><span>{experience.period}</span><div>{(Array.isArray(experience.skills) ? experience.skills : []).map((skill) => <small key={skill}>{skill}</small>)}</div></div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
