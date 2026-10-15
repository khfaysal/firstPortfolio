import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const MeetMe = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const handleOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('pointerdown', handleOutside);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('pointerdown', handleOutside);
    };
  }, []);

  useEffect(() => {
    if (open) firstLinkRef.current?.focus();
  }, [open]);

  return (
    <div ref={containerRef} className="meet-me">
      <AnimatePresence>
        {open && (
          <motion.div id="meet-me-menu" initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }} className="meet-menu" role="menu">
            <p><span className="status-dot" /> Let’s start a conversation</p>
            <a ref={firstLinkRef} href="mailto:k.hasanfaysal@gmail.com" role="menuitem" className="focus-ring"><FaEnvelope /><span><small>Email</small>Mail me</span><i>↗</i></a>
            <a href="https://wa.me/8801792965705" target="_blank" rel="noreferrer" role="menuitem" className="focus-ring"><FaWhatsapp /><span><small>WhatsApp</small>WhatsApp me</span><i>↗</i></a>
          </motion.div>
        )}
      </AnimatePresence>
      <button type="button" className="meet-button focus-ring" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-controls="meet-me-menu" aria-label={open ? 'Close contact options' : 'Open contact options'}>
        <span className="status-dot" /> {open ? 'Close' : 'Meet me'} <b aria-hidden="true">{open ? '×' : '+'}</b>
      </button>
    </div>
  );
};

export default MeetMe;
