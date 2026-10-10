import type { NextConfig } from "next";

// ── Legacy product URL redirects ─────────────────────────────────────────────
// Material pages moved to /upvc and /aluminum; glass and accessories became
// tabs on the material pages. `:path*` also matches the bare path, so each rule
// covers both the old landing page and any old sub-URL. /products/:slug is now
// the shared type route — only the three old material segments are redirected,
// and the catalog validator reserves those slugs.
const LEGACY: { source: string; destination: string }[] = [
  { source: '/products',                 destination: '/'                 },
  { source: '/products/upvc/:path*',     destination: '/upvc'             },
  { source: '/products/aluminum/:path*', destination: '/aluminum'         },
  { source: '/products/glass/:path*',    destination: '/upvc#glass'       },
  { source: '/accessories/:path*',       destination: '/upvc#accessories' },
];

const nextConfig: NextConfig = {
  // No images.remotePatterns — every photo is served locally from /public/images

  // app/global-not-found.tsx: the localized, server-rendered 404 (see that file for why)
  experimental: { globalNotFound: true },

  // Redirects run before proxy.ts. Each legacy rule exists twice: the unprefixed
  // (English) URL, and its /ar twin landing on the Arabic page (/ar/upvc#glass).
  // '/' becomes the bare '/ar' — never '/ar/' (that would cost an extra hop).
  async redirects() {
    return LEGACY.flatMap(({ source, destination }) => [
      { source, destination, permanent: true },
      {
        source: `/ar${source}`,
        destination: destination === '/' ? '/ar' : `/ar${destination}`,
        permanent: true,
      },
    ]);
  },
};

export default nextConfig;
