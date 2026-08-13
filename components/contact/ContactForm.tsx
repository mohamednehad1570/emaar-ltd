'use client';

/**
 * components/contact/ContactForm.tsx
 *
 * WhatsApp CTA → phone tap-to-call → "Or Send a Brief" → form.
 * All form state, validation, and /api/contact submission live here.
 * Honeypot field blocks bot submissions before the request is sent.
 */

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Phone } from '@phosphor-icons/react';
import { useLanguage, useTranslation } from '@/contexts/LanguageContext';
import { fadeUp } from '@/lib/motion';

const PROJECT_TYPES_EN = ['Villa', 'Apartment', 'Commercial', 'Other'] as const;
const PROJECT_TYPES_AR = ['فيلا', 'شقة', 'تجاري', 'أخرى'] as const;

interface Props {
  whatsappHref: string;
  phone: string;
}

export default function ContactForm({ whatsappHref, phone }: Props) {
  const { language, isRTL } = useLanguage();
  const l = useTranslation();
  const [name, setName]                   = useState('');
  const [phoneVal, setPhoneVal]           = useState('');
  const [projectType, setProjectType]     = useState('');
  const [brief, setBrief]                 = useState('');
  const [isSubmitting, setIsSubmitting]   = useState(false);
  const [status, setStatus]               = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg]           = useState('');
  const [isRateLimited, setIsRateLimited] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const types = language === 'en' ? PROJECT_TYPES_EN : PROJECT_TYPES_AR;
  const inputClass =
    'w-full h-12 px-4 border border-border-light bg-white text-ink-body ' +
    'placeholder:text-ink-muted focus:border-silver-flat focus:outline-none ' +
    'transition-colors duration-150';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); setStatus('idle'); setErrorMsg(''); setIsRateLimited(false);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone: phoneVal, service: projectType, message: brief, website: honeypotRef.current?.value ?? '' }),
      });
      const data = await res.json() as { success?: boolean; error?: string };
      if (!res.ok) {
        if (res.status === 429) { setIsRateLimited(true); }
        else { setErrorMsg(data.error ?? l('Something went wrong.', 'حدث خطأ ما.')); }
        setStatus('error');
      } else {
        setStatus('success');
        setName(''); setPhoneVal(''); setProjectType(''); setBrief('');
      }
    } catch {
      setErrorMsg(l('Network error. Please try again.', 'خطأ في الشبكة. حاول مرة أخرى.'));
      setStatus('error');
    } finally { setIsSubmitting(false); }
  };

  return (
    <>
      {/* ── WhatsApp CTA ──────────────────────────────────────── */}
      {/* #25D366 is the sole permitted green; only on this element */}
      <motion.a
        href={whatsappHref} target="_blank" rel="noopener noreferrer"
        variants={fadeUp} initial="hidden" animate="visible"
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        className={`flex items-center justify-center gap-3 w-full py-4 text-white font-bold text-lg mb-3 transition-opacity hover:opacity-90 ${isRTL ? 'flex-row-reverse' : ''}`}
        style={{ backgroundColor: '#25D366' }}
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current shrink-0" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        {l('Chat on WhatsApp', 'الدردشة على واتساب')}
      </motion.a>

      {/* ── Phone tap-to-call ──────────────────────────────────── */}
      <a
        href={`tel:${phone}`}
        className={`flex items-center gap-3 px-5 py-4 bg-white border border-border-light hover:border-silver-material transition-colors mb-10 ${isRTL ? 'flex-row-reverse' : ''}`}
      >
        <Phone size={18} className="text-brand-red shrink-0" aria-hidden="true" />
        {/* dir=ltr preserves digit order when parent direction is RTL */}
        <span className="font-semibold text-ink-heading" dir="ltr">{phone}</span>
      </a>

      {/* ── Divider ───────────────────────────────────────────── */}
      <div className={`flex items-center gap-4 mb-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className="h-px flex-1 bg-border-light" aria-hidden="true" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted select-none">
          {l('Or Send a Brief', 'أو أرسل ملخصاً')}
        </span>
        <div className="h-px flex-1 bg-border-light" aria-hidden="true" />
      </div>

      {/* ── Form ──────────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Honeypot — hidden from users, filled only by bots */}
        <input ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} aria-hidden="true" />

        <div>
          <label className={`block text-sm font-semibold text-ink-body mb-2 ${isRTL ? 'text-right' : ''}`}>{l('Name', 'الاسم')}</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder={l('Your name', 'اسمك')} className={`${inputClass} ${isRTL ? 'text-right' : ''}`} />
        </div>

        <div>
          <label className={`block text-sm font-semibold text-ink-body mb-2 ${isRTL ? 'text-right' : ''}`}>{l('Phone', 'الهاتف')}</label>
          {/* dir=ltr preserves digit order in Arabic mode */}
          <input type="tel" value={phoneVal} onChange={e => setPhoneVal(e.target.value)} required placeholder="+971 XX XXX XXXX" dir="ltr" className={inputClass} />
        </div>

        <div>
          <label className={`block text-sm font-semibold text-ink-body mb-3 ${isRTL ? 'text-right' : ''}`}>{l('Project Type', 'نوع المشروع')}</label>
          <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`} role="radiogroup">
            {types.map((label, idx) => {
              const value = PROJECT_TYPES_EN[idx];
              const sel = projectType === value;
              return (
                <label key={value} className={`px-4 py-2 border cursor-pointer text-sm font-semibold transition-colors select-none ${sel ? 'bg-surface-cream border-silver-material text-ink-heading' : 'bg-white border-border-light text-ink-muted hover:border-silver-material hover:text-ink-heading'}`}>
                  <input type="radio" name="projectType" value={value} className="sr-only" onChange={() => setProjectType(value)} />
                  {label}
                </label>
              );
            })}
          </div>
        </div>

        <div>
          <label className={`block text-sm font-semibold text-ink-body mb-2 ${isRTL ? 'text-right' : ''}`}>{l('Brief', 'الملخص')}</label>
          <textarea value={brief} onChange={e => setBrief(e.target.value)} required maxLength={500} rows={4} placeholder={l('Describe your project in a few words', 'صف مشروعك في بضع كلمات')} className={`w-full px-4 py-3 border border-border-light bg-white text-ink-body placeholder:text-ink-muted focus:border-silver-flat focus:outline-none transition-colors duration-150 resize-none ${isRTL ? 'text-right' : ''}`} />
          {/* Character counter sits in the trailing corner — opposite to the reading direction */}
          <p className={`text-xs text-ink-muted mt-1 tabular-nums ${isRTL ? 'text-left' : 'text-right'}`} aria-live="polite">{brief.length}/500</p>
        </div>

        <motion.button type="submit" disabled={isSubmitting} whileHover={isSubmitting ? {} : { scale: 1.02 }} whileTap={isSubmitting ? {} : { scale: 0.98 }} className="w-full py-4 bg-brand-red hover:bg-brand-red-deep text-white font-bold text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? l('Sending…', 'جارٍ الإرسال…') : l('Send Brief', 'إرسال')}
        </motion.button>

        {status === 'success' && <p className="text-sm font-semibold text-ink-heading text-center">{l("Sent. We'll be in touch shortly.", 'تم الإرسال. سنتواصل معك قريباً.')}</p>}
        {status === 'error' && isRateLimited && <p className="text-sm text-ink-muted text-center">{l('Too many attempts. Please wait a few minutes.', 'محاولات كثيرة. يرجى الانتظار قليلاً.')}</p>}
        {status === 'error' && !isRateLimited && <p className="text-sm font-semibold text-brand-red text-center" role="alert">{errorMsg}</p>}
      </form>
    </>
  );
}
