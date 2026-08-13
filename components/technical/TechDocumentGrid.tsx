'use client';

import { FileText } from '@phosphor-icons/react';
import TechDocumentCard from './TechDocumentCard';
import type { DisplayDocument } from './TechDocumentCard';

interface TechDocumentGridProps {
  documents: DisplayDocument[];
  viewMode: 'grid' | 'list';
  language: 'en' | 'ar';
  isRTL: boolean;
  downloadingIds: Record<string, boolean>;
  unavailableId: string | null;
  onDownload: (doc: DisplayDocument) => void;
  noResultsLabel: string;
}

export default function TechDocumentGrid({
  documents, viewMode, language, downloadingIds,
  unavailableId, onDownload, noResultsLabel,
}: TechDocumentGridProps) {
  if (documents.length === 0) {
    return (
      <div className="text-center py-20">
        <FileText className="w-16 h-16 mx-auto mb-4 text-ink-muted" />
        <p className="text-xl text-ink-muted">{noResultsLabel}</p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {documents.map((doc, idx) => (
          <TechDocumentCard
            key={doc.id} doc={doc} viewMode="list" language={language} idx={idx}
            isDownloading={!!downloadingIds[doc.id]}
            unavailable={unavailableId === doc.id}
            onDownload={onDownload}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((doc, idx) => (
        <TechDocumentCard
          key={doc.id} doc={doc} viewMode="grid" language={language} idx={idx}
          isDownloading={!!downloadingIds[doc.id]}
          unavailable={unavailableId === doc.id}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
}
