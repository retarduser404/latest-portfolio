'use client';

import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import Card from './ui/Card';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

export default function About() {
  return (
    <section id="about" className="section-spacing container-padding bg-black relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.02 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-accent rounded-full filter blur-3xl opacity-5"></div>
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Heading */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-accent neon-text-glow mb-4">ABOUT ME</h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-accent to-transparent"
            ></motion.div>
          </div>

          {/* Bio Paragraphs */}
          <motion.div
            className="space-y-6 text-text-primary leading-relaxed"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg border-l-4 border-accent pl-6 py-2"
            >
              I'm a Full Stack Developer with proven expertise in building production-ready web applications. Currently pursuing my BCAFSD specialization at Jaipur National University (graduating 2027), I have hands-on experience with React, Node.js, TypeScript, and modern deployment platforms like Vercel.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg border-l-4 border-accent pl-6 py-2"
            >
              <strong>Key Achievements:</strong> Built and deployed the Mangal Chai Cafe menu management system - a full-stack application handling real-time order updates, inventory management, and customer engagement with responsive design. Proficient in frontend development (React, Next.js, Tailwind CSS), backend systems (Node.js, Express, REST APIs), and modern DevOps practices (Vercel, Git, security best practices).
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg border-l-4 border-accent pl-6 py-2"
            >
              I'm passionate about writing clean, maintainable code and staying current with industry standards. I specialize in TypeScript for type-safe development, implement proper security practices (CSP headers, authentication, data protection), and focus on accessibility and SEO optimization. When I'm not coding, I'm exploring new frameworks, contributing to open-source, or learning emerging technologies.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg border-l-4 border-accent pl-6 py-2"
            >
              My goal is to create impactful, production-grade applications that solve real problems while maintaining high code quality standards and user experience excellence. I'm committed to continuous learning and delivering measurable value through technology.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
