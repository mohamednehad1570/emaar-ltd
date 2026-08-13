'use client';

import { useTranslation } from '@/contexts/LanguageContext';
import Container from '@/components/layout/Container';

interface Props {
  mapEmbedUrl?: string;
}

/** Google Maps iframe or "Map coming soon" placeholder. */
export default function ContactMap({ mapEmbedUrl }: Props) {
  const l = useTranslation();

  return (
    <section className="py-16 bg-surface-white">
      <Container>

        {mapEmbedUrl ? (
          /* ── Live map iframe ────────────────────────────────── */
          <iframe
            src={mapEmbedUrl}
            title={l('Office location map', 'خريطة موقع المكتب')}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allow="fullscreen"
            className="w-full aspect-video border-0 border border-border-light"
            style={{ borderRadius: '8px' }}
          />
        ) : (
          <div className="w-full aspect-video bg-surface-cream border border-border-light flex items-center justify-center"
            style={{ borderRadius: '8px' }}>
            <p className="text-ink-muted text-sm">{l('Map coming soon', 'الخريطة قريباً')}</p>
          </div>
        )}

      </Container>
    </section>
  );
}
