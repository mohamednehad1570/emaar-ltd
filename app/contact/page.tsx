'use client';

/**
 * app/contact/page.tsx
 *
 * Contact page — the conversion endpoint for the entire site.
 * Left-aligned hero (engineering register, not celebratory), quote form,
 * contact methods sidebar, office locations, map placeholder, and a direct-action
 * dark strip at the bottom for visitors who prefer to call or message immediately.
 *
 * Design compliance:
 *   - No gradient text, no gradient backgrounds on interactive elements
 *   - All shadows warm (rgba 45,41,38)
 *   - bg-off-white page background, solid semantic token colors throughout
 *   - Icons: WhatsappLogo for WhatsApp contexts; no MessageCircle substitution
 *   - Placeholder contrast: text-text-muted (best available token)
 *   - RTL: every directional class is conditional; Send icon reverses in AR
 */

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Phone, Envelope as Mail, MapPin, Clock,
  PaperPlaneTilt as Send, UploadSimple as Upload, X,
  WhatsappLogo, CheckCircle, ArrowRight,
} from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { contactData } from '@/lib/data/contact';
import { resolveIcon } from '@/lib/iconMap';
import { fadeUp, viewportOnce } from '@/lib/motion';

export default function ContactPage() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
    file: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');

  const t = contactData[language];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.projectType,
          message: formData.message,
        }),
      });
      const data = await res.json() as { success?: boolean; error?: string };
      if (!res.ok) {
        setSubmitError(data.error ?? (language === 'en'
          ? 'Something went wrong. Please try again.'
          : 'حدث خطأ ما. يرجى المحاولة مرة أخرى.'));
        setSubmitStatus('error');
      } else {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', projectType: '', message: '', file: null });
      }
    } catch {
      setSubmitError(language === 'en'
        ? 'Network error. Please check your connection and try again.'
        : 'خطأ في الشبكة. يرجى التحقق من الاتصال والمحاولة مرة أخرى.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* Shared input class — sharp corners, brand borders, accessible placeholder */
  const inputClass = [
    'w-full px-4 py-3.5 rounded-none',
    'border border-border-light bg-white',
    'text-text-body placeholder:text-text-muted',
    'focus:border-brand-red focus:outline-none',
    'transition-colors duration-150',
  ].join(' ');

  return (
    <div className="min-h-screen bg-off-white" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Hero — left-aligned, confident, no decoration ──── */}
      <section className="pt-32 pb-14 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial={shouldReduce ? {} : 'hidden'}
            animate="visible"
            className={isRTL ? 'text-right' : 'text-left'}
          >
            {/* Label eyebrow — restricted to this one instance per page */}
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-red mb-4">
              {language === 'en' ? 'Get in Touch' : 'تواصل معنا'}
            </p>

            {/* h1 — display scale, solid ink, no gradient */}
            <h1
              className="font-extrabold text-brand-dark leading-[0.95] tracking-[-0.02em] mb-5 text-balance"
              style={{ fontSize: 'clamp(2.75rem, 5vw, 5rem)' }}
            >
              {t.hero.title}
            </h1>

            <p className="text-lg text-text-body max-w-xl mb-10">{t.hero.subtitle}</p>

            {/* Trust chips — border, white bg, red icon, no shadow */}
            <div className={`flex flex-wrap gap-3 ${isRTL ? 'justify-end' : ''}`}>
              {t.hero.trust.map((item, idx) => {
                const Icon = resolveIcon(item.icon);
                return (
                  <motion.div
                    key={idx}
                    initial={shouldReduce ? {} : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 + 0.2 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-border-light"
                  >
                    <Icon className="w-4 h-4 text-brand-red shrink-0" aria-hidden="true" />
                    <span className="text-sm font-semibold text-text-body">{item.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Main: Quote Form + Contact Sidebar ────────────── */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* ── LEFT: Quote Form ─────────────────────────── */}
            <motion.div
              initial={shouldReduce ? {} : { opacity: 0, x: isRTL ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-white p-8 border border-border-light">
                <h2 className="text-2xl font-bold mb-1 text-brand-dark">{t.form.title}</h2>
                <p className="text-sm text-text-muted mb-7">{t.form.subtitle}</p>

                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Name + Email — 2-col on md+ */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-text-body mb-2">
                        {t.form.fields.name.label}
                        {t.form.fields.name.required && <span className="text-brand-red ms-0.5">*</span>}
                      </label>
                      <input
                        type="text" name="name" value={formData.name}
                        onChange={handleInputChange} required
                        placeholder={t.form.fields.name.placeholder}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-text-body mb-2">
                        {t.form.fields.email.label}
                        {t.form.fields.email.required && <span className="text-brand-red ms-0.5">*</span>}
                      </label>
                      <input
                        type="email" name="email" value={formData.email}
                        onChange={handleInputChange} required
                        placeholder={t.form.fields.email.placeholder}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Phone + Project Type — 2-col on md+ */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-text-body mb-2">
                        {t.form.fields.phone.label}
                        {t.form.fields.phone.required && <span className="text-brand-red ms-0.5">*</span>}
                      </label>
                      <input
                        type="tel" name="phone" value={formData.phone}
                        onChange={handleInputChange} required
                        placeholder={t.form.fields.phone.placeholder}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-text-body mb-2">
                        {t.form.fields.projectType.label}
                        {t.form.fields.projectType.required && <span className="text-brand-red ms-0.5">*</span>}
                      </label>
                      <select
                        name="projectType" value={formData.projectType}
                        onChange={handleInputChange} required
                        className={inputClass}
                      >
                        {t.form.fields.projectType.options.map((option, idx) => (
                          <option key={idx} value={idx === 0 ? '' : option} disabled={idx === 0}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-text-body mb-2">
                      {t.form.fields.message.label}
                      {t.form.fields.message.required && <span className="text-brand-red ms-0.5">*</span>}
                    </label>
                    <textarea
                      name="message" value={formData.message}
                      onChange={handleInputChange} required rows={5}
                      placeholder={t.form.fields.message.placeholder}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-text-body mb-1">
                      {t.form.fields.file.label}
                    </label>
                    <p className="text-xs text-text-muted mb-2">{t.form.fields.file.hint}</p>
                    <div className="relative">
                      <input
                        type="file" id="file-upload"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png,.dwg"
                        className="hidden"
                      />
                      {/* Dashed border — standard file-drop affordance */}
                      <label
                        htmlFor="file-upload"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-dashed border-border-medium bg-off-white text-text-muted hover:border-brand-silver hover:text-text-body transition-colors cursor-pointer text-sm"
                      >
                        <Upload size={16} className="shrink-0" aria-hidden="true" />
                        <span>
                          {formData.file
                            ? formData.file.name
                            : (language === 'en' ? 'Attach a file' : 'إرفاق ملف')}
                        </span>
                      </label>
                      {formData.file && (
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, file: null })}
                          className={`absolute top-1/2 -translate-y-1/2 p-2.5 hover:bg-cream transition-colors ${isRTL ? 'left-3' : 'right-3'}`}
                          aria-label={language === 'en' ? 'Remove file' : 'إزالة الملف'}
                        >
                          <X size={14} className="text-text-muted" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Submit — solid brand-red, no gradient */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={isSubmitting ? {} : { scale: 1.02 }}
                    whileTap={isSubmitting ? {} : { scale: 0.98 }}
                    className="w-full px-6 py-4 bg-brand-red hover:bg-brand-red-dark text-white font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 group"
                  >
                    {isSubmitting ? (
                      <>
                        {/* Spinner — border-t-white is the visible arc */}
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t.form.sending}
                      </>
                    ) : (
                      <>
                        {/* Send icon rotated in RTL so arrow points in reading direction */}
                        <Send
                          size={18}
                          className={`transition-transform duration-150 ${
                            isRTL
                              ? 'rotate-180 group-hover:-translate-x-1'
                              : 'group-hover:translate-x-1'
                          }`}
                          aria-hidden="true"
                        />
                        {t.form.submit}
                      </>
                    )}
                  </motion.button>

                  {/* Success state */}
                  {submitStatus === 'success' && (
                    <div className="flex items-start gap-3 p-4 bg-off-white border border-border-light">
                      <CheckCircle size={18} className="text-brand-dark shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-sm font-semibold text-brand-dark">
                        {language === 'en'
                          ? "Message sent. We'll be in touch within 24 hours."
                          : 'تم الإرسال. سنتواصل معك خلال 24 ساعة.'}
                      </p>
                    </div>
                  )}

                  {/* Error state */}
                  {submitStatus === 'error' && (
                    <p className="text-sm font-semibold text-brand-red" role="alert">
                      {submitError}
                    </p>
                  )}

                </form>
              </div>
            </motion.div>

            {/* ── RIGHT: Contact Methods + Offices ─────────── */}
            <motion.div
              initial={shouldReduce ? {} : { opacity: 0, x: isRTL ? -40 : 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >

              {/* Contact Method cards */}
              <div>
                <h3 className={`text-[11px] font-bold uppercase tracking-[0.22em] text-text-muted mb-4 ${isRTL ? 'text-right' : ''}`}>
                  {t.contact.title}
                </h3>

                <div className="space-y-2">

                  {/* Phone */}
                  <a
                    href="tel:+971501234567"
                    className="flex items-center gap-4 bg-white p-5 border border-border-light hover:border-brand-silver transition-colors duration-200 group"
                  >
                    {/* Solid brand-red icon box — no gradient */}
                    <div className="w-10 h-10 bg-brand-red flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[0.1em] text-text-muted mb-0.5">
                        {t.contact.phone.title}
                      </p>
                      <p className="font-bold text-brand-dark">{t.contact.phone.number}</p>
                      <p className="text-xs text-text-muted mt-0.5">{t.contact.phone.hours}</p>
                    </div>
                    <ArrowRight
                      size={15}
                      className={`text-brand-silver group-hover:text-brand-dark transition-colors shrink-0 ${isRTL ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </a>

                  {/* WhatsApp — bg-brand-dark, WhatsappLogo icon */}
                  <a
                    href="https://wa.me/971501234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-white p-5 border border-border-light hover:border-brand-silver transition-colors duration-200 group"
                  >
                    <div className="w-10 h-10 bg-brand-dark flex items-center justify-center shrink-0">
                      <WhatsappLogo size={18} className="text-white" weight="fill" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[0.1em] text-text-muted mb-0.5">
                        {t.contact.whatsapp.title}
                      </p>
                      <p className="font-bold text-brand-dark text-sm">{t.contact.whatsapp.text}</p>
                      <span className="inline-flex items-center gap-1 text-xs text-text-muted mt-0.5">
                        {t.contact.whatsapp.cta}
                        <ArrowRight size={10} className={isRTL ? 'rotate-180' : ''} aria-hidden="true" />
                      </span>
                    </div>
                    <ArrowRight
                      size={15}
                      className={`text-brand-silver group-hover:text-brand-dark transition-colors shrink-0 ${isRTL ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </a>

                  {/* Email — bg-brand-silver (the material) */}
                  <a
                    href="mailto:info@emaar-international.ae"
                    className="flex items-center gap-4 bg-white p-5 border border-border-light hover:border-brand-silver transition-colors duration-200 group"
                  >
                    <div className="w-10 h-10 bg-brand-silver flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[0.1em] text-text-muted mb-0.5">
                        {t.contact.email.title}
                      </p>
                      <p className="font-bold text-brand-dark text-sm truncate">
                        {t.contact.email.address}
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">{t.contact.email.response}</p>
                    </div>
                    <ArrowRight
                      size={15}
                      className={`text-brand-silver group-hover:text-brand-dark transition-colors shrink-0 ${isRTL ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </a>

                </div>
              </div>

              {/* Office Locations */}
              <div>
                <h3 className={`text-[11px] font-bold uppercase tracking-[0.22em] text-text-muted mb-4 ${isRTL ? 'text-right' : ''}`}>
                  {t.offices.title}
                </h3>
                <div className="space-y-2">
                  {t.offices.list.map((office, idx) => (
                    <div key={idx} className="bg-white p-5 border border-border-light">
                      <h4 className={`font-bold text-brand-dark mb-3 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <MapPin size={14} className="text-brand-red shrink-0" aria-hidden="true" />
                        {office.name}
                      </h4>
                      <div className="space-y-1.5 text-sm text-text-body">
                        <p>{office.address}</p>
                        <p className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Phone size={12} className="text-brand-silver shrink-0" aria-hidden="true" />
                          {office.phone}
                        </p>
                        <p className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Clock size={12} className="text-brand-silver shrink-0" aria-hidden="true" />
                          {office.hours}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Map ───────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial={shouldReduce ? {} : 'hidden'}
            whileInView={shouldReduce ? undefined : 'visible'}
            viewport={shouldReduce ? undefined : viewportOnce}
            className={`text-2xl font-bold mb-8 text-brand-dark ${isRTL ? 'text-right' : ''}`}
          >
            {t.map.title}
          </motion.h2>

          {/* Map placeholder — matches border-light system, no shadow */}
          <div className="bg-white h-80 flex items-center justify-center border border-border-light">
            <div className={`text-center ${isRTL ? 'rtl' : ''}`}>
              <MapPin size={36} className="mx-auto mb-3 text-brand-silver" aria-hidden="true" />
              <p className="text-sm text-text-muted mb-5">
                {language === 'en' ? 'Interactive map coming soon' : 'الخريطة التفاعلية قريبًا'}
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-dark hover:bg-brand-dark-mid text-white text-sm font-bold transition-colors"
                style={{ color: 'var(--color-brand-surface)' }}
              >
                <MapPin size={14} aria-hidden="true" />
                {t.map.viewMap}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Direct-action strip — void background, two CTA buttons ── */}
      <section className="py-14 px-6 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto">
          <div className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-8 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : ''}>
              <h2 className="text-2xl font-bold mb-1">
                {t.cta.title}
              </h2>
              <p className="text-white/60 text-sm max-w-sm">
                {t.cta.subtitle}
              </p>
            </div>

            <div className={`flex flex-col sm:flex-row gap-3 shrink-0 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <a
                href="tel:+971501234567"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-brand-dark font-bold text-sm hover:bg-cream transition-colors"
                style={{ color: 'var(--color-brand-dark)' }}
              >
                <Phone size={15} aria-hidden="true" />
                {language === 'en' ? 'Call Now' : 'اتصل الآن'}
              </a>
              <a
                href="https://wa.me/971501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 border border-white/30 text-white font-bold text-sm hover:bg-white/20 hover:border-white/50 transition-colors"
              >
                <WhatsappLogo size={15} weight="fill" aria-hidden="true" />
                {t.cta.button}
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
