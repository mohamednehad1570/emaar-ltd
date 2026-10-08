'use client';

/**
 * components/catalog/MaterialPageBare.tsx
 *
 * Bare material landing (/upvc, /aluminum) — Batch 2 scaffold. Real catalog data,
 * minimal layout; the full design lands in Batches 4–5. Client-only because the
 * site language lives in LanguageContext (localStorage), not in the URL.
 */

import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/layout/Container';
import ProductDetailCTA from '@/components/products/ProductDetailCTA';
import { useTranslation } from '@/contexts/LanguageContext';
import { CATALOG_PAGE_COPY as COPY } from '@/lib/data/uiStrings';
import type { GlassOption, Material } from '@/lib/data/catalog';
import MaterialOptionsBare from './MaterialOptionsBare';
import type { AccessoryRow, TypeGroupList } from './types';

interface MaterialPageBareProps {
  material: Material;
  groups: TypeGroupList[];
  glass: GlassOption[];
  accessories: AccessoryRow[];
}

export default function MaterialPageBare({ material, groups, glass, accessories }: MaterialPageBareProps) {
  const t = useTranslation();

  return (
    <>
      <PageHeader
        eyebrow={t(COPY.materialEyebrow.en, COPY.materialEyebrow.ar)}
        title={material.name.en}
        titleAr={material.name.ar}
        description={material.pitch.en}
        descriptionAr={material.pitch.ar}
      />

      {/* ── Product types by group ──────────────────────────── */}
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g) => (
            <section key={g.id} aria-labelledby={`group-${g.id}`}>
              <h2 id={`group-${g.id}`} className="text-xl font-bold text-ink-heading mb-3">
                {t(g.label.en, g.label.ar)}
              </h2>
              <ul className="space-y-1">
                {g.types.map((ty) => (
                  <li key={ty.slug}>
                    {/* min-h-11 = 44px touch target on the bare list */}
                    <Link
                      href={`/products/${ty.slug}`}
                      className="inline-flex min-h-11 items-center text-ink-body hover:text-brand-red"
                    >
                      {t(ty.name.en, ty.name.ar)}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Container>

      <MaterialOptionsBare glass={glass} accessories={accessories} />

      <ProductDetailCTA />
    </>
  );
}
