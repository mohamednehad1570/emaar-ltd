'use client';

/** Eyebrow / title / subtitle block shared by the homepage featured sections. */

import { motion } from 'framer-motion';
import { useTranslation } from '@/contexts/LanguageContext';
import { fadeUp, viewportOnce } from '@/lib/motion';
import type { Bilingual } from '@/lib/data/homeFeatured';

interface FeaturedHeadingProps {
  /** id the parent <section> points aria-labelledby at */
  id: string;
  eyebrow: Bilingual;
  title: Bilingual;
  subtitle: Bilingual;
}

export default function FeaturedHeading({ id, eyebrow, title, subtitle }: FeaturedHeadingProps) {
  const t = useTranslation();

  return (
    // text-start replaces the old isRTL left/right switch — follows dir automatically
    <motion.div
      className="mb-12 text-start"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-brand-red">
        {t(eyebrow.en, eyebrow.ar)}
      </p>
      <h2 id={id} className="mb-3 text-4xl font-bold text-ink-heading md:text-5xl">
        {t(title.en, title.ar)}
      </h2>
      <p className="max-w-lg text-lg text-ink-body">{t(subtitle.en, subtitle.ar)}</p>
    </motion.div>
  );
}
