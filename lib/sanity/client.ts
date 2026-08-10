import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION!

// Read-only client for server components — CDN-cached
export const publicClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

// Write client — server-only, token never exposed to browser
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

// ISR-aware fetch — tagged for on-demand revalidation via /api/revalidate
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  return publicClient.fetch<T>(query, params, {
    next: { tags: ['sanity'] },
  })
}
