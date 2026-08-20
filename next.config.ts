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
  // Old 3-level URLs (/products/{material}/{slug}) redirect permanently to
  // doors-and-windows as the most common catch-all. Visitors who bookmarked
  // a specific old URL still land on a valid page rather than a 404.
  async redirects() {
    return [
      {
        source:      '/products/upvc/:slug',
        destination: '/products/upvc/doors-and-windows/:slug',
        permanent:   true, // 308 — signals search engines to update their index
      },
      {
        source:      '/products/aluminum/:slug',
        destination: '/products/aluminum/doors-and-windows/:slug',
        permanent:   true,
      },
    ];
  },
};

export default nextConfig;
