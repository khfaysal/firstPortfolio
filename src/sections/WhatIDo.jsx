import { motion } from 'framer-motion';
import { FaCode, FaMobileAlt, FaPaintBrush, FaRocket } from 'react-icons/fa';
import profileImg from '../assets/Photo-2.jpg';

const services = [
  { icon: <FaPaintBrush />, number: '01', title: 'Web Design', description: 'Eye-catching designs that combine creativity with strategy.' },
  { icon: <FaCode />, number: '02', title: 'Web Development', description: 'Clean, scalable code with modern frameworks and best practices.' },
  { icon: <FaMobileAlt />, number: '03', title: 'UI/UX Design', description: 'Intuitive interfaces designed for seamless user experiences.' },
  { icon: <FaRocket />, number: '04', title: 'Optimization', description: 'Speed, SEO, and performance improvements that drive results.' },
];

const WhatIDo = () => (
  <section id="about" className="editorial-section scroll-mt-24">
    <div className="site-shell">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} className="section-heading-grid">
        <p className="section-index">01 / About</p>
        <h2><span className="heading-accent">Design thinking.</span><span className="heading-outline">Engineering discipline.</span></h2>
        <p className="section-summary">I design, build, and ship creative websites and web applications that are fast, responsive, and focused on the people who use them.</p>
      </motion.div>

      <div className="about-layout">
        <motion.figure initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="about-portrait">
          <img src={profileImg} alt="Kamrul Hasan" />
          <figcaption><span>Based in Bangladesh</span><span>Available worldwide</span></figcaption>
        </motion.figure>

        <div className="about-copy">
          <p className="about-lead">I turn ideas into clear, responsive interfaces with a balance of visual character and dependable frontend engineering.</p>
          <p>I primarily work with React, JavaScript, Tailwind CSS, and Vite, and I am continuously learning backend technologies to become a skilled Full Stack Developer.</p>
          <div className="services-grid">
            {services.map((service) => (
              <article key={service.title} className="service-card">
                <div><span>{service.number}</span><i aria-hidden="true">{service.icon}</i></div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default WhatIDo;
