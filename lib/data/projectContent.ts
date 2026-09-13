/**
 * lib/data/projectContent.ts
 *
 * Static bilingual content for /projects/villas and /projects/buildings pages.
 * 4 villa projects + 4 building projects.
 * Each project has editorial prose (not bullet specs) — magazine voice.
 * Images are Unsplash placeholders — replaced with real photography pre-launch.
 */

export interface ProjectSpread {
  id:          string
  title:       { en: string; ar: string }
  location:    { en: string; ar: string }
  year:        string
  materials:   { en: string; ar: string }[]   // Material chips shown on card
  description: { en: string; ar: string }     // 2-3 sentence editorial prose
  image:       string                          // Full-bleed atmospheric photograph
  href:        string                          // Links to /projects/[id] detail page
}

// ─── Villa projects ───────────────────────────────────────────────────────────

export const VILLA_PROJECTS: ProjectSpread[] = [
  {
    id:       'jumeirah-villa',
    href:     '/projects/jumeirah-villa',
    title:    { en: 'Jumeirah Villa',          ar: 'فيلا جميرا'             },
    location: { en: 'Jumeirah, Dubai',         ar: 'جميرا، دبي'              },
    year:     '2024',
    materials: [
      { en: 'uPVC Systems',      ar: 'أنظمة uPVC'        },
      { en: 'Aluminium Pergola', ar: 'برجولة ألومنيوم'   },
    ],
    description: {
      en: 'A landmark Jumeirah residence where the brief called for complete visual openness between the living areas and the garden. Emaar specified floor-to-ceiling Hebeschibe lift-and-slide panels across the entire rear elevation — 14 metres of uninterrupted glass that disappears into the ceiling void when open. The aluminium pergola extending from the rear terrace was designed to the same sightline geometry, creating a seamless indoor-outdoor living room.',
      ar: 'منزل بارز في جميرا اقتضى التصميم فيه انفتاحاً بصرياً كاملاً بين مناطق المعيشة والحديقة. حددت إعمار ألواح رفع وإزاحة Hebeschibe من الأرض إلى السقف عبر الواجهة الخلفية بالكامل — 14 متراً من الزجاج المتواصل الذي يختفي في تجويف السقف عند الفتح. صُمِّمت البرجولة الألومنيوم الممتدة من التراس الخلفي وفق نفس هندسة خطوط الرؤية، لتخلق غرفة معيشة داخلية-خارجية متكاملة.',
    },
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&h=1080&fit=crop',
  },
  {
    id:       'palm-residence',
    href:     '/projects/palm-residence',
    title:    { en: 'Palm Residence',          ar: 'إقامة النخيل'            },
    location: { en: 'Palm Jumeirah, Dubai',    ar: 'نخلة جميرا، دبي'         },
    year:     '2024',
    materials: [
      { en: 'uPVC Doors & Windows', ar: 'أبواب ونوافذ uPVC' },
      { en: 'Stained Glass',        ar: 'زجاج ملون'          },
    ],
    description: {
      en: 'On Palm Jumeirah, where sea views are the primary architectural asset, every window becomes a framed artwork. Emaar delivered a complete uPVC fenestration package across four floors — 62 units in total — specified with Low-E double glazing to manage solar gain without sacrificing the panorama. The entrance lobby features a bespoke stained glass screen designed by our studio: a contemporary interpretation of a traditional Islamic mashrabiya pattern in amber and gold.',
      ar: 'في نخلة جميرا، حيث إطلالات البحر هي الأصل المعماري الأساسي، تصبح كل نافذة عملاً فنياً مؤطراً. قدمت إعمار حزمة نوافذ وأبواب uPVC كاملة عبر أربعة طوابق — 62 وحدة إجمالاً — محددة بزجاج مزدوج Low-E لإدارة اكتساب الحرارة الشمسية دون التضحية بالبانوراما. يضم بهو المدخل شاشة زجاج ملون مخصصة من تصميم استوديونا: تفسير معاصر لنمط مشربية إسلامي تقليدي باللون العنبر والذهبي.',
    },
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop',
  },
  {
    id:       'arabian-ranches-villa',
    href:     '/projects/arabian-ranches-villa',
    title:    { en: 'Arabian Ranches Villa',   ar: 'فيلا المرابع العربية'   },
    location: { en: 'Arabian Ranches, Dubai',  ar: 'المرابع العربية، دبي'    },
    year:     '2023',
    materials: [
      { en: 'uPVC Systems',       ar: 'أنظمة uPVC'      },
      { en: 'Aluminium Handrails', ar: 'درابزين ألومنيوم' },
    ],
    description: {
      en: 'A full-property retrofit in Arabian Ranches where the homeowners wanted contemporary performance without altering the villa\'s traditional Arabic exterior character. Emaar replaced all 38 window and door units with thermally-broken uPVC profiles in a custom woodgrain finish — matching the original timber frames in appearance while delivering a U-value of 1.2 W/m²K. The staircase handrail system was redesigned in powder-coated aluminium with a warm champagne finish to complement the interior palette.',
      ar: 'إعادة تأهيل كاملة للعقار في المرابع العربية حيث أراد أصحاب المنزل أداءً معاصراً دون تغيير الطابع العربي التقليدي للواجهة الخارجية للفيلا. استبدلت إعمار جميع وحدات النوافذ والأبواب الـ 38 بقطاعات uPVC بكسر حراري بتشطيب حبوب خشب مخصص — يطابق الإطارات الخشبية الأصلية في المظهر مع تحقيق قيمة U تبلغ 1.2 واط/م²ك.',
    },
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop',
  },
  {
    id:       'meadows-villa',
    href:     '/projects/meadows-villa',
    title:    { en: 'The Meadows Villa',       ar: 'فيلا ذا ميدوز'           },
    location: { en: 'The Meadows, Dubai',      ar: 'ذا ميدوز، دبي'           },
    year:     '2023',
    materials: [
      { en: 'Aluminium Skylights', ar: 'فتحات سقفية ألومنيوم' },
      { en: 'uPVC Systems',        ar: 'أنظمة uPVC'            },
    ],
    description: {
      en: 'The Meadows brief centred on a double-height atrium that the architect wanted flooded with natural light — without the heat gain that typically makes glazed atriums unusable in the UAE summer. Emaar engineered a motorised aluminium skylight system with solar-control Low-E glass achieving a solar factor of 0.26 — blocking 74% of solar heat while transmitting 48% of visible light. The effect is a bright, cool atrium that functions year-round without supplementary air conditioning.',
      ar: 'تمحور تصميم ذا ميدوز حول فناء مزدوج الارتفاع أراد المهندس المعماري إغراقه بالضوء الطبيعي — دون اكتساب الحرارة الذي يجعل الأفنية الزجاجية عادةً غير صالحة للاستخدام في صيف الإمارات. هندست إعمار نظام فتحات سقفية ألومنيوم مؤتمتة بزجاج Low-E للتحكم الشمسي يحقق معامل شمسي 0.26 — يحجب 74% من الحرارة الشمسية مع نقل 48% من الضوء المرئي.',
    },
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&h=1080&fit=crop',
  },
]

// ─── Building projects ────────────────────────────────────────────────────────

export const BUILDING_PROJECTS: ProjectSpread[] = [
  {
    id:       'business-bay-tower',
    href:     '/projects/business-bay-tower',
    title:    { en: 'Business Bay Tower',      ar: 'برج الخليج التجاري'      },
    location: { en: 'Business Bay, Dubai',     ar: 'الخليج التجاري، دبي'     },
    year:     '2023',
    materials: [
      { en: 'Aluminium Curtain Wall', ar: 'جدار ستائري ألومنيوم' },
      { en: 'ACP Cladding',          ar: 'كسوة ACP'               },
    ],
    description: {
      en: 'A 34-storey mixed-use tower in Business Bay where Emaar was appointed as the sole façade contractor — responsible for the full building envelope from ground level to roof. The aluminium curtain wall system spans 8,400 square metres of glazed façade, engineered to withstand the wind pressures of an exposed waterfront site. FR-grade ACP cladding panels in a brushed champagne finish wrap the solid elements of the building, creating a unified exterior language that reads consistently from street level and from across the creek.',
      ar: 'برج متعدد الاستخدامات من 34 طابقاً في الخليج التجاري عُيِّنت فيه إعمار مقاولاً وحيداً للواجهات — مسؤولاً عن غلاف المبنى الكامل من مستوى الأرض إلى السطح. يمتد نظام الجدار الستائري الألومنيوم على 8,400 متر مربع من الواجهة الزجاجية، مهندساً لتحمّل ضغوط الرياح على موقع ساحلي مكشوف.',
    },
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop',
  },
  {
    id:       'marina-heights',
    href:     '/projects/marina-heights',
    title:    { en: 'Marina Heights',          ar: 'مرتفعات المارينا'        },
    location: { en: 'Dubai Marina, Dubai',     ar: 'دبي مارينا، دبي'         },
    year:     '2023',
    materials: [
      { en: 'Aluminium Systems',  ar: 'أنظمة الألومنيوم'   },
      { en: 'Frameless Doors',    ar: 'أبواب بلا إطار'      },
    ],
    description: {
      en: 'Marina Heights is a 28-floor residential tower where the developer specified frameless glass entry doors for every floor lobby — creating a hotel-grade arrival experience for residents. Emaar delivered 28 pairs of frameless pivot doors in 12mm fully toughened glass with concealed stainless hardware, each panel weighing 280 kg. The aluminium window package across 312 apartments was specified with a slim 45mm sightline system, maximising the marina views that justify the development\'s premium positioning.',
      ar: 'مرتفعات المارينا برج سكني من 28 طابقاً حدد فيه المطور أبواباً زجاجية بلا إطار لبهو كل طابق — لخلق تجربة وصول بمستوى فندقي للمقيمين. سلّمت إعمار 28 زوجاً من الأبواب المحورية بلا إطار بزجاج مقسّى بالكامل بسماكة 12 مم مع أجهزة فولاذية مخفية، كل لوحة تزن 280 كجم.',
    },
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&h=1080&fit=crop',
  },
  {
    id:       'downtown-complex',
    href:     '/projects/downtown-complex',
    title:    { en: 'Downtown Complex',        ar: 'مجمع وسط المدينة'        },
    location: { en: 'Downtown Dubai, Dubai',   ar: 'وسط مدينة دبي، دبي'      },
    year:     '2022',
    materials: [
      { en: 'Aluminium Systems',  ar: 'أنظمة الألومنيوم' },
      { en: 'Security Systems',   ar: 'أنظمة الأمان'      },
    ],
    description: {
      en: 'A ground-floor retail and F&B podium beneath a 22-storey residential tower in Downtown Dubai — a typology where the security and acoustic demands of the commercial base must be resolved without compromising the visual openness that attracts footfall. Emaar specified RC3-rated aluminium security doors for the retail unit entrances and plant room access points, combined with 6-metre-span frameless glass shopfronts that maximise retail visibility. The acoustic specification for the podium ceiling-height glazing achieved 42 dB reduction — sufficient to isolate the restaurant units from street noise.',
      ar: 'طابق سفلي تجاري وترفيهي تحت برج سكني من 22 طابقاً في وسط مدينة دبي — نموذج تعماري يجب فيه تلبية متطلبات الأمان والعزل الصوتي للقاعدة التجارية دون الإخلال بالانفتاح البصري الذي يجذب حركة الأقدام.',
    },
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&h=1080&fit=crop',
  },
  {
    id:       'sharjah-office-park',
    href:     '/projects/sharjah-office-park',
    title:    { en: 'Sharjah Office Park',     ar: 'مجمع مكاتب الشارقة'     },
    location: { en: 'Sharjah, UAE',            ar: 'الشارقة، الإمارات'        },
    year:     '2022',
    materials: [
      { en: 'ACP Cladding',           ar: 'كسوة ACP'                   },
      { en: 'Aluminium Curtain Wall', ar: 'جدار ستائري ألومنيوم'        },
    ],
    description: {
      en: 'A three-building office campus in Sharjah where the master plan called for a unified exterior identity across structures completed in two separate phases. Emaar\'s role was to deliver a façade system that would look identical whether built in phase one or phase two — two years apart. The solution was a documented aluminium curtain wall specification with colour-matched ACP cladding, both manufactured to fixed reference samples held by the client. Phase two, completed in 2022, is visually indistinguishable from phase one.',
      ar: 'حرم مكاتب من ثلاثة مبانٍ في الشارقة اقتضى المخطط الرئيسي فيه هوية خارجية موحدة عبر الهياكل المكتملة على مرحلتين منفصلتين. كان دور إعمار تسليم نظام واجهة يبدو متطابقاً سواء بُني في المرحلة الأولى أو الثانية — بفارق عامين.',
    },
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&h=1080&fit=crop',
  },
]
