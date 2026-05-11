// lib/data/tech.ts — Bilingual content for the Technical Downloads page.

export interface DownloadFile {
  id: number; name: string; category: string; type: string;
  size: string; format: string; date: string; downloads: number;
  preview?: string; productType?: string;
  /* Relative path served from /public/downloads/ — undefined means file pending */
  downloadUrl?: string;
}

export interface TechContent {
  hero: { title: string; subtitle: string; description: string };
  categories: Record<string, string>;
  productFilter: Record<string, string>;
  search: { placeholder: string; noResults: string };
  stats: { number: string; label: string }[];
  files: DownloadFile[];
  actions: Record<string, string>;
  cta: { title: string; description: string; button: string };
}

export const techData: Record<"en" | "ar", TechContent> = {
    en: {
      hero: {
        title: 'Technical Resources',
        subtitle: 'Download Center',
        description: 'Access our complete library of technical specifications, CAD files, installation guides, and certification documents.'
      },
      categories: {
        all: 'All Resources',
        specs: 'Product Specifications',
        cad: 'CAD Files',
        installation: 'Installation Guides',
        maintenance: 'Maintenance Manuals',
        brochures: 'Brochures & Catalogs',
        certifications: 'Certifications'
      },
      productFilter: {
        title: 'Filter by Product',
        all: 'All Products',
        upvc: 'uPVC Systems',
        aluminum: 'Aluminum Systems',
        hardware: 'Hardware & Accessories',
        glass: 'Glass & Glazing'
      },
      search: {
        placeholder: 'Search documents...',
        noResults: 'No documents found. Try different search terms.'
      },
      stats: [
        { number: '150+', label: 'Documents' },
        { number: '50+', label: 'CAD Files' },
        { number: '25+', label: 'Video Guides' },
        { number: '10+', label: 'Certifications' }
      ],
      files: [
        // Product Specifications
        {
          id: 1,
          name: 'uPVC Window Systems - Complete Technical Specifications',
          category: 'specs',
          type: 'Product Specification',
          size: '2.4 MB',
          format: 'PDF',
          date: '2024-10-15',
          downloads: 1250,
          productType: 'upvc',
          downloadUrl: '/downloads/upvc-window-systems-technical-specifications.pdf',
          preview: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=400&h=300&fit=crop'
        },
        {
          id: 2,
          name: 'Aluminum Door Systems - Technical Data Sheet',
          category: 'specs',
          type: 'Product Specification',
          size: '1.8 MB',
          format: 'PDF',
          date: '2024-10-12',
          downloads: 980,
          productType: 'aluminum',
          downloadUrl: '/downloads/aluminum-door-systems-technical-data-sheet.pdf',
          preview: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
        },
        {
          id: 3,
          name: 'Sliding Systems - Performance Data',
          category: 'specs',
          type: 'Product Specification',
          size: '1.5 MB',
          format: 'PDF',
          date: '2024-09-28',
          downloads: 765,
          productType: 'upvc',
          downloadUrl: '/downloads/sliding-systems-performance-data.pdf',
          preview: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop'
        },
        {
          id: 4,
          name: 'Curtain Wall Systems - Engineering Specifications',
          category: 'specs',
          type: 'Product Specification',
          size: '3.2 MB',
          format: 'PDF',
          date: '2024-09-15',
          downloads: 654,
          productType: 'aluminum',
          downloadUrl: '/downloads/curtain-wall-systems-engineering-specifications.pdf',
          preview: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop'
        },
        {
          id: 5,
          name: 'Hardware & Locks - Technical Catalog',
          category: 'specs',
          type: 'Product Specification',
          size: '5.1 MB',
          format: 'PDF',
          date: '2024-08-22',
          downloads: 432,
          productType: 'hardware',
          downloadUrl: '/downloads/hardware-locks-technical-catalog.pdf',
          preview: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
        },

        // CAD Files
        {
          id: 6,
          name: 'uPVC Casement Window - CAD Drawing',
          category: 'cad',
          type: 'CAD File',
          size: '850 KB',
          format: 'DWG',
          date: '2024-10-20',
          downloads: 2100,
          productType: 'upvc',
          downloadUrl: '/downloads/upvc-casement-window-cad-drawing.dwg',
          preview: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop'
        },
        {
          id: 7,
          name: 'Aluminum Sliding Door - 3D Model',
          category: 'cad',
          type: 'CAD File',
          size: '1.2 MB',
          format: 'DWG',
          date: '2024-10-18',
          downloads: 1890,
          productType: 'aluminum',
          downloadUrl: '/downloads/aluminum-sliding-door-3d-model.dwg',
          preview: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop'
        },
        {
          id: 8,
          name: 'Tilt & Turn Window System - CAD Details',
          category: 'cad',
          type: 'CAD File',
          size: '950 KB',
          format: 'DWG',
          date: '2024-10-10',
          downloads: 1560,
          productType: 'upvc',
          downloadUrl: '/downloads/tilt-turn-window-system-cad-details.dwg',
          preview: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop'
        },
        {
          id: 9,
          name: 'Curtain Wall Section Details - CAD Library',
          category: 'cad',
          type: 'CAD File',
          size: '2.8 MB',
          format: 'DWG',
          date: '2024-09-25',
          downloads: 1340,
          productType: 'aluminum',
          downloadUrl: '/downloads/curtain-wall-section-details-cad-library.dwg',
          preview: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop'
        },
        {
          id: 10,
          name: 'Complete uPVC Systems - CAD Block Library',
          category: 'cad',
          type: 'CAD File',
          size: '8.5 MB',
          format: 'ZIP',
          date: '2024-08-30',
          downloads: 3250,
          productType: 'upvc',
          downloadUrl: '/downloads/complete-upvc-systems-cad-block-library.zip',
          preview: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop'
        },

        // Installation Guides
        {
          id: 11,
          name: 'uPVC Window Installation - Step by Step Guide',
          category: 'installation',
          type: 'Installation Guide',
          size: '4.2 MB',
          format: 'PDF',
          date: '2024-10-05',
          downloads: 2850,
          productType: 'upvc',
          downloadUrl: '/downloads/upvc-window-installation-guide.pdf',
          preview: 'https://images.unsplash.com/photo-1581094794329-c8112d38e1e4?w=400&h=300&fit=crop'
        },
        {
          id: 12,
          name: 'Aluminum Door Installation Manual',
          category: 'installation',
          type: 'Installation Guide',
          size: '3.8 MB',
          format: 'PDF',
          date: '2024-09-20',
          downloads: 2340,
          productType: 'aluminum',
          downloadUrl: '/downloads/aluminum-door-installation-manual.pdf',
          preview: 'https://images.unsplash.com/photo-1581094794329-c8112d38e1e4?w=400&h=300&fit=crop'
        },
        {
          id: 13,
          name: 'Curtain Wall Installation Guide',
          category: 'installation',
          type: 'Installation Guide',
          size: '6.5 MB',
          format: 'PDF',
          date: '2024-09-10',
          downloads: 1890,
          productType: 'aluminum',
          downloadUrl: '/downloads/curtain-wall-installation-guide.pdf',
          preview: 'https://images.unsplash.com/photo-1581094794329-c8112d38e1e4?w=400&h=300&fit=crop'
        },
        {
          id: 14,
          name: 'Hardware Installation & Adjustment Guide',
          category: 'installation',
          type: 'Installation Guide',
          size: '2.1 MB',
          format: 'PDF',
          date: '2024-08-15',
          downloads: 1650,
          productType: 'hardware',
          downloadUrl: '/downloads/hardware-installation-adjustment-guide.pdf',
          preview: 'https://images.unsplash.com/photo-1581094794329-c8112d38e1e4?w=400&h=300&fit=crop'
        },

        // Maintenance Manuals
        {
          id: 15,
          name: 'uPVC Systems - Maintenance & Care Manual',
          category: 'maintenance',
          type: 'Maintenance Manual',
          size: '1.9 MB',
          format: 'PDF',
          date: '2024-10-01',
          downloads: 1560,
          productType: 'upvc',
          downloadUrl: '/downloads/upvc-systems-maintenance-care-manual.pdf',
          preview: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop'
        },
        {
          id: 16,
          name: 'Aluminum Systems - Maintenance Schedule',
          category: 'maintenance',
          type: 'Maintenance Manual',
          size: '1.7 MB',
          format: 'PDF',
          date: '2024-09-18',
          downloads: 1340,
          productType: 'aluminum',
          downloadUrl: '/downloads/aluminum-systems-maintenance-schedule.pdf',
          preview: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop'
        },
        {
          id: 17,
          name: 'Preventive Maintenance Checklist',
          category: 'maintenance',
          type: 'Maintenance Manual',
          size: '850 KB',
          format: 'PDF',
          date: '2024-08-25',
          downloads: 2100,
          productType: 'upvc',
          downloadUrl: '/downloads/preventive-maintenance-checklist.pdf',
          preview: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop'
        },
        {
          id: 18,
          name: 'Troubleshooting Common Issues',
          category: 'maintenance',
          type: 'Maintenance Manual',
          size: '1.2 MB',
          format: 'PDF',
          date: '2024-07-30',
          downloads: 1780,
          productType: 'upvc',
          downloadUrl: '/downloads/troubleshooting-common-issues.pdf',
          preview: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop'
        },

        // Brochures & Catalogs
        {
          id: 19,
          name: 'EMAAR International - Complete Product Catalog 2024',
          category: 'brochures',
          type: 'Catalog',
          size: '15.2 MB',
          format: 'PDF',
          date: '2024-01-15',
          downloads: 5670,
          productType: 'upvc',
          downloadUrl: '/downloads/emaar-complete-product-catalog-2024.pdf',
          preview: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop'
        },
        {
          id: 20,
          name: 'uPVC Windows & Doors - Product Brochure',
          category: 'brochures',
          type: 'Brochure',
          size: '8.4 MB',
          format: 'PDF',
          date: '2024-02-20',
          downloads: 4230,
          productType: 'upvc',
          downloadUrl: '/downloads/upvc-windows-doors-product-brochure.pdf',
          preview: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop'
        },
        {
          id: 21,
          name: 'Aluminum Systems - Commercial Solutions',
          category: 'brochures',
          type: 'Brochure',
          size: '10.1 MB',
          format: 'PDF',
          date: '2024-02-15',
          downloads: 3890,
          productType: 'aluminum',
          downloadUrl: '/downloads/aluminum-systems-commercial-solutions.pdf',
          preview: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop'
        },
        {
          id: 22,
          name: 'Energy Efficiency Guide',
          category: 'brochures',
          type: 'Guide',
          size: '3.2 MB',
          format: 'PDF',
          date: '2024-03-10',
          downloads: 2560,
          productType: 'upvc',
          downloadUrl: '/downloads/energy-efficiency-guide.pdf',
          preview: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop'
        },

        // Certifications
        {
          id: 23,
          name: 'ISO 9001:2015 Quality Management Certificate',
          category: 'certifications',
          type: 'Certificate',
          size: '450 KB',
          format: 'PDF',
          date: '2023-06-01',
          downloads: 1890,
          productType: 'upvc',
          downloadUrl: '/downloads/iso-9001-quality-management-certificate.pdf',
          preview: 'https://images.unsplash.com/photo-1554224311-beee2ade6d7d?w=400&h=300&fit=crop'
        },
        {
          id: 24,
          name: 'UAE Quality Mark Certification',
          category: 'certifications',
          type: 'Certificate',
          size: '520 KB',
          format: 'PDF',
          date: '2022-08-15',
          downloads: 1650,
          productType: 'upvc',
          downloadUrl: '/downloads/uae-quality-mark-certification.pdf',
          preview: 'https://images.unsplash.com/photo-1554224311-beee2ade6d7d?w=400&h=300&fit=crop'
        },
        {
          id: 25,
          name: 'Green Building Certification',
          category: 'certifications',
          type: 'Certificate',
          size: '380 KB',
          format: 'PDF',
          date: '2024-01-20',
          downloads: 1420,
          productType: 'upvc',
          downloadUrl: '/downloads/green-building-certification.pdf',
          preview: 'https://images.unsplash.com/photo-1554224311-beee2ade6d7d?w=400&h=300&fit=crop'
        },
        {
          id: 26,
          name: 'CE Marking Certificate',
          category: 'certifications',
          type: 'Certificate',
          size: '410 KB',
          format: 'PDF',
          date: '2023-03-12',
          downloads: 1230,
          productType: 'aluminum',
          downloadUrl: '/downloads/ce-marking-certificate.pdf',
          preview: 'https://images.unsplash.com/photo-1554224311-beee2ade6d7d?w=400&h=300&fit=crop'
        },
        {
          id: 27,
          name: 'Fire Safety Test Reports',
          category: 'certifications',
          type: 'Test Report',
          size: '2.8 MB',
          format: 'PDF',
          date: '2023-11-08',
          downloads: 980,
          productType: 'aluminum',
          downloadUrl: '/downloads/fire-safety-test-reports.pdf',
          preview: 'https://images.unsplash.com/photo-1554224311-beee2ade6d7d?w=400&h=300&fit=crop'
        },
        {
          id: 28,
          name: 'Acoustic Performance Test Reports',
          category: 'certifications',
          type: 'Test Report',
          size: '1.9 MB',
          format: 'PDF',
          date: '2023-09-22',
          downloads: 850,
          productType: 'upvc',
          downloadUrl: '/downloads/acoustic-performance-test-reports.pdf',
          preview: 'https://images.unsplash.com/photo-1554224311-beee2ade6d7d?w=400&h=300&fit=crop'
        }
      ],
      actions: {
        download: 'Download',
        preview: 'Preview',
        downloadAll: 'Download All',
        viewMode: 'View Mode',
        grid: 'Grid',
        list: 'List'
      },
      cta: {
        title: 'Need Custom Documentation?',
        description: 'Contact our technical team for project-specific drawings and specifications',
        button: 'Contact Technical Team'
      }
    },
    ar: {
      hero: {
        title: 'الموارد التقنية',
        subtitle: 'مركز التحميل',
        description: 'الوصول إلى مكتبتنا الكاملة من المواصفات التقنية وملفات CAD وأدلة التركيب ووثائق الاعتماد.'
      },
      categories: {
        all: 'جميع الموارد',
        specs: 'مواصفات المنتج',
        cad: 'ملفات CAD',
        installation: 'أدلة التركيب',
        maintenance: 'دليل الصيانة',
        brochures: 'الكتيبات والكتالوجات',
        certifications: 'الشهادات'
      },
      productFilter: {
        title: 'تصفية حسب المنتج',
        all: 'جميع المنتجات',
        upvc: 'أنظمة uPVC',
        aluminum: 'أنظمة الألومنيوم',
        hardware: 'الأجهزة والإكسسوارات',
        glass: 'الزجاج والتزجيج'
      },
      search: {
        placeholder: 'البحث في المستندات...',
        noResults: 'لم يتم العثور على مستندات. جرب مصطلحات بحث مختلفة.'
      },
      stats: [
        { number: '150+', label: 'وثيقة' },
        { number: '50+', label: 'ملف CAD' },
        { number: '25+', label: 'دليل فيديو' },
        { number: '10+', label: 'شهادة' }
      ],
      files: [
        // مواصفات المنتج
        {
          id: 1,
          name: 'أنظمة نوافذ uPVC - المواصفات التقنية الكاملة',
          category: 'specs',
          type: 'مواصفات المنتج',
          size: '2.4 ميجابايت',
          format: 'PDF',
          date: '2024-10-15',
          downloads: 1250,
          productType: 'upvc',
          downloadUrl: '/downloads/upvc-window-systems-technical-specifications.pdf',
          preview: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=400&h=300&fit=crop'
        },
        {
          id: 2,
          name: 'أنظمة أبواب الألومنيوم - ورقة البيانات التقنية',
          category: 'specs',
          type: 'مواصفات المنتج',
          size: '1.8 ميجابايت',
          format: 'PDF',
          date: '2024-10-12',
          downloads: 980,
          productType: 'aluminum',
          downloadUrl: '/downloads/aluminum-door-systems-technical-data-sheet.pdf',
          preview: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
        },
        {
          id: 3,
          name: 'أنظمة الانزلاق - بيانات الأداء',
          category: 'specs',
          type: 'مواصفات المنتج',
          size: '1.5 ميجابايت',
          format: 'PDF',
          date: '2024-09-28',
          downloads: 765,
          productType: 'upvc',
          downloadUrl: '/downloads/sliding-systems-performance-data.pdf',
          preview: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop'
        },
        {
          id: 4,
          name: 'أنظمة الجدران الستائرية - المواصفات الهندسية',
          category: 'specs',
          type: 'مواصفات المنتج',
          size: '3.2 ميجابايت',
          format: 'PDF',
          date: '2024-09-15',
          downloads: 654,
          productType: 'aluminum',
          downloadUrl: '/downloads/curtain-wall-systems-engineering-specifications.pdf',
          preview: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop'
        },
        {
          id: 5,
          name: 'الأجهزة والأقفال - كتالوج تقني',
          category: 'specs',
          type: 'مواصفات المنتج',
          size: '5.1 ميجابايت',
          format: 'PDF',
          date: '2024-08-22',
          downloads: 432,
          productType: 'hardware',
          downloadUrl: '/downloads/hardware-locks-technical-catalog.pdf',
          preview: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
        },

        // ملفات CAD
        {
          id: 6,
          name: 'نافذة كاسمنت uPVC - رسم CAD',
          category: 'cad',
          type: 'ملف CAD',
          size: '850 كيلوبايت',
          format: 'DWG',
          date: '2024-10-20',
          downloads: 2100,
          productType: 'upvc',
          downloadUrl: '/downloads/upvc-casement-window-cad-drawing.dwg',
          preview: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop'
        },
        {
          id: 7,
          name: 'باب انزلاق الألومنيوم - نموذج ثلاثي الأبعاد',
          category: 'cad',
          type: 'ملف CAD',
          size: '1.2 ميجابايت',
          format: 'DWG',
          date: '2024-10-18',
          downloads: 1890,
          productType: 'aluminum',
          downloadUrl: '/downloads/aluminum-sliding-door-3d-model.dwg',
          preview: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop'
        },
        {
          id: 8,
          name: 'نظام نافذة الإمالة والدوران - تفاصيل CAD',
          category: 'cad',
          type: 'ملف CAD',
          size: '950 كيلوبايت',
          format: 'DWG',
          date: '2024-10-10',
          downloads: 1560,
          productType: 'upvc',
          downloadUrl: '/downloads/tilt-turn-window-system-cad-details.dwg',
          preview: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop'
        },
        {
          id: 9,
          name: 'تفاصيل قسم الجدار الستائري - مكتبة CAD',
          category: 'cad',
          type: 'ملف CAD',
          size: '2.8 ميجابايت',
          format: 'DWG',
          date: '2024-09-25',
          downloads: 1340,
          productType: 'aluminum',
          downloadUrl: '/downloads/curtain-wall-section-details-cad-library.dwg',
          preview: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop'
        },
        {
          id: 10,
          name: 'أنظمة uPVC الكاملة - مكتبة كتل CAD',
          category: 'cad',
          type: 'ملف CAD',
          size: '8.5 ميجابايت',
          format: 'ZIP',
          date: '2024-08-30',
          downloads: 3250,
          productType: 'upvc',
          downloadUrl: '/downloads/complete-upvc-systems-cad-block-library.zip',
          preview: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop'
        },

        // أدلة التركيب
        {
          id: 11,
          name: 'تركيب نافذة uPVC - دليل خطوة بخطوة',
          category: 'installation',
          type: 'دليل التركيب',
          size: '4.2 ميجابايت',
          format: 'PDF',
          date: '2024-10-05',
          downloads: 2850,
          productType: 'upvc',
          downloadUrl: '/downloads/upvc-window-installation-guide.pdf',
          preview: 'https://images.unsplash.com/photo-1581094794329-c8112d38e1e4?w=400&h=300&fit=crop'
        },
        {
          id: 12,
          name: 'دليل تركيب باب الألومنيوم',
          category: 'installation',
          type: 'دليل التركيب',
          size: '3.8 ميجابايت',
          format: 'PDF',
          date: '2024-09-20',
          downloads: 2340,
          productType: 'aluminum',
          downloadUrl: '/downloads/aluminum-door-installation-manual.pdf',
          preview: 'https://images.unsplash.com/photo-1581094794329-c8112d38e1e4?w=400&h=300&fit=crop'
        },
        {
          id: 13,
          name: 'دليل تركيب الجدار الستائري',
          category: 'installation',
          type: 'دليل التركيب',
          size: '6.5 ميجابايت',
          format: 'PDF',
          date: '2024-09-10',
          downloads: 1890,
          productType: 'aluminum',
          downloadUrl: '/downloads/curtain-wall-installation-guide.pdf',
          preview: 'https://images.unsplash.com/photo-1581094794329-c8112d38e1e4?w=400&h=300&fit=crop'
        },
        {
          id: 14,
          name: 'دليل تركيب وتعديل الأجهزة',
          category: 'installation',
          type: 'دليل التركيب',
          size: '2.1 ميجابايت',
          format: 'PDF',
          date: '2024-08-15',
          downloads: 1650,
          productType: 'hardware',
          downloadUrl: '/downloads/hardware-installation-adjustment-guide.pdf',
          preview: 'https://images.unsplash.com/photo-1581094794329-c8112d38e1e4?w=400&h=300&fit=crop'
        },

        // أدلة الصيانة
        {
          id: 15,
          name: 'أنظمة uPVC - دليل الصيانة والعناية',
          category: 'maintenance',
          type: 'دليل الصيانة',
          size: '1.9 ميجابايت',
          format: 'PDF',
          date: '2024-10-01',
          downloads: 1560,
          productType: 'upvc',
          downloadUrl: '/downloads/upvc-systems-maintenance-care-manual.pdf',
          preview: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop'
        },
        {
          id: 16,
          name: 'أنظمة الألومنيوم - جدول الصيانة',
          category: 'maintenance',
          type: 'دليل الصيانة',
          size: '1.7 ميجابايت',
          format: 'PDF',
          date: '2024-09-18',
          downloads: 1340,
          productType: 'aluminum',
          downloadUrl: '/downloads/aluminum-systems-maintenance-schedule.pdf',
          preview: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop'
        },
        {
          id: 17,
          name: 'قائمة فحص الصيانة الوقائية',
          category: 'maintenance',
          type: 'دليل الصيانة',
          size: '850 كيلوبايت',
          format: 'PDF',
          date: '2024-08-25',
          downloads: 2100,
          productType: 'upvc',
          downloadUrl: '/downloads/preventive-maintenance-checklist.pdf',
          preview: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop'
        },
        {
          id: 18,
          name: 'استكشاف المشاكل الشائعة وإصلاحها',
          category: 'maintenance',
          type: 'دليل الصيانة',
          size: '1.2 ميجابايت',
          format: 'PDF',
          date: '2024-07-30',
          downloads: 1780,
          productType: 'upvc',
          downloadUrl: '/downloads/troubleshooting-common-issues.pdf',
          preview: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop'
        },

        // الكتيبات والكتالوجات
        {
          id: 19,
          name: 'إعمار الدولية - كتالوج المنتجات الكامل 2024',
          category: 'brochures',
          type: 'كتالوج',
          size: '15.2 ميجابايت',
          format: 'PDF',
          date: '2024-01-15',
          downloads: 5670,
          productType: 'upvc',
          downloadUrl: '/downloads/emaar-complete-product-catalog-2024.pdf',
          preview: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop'
        },
        {
          id: 20,
          name: 'نوافذ وأبواب uPVC - كتيب المنتج',
          category: 'brochures',
          type: 'كتيب',
          size: '8.4 ميجابايت',
          format: 'PDF',
          date: '2024-02-20',
          downloads: 4230,
          productType: 'upvc',
          downloadUrl: '/downloads/upvc-windows-doors-product-brochure.pdf',
          preview: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop'
        },
        {
          id: 21,
          name: 'أنظمة الألومنيوم - الحلول التجارية',
          category: 'brochures',
          type: 'كتيب',
          size: '10.1 ميجابايت',
          format: 'PDF',
          date: '2024-02-15',
          downloads: 3890,
          productType: 'aluminum',
          downloadUrl: '/downloads/aluminum-systems-commercial-solutions.pdf',
          preview: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop'
        },
        {
          id: 22,
          name: 'دليل كفاءة الطاقة',
          category: 'brochures',
          type: 'دليل',
          size: '3.2 ميجابايت',
          format: 'PDF',
          date: '2024-03-10',
          downloads: 2560,
          productType: 'upvc',
          downloadUrl: '/downloads/energy-efficiency-guide.pdf',
          preview: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop'
        },

        // الشهادات
        {
          id: 23,
          name: 'شهادة إدارة الجودة ISO 9001:2015',
          category: 'certifications',
          type: 'شهادة',
          size: '450 كيلوبايت',
          format: 'PDF',
          date: '2023-06-01',
          downloads: 1890,
          productType: 'upvc',
          downloadUrl: '/downloads/iso-9001-quality-management-certificate.pdf',
          preview: 'https://images.unsplash.com/photo-1554224311-beee2ade6d7d?w=400&h=300&fit=crop'
        },
        {
          id: 24,
          name: 'شهادة علامة الجودة الإماراتية',
          category: 'certifications',
          type: 'شهادة',
          size: '520 كيلوبايت',
          format: 'PDF',
          date: '2022-08-15',
          downloads: 1650,
          productType: 'upvc',
          downloadUrl: '/downloads/uae-quality-mark-certification.pdf',
          preview: 'https://images.unsplash.com/photo-1554224311-beee2ade6d7d?w=400&h=300&fit=crop'
        },
        {
          id: 25,
          name: 'شهادة البناء الأخضر',
          category: 'certifications',
          type: 'شهادة',
          size: '380 كيلوبايت',
          format: 'PDF',
          date: '2024-01-20',
          downloads: 1420,
          productType: 'upvc',
          downloadUrl: '/downloads/green-building-certification.pdf',
          preview: 'https://images.unsplash.com/photo-1554224311-beee2ade6d7d?w=400&h=300&fit=crop'
        },
        {
          id: 26,
          name: 'شهادة علامة CE',
          category: 'certifications',
          type: 'شهادة',
          size: '410 كيلوبايت',
          format: 'PDF',
          date: '2023-03-12',
          downloads: 1230,
          productType: 'aluminum',
          downloadUrl: '/downloads/ce-marking-certificate.pdf',
          preview: 'https://images.unsplash.com/photo-1554224311-beee2ade6d7d?w=400&h=300&fit=crop'
        },
        {
          id: 27,
          name: 'تقارير اختبار السلامة من الحرائق',
          category: 'certifications',
          type: 'تقرير الاختبار',
          size: '2.8 ميجابايت',
          format: 'PDF',
          date: '2023-11-08',
          downloads: 980,
          productType: 'aluminum',
          downloadUrl: '/downloads/fire-safety-test-reports.pdf',
          preview: 'https://images.unsplash.com/photo-1554224311-beee2ade6d7d?w=400&h=300&fit=crop'
        },
        {
          id: 28,
          name: 'تقارير اختبار الأداء الصوتي',
          category: 'certifications',
          type: 'تقرير الاختبار',
          size: '1.9 ميجابايت',
          format: 'PDF',
          date: '2023-09-22',
          downloads: 850,
          productType: 'upvc',
          downloadUrl: '/downloads/acoustic-performance-test-reports.pdf',
          preview: 'https://images.unsplash.com/photo-1554224311-beee2ade6d7d?w=400&h=300&fit=crop'
        }
      ],
      actions: {
        download: 'تحميل',
        preview: 'معاينة',
        downloadAll: 'تحميل الكل',
        viewMode: 'وضع العرض',
        grid: 'شبكة',
        list: 'قائمة'
      },
      cta: {
        title: 'هل تحتاج إلى وثائق مخصصة؟',
        description: 'اتصل بفريقنا التقني للحصول على الرسومات والمواصفات الخاصة بالمشروع',
        button: 'اتصل بالفريق التقني'
      }
    }
};
