'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi';

export default function BlogPostPage() {
  return (
    <main className="min-h-screen bg-primary pt-24 pb-16">
      <article className="max-w-4xl mx-auto container-padding">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition font-semibold"
          >
            <FiArrowLeft size={20} />
            Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-accent mb-4">
            Mangal Chai Café Website: A Complete Walkthrough
          </h1>
          <p className="text-xl text-text-secondary mb-6">
            Building a Real-World React Restaurant Website with Security-First Approach
          </p>
          <div className="flex items-center gap-4 text-text-secondary">
            <span>Mar 20, 2024</span>
            <span>•</span>
            <span>12 min read</span>
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-12 pb-8 border-b border-border"
        >
          {['React', 'Security', 'Deployment', 'Web Development'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm text-text-secondary bg-surface border border-border rounded"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <style>{`
            h2 {
              font-size: 1.875rem;
              font-weight: bold;
              color: #00FF6A;
              margin-top: 2rem;
              margin-bottom: 1rem;
            }
            h3 {
              font-size: 1.5rem;
              font-weight: bold;
              color: #E6EDE9;
              margin-top: 1.5rem;
              margin-bottom: 1rem;
            }
            p {
              color: #E6EDE9;
              line-height: 1.8;
            }
            strong {
              color: #00FF6A;
              font-weight: 600;
            }
            ul, ol {
              color: #E6EDE9;
              padding-left: 1.5rem;
              margin: 1.25rem 0;
            }
            li {
              margin-bottom: 0.5rem;
            }
            code {
              background-color: #0F1513;
              color: #00FF6A;
              padding: 0.25rem 0.5rem;
              border-radius: 0.375rem;
              font-family: 'Fira Code', monospace;
            }
            pre {
              background-color: #0F1513;
              border: 1px solid #1F2A26;
              padding: 1rem;
              border-radius: 0.5rem;
              overflow-x: auto;
              margin: 1.25rem 0;
            }
            pre code {
              background-color: transparent;
              color: #00FF6A;
              padding: 0;
            }
          `}</style>

          <div>
            <h2>Project Overview</h2>
            <p>
              The Mangal Chai website is a modern, mobile-first React application that showcases a cozy local café in Jagatpura, Jaipur. Unlike typical portfolio projects, this is a real-world deliverable built for an actual business. The site features a photo gallery, interactive menu, location maps, and contact information—all without requiring any backend infrastructure.
            </p>

            <p><strong>Key Statistics:</strong></p>
            <ul>
              <li>Built with React 18, Vite, and Tailwind CSS</li>
              <li>21 commits with iterative improvements</li>
              <li>70.9% JavaScript, 15.7% HTML, 13.4% CSS</li>
              <li>Deployed to Vercel with continuous integration</li>
              <li>18 production deployments tracking live updates</li>
            </ul>
          </div>

          <div>
            <h2>Why This Project Matters</h2>
            <p>
              As a BCAFSD student, I was faced with a choice: build another todo app or create something tangible. I chose the latter. This project demonstrates:
            </p>

            <ol>
              <li><strong>Real-world problem solving</strong> – Meeting a café owner's actual needs, not imaginary requirements</li>
              <li><strong>Professional quality code</strong> – Human-written, readable components without AI shortcuts</li>
              <li><strong>Security awareness</strong> – Implementing frontend hardening measures rarely seen in student projects</li>
              <li><strong>Deployment expertise</strong> – From local development to live production on Vercel</li>
            </ol>
          </div>

          <div>
            <h2>Tech Stack Decision</h2>

            <h3>Why React + Vite?</h3>
            <ul>
              <li>React 18 for component-based architecture and reusability</li>
              <li>Vite as the build tool for lightning-fast development (instant HMR)</li>
              <li>No TypeScript initially—focusing on JavaScript fundamentals and clean code practices</li>
            </ul>

            <h3>Why Tailwind CSS?</h3>
            <ul>
              <li>Utility-first approach allows rapid UI development</li>
              <li>Built-in responsive design system (mobile-first mindset)</li>
              <li>Massive file size reduction with PurgeCSS (optimized output: ~18KB)</li>
              <li>Easy customization for brand colors and design consistency</li>
            </ul>

            <h3>Why Lucide Icons?</h3>
            <ul>
              <li>Lightweight SVG icon library</li>
              <li>0 HTTP requests—icons embedded directly in bundle</li>
              <li>Perfect for restaurant UX (menu icons, location markers, social links)</li>
            </ul>
          </div>

          <div>
            <h2>Project Architecture</h2>
            <p>The codebase follows a clean component structure:</p>

            <pre><code>{`src/
├── components/          # Reusable React components
│   ├── Header.jsx       # Sticky navigation with mobile menu
│   ├── Hero.jsx         # Eye-catching hero section with CTAs
│   ├── Menu.jsx         # Menu items organized by category
│   ├── Gallery.jsx      # Photo gallery with hover effects
│   ├── About.jsx        # Café story and unique features
│   ├── Location.jsx     # Google Maps, hours, contact info
│   ├── ImageLightbox.jsx # Image zoom/lightbox functionality
│   └── Footer.jsx       # Footer with social links
├── utils/
│   └── sanitization.js  # Security utilities for input validation
├── App.jsx              # Main component orchestrating layout
├── App.css              # Global styles
├── index.css            # Tailwind imports + custom CSS
└── main.jsx             # React entry point`}</code></pre>

            <p>
              Each component is self-contained with clear responsibilities. The Header handles navigation, Hero drives user engagement, Menu displays offerings with pricing, and so on. This modular approach makes future updates simple—changing menu items only requires editing <code>Menu.jsx</code>.
            </p>
          </div>

          <div>
            <h2>Mobile-First Responsive Design</h2>
            <p>
              The entire design follows mobile-first principles—designed for small screens first, then enhanced for larger ones.
            </p>

            <p><strong>Breakpoints:</strong></p>
            <ul>
              <li>Mobile: &lt; 640px (phones)</li>
              <li>Tablet: 640px - 1024px (iPads, smaller tablets)</li>
              <li>Desktop: &gt; 1024px (laptops, large monitors)</li>
            </ul>

            <p><strong>Responsive Features:</strong></p>
            <ul>
              <li>Navigation collapses to hamburger menu on mobile</li>
              <li>Grid layouts reflow from 1 column (mobile) to 2 columns (tablet) to 3+ (desktop)</li>
              <li>Touch-friendly buttons with adequate padding</li>
              <li>Font sizes scale appropriately for readability</li>
              <li>Images use responsive widths and heights</li>
            </ul>
          </div>

          <div>
            <h2>Security Hardening – A Developer's Perspective</h2>
            <p>
              This is where this project stands out. While many student projects ignore security, I implemented comprehensive frontend hardening.
            </p>

            <h3>Content Security Policy (CSP)</h3>
            <p>Implemented in <code>index.html</code>, CSP prevents XSS attacks by restricting resource loading:</p>

            <pre><code>{`<meta 
  http-equiv="Content-Security-Policy" 
  content="default-src 'self'; 
           script-src 'self' https://maps.googleapis.com;
           style-src 'self' https://fonts.googleapis.com;
           frame-src https://maps.google.com;
           object-src 'none';
           form-action 'none';
           upgrade-insecure-requests"
>`}</code></pre>

            <h3>Input Sanitization Utilities</h3>
            <p>Created <code>src/utils/sanitization.js</code> with security-focused functions:</p>
            <ul>
              <li><code>sanitizeText()</code> – Removes HTML characters and dangerous protocols</li>
              <li><code>sanitizeUrl()</code> – Validates URLs, prevents localhost access</li>
              <li><code>isValidEmail()</code> – Email format validation</li>
              <li><code>isValidPhone()</code> – Phone number validation</li>
            </ul>
          </div>

          <div>
            <h2>Development Process & Best Practices</h2>

            <h3>Performance Optimization</h3>
            <ul>
              <li><strong>Lazy Loading</strong> – Images load only when visible</li>
              <li><strong>Optimized Tailwind CSS</strong> – Production build is 18KB (vs. 300KB+ with Bootstrap)</li>
              <li><strong>No Unnecessary Libraries</strong> – Only React, React-DOM, and Lucide icons</li>
              <li><strong>Static Site Advantages</strong> – No database queries, zero backend latency</li>
            </ul>

            <h3>Code Quality</h3>
            <ul>
              <li>No TypeScript initially—focus on clean JavaScript</li>
              <li>Functional components with React hooks</li>
              <li>Clear naming conventions (component names are PascalCase)</li>
              <li>Reusable utilities for sanitization and validation</li>
              <li>Comments explaining security decisions</li>
            </ul>
          </div>

          <div>
            <h2>Deployment Journey</h2>
            <p>Deploying to production taught me valuable lessons:</p>

            <h3>Step 1: Local Development</h3>
            <pre><code>{`npm install              # Install dependencies
npm run dev             # Start Vite dev server (port 5173)
npm run build           # Create optimized production build`}</code></pre>

            <h3>Step 2: GitHub Integration</h3>
            <p>Pushed the repository to GitHub—enabling continuous deployment.</p>

            <h3>Step 3: Vercel Deployment</h3>
            <p>Connected the GitHub repository to Vercel. Every push to the main branch automatically:</p>
            <ol>
              <li>Triggers a build</li>
              <li>Runs optimizations</li>
              <li>Deploys to live URL</li>
              <li>Generates preview deployments for branches</li>
            </ol>
          </div>

          <div>
            <h2>Challenges & Solutions</h2>

            <h3>Challenge 1: Mobile Menu Performance</h3>
            <p>
              Initial hamburger menu caused layout shift on mobile. <strong>Solution:</strong> Used CSS transforms instead of display toggles for smoother animations.
            </p>

            <h3>Challenge 2: Image Optimization</h3>
            <p>
              Large gallery images slowed down load times. <strong>Solution:</strong> Switched to Unsplash API with size parameters + lazy loading.
            </p>

            <h3>Challenge 3: CSS Bundle Size</h3>
            <p>
              Initial Tailwind output was 300KB. <strong>Solution:</strong> Proper PurgeCSS configuration reduced it to 18KB in production.
            </p>
          </div>

          <div>
            <h2>Learning Outcomes</h2>
            <p>Building this project reinforced fundamental concepts:</p>

            <ol>
              <li><strong>Component Architecture</strong> – Breaking UI into reusable, maintainable pieces</li>
              <li><strong>Responsive Web Design</strong> – Mobile-first approach ensures accessibility</li>
              <li><strong>Frontend Security</strong> – CSP, sanitization, and security headers aren't optional</li>
              <li><strong>Build Tooling</strong> – Vite's speed improves developer experience significantly</li>
              <li><strong>Deployment Pipelines</strong> – Automated builds and deployments save time and reduce errors</li>
              <li><strong>Real-World Constraints</strong> – Static site limitations but massive reliability gains</li>
            </ol>
          </div>

          <div>
            <h2>Conclusion</h2>
            <p>
              The Mangal Chai website demonstrates that student projects can be both academically rigorous and practically valuable. By focusing on security, performance, and real-world deployment, this project stands apart from typical portfolio work.
            </p>

            <p><strong>Key Takeaways:</strong></p>
            <ul>
              <li>Mobile-first responsive design ensures accessibility</li>
              <li>Frontend security hardening (CSP, sanitization) is non-negotiable</li>
              <li>Vite + React + Tailwind is a powerful modern stack</li>
              <li>Static sites deployed to CDNs are fast, reliable, and affordable</li>
              <li>Real-world projects teach more than tutorials ever could</li>
            </ul>

            <p>
              Whether you're building a restaurant website, portfolio, or SaaS landing page, these principles apply. Start with a clear architecture, prioritize security and performance, and deploy early and often.
            </p>
          </div>
        </motion.div>

        {/* CTA Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col md:flex-row gap-4 mt-12 pt-12 border-t border-border"
        >
          <a
            href="https://mangal-chai-cafe.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/80 transition flex items-center justify-center gap-2"
          >
            Visit Live Website
            <FiExternalLink size={18} />
          </a>

          <a
            href="https://github.com/retarduser404/mangal-chai-cafe"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition flex items-center justify-center gap-2"
          >
            View GitHub Repository
            <FiExternalLink size={18} />
          </a>
        </motion.div>
      </article>
    </main>
  );
}
