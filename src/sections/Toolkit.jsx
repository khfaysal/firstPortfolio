import { motion } from 'framer-motion';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaPython,
} from 'react-icons/fa';
import {
  SiTypescript, SiNextdotjs, SiTailwindcss, SiFirebase, SiMongodb,
  SiFigma
} from 'react-icons/si';
import { TbBrandAdobePhotoshop, TbBrandAdobeIllustrator, TbBrandAdobeIndesign } from 'react-icons/tb';

const tools = [
  { name: 'HTML5', icon: <FaHtml5 /> },
  { name: 'CSS3', icon: <FaCss3Alt /> },
  { name: 'JavaScript', icon: <FaJs /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'React', icon: <FaReact /> },
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'Node.js', icon: <FaNodeJs /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
  { name: 'Git', icon: <FaGitAlt /> },
  { name: 'Firebase', icon: <SiFirebase /> },
  { name: 'MongoDB', icon: <SiMongodb /> },
  { name: 'Python', icon: <FaPython /> },
  { name: 'Photoshop', icon: <TbBrandAdobePhotoshop /> },
  { name: 'Illustrator', icon: <TbBrandAdobeIllustrator /> },
  { name: 'InDesign', icon: <TbBrandAdobeIndesign /> },
  { name: 'Figma', icon: <SiFigma /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

const Toolkit = () => {
  return (
    <section className="relative section-padding bg-bg-primary">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-primary/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-text-primary uppercase tracking-tight">
            My <span className="text-gradient-purple">Toolkit</span>
          </h2>
          <div className="h-1 w-16 bg-gradient-purple rounded-full mt-3" />
        </motion.div>

        {/* Compact Icon Grid — monochrome, small */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-12 gap-3"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={itemVariants}
              whileHover={{ y: -3, scale: 1.05 }}
              className="glass-card rounded-xl p-3 flex flex-col items-center justify-center gap-2 group hover:border-purple-primary/30 transition-all duration-300 cursor-default"
            >
              {/* Icon — monochrome white/gray, small */}
              <div className="text-text-muted text-lg group-hover:text-purple-light transition-colors duration-300">
                {tool.icon}
              </div>
              {/* Label — tiny */}
              <span className="text-text-muted text-[8px] sm:text-[9px] font-medium uppercase tracking-wider group-hover:text-text-secondary transition-colors text-center leading-tight whitespace-nowrap">
                {tool.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Toolkit;
