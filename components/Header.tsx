'use client';

/**
 * components/Header.tsx
 *
 * Rebuilt 52px header — mega-panel dropdowns on desktop, full-screen
 * accordion overlay on mobile.
 *
 * Desktop anatomy:
 *   Left   — logo mark + EMAAR wordmark (no subtitle line)
 *   Centre — nav, absolutely centred; gap-8 (32px) between items
 *            Hover: 2px brand-red underline scaleX 0→1 from origin-left
 *            Active: underline always visible, text-brand-dark
 *   Right  — language toggle (sharp), WhatsApp icon, Request Quote CTA
 *   Mega   — full-width panel below header, 4-col grid with Phosphor icons
 *            Hover-triggered; 150ms gap prevents flicker on cursor travel
 *
 * Mobile anatomy:
 *   Logo + burger → slide-in overlay → accordion sub-menus → pinned CTA
 *
 * Scroll — Framer Motion animates bg/shadow after 20px; backdrop-blur via class
 * RTL    — underline origin-right, arrows rotate, mega panel dir="rtl" reverses columns
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence , useReducedMotion } from 'framer-motion';
import {
  List        as MenuIcon,
  X,
  WhatsappLogo,
  ArrowRight,
  CaretDown,
  House,
  Buildings,
} from '@phosphor-icons/react';
import Image    from 'next/image';
import Link     from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '@/lib/cn';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type MegaItem = {
  en:   string;
  ar:   string;
  href: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
};

interface NavItem {
  en:    string;
  ar:    string;
  href:  string;
  mega?: MegaItem[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────────────────────────────────────

const WA_HREF = 'https://wa.me/971501234567';

const NAV: NavItem[] = [
  { en: 'Home',           ar: 'الرئيسية',      href: '/'         },
  {
    en: 'Solutions', ar: 'الحلول', href: '',
    mega: [
      { en: 'Residential Solutions', ar: 'الحلول السكنية',  href: '/solutions?type=residential', Icon: House     },
      { en: 'Commercial Solutions',  ar: 'الحلول التجارية', href: '/solutions?type=commercial',  Icon: Buildings },
    ],
  },
  { en: 'Projects',      ar: 'المشاريع',      href: '/projects'  },
  { en: 'Technical Hub', ar: 'المركز التقني',  href: '/tech'      },
  { en: 'About Us',      ar: 'من نحن',         href: '/about'     },
  { en: 'Contact',       ar: 'اتصل بنا',       href: '/contact'   },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function isActive(pathname: string, href: string, mega?: MegaItem[]): boolean {
  if (href === '/') return pathname === '/';
  /* Strip query params before comparison so /solutions?type=X matches /solutions.
     Also guard against empty href — pathname.startsWith('') is always true.   */
  const hrefPath = href.split('?')[0];
  if (hrefPath && pathname.startsWith(hrefPath)) return true;
  return mega?.some(m => pathname.startsWith(m.href.split('?')[0])) ?? false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-component: MegaPanel
// Renders the full-width dropdown panel for nav items with mega data.
// ─────────────────────────────────────────────────────────────────────────────

interface MegaPanelProps {
  items:    MegaItem[];
  language: 'en' | 'ar';
  isRTL:   boolean;
  onEnter: () => void;
  onLeave: () => void;
}

function MegaPanel({ items, language, isRTL, onEnter, onLeave }: MegaPanelProps) {
  const t = (item: { en: string; ar: string }) => item[language];
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      /* Strong expo-out — panel snaps into position immediately, no initial lag */
      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
      className="absolute top-full left-0 right-0 bg-white border-b border-border-light"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* py-8 px-24 per design spec — generous inset for visual breathing room */}
      <div className="max-w-7xl mx-auto py-8 px-24" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="grid grid-cols-2 gap-6">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 text-sm text-text-body hover:text-brand-dark transition-colors duration-150 group/mega"
            >
              {/* Icon box — square, no radius (--radius-button: 0px) */}
              <span className="shrink-0 w-8 h-8 flex items-center justify-center bg-off-white group-hover/mega:bg-cream transition-colors duration-150">
                <item.Icon size={16} className="text-brand-red" />
              </span>
              <span className="font-semibold leading-tight">{t(item)}</span>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export default function Header() {
  const { language, toggleLanguage, isRTL } = useLanguage();
  const pathname = usePathname();

  const [isScrolled,     setIsScrolled]     = useState(false);
  const [openDrop,       setOpenDrop]       = useState<string | null>(null);
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  /* 150ms delay lets the cursor travel from nav link to mega panel without
     triggering a close — fires on both nav-item-leave and panel-leave.     */
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const t = (item: { en: string; ar: string }) => item[language];

  /* ── Passive scroll listener ──────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll(); // run immediately so non-top pages start in scrolled state
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Reset state on route change ─────────────────────────────────────── */
  useEffect(() => {
    setMenuOpen(false);
    setExpandedMobile(null);
    setOpenDrop(null);
  }, [pathname]);

  /* ── Lock body scroll while mobile overlay is open ───────────────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* ── Mega panel hover handlers ──────────────────────────────────────── */

  const openPanel = useCallback((key: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenDrop(key);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimeout.current = setTimeout(() => setOpenDrop(null), 150);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
  }, []);

  const activeMega = NAV.find(n => n.en === openDrop)?.mega ?? null;

  const closeMenu = () => {
    setMenuOpen(false);
    setExpandedMobile(null);
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER BAR — 52px desktop height
      ═══════════════════════════════════════════════════════════════════ */}
      <motion.header
        initial={{
          backgroundColor: 'rgba(255,255,255,1)',
          boxShadow:       '0 0 0 rgba(45,41,38,0)',
          backdropFilter:  'blur(0px)',
        }}
        animate={{
          backgroundColor: isScrolled
            ? 'rgba(255,255,255,0.95)'
            : 'rgba(255,255,255,1)',
          /* warm shadow — never rgba(0,0,0,x) */
          boxShadow: isScrolled
            ? '0 4px 20px rgba(45,41,38,0.08)'
            : '0 0 0 rgba(45,41,38,0)',
          /* Animate blur instead of class-toggling (class toggle snaps in one frame) */
          backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
        }}
        /* Strong custom ease-out — feels snappier than the weak CSS easeOut preset */
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* ── Inner constrained container ────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center h-[52px]">

            {/* ── Logo ─────────────────────────────────────────────── */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 shrink-0 group"
              aria-label="EMAAR International — home"
            >
              {/* Icon box — rounded-sm (brand icon container) */}
              <div className="w-8 h-8 rounded-sm overflow-hidden bg-brand-dark flex items-center justify-center group-hover:shadow-[0_2px_8px_rgba(231,76,60,0.25)] transition-shadow duration-300">
                <Image
                  src="/logo.svg"
                  alt=""
                  aria-hidden="true"
                  width={32}
                  height={32}
                  className="w-5 h-5 object-contain brightness-0 invert"
                  priority
                />
              </div>
              {/* Wordmark only — no subtitle per spec */}
              <span className="font-extrabold text-base tracking-tight leading-none text-brand-dark">
                {language === 'en' ? 'EMAAR' : 'إعمار'}
              </span>
            </Link>

            {/* ── Desktop navigation — absolutely centred ───────────── */}
            <nav
              className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center h-full"
              aria-label="Primary navigation"
            >
              <div className="flex items-center gap-8 h-full">
                {NAV.map((item) => {
                  const active = isActive(pathname, item.href, item.mega);
                  const isOpen = openDrop === item.en;

                  return (
                    <div
                      key={item.en}
                      className="relative h-full flex items-center group/navitem"
                      onMouseEnter={() => {
                        if (item.mega) {
                          openPanel(item.en);
                        } else {
                          /* Hovering a non-mega item closes any open panel */
                          cancelClose();
                          setOpenDrop(null);
                        }
                      }}
                      onMouseLeave={scheduleClose}
                    >
                      {item.mega ? (
                        /* Dropdown-only trigger — no top-level route, hover opens panel */
                        <button
                          type="button"
                          className={cn(
                            'flex items-center gap-1 text-sm font-semibold transition-colors duration-150',
                            active || isOpen
                              ? 'text-brand-dark'
                              : 'text-text-body hover:text-brand-dark',
                          )}
                        >
                          {t(item)}
                          <CaretDown
                            size={12}
                            weight="bold"
                            className={cn(
                              'shrink-0 transition-transform duration-200',
                              isOpen && 'rotate-180',
                            )}
                          />
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            'flex items-center gap-1 text-sm font-semibold transition-colors duration-150',
                            active || isOpen
                              ? 'text-brand-dark'
                              : 'text-text-body hover:text-brand-dark',
                          )}
                        >
                          {t(item)}
                        </Link>
                      )}

                      {/* 2px underline — slides in from reading-start edge.
                          origin-right in RTL so it grows from the correct side. */}
                      <span
                        className={cn(
                          'absolute bottom-0 left-0 right-0 h-[2px] bg-brand-red',
                          'transform transition-transform duration-200',
                          'ease-[cubic-bezier(0.22,1,0.36,1)]',
                          active || isOpen
                            ? 'scale-x-100'
                            : 'scale-x-0 group-hover/navitem:scale-x-100',
                          isRTL ? 'origin-right' : 'origin-left',
                        )}
                        aria-hidden="true"
                      />
                    </div>
                  );
                })}
              </div>
            </nav>

            {/* ── Desktop right actions ─────────────────────────────── */}
            <div className="ml-auto hidden lg:flex items-center gap-3 shrink-0">

              {/* Language toggle — sharp corners, no radius */}
              <button
                onClick={toggleLanguage}
                className="px-3 py-1.5 text-xs font-bold text-text-heading bg-cream hover:bg-border-light transition-colors duration-200"
                aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
              >
                {language === 'en' ? 'ع' : 'EN'}
              </button>

              {/* WhatsApp icon — no phone number visible per spec */}
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 text-text-muted hover:bg-cream transition-colors duration-200"
                aria-label="Chat on WhatsApp"
              >
                <WhatsappLogo size={20} weight="fill" />
              </a>

              {/* Visual divider */}
              <span className="w-px h-4 bg-border-light" aria-hidden="true" />

              {/* Request Quote CTA — 0px radius, 36px height, px-4 */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 px-4 h-9 bg-brand-red hover:bg-brand-red-dark text-white text-sm font-bold transition-colors duration-200"
                >
                  {language === 'en' ? 'Request Quote' : 'اطلب عرضاً'}
                  <ArrowRight size={14} weight="bold" className={isRTL ? 'rotate-180' : ''} />
                </Link>
              </motion.div>
            </div>

            {/* ── Mobile burger ─────────────────────────────────────── */}
            <div className="ml-auto flex lg:hidden items-center shrink-0">
              <button
                onClick={() => setMenuOpen(true)}
                className="flex items-center justify-center w-11 h-11 text-text-heading hover:bg-cream transition-colors duration-200"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
              >
                <MenuIcon size={24} />
              </button>
            </div>

          </div>
        </div>

        {/* ── Mega panel — full-width, outside constrained container ── */}
        <AnimatePresence>
          {openDrop && activeMega && (
            <MegaPanel
              key="mega"
              items={activeMega}
              language={language}
              isRTL={isRTL}
              onEnter={cancelClose}
              onLeave={scheduleClose}
            />
          )}
        </AnimatePresence>

      </motion.header>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE FULL-SCREEN OVERLAY
          Slides in from right (left in RTL). Request Quote pinned at bottom.
      ═══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dim scrim — tap to close */}
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

            {/* Slide-in panel */}
            <motion.nav
              key="panel"
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              dir={isRTL ? 'rtl' : 'ltr'}
              initial={{ x: isRTL ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              /* Close is faster than open — the system responds immediately to dismiss */
              exit={{ x: isRTL ? '-100%' : '100%', transition: { type: 'tween', duration: 0.22, ease: [0.32, 0.72, 0, 1] } }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className={cn(
                'fixed top-0 h-full w-full bg-white z-[70] lg:hidden flex flex-col',
                isRTL ? 'left-0' : 'right-0',
              )}
            >
              {/* ── Panel top bar — mirrors header height ──────────── */}
              <div className="flex items-center justify-between px-5 h-[52px] border-b border-border-light shrink-0">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="inline-flex items-center gap-2"
                  aria-label="EMAAR International — home"
                >
                  <div className="w-7 h-7 rounded-sm overflow-hidden bg-brand-dark flex items-center justify-center">
                    <Image
                      src="/logo.svg"
                      alt=""
                      aria-hidden="true"
                      width={28}
                      height={28}
                      className="w-4 h-4 object-contain brightness-0 invert"
                    />
                  </div>
                  <span className="font-extrabold text-sm text-brand-dark">
                    {language === 'en' ? 'EMAAR' : 'إعمار'}
                  </span>
                </Link>

                <button
                  onClick={closeMenu}
                  className="flex items-center justify-center w-11 h-11 text-text-muted hover:bg-cream hover:text-text-heading transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* ── Scrollable nav list ──────────────────────────────── */}
              <div className="flex-1 overflow-y-auto px-4 py-3">
                {NAV.map((item) => {
                  const active   = isActive(pathname, item.href, item.mega);
                  const expanded = expandedMobile === item.en;

                  return (
                    <div key={item.en} className="mb-1">
                      {item.mega ? (
                        <>
                          {/* Accordion trigger */}
                          <button
                            onClick={() => setExpandedMobile(expanded ? null : item.en)}
                            className={cn(
                              'w-full flex items-center justify-between',
                              'px-4 py-3 min-h-[52px]',
                              'text-base font-semibold transition-colors duration-200',
                              active
                                ? 'text-brand-red bg-cream'
                                : 'text-text-heading hover:bg-cream',
                            )}
                          >
                            <span>{t(item)}</span>
                            <motion.span
                              animate={{ rotate: expanded ? 180 : 0 }}
                              transition={{ duration: 0.25 }}
                            >
                              <CaretDown
                                size={16}
                                weight="bold"
                                className={active ? 'text-brand-red' : 'text-text-muted'}
                              />
                            </motion.span>
                          </button>

                          {/* Accordion body */}
                          <AnimatePresence>
                            {expanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden"
                              >
                                {/* Red accent line — warm, signals sub-nav depth */}
                                <div
                                  className={cn(
                                    'py-1',
                                    isRTL
                                      ? 'pr-4 mr-4 border-r-2'
                                      : 'pl-4 ml-4 border-l-2',
                                  )}
                                  style={{ borderColor: 'rgba(231,76,60,0.2)' }}
                                >
                                  {item.mega.map((sub) => (
                                    <Link
                                      key={sub.href}
                                      href={sub.href}
                                      onClick={closeMenu}
                                      className={cn(
                                        'flex items-center gap-3',
                                        'px-3 py-3 min-h-[48px]',
                                        'text-sm font-medium transition-colors duration-150',
                                        /* Query-param routes can't be checked via pathname alone —
                                           skip sub-item highlighting; parent item is still active. */
                                        !sub.href.includes('?') && pathname.startsWith(sub.href)
                                          ? 'text-brand-red'
                                          : 'text-text-body hover:text-brand-red hover:bg-cream',
                                      )}
                                    >
                                      <sub.Icon size={15} className="text-brand-silver shrink-0" />
                                      {t(sub)}
                                    </Link>
                                  ))}
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
                          className={cn(
                            'flex items-center px-4 py-3 min-h-[52px]',
                            'text-base font-semibold transition-colors duration-200',
                            active
                              ? 'text-brand-red bg-cream'
                              : 'text-text-heading hover:bg-cream',
                          )}
                        >
                          {t(item)}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* ── Pinned bottom bar ─────────────────────────────────
                  Always visible; Request Quote is the primary action.    */}
              <div className="shrink-0 border-t border-border-light bg-off-white px-5 py-4">
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 w-full min-h-[52px] bg-brand-red hover:bg-brand-red-dark text-white text-base font-bold transition-colors duration-200"
                >
                  {language === 'en' ? 'Request Quote' : 'اطلب عرضاً'}
                  <ArrowRight
                    size={18}
                    weight="bold"
                    className={isRTL ? 'rotate-180' : ''}
                  />
                </Link>
              </div>

            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
