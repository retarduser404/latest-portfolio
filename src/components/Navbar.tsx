'use client';

import { useState } from 'react';
import useActiveSection from '@/hooks/useActiveSection';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const active = useActiveSection();

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full bg-primary z-50 border-b border-border"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container-padding max-w-7xl mx-auto flex items-center justify-between h-20">
        {/* Logo */}
        <Link 
          href="#home" 
          className="text-2xl font-bold text-accent hover:text-accent transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded px-2 py-1"
          aria-label="Kartik Pathak - Full Stack Developer - Back to home"
        >
          KP
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => {
            const id = item.href.replace('#', '');
            const isActive = active === id;
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                aria-label={`Navigate to ${item.label} section`}
                className={`text-sm font-semibold transition relative focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded px-2 py-1 ${
                  isActive 
                    ? 'text-accent' 
                    : 'text-text-secondary hover:text-accent'
                }`}
              >
                {item.label}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent shadow-lg" style={{boxShadow: '0 0 10px rgba(0, 255, 106, 0.5)'}}></div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="md:hidden text-neon-lime hover:text-neon-acid text-2xl transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-lime rounded p-1"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          id="mobile-menu"
          className="md:hidden bg-primary border-t border-border"
        >
          <div className="container-padding py-4 flex flex-col gap-4">
            {menuItems.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = active === id;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={`Navigate to ${item.label} section`}
                  className={`font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded px-2 py-1 ${
                    isActive 
                      ? 'text-accent' 
                      : 'text-text-secondary hover:text-accent'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
