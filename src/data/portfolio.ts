// Static portfolio data. Used as the primary source for the public site so the
// gallery keeps working even when the API backend is unavailable.
// To add a new project, append an entry below — `slug` must be unique.

export interface StaticProject {
    id: string;
    slug: string;
    title: string;
    titleEn: string;
    description: string;
    descriptionEn: string;
    content?: string;
    contentEn?: string;
    category: string;
    categoryEn: string;
    client?: string;
    duration?: string;
    technologies: string[];
    image: string;
    liveUrl?: string;
    results?: string;
    isFeatured?: boolean;
    order: number;
    projectType: 'website' | 'mobile' | 'webapp' | 'ecommerce' | 'platform';
    createdAt: string;
    updatedAt: string;
}

// Auto-generated screenshot for any URL — no API key required.
const shot = (url: string) =>
    `https://image.thum.io/get/width/1200/crop/630/noanimate/${url}`;

export const portfolioProjects: StaticProject[] = [
    {
        id: 'p-lotus-sharm',
        slug: 'lotus-sharm-resort',
        title: 'موقع منتجع لوتس شرم الشيخ',
        titleEn: 'Lotus Sharm Resort Website',
        description:
            'موقع فندقي متكامل لمنتجع لوتس بشرم الشيخ يعرض الغرف والخدمات والمرافق ويسمح للزوار بطلب الحجز مباشرة، بتصميم سياحي راقي وأداء سريع على الموبايل.',
        descriptionEn:
            'A complete hospitality website for Lotus Sharm El-Sheikh resort showcasing rooms, amenities and services with a direct booking inquiry flow, premium tourism-grade design, and fast mobile performance.',
        content:
            'منصة فندقية احترافية بنيت بـ Next.js وTailwind، تتضمن صفحات تفصيلية للغرف، معرض صور احترافي، نظام استفسار حجز، تعدد لغات (عربي/إنجليزي/روسي)، وSEO محسّن لاستهداف السياح الباحثين عن إقامات في شرم الشيخ.',
        contentEn:
            'A premium hotel platform built on Next.js + Tailwind with detailed room pages, a high-resolution gallery, booking enquiry flow, multi-language UI (Arabic / English / Russian), and SEO tuned for travelers searching Sharm El-Sheikh stays.',
        category: 'سياحة وضيافة',
        categoryEn: 'Tourism & Hospitality',
        client: 'Lotus Sharm Resort',
        duration: '6 weeks',
        technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'i18n', 'SEO'],
        image: shot('https://lotussharm.com/'),
        liveUrl: 'https://lotussharm.com/',
        results: 'زيادة الاستفسارات المباشرة بنسبة 220% خلال أول 60 يوم من الإطلاق.',
        isFeatured: true,
        order: 1,
        projectType: 'website',
        createdAt: '2025-08-12T00:00:00.000Z',
        updatedAt: '2026-02-01T00:00:00.000Z',
    },
    {
        id: 'p-dr-mohamed-dental',
        slug: 'dr-mohamed-dental-clinic',
        title: 'موقع عيادة د. محمد لطب الأسنان',
        titleEn: 'Dr. Mohamed Dental Clinic',
        description:
            'موقع طبي احترافي لعيادة د. محمد لطب الأسنان يعرض الخدمات العلاجية والحالات قبل وبعد، ويتيح للمرضى حجز المواعيد إلكترونياً.',
        descriptionEn:
            'A polished medical site for Dr. Mohamed Dental Clinic featuring service catalogues, before-and-after cases, and online appointment booking.',
        content:
            'تجربة مستخدم هادئة وموثوقة تليق بقطاع الصحة، تتضمن قسم خدمات (تقويم، تجميل، زراعة، تنظيف)، نظام حجز مواعيد، صفحات الفريق الطبي، وSchema markup للأطباء والعيادات لتحسين الظهور في بحث Google Local.',
        contentEn:
            'Calm, trustworthy UX appropriate for healthcare — service catalogue (orthodontics, cosmetic, implants, hygiene), appointment scheduler, doctor profiles, and rich Schema.org markup tuned for Google Local visibility.',
        category: 'صحة وطب',
        categoryEn: 'Healthcare',
        client: 'Dr. Mohamed Dental Clinic',
        duration: '4 weeks',
        technologies: ['Next.js', 'Tailwind CSS', 'React Hook Form', 'Schema.org', 'Vercel'],
        image: shot('https://dr-mohamed-dental.vercel.app/'),
        liveUrl: 'https://dr-mohamed-dental.vercel.app/',
        results: 'تحويل 40% من زيارات الموقع إلى حجوزات مواعيد فعلية.',
        isFeatured: true,
        order: 2,
        projectType: 'website',
        createdAt: '2025-09-05T00:00:00.000Z',
        updatedAt: '2026-01-15T00:00:00.000Z',
    },
    {
        id: 'p-pharmcy',
        slug: 'pharmcy-online-pharmacy',
        title: 'صيدلية إلكترونية - Pharmcy',
        titleEn: 'Pharmcy — Online Pharmacy',
        description:
            'منصة صيدلية إلكترونية كاملة مع كتالوج أدوية، عربة شراء، دفع آمن، وتوصيل في نفس اليوم. تتضمن لوحة تحكم للمخزون والطلبات.',
        descriptionEn:
            'Full e-pharmacy platform with medicine catalogue, secure checkout, same-day delivery and an admin console for inventory and orders.',
        content:
            'متجر إلكتروني متخصص في القطاع الصيدلي مع بحث ذكي عن الأدوية، تنبيه التفاعلات الدوائية، إدارة الوصفات الطبية، وتكامل مع شركات الشحن المحلية لتوصيل سريع ومتتبع.',
        contentEn:
            'A pharmacy-focused storefront with intelligent medicine search, drug-interaction warnings, prescription handling, and integrations with local couriers for tracked same-day delivery.',
        category: 'تجارة إلكترونية',
        categoryEn: 'E-Commerce',
        client: 'Pharmcy',
        duration: '8 weeks',
        technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Twilio'],
        image: shot('https://pharmcy.vercel.app/'),
        liveUrl: 'https://pharmcy.vercel.app/',
        results: 'معدل تحويل (Conversion Rate) بلغ 4.8% — ضعف متوسط الصيدليات الإلكترونية في المنطقة.',
        isFeatured: true,
        order: 3,
        projectType: 'ecommerce',
        createdAt: '2025-10-20T00:00:00.000Z',
        updatedAt: '2026-02-10T00:00:00.000Z',
    },
    {
        id: 'p-jovero',
        slug: 'jovero-platform',
        title: 'منصة جوفيرو - Jovero',
        titleEn: 'Jovero Platform',
        description:
            'منصة رقمية متكاملة بتجربة مستخدم سلسة وتصميم عصري يجمع بين الأناقة والوظيفية، تخدم قاعدة عملاء متنامية.',
        descriptionEn:
            'A complete digital platform with smooth UX and a modern design that blends elegance with functionality, serving a fast-growing customer base.',
        content:
            'بنية تقنية حديثة تدعم النمو السريع، مع لوحة تحكم تحليلية، نظام إدارة محتوى مرن، وتكامل مع بوابات الدفع الدولية. التصميم مستجيب وسريع التحميل على كل الأجهزة.',
        contentEn:
            'A modern architecture built for scale — analytics dashboard, flexible CMS, and international payment-gateway integration. Fully responsive and load-optimised across devices.',
        category: 'منصات رقمية',
        categoryEn: 'Digital Platforms',
        client: 'Jovero',
        duration: '10 weeks',
        technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'AWS'],
        image: shot('https://jovero.net/'),
        liveUrl: 'https://jovero.net/',
        results: 'نمو الزوار النشطين شهرياً بنسبة 180% خلال الربع الأول.',
        isFeatured: true,
        order: 4,
        projectType: 'platform',
        createdAt: '2025-11-08T00:00:00.000Z',
        updatedAt: '2026-03-01T00:00:00.000Z',
    },
    {
        id: 'p-services-researcher',
        slug: 'services-researcher',
        title: 'منصة Services Researcher',
        titleEn: 'Services Researcher',
        description:
            'موقع متخصص لأبحاث الخدمات والاستشارات يربط الباحثين بأفضل مزودي الخدمات في مختلف المجالات.',
        descriptionEn:
            'A specialised research and consulting marketplace connecting researchers with leading service providers across multiple verticals.',
        content:
            'منصة B2B بتجربة بحث متقدمة، فلاتر ذكية حسب الصناعة والميزانية والموقع، نظام مراسلة مدمج بين العملاء ومزودي الخدمات، ولوحة تحكم تحليلية لقياس الأداء.',
        contentEn:
            'A B2B platform with advanced search, smart filters by industry / budget / location, embedded messaging between clients and providers, and an analytics dashboard for performance tracking.',
        category: 'منصات أعمال',
        categoryEn: 'Business Platforms',
        client: 'Services Researcher',
        duration: '12 weeks',
        technologies: ['Next.js', 'Node.js', 'MongoDB', 'ElasticSearch', 'WebSocket'],
        image: shot('https://servicesresearcher.com/'),
        liveUrl: 'https://servicesresearcher.com/',
        results: 'إتمام أكثر من 850 صفقة B2B في أول 6 أشهر من الإطلاق.',
        isFeatured: false,
        order: 5,
        projectType: 'webapp',
        createdAt: '2025-12-01T00:00:00.000Z',
        updatedAt: '2026-03-20T00:00:00.000Z',
    },
    {
        id: 'p-infinity-wear-sa',
        slug: 'infinity-wear-sa',
        title: 'متجر Infinity Wear للأزياء',
        titleEn: 'Infinity Wear — Fashion Store',
        description:
            'متجر إلكتروني للأزياء بهوية بصرية قوية، تجربة تسوق سلسة، ودعم متعدد العملات والشحن الدولي.',
        descriptionEn:
            'A fashion e-commerce destination with bold brand identity, smooth shopping experience, multi-currency support and international shipping.',
        content:
            'متجر أزياء عصري بمعرض منتجات احترافي، عرض 360° للقطع، نظام تصفية ذكي حسب المقاس واللون، تكامل مع منصات الشحن العالمية، ولوحة تحكم لإدارة المخزون والطلبات والعروض الترويجية.',
        contentEn:
            'A modern fashion store with high-end product gallery, 360° item previews, smart filters (size, color, fit), global shipping integrations, and an admin console for stock, orders and promotions.',
        category: 'تجارة إلكترونية',
        categoryEn: 'E-Commerce',
        client: 'Infinity Wear SA',
        duration: '10 weeks',
        technologies: ['Next.js', 'Shopify', 'Tailwind CSS', 'Algolia', 'Cloudinary'],
        image: shot('https://infinitywearsa.com/'),
        liveUrl: 'https://infinitywearsa.com/',
        results: 'مضاعفة قيمة السلة المتوسطة (AOV) بنسبة 65% بعد إعادة تصميم تجربة الدفع.',
        isFeatured: true,
        order: 6,
        projectType: 'ecommerce',
        createdAt: '2026-01-18T00:00:00.000Z',
        updatedAt: '2026-04-10T00:00:00.000Z',
    },
];

export function getAllProjects(): StaticProject[] {
    return [...portfolioProjects].sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): StaticProject | null {
    return portfolioProjects.find((p) => p.slug === slug) || null;
}
