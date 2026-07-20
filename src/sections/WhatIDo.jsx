import { motion } from 'framer-motion';
import { FaPaintBrush, FaCode, FaMobileAlt, FaRocket } from 'react-icons/fa';

const services = [
  {
    icon: <FaPaintBrush size={22} />,
    title: 'Web Design',
    description: 'Eye-catching designs that combine creativity with strategy.',
  },
  {
    icon: <FaCode size={22} />,
    title: 'Web Development',
    description: 'Clean, scalable code with modern frameworks and best practices.',
  },
  {
    icon: <FaMobileAlt size={22} />,
    title: 'UI/UX Design',
    description: 'Intuitive interfaces designed for seamless user experiences.',
  },
  {
    icon: <FaRocket size={22} />,
    title: 'Optimization',
    description: 'Speed, SEO and performance tweaks that drive results.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const WhatIDo = () => {
  return (
    <section id="services" className="relative section-padding bg-bg-primary scroll-mt-20">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {/* Left — Title Card (1 col, spans 2 cols on tablet) */}
          <motion.div
            variants={itemVariants}
            className="glass-card rounded-2xl p-7 flex flex-col justify-center md:col-span-2 lg:col-span-1"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary leading-tight uppercase">
              What<br />
              <span className="text-gradient-purple">I Do</span>
            </h2>
            <p className="text-text-muted text-xs mt-3 leading-relaxed">
              I design, build and ship creative websites and web applications that are fast, responsive and user-focused.
            </p>
            <div className="h-1 w-12 bg-gradient-purple rounded-full mt-4" />
          </motion.div>

          {/* Right — 4 Service Cards in a row */}
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="glass-card rounded-2xl p-5 group hover:border-purple-primary/30 transition-all duration-300 cursor-default flex flex-col"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-primary/10 flex items-center justify-center text-purple-primary mb-4 group-hover:bg-purple-primary/20 transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="text-text-primary font-heading font-semibold text-sm mb-2 uppercase tracking-wide">
                {service.title}
              </h3>
              <p className="text-text-muted text-xs leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIDo;
