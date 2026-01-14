"use client";

import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import Card from './ui/Card';

const skillCategories = [
  {
    title: 'FRONTEND',
    skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript'],
    gridPosition: 'col-span-1',
    color: 'from-blue-500/20 to-transparent',
  },
  {
    title: 'BACKEND',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'Database Design', 'Authentication'],
    gridPosition: 'col-span-1',
    color: 'from-purple-500/20 to-transparent',
  },
  {
    title: 'TOOLS & PLATFORMS',
    skills: ['Git & GitHub', 'Vercel', 'VS Code', 'Postman', 'Linux', 'C++'],
    gridPosition: 'col-span-1 md:col-span-2',
    color: 'from-green-500/20 to-transparent',
  },
];

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="section-spacing container-padding bg-primary relative overflow-hidden">
      {/* Subtle animated background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.02 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent rounded-full filter blur-3xl opacity-5"></div>
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-accent">Technical Skills</h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-accent to-transparent"
            ></motion.div>
          </div>

          {/* Skills Grid - 2 cols with Tools & Platforms spanning full width */}
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skillCategories.map((category) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className={`border border-border rounded-lg p-6 bg-surface overflow-hidden relative group hover:border-accent transition ${category.gridPosition}`}
                whileHover={{ y: -5, boxShadow: '0 0 30px rgba(251, 191, 36, 0.2)' }}
              >
                {/* Gradient overlay on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} pointer-events-none`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10">
                  <h3 className="text-lg md:text-xl font-bold text-accent mb-4 uppercase tracking-wide group-hover:text-accent transition">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, idx) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05, duration: 0.4 }}
                        viewport={{ once: true }}
                        className="text-accent font-medium text-sm md:text-base hover:text-accent hover:bg-accent/10 px-2 py-1 rounded transition"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Glow border on hover */}
                <motion.div
                  className="absolute inset-0 rounded-lg border border-accent pointer-events-none"
                  initial={{ boxShadow: '0 0 0px rgba(251, 191, 36, 0)' }}
                  whileHover={{ boxShadow: '0 0 15px rgba(251, 191, 36, 0.3)' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

