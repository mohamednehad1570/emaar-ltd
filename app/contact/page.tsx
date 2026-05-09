'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone, Envelope as Mail, MapPin, Clock, PaperPlaneTilt as Send, UploadSimple as Upload, X, ChatCircle as MessageCircle,
} from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { contactData } from '@/lib/data/contact';
import { resolveIcon } from '@/lib/iconMap';
import { fadeUp, viewportOnce } from '@/lib/motion';

export default function ContactPage() {
  const { language, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
    file: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = contactData[language];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert(language === 'en' ? 'Quote request sent successfully!' : 'تم إرسال طلب العرض بنجاح!');
    setFormData({ name: '', email: '', phone: '', projectType: '', message: '', file: null });
    setIsSubmitting(false);
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border border-brand-silver/20 bg-white text-brand-dark placeholder:text-brand-silver focus:border-brand-red focus:outline-none transition-colors`;

  return (
    <div className={`min-h-screen bg-gradient-to-b from-brand-bg via-white to-brand-bg ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-silver/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-brand-red to-brand-silver bg-clip-text text-transparent">
              {t.hero.title}
            </h1>
            <p className="text-xl text-brand-gray mb-8">{t.hero.subtitle}</p>

            {/* Trust indicators */}
            <div className="flex justify-center gap-8 flex-wrap">
              {t.hero.trust.map((item, idx) => {
                const Icon = resolveIcon(item.icon);
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-silver/10 shadow-sm"
                  >
                    <Icon className="w-5 h-5 text-brand-silver" />
                    <span className="text-sm font-semibold text-brand-dark">{item.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────────── */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* LEFT: Quote Form */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-brand-silver/10">
                <h2 className="text-3xl font-bold mb-2 text-brand-dark">{t.form.title}</h2>
                <p className="text-sm text-brand-gray mb-6">{t.form.subtitle}</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-2">
                      {t.form.fields.name.label} {t.form.fields.name.required && <span className="text-brand-red">*</span>}
                    </label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder={t.form.fields.name.placeholder} className={inputClass} />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-2">
                      {t.form.fields.email.label} {t.form.fields.email.required && <span className="text-brand-red">*</span>}
                    </label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder={t.form.fields.email.placeholder} className={inputClass} />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-2">
                      {t.form.fields.phone.label} {t.form.fields.phone.required && <span className="text-brand-red">*</span>}
                    </label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder={t.form.fields.phone.placeholder} className={inputClass} />
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-2">
                      {t.form.fields.projectType.label} {t.form.fields.projectType.required && <span className="text-brand-red">*</span>}
                    </label>
                    <select name="projectType" value={formData.projectType} onChange={handleInputChange} required className={inputClass}>
                      {t.form.fields.projectType.options.map((option, idx) => (
                        <option key={idx} value={idx === 0 ? '' : option} disabled={idx === 0}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-2">
                      {t.form.fields.message.label} {t.form.fields.message.required && <span className="text-brand-red">*</span>}
                    </label>
                    <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={4} placeholder={t.form.fields.message.placeholder} className={`${inputClass} resize-none`} />
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-2">{t.form.fields.file.label}</label>
                    <p className="text-xs text-brand-gray mb-2">{t.form.fields.file.hint}</p>
                    <div className="relative">
                      <input type="file" id="file-upload" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png,.dwg" className="hidden" />
                      <label htmlFor="file-upload" className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-brand-silver/20 bg-brand-bg text-brand-gray hover:border-brand-silver hover:text-brand-dark transition-colors cursor-pointer">
                        <Upload size={18} />
                        <span className="text-sm">{formData.file ? formData.file.name : (language === 'en' ? 'Choose file' : 'اختر ملف')}</span>
                      </label>
                      {formData.file && (
                        <button type="button" onClick={() => setFormData({ ...formData, file: null })} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-brand-bg transition-colors">
                          <X size={16} className="text-brand-red" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 rounded-full bg-gradient-to-r from-brand-red to-brand-red-dark text-white font-semibold text-lg hover:shadow-warm-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t.form.sending}
                      </>
                    ) : (
                      <>
                        <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                        {t.form.submit}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* RIGHT: Contact Methods & Offices */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Contact Methods */}
              <div>
                <h3 className="text-2xl font-bold mb-5 text-brand-dark">{t.contact.title}</h3>
                <div className="space-y-4">
                  {/* Phone */}
                  <a href="tel:+971501234567" className="block bg-white rounded-xl p-5 border border-brand-silver/10 shadow-sm hover:border-brand-silver/30 transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-red to-brand-red-dark flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Phone size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-brand-dark mb-1">{t.contact.phone.title}</h4>
                        <p className="text-lg font-semibold text-brand-silver mb-1">{t.contact.phone.number}</p>
                        <p className="text-xs text-brand-gray">{t.contact.phone.hours}</p>
                      </div>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-xl p-5 border border-brand-silver/10 shadow-sm hover:border-whatsapp/30 transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-whatsapp to-whatsapp-dark flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <MessageCircle size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-brand-dark mb-1">{t.contact.whatsapp.title}</h4>
                        <p className="text-sm text-brand-gray mb-2">{t.contact.whatsapp.text}</p>
                        <span className="text-xs text-whatsapp font-semibold">{t.contact.whatsapp.cta} →</span>
                      </div>
                    </div>
                  </a>

                  {/* Email */}
                  <a href="mailto:info@emaar-international.ae" className="block bg-white rounded-xl p-5 border border-brand-silver/10 shadow-sm hover:border-brand-silver/30 transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-silver to-brand-gray flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Mail size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-brand-dark mb-1">{t.contact.email.title}</h4>
                        <p className="text-sm text-brand-silver mb-1 break-all">{t.contact.email.address}</p>
                        <p className="text-xs text-brand-gray">{t.contact.email.response}</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Office Locations */}
              <div>
                <h3 className="text-2xl font-bold mb-5 text-brand-dark">{t.offices.title}</h3>
                <div className="space-y-4">
                  {t.offices.list.map((office, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-5 border border-brand-silver/10 shadow-sm">
                      <h4 className="font-bold text-brand-dark mb-3 flex items-center gap-2">
                        <MapPin size={18} className="text-brand-red" />
                        {office.name}
                      </h4>
                      <div className="space-y-2 text-sm text-brand-gray">
                        <p>{office.address}</p>
                        <p className="flex items-center gap-2">
                          <Phone size={14} className="text-brand-silver" />
                          {office.phone}
                        </p>
                        <p className="flex items-center gap-2">
                          <Clock size={14} className="text-brand-silver" />
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
      <section className="py-12 px-6 bg-brand-bg">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-brand-dark">{t.map.title}</h2>
          <div className="bg-white rounded-2xl p-4 h-96 flex items-center justify-center border border-brand-silver/10 shadow-sm">
            <div className="text-center">
              <MapPin size={48} className="mx-auto mb-4 text-brand-silver" />
              <p className="text-brand-gray mb-4">
                {language === 'en' ? 'Interactive map will be integrated here' : 'سيتم دمج الخريطة التفاعلية هنا'}
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-brand-silver to-brand-gray text-white font-semibold hover:shadow-warm-lg transition-all"
              >
                <MapPin size={18} />
                {t.map.viewMap}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="bg-white rounded-2xl p-10 border border-brand-silver/10 shadow-xl"
          >
            <MessageCircle size={48} className="mx-auto mb-4 text-whatsapp" />
            <h2 className="text-3xl font-bold mb-3 text-brand-dark">{t.cta.title}</h2>
            <p className="text-lg text-brand-gray mb-6">{t.cta.subtitle}</p>
            <a
              href="https://wa.me/971501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-whatsapp hover:bg-whatsapp-dark text-white font-semibold text-lg transition-colors shadow-warm-lg"
            >
              <MessageCircle size={20} />
              {t.cta.button}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
