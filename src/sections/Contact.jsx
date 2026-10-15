import { motion } from 'framer-motion';

const socialLinks = [
  ['GitHub', 'https://github.com/khfaysal'],
  ['LinkedIn', 'https://www.linkedin.com/in/kamrulhasanfaysal/'],
  ['Twitter / X', 'https://x.com/44kamrulhasan'],
  ['Design portfolio', 'https://kh-2por.netlify.app/'],
];

const Contact = () => (
  <footer id="contact" className="contact-section scroll-mt-24">
    <div className="site-shell">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="contact-main">
        <div>
          <p className="section-index">05 / Contact</p>
          <h2><span className="heading-accent">Have an idea?</span><span className="heading-outline">Let’s make it real.</span></h2>
        </div>
        <div className="contact-details">
          <p>I’m available for freelance projects and thoughtful collaborations. Tell me what you’re building.</p>
          <a href="mailto:k.hasanfaysal@gmail.com" className="contact-email focus-ring">k.hasanfaysal@gmail.com <span>↗</span></a>
          <div className="availability"><span className="status-dot" /> Available for projects</div>
        </div>
      </motion.div>

      <div className="contact-footer">
        <div className="social-list">
          {socialLinks.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer" className={`focus-ring ${label === 'Design portfolio' ? 'design-portfolio-footer-link' : ''}`}>{label}<span>↗</span></a>)}
        </div>
        <div className="footer-meta"><span>Savar, Dhaka, Bangladesh</span><span>© {new Date().getFullYear()} Kamrul Hasan</span><a href="#home">Back to top ↑</a></div>
      </div>
    </div>
  </footer>
);

export default Contact;
