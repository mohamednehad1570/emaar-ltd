'use client';

import { MapPin, CalendarBlank, Cube, Briefcase, ArrowRight } from '@phosphor-icons/react';
import { getWhatsAppURL } from '@/lib/whatsapp';
import type { SanityProject } from '@/lib/sanity/types';
import Button from '@/components/ui/Button';

type Language = 'en' | 'ar';

interface Props {
  project: SanityProject;
  language: Language;
  isRTL: boolean;
  materialLabel: string;
  categoryLabel: string;
}

export default function ProjectInfoPanel({ project, language, isRTL, materialLabel, categoryLabel }: Props) {
  const ui = language === 'en'
    ? { location: 'Location', year: 'Year', material: 'Material', client: 'Client', scope: 'Scope', requestQuote: 'Request Quote', contactUs: 'Contact Us' }
    : { location: 'الموقع', year: 'السنة', material: 'المادة', client: 'العميل', scope: 'النطاق', requestQuote: 'طلب عرض سعر', contactUs: 'تواصل معنا' };

  const infoRows = [
    { label: ui.location, value: project.location?.[language] ?? project.location?.en ?? '—', Icon: MapPin },
    { label: ui.year,     value: project.year != null ? String(project.year) : '—',           Icon: CalendarBlank },
    { label: ui.material, value: materialLabel,                                                Icon: Cube },
    { label: ui.client,   value: project.client?.[language] ?? '—',                           Icon: Briefcase },
  ];

  return (
    <div>
      {/* Category badge */}
      <span className="inline-flex items-center px-3 py-1 bg-cream text-text-muted text-xs uppercase tracking-[0.2em] rounded-sm mb-4">
        {categoryLabel}
      </span>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-brand-dark font-cairo leading-snug mb-6">
        {project.title[language] ?? project.title.en}
      </h1>

      <div className="h-px bg-border-light w-full mb-6" />

      {/* Info rows */}
      {infoRows.map(({ label, value, Icon }) => (
        <div key={label} className="grid grid-cols-2 py-3 border-b border-border-light">
          <span className="flex items-center gap-1.5 text-sm text-text-muted">
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
          </span>
          <span className="text-sm font-semibold text-brand-dark text-end">{value}</span>
        </div>
      ))}

      <div className="h-px bg-border-light w-full my-6" />

      {/* Description */}
      {project.description && (
        <p className="text-sm leading-[1.75] text-text-body mb-6">
          {project.description[language] ?? project.description.en}
        </p>
      )}

      {/* Scope */}
      {project.scope && (
        <div className="flex items-start gap-3">
          <span className="text-xs uppercase tracking-[0.2em] text-text-muted whitespace-nowrap pt-0.5">
            {ui.scope}
          </span>
          <span className="text-sm font-semibold text-brand-dark">
            {project.scope[language] ?? project.scope.en}
          </span>
        </div>
      )}

      <div className="h-px bg-border-light w-full my-6" />

      {/* CTA buttons */}
      <div className="flex flex-col gap-3">
        <Button
          variant="primary" size="md"
          href={getWhatsAppURL({ page: 'project-detail', projectName: project.title.en })}
          target="_blank" rel="noopener noreferrer"
          icon={<ArrowRight className={`w-4 h-4${isRTL ? ' rotate-180' : ''}`} />}
          className="w-full"
        >
          {ui.requestQuote}
        </Button>
        <Button
          variant="outline" size="md"
          href="/contact"
          className="w-full"
        >
          {ui.contactUs}
        </Button>
      </div>
    </div>
  );
}
