/**
 * app/products/upvc/[category]/page.tsx
 *
 * Permanent redirect → /products/upvc#[category]
 * The material page now handles all categories via the accordion carousel.
 * HTTP 301 transfers SEO equity to the canonical material page URL.
 */

import { redirect } from 'next/navigation'

// Keep generateStaticParams so Next.js pre-renders the redirect
// at build time rather than hitting a 404 during SSG.
const UPVC_CATEGORIES = [
  'windows',
  'doors',
  'doors-and-windows',
  'staircases',
  'hebeschibe',
  'stained-glass',
  'sandblast',
] as const

export function generateStaticParams() {
  return UPVC_CATEGORIES.map((category) => ({ category }))
}

type Params = Promise<{ category: string }>

export default async function Page({ params }: { params: Params }) {
  const { category } = await params
  // 308 Permanent Redirect — Next.js redirect() defaults to 307 in dev,
  // 308 in production; both preserve the GET method correctly.
  redirect(`/products/upvc#${category}`)
}
