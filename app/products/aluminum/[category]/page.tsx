/**
 * app/products/aluminum/[category]/page.tsx
 * Permanent redirect → /products/aluminum#[category]
 */

import { redirect } from 'next/navigation'

const ALUMINUM_CATEGORIES = [
  'windows',
  'doors',
  'doors-and-windows',
  'staircases',
  'skylights',
  'pergola',
  'frameless-doors',
  'security-system',
  'handrails',
  'acp-panels',
  'stained-glass',
  'sandblast',
] as const

export function generateStaticParams() {
  return ALUMINUM_CATEGORIES.map((category) => ({ category }))
}

type Params = Promise<{ category: string }>

export default async function Page({ params }: { params: Params }) {
  const { category } = await params
  redirect(`/products/aluminum#${category}`)
}
