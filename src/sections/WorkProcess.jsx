import { motion } from 'framer-motion';
import { FaSearch, FaPencilRuler, FaLaptopCode, FaPaperPlane } from 'react-icons/fa';

const steps = [
  {
    icon: <FaSearch size={20} />,
    title: 'Discover',
    description: 'Understanding your goals, audience and requirements.',
  },
  {
    icon: <FaPencilRuler size={20} />,
    title: 'Design',
    description: 'Creating wireframes and visual solutions.',
  },
  {
    icon: <FaLaptopCode size={20} />,
    title: 'Develop',
    description: 'Building clean, responsive and scalable solutions.',
  },
  {
    icon: <FaPaperPlane size={20} />,
    title: 'Deliver',
    description: 'Testing, optimizing and launching with care.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const WorkProcess = () => {
  return (
    <section className="relative section-padding bg-bg-primary">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Work Process */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-text-primary uppercase tracking-tight">
                Work <span className="text-gradient-purple">Process</span>
              </h2>
              <div className="h-1 w-16 bg-gradient-purple rounded-full mt-3" />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={containerVariants}
              className="space-y-6"
            >
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  variants={itemVariants}
                  className="flex gap-5 group"
                >
                  {/* Timeline dot & line */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-xl bg-purple-primary/10 border border-purple-primary/30 flex items-center justify-center text-purple-primary group-hover:bg-purple-primary/20 group-hover:purple-glow transition-all duration-300 shrink-0">
                      {step.icon}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px h-full bg-gradient-to-b from-purple-primary/30 to-transparent mt-2 min-h-[24px]" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-2">
                    <h3 className="text-text-primary font-heading font-semibold text-base uppercase tracking-wider mb-1">
                      {step.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right - CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center"
          >
            <div className="glass-card rounded-3xl p-8 md:p-10 w-full relative overflow-hidden group hover:border-purple-primary/30 transition-all duration-500">
              {/* Background gradient orb */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-primary/10 rounded-full blur-[60px] group-hover:bg-purple-primary/20 transition-all duration-500" />

              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-text-primary leading-tight">
                  Let's Build<br />
                  Something <span className="text-gradient-purple">Amazing</span><br />
                  Together.
                </h3>
                <p className="text-text-muted text-sm mt-4 mb-8 leading-relaxed">
                  Got a project in mind? Let's bring your vision to life with clean code and stunning design.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-purple text-white font-semibold text-sm hover:shadow-lg hover:shadow-purple-primary/30 transition-all duration-300 transform hover:-translate-y-0.5 uppercase tracking-wider group"
                >
                  Get in Touch
                  <span className="text-lg group-hover:rotate-45 transition-transform duration-300">+</span>
                </a>
              </div>

              {/* Decorative sparkles */}
              <div className="absolute top-6 right-8 text-purple-light/40 text-2xl">✦</div>
              <div className="absolute bottom-8 right-16 text-purple-light/20 text-lg">✦</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
