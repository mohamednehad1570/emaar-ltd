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
        // $-anchor prevents "doors" prefix from matching "doors-and-windows"
        source:      '/products/upvc/:slug((?!(?:windows|doors|doors-and-windows|staircases|stained-glass|sandblast|hebeschibe)$)[^/]+)',
        destination: '/products/upvc',
        permanent:   true,
      },
      {
        // $-anchor prevents "doors" prefix from matching "doors-and-windows"
        source:      '/products/aluminum/:slug((?!(?:windows|doors|doors-and-windows|staircases|skylights|stained-glass|sandblast)$)[^/]+)',
        destination: '/products/aluminum',
        permanent:   true,
      },
    ];
  },
};

export default nextConfig;
