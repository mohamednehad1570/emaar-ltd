/**
 * app/aluminum/page.tsx
 * aluminum material landing — static server route; data comes from lib/data/catalog.
 */

import type { Metadata } from 'next';
import MaterialPage from '@/components/catalog/material/MaterialPage';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { materialPageProps } from '@/lib/catalogPageData';

export const metadata: Metadata = generatePageMetadata({
  title: 'Aluminum Windows, Doors & Facades',
  description: 'Emaar International aluminum systems — sliding and hinged windows and doors, curtain wall, cladding, skylights, pergolas, handrails and security systems.',
  path: '/aluminum',
});

export default function Page() {
  return <MaterialPage {...materialPageProps('aluminum')} />;
}
