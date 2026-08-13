'use client';

import { motion } from 'framer-motion';
import {
  FileText, DownloadSimple as Download, Eye,
  Stack as Layers, Wrench, Package, BookOpen,
  Medal, FolderOpen,
} from '@phosphor-icons/react';
import Image from 'next/image';
import { fadeUp } from '@/lib/motion';

// Exported so grid and client components share one canonical shape
export interface DisplayDocument {
  id: string;
  name: string;
  category: string;
  productType?: string;
  format?: string;
  fileUrl?: string;
  previewImage?: string;
  fileSize?: string;
  downloads?: number;
}

interface TechDocumentCardProps {
  doc: DisplayDocument;
  viewMode: 'grid' | 'list';
  language: 'en' | 'ar';
  isDownloading: boolean;
  unavailable: boolean;
  onDownload: (doc: DisplayDocument) => void;
  idx: number;
}

// Maps category string (CMS full name or static key) to a Phosphor icon
function getCategoryIcon(category: string) {
  const k = category.toLowerCase();
  if (k.includes('specification') || k === 'specs') return FileText;
  if (k.includes('cad'))                              return Layers;
  if (k.includes('installation'))                     return Wrench;
  if (k.includes('maintenance'))                      return Package;
  if (k.includes('brochure'))                         return BookOpen;
  if (k.includes('certification'))                    return Medal;
  return FolderOpen;
}

export default function TechDocumentCard({
  doc, viewMode, language, isDownloading, unavailable, onDownload, idx,
}: TechDocumentCardProps) {
  const Icon = getCategoryIcon(doc.category);
  const downloadLabel = language === 'en' ? 'Download' : 'تحميل';
  const downloadingLabel = language === 'en' ? 'Downloading…' : 'جارٍ التحميل…';
  const unavailableLabel = language === 'en' ? 'File not available yet.' : 'الملف غير متاح بعد.';

  if (viewMode === 'list') {
    return (
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="bg-white border border-border-light hover:border-silver-material hover:shadow-[0_10px_40px_rgba(45,41,38,0.12)] transition-all p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-surface-cream flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6 text-brand-red" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-ink-heading mb-1">{doc.name}</h3>
            <div className="flex items-center gap-3 text-sm text-ink-muted flex-wrap">
              <span>{doc.category}</span>
              {doc.fileSize && <><span>•</span><span>{doc.fileSize}</span></>}
              {doc.format && <><span>•</span><span>{doc.format}</span></>}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <div className="flex gap-2">
              <button onClick={() => onDownload(doc)} disabled={isDownloading}
                className="px-6 py-2 bg-brand-red hover:bg-brand-red-deep text-white font-semibold flex items-center gap-2 disabled:opacity-70 disabled:cursor-wait transition-colors">
                {isDownloading
                  ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{downloadingLabel}</>
                  : <><Download className="w-4 h-4" />{downloadLabel}</>
                }
              </button>
              <button className="px-3 py-2 border border-border-light hover:border-brand-red transition-colors">
                <Eye className="w-4 h-4 text-ink-body" />
              </button>
            </div>
            {unavailable && <p className="text-xs font-semibold text-brand-red" role="alert">{unavailableLabel}</p>}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" transition={{ delay: idx * 0.04 }}
      className="bg-white border border-border-light hover:border-silver-material hover:shadow-[0_10px_40px_rgba(45,41,38,0.12)] transition-all overflow-hidden">
      {doc.previewImage && (
        <div className="relative h-48 overflow-hidden bg-surface-cream">
          <Image src={doc.previewImage} alt={doc.name} fill className="object-cover" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
          {doc.format && (
            <span className="absolute top-3 end-3 px-2 py-0.5 bg-white/90 text-xs font-bold text-brand-red">{doc.format}</span>
          )}
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-surface-cream flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-brand-red" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-ink-heading mb-1 line-clamp-2">{doc.name}</h3>
            <p className="text-sm text-ink-muted">{doc.category}</p>
          </div>
        </div>
        {doc.fileSize && <p className="text-sm text-ink-muted mb-4">{doc.fileSize}</p>}
        <div className="flex gap-2">
          <button onClick={() => onDownload(doc)} disabled={isDownloading}
            className="flex-1 px-4 py-2 bg-brand-red hover:bg-brand-red-deep text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait transition-colors">
            {isDownloading
              ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{downloadingLabel}</>
              : <><Download className="w-4 h-4" />{downloadLabel}</>
            }
          </button>
          <button className="px-3 py-2 border border-border-light hover:border-brand-red transition-colors">
            <Eye className="w-4 h-4 text-ink-body" />
          </button>
        </div>
        {unavailable && <p className="mt-2 text-xs font-semibold text-brand-red" role="alert">{unavailableLabel}</p>}
      </div>
    </motion.div>
  );
}
