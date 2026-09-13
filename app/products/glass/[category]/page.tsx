/**
 * app/products/glass/[category]/page.tsx
 * Permanent redirect → /products/glass#[category]
 */

import { redirect } from 'next/navigation'

const GLASS_CATEGORIES = [
  'stained-glass',
  'sandblast',
  'double-glazing',
  'georgian-bar',
] as const

export function generateStaticParams() {
  return GLASS_CATEGORIES.map((category) => ({ category }))
}

type Params = Promise<{ category: string }>

export default async function Page({ params }: { params: Params }) {
  const { category } = await params
  redirect(`/products/glass#${category}`)
}
