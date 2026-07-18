import { motion } from 'framer-motion';
import { FaSearch, FaPencilRuler, FaLaptopCode, FaPaperPlane } from 'react-icons/fa';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaPython, FaAws
} from 'react-icons/fa';
import {
  SiTypescript, SiNextdotjs, SiTailwindcss, SiFirebase, SiMongodb, SiVercel, SiNetlify, SiCplusplus
} from 'react-icons/si';
import { TbLetterC } from 'react-icons/tb';

const tools = [
  { name: 'C', icon: <TbLetterC /> },
  { name: 'C++', icon: <SiCplusplus /> },
  { name: 'HTML5', icon: <FaHtml5 /> },
  { name: 'CSS3', icon: <FaCss3Alt /> },
  { name: 'JavaScript', icon: <FaJs /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'React', icon: <FaReact /> },
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'Node.js', icon: <FaNodeJs /> },
  { name: 'Tailwind', icon: <SiTailwindcss /> },
  { name: 'Git', icon: <FaGitAlt /> },
  { name: 'Firebase', icon: <SiFirebase /> },
  { name: 'MongoDB', icon: <SiMongodb /> },
  { name: 'Vercel', icon: <SiVercel /> },
  { name: 'Netlify', icon: <SiNetlify /> },
  { name: 'AWS', icon: <FaAws /> },
];

const steps = [
  { icon: <FaSearch size={14} />, title: 'Discover', description: 'Understanding your goals, audience and requirements.' },
  { icon: <FaPencilRuler size={14} />, title: 'Design', description: 'Creating wireframes and visual solutions.' },
  { icon: <FaLaptopCode size={14} />, title: 'Develop', description: 'Building clean, responsive and scalable solutions.' },
  { icon: <FaPaperPlane size={14} />, title: 'Deliver', description: 'Testing, optimizing and launching with care.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ToolkitProcessCTA = () => {
  return (
    <section className="relative section-padding bg-bg-primary">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4"
        >
          {/* ─── LEFT: My Toolkit ──────────────────────────────── */}
          <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-heading font-bold text-text-primary uppercase tracking-tight mb-5">
              My <span className="text-gradient-purple">Toolkit</span>
            </h3>

            <div className="grid grid-cols-4 gap-2">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex flex-col items-center gap-1 p-1.5 rounded-lg bg-bg-elevated/50 border border-border-default/50 hover:border-purple-primary/20 transition-all duration-300 group cursor-default"
                >
                  <span className="text-text-muted text-sm group-hover:text-purple-light transition-colors">
                    {tool.icon}
                  </span>
                  <span className="text-text-muted text-[7.5px] uppercase tracking-wider font-medium group-hover:text-text-secondary transition-colors text-center leading-tight">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ─── MIDDLE: Work Process ─────────────────────────── */}
          <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-heading font-bold text-text-primary uppercase tracking-tight mb-5">
              Work <span className="text-gradient-purple">Process</span>
            </h3>

            <div className="space-y-4">
              {steps.map((step, i) => (
                <div key={step.title} className="flex gap-3 group">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-lg bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center text-purple-primary shrink-0 group-hover:bg-purple-primary/20 transition-all">
                      {step.icon}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px flex-1 bg-gradient-to-b from-purple-primary/20 to-transparent mt-1 min-h-[12px]" />
                    )}
                  </div>
                  {/* Text */}
                  <div className="pb-1">
                    <h4 className="text-text-primary font-heading font-semibold text-xs uppercase tracking-wider mb-0.5">
                      {step.title}
                    </h4>
                    <p className="text-text-muted text-[11px] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ─── RIGHT: CTA Card ──────────────────────────────── */}
          <motion.div
            variants={itemVariants}
            className="glass-card rounded-2xl p-6 relative overflow-hidden group hover:border-purple-primary/30 transition-all duration-500 flex flex-col justify-center"
          >
            {/* Glow orb */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-purple-primary/10 rounded-full blur-[50px] group-hover:bg-purple-primary/20 transition-all duration-500" />

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-text-primary leading-tight">
                Let's Build<br />
                Something<br />
                <span className="text-gradient-purple">Amazing</span><br />
                Together.
              </h3>

              {/* Decorative sparkles */}
              <div className="text-purple-light/50 text-xl mt-2">✦</div>

              <p className="text-text-muted text-xs mt-3 mb-6 leading-relaxed">
                Got a project in mind? Let's bring your vision to life with clean code and stunning design.
              </p>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-purple text-white font-semibold text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-purple-primary/30 transition-all duration-300 group/btn"
              >
                Get in Touch
                <span className="text-sm group-hover/btn:rotate-45 transition-transform duration-300">+</span>
              </a>
            </div>

            <div className="absolute top-5 right-6 text-purple-light/30 text-lg">✦</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolkitProcessCTA;
