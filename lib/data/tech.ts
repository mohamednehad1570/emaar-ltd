// lib/data/tech.ts — Bilingual content for the Technical Downloads page.

export interface TechContent {
  hero: { title: string; subtitle: string; description: string };
  categories: Record<string, string>;
  productFilter: Record<string, string>;
  search: { placeholder: string; noResults: string };
  stats: { number: string; label: string }[];
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
