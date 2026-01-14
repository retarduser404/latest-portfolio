 'use client';

 import { motion } from 'framer-motion';
 import { FiGithub, FiExternalLink, FiArrowUpRight } from 'react-icons/fi';

 const projects = [
   {
     id: 1,
     title: 'Mangal Chai Cafe - Menu Management System',
     description: 'Full-stack web application for cafe menu management, order tracking, and customer engagement. Built with modern React frontend and Node.js backend, featuring real-time order updates, inventory management, and responsive design. Currently live and serving customers.',
     tech: ['React', 'Node.js', 'JavaScript', 'Vercel', 'Responsive Design'],
     github: 'https://github.com/retarduser404/mangal-chai-cafe',
     demo: 'https://mangal-chai-cafe.vercel.app',
     year: 2025,
     status: 'Production',
   },
 ];

 const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
     opacity: 1,
     transition: {
       staggerChildren: 0.2,
       delayChildren: 0.1,
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

 export default function Projects() {
   return (
     <section id="projects" className="section-spacing container-padding bg-primary">
       <div className="max-w-6xl mx-auto">
         {/* Heading with animation */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           viewport={{ once: true }}
           className="mb-16"
         >
           <h2 className="text-4xl md:text-5xl font-bold text-accent mb-4">PROJECTS</h2>
           <motion.div
             initial={{ width: 0 }}
             whileInView={{ width: '100px' }}
             transition={{ duration: 0.8, delay: 0.2 }}
             viewport={{ once: true }}
             className="h-1 bg-gradient-to-r from-accent to-transparent"
           ></motion.div>
         </motion.div>

         {/* Projects Grid */}
         <motion.div
           className="flex justify-center"
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
         >
           {projects.map((project, idx) => (
             <motion.div
               key={project.id}
               variants={itemVariants}
               className="group border border-border rounded-lg p-6 bg-surface overflow-hidden relative w-full max-w-2xl hover:border-accent transition"
               whileHover={{ y: -8 }}
             >
               {/* Animated gradient overlay on hover */}
               <motion.div
                 className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent pointer-events-none"
                 initial={{ opacity: 0 }}
                 whileHover={{ opacity: 1 }}
                 transition={{ duration: 0.3 }}
               />

               <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-4">
                   <motion.span
                     className="inline-block px-3 py-1 bg-accent text-primary text-xs font-bold rounded"
                     whileHover={{ scale: 1.05 }}
                   >
                     {project.status}
                   </motion.span>
                   <span className="text-xs text-text-secondary">{project.year}</span>
                 </div>
                 
                 <h3 className="text-2xl font-bold text-accent mb-3 group-hover:text-accent transition">{project.title}</h3>
                 <p className="text-gray-100 text-base mb-6 leading-relaxed">{project.description}</p>

                 <motion.div
                   className="flex flex-wrap gap-2 mb-8"
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
                   {project.tech.map((t) => (
                     <motion.span
                       key={t}
                       variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                       className="px-3 py-1 text-xs text-text-primary bg-surface border border-border rounded hover:border-accent hover:bg-surface/50 transition"
                     >
                       {t}
                     </motion.span>
                   ))}
                 </motion.div>

                 <div className="flex flex-col sm:flex-row gap-4">
                   {project.github && project.github !== '#' && (
                     <motion.a
                       href={project.github}
                       target="_blank"
                       rel="noopener noreferrer"
                       aria-label={`View ${project.title} source code on GitHub`}
                       className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-accent text-accent font-bold rounded-lg hover:bg-accent hover:text-primary transition"
                       whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(251, 191, 36, 0.3)' }}
                       whileTap={{ scale: 0.95 }}
                     >
                       <FiGithub /> View Code
                     </motion.a>
                   )}
                   {project.demo && project.demo !== '#' && (
                     <motion.a
                       href={project.demo}
                       target="_blank"
                       rel="noopener noreferrer"
                       aria-label={`View ${project.title} live demo`}
                       className="flex items-center justify-center gap-2 px-6 py-3 bg-accent text-primary font-bold rounded-lg hover:bg-accent transition"
                       whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(251, 191, 36, 0.4)' }}
                       whileTap={{ scale: 0.95 }}
                     >
                       <FiExternalLink /> Live Demo
                     </motion.a>
                   )}
                 </div>
               </div>

               {/* Hover glow effect */}
               <motion.div
                 className="absolute inset-0 rounded-lg border-2 border-accent pointer-events-none"
                 initial={{ boxShadow: '0 0 0px rgba(251, 191, 36, 0)' }}
                 whileHover={{ boxShadow: '0 0 25px rgba(251, 191, 36, 0.5)' }}
                 transition={{ duration: 0.3 }}
               />
             </motion.div>
           ))}
         </motion.div>
       </div>
     </section>
   );
 }

