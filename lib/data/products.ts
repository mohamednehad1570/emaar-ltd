/**
 * lib/data/products.ts
 *
 * Primary source: material → categories[] → products[]
 * Backward-compat: upvcData / aluminumData flat exports retained for existing
 * pages during the transition to 4-level routing (Phase G).
 *
 * Image paths reference public/products/{material}/{category}/ — populated by
 * scripts/rename-products.mjs after the client drops assets into the folders.
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ProductCategory {
  slug:  string;
  label: { en: string; ar: string };
  /** Path to the category cover image used on the L2 material page tiles */
  image: string;
  products: ProductItem[];
}

export interface ProductItem {
  id:          string;
  slug:        string;
  /** Category slug from the parent ProductCategory — passed to L4 route */
  category:    string;
  material:    'upvc' | 'aluminum';
  title:       { en: string; ar: string };
  description: { en: string; ar: string };
  features:    Array<{ en: string; ar: string }>;
  image:       string;
  badge?:      string;
}

// ── uPVC categories ───────────────────────────────────────────────────────────

export const upvcCategories: ProductCategory[] = [
  {
    slug:  'windows',
    label: { en: 'Windows', ar: 'نوافذ' },
    image: '/products/upvc/windows/upvc-window-01.jpg',
    products: [
      {
        id: 'UPVC-W-01', slug: 'tilt-turn-window', category: 'windows', material: 'upvc',
        title:       { en: 'Tilt & Turn Window',    ar: 'نافذة قلاب ودوران'   },
        description: { en: 'Versatile window with dual opening action — inward tilt for ventilation or full turn for easy cleaning. Ideal for high-rise apartments.',
                       ar: 'نافذة متعددة الاستخدامات بآلية فتح مزدوجة — إمالة للداخل للتهوية أو دوران كامل لسهولة التنظيف. مثالية للشقق في الأبراج العالية.' },
        features: [
          { en: 'Dual inward-opening action', ar: 'آلية فتح مزدوج للداخل' },
          { en: 'Multi-point locking system', ar: 'نظام قفل متعدد النقاط'   },
          { en: 'Double or triple glazing',   ar: 'زجاج مزدوج أو ثلاثي'    },
          { en: 'Weather-tight seal',         ar: 'إغلاق محكم ضد العوامل الجوية' },
        ],
        image: '/products/upvc/windows/upvc-window-01.jpg',
      },
      {
        id: 'UPVC-W-02', slug: 'casement-window', category: 'windows', material: 'upvc',
        title:       { en: 'Casement Window',     ar: 'نافذة مفصلية'       },
        description: { en: 'Side-hinged outward-opening window delivering maximum ventilation and slim sightlines.',
                       ar: 'نافذة مفصلية تُفتح للخارج توفر تهوية قصوى وخطوط رؤية نحيلة.' },
        features: [
          { en: 'Full-width ventilation',   ar: 'تهوية عرض كامل'       },
          { en: 'Secure friction hinges',   ar: 'مفصلات احتكاك آمنة'   },
          { en: 'Easy single-handle op.',   ar: 'تشغيل بيد واحدة سهل'  },
        ],
        image: '/products/upvc/windows/upvc-window-02.jpg',
      },
      {
        id: 'UPVC-W-03', slug: 'fixed-light-window', category: 'windows', material: 'upvc',
        title:       { en: 'Fixed Light Window',  ar: 'نافذة ثابتة'        },
        description: { en: 'Non-opening picture window maximising natural light — custom shapes and sizes available.',
                       ar: 'نافذة ثابتة تزيد الإضاءة الطبيعية — متاحة بأشكال وأحجام مخصصة.' },
        features: [
          { en: 'Slim-profile frame',   ar: 'إطار نحيل القطاع'    },
          { en: 'Custom geometries',    ar: 'أشكال هندسية مخصصة'  },
          { en: 'Max thermal performance', ar: 'أعلى أداء حراري'  },
        ],
        image: '/products/upvc/windows/upvc-window-03.jpg',
      },
    ],
  },
  {
    slug:  'doors',
    label: { en: 'Doors', ar: 'أبواب' },
    image: '/products/upvc/doors/upvc-door-01.jpg',
    products: [
      {
        id: 'UPVC-D-01', slug: 'front-door', category: 'doors', material: 'upvc',
        title:       { en: 'Front Door',       ar: 'باب أمامي'              },
        description: { en: 'Secure entrance door with multi-point locks and optional decorative glass panels.',
                       ar: 'باب مدخل آمن بأقفال متعددة النقاط ولوحات زجاجية زخرفية اختيارية.' },
        features: [
          { en: 'Multi-point locking',       ar: 'قفل متعدد النقاط'       },
          { en: 'Optional glass panels',     ar: 'لوحات زجاجية اختيارية'  },
          { en: 'Low threshold option',      ar: 'خيار عتبة منخفضة'       },
          { en: 'Anti-burglary reinforcement', ar: 'تعزيز ضد الاقتحام'   },
        ],
        image: '/products/upvc/doors/upvc-door-01.jpg',
      },
      {
        id: 'UPVC-D-02', slug: 'french-door', category: 'doors', material: 'upvc',
        title:       { en: 'French Doors',    ar: 'أبواب فرنسية'           },
        description: { en: 'Classic double-leaf doors opening outward — ideal for garden access and terraces.',
                       ar: 'أبواب كلاسيكية ذات ورقتين تُفتح للخارج — مثالية للحدائق والتراسات.' },
        features: [
          { en: 'Full clear opening',    ar: 'فتحة شفافة كاملة'     },
          { en: 'Astragal centre seal',  ar: 'ختم مركزي أسترقال'    },
          { en: 'High-security lock',   ar: 'قفل عالي الأمان'       },
        ],
        image: '/products/upvc/doors/upvc-door-02.jpg',
      },
      {
        id: 'UPVC-D-03', slug: 'sliding-patio-door', category: 'doors', material: 'upvc',
        title:       { en: 'Sliding Patio Door', ar: 'باب فناء منزلق'     },
        description: { en: 'Steel-reinforced sliding door with anti-lift mechanism for large balcony openings.',
                       ar: 'باب منزلق مقوى بالفولاذ مع آلية مضادة للرفع لفتحات الشرفات الكبيرة.' },
        features: [
          { en: 'Steel-reinforced sash', ar: 'إطار مقوى بالفولاذ'     },
          { en: 'Anti-lift protection',  ar: 'حماية مضادة للرفع'      },
          { en: 'Smooth roller system',  ar: 'نظام بكرات سلس'         },
        ],
        image: '/products/upvc/doors/upvc-door-03.jpg',
      },
    ],
  },
  {
    slug:  'doors-and-windows',
    label: { en: 'Doors & Windows', ar: 'أبواب ونوافذ' },
    image: '/products/upvc/doors-and-windows/upvc-doors-windows-01.jpg',
    products: [
      {
        id: 'UPVC-DW-01', slug: 'residential-suite', category: 'doors-and-windows', material: 'upvc',
        title:       { en: 'Residential Suite',           ar: 'طقم سكني متكامل'        },
        description: { en: 'Coordinated uPVC door and window package for villas and apartments — consistent profile and colour throughout.',
                       ar: 'طقم متناسق من أبواب ونوافذ uPVC للفلل والشقق — قطاع ولون موحد في جميع أنحاء المبنى.' },
        features: [
          { en: 'Matched sightlines throughout', ar: 'خطوط رؤية متطابقة في كل مكان' },
          { en: 'Single-supplier warranty',      ar: 'ضمان من مورد واحد'              },
          { en: 'Custom RAL colour matching',    ar: 'مطابقة ألوان RAL المخصصة'       },
        ],
        image: '/products/upvc/doors-and-windows/upvc-doors-windows-01.jpg',
        badge: 'Popular',
      },
    ],
  },
  {
    slug:  'staircases',
    label: { en: 'Staircases', ar: 'سلالم' },
    image: '/products/upvc/staircases/upvc-staircase-01.jpg',
    products: [
      {
        id: 'UPVC-S-01', slug: 'pvc-balustrade', category: 'staircases', material: 'upvc',
        title:       { en: 'PVC Balustrade System', ar: 'نظام درابزين PVC'      },
        description: { en: 'Maintenance-free PVC balustrade with matching newel posts for indoor and outdoor staircases.',
                       ar: 'درابزين PVC خالٍ من الصيانة مع عمد مطابقة للسلالم الداخلية والخارجية.' },
        features: [
          { en: 'UV-stable compound',   ar: 'مركب مستقر تحت الأشعة فوق البنفسجية' },
          { en: 'Hollow-core profiles', ar: 'قطاعات ذات جوف مركزي'                },
          { en: 'Load-tested design',   ar: 'تصميم مختبَر تحت الأحمال'            },
        ],
        image: '/products/upvc/staircases/upvc-staircase-01.jpg',
      },
    ],
  },
  {
    slug:  'stained-glass',
    label: { en: 'Stained Glass', ar: 'زجاج ملون' },
    image: '/products/upvc/stained-glass/upvc-stained-glass-01.jpg',
    products: [
      {
        id: 'UPVC-SG-01', slug: 'stained-glass-window', category: 'stained-glass', material: 'upvc',
        title:       { en: 'Stained Glass Window',    ar: 'نافذة زجاج ملون'   },
        description: { en: 'Decorative stained glass inserts within uPVC frames — traditional craftsmanship in a modern, weatherproof system.',
                       ar: 'إدخالات زجاج ملون زخرفية داخل إطارات uPVC — حرفية تقليدية في نظام حديث مقاوم للعوامل الجوية.' },
        features: [
          { en: 'Hand-cut glass pieces',  ar: 'قطع زجاج مقطوعة يدوياً'     },
          { en: 'Lead-free caming option', ar: 'خيار إطار بدون رصاص'        },
          { en: 'UV-protective coating',  ar: 'طلاء واقٍ من الأشعة فوق البنفسجية' },
        ],
        image: '/products/upvc/stained-glass/upvc-stained-glass-01.jpg',
      },
    ],
  },
  {
    slug:  'sandblast',
    label: { en: 'Sandblast', ar: 'سندبلاست' },
    image: '/products/upvc/sandblast/upvc-sandblast-01.jpg',
    products: [
      {
        id: 'UPVC-SB-01', slug: 'sandblast-panel', category: 'sandblast', material: 'upvc',
        title:       { en: 'Sandblast Decorative Panel', ar: 'لوحة سندبلاست زخرفية' },
        description: { en: 'Etched and sandblasted glass panels providing privacy while diffusing natural light — custom patterns available.',
                       ar: 'لوحات زجاجية محفورة ومعالجة بالسندبلاست توفر الخصوصية مع إتاحة الضوء الطبيعي — أنماط مخصصة متاحة.' },
        features: [
          { en: 'Privacy without curtains', ar: 'خصوصية دون حاجة للستائر' },
          { en: 'Custom pattern etching',   ar: 'حفر بنمط مخصص'           },
          { en: 'Easy-clean surface',       ar: 'سطح سهل التنظيف'         },
        ],
        image: '/products/upvc/sandblast/upvc-sandblast-01.jpg',
      },
    ],
  },
  {
    slug:  'hebeschibe',
    label: { en: 'Hebeschibe', ar: 'هيبيشيبه' },
    image: '/products/upvc/hebeschibe/upvc-hebeschibe-01.jpg',
    products: [
      {
        id: 'UPVC-H-01', slug: 'lift-slide-door', category: 'hebeschibe', material: 'upvc',
        title:       { en: 'Lift & Slide Door (Hebeschibe)', ar: 'باب رفع وانزلاق (هيبيشيبه)' },
        description: { en: 'German-engineered lift-and-slide mechanism enabling floor-to-ceiling glazing panels up to 3 m wide.',
                       ar: 'آلية رفع وانزلاق ذات هندسة ألمانية تتيح لوحات زجاجية من الأرض للسقف تصل إلى 3 متر عرضاً.' },
        features: [
          { en: 'Effortless operation up to 400 kg', ar: 'تشغيل سلس حتى 400 كجم'          },
          { en: 'Floor-to-ceiling glass panels',     ar: 'لوحات زجاجية من الأرض للسقف'    },
          { en: 'Concealed multi-point lock',        ar: 'قفل متعدد النقاط مخفي'           },
        ],
        image: '/products/upvc/hebeschibe/upvc-hebeschibe-01.jpg',
        badge: 'Signature',
      },
    ],
  },
]

// ── Aluminum categories ───────────────────────────────────────────────────────

export const aluminumCategories: ProductCategory[] = [
  {
    slug:  'windows',
    label: { en: 'Windows', ar: 'نوافذ' },
    image: '/products/aluminum/windows/al-window-01.jpg',
    products: [
      {
        id: 'AL-W-01', slug: 'casement-window', category: 'windows', material: 'aluminum',
        title:       { en: 'Aluminium Casement Window', ar: 'نافذة ألومنيوم مفصلية'     },
        description: { en: 'Thermal-break aluminium casement with slim sightlines — ideal for commercial and residential facades.',
                       ar: 'نافذة ألومنيوم مفصلية بفاصل حراري وخطوط رؤية نحيلة — مثالية للواجهات التجارية والسكنية.' },
        features: [
          { en: 'Thermal break technology', ar: 'تقنية الفاصل الحراري'    },
          { en: 'Polyamide strip barrier',   ar: 'حاجز شريط بولياميد'     },
          { en: 'Multi-point security lock', ar: 'قفل أمان متعدد النقاط'  },
          { en: 'Available in 200+ RAL colours', ar: 'متاح بأكثر من 200 لون RAL' },
        ],
        image: '/products/aluminum/windows/al-window-01.jpg',
      },
      {
        id: 'AL-W-02', slug: 'tilt-turn-window', category: 'windows', material: 'aluminum',
        title:       { en: 'Aluminium Tilt & Turn',    ar: 'نافذة ألومنيوم قلاب ودوران' },
        description: { en: 'Premium aluminium tilt-and-turn with integrated drainage — suitable for high-wind coastal locations.',
                       ar: 'نافذة ألومنيوم قلاب ودوران متميزة مع صرف متكامل — مناسبة للمواقع الساحلية ذات الرياح الشديدة.' },
        features: [
          { en: 'Dual opening action',       ar: 'آلية فتح مزدوجة'         },
          { en: 'Integrated drainage',       ar: 'صرف مياه متكامل'         },
          { en: 'High-wind performance',     ar: 'أداء عالٍ في الرياح'     },
        ],
        image: '/products/aluminum/windows/al-window-02.jpg',
      },
    ],
  },
  {
    slug:  'doors',
    label: { en: 'Doors', ar: 'أبواب' },
    image: '/products/aluminum/doors/al-door-01.jpg',
    products: [
      {
        id: 'AL-D-01', slug: 'sliding-door', category: 'doors', material: 'aluminum',
        title:       { en: 'Aluminium Sliding Door',   ar: 'باب ألومنيوم منزلق'         },
        description: { en: 'Premium lift-and-slide aluminium door for seamless indoor-outdoor transitions up to 6 m wide.',
                       ar: 'باب ألومنيوم رفع وانزلاق متميز لانتقالات سلسة بين الداخل والخارج يصل عرضه إلى 6 متر.' },
        features: [
          { en: 'Effortless glide mechanism', ar: 'آلية انزلاق سلسة'         },
          { en: 'Floor-to-ceiling glass',     ar: 'زجاج من الأرض للسقف'      },
          { en: 'Low-profile threshold',      ar: 'عتبة منخفضة المقطع'       },
          { en: 'Multi-track configuration',  ar: 'تكوين متعدد المسارات'     },
        ],
        image: '/products/aluminum/doors/al-door-01.jpg',
        badge: 'Best Seller',
      },
      {
        id: 'AL-D-02', slug: 'bi-fold-door', category: 'doors', material: 'aluminum',
        title:       { en: 'Bi-fold Door',             ar: 'باب ثنائي الطي'             },
        description: { en: 'Folding door system that stacks neatly to one side — delivers a complete open-plan connection between spaces.',
                       ar: 'نظام أبواب قابل للطي يتراص بدقة على أحد الجانبين — يوفر اتصالاً مفتوحاً كاملاً بين المساحات.' },
        features: [
          { en: 'Full-width clear opening',  ar: 'فتحة شفافة بكامل العرض'  },
          { en: 'Flush aluminium threshold', ar: 'عتبة ألومنيوم مستوية'     },
          { en: 'Weather-tight seals',       ar: 'أختام محكمة ضد العوامل الجوية' },
        ],
        image: '/products/aluminum/doors/al-door-02.jpg',
      },
      {
        id: 'AL-D-03', slug: 'entrance-door', category: 'doors', material: 'aluminum',
        title:       { en: 'Aluminium Entrance Door',  ar: 'باب مدخل ألومنيوم'          },
        description: { en: 'Heavy-duty aluminium entrance door for commercial buildings — available with automatic operators.',
                       ar: 'باب مدخل ألومنيوم ثقيل التحمل للمباني التجارية — متاح مع مشغلات أوتوماتيكية.' },
        features: [
          { en: 'Commercial-grade hinges',   ar: 'مفصلات بدرجة تجارية'       },
          { en: 'Panic bar option',          ar: 'خيار قضيب ذعر'              },
          { en: 'Auto-closer compatible',    ar: 'متوافق مع غالق أوتوماتيكي' },
        ],
        image: '/products/aluminum/doors/al-door-03.jpg',
      },
    ],
  },
  {
    slug:  'doors-and-windows',
    label: { en: 'Doors & Windows', ar: 'أبواب ونوافذ' },
    image: '/products/aluminum/doors-and-windows/al-doors-windows-01.jpg',
    products: [
      {
        id: 'AL-DW-01', slug: 'curtain-wall', category: 'doors-and-windows', material: 'aluminum',
        title:       { en: 'Curtain Wall System',      ar: 'نظام الجدار الستائري'       },
        description: { en: 'Stick-build and unitised curtain wall integrating fixed glazing, openable casements, and spandrel panels for commercial towers.',
                       ar: 'جدار ستائري بالتثبيت والوحدات المتكاملة يجمع التزجيج الثابت والنوافذ المفصلية ولوحات الجزء الأوسط للأبراج التجارية.' },
        features: [
          { en: 'Unitised and stick-build options', ar: 'خيارات وحدوية وتثبيت ثابت'   },
          { en: 'Wind-load tested to 3 kPa',        ar: 'مختبَر لتحمل رياح 3 كيلوباسكال' },
          { en: 'Integrated natural ventilation',   ar: 'تهوية طبيعية متكاملة'          },
        ],
        image: '/products/aluminum/doors-and-windows/al-doors-windows-01.jpg',
        badge: 'Commercial',
      },
    ],
  },
  {
    slug:  'staircases',
    label: { en: 'Staircases', ar: 'سلالم' },
    image: '/products/aluminum/staircases/al-staircase-01.jpg',
    products: [
      {
        id: 'AL-S-01', slug: 'glass-staircase', category: 'staircases', material: 'aluminum',
        title:       { en: 'Glass & Aluminium Staircase', ar: 'سلم زجاج وألومنيوم'      },
        description: { en: 'Architectural floating staircase with structural glass treads and aluminium handrails — engineered to UAE building code.',
                       ar: 'سلم معماري عائم بدرجات زجاجية هيكلية وحواجز يد ألومنيوم — مُصمَّم وفق كود البناء الإماراتي.' },
        features: [
          { en: 'Structural laminated glass treads', ar: 'درجات زجاج مصفح هيكلية'       },
          { en: 'Stainless / aluminium handrail',    ar: 'حاجز يد ستانلس / ألومنيوم'    },
          { en: 'UAE building code compliant',       ar: 'متوافق مع كود البناء الإماراتي' },
        ],
        image: '/products/aluminum/staircases/al-staircase-01.jpg',
        badge: 'Bespoke',
      },
    ],
  },
  {
    slug:  'skylights',
    label: { en: 'Skylights', ar: 'مناور' },
    image: '/products/aluminum/skylights/al-skylight-01.jpg',
    products: [
      {
        id: 'AL-SK-01', slug: 'flat-roof-skylight', category: 'skylights', material: 'aluminum',
        title:       { en: 'Flat Roof Skylight',      ar: 'مناور سقف مسطح'             },
        description: { en: 'Thermally broken aluminium skylight for flat roofs — walk-on and smoke-vent variants available.',
                       ar: 'مناور ألومنيوم بفاصل حراري للأسطح المسطحة — متاح بنسخ قابلة للمشي وتهوية الدخان.' },
        features: [
          { en: 'Thermal break aluminium frame', ar: 'إطار ألومنيوم بفاصل حراري'    },
          { en: 'Walk-on laminated glass option', ar: 'خيار زجاج مصفح قابل للمشي'   },
          { en: 'Smoke vent integration',         ar: 'تكامل مع تهوية الدخان'        },
        ],
        image: '/products/aluminum/skylights/al-skylight-01.jpg',
      },
      {
        id: 'AL-SK-02', slug: 'pitched-skylight', category: 'skylights', material: 'aluminum',
        title:       { en: 'Pitched Skylight',        ar: 'مناور مائل'                 },
        description: { en: 'Ridge and pyramid skylights for pitched roofs — self-cleaning glass and motorised vents available.',
                       ar: 'مناور سنام وهرمي للأسطح المائلة — زجاج ذاتي التنظيف وفتحات تهوية بمحرك متاحة.' },
        features: [
          { en: 'Self-cleaning glass coating',  ar: 'طلاء زجاج ذاتي التنظيف'      },
          { en: 'Motorised vent option',        ar: 'خيار فتحة تهوية بمحرك'        },
          { en: 'Ridge and pyramid profiles',   ar: 'قطاعات سنام وهرمية'           },
        ],
        image: '/products/aluminum/skylights/al-skylight-02.jpg',
      },
    ],
  },
  {
    slug:  'stained-glass',
    label: { en: 'Stained Glass', ar: 'زجاج ملون' },
    image: '/products/aluminum/stained-glass/al-stained-glass-01.jpg',
    products: [
      {
        id: 'AL-SG-01', slug: 'stained-glass-facade', category: 'stained-glass', material: 'aluminum',
        title:       { en: 'Stained Glass Facade Insert', ar: 'إدخال واجهة زجاج ملون'  },
        description: { en: 'Architectural stained glass panels set in structural aluminium curtain wall frames — bespoke artworks for landmark buildings.',
                       ar: 'لوحات زجاج ملون معماري مثبتة في إطارات جدار ستائري ألومنيوم هيكلي — أعمال فنية مخصصة للمباني الأيقونية.' },
        features: [
          { en: 'Bespoke pattern design',       ar: 'تصميم نمط مخصص'              },
          { en: 'Structural silicone glazing',  ar: 'تزجيج سيليكون هيكلي'         },
          { en: 'Conservation-grade glass',     ar: 'زجاج بدرجة الحفاظ على التراث' },
        ],
        image: '/products/aluminum/stained-glass/al-stained-glass-01.jpg',
        badge: 'Bespoke',
      },
    ],
  },
  {
    slug:  'sandblast',
    label: { en: 'Sandblast', ar: 'سندبلاست' },
    image: '/products/aluminum/sandblast/al-sandblast-01.jpg',
    products: [
      {
        id: 'AL-SB-01', slug: 'sandblast-door', category: 'sandblast', material: 'aluminum',
        title:       { en: 'Sandblast Aluminium Door', ar: 'باب ألومنيوم سندبلاست'      },
        description: { en: 'Aluminium-framed door with integrated sandblasted glass panel — combines privacy screening with structural performance.',
                       ar: 'باب بإطار ألومنيوم مع لوحة زجاج سندبلاست متكاملة — يجمع الخصوصية مع الأداء الهيكلي.' },
        features: [
          { en: 'Full-height etched panel',    ar: 'لوحة محفورة بالارتفاع الكامل' },
          { en: 'Hidden closer mechanism',     ar: 'آلية غالق مخفية'              },
          { en: 'Custom frosting patterns',    ar: 'أنماط تبييض مخصصة'            },
        ],
        image: '/products/aluminum/sandblast/al-sandblast-01.jpg',
      },
    ],
  },
]

// ── Derived flat lists (used by search, sitemap generation) ───────────────────

/** All uPVC products flattened — avoids nested iteration at call sites */
export const upvcProducts: ProductItem[] = upvcCategories.flatMap((c) => c.products)

/** All aluminum products flattened */
export const aluminumProducts: ProductItem[] = aluminumCategories.flatMap((c) => c.products)

// ── Backward-compat exports ───────────────────────────────────────────────────
// Retained for existing ProductMaterialPage / ProductShowcase components
// while the 4-level routing migration (Phase G) completes.

export const upvcData = {
  en: {
    title:       'uPVC Window & Door Systems',
    subtitle:    'Energy Efficiency Meets Durability',
    description: 'Our German-engineered uPVC systems provide superior thermal insulation, soundproofing, and are virtually maintenance-free. Ideal for sustainable modern living.',
    heroImage:   '/products/upvc/windows/upvc-window-01.jpg',
    features: [
      { title: 'Superior Insulation', description: 'Multi-chambered profiles significantly reduce heat transfer and energy bills.',          icon: 'Thermometer' },
      { title: 'Noise Reduction',     description: 'Excellent acoustic properties keep outdoor noise where it belongs — outside.',           icon: 'SpeakerHigh'  },
      { title: 'UV Resistant',        description: 'Specially formulated compound to resist yellowing and cracking in intense UAE sun.',     icon: 'Sun'          },
    ],
    // Flat product list derived from new structure — keeps shape consistent for existing consumers
    products: upvcProducts.map((p) => ({
      id:          p.id,
      slug:        p.slug,
      category:    p.category,
      title:       p.title.en,
      description: p.description.en,
      image:       p.image,
      features:    p.features.map((f) => f.en),
      badge:       p.badge,
    })),
    crossLink: {
      title:       'Perfect for Residential Homes',
      description: 'Discover how our uPVC solutions transform living spaces with superior comfort and style.',
      button:      'View Residential Solutions',
      link:        '/products',
    },
  },
  ar: {
    title:       'أنظمة نوافذ وأبواب uPVC',
    subtitle:    'كفاءة الطاقة تلتقي بالمتانة',
    description: 'توفر أنظمة uPVC ذات الهندسة الألمانية عزلاً حراريًا فائقًا وعزلاً للصوت، وهي تكاد تكون خالية من الصيانة. مثالية للحياة العصرية المستدامة.',
    heroImage:   '/products/upvc/windows/upvc-window-01.jpg',
    features: [
      { title: 'عزل فائق',                     description: 'قطاعات متعددة الغرف تقلل بشكل كبير من انتقال الحرارة وفواتير الطاقة.',             icon: 'Thermometer' },
      { title: 'تقليل الضوضاء',                description: 'خصائص صوتية ممتازة تبقي الضوضاء الخارجية حيث يجب أن تكون — في الخارج.',             icon: 'SpeakerHigh'  },
      { title: 'مقاوم للأشعة فوق البنفسجية', description: 'مركب مركب خصيصًا لمقاومة الاصفرار والتشقق في الشمس الإماراتية القوية.',             icon: 'Sun'          },
    ],
    products: upvcProducts.map((p) => ({
      id:          p.id,
      slug:        p.slug,
      category:    p.category,
      title:       p.title.ar,
      description: p.description.ar,
      image:       p.image,
      features:    p.features.map((f) => f.ar),
      badge:       p.badge,
    })),
    crossLink: {
      title:       'مثالية للمنازل السكنية',
      description: 'اكتشف كيف تحول حلول uPVC مساحات المعيشة براحة وأناقة فائقة.',
      button:      'عرض الحلول السكنية',
      link:        '/products',
    },
  },
} as const

export const aluminumData = {
  en: {
    title:       'Aluminum Window & Door Systems',
    subtitle:    'Strength Meets Modern Design',
    description: 'Our premium aluminum systems offer slim profiles, maximum glass areas, and exceptional structural strength. Perfect for contemporary architecture and large openings.',
    heroImage:   '/products/aluminum/windows/al-window-01.jpg',
    features: [
      { title: 'Structural Strength', description: 'Superior load-bearing capacity for large-scale glazing and curtain wall systems.', icon: 'Shield'      },
      { title: 'Slim Profiles',       description: 'Minimalist sightlines maximise your view and natural light penetration.',          icon: 'FrameCorners' },
      { title: 'Weather Resistant',   description: 'Powder-coated finish withstands harsh UAE climate for decades.',                   icon: 'Sun'          },
    ],
    products: aluminumProducts.map((p) => ({
      id:          p.id,
      slug:        p.slug,
      category:    p.category,
      title:       p.title.en,
      description: p.description.en,
      image:       p.image,
      features:    p.features.map((f) => f.en),
      badge:       p.badge,
    })),
    crossLink: {
      title:       'Ideal for Commercial Projects',
      description: 'Explore how our aluminum systems deliver performance and aesthetics for commercial spaces.',
      button:      'View Commercial Solutions',
      link:        '/products',
    },
  },
  ar: {
    title:       'أنظمة نوافذ وأبواب الألومنيوم',
    subtitle:    'القوة تلتقي بالتصميم الحديث',
    description: 'توفر أنظمة الألومنيوم المتميزة لدينا ملفات نحيلة ومساحات زجاجية قصوى وقوة هيكلية استثنائية. مثالية للعمارة المعاصرة والفتحات الكبيرة.',
    heroImage:   '/products/aluminum/windows/al-window-01.jpg',
    features: [
      { title: 'قوة هيكلية',       description: 'قدرة تحمل فائقة لأنظمة التزجيج والجدران الستائرية واسعة النطاق.',          icon: 'Shield'      },
      { title: 'ملفات نحيلة',      description: 'خطوط رؤية بسيطة تزيد من المنظر واختراق الضوء الطبيعي.',                    icon: 'FrameCorners' },
      { title: 'مقاوم للطقس',      description: 'تشطيب مطلي بالمسحوق يتحمل مناخ الإمارات القاسي لعقود.',                    icon: 'Sun'          },
    ],
    products: aluminumProducts.map((p) => ({
      id:          p.id,
      slug:        p.slug,
      category:    p.category,
      title:       p.title.ar,
      description: p.description.ar,
      image:       p.image,
      features:    p.features.map((f) => f.ar),
      badge:       p.badge,
    })),
    crossLink: {
      title:       'مثالية للمشاريع التجارية',
      description: 'اكتشف كيف توفر أنظمة الألومنيوم لدينا الأداء والجماليات للمساحات التجارية.',
      button:      'عرض الحلول التجارية',
      link:        '/products',
    },
  },
} as const
