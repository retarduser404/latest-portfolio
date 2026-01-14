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
    formats: ["image/avif", "image/webp"],
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
          // Content-Security-Policy (balanced for Next.js + Security)
          // - Allows Next.js chunks and Framer Motion inline styles (necessary for framework)
          // - unsafe-eval needed for React development runtime
          // - Restricts external scripts to Google Analytics only
          // - Blocks framing, object execution, and external form submissions
          // - Includes WebSocket for DevTools hot reload in development
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googletagmanager.com *.google-analytics.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com data:; img-src 'self' data: https: *.google-analytics.com *.googletagmanager.com; connect-src 'self' formspree.io *.vercel.com *.google-analytics.com *.googletagmanager.com ws: wss:; frame-ancestors 'none'; form-action 'self'; base-uri 'self'; object-src 'none'",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
          {
            key: "X-Permitted-Cross-Domain-Policies",
            value: "none",
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
  poweredByHeader: false,
};

export default nextConfig;
