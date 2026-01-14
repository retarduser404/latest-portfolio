# 🔧 Code Examples - Critical Fixes

Copy-paste ready code for your 5 most critical fixes.

---

## 1️⃣ Fix next.config.ts (Security Headers)

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.vercel.com",
      },
      {
        protocol: "https",
        hostname: "**.github.com",
      },
    ],
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
  },

  // Security & Performance headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Security Headers
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' formspree.io *.vercel.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' formspree.io *.vercel.com",
          },
          // Performance Headers
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
          },
          {
            key: "X-UA-Compatible",
            value: "IE=edge",
          },
        ],
      },
    ];
  },

  compress: true,
  reactStrictMode: true,
  poweredByHeader: false, // Don't reveal tech stack
};

export default nextConfig;
```

---

## 2️⃣ Update Layout.tsx (OG Tags & SEO)

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  // Basic SEO
  title: "Kartik Pathak | Full Stack Developer & AI Specialist",
  description: "Full Stack Developer specializing in React, Node.js, Python, and Generative AI. Building scalable web applications with expertise in modern web technologies.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Node.js",
    "Python",
    "TypeScript",
    "Next.js",
    "Web Development",
    "AI/ML",
    "E-commerce",
    "Delhi",
  ],
  authors: [{ name: "Kartik Pathak", url: "https://kartikpathak.dev" }],
  creator: "Kartik Pathak",
  
  // URL Configuration
  metadataBase: new URL("https://kartikpathak.dev"), // ← UPDATE WITH YOUR DOMAIN
  alternates: {
    canonical: "https://kartikpathak.dev",
  },

  // Open Graph (Social Media)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kartikpathak.dev",
    siteName: "Kartik Pathak Portfolio",
    title: "Kartik Pathak | Full Stack Developer",
    description: "Building elegant solutions with React, Node.js, Python, and AI",
    images: [
      {
        url: "https://kartikpathak.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kartik Pathak - Full Stack Developer Portfolio",
        type: "image/png",
      },
      {
        url: "https://kartikpathak.dev/og-square.png",
        width: 800,
        height: 800,
        alt: "Kartik Pathak - Full Stack Developer",
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Kartik Pathak | Full Stack Developer",
    description: "Full Stack Developer specializing in React, Node.js, Python, and Generative AI",
    images: ["https://kartikpathak.dev/og-image.png"],
    creator: "@KartikDevelops", // ← ADD YOUR TWITTER HANDLE
    site: "@KartikDevelops",
  },

  // Robots & Sitemap
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // Verification
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE", // ← Get from Google Search Console
  },

  // Additional
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Kartik Pathak Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external services */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        {/* Skip to main content link (accessibility) */}
        <a 
          href="#main" 
          className="sr-only skip-link fixed left-4 top-4 bg-yellow-400 text-black px-3 py-2 rounded z-50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Skip to main content
        </a>
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
```

---

## 3️⃣ Fix Navbar.tsx (Accessibility)

```tsx
// src/components/Navbar.tsx
'use client';

import { useState } from 'react';
import useActiveSection from '@/hooks/useActiveSection';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const active = useActiveSection();

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full bg-black z-50 border-b-2 border-yellow-400"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container-padding max-w-7xl mx-auto flex items-center justify-between h-20">
        {/* Logo */}
        <Link 
          href="#home" 
          className="text-2xl font-bold text-yellow-400 hover:text-yellow-300 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 rounded px-2 py-1"
          aria-label="Kartik Pathak - Back to home"
        >
          KP
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => {
            const id = item.href.replace('#', '');
            const isActive = active === id;
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                aria-label={`Navigate to ${item.label} section`}
                className={`text-sm font-semibold transition relative focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 rounded px-2 py-1 ${
                  isActive 
                    ? 'text-yellow-400' 
                    : 'text-gray-300 hover:text-yellow-400'
                }`}
              >
                {item.label}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400"></div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="md:hidden text-yellow-400 hover:text-yellow-300 text-2xl transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 rounded p-1"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black border-t-2 border-yellow-400"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="container-padding py-4 flex flex-col gap-4">
            {menuItems.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = active === id;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 rounded px-2 py-1 ${
                    isActive 
                      ? 'text-yellow-400' 
                      : 'text-gray-300 hover:text-yellow-400'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
```

---

## 4️⃣ Fix Hero Button (Accessibility)

```tsx
// src/components/Hero.tsx - Button section only

{/* CTA Buttons */}
<motion.div
  variants={itemVariants}
  className="flex flex-col sm:flex-row gap-4 justify-center"
>
  <a
    href="#projects"
    aria-label="View my projects and work samples"
    className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 text-center"
  >
    VIEW MY WORK
  </a>
  <a
    href="#contact"
    aria-label="Get in touch - Open contact form"
    className="px-8 py-3 border-2 border-yellow-400 text-yellow-400 font-bold rounded-full hover:bg-yellow-400 hover:text-black transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 text-center flex items-center justify-center gap-2"
  >
    GET IN TOUCH
    <FiArrowRight />
  </a>
</motion.div>
```

---

## 5️⃣ Add Focus Styles to globals.css

```css
/* src/app/globals.css - Add this section */

/* ============================================
   KEYBOARD NAVIGATION & FOCUS STYLES
   ============================================ */

/* Remove default outline and add custom */
*:focus {
  outline: none;
}

/* All interactive elements get focus style */
button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid #fbbf24;
  outline-offset: 2px;
  border-radius: 2px;
}

/* Skip link (always visible for accessibility) */
.skip-link:focus {
  position: static !important;
  height: auto !important;
  width: auto !important;
  overflow: visible !important;
  clip: auto !important;
  white-space: normal !important;
  z-index: 999;
}

/* Better form focus styles */
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.25);
  border-color: #fbbf24;
}

/* Link focus */
a:focus-visible {
  border-radius: 2px;
}

/* Button focus */
button:focus-visible {
  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.25);
}

/* High contrast mode support */
@media (prefers-contrast: more) {
  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  textarea:focus-visible {
    outline-width: 3px;
    outline-offset: 3px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}

/* High contrast mode for color blind users */
@media (prefers-color-scheme: dark) {
  /* Already dark mode, but ensure sufficient contrast */
  body {
    color: #e5e7eb; /* Ensure 4.5:1 contrast minimum */
  }
}
```

---

## 6️⃣ Update Projects.tsx (Remove Placeholder Links)

```tsx
// src/components/Projects.tsx

const projects = [
  {
    id: 1,
    title: 'Email Automation Platform',
    description: 'Python-based email automation system processing 10K+ emails/day with smart scheduling, template management, and real-time analytics. Reduced manual email work by 95%.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'Celery'],
    github: 'https://github.com/kartikpathak/email-automation-platform',
    demo: 'https://email-automation-demo.vercel.app',
    year: 2024,
    status: 'Production',
  },
  {
    id: 2,
    title: 'E-commerce Store Platform',
    description: 'Full-stack e-commerce platform built with Next.js and Node.js. Features product catalog, shopping cart, secure Stripe checkout, order tracking, and admin dashboard.',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    github: 'https://github.com/kartikpathak/ecommerce-platform',
    demo: 'https://ecommerce-platform-demo.vercel.app',
    year: 2024,
    status: 'Production',
  },
  {
    id: 3,
    title: 'AI Chat Assistant',
    description: 'Intelligent chatbot powered by OpenAI GPT-4 with context awareness, RAG capabilities, and persistent conversations. Used by 500+ users with 4.8/5 satisfaction.',
    tech: ['React', 'Node.js', 'OpenAI API', 'MongoDB', 'Socket.io'],
    github: 'https://github.com/kartikpathak/ai-chat-assistant',
    demo: 'https://ai-chat-assistant.vercel.app',
    year: 2024,
    status: 'Production',
  },
];

// Update the render section too:
{projects.map((project) => (
  <motion.div key={project.id} variants={itemVariants} className="...">
    {/* ... existing code ... */}
    
    {/* Links section - UPDATE THIS */}
    <div className="flex gap-3 mt-4">
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.title} source code on GitHub`}
        className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 text-sm transition"
      >
        <FiGithub /> Code
      </a>
      <a
        href={project.demo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.title} live demo`}
        className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 text-sm transition"
      >
        <FiExternalLink /> Demo
      </a>
    </div>
  </motion.div>
))}
```

---

## 📋 Implementation Order

1. **First:** Update next.config.ts (security)
2. **Second:** Update layout.tsx (SEO)
3. **Third:** Update Navbar.tsx (accessibility)
4. **Fourth:** Add focus styles to globals.css (accessibility)
5. **Fifth:** Update Hero button (accessibility)
6. **Sixth:** Update Projects (content)

**Total Time:** ~2-3 hours  
**Testing:** Run `npm run build` after each section

---

## ✅ Verification

After implementing these changes:

```bash
# Check for TypeScript errors
npm run build

# Check for linting issues  
npm run lint

# Test locally
npm run dev

# Run Lighthouse audit
# Open DevTools → Lighthouse tab → Analyze page load
```

Expected improvements:
- ✅ No security warnings
- ✅ All links clickable and functional
- ✅ Tab navigation works smoothly
- ✅ Focus indicators visible
- ✅ Lighthouse SEO: 95+
- ✅ Lighthouse Accessibility: 95+

---

**You've got this! 🚀**
