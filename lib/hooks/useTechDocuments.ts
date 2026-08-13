import { useMemo } from 'react';
import type { TechDocument } from '@/lib/sanity/types';
import type { TechContent } from '@/lib/data/tech';
import type { DisplayDocument } from '@/components/technical/TechDocumentCard';

interface FilterOption { key: string; label: string }

export interface UseTechDocumentsResult {
  allDocuments: DisplayDocument[];
  categoryOptions: FilterOption[];
  productTypeOptions: FilterOption[];
}

// Normalises CMS or static document data into a unified shape and builds
// the filter option lists for category tabs and product-type chips.
export function useTechDocuments(
  cmsDocs: TechDocument[],
  sd: TechContent,
  language: 'en' | 'ar',
): UseTechDocumentsResult {
  const usingCMS = cmsDocs.length > 0;

  const allDocuments = useMemo((): DisplayDocument[] => {
    if (usingCMS) {
      return cmsDocs.map(doc => ({
        id: doc._id,
        name: doc.name[language] ?? doc.name.en,
        category: doc.category,
        productType: doc.productType,
        format: doc.format,
        fileUrl: doc.fileUrl,
        previewImage: doc.previewImage,
        fileSize: doc.fileSize,
      }));
    }
    return sd.files.map(f => ({
      id: String(f.id),
      name: f.name,
      category: f.category,
      productType: f.productType,
      format: f.format,
      fileUrl: f.downloadUrl,
      previewImage: f.preview,
      fileSize: f.size,
      downloads: f.downloads,
    }));
  }, [cmsDocs, sd.files, language, usingCMS]);

  const categoryOptions = useMemo((): FilterOption[] => {
    const allLabel = language === 'en' ? 'All Resources' : 'جميع الموارد';
    if (usingCMS) {
      const unique = [...new Set(allDocuments.map(d => d.category))].filter(Boolean);
      return [{ key: 'all', label: allLabel }, ...unique.map(c => ({ key: c, label: c }))];
    }
    return Object.entries(sd.categories).map(([key, label]) => ({ key, label }));
  }, [allDocuments, sd.categories, language, usingCMS]);

  const productTypeOptions = useMemo((): FilterOption[] => {
    const allLabel = language === 'en' ? 'All Products' : 'جميع المنتجات';
    if (usingCMS) {
      const unique = [...new Set(allDocuments.map(d => d.productType).filter(Boolean))] as string[];
      return [{ key: 'all', label: allLabel }, ...unique.map(p => ({ key: p, label: p }))];
    }
    return Object.entries(sd.productFilter).map(([key, label]) => ({ key, label }));
  }, [allDocuments, sd.productFilter, language, usingCMS]);

  return { allDocuments, categoryOptions, productTypeOptions };
}
