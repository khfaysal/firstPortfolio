import { motion } from 'framer-motion';
import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter, FaGlobe, FaArrowUp } from 'react-icons/fa';
import designBg from '../assets/design_bg.png';

const contactInfo = [
  { icon: <FaWhatsapp size={16} />, label: '+8801792965705', href: 'https://wa.me/8801792965705' },
  { icon: <FaEnvelope size={16} />, label: 'k.hasanfaysal@gmail.com', href: 'mailto:k.hasanfaysal@gmail.com' },
  { icon: <FaMapMarkerAlt size={16} />, label: 'Savar, Dhaka, Bangladesh', href: null },
];

const socialLinks = [
  { icon: <FaGithub size={20} />, label: 'GitHub', href: 'https://github.com/khfaysal' },
  { icon: <FaLinkedin size={20} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/kamrulhasanfaysal/' },
  { icon: <FaTwitter size={20} />, label: 'Twitter', href: 'https://x.com/44kamrulhasan' },
];

const Contact = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="relative py-20 bg-bg-primary">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-primary/20 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6">
        {/* Modern Bento Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT: Connect Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 glass-card rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-purple-primary/20 transition-all duration-300"
          >
            {/* Ambient Background Grid Glow */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-primary/5 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10 max-w-xl">
              <span className="text-purple-light text-xs font-mono uppercase tracking-[0.2em] mb-3 inline-block">✦ Let's Connect</span>
              <h2 className="text-3xl md:text-5xl font-heading font-black text-text-primary uppercase tracking-tight leading-tight">
                HAVE AN IDEA?<br />
                LETS BUILD THE <span className="text-gradient-purple">FUTURE</span> TOGETHER.
              </h2>
            </div>

            {/* Modern Social Rows */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-12 relative z-10">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-bg-elevated/40 border border-border-default hover:border-purple-primary/30 text-text-secondary hover:text-text-primary transition-all duration-300 group/item"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-purple-primary group-hover/item:scale-110 transition-transform">{link.icon}</span>
                    <span className="text-xs font-semibold tracking-wider uppercase font-heading">{link.label}</span>
                  </span>
                  <span className="text-xs opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all duration-300">→</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Direct Info & Quick Link Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 flex flex-col gap-6"
          >
            {/* Quick Contact Info */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 flex-grow flex flex-col justify-center gap-6 hover:border-purple-primary/20 transition-all duration-300">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-border-default flex items-center justify-center text-purple-primary shrink-0 group-hover:bg-purple-primary/10 transition-all duration-300">
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-text-secondary text-sm hover:text-text-primary transition-colors leading-tight"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span className="text-text-secondary text-sm leading-tight">{item.label}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Design Portfolio / Back to Top Card */}
            <a
              href="https://kh-2por.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-3xl p-6 flex items-center justify-between hover:border-purple-primary/20 transition-all duration-300 relative overflow-hidden group/card cursor-pointer"
            >
              {/* Design Portfolio Background Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-[0.25] pointer-events-none group-hover/card:opacity-[0.45] transition-opacity duration-500"
                style={{ backgroundImage: `url(${designBg})` }}
              />
              <div className="flex flex-col relative z-10">
                <span className="text-xs font-mono text-purple-light uppercase tracking-wider group-hover/card:text-purple-primary transition-colors">Design Portfolio</span>
                <span className="text-xs font-mono text-text-muted opacity-70 mt-1 flex items-center gap-1.5 transition-all group-hover/card:opacity-100 group-hover/card:text-text-secondary">
                  kh-2por.netlify.app <span className="text-[10px] group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform">↗</span>
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  scrollToTop();
                }}
                className="w-12 h-12 rounded-2xl bg-bg-elevated border border-border-default flex items-center justify-center text-text-secondary hover:text-purple-primary hover:border-purple-primary/40 hover:scale-105 transition-all duration-300 group relative z-20"
                title="Scroll to top"
              >
                <FaArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </a>
          </motion.div>
        </div>

        {/* Footer bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-16 pt-8 border-t border-border-default/40"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-text-muted text-xs font-mono tracking-wider uppercase">
              ⚡ Code is my craft, design is my voice.
            </p>
            <p className="text-text-muted text-[11px]">
              © {new Date().getFullYear()} Kamrul Hasan. Built with React & Tailwind.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
