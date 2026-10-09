'use client';

/**
 * components/layout/footer/FooterBrand.tsx
 * Logo, tagline, and social icon row. Shared between desktop Column 1 and the
 * mobile brand header. Desktop uses framer-motion hover lift; mobile uses plain <a>.
 */

import Link from 'next/link';
import { motion } from 'framer-motion';
import EmaarLogo from '@/components/ui/EmaarLogo';
import { useTranslation } from '@/contexts/LanguageContext';
import { SOCIAL } from './footerLinks';

interface FooterBrandProps {
  /** true → 40×40 mobile social icons with plain <a>; false → 36×36 with framer hover */
  mobile?: boolean;
}

export default function FooterBrand({ mobile = false }: FooterBrandProps) {
  const l = useTranslation();

  const tagline = l(
    'Crafting excellence in uPVC and aluminium windows, doors & facades across the UAE.',
    'نصنع التميز في نوافذ وأبواب وواجهات uPVC والألومنيوم في الإمارات.',
  );

  return (
    <div className="space-y-6">
      {/* ── Logo ────────────────────────────────────────────── */}
      {/* size=40 is quieter than the 52px header mark — fitting the footer's lower visual weight */}
      <Link href="/" className="inline-flex" aria-label="Emaar International Industry — home">
        <EmaarLogo textSize="sm" />
      </Link>

      {/* ── Tagline ─────────────────────────────────────────── */}
      {/* Desktop column is narrower (220px); mobile has more room (max-w-sm) */}
      <p className={`text-sm text-text-body leading-relaxed ${mobile ? 'max-w-sm' : 'max-w-[220px]'}`}>{tagline}</p>

      {/* ── Social icons ────────────────────────────────────── */}
      <div className="flex gap-2.5">
        {SOCIAL.map(({ Icon, label, href }) =>
          mobile ? (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="w-10 h-10 rounded-none flex items-center justify-center border border-border-light text-text-muted hover:text-brand-red hover:border-brand-red/30 transition-colors duration-200">
              <Icon size={18} />
            </a>
          ) : (
            <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              whileHover={{ y: -3 }} whileTap={{ scale: 0.92 }}
              className="w-9 h-9 rounded-none flex items-center justify-center border border-border-light text-text-muted hover:text-brand-red hover:border-brand-red/30 transition-colors duration-200">
              <Icon size={17} />
            </motion.a>
          ),
        )}
      </div>
    </div>
  );
}
