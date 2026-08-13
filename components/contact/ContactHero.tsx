'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/contexts/LanguageContext';
import { fadeUp } from '@/lib/motion';
import Container from '@/components/layout/Container';

/** Hero heading and response-time note for the contact page. */
export default function ContactHero() {
  const l = useTranslation();

  return (
    <section className="pt-32 pb-12 bg-surface-white">
      <Container className="max-w-xl text-center">
        {/* ── Heading ───────────────────────────────────────────── */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <h1
            className="font-extrabold text-ink-heading leading-[0.95] tracking-[-0.02em] mb-4 text-balance"
            style={{ fontSize: 'clamp(2.75rem, 5vw, 5rem)' }}
          >
            {l('Get in Touch', 'تواصل معنا')}
          </h1>
          <p className="text-ink-muted text-base">
            {l(
              'We typically respond within 2 hours during business hours.',
              'نرد عادةً خلال ساعتين في أوقات العمل.',
            )}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
