'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { FileText } from '@phosphor-icons/react';
import { staggerContainerSlow, fadeUp, viewportOnce } from '@/lib/motion';
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
  const shouldReduce = useReducedMotion();
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
      <motion.div
        className="space-y-4"
        variants={shouldReduce ? {} : staggerContainerSlow}
        initial={shouldReduce ? {} : 'hidden'}
        whileInView={shouldReduce ? undefined : 'visible'}
        viewport={shouldReduce ? undefined : viewportOnce}
      >
        {documents.map((doc, idx) => (
          <motion.div key={doc.id} variants={shouldReduce ? {} : fadeUp}>
            <TechDocumentCard
              doc={doc} viewMode="list" language={language} idx={idx}
              isDownloading={!!downloadingIds[doc.id]}
              unavailable={unavailableId === doc.id}
              onDownload={onDownload}
            />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={shouldReduce ? {} : staggerContainerSlow}
      initial={shouldReduce ? {} : 'hidden'}
      whileInView={shouldReduce ? undefined : 'visible'}
      viewport={shouldReduce ? undefined : viewportOnce}
    >
      {documents.map((doc, idx) => (
        <motion.div key={doc.id} variants={shouldReduce ? {} : fadeUp}>
          <TechDocumentCard
            doc={doc} viewMode="grid" language={language} idx={idx}
            isDownloading={!!downloadingIds[doc.id]}
            unavailable={unavailableId === doc.id}
            onDownload={onDownload}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
