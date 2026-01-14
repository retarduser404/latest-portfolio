"use client";

import { motion } from 'framer-motion';
import { FiArrowRight, FiExternalLink } from 'react-icons/fi';

const blogPost = {
  id: 1,
  title: 'Mangal Chai Café Website: A Complete Walkthrough',
  date: '2024-03-20',
  readTime: '12 min read',
  excerpt: 'Building a Real-World React Cafe Website with Security-First Approach. A comprehensive walkthrough of creating a production-ready website for Mangal Chai, a local café in Jaipur.',
  tags: ['React', 'Security', 'Deployment', 'Web Development'],
  url: 'https://mangal-chai-cafe.vercel.app',
  githubUrl: 'https://github.com/retarduser404/mangal-chai-cafe-',
};

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

export default function Blog() {
  return (
    <section id="blog" className="section-spacing container-padding bg-primary relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.02 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-accent rounded-full filter blur-3xl opacity-5"></div>
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Heading */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-accent mb-4">BLOG</h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-accent to-transparent"
            ></motion.div>
          </div>

          {/* Single Blog Post */}
          <motion.div
            variants={itemVariants}
            className="border border-border rounded-lg p-8 md:p-10 bg-surface overflow-hidden relative group hover:border-accent transition"
            whileHover={{ y: -8 }}
          >
            {/* Animated gradient on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            <div className="relative z-10">
              {/* Date and read time */}
              <motion.div
                className="flex items-center gap-2 text-sm text-text-secondary mb-4"
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 1 }}
              >
                <span>{new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(blogPost.date))}</span>
                <span>•</span>
                <span>{blogPost.readTime}</span>
              </motion.div>

              <h3 className="text-2xl md:text-3xl font-bold text-accent mb-4 group-hover:text-accent transition">{blogPost.title}</h3>
              <p className="text-text-primary text-base mb-6 leading-relaxed">{blogPost.excerpt}</p>

              {/* Description */}
              <div className="mb-6 text-text-secondary text-sm leading-relaxed">
                <p className="mb-4">
                  In this comprehensive blog post, I walk through the complete development journey of the Mangal Chai Café website—a real-world React application built with a security-first approach. From initial architecture decisions to production deployment on Vercel, this project demonstrates professional-grade web development practices.
                </p>
                <p className="mb-4">
                  <strong className="text-text-primary">Key Topics Covered:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Project overview and real-world requirements</li>
                  <li>Tech stack decision-making (React 18, Vite, Tailwind CSS)</li>
                  <li>Component architecture and clean code practices</li>
                  <li>Mobile-first responsive design implementation</li>
                  <li>Frontend security hardening (CSP, sanitization, HTTP headers)</li>
                  <li>Performance optimization and bundle size reduction</li>
                  <li>Deployment pipeline and continuous integration</li>
                  <li>Lessons learned and best practices</li>
                </ul>
              </div>

              {/* Tags with stagger animation */}
              <motion.div
                className="flex flex-wrap gap-2 mb-6"
                initial="hidden"
                whileInView="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
              >
                {blogPost.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                    className="px-3 py-1 text-xs text-text-secondary bg-surface border border-border rounded hover:border-accent hover:bg-surface/80 transition"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

              {/* CTA Links */}
              <motion.div
                className="flex flex-col md:flex-row gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.a
                  href="/blog"
                  className="px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent transition flex items-center justify-center gap-2 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read Full Article
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FiArrowRight />
                  </motion.span>
                </motion.a>

                <motion.a
                  href={blogPost.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View GitHub Repository
                  <FiExternalLink size={18} />
                </motion.a>
              </motion.div>
            </div>

            {/* Glow border on hover */}
            <motion.div
              className="absolute inset-0 rounded-lg border border-border pointer-events-none"
              initial={{ boxShadow: '0 0 0px rgba(0, 255, 106, 0)' }}
              whileHover={{ boxShadow: '0 0 20px rgba(0, 255, 106, 0.2)' }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

