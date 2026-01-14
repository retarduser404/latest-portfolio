'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiGithub } from 'react-icons/fi';
import SectionHeading from './ui/SectionHeading';
import Card from './ui/Card';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors for field on change
    setErrors((prev) => ({ ...prev, [name]: '' }));
    // If user edits after successful submit, clear success
    if (submitted) setSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // basic validation
    const newErrors: { [k: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
      } else {
        setErrors({ submit: data.error || 'There was an error sending your message. Please try again later.' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'There was an error sending your message. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-spacing container-padding relative overflow-hidden bg-primary">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.04 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent rounded-full filter blur-3xl opacity-5"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent rounded-full filter blur-3xl opacity-5"></div>
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
            <h2 className="text-4xl md:text-5xl font-bold text-accent mb-4">GET IN TOUCH</h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-accent to-transparent"
            ></motion.div>
          </div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="border border-border rounded-lg p-8 md:p-12 bg-surface max-w-2xl mx-auto relative overflow-hidden"
            noValidate
            aria-label="Contact form"
          >
            {/* Animated form border glow */}
            <motion.div
              className="absolute inset-0 rounded-lg border border-accent pointer-events-none"
              initial={{ boxShadow: '0 0 0px rgba(251, 191, 36, 0)' }}
              animate={{ boxShadow: '0 0 20px rgba(251, 191, 36, 0.2)' }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            />

            <div className="relative z-10 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <label htmlFor="name" className="block text-sm font-bold text-accent mb-2">
                  NAME <span aria-label="required">*</span>
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className="w-full bg-primary border border-border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 transition\"
                  placeholder="Your name"
                  whileFocus={{ scale: 1.01 }}
                />
                {errors.name && <motion.p id="name-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm mt-2" role="alert">{errors.name}</motion.p>}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                viewport={{ once: true }}
              >
                <label htmlFor="email" className="block text-sm font-bold text-accent mb-2">
                  EMAIL <span aria-label="required">*</span>
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="w-full bg-primary border border-border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 transition"
                  placeholder="your@email.com"
                  whileFocus={{ scale: 1.01 }}
                />
                {errors.email && <motion.p id="email-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm mt-2" role="alert">{errors.email}</motion.p>}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <label htmlFor="message" className="block text-sm font-bold text-accent mb-2">
                  MESSAGE <span aria-label="required">*</span>
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-describedby={errors.message ? "message-error" : undefined}
                  rows={6}
                  className="w-full bg-primary border border-border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 transition resize-none\"
                  placeholder="Tell me about your project or just say hi!"
                  whileFocus={{ scale: 1.01 }}
                ></motion.textarea>
                {errors.message && <motion.p id="message-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm mt-2" role="alert">{errors.message}</motion.p>}
              </motion.div>

              {/* Submit Button with enhanced animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                viewport={{ once: true }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(251, 191, 36, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full px-8 py-3 bg-accent text-primary font-bold rounded-full transition flex items-center justify-center gap-2 relative overflow-hidden"
                  disabled={loading}
                  aria-busy={loading}
                  aria-label={loading ? "Submitting your message..." : "Send message"}
                >
                  {/* Animated background shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                    style={{ opacity: 0.2 }}
                  />
                  <span className="relative flex items-center gap-2">
                    <motion.span animate={{ rotate: loading ? 360 : 0 }} transition={{ duration: 1, repeat: Infinity }}>
                      ✈️
                    </motion.span>
                    {loading ? 'Sending…' : submitted ? '✓ Message Sent!' : 'SEND MESSAGE'}
                  </span>
                </motion.button>
              </motion.div>

              {errors.submit && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm text-center">{errors.submit}</motion.p>}
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}

