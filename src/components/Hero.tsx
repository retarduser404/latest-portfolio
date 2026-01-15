'use client';

import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from 'react-icons/fi';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center container-padding pt-20 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full filter blur-3xl opacity-5"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent rounded-full filter blur-3xl opacity-5"></div>
      </motion.div>

      <motion.div
        className="max-w-4xl mx-auto text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative z-10">
          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 leading-tight text-accent px-2 sm:px-0"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              KARTIK PATHAK
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl text-accent mb-4 font-semibold"
          >
            Full Stack Developer
          </motion.h2>

          {/* Secondary Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-text-secondary mb-4"
          >
            Specializing in Full Stack Development, AI & Cyber Security
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            BCAFSD Full Stack Development specialization graduating in 2027 from Jaipur National University
          </motion.p>

          {/* Accent line */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-8"
          >
            <motion.div 
              className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent"
              initial={{ width: 0 }}
              animate={{ width: '100px' }}
              transition={{ duration: 0.8, delay: 0.5 }}
            ></motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16 mt-8"
          >
            <motion.a
              href="#projects"
              aria-label="View my projects portfolio"
              whileHover={{ scale: 1.08, boxShadow: '0 0 40px rgba(0, 255, 65, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-accent text-white font-bold rounded-full hover:bg-accent transition cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              VIEW MY WORK
            </motion.a>
            <motion.a
              href="#contact"
              aria-label="Get in touch - Open contact form"
              whileHover={{ x: 8, boxShadow: '0 0 30px rgba(0, 255, 65, 0.5)' }}
              className="px-8 py-4 border-2 border-accent text-accent font-bold hover:bg-accent/10 transition flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-full neon-glow"
            >
              GET IN TOUCH
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                aria-hidden="true"
              >
                <FiArrowRight />
              </motion.span>
            </motion.a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-8 mt-12"
          >
            <motion.a
              href="https://github.com/retarduser404"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-4xl text-text-secondary transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded p-2"
              whileHover={{ scale: 1.3, rotate: 5, color: '#00FF41', textShadow: '0 0 20px rgba(0, 255, 65, 0.6)' }}
              whileTap={{ scale: 0.95 }}
            >
              <FiGithub aria-hidden="true" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/kartik-pathak-379959269/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-4xl text-text-secondary transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded p-2"
              whileHover={{ scale: 1.3, rotate: -5, color: '#00FF41', textShadow: '0 0 20px rgba(0, 255, 65, 0.6)' }}
              whileTap={{ scale: 0.95 }}
            >
              <FiLinkedin aria-hidden="true" />
            </motion.a>
            <motion.a
              href="mailto:kartikpathak883@gmail.com"
              aria-label="Email"
              className="text-4xl text-text-secondary transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded p-2"
              whileHover={{ scale: 1.3, rotate: 5, color: '#00FF41', textShadow: '0 0 20px rgba(0, 255, 65, 0.6)' }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMail aria-hidden="true" />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
