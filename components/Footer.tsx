'use client';

/**
 * components/Footer.tsx
 *
 * Site footer.
 * Desktop  — white bg, thin silver gradient top line, 4-column grid:
 *             Brand | Products | Company | Contact.
 *             Column headers: dark silver, uppercase, wide tracking.
 * Mobile   — Brand section always visible; Products / Company / Contact
 *             collapse to animated accordions.
 * Red "Request Quote" link pinned at the bottom of the Contact column.
 *
 * Design rules (CLAUDE.md):
 *   • No blue — all text uses brand-dark / text-text-heading / text-text-body
 *   • Warm shadows: rgba(45,41,38,x)  — never rgba(0,0,0,x)
 *   • Cairo font inherited from body
 *   • RTL-aware throughout
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  TwitterLogo,
  Envelope,
  Phone,
  MapPin,
  WhatsappLogo,
  ArrowRight,
  CaretDown,
} from '@phosphor-icons/react';
import Image from 'next/image';
import Link  from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface FooterLink {
  en:   string;
  ar:   string;
  href: string;
}

interface Column {
  id:    string;
  en:    string; // column header label
  ar:    string;
  links: FooterLink[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────────────────────────────────────

const COLUMNS: Column[] = [
  {
    id: 'products',
    en: 'Products',
    ar: 'المنتجات',
    links: [
      { en: 'uPVC Windows & Doors',  ar: 'نوافذ وأبواب uPVC',      href: '/products/upvc'            },
      { en: 'Aluminum Systems',      ar: 'أنظمة الألومنيوم',        href: '/products/aluminum'        },
      { en: 'Residential',           ar: 'القطاع السكني',            href: '/solutions/residential'    },
      { en: 'Commercial',            ar: 'القطاع التجاري',           href: '/solutions/commercial'     },
      { en: 'Technical Hub',         ar: 'المركز التقني',            href: '/tech'                     },
    ],
  },
  {
    id: 'company',
    en: 'Company',
    ar: 'الشركة',
    links: [
      { en: 'About Us',  ar: 'من نحن',           href: '/about'    },
      { en: 'Projects',  ar: 'المشاريع',         href: '/projects' },
      { en: 'Careers',   ar: 'الوظائف',          href: '/careers'  },
      { en: 'Services',  ar: 'الخدمات',          href: '/services' },
      { en: 'FAQ',       ar: 'الأسئلة الشائعة',  href: '/faq'      },
    ],
  },
];

const SOCIAL = [
  { Icon: FacebookLogo,  label: 'Facebook',    href: '#' },
  { Icon: InstagramLogo, label: 'Instagram',   href: '#' },
  { Icon: LinkedinLogo,  label: 'LinkedIn',    href: '#' },
  { Icon: TwitterLogo,   label: 'X (Twitter)', href: '#' },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Shared sub-components
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Dark-silver uppercase column header used on both desktop and mobile.
 * The distinct treatment (muted, uppercase, widest tracking) communicates
 * "this is a section label, not a nav item".
 */
function ColHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-silver-dark mb-5 select-none">
      {children}
    </h3>
  );
}

/**
 * Renders a single list of footer links — used for Products & Company columns.
 * Each item is a plain text link; hover shifts it to brand-red.
 */
function LinksList({
  links,
  language,
}: {
  links: FooterLink[];
  language: 'en' | 'ar';
}) {
  return (
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.href + link.en}>
          <Link
            href={link.href}
            className="text-sm text-text-body hover:text-brand-red transition-colors duration-200"
          >
            {link[language]}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * Contact column content — email, phone, address, WhatsApp, and the red
 * "Request Quote" CTA. Shared between desktop column and mobile accordion.
 */
function ContactBlock({
  language,
  isRTL,
}: {
  language: 'en' | 'ar';
  isRTL: boolean;
}) {
  const l = (en: string, ar: string) => (language === 'en' ? en : ar);

  return (
    <ul className="space-y-3.5">
      {/* Email */}
      <li>
        <a
          href="mailto:info@emaar-international.ae"
          className="flex items-start gap-2.5 text-sm text-text-body hover:text-brand-red transition-colors duration-200 group"
        >
          <Envelope
            size={15}
            className="text-brand-silver-dark shrink-0 mt-0.5 group-hover:text-brand-red transition-colors duration-200"
          />
          <span>info@emaar-international.ae</span>
        </a>
      </li>

      {/* Phone — dir=ltr keeps the number left-to-right in Arabic mode */}
      <li>
        <a
          href="tel:+971501234567"
          className="flex items-start gap-2.5 text-sm text-text-body hover:text-brand-red transition-colors duration-200 group"
          dir="ltr"
        >
          <Phone
            size={15}
            className="text-brand-silver-dark shrink-0 mt-0.5 group-hover:text-brand-red transition-colors duration-200"
          />
          <span className="tabular-nums">+971 50 123 4567</span>
        </a>
      </li>

      {/* Address */}
      <li className="flex items-start gap-2.5 text-sm text-text-body">
        <MapPin
          size={15}
          className="text-brand-silver-dark shrink-0 mt-0.5"
        />
        <span>{l('Dubai Industrial City, UAE', 'مدينة دبي الصناعية، الإمارات')}</span>
      </li>

      {/* WhatsApp */}
      <li>
        <a
          href="https://wa.me/971501234567"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-2.5 text-sm text-text-body hover:text-whatsapp transition-colors duration-200 group"
        >
          <WhatsappLogo
            size={15}
            weight="fill"
            className="text-whatsapp shrink-0 mt-0.5"
          />
          <span>{l('Chat on WhatsApp', 'تواصل عبر واتساب')}</span>
        </a>
      </li>

      {/* Request Quote — the red CTA link */}
      <li className="pt-1.5">
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-red hover:text-brand-red-dark transition-colors duration-200"
        >
          {l('Request a Quote', 'اطلب عرضاً')}
          {/* Arrow points left (←) in RTL — achieved with rotate-180 */}
          <ArrowRight
            size={14}
            weight="bold"
            className={`shrink-0 ${isRTL ? 'rotate-180' : ''}`}
          />
        </Link>
      </li>
    </ul>
  );
}

/**
 * Mobile-only accordion section.
 * Each instance manages its own open/closed state so multiple can be open.
 */
function MobileAccordion({
  title,
  isRTL,
  children,
}: {
  title: string;
  isRTL: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border-light last:border-b-0">
      {/* Accordion trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 min-h-[52px] text-left"
        aria-expanded={open}
      >
        <ColHeader>{title}</ColHeader>
        <CaretDown
          size={16}
          className={`
            text-text-muted shrink-0 transition-transform duration-250
            ${open ? 'rotate-180' : ''}
            /* Override ColHeader's mb-5 — button baseline aligns it */
          `}
          style={{ marginBottom: 0 }} /* cancel ColHeader margin inside button */
        />
      </button>

      {/* Animated body */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export default function Footer() {
  const { language, isRTL } = useLanguage();

  const l = (en: string, ar: string) => (language === 'en' ? en : ar);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Top silver accent line ──────────────────────────────────────────
          Fades in from both sides to avoid a harsh edge on wide viewports. */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-silver to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">

        {/* ════════════════════════════════════════════════════════════════
            DESKTOP LAYOUT  — 4-column grid, hidden on < lg
        ════════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-12 mb-12">

          {/* ── Column 1: Brand ───────────────────────────────────────── */}
          <div className="space-y-6">
            {/* Logo + wordmark */}
            <Link
              href="/"
              className="inline-flex items-center gap-3 group"
              aria-label="Emaar International — home"
            >
              <div className="
                w-11 h-11 rounded-sm overflow-hidden bg-brand-dark flex items-center justify-center
                shadow-[0_2px_8px_rgba(45,41,38,0.15)]
                group-hover:shadow-[0_4px_16px_rgba(231,76,60,0.22)]
                transition-shadow duration-300
              ">
                <Image
                  src="/logo.svg"
                  alt=""
                  aria-hidden="true"
                  width={44}
                  height={44}
                  className="w-7 h-7 object-contain brightness-0 invert"
                />
              </div>
              <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
                <span className="font-extrabold text-xl tracking-tight leading-none text-brand-dark">
                  {l('EMAAR', 'إعمار')}
                </span>
                <span className="text-[10px] font-medium tracking-widest uppercase text-text-muted mt-0.5">
                  {l('International Industry', 'الدولية للصناعة')}
                </span>
              </div>
            </Link>

            {/* Brand tagline */}
            <p className="text-sm text-text-body leading-relaxed max-w-[220px]">
              {l(
                'Crafting excellence in uPVC and aluminium windows, doors & facades across the UAE.',
                'نصنع التميز في نوافذ وأبواب وواجهات uPVC والألومنيوم في الإمارات.',
              )}
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {SOCIAL.map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.92 }}
                  className="
                    w-9 h-9 rounded-none flex items-center justify-center
                    border border-border-light text-text-muted
                    hover:text-brand-red hover:border-brand-red/30
                    transition-colors duration-200
                  "
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── Column 2: Products ────────────────────────────────────── */}
          <div>
            <ColHeader>{l('Products', 'المنتجات')}</ColHeader>
            <LinksList links={COLUMNS[0].links} language={language} />
          </div>

          {/* ── Column 3: Company ─────────────────────────────────────── */}
          <div>
            <ColHeader>{l('Company', 'الشركة')}</ColHeader>
            <LinksList links={COLUMNS[1].links} language={language} />
          </div>

          {/* ── Column 4: Contact ─────────────────────────────────────── */}
          <div>
            <ColHeader>{l('Contact', 'التواصل')}</ColHeader>
            <ContactBlock language={language} isRTL={isRTL} />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            MOBILE LAYOUT  — stacked brand + accordions, visible on < lg
        ════════════════════════════════════════════════════════════════ */}
        <div className="lg:hidden mb-8">

          {/* Brand — always visible at the top */}
          <div className="flex flex-col gap-5 pb-8 mb-2 border-b border-border-light">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
              aria-label="Emaar International — home"
            >
              <div className="w-10 h-10 rounded-sm overflow-hidden bg-brand-dark flex items-center justify-center shadow-[0_2px_8px_rgba(45,41,38,0.12)]">
                <Image
                  src="/logo.svg"
                  alt=""
                  aria-hidden="true"
                  width={40}
                  height={40}
                  className="w-6 h-6 object-contain brightness-0 invert"
                />
              </div>
              <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
                <span className="font-extrabold text-lg tracking-tight leading-none text-brand-dark">
                  {l('EMAAR', 'إعمار')}
                </span>
                <span className="text-[10px] font-medium tracking-widest uppercase text-text-muted mt-0.5">
                  {l('International Industry', 'الدولية للصناعة')}
                </span>
              </div>
            </Link>

            <p className="text-sm text-text-body leading-relaxed max-w-sm">
              {l(
                'Crafting excellence in uPVC and aluminium windows, doors & facades across the UAE.',
                'نصنع التميز في نوافذ وأبواب وواجهات uPVC والألومنيوم في الإمارات.',
              )}
            </p>

            <div className="flex gap-2.5">
              {SOCIAL.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="
                    w-10 h-10 rounded-none flex items-center justify-center
                    border border-border-light text-text-muted
                    hover:text-brand-red hover:border-brand-red/30
                    transition-colors duration-200
                  "
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Products accordion */}
          <MobileAccordion title={l('Products', 'المنتجات')} isRTL={isRTL}>
            <LinksList links={COLUMNS[0].links} language={language} />
          </MobileAccordion>

          {/* Company accordion */}
          <MobileAccordion title={l('Company', 'الشركة')} isRTL={isRTL}>
            <LinksList links={COLUMNS[1].links} language={language} />
          </MobileAccordion>

          {/* Contact accordion */}
          <MobileAccordion title={l('Contact', 'التواصل')} isRTL={isRTL}>
            <ContactBlock language={language} isRTL={isRTL} />
          </MobileAccordion>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            COPYRIGHT BAR  — shared by both breakpoints
        ════════════════════════════════════════════════════════════════ */}
        <div className="
          pt-6 border-t border-border-light
          flex flex-col sm:flex-row items-center justify-between gap-4
        ">
          <p className="text-xs text-text-muted text-center sm:text-start">
            {l(
              `© ${year} EMAAR International Industry LLC. All rights reserved.`,
              `© ${year} إعمار الدولية للصناعة ذ.م.م. جميع الحقوق محفوظة.`,
            )}
          </p>

          {/* Badge strip — purely decorative, no links */}
          <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-silver-dark select-none">
            <span>UAE</span>
            <span className="w-px h-3 bg-border-medium" aria-hidden="true" />
            <span>Est. {year}</span>
            <span className="w-px h-3 bg-border-medium" aria-hidden="true" />
            <span>{l('ISO Certified', 'معتمد ISO')}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
