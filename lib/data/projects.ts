/**
 * lib/data/projects.ts
 * Bilingual project data shared between the portfolio grid and detail pages.
 * Extracted from ProjectsGrid.tsx to enable server-side static generation.
 */

export interface Project {
  id: number;
  title: { en: string; ar: string };
  category: { en: string; ar: string };
  location: { en: string; ar: string };
  description: { en: string; ar: string };
  image: string;
  /* Three gallery images shown on the detail page */
  gallery: string[];
  year: string;
  type: string;
  material: string;
  client: { en: string; ar: string };
  scope: { en: string; ar: string };
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: { en: 'Luxury Villa Complex', ar: 'مجمع فلل فاخر' },
    category: { en: 'Residential', ar: 'سكني' },
    location: { en: 'Palm Jumeirah, Dubai', ar: 'نخلة جميرا، دبي' },
    description: {
      en: 'A prestigious collection of 24 luxury villas featuring floor-to-ceiling uPVC windows and sliding doors. The project demanded exacting thermal performance standards and acoustic isolation for complete privacy in one of Dubai\'s most coveted addresses.',
      ar: 'مجموعة مرموقة مكونة من 24 فيلا فاخرة تضم نوافذ uPVC من الأرضية إلى السقف وأبواب منزلقة. تطلب المشروع معايير أداء حرارية دقيقة وعزلاً صوتياً لضمان الخصوصية التامة في أحد أكثر عناوين دبي مكانةً.',
    },
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-22b5c1275efb?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    ],
    year: '2023',
    type: 'residential',
    material: 'upvc',
    client: { en: 'Emaar Properties', ar: 'إعمار العقارية' },
    scope: { en: 'Windows & Sliding Doors', ar: 'النوافذ والأبواب المنزلقة' },
  },
  {
    id: 2,
    title: { en: 'Skyline Tower', ar: 'برج الأفق' },
    category: { en: 'Commercial', ar: 'تجاري' },
    location: { en: 'Downtown Dubai', ar: 'وسط مدينة دبي' },
    description: {
      en: 'A 42-storey commercial tower clad in a structural aluminium curtain wall system. The high-rise required wind-load engineering up to 2.0 kPa, high-performance solar control glazing, and unitised facade panels installed via climbing crane.',
      ar: 'برج تجاري مكون من 42 طابقاً مكسوٌ بنظام واجهة ستائرية ألومنيومية هيكلية. تطلب الناطحة تصميماً هندسياً لتحمل أحمال الرياح تصل إلى 2.0 كيلو باسكال وزجاجاً عالي الأداء للتحكم الشمسي وألواح واجهة وحدوية مثبتة بواسطة رافعة متسلقة.',
    },
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1519567241046-7f570eee3c9e?w=800&q=80',
    ],
    year: '2022',
    type: 'commercial',
    material: 'aluminum',
    client: { en: 'Dubai Properties Group', ar: 'مجموعة دبي للعقارات' },
    scope: { en: 'Curtain Wall & Facade', ar: 'الواجهة الستائرية والكسوة الخارجية' },
  },
  {
    id: 3,
    title: { en: 'Modern Office Hub', ar: 'مركز مكاتب حديث' },
    category: { en: 'Commercial', ar: 'تجاري' },
    location: { en: 'Business Bay', ar: 'الخليج التجاري' },
    description: {
      en: 'A Grade-A office complex demanding slim aluminium window profiles to maximise glazed area ratios while meeting DEWA energy performance requirements. The thermally broken frames achieved a Uw value below 1.8 W/m²K.',
      ar: 'مجمع مكاتب من الفئة A يتطلب قطاعات نوافذ ألومنيومية رفيعة لتعظيم نسب المساحات الزجاجية مع استيفاء متطلبات أداء الطاقة الصادرة عن هيئة كهرباء ومياه دبي. حققت الإطارات المعزولة حرارياً قيمة Uw أقل من 1.8 واط/م²ك.',
    },
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
    ],
    year: '2023',
    type: 'commercial',
    material: 'aluminum',
    client: { en: 'Sobha Realty', ar: 'سوبها ريالتي' },
    scope: { en: 'Aluminium Windows & Spandrels', ar: 'نوافذ ألومنيوم وألواح إطار' },
  },
  {
    id: 4,
    title: { en: 'Seaside Resort', ar: 'منتجع ساحلي' },
    category: { en: 'Hospitality', ar: 'ضيافة' },
    location: { en: 'Saadiyat Island', ar: 'جزيرة السعديات' },
    description: {
      en: 'A beachfront five-star resort where uPVC systems were chosen for their exceptional resistance to salt-laden coastal air. All 186 guest rooms received custom-profiled sliding doors opening directly onto private terraces facing the Arabian Gulf.',
      ar: 'منتجع ساحلي خمس نجوم على الشاطئ، تم اختيار أنظمة uPVC فيه لمقاومتها الاستثنائية للهواء الساحلي المشبع بالأملاح. حصلت جميع الغرف الـ 186 على أبواب منزلقة بقطاعات مخصصة تفتح مباشرةً على شرفات خاصة تطل على الخليج العربي.',
    },
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1542385412-42e58a804825?w=800&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    ],
    year: '2021',
    type: 'hospitality',
    material: 'upvc',
    client: { en: 'Abu Dhabi Tourism Authority', ar: 'هيئة أبوظبي للسياحة' },
    scope: { en: 'Sliding Doors & Fixed Panels', ar: 'الأبواب المنزلقة والألواح الثابتة' },
  },
  {
    id: 5,
    title: { en: 'Private Mansion', ar: 'قصر خاص' },
    category: { en: 'Residential', ar: 'سكني' },
    location: { en: 'Emirates Hills', ar: 'تلال الإمارات' },
    description: {
      en: 'A bespoke residence for a private client requiring slim-sightline aluminium frames in RAL 9005 jet-black powder coat. Custom bi-fold door systems spanning up to 6m openings connect the interior living spaces to the landscaped gardens.',
      ar: 'منزل مخصص لعميل خاص يتطلب إطارات ألومنيوم رفيعة بطلاء مسحوق RAL 9005 أسود حالك. تربط أنظمة أبواب قابلة للطي تصل إلى 6 أمتار مساحات المعيشة الداخلية بالحدائق المشذبة.',
    },
    image: 'https://images.unsplash.com/photo-1600596542815-22b5c1275efb?w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-22b5c1275efb?w=800&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    ],
    year: '2022',
    type: 'residential',
    material: 'aluminum',
    client: { en: 'Private Client', ar: 'عميل خاص' },
    scope: { en: 'Bi-fold Doors & Windows', ar: 'الأبواب القابلة للطي والنوافذ' },
  },
  {
    id: 6,
    title: { en: 'Shopping Mall Facade', ar: 'واجهة مركز تسوق' },
    category: { en: 'Commercial', ar: 'تجاري' },
    location: { en: 'Yas Island', ar: 'جزيرة ياس' },
    description: {
      en: 'A landmark retail destination featuring over 4,200 m² of custom aluminium facade system with integrated LED lighting channels. The curved double-skin facade required CNC-precision extrusions and on-site bending to achieve the architect\'s vision.',
      ar: 'وجهة تجزئة بارزة تضم أكثر من 4,200 م² من نظام واجهة ألومنيوم مخصص مع قنوات إضاءة LED مدمجة. تطلبت الواجهة المزدوجة المنحنية بثقاً بدقة CNC وثنياً في الموقع لتحقيق رؤية المهندس المعماري.',
    },
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3c9e?w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519567241046-7f570eee3c9e?w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    ],
    year: '2020',
    type: 'commercial',
    material: 'aluminum',
    client: { en: 'Aldar Properties', ar: 'الدار العقارية' },
    scope: { en: 'Custom Facade System', ar: 'نظام واجهة مخصص' },
  },
];
