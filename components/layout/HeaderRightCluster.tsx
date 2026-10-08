'use client';

/**
 * components/layout/HeaderRightCluster.tsx
 *
 * Physical-right controls (never mirrored):
 *   ≥1280      EN|ع · WhatsApp icon + label · Request Quote
 *   1024–1279  EN|ع · WhatsApp icon         · Request Quote
 *   768–1023   EN|ع · WhatsApp icon  (burger is rendered by Header)
 *   <768       nothing — mobile bar is logo + burger only
 * Request Quote is the header exception to the WhatsApp-CTA rule: it goes to /contact.
 */

import { motion } from 'framer-motion';
import { ArrowRight, WhatsappLogo } from '@phosphor-icons/react';
import { cn } from '@/lib/cn';
import Button from '@/components/ui/Button';
import LangToggle from './LangToggle';
import NavLabel from './NavLabel';

const QUOTE = { en: 'Request Quote', ar: 'اطلب عرضاً' };
const WA_LABEL = { en: 'Chat on WhatsApp', ar: 'تواصل عبر واتساب' };

interface Props {
  language: 'en' | 'ar';
  waHref: string;
  onDark: boolean;
}

export default function HeaderRightCluster({ language, waHref, onDark }: Props) {
  return (
    <div className="hidden md:flex items-center gap-2 xl:gap-3">
      <LangToggle onDark={onDark} />

      <motion.a
        href={waHref} target="_blank" rel="noopener noreferrer" aria-label={WA_LABEL[language]}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className={cn(
          'flex items-center justify-center gap-2 min-w-11 min-h-11 text-sm font-semibold',
          onDark ? 'text-white' : 'text-ink-heading',
        )}
      >
        <WhatsappLogo size={22} weight="fill" className="text-whatsapp" aria-hidden="true" />
        {/* Label only ≥1280; 1024–1279 is icon-only to fit the tighter bar */}
        <span className="hidden xl:inline" aria-hidden="true">WhatsApp</span>
      </motion.a>

      <div className="hidden lg:block">
        {/* sm keeps the 1024px bar compact; min-h-11 restores the 44px touch target */}
        <Button variant="primary" size="sm" href="/contact" className="min-h-11" icon={<ArrowRight size={13} weight="bold" />}>
          <NavLabel label={QUOTE} language={language} />
        </Button>
      </div>
    </div>
  );
}
