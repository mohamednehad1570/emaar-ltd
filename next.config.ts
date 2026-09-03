import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Sanity CDN — used for all CMS-hosted images and files
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },

  // ── Legacy product URL redirects ─────────────────────────────────────────
  // Old 3-level URLs (/products/{material}/{legacy-slug}) redirect to the
  // material page. The negative-lookahead excludes valid L3 category slugs so
  // they are NOT caught and reach their own Next.js route handler.
  async redirects() {
    return [
      {
        // stained-glass and sandblast moved to /products/glass — redirect old uPVC URLs
        source:      '/products/upvc/:slug((?!(?:windows|doors|doors-and-windows|staircases|hebeschibe)$)[^/]+)',
        destination: '/products/upvc',
        permanent:   true,
      },
      {
        // stained-glass and sandblast moved to /products/glass — redirect old aluminum URLs
        source:      '/products/aluminum/:slug((?!(?:windows|doors|doors-and-windows|staircases|skylights|pergola|frameless-doors|security-system|handrails|acp-panels)$)[^/]+)',
        destination: '/products/aluminum',
        permanent:   true,
      },
      {
        // Guard unknown glass category slugs — redirect to material landing page
        source:      '/products/glass/:slug((?!(?:double-glazing|stained-glass|sandblast|georgian-bar)$)[^/]+)',
        destination: '/products/glass',
        permanent:   true,
      },
    ];
  },
};

export default nextConfig;
