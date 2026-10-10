'use client';

/**
 * components/layout/footer/FooterContact.tsx
 * Contact information block: email, phone, address, WhatsApp, customer service,
 * and the red "Request Quote" CTA. Used in both the desktop column and mobile accordion.
 */

import LocaleLink from '@/components/ui/LocaleLink';
import { ArrowRight, Envelope, MapPin, Phone, WhatsappLogo } from '@phosphor-icons/react';
import { useTranslation } from '@/contexts/LanguageContext';

interface FooterContactProps {
  language:       'en' | 'ar';
  isRTL:          boolean;
  phone?:         string;
  email?:         string;
  whatsappNumber?: string;
}

export default function FooterContact({ language, isRTL, phone, email, whatsappNumber }: FooterContactProps) {
  const l = useTranslation();

  // CMS values override hardcoded fallbacks when configured
  const displayEmail = email          ?? 'info@emaar-international.ae';
  const displayPhone = phone          ?? '+971 50 123 4567';
  const waNumber     = whatsappNumber ?? '971501234567';

  return (
    <ul className="space-y-3.5">
      {/* Email */}
      <li>
        <a href={`mailto:${displayEmail}`}
          className="flex items-start gap-2.5 text-sm text-text-body hover:text-brand-red transition-colors duration-200 group">
          <Envelope size={15} className="text-brand-silver-dark shrink-0 mt-0.5 group-hover:text-brand-red transition-colors duration-200" />
          <span>{displayEmail}</span>
        </a>
      </li>

      {/* Phone — dir=ltr keeps the number left-to-right in Arabic mode */}
      <li>
        <a href={`tel:${displayPhone}`}
          className="flex items-start gap-2.5 text-sm text-text-body hover:text-brand-red transition-colors duration-200 group"
          dir="ltr">
          <Phone size={15} className="text-brand-silver-dark shrink-0 mt-0.5 group-hover:text-brand-red transition-colors duration-200" />
          <span className="tabular-nums">{displayPhone}</span>
        </a>
      </li>

      {/* Address */}
      <li className="flex items-start gap-2.5 text-sm text-text-body">
        <MapPin size={15} className="text-brand-silver-dark shrink-0 mt-0.5" />
        <span>{l('Dubai Industrial City, UAE', 'مدينة دبي الصناعية، الإمارات')}</span>
      </li>

      {/* WhatsApp */}
      <li>
        <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer"
          className="flex items-start gap-2.5 text-sm text-text-body hover:text-whatsapp transition-colors duration-200 group">
          <WhatsappLogo size={15} weight="fill" className="text-whatsapp shrink-0 mt-0.5" />
          <span>{l('Chat on WhatsApp', 'تواصل عبر واتساب')}</span>
        </a>
      </li>

      {/* Customer Service — separated from sales line; existing customers only */}
      <li className="border-t border-border-light pt-3 mt-3">
        <div className="flex items-start gap-2.5">
          <Phone size={15} className="text-brand-silver-dark shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-0.5">
              {language === 'ar' ? 'خدمة العملاء' : 'Customer Service'}
            </p>
            <a href="tel:0566668273" className="text-sm text-text-body hover:text-brand-red transition-colors duration-200 tabular-nums" dir="ltr">
              056 666 8273
            </a>
            <p className="text-xs text-text-muted mt-0.5">
              {language === 'ar' ? 'للعملاء الحاليين ومتابعة الطلبات' : 'Existing customers & order follow-up'}
            </p>
          </div>
        </div>
      </li>

      {/* Request Quote — the red CTA link */}
      <li className="pt-1.5">
        <LocaleLink href="/contact" className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-red hover:text-brand-red-dark transition-colors duration-200">
          {l('Request a Quote', 'اطلب عرضاً')}
          {/* Arrow points left (←) in RTL — achieved with rotate-180 */}
          <ArrowRight size={14} weight="bold" className={`shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
        </LocaleLink>
      </li>
    </ul>
  );
}
