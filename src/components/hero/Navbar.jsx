// src/components/hero/Navbar.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [activeLink, setActiveLink] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'work', label: 'Work', href: '#work' },
    { id: 'contact', label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 lg:right-8 z-50"
    >
      <motion.div 
        animate={{
          backdropFilter: isScrolled ? 'blur(20px)' : 'blur(16px)',
        }}
        transition={{ duration: 0.3 }}
        className="bg-black/70 backdrop-blur-2xl border border-white/20 rounded-lg md:rounded-xl lg:rounded-2xl px-3 sm:px-4 md:px-5 lg:px-6 py-2 md:py-2.5 lg:py-3 shadow-2xl"
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        <ul className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {navItems.map((item, index) => (
            <motion.li 
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <a
                href={item.href}
                onClick={() => setActiveLink(item.id)}
                className={`text-[11px] sm:text-xs md:text-sm font-medium tracking-wide transition-all duration-300 relative group ${
                  activeLink === item.id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
                {activeLink === item.id && (
                  <motion.span 
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 md:-bottom-1.5 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="absolute -bottom-1 md:-bottom-1.5 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500/50 to-orange-500/50 rounded-full group-hover:w-full transition-all duration-300" />
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.nav>
  );
}