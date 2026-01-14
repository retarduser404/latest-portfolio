'use client';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary border-t border-border relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.02 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-accent rounded-full filter blur-3xl opacity-5 -translate-x-1/2"></div>
      </motion.div>

      <div className="container-padding py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-12 mb-12 text-center"
          >
            {/* Brand */}
            <motion.div variants={itemVariants}>
              <motion.h3
                className="text-3xl font-bold text-accent mb-2"
                whileHover={{ scale: 1.1, rotate: 2 }}
              >
                KP
              </motion.h3>
              <p className="text-text-primary text-sm leading-relaxed">
                Building elegant solutions to complex problems, one line of code at a time.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="font-bold text-lg mb-4 text-accent">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'About', 'Projects', 'Blog', 'Contact'].map((link, idx) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <motion.a
                      href={`#${link.toLowerCase()}`}
                      className="text-text-secondary hover:text-accent text-sm transition inline-block"
                      whileHover={{ x: 3 }}
                    >
                      {link}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <h4 className="font-bold text-lg mb-4 text-accent">Connect</h4>
              <ul className="space-y-2">
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    href="https://github.com/retarduser404"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-accent text-sm transition inline-block"
                    whileHover={{ x: 3 }}
                  >
                    GitHub
                  </motion.a>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    href="https://www.linkedin.com/in/kartik-pathak-379959269/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-accent text-sm transition inline-block"
                    whileHover={{ x: 3 }}
                  >
                    LinkedIn
                  </motion.a>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    href="mailto:kartikpathak883@gmail.com"
                    className="text-text-secondary hover:text-accent text-sm transition inline-block"
                    whileHover={{ x: 3 }}
                  >
                    Email
                  </motion.a>
                </motion.li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="border-t border-border py-8 text-center origin-left"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-text-secondary text-sm"
            >
              © {currentYear} Kartik Pathak. All rights reserved.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
