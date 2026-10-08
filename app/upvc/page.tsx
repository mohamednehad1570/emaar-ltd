/**
 * app/upvc/page.tsx
 * upvc material landing — static server route; data comes from lib/data/catalog.
 */

import type { Metadata } from 'next';
import MaterialPageBare from '@/components/catalog/MaterialPageBare';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { materialPageProps } from '@/lib/catalogPageData';

export const metadata: Metadata = generatePageMetadata({
  title: 'uPVC Windows & Doors',
  description: 'Emaar International uPVC window and door systems — sliding, casement, tilt & turn, Hebeschiebe lift & slide and more, with glass and hardware options.',
  path: '/upvc',
});

export default function Page() {
  return <MaterialPageBare {...materialPageProps('upvc')} />;
}
