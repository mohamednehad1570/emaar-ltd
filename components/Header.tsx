'use client';

/**
 * components/Header.tsx
 *
 * Fixed site header.
 * Desktop  — white bg → frosted-glass on scroll (Framer Motion); red active
 *             underline; phone number; WhatsApp icon; language toggle; CTA.
 * Mobile   — logo + burger; full-screen slide-in overlay (from right, or left
 *             in RTL); accordion sub-menus; Request Quote pinned at bottom.
 *
 * Design rules (CLAUDE.md):
 *   • No blue — all text uses brand-dark / text-text-heading / text-text-body
 *   • Warm shadows only — rgba(45,41,38,x)
 *   • Cairo font inherited from body
 *   • 44 px+ touch targets everywhere
 *   • RTL-aware throughout
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  List     as MenuIcon,
  X,
  Phone,
  WhatsappLogo,
  ArrowRight,
  CaretDown,
  CaretRight,
} from '@phosphor-icons/react';
import Image    from 'next/image';
import Link     from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

/** Discriminated union keeps TypeScript happy without @ts-ignore hacks. */
type DropItem =
  | { type: 'header'; en: string; ar: string }
  | { type?: never; en: string; ar: string; href: string };

interface NavItem {
  en: string;
  ar: string;
  href: string;
  dropdown?: DropItem[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const PHONE_DISPLAY = '+971 50 123 4567';
const PHONE_HREF    = 'tel:+971501234567';
const WA_HREF       = 'https://wa.me/971501234567';

const NAV: NavItem[] = [
  { en: 'Home',           ar: 'الرئيسية',     href: '/'        },
  {
    en: 'Solutions', ar: 'الحلول', href: '/solutions',
    dropdown: [
      { type: 'header', en: 'By Sector',            ar: 'حسب القطاع'      },
      { en: 'Residential',      ar: 'القطاع السكني',  href: '/solutions/residential' },
      { en: 'Commercial',       ar: 'القطاع التجاري', href: '/solutions/commercial'  },
      { type: 'header', en: 'By Material',           ar: 'حسب المادة'      },
      { en: 'uPVC Systems',     ar: 'أنظمة uPVC',         href: '/products/upvc'     },
      { en: 'Aluminum Systems', ar: 'أنظمة الألومنيوم',href: '/products/aluminum' },
    ],
  },
  { en: 'Projects',      ar: 'المشاريع',     href: '/projects' },
  { en: 'Technical Hub', ar: 'المركز التقني', href: '/tech'     },
  { en: 'About Us',      ar: 'من نحن',        href: '/about'    },
  { en: 'Contact',       ar: 'اتصل بنا',      href: '/contact'  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns true when the current pathname lives inside a nav item's subtree.
 * Home is exact-match only so every other page doesn't inherit it.
 */
function isActive(
  pathname: string,
  href: string,
  dropdown?: DropItem[],
): boolean {
  if (href === '/') return pathname === '/';
  if (pathname.startsWith(href)) return true;
  if (!dropdown) return false;
  return dropdown.some(d => {
    if (d.type === 'header') return false;
    return pathname.startsWith(d.href);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function Header() {
  const { language, toggleLanguage, isRTL } = useLanguage();
  const pathname = usePathname();

  /* Drives the Framer Motion scroll-glass transition */
  const [isScrolled, setIsScrolled] = useState(false);

  /* Which desktop dropdown is open (keyed by English label) */
  const [openDrop, setOpenDrop] = useState<string | null>(null);

  /* Mobile overlay visibility */
  const [menuOpen, setMenuOpen] = useState(false);

  /* Which mobile accordion section is expanded */
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  /* Close overlay whenever the route changes */
  useEffect(() => {
    setMenuOpen(false);
    setExpandedMobile(null);
  }, [pathname]);

  /* Passive scroll listener — only toggles a boolean for performance */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll(); // run immediately so non-top pages start in scrolled state
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close desktop dropdown when clicking outside its subtree */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('[data-nav-drop]')) {
        setOpenDrop(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* Prevent body scroll while mobile overlay is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /** Returns the localised string for en/ar items. */
  const t = (item: { en: string; ar: string }): string => item[language];

  /** Closes mobile menu and resets accordion state. */
  const closeMenu = () => {
    setMenuOpen(false);
    setExpandedMobile(null);
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER BAR
          Framer Motion animates background + shadow on scroll.
          backdrop-blur is toggled via CSS class (FM can't animate that prop).
      ═══════════════════════════════════════════════════════════════════ */}
      <motion.header
        initial={{
          backgroundColor: 'rgba(255,255,255,1)',
          boxShadow: '0 0px 0px rgba(45,41,38,0)',
        }}
        animate={{
          backgroundColor: isScrolled
            ? 'rgba(255,255,255,0.95)'
            : 'rgba(255,255,255,1)',
          /* warm shadow — never rgba(0,0,0,x) */
          boxShadow: isScrolled
            ? '0 4px 20px rgba(45,41,38,0.10)'
            : '0 0px 0px rgba(45,41,38,0)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 ${isScrolled ? 'backdrop-blur-md' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* ─── Logo ──────────────────────────────────────────────────── */}
            <Link
              href="/"
              className="flex items-center gap-3 group shrink-0"
              aria-label="Emaar International — home"
            >
              {/* Icon box */}
              <div className="
                w-10 h-10 rounded-xl overflow-hidden bg-brand-dark flex items-center justify-center
                shadow-[0_2px_8px_rgba(45,41,38,0.15)]
                group-hover:shadow-[0_4px_16px_rgba(231,76,60,0.25)]
                transition-shadow duration-300
              ">
                <Image
                  src="/logo.svg"
                  alt=""
                  aria-hidden="true"
                  width={40}
                  height={40}
                  className="w-7 h-7 object-contain brightness-0 invert"
                  priority
                />
              </div>

              {/* Wordmark */}
              <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
                <span className="font-extrabold text-xl tracking-tight leading-none text-brand-dark">
                  {language === 'en' ? 'EMAAR' : 'إعمار'}
                </span>
                <span className="text-[10px] font-medium tracking-widest uppercase text-text-muted">
                  {language === 'en' ? 'International Industry' : 'الدولية للصناعة'}
                </span>
              </div>
            </Link>

            {/* ─── Desktop navigation ────────────────────────────────────── */}
            <nav
              className="hidden lg:flex items-center gap-0.5"
              aria-label="Primary navigation"
            >
              {NAV.map((item) => {
                const active = isActive(pathname, item.href, item.dropdown);
                const isOpen = openDrop === item.en;

                return (
                  <div
                    key={item.en}
                    className="relative"
                    data-nav-drop=""
                    onMouseEnter={() => item.dropdown && setOpenDrop(item.en)}
                    onMouseLeave={() => setOpenDrop(null)}
                  >
                    {/* Nav link / trigger */}
                    <Link
                      href={item.href}
                      className={`
                        relative flex items-center gap-1 px-3.5 py-2 text-sm font-semibold
                        rounded-lg transition-colors duration-200 group/link
                        ${active
                          ? 'text-brand-red'
                          : 'text-text-heading hover:text-brand-red'}
                      `}
                    >
                      {t(item)}

                      {item.dropdown && (
                        <CaretDown
                          size={13}
                          weight="bold"
                          className={`
                            shrink-0 transition-transform duration-200
                            ${isOpen ? 'rotate-180' : ''}
                          `}
                        />
                      )}

                      {/* Red underline — always visible when active, slides in on hover */}
                      <span
                        className={`
                          absolute bottom-0 h-0.5 rounded-full bg-brand-red
                          transition-transform duration-200
                          ${isRTL
                            ? 'right-3.5 left-3.5 origin-right'
                            : 'left-3.5 right-3.5 origin-left'}
                          ${active
                            ? 'scale-x-100'
                            : 'scale-x-0 group-hover/link:scale-x-100'}
                        `}
                      />
                    </Link>

                    {/* Dropdown panel */}
                    <AnimatePresence>
                      {item.dropdown && isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          className={`
                            absolute top-[calc(100%+8px)]
                            ${isRTL ? 'right-0' : 'left-0'}
                            w-60 bg-white rounded-xl border border-border-light
                            shadow-[0_10px_40px_rgba(45,41,38,0.12)] p-2
                          `}
                        >
                          {item.dropdown.map((d, i) =>
                            d.type === 'header' ? (
                              /* Section heading */
                              <p
                                key={i}
                                className="px-3 pt-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-text-muted"
                              >
                                {t(d)}
                              </p>
                            ) : (
                              /* Dropdown link */
                              <Link
                                key={i}
                                href={d.href}
                                className="
                                  group/dd flex items-center justify-between
                                  px-3 py-2.5 rounded-lg text-sm text-text-body
                                  hover:bg-cream hover:text-brand-red
                                  transition-all duration-150
                                "
                              >
                                <span>{t(d)}</span>
                                <CaretRight
                                  size={14}
                                  className={`
                                    opacity-0 group-hover/dd:opacity-100
                                    transition-opacity
                                    ${isRTL ? 'rotate-180' : ''}
                                  `}
                                />
                              </Link>
                            )
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* ─── Desktop actions ───────────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">

              {/* Phone number — xl+ only, avoids cramping on 1024–1280 px */}
              <a
                href={PHONE_HREF}
                className="
                  hidden xl:flex items-center gap-1.5 px-2 py-2 rounded-lg
                  text-sm font-medium text-text-body
                  hover:text-brand-red hover:bg-cream
                  transition-colors duration-200
                "
              >
                <Phone size={15} weight="fill" className="text-brand-red shrink-0" />
                {/* dir=ltr so the number stays left-to-right in Arabic mode */}
                <span dir="ltr" className="tabular-nums">{PHONE_DISPLAY}</span>
              </a>

              {/* WhatsApp icon */}
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center justify-center w-9 h-9 rounded-full
                  text-whatsapp hover:bg-whatsapp/10
                  transition-colors duration-200
                "
                aria-label="Chat on WhatsApp"
              >
                <WhatsappLogo size={20} weight="fill" />
              </a>

              {/* Visual divider */}
              <span className="w-px h-5 bg-border-light" aria-hidden="true" />

              {/* Language toggle */}
              <button
                onClick={toggleLanguage}
                className="
                  px-3.5 py-1.5 rounded-full text-xs font-bold
                  bg-cream text-text-heading hover:bg-border-light
                  transition-colors duration-200
                "
                aria-label={
                  language === 'en' ? 'Switch to Arabic' : 'Switch to English'
                }
              >
                {language === 'en' ? 'AR' : 'EN'}
              </button>

              {/* Request Quote CTA */}
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="
                    flex items-center gap-1.5 px-5 py-2.5 rounded-full
                    text-sm font-bold text-white
                    bg-brand-red hover:bg-brand-red-dark
                    shadow-[0_4px_15px_rgba(231,76,60,0.25)]
                    hover:shadow-[0_6px_24px_rgba(231,76,60,0.35)]
                    transition-all duration-200
                  "
                >
                  {language === 'en' ? 'Request Quote' : 'اطلب عرضاً'}
                  <ArrowRight
                    size={15}
                    weight="bold"
                    className={isRTL ? 'rotate-180' : ''}
                  />
                </Link>
              </motion.div>
            </div>

            {/* ─── Mobile / tablet header actions ───────────────────────── */}
            <div className="flex lg:hidden items-center gap-1.5 shrink-0">

              {/* Language toggle */}
              <button
                onClick={toggleLanguage}
                className="
                  flex items-center justify-center px-3 h-11 rounded-full
                  text-xs font-bold bg-cream text-text-heading
                  hover:bg-border-light transition-colors duration-200
                "
                aria-label={
                  language === 'en' ? 'Switch to Arabic' : 'Switch to English'
                }
              >
                {language === 'en' ? 'AR' : 'EN'}
              </button>

              {/* Burger */}
              <button
                onClick={() => setMenuOpen(true)}
                className="
                  flex items-center justify-center w-11 h-11 rounded-xl
                  text-text-heading hover:bg-cream
                  transition-colors duration-200
                "
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
              >
                <MenuIcon size={24} />
              </button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE FULL-SCREEN OVERLAY
          Slides in from the right (left in RTL) using Framer Motion.
          "Request Quote" is always visible at the bottom — not scrolled away.
      ═══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dim scrim */}
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-brand-dark/50 backdrop-blur-sm z-[60] lg:hidden"
              aria-hidden="true"
              onClick={closeMenu}
            />

            {/* Slide-in panel — full viewport width & height */}
            <motion.nav
              key="panel"
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              dir={isRTL ? 'rtl' : 'ltr'}
              initial={{ x: isRTL ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '-100%' : '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className={`
                fixed top-0 ${isRTL ? 'left-0' : 'right-0'}
                w-full h-full bg-white z-[70] lg:hidden
                flex flex-col
              `}
            >

              {/* Panel top bar — mirrors header height */}
              <div className="
                flex items-center justify-between
                px-5 h-20 border-b border-border-light shrink-0
              ">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="flex items-center gap-2.5"
                  aria-label="Emaar International — home"
                >
                  <div className="
                    w-9 h-9 rounded-xl overflow-hidden bg-brand-dark
                    flex items-center justify-center
                  ">
                    <Image
                      src="/logo.svg"
                      alt=""
                      aria-hidden="true"
                      width={36}
                      height={36}
                      className="w-6 h-6 object-contain brightness-0 invert"
                    />
                  </div>
                  <span className="font-extrabold text-lg text-brand-dark">
                    {language === 'en' ? 'EMAAR' : 'إعمار'}
                  </span>
                </Link>

                <button
                  onClick={closeMenu}
                  className="
                    flex items-center justify-center w-11 h-11 rounded-xl
                    text-text-muted hover:bg-cream hover:text-text-heading
                    transition-colors duration-200
                  "
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Scrollable nav list */}
              <div className="flex-1 overflow-y-auto px-4 py-3">
                {NAV.map((item) => {
                  const active   = isActive(pathname, item.href, item.dropdown);
                  const expanded = expandedMobile === item.en;

                  return (
                    <div key={item.en} className="mb-1">
                      {item.dropdown ? (
                        /* Expandable item — tap header to open accordion */
                        <>
                          <button
                            onClick={() =>
                              setExpandedMobile(expanded ? null : item.en)
                            }
                            className={`
                              w-full flex items-center justify-between
                              px-4 py-3 min-h-[52px] rounded-xl
                              text-base font-semibold transition-colors duration-200
                              ${active
                                ? 'text-brand-red bg-cream'
                                : 'text-text-heading hover:bg-cream'}
                            `}
                          >
                            <span>{t(item)}</span>
                            <CaretDown
                              size={16}
                              weight="bold"
                              className={`
                                shrink-0 transition-transform duration-300
                                ${expanded
                                  ? 'rotate-180 text-brand-red'
                                  : 'text-text-muted'}
                              `}
                            />
                          </button>

                          {/* Accordion body */}
                          <AnimatePresence>
                            {expanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                                className="overflow-hidden"
                              >
                                <div
                                  className={`
                                    py-1
                                    ${isRTL
                                      ? 'pr-4 mr-4 border-r-2'
                                      : 'pl-4 ml-4 border-l-2'}
                                  `}
                                  /* Subtle red accent line — warm, not harsh */
                                  style={{ borderColor: 'rgba(231,76,60,0.2)' }}
                                >
                                  {item.dropdown.map((d, i) =>
                                    d.type === 'header' ? (
                                      <p
                                        key={i}
                                        className="
                                          px-3 pt-3 pb-1
                                          text-[11px] font-bold uppercase
                                          tracking-wider text-text-muted
                                        "
                                      >
                                        {t(d)}
                                      </p>
                                    ) : (
                                      <Link
                                        key={i}
                                        href={d.href}
                                        onClick={closeMenu}
                                        className={`
                                          flex items-center gap-2.5
                                          px-3 py-3 min-h-[48px] rounded-lg
                                          text-sm font-medium
                                          transition-colors duration-150
                                          ${pathname === d.href
                                            ? 'text-brand-red'
                                            : 'text-text-body hover:text-brand-red hover:bg-cream'}
                                        `}
                                      >
                                        <CaretRight
                                          size={13}
                                          className={`
                                            text-text-muted shrink-0
                                            ${isRTL ? 'rotate-180' : ''}
                                          `}
                                        />
                                        {t(d)}
                                      </Link>
                                    )
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        /* Plain nav link */
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className={`
                            flex items-center
                            px-4 py-3 min-h-[52px] rounded-xl
                            text-base font-semibold
                            transition-colors duration-200
                            ${active
                              ? 'text-brand-red bg-cream'
                              : 'text-text-heading hover:bg-cream'}
                          `}
                        >
                          {t(item)}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* ── Pinned bottom bar ──────────────────────────────────────
                  Always visible — never scrolls off screen.
                  Request Quote is the primary action; phone and WA secondary.
              ────────────────────────────────────────────────────────── */}
              <div className="
                shrink-0 border-t border-border-light
                bg-off-white px-5 py-5 space-y-3
              ">
                {/* Primary CTA */}
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="
                    flex items-center justify-center gap-2
                    w-full min-h-[52px] rounded-full
                    text-base font-bold text-white
                    bg-brand-red hover:bg-brand-red-dark
                    shadow-[0_4px_15px_rgba(231,76,60,0.25)]
                    transition-all duration-200
                  "
                >
                  {language === 'en' ? 'Request Quote' : 'اطلب عرضاً'}
                  <ArrowRight
                    size={18}
                    weight="bold"
                    className={isRTL ? 'rotate-180' : ''}
                  />
                </Link>

                {/* Secondary: phone + WhatsApp */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={PHONE_HREF}
                    className="
                      flex items-center justify-center gap-2
                      min-h-[48px] rounded-full
                      border border-border-medium bg-white
                      text-sm font-semibold text-text-heading
                      hover:bg-cream transition-colors duration-200
                    "
                  >
                    <Phone size={16} weight="fill" className="text-brand-red shrink-0" />
                    {language === 'en' ? 'Call Us' : 'اتصل بنا'}
                  </a>
                  <a
                    href={WA_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex items-center justify-center gap-2
                      min-h-[48px] rounded-full
                      border border-whatsapp/40 bg-white
                      text-sm font-semibold text-whatsapp
                      hover:bg-whatsapp/5 transition-colors duration-200
                    "
                  >
                    <WhatsappLogo size={16} weight="fill" className="shrink-0" />
                    WhatsApp
                  </a>
                </div>
              </div>

            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
