'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { language, isRTL } = useLanguage();

  const content = {
    en: {
      tagline: 'Crafting Excellence in Windows, Doors & Facades',
      quickLinks: {
        title: 'Quick Links',
        links: [
          { name: 'Home', href: '/' },
          { name: 'About Us', href: '/about' },
          { name: 'Services', href: '/services' },
        ],
      },
      products: {
        title: 'Products',
        links: [
          { name: 'uPVC Windows', href: '/products/upvc' },
          { name: 'Aluminum Doors', href: '/products/aluminum' },
          { name: 'Sliding Systems', href: '/products/upvc' },
        ],
      },
      company: {
        title: 'Company',
        links: [
          { name: 'Projects', href: '/projects' },
          { name: 'FAQ', href: '/faq' },
        ],
      },
      support: {
        title: 'Support',
        links: [
          { name: 'Contact Us', href: '/contact' },
          { name: 'Request Quote', href: '/contact' },
        ],
      },
      contact: {
        title: 'Get in Touch',
        email: 'info@emaar-international.ae',
        phone: '+971 50 123 4567',
        address: 'Dubai, UAE',
      },
      copyright: '© 2025 EMAAR International Industry LLC. All rights reserved.',
    },
    ar: {
      tagline: 'نصنع التميز في النوافذ والأبواب والواجهات',
      quickLinks: {
        title: 'روابط سريعة',
        links: [
          { name: 'الرئيسية', href: '/' },
          { name: 'من نحن', href: '/about' },
          { name: 'الخدمات', href: '/services' },
        ],
      },
      products: {
        title: 'المنتجات',
        links: [
          { name: 'نوافذ يو بي في سي', href: '/products/upvc' },
          { name: 'أبواب الألومنيوم', href: '/products/aluminum' },
          { name: 'أنظمة الانزلاق', href: '/products/upvc' },
        ],
      },
      company: {
        title: 'الشركة',
        links: [
          { name: 'المشاريع', href: '/projects' },
          { name: 'الأسئلة الشائعة', href: '/faq' },
        ],
      },
      support: {
        title: 'الدعم',
        links: [
          { name: 'اتصل بنا', href: '/contact' },
          { name: 'طلب عرض سعر', href: '/contact' },
        ],
      },
      contact: {
        title: 'تواصل معنا',
        email: 'info@emaar-international.ae',
        phone: '+971 50 123 4567',
        address: 'دبي، الإمارات',
      },
      copyright: '© 2025 إعمار الدولية للصناعة ذ.م.م. جميع الحقوق محفوظة.',
    },
  };

  const t = content[language];

  const sections = [t.quickLinks, t.products, t.company, t.support];

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Twitter, href: '#' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-brand-bg via-brand-bg to-brand-silver/30 text-brand-dark overflow-hidden font-sans border-t border-gray-200">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#999 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.1 }} />
      </div>

      {/* Top Gold Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-silver to-transparent opacity-80" />

      {/* Main Content Container - Slimmer Padding */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-8">

        {/* Main Content Grid - Reduced Gap and Margin */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 mb-10 ${isRTL ? 'text-right' : 'text-left'}`}>

          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-3 mb-2">
                {/* Slightly smaller logo container */}
                <div className="relative w-12 h-12 overflow-hidden rounded-xl bg-gradient-to-br from-brand-silver to-brand-silver p-0.5 shadow-md">
                  <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                    <span className="text-2xl font-bold text-brand-dark group-hover:text-brand-red transition-colors">E</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-brand-dark tracking-tight uppercase">
                    {language === 'en' ? 'EMAAR' : 'إعمار'}
                  </h2>
                  <p className="text-xs text-brand-gray uppercase tracking-widest font-semibold">
                    {language === 'en' ? 'International Industry LLC' : 'الدولية للصناعة'}
                  </p>
                </div>
              </div>
            </Link>
            <p className="text-brand-gray leading-relaxed max-w-sm font-medium">
              {t.tagline}
            </p>

            {/* Social Links */}
            <div className={`flex gap-3 pt-2 ${isRTL ? 'justify-start' : ''}`}>
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center text-brand-dark hover:text-brand-red hover:border-brand-red/30 transition-all duration-300"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Spacer for Desktop */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Links Sections */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8">
            {sections.map((section, index) => (
              <div key={index}>
                <h3 className="font-bold text-brand-dark text-lg mb-6 relative inline-block">
                  {section.title}
                  <span className={`absolute -bottom-2 ${isRTL ? 'right-0' : 'left-0'} w-8 h-0.5 bg-brand-red rounded-full`} />
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        href={link.href}
                        className="text-brand-gray hover:text-brand-red text-sm transition-all duration-300 flex items-center gap-2 group font-medium"
                      >
                        {isRTL && <ArrowRight className="w-3 h-3 text-brand-red opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 rotate-180" />}

                        <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                          {link.name}
                        </span>

                        {!isRTL && <ArrowRight className="w-3 h-3 text-brand-red opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Contact Bar - Slimmer padding */}
        <div className="grid md:grid-cols-3 gap-6 py-6 border-t border-gray-300/50 text-sm">
          <div className={`flex items-center gap-3 ${isRTL ? 'md:justify-start' : ''}`}>
            <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red">
              <Mail size={18} />
            </div>
            <div>
              <div className="text-brand-gray text-xs uppercase tracking-wider">Email</div>
              <a href={`mailto:${t.contact.email}`} className="text-brand-dark hover:text-brand-red transition-colors font-semibold">{t.contact.email}</a>
            </div>
          </div>
          <div className={`flex items-center gap-3 ${isRTL ? 'md:justify-start' : ''}`}>
            <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red">
              <Phone size={18} />
            </div>
            <div>
              <div className="text-brand-gray text-xs uppercase tracking-wider">Phone</div>
              <a href={`tel:${t.contact.phone.replace(/\s/g, '')}`} className="text-brand-dark hover:text-brand-red transition-colors text-right font-semibold" dir="ltr">{t.contact.phone}</a>
            </div>
          </div>
          <div className={`flex items-center gap-3 ${isRTL ? 'md:justify-start' : ''}`}>
            <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red">
              <MapPin size={18} />
            </div>
            <div>
              <div className="text-brand-gray text-xs uppercase tracking-wider">Location</div>
              <div className="text-brand-dark hover:text-brand-red transition-colors font-semibold">{t.contact.address}</div>
            </div>
          </div>
        </div>

        {/* Copyright - Slimmer padding */}
        <div className={`pt-6 border-t border-gray-300/50 flex flex-col md:flex-row justify-between items-center gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <p className="text-sm text-brand-gray text-center md:text-left">
            {t.copyright}
          </p>
          <div className="flex items-center gap-4 text-xs font-semibold tracking-widest text-brand-gray uppercase">
            <span>EMAAR INT</span>
            <span>•</span>
            <span>EST 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
