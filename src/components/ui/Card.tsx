import { motion } from 'framer-motion';

export default function Card({ children, className = '', hoverable = true }: { children: React.ReactNode; className?: string; hoverable?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`glass p-6 rounded-lg border border-accent border-opacity-20 ${hoverable ? 'hover-lift' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}
