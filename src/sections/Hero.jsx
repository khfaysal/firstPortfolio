import { motion } from 'framer-motion';

const stats = [
  { value: '1+', label: 'Years experience' },
  { value: '2+', label: 'Projects delivered' },
  { value: '2+', label: 'Happy clients' },
  { value: '12+', label: 'Technologies' },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] } }),
};

const Hero = () => (
  <section id="home" className="hero-section">
    <div className="hero-glow" aria-hidden="true" />
    <div className="hero-divider" aria-hidden="true" />

    <div className="site-shell relative z-10 flex min-h-screen flex-col justify-between pb-8 pt-32 sm:pb-10 sm:pt-36">
      <div>
        <motion.p custom={0} initial="hidden" animate="visible" variants={reveal} className="eyebrow">
          Software Engineer <span>—</span> Creative Developer
        </motion.p>

        <h1 className="hero-name" aria-label="Kamrul Hasan, creative developer">
          <motion.span custom={0.05} initial="hidden" animate="visible" variants={reveal}>Kamrul</motion.span>
          <motion.span custom={0.12} initial="hidden" animate="visible" variants={reveal}>Hasan</motion.span>
          <motion.span custom={0.19} initial="hidden" animate="visible" variants={reveal} className="outlined-word">Developer</motion.span>
        </h1>
      </div>

      <div className="hero-lower-grid">
        <motion.div custom={0.3} initial="hidden" animate="visible" variants={reveal} className="hero-intro">
          <p>I’m Kamrul Hasan, a Software Engineering student and frontend developer building modern, responsive, and thoughtful digital experiences.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#projects" className="button-primary focus-ring">View selected work <span aria-hidden="true">↘</span></a>
            <a href="https://github.com/khfaysal" target="_blank" rel="noreferrer" className="button-secondary focus-ring">GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </motion.div>

        <motion.div custom={0.38} initial="hidden" animate="visible" variants={reveal} className="hero-signature" aria-hidden="true">
          <span>KH</span><small>Code / Design / Deploy</small>
        </motion.div>

        <motion.dl custom={0.45} initial="hidden" animate="visible" variants={reveal} className="hero-status">
          <div><dt>Status</dt><dd><span className="status-dot" /> Available for projects</dd></div>
          <div><dt>Location</dt><dd>Savar, Dhaka, Bangladesh</dd></div>
          <div><dt>Focus</dt><dd>Frontend &amp; UI/UX</dd></div>
        </motion.dl>
      </div>

      <motion.div custom={0.52} initial="hidden" animate="visible" variants={reveal} className="hero-stats">
        {stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
      </motion.div>
    </div>
  </section>
);

export default Hero;
