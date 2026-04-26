'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Phone, MessageCircle, ChevronDown, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const { language, toggleLanguage, isRTL } = useLanguage();
  const { scrollY } = useScroll();

  // Scrolled state for conditional styling
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      // If home page, use scroll logic. Otherwise force scrolled state.
      if (pathname === '/') {
        setIsScrolled(window.scrollY > 20);
      } else {
        setIsScrolled(true);
      }
    };

    // Initial check
    updateScroll();

    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, [pathname]);

  const isHome = pathname === '/';

  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(229, 229, 229, 0)', 'rgba(229, 229, 229, 0.95)']
  );

  const headerBackdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(12px)']
  );

  const headerShadow = useTransform(
    scrollY,
    [0, 100],
    ['none', '0 4px 20px rgba(0, 0, 0, 0.1)']
  );

  const navTextColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 1)', 'rgba(44, 62, 80, 1)']
  );

  // Forced styles for non-home pages
  const staticBg = 'rgba(229, 229, 229, 0.95)';
  const staticBlur = 'blur(12px)';
  const staticShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
  const staticText = 'rgba(44, 62, 80, 1)';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('[data-dropdown]')) {
        return;
      }
      setActiveDropdown(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navItems = [
    { en: 'Home', ar: 'الرئيسية', href: '/' },
    {
      en: 'Solutions',
      ar: 'الحلول',
      href: '/solutions',
      dropdown: [
        { type: 'header', en: 'By Sector', ar: 'حسب القطاع' },
        { en: 'Residential', ar: 'القطاع السكني', href: '/solutions/residential' },
        { en: 'Commercial', ar: 'القطاع التجاري', href: '/solutions/commercial' },
        { type: 'header', en: 'By Material', ar: 'حسب المادة' },
        { en: 'uPVC Systems', ar: 'أنظمة uPVC', href: '/products/upvc' },
        { en: 'Aluminum Systems', ar: 'أنظمة الألومنيوم', href: '/products/aluminum' },
      ]
    },
    { en: 'Projects', ar: 'المشاريع', href: '/projects' },
    { en: 'Technical Hub', ar: 'المركز التقني', href: '/tech' }, // Added Technical Hub
    { en: 'About Us', ar: 'من نحن', href: '/about' },
    { en: 'Contact', ar: 'اتصل بنا', href: '/contact' },
  ];

  return (
    <>
      <motion.header
        key={`header-${language}`}
        style={{
          backgroundColor: isHome ? headerBackground : staticBg,
          backdropFilter: isHome ? headerBackdropBlur : staticBlur,
          boxShadow: isHome ? headerShadow : staticShadow,
        }}
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group relative z-10">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded-xl bg-gradient-to-br from-brand-dark to-[#1a1a1a] shadow-lg group-hover:shadow-red-500/20 transition-all duration-300">
                <div className="absolute inset-0 bg-brand-red opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="w-full h-full flex items-center justify-center p-2">
                  <Image
                    src="/logo.svg"
                    alt="Emaar"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain brightness-0 invert"
                  />
                </div>
              </div>
              <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
                <motion.span
                  style={{ color: isScrolled ? 'var(--brand-dark)' : '#FFFFFF' }}
                  className="font-bold text-lg sm:text-xl tracking-tight leading-none"
                >
                  {language === 'en' ? 'EMAAR' : 'إعمار'}
                </motion.span>
                <motion.span
                  style={{ color: isScrolled ? 'var(--brand-gray)' : 'rgba(255,255,255,0.8)' }}
                  className="text-[10px] sm:text-xs font-medium tracking-wider uppercase"
                >
                  {language === 'en' ? 'International Industry LLC' : 'الدولية للصناعة ش.ذ.م.م'}
                </motion.span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  className="relative group/nav"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.en)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="relative px-3 py-2 text-sm font-medium transition-colors duration-300 flex items-center gap-1"
                  >
                    <motion.span style={{ color: isHome ? navTextColor : staticText }}>
                      {item[language]}
                    </motion.span>
                    {item.dropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === item.en ? 'rotate-180' : ''}`}
                        style={{ color: isScrolled ? 'var(--brand-dark)' : '#FFFFFF' }}
                      />
                    )}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-red group-hover/nav:w-full transition-all duration-300 ease-out" />
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.en && (
                      <motion.div
                        data-dropdown
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-2 w-56 p-2 bg-white rounded-xl shadow-xl border border-gray-100 ring-1 ring-black/5 overflow-hidden backdrop-blur-3xl"
                        style={{ transformOrigin: 'top left' }}
                      >
                        {item.dropdown.map((dropItem, idx) => (
                          <div key={idx}>
                            {/* @ts-ignore - simplistic type check for now */}
                            {dropItem.type === 'header' ? (
                              <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                {dropItem[language]}
                              </div>
                            ) : (
                              <Link
                                href={dropItem.href || '#'}
                                className="flex items-center justify-between px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-red transition-all duration-200 group/item"
                              >
                                <span>{dropItem[language]}</span>
                                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200" />
                              </Link>
                            )}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Actions Section */}
            <div className="flex items-center gap-3">

              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className={`relative px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${isScrolled ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md'}`}
              >
                {language === 'en' ? 'AR' : 'EN'}
              </button>

              {/* Call to Action - Desktop */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block"
              >
                <Link
                  href="/contact"
                  className="px-5 py-2 rounded-full font-semibold text-sm bg-gradient-to-r from-brand-red to-brand-red-dark text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all duration-300 flex items-center gap-2"
                >
                  <span>{language === 'en' ? 'Get Quote' : 'اطلب عرض'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-full transition-colors ${isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            />

            <motion.div
              initial={{ x: isRTL ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={`fixed top-0 ${isRTL ? 'left-0' : 'right-0'} h-full w-[280px] bg-white z-50 shadow-2xl lg:hidden flex flex-col`}
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <span className="font-bold text-lg text-brand-dark">
                  {language === 'en' ? 'Menu' : 'القائمة'}
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
                {navItems.map((item, index) => (
                  <div key={index}>
                    <Link
                      href={item.href}
                      className={`flex items-center justify-between p-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:text-brand-red transition-all`}
                      onClick={() => !item.dropdown && setMobileMenuOpen(false)}
                    >
                      {item[language]}
                      {item.dropdown && <ChevronDown size={16} />}
                    </Link>
                    {item.dropdown && (
                      <div className="pl-6 mt-1 space-y-1 border-l-2 border-gray-100 ml-3">
                        {item.dropdown.map((dropItem, idx) => (
                          <div key={idx}>
                            {/* @ts-ignore - simplistic type check */}
                            {dropItem.type === 'header' ? (
                              <div className="py-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                {dropItem[language]}
                              </div>
                            ) : (
                              <Link
                                href={dropItem.href || '#'}
                                className="block py-2 px-3 text-sm text-gray-500 hover:text-brand-red transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {dropItem[language]}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="grid gap-3">
                  <a href="https://wa.me/971501234567"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-[#25D366] text-white font-medium shadow-sm hover:shadow-md transition-all"
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </a>
                  <a href="tel:+971501234567"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-brand-dark text-white font-medium shadow-sm hover:shadow-md transition-all"
                  >
                    <Phone size={18} />
                    {language === 'en' ? 'Call Us' : 'اتصل بنا'}
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}