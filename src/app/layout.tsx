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
    "Delhi",
  ],
  authors: [{ name: "Kartik Pathak", url: "https://kartikpathak.dev" }],
  creator: "Kartik Pathak",
  
  // URL Configuration
  metadataBase: new URL("https://kartikpathak.dev"),
  
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  
  // Open Graph (Social Media)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kartikpathak.dev",
    title: "Kartik Pathak | Full Stack Developer",
    description: "Building elegant solutions with React, Node.js, Python, and AI.",
    siteName: "Kartik Pathak Portfolio",
    images: [
      {
        url: "https://kartikpathak.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kartik Pathak - Full Stack Developer Portfolio",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Kartik Pathak | Full Stack Developer",
    description: "Full Stack Developer specializing in React, Node.js, Python, and Generative AI",
    images: ["https://kartikpathak.dev/og-image.png"],
  },

  // Sitemap and canonical
  alternates: {
    canonical: "https://kartikpathak.dev",
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
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Kartik Pathak",
              "url": "https://kartikpathak.dev",
              "image": "https://kartikpathak.dev/og-image.png",
              "jobTitle": "Full Stack Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Self-employed"
              },
              "sameAs": [
                "https://github.com/retarduser404",
                "https://www.linkedin.com/in/kartik-pathak-379959269/"
              ],
              "email": "kartikpathak883@gmail.com",
              "knowsAbout": [
                "React",
                "Next.js",
                "Node.js",
                "TypeScript",
                "Python",
                "Web Development",
                "Full Stack Development"
              ]
            })
          }}
        />
      </head>
      <body>
        <a href="#main" className="sr-only skip-link fixed left-4 top-4 bg-accent text-primary px-3 py-2 rounded z-50">
          Skip to main
        </a>
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
