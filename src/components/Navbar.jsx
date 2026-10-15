import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    const closeOnOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOnOutsideClick);
    };
  }, []);

  const handleNavClick = (event, href) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    window.history.replaceState(null, '', href);
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:top-5 sm:px-6">
      <div ref={menuRef} className="editorial-nav mx-auto max-w-6xl">
        <a href="#home" onClick={(event) => handleNavClick(event, '#home')} className="brand-mark focus-ring" aria-label="Kamrul Hasan, back to top">
          KH<span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={(event) => handleNavClick(event, link.href)} className="nav-link focus-ring">
              {link.name}
            </a>
          ))}
        </nav>

        <a href="#contact" onClick={(event) => handleNavClick(event, '#contact')} className="nav-cta focus-ring hidden md:inline-flex">
          Start a project <span aria-hidden="true">↗</span>
        </a>

        <button
          type="button"
          className="menu-toggle focus-ring md:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <span className={mobileMenuOpen ? 'translate-y-[5px] rotate-45' : ''} />
          <span className={mobileMenuOpen ? 'opacity-0' : ''} />
          <span className={mobileMenuOpen ? '-translate-y-[5px] -rotate-45' : ''} />
        </button>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav id="mobile-navigation" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mobile-nav md:hidden" aria-label="Mobile navigation">
              {navLinks.map((link, index) => (
                <a key={link.name} href={link.href} onClick={(event) => handleNavClick(event, link.href)}>
                  <span className="mono-label">0{index + 1}</span>{link.name}
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
