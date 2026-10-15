import { motion } from 'framer-motion';
import { FaAws, FaCss3Alt, FaGitAlt, FaHtml5, FaJs, FaNodeJs, FaReact } from 'react-icons/fa';
import { SiCplusplus, SiFirebase, SiFigma, SiMongodb, SiNextdotjs, SiNetlify, SiTailwindcss, SiTypescript, SiVercel } from 'react-icons/si';
import { TbBrandAdobeIllustrator, TbBrandAdobeIndesign, TbBrandAdobePhotoshop, TbLetterC } from 'react-icons/tb';
import designBg from '../assets/design_bg.png';

const tools = [
  ['C', <TbLetterC />], ['C++', <SiCplusplus />], ['HTML5', <FaHtml5 />], ['CSS3', <FaCss3Alt />],
  ['JavaScript', <FaJs />], ['TypeScript', <SiTypescript />], ['React', <FaReact />], ['Next.js', <SiNextdotjs />],
  ['Node.js', <FaNodeJs />], ['Tailwind', <SiTailwindcss />], ['Git', <FaGitAlt />], ['Firebase', <SiFirebase />],
  ['MongoDB', <SiMongodb />], ['Vercel', <SiVercel />], ['Netlify', <SiNetlify />], ['AWS', <FaAws />],
  ['Photoshop', <TbBrandAdobePhotoshop />], ['Illustrator', <TbBrandAdobeIllustrator />], ['InDesign', <TbBrandAdobeIndesign />], ['Figma', <SiFigma />],
];

const steps = [
  ['01', 'Discover', 'Understanding your goals, audience, and requirements.'],
  ['02', 'Design', 'Creating wireframes and purposeful visual solutions.'],
  ['03', 'Develop', 'Building clean, responsive, and scalable solutions.'],
  ['04', 'Deliver', 'Testing, optimizing, and launching with care.'],
];

const ToolkitProcessCTA = () => (
  <section id="skills" className="editorial-section border-section scroll-mt-24">
    <div className="site-shell">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-heading-grid">
        <p className="section-index">03 / Beyond the code</p>
        <h2><span className="heading-accent">Tools, process,</span><span className="heading-outline">and visual craft.</span></h2>
        <p className="section-summary">A practical toolkit for moving from an early idea to a polished, production-ready digital experience.</p>
      </motion.div>

      <div className="beyond-grid">
        <div className="toolkit-panel">
          <p className="panel-label">Selected toolkit / 20</p>
          <div className="toolkit-grid">
            {tools.map(([name, icon]) => <div key={name} className="tool-item"><span aria-hidden="true">{icon}</span><small>{name}</small></div>)}
          </div>
        </div>

        <div className="process-panel">
          <p className="panel-label">Working process</p>
          {steps.map(([number, title, description]) => (
            <article key={title} className="process-row"><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></article>
          ))}
        </div>

        <a href="https://kh-2por.netlify.app/" target="_blank" rel="noreferrer" className="design-link focus-ring">
          <img src={designBg} alt="Preview of Kamrul Hasan's design portfolio" />
          <div><span className="panel-label">Design practice</span><h3>Explore my design portfolio</h3><p>Branding, visual systems, and graphic design work.</p><strong>Visit portfolio ↗</strong></div>
        </a>
      </div>
    </div>
  </section>
);

export default ToolkitProcessCTA;
