import { motion } from 'framer-motion';

export default function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="neon-text">{title}</span>
      </h2>
      <div className="flex justify-center mb-6">
        <div className="accent-line"></div>
      </div>
      {subtitle && <p className="text-text-secondary max-w-2xl mx-auto">{subtitle}</p>}
    </motion.div>
  );
}
