import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No images.remotePatterns — every photo is served locally from /public/images

  // ── Legacy product URL redirects ─────────────────────────────────────────
  // Material pages moved to /upvc and /aluminum; glass and accessories became
  // sections (later tabs) on the material pages. `:path*` also matches the bare
  // path, so each rule covers both the old landing page and any old sub-URL.
  // /products/:slug is now the shared type route — only the three old material
  // segments are redirected, and the catalog validator reserves those slugs.
  async redirects() {
    return [
      { source: '/products',                 destination: '/',                 permanent: true },
      { source: '/products/upvc/:path*',     destination: '/upvc',             permanent: true },
      { source: '/products/aluminum/:path*', destination: '/aluminum',         permanent: true },
      { source: '/products/glass/:path*',    destination: '/upvc#glass',       permanent: true },
      { source: '/accessories/:path*',       destination: '/upvc#accessories', permanent: true },
    ];
  },
};

export default nextConfig;
