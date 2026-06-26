'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Code2, Smartphone, Palette, ShoppingCart, TrendingUp, ArrowRight, Shield, Zap, Users, Globe, CheckCircle2, Star, ChevronRight, Atom, Server, Cpu, Database, Cloud, Terminal, Box, Figma, Mail, Flame, Layers, Briefcase, Target } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ServiceCard } from '@/components/ui/Card';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { Input, Textarea, Select } from '@/components/ui/FormElements';
import { staggerContainer, staggerItem, heroTextReveal } from '@/lib/animations';
import { cn, COMPANY_LICENSE, COMPANY_ADDRESS, OFFICE_PHONE } from '@/lib/utils';
import Link from 'next/link';
import { MouseFollower } from '@/components/ui/MouseFollower';
import { useParams } from 'next/navigation';
import { publicApi } from '@/lib/api';
import { useDictionary } from '@/lib/contexts/DictionaryContext';

// ============ HERO SECTION ============
function HeroSection({ data }: { data?: any }) {
    const dict = useDictionary();
    const params = useParams();
    const isAr = params?.lang === 'ar';

    const badgeText = dict.hero.badge;
    const titleLine1 = dict.hero.titleLine1;
    const titleLine2 = dict.hero.titleLine2;
    const description = dict.hero.subtitle;
    const primaryBtnText = dict.hero.ctaPrimary;
    const secondaryBtnText = dict.hero.ctaSecondary;

    // Pull out a single italic accent word from the headline (last word) for editorial flair.
    const headlineWords = (titleLine2 || '').split(' ');
    const headlineLead = headlineWords.slice(0, -1).join(' ');
    const headlineAccent = headlineWords[headlineWords.length - 1] || '';

    const trustStats = [
        { value: 'CHE-154.312.079', label: isAr ? 'سجل تجاري سويسري' : 'Swiss license' },
        { value: '8+', label: isAr ? 'سنوات خبرة' : 'Years operating' },
        { value: '120+', label: isAr ? 'مشروع منشور' : 'Shipped projects' },
        { value: '4', label: isAr ? 'فِرَق متخصصة' : 'Disciplines' },
    ];

    return (
        <section className="relative bg-brand-primary overflow-hidden">
            <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />

            <div className="section-container relative pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto text-center"
                >
                    <motion.span variants={heroTextReveal} className="section-eyebrow">
                        {badgeText}
                    </motion.span>

                    <motion.h1
                        variants={heroTextReveal}
                        className={cn(
                            'mt-4 sm:mt-5 font-display text-brand-text',
                            'text-[36px] sm:text-[56px] lg:text-[76px]',
                            isAr ? 'leading-[1.25] font-extrabold' : 'leading-[1.04] tracking-[-0.03em] font-extrabold',
                        )}
                    >
                        {headlineLead}{' '}
                        <span className="text-brand-accent">{headlineAccent}</span>
                    </motion.h1>

                    <motion.p
                        variants={heroTextReveal}
                        className={cn(
                            'mt-5 sm:mt-6 max-w-[62ch] mx-auto text-brand-text-soft',
                            'text-[15px] sm:text-[17px] lg:text-[18px]',
                            isAr ? 'leading-[1.85]' : 'leading-[1.65]',
                        )}
                    >
                        {description}
                    </motion.p>

                    <motion.div variants={heroTextReveal} className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                        <Link
                            href={`/${params.lang}/portfolio`}
                            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 h-12 sm:h-[52px] px-7 rounded-full bg-brand-accent text-white text-[14px] sm:text-[15px] font-semibold hover:bg-brand-accent-hover transition-all duration-200 hover:-translate-y-[1px] shadow-neon-cyan"
                        >
                            {primaryBtnText}
                            <ArrowRight size={16} className="rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                        </Link>
                        <Link
                            href={`/${params.lang}/contact`}
                            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 h-12 sm:h-[52px] px-7 rounded-full border border-brand-border-strong bg-white text-brand-text text-[14px] sm:text-[15px] font-semibold hover:border-brand-accent hover:bg-brand-accent-soft hover:text-brand-accent transition-colors"
                        >
                            {secondaryBtnText}
                        </Link>
                    </motion.div>

                    <motion.div variants={heroTextReveal} className="mt-6 flex items-center justify-center gap-3 text-[12px] sm:text-[13px] text-brand-muted">
                        <div className="flex -space-x-2 rtl:space-x-reverse">
                            {['#0A2A5C', '#1A6FD9', '#6B7588', '#1356B0'].map((c, i) => (
                                <div key={i} className="w-7 h-7 rounded-full border-2 border-white" style={{ background: c }} />
                            ))}
                        </div>
                        <span className="font-medium">
                            {isAr ? 'موثوق من ١٢٠+ شركة وعلامة تجارية' : 'Trusted by 120+ businesses & brands'}
                        </span>
                    </motion.div>
                </motion.div>

                {/* Trust micro-stats below the centered hero */}
                <motion.div
                    variants={heroTextReveal}
                    initial="hidden"
                    animate="visible"
                    className="mt-12 sm:mt-14 lg:mt-16 pt-6 sm:pt-8 border-t border-brand-border grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 sm:gap-8 max-w-4xl mx-auto"
                >
                    {trustStats.map((stat, i) => (
                        <div key={i} className="text-center sm:text-left rtl:sm:text-right">
                            <div className="font-display text-[16px] sm:text-[18px] lg:text-[22px] text-brand-text font-bold tracking-tight">
                                {stat.value}
                            </div>
                            <div className="mt-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-brand-muted font-semibold">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// Helper to map icon names to Lucide components
const ServiceIcon = ({ name, size = 32 }: { name: string; size?: number }) => {
    const Icon = (LucideIcons as any)[name] || LucideIcons.Code2;
    return <Icon size={size} />;
};

// ============ SERVICES SECTION ============
import * as LucideIcons from 'lucide-react';

function ServicesSection() {
    const params = useParams();
    const lang = params?.lang as string;
    const [services, setServices] = React.useState<any[]>([]);
    const dict = useDictionary();

    React.useEffect(() => {
        publicApi.getServices().then(({ data }) => {
            // Flatten services from all categories for the homepage showcase
            const allServices = data.flatMap((cat: any) => (cat.services || []).map((s: any) => ({
                title: lang === 'en' && s.titleEn ? s.titleEn : s.title,
                description: lang === 'en' && s.descriptionEn ? s.descriptionEn : s.description,
                icon: <ServiceIcon name={s.icon || 'Code2'} size={32} />,
                color: cat.id % 2 === 0 ? 'cyan' : 'purple', // Alternate colors for variety
                href: `/${lang}/services/${s.slug}`,
                slug: s.slug,
                exploreText: dict.hero.explore || 'Explore Details'
            })))
                // Temporal filter to hide old services until DB is seeded
                .filter((s: any) => ![
                    'software-development-switzerland',
                    'tech-consulting-sweden',
                    'enterprise-solutions-saudi-arabia',
                    'mobile-app-innovation-uae',
                    'system-repair-legacy-maintenance',
                    'maintenance'
                ].includes(s.slug));

            setServices(allServices);
        }).catch(err => console.error(err));
    }, [lang]);

    const displayServices = services;


    return (
        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-brand-primary">
            {/* ... header ... */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 text-[15vw] font-display font-black text-brand-text/[0.02] select-none pointer-events-none tracking-tighter">
                {dict.home.services.title.toUpperCase()}
            </div>

            <div className="absolute inset-0 tech-grid opacity-10" />

            <div className="section-container relative z-10">
                <SectionReveal>
                    <div className="text-center mb-12">
                        <span className="text-brand-accent font-mono text-xs tracking-[0.5em] uppercase mb-4 block">{dict.home.services.title}</span>
                        <h2 className="text-4xl md:text-6xl font-display font-black text-brand-text mb-6  tracking-tight">
                            <span className="text-brand-accent">{dict.home.services.title}</span>
                        </h2>
                        <div className="w-24 h-1 bg-brand-accent mx-auto mb-8 rounded-full shadow-neon-cyan" />
                        <p className="text-brand-muted max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                            {dict.home.services.subtitle}
                        </p>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {displayServices.map((service, i) => (
                        <SectionReveal key={i} delay={i * 0.1}>
                            <ServiceCard
                                {...service}
                                className="h-full"
                            />
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============ POS SYSTEM SECTION ============
function PosSection() {
    const dict = useDictionary();
    const params = useParams();
    return (
        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-brand-primary border-t border-brand-border">
            <div className="absolute inset-0 tech-grid opacity-5" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="section-container relative z-10 flex flex-col lg:flex-row items-center gap-16">
                <SectionReveal direction="left" className="w-full lg:w-1/2 relative">
                    <div className="relative z-10">
                        <span className="text-brand-accent font-mono text-xs tracking-[0.4em] uppercase mb-4 block">{dict.home.pos.badge}</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-brand-text mb-6 leading-[1.1] tracking-tight">
                            {dict.home.pos.titleLine1} <span className="text-brand-accent">{dict.home.pos.titleHighlight}</span> {dict.home.pos.titleLine2}
                        </h2>
                        <div className="w-24 h-1 bg-brand-accent mb-8 rounded-full shadow-neon-cyan rtl:ml-auto ltr:mr-auto" />
                        <p className="text-brand-muted text-lg leading-relaxed mb-8 font-light opacity-90">
                            {dict.home.pos.subtitle}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                            {[
                                { icon: <Smartphone size={20} />, text: dict.home.pos.features.mobile },
                                { icon: <Terminal size={20} />, text: dict.home.pos.features.desktop },
                                { icon: <Globe size={20} />, text: dict.home.pos.features.ecommerce },
                                { icon: <Box size={20} />, text: dict.home.pos.features.inventory },
                                { icon: <TrendingUp size={20} />, text: dict.home.pos.features.reports },
                                { icon: <Users size={20} />, text: dict.home.pos.features.branches },
                            ].map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-brand-accent/10 text-brand-accent">
                                        {feature.icon}
                                    </div>
                                    <span className="text-brand-text font-medium text-sm">{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex ltr:justify-start rtl:justify-end">
                            <Link href={`/${params.lang}/pos`}>
                                <Button variant="primary" size="lg" className="px-8 h-14 rounded-xl font-bold font-display tracking-widest gap-3 flex shadow-neon-cyan transition-all hover:scale-105 active:scale-95 text-lg">
                                    <ArrowRight size={20} className="rtl:rotate-180" /> {dict.home.pos.cta}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </SectionReveal>

                <SectionReveal direction="right" className="w-full lg:w-1/2">
                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden border border-brand-border shadow-card-lg bg-white">
                            <Image
                                src="/pos-showcase.png"
                                alt="Barmagly POS — integrated point of sale platform"
                                width={1200}
                                height={700}
                                priority
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </SectionReveal>
            </div>
        </section>
    );
}

// ============ WHY CHOOSE US ============
function WhyChooseSection({ data }: { data?: any }) {
    const dict = useDictionary();
    const params = useParams();
    const isAr = params?.lang === 'ar';

    const {
        badge = dict.home.whyChoose.badge,
        title = dict.home.whyChoose.title,
        description = dict.home.whyChoose.subtitle,
        btnText = dict.home.whyChoose.cta
    } = (isAr ? data : {}) || {};

    const reasons = [
        {
            icon: <Shield size={24} />,
            title: dict.home.whyChoose.cards.licensed.title,
            description: dict.home.whyChoose.cards.licensed.desc,
        },
        {
            icon: <Zap size={24} />,
            title: dict.home.whyChoose.cards.performance.title,
            description: dict.home.whyChoose.cards.performance.desc,
        },
        {
            icon: <Users size={24} />,
            title: dict.home.whyChoose.cards.partners.title,
            description: dict.home.whyChoose.cards.partners.desc,
        },
        {
            icon: <Globe size={24} />,
            title: dict.home.whyChoose.cards.global.title,
            description: dict.home.whyChoose.cards.global.desc,
        },
    ];

    return (
        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-brand-primary border-t border-brand-border">
            <div className="absolute inset-0 tech-grid opacity-5" />
            <div className="section-container relative z-10">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    <SectionReveal direction="left" className="w-full lg:w-1/2">
                        <div className="max-w-xl">
                            <span className="text-brand-accent font-mono text-xs tracking-[0.4em] uppercase mb-4 block">{badge}</span>
                            <h2 className="text-4xl md:text-6xl font-display font-black text-brand-text mb-8 leading-[1.1] tracking-tight">
                                {title}
                            </h2>
                            <p className="text-brand-muted text-lg leading-relaxed mb-10 opacity-80 font-light">
                                {description}
                            </p>

                            <Link href={`/${params.lang}/about`}>
                                <Button variant="primary" size="lg" icon={<ArrowRight size={20} />} className="px-10 h-16 rounded-xl font-bold">
                                    {btnText}
                                </Button>
                            </Link>
                        </div>
                    </SectionReveal>

                    <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                        {/* Decorative glow behind the grid */}
                        <div className="absolute inset-x-0 inset-y-0 bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />

                        {reasons.map((reason, i) => (
                            <SectionReveal key={i} direction="right" delay={i * 0.1}>
                                <div className="glass-card p-8 group hover:bg-white/[0.03] transition-all duration-500 border-brand-border h-full flex flex-col items-start">
                                    <div className="p-4 rounded-2xl bg-brand-surface border border-brand-border text-brand-accent w-fit mb-6 group-hover:shadow-neon-cyan transition-all duration-500 group-hover:scale-110">
                                        {reason.icon}
                                    </div>
                                    <h3 className="text-xl font-display font-bold text-brand-text mb-3 group-hover:text-brand-accent transition-colors">
                                        {reason.title}
                                    </h3>
                                    <p className="text-brand-muted leading-relaxed text-sm opacity-70">
                                        {reason.description}
                                    </p>
                                </div>
                            </SectionReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============ COUNTERS SECTION ============
function CountersSection({ data }: { data?: any }) {
    const dict = useDictionary();
    const params = useParams();
    const isAr = params?.lang === 'ar';

    const defaultStats = [
        { label: dict.home.statistics.projects, value: "150", suffix: "+", icon: <Code2 size={24} /> },
        { label: dict.home.statistics.clients, value: "80", suffix: "+", icon: <Users size={24} /> },
        { label: dict.home.statistics.years, value: "5", suffix: "+", icon: <Star size={24} /> },
        { label: dict.home.statistics.support, value: "100", suffix: "%", icon: <CheckCircle2 size={24} /> },
    ];

    // Merge dynamic stats with defaults (preserving icons if possible, or just using defaults if no dynamic data)
    // If we have dynamic stats and we are in Arabic mode, we use them.
    const stats: any[] = (isAr && data && data.length > 0) ? data : defaultStats;

    return (
        <section className="relative overflow-hidden py-24 bg-brand-primary border-y border-brand-border">
            <div className="absolute inset-0 bg-accent-gradient opacity-10" />
            <div className="absolute inset-0 tech-grid opacity-5" />
            <div className="section-container relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
                    {stats.map((stat, i) => (
                        <AnimatedCounter
                            key={i}
                            end={parseInt(stat.value) || 0}
                            suffix={stat.suffix}
                            label={stat.label}
                            icon={defaultStats[i]?.icon || <Star size={24} />}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============ TESTIMONIALS SECTION ============
const TESTIMONIALS_EN = [
    { name: 'Khaled Al-Rashid', role: 'CEO · Lotus Sharm Resort', initial: 'K', content: 'Barmagly rebuilt our booking system end-to-end. Direct inquiries grew 220% in the first two months. They actually understood hospitality — not just code.' },
    { name: 'Sara Hassan', role: 'Founder · Jovero Marketing', initial: 'S', content: 'Eight weeks from kick-off to launch. Clean architecture, honest timelines, no scope drama. The team felt like an extension of mine.' },
    { name: 'Mohamed Abdelbaset', role: 'Owner · Dr. Mohamed Dental Clinic', initial: 'M', content: 'I needed a website that converts visitors into actual appointments. The new site books 40% of its visitors. That number changed how I run my marketing.' },
    { name: 'Omar Saleh', role: 'COO · Infinity Wear SA', initial: 'O', content: 'They migrated our 2,400-SKU catalogue to a new storefront over a single weekend with zero downtime. AOV is up 65%. I have no idea how to thank them.' },
    { name: 'Layla Khoury', role: 'Product Lead · Services Researcher', initial: 'L', content: 'Barmagly delivered a B2B marketplace I couldn’t even fully spec at the start. They asked the right questions and shipped the right thing.' },
    { name: 'Ahmed Tarek', role: 'CTO · Pharmcy', initial: 'A', content: 'Prescription handling, drug-interaction warnings, courier integration — they nailed every detail. We launched on time and on budget. Rare combo.' },
    { name: 'Nora Mansour', role: 'Founder · King Kebab Le Pouzin', initial: 'N', content: 'The POS system runs my whole shop now — orders, inventory, online menu. My staff learned it in an afternoon. That was the test.' },
    { name: 'Yusuf Al-Amri', role: 'Director · Aman Law', initial: 'Y', content: 'A serious legal firm needs a serious web presence. Barmagly understood the tone and delivered exactly that. Highly recommend.' },
];

const TESTIMONIALS_AR = [
    { name: 'خالد الرشيد', role: 'الرئيس التنفيذي · منتجع لوتس شرم', initial: 'خ', content: 'فريق برمجلي أعاد بناء نظام الحجز عندنا من الصفر. الاستفسارات المباشرة زادت بنسبة 220% في أول شهرين. فهمنا تشغيلياً، مش بس برمجياً.' },
    { name: 'سارة حسن', role: 'المؤسِّسة · Jovero للتسويق', initial: 'س', content: 'من بداية المشروع للإطلاق ثمانية أسابيع. كود نظيف، مواعيد دقيقة، صفر مفاجآت. حسّيتهم زي امتداد لفريقي.' },
    { name: 'محمد عبد الباسط', role: 'مالك · عيادة د. محمد لطب الأسنان', initial: 'م', content: 'كنت محتاج موقع يحوّل الزوار لحجوزات فعلية. الموقع الجديد بيحجز 40% من زواره. الرقم ده غيّر طريقة تسويقي بالكامل.' },
    { name: 'عمر صالح', role: 'مدير العمليات · Infinity Wear', initial: 'ع', content: 'نقلوا كاتالوج 2400 منتج لمتجر جديد في عطلة نهاية أسبوع واحدة بدون أي downtime. متوسط قيمة السلة طلع 65%. مش عارف أشكرهم إزاي.' },
    { name: 'ليلى خوري', role: 'مدير المنتج · Services Researcher', initial: 'ل', content: 'سلّموا منصة B2B ما كنتش حتى عارفة أحدد متطلباتها بدقة. سألوا الأسئلة الصح وبنوا اللي محتاجاه.' },
    { name: 'أحمد طارق', role: 'CTO · Pharmcy', initial: 'أ', content: 'إدارة الوصفات، تنبيهات تفاعل الأدوية، تكامل مع شركات التوصيل — أتقنوا كل التفاصيل. أطلقنا في الموعد المحدد بالميزانية المتفق عليها.' },
    { name: 'نورة منصور', role: 'مالكة · مطعم King Kebab', initial: 'ن', content: 'نظام POS بيدير الفرع كله — الطلبات، المخزون، المنيو الأونلاين. الفريق فهمه في عصر يوم واحد. ده كان الاختبار الحقيقي.' },
    { name: 'يوسف العامري', role: 'الشريك الإداري · أمان لو', initial: 'ي', content: 'مكتب محاماة جاد محتاج موقع جاد. برمجلي فهموا اللهجة المطلوبة وسلّموا اللي يليق بمستوى المكتب.' },
];

function TestimonialsSection() {
    const params = useParams();
    const lang = params?.lang as string;
    const isAr = lang === 'ar';
    const dict = useDictionary();

    const testimonials = isAr ? TESTIMONIALS_AR : TESTIMONIALS_EN;
    // Split into two rows for variety, both auto-scrolling in opposite directions.
    const rowA = testimonials.slice(0, Math.ceil(testimonials.length / 2));
    const rowB = testimonials.slice(Math.ceil(testimonials.length / 2));
    // Duplicate exactly once — pairs with the -50% marquee transform for a
    // truly seamless, never-ending loop.
    const loopA = [...rowA, ...rowA];
    const loopB = [...rowB, ...rowB];

    const TestimonialCard = ({ t }: { t: typeof TESTIMONIALS_EN[0] }) => (
        <div className="shrink-0 w-[340px] sm:w-[400px] bg-white border border-brand-border rounded-xl p-7 shadow-card mx-3 hover:shadow-card-lg transition-shadow">
            <div className="flex gap-1 mb-5 text-brand-accent">
                {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} className="fill-current" />
                ))}
            </div>
            <p className={cn(
                'text-brand-text-soft text-[15px] mb-6 min-h-[110px]',
                isAr ? 'leading-[1.9]' : 'leading-[1.65]',
            )}>
                “{t.content}”
            </p>
            <div className="flex items-center gap-3 border-t border-brand-border pt-5">
                <div className="w-11 h-11 rounded-full bg-brand-accent-soft border border-brand-accent/20 flex items-center justify-center text-brand-accent font-bold text-base shrink-0">
                    {t.initial}
                </div>
                <div className="min-w-0">
                    <p className="text-brand-text font-semibold text-[14px] truncate">{t.name}</p>
                    <p className="text-brand-muted text-[12px] truncate">{t.role}</p>
                </div>
            </div>
        </div>
    );

    return (
        <section className="relative overflow-hidden py-20 sm:py-24 lg:py-16 sm:py-20 lg:py-24 bg-brand-surface border-y border-brand-border">
            <div className="section-container">
                <div className="max-w-2xl mb-12 sm:mb-16">
                    <span className="section-eyebrow">{dict.home.testimonials.badge}</span>
                    <h2 className="mt-4 font-display text-brand-text">
                        {dict.home.testimonials.title}
                    </h2>
                    <p className="mt-4 text-brand-text-soft text-[16px] sm:text-[17px] leading-[1.7]">
                        {dict.home.testimonials.subtitle}
                    </p>
                </div>
            </div>

            {/* Row A — scrolls left (or right in RTL) */}
            <div className="relative w-full mask-fade-edges overflow-hidden">
                <div className="flex animate-marquee" style={{ width: 'max-content' }}>
                    {loopA.map((t, i) => <TestimonialCard key={`a-${i}`} t={t} />)}
                </div>
            </div>

            {/* Row B — scrolls in the opposite direction */}
            <div className="relative w-full mask-fade-edges overflow-hidden mt-6">
                <div className="flex animate-marquee-reverse" style={{ width: 'max-content' }}>
                    {loopB.map((t, i) => <TestimonialCard key={`b-${i}`} t={t} />)}
                </div>
            </div>
        </section>
    );
}

// ============ TECHNOLOGIES SECTION ============
function TechSection() {
    const dict = useDictionary();
    const techs = [
        { name: 'React', icon: <Atom size={32} />, color: '#61DAFB' },
        { name: 'Next.js', icon: <Globe size={32} />, color: '#FFFFFF' },
        { name: 'Node.js', icon: <Server size={32} />, color: '#339933' },
        { name: '.NET', icon: <Cpu size={32} />, color: '#512BD4' },
        { name: 'Laravel', icon: <Layers size={32} />, color: '#FF2D20' },
        { name: 'Odoo', icon: <Briefcase size={32} />, color: '#714B67' },
        { name: 'PHP', icon: <Terminal size={32} />, color: '#777BB4' },
        { name: 'TypeScript', icon: <Code2 size={32} />, color: '#3178C6' },
        { name: 'Python', icon: <Terminal size={32} />, color: '#3776AB' },
        { name: 'Flutter', icon: <Smartphone size={32} />, color: '#02569B' },
        { name: 'Swift', icon: <Zap size={32} />, color: '#F05138' },
        { name: 'Kotlin', icon: <Smartphone size={32} />, color: '#7F52FF' },
        { name: 'WordPress', icon: <Globe size={32} />, color: '#21759B' },
        { name: 'Tailwind', icon: <Palette size={32} />, color: '#06B6D4' },
        { name: 'MySQL', icon: <Database size={32} />, color: '#4479A1' },
        { name: 'PostgreSQL', icon: <Database size={32} />, color: '#4169E1' },
        { name: 'MongoDB', icon: <Database size={32} />, color: '#47A248' },
        { name: 'Firebase', icon: <Flame size={32} />, color: '#FFCA28' },
        { name: 'AWS', icon: <Cloud size={32} />, color: '#FF9900' },
        { name: 'Docker', icon: <Box size={32} />, color: '#2496ED' },
        { name: 'Figma', icon: <Figma size={32} />, color: '#F24E1E' },
    ];

    const marqueeItems = [...techs, ...techs];

    return (
        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-brand-primary border-t border-brand-border">
            <div className="absolute inset-0 tech-grid opacity-10" />

            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[140px] pointer-events-none opacity-50" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-secondary/5 rounded-full blur-[140px] pointer-events-none opacity-50" />

            <div className="section-container relative z-10 px-0 max-w-none">
                <SectionReveal>
                    <div className="text-center mb-12 section-container pb-0">
                        <span className="text-brand-accent font-mono text-xs tracking-[0.4em] uppercase mb-4 block">{dict.home.tech.badge}</span>
                        <h2 className="text-4xl md:text-7xl font-display font-black text-brand-text mb-6  tracking-tighter">
                            {dict.home.tech.titleLine1} <span className="text-brand-accent italic">{dict.home.tech.titleHighlight}</span>
                        </h2>
                        <div className="w-32 h-1 bg-brand-accent mx-auto mb-10 rounded-full shadow-neon-cyan" />
                        <p className="text-brand-muted max-w-2xl mx-auto text-lg font-light opacity-80">
                            {dict.home.tech.subtitle}
                        </p>
                    </div>
                </SectionReveal>

                <div className="relative w-full overflow-hidden py-10 group" dir="ltr">
                    <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-brand-primary to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-brand-primary to-transparent z-10 pointer-events-none" />

                    <motion.div
                        className="flex whitespace-nowrap w-max"
                        dir="ltr"
                        animate={{
                            x: [0, "-50%"]
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 50,
                                ease: "linear",
                            }
                        }}
                        style={{ display: 'flex' }}
                        whileHover={{ animationPlayState: 'paused' as any }}
                    >
                        {marqueeItems.map((tech, i) => (
                            <div
                                key={i}
                                className="group/card relative flex items-center gap-6 px-10 py-8 glass-card border-brand-border bg-white/[0.01] hover:bg-white/[0.05] transition-all duration-700 cursor-pointer overflow-hidden rounded-2xl min-w-[280px] mx-5 my-2"
                            >
                                <div
                                    className="absolute inset-0 opacity-0 group-hover/card:opacity-10 transition-opacity duration-700 pointer-events-none"
                                    style={{ background: `radial-gradient(100% 100% at center, ${tech.color}44, transparent)` }}
                                />

                                <div
                                    className="relative z-10 transition-all duration-700 group-hover/card:scale-110 group-hover/card:rotate-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                    style={{ color: tech.color }}
                                >
                                    {tech.icon}
                                </div>
                                <div className="relative z-10 flex flex-col">
                                    <span className="text-xl font-display font-black tracking-widest text-brand-muted group-hover/card:text-brand-text transition-colors duration-500 uppercase">
                                        {tech.name}
                                    </span>
                                    <div className="h-[1px] w-0 group-hover/card:w-full bg-current transition-all duration-500 mt-2 opacity-40" style={{ backgroundColor: tech.color }} />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}


// ============ CONTACT FORM SECTION ============
function ContactFormSection({ data }: { data?: any }) {
    const dict = useDictionary();
    const params = useParams();
    const isAr = params?.lang === 'ar';

    const {
        badge = dict.home.contact.badge,
        title = dict.home.contact.title,
        description = dict.home.contact.subtitle
    } = (isAr ? data : {}) || {};

    return (
        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-brand-primary border-t border-brand-border">
            <div className="absolute inset-0 tech-grid opacity-5" />
            <div className="section-container relative z-10">
                <SectionReveal>
                    <div className="text-center mb-12">
                        <span className="text-brand-accent font-mono text-xs tracking-[0.4em] uppercase mb-4 block">{badge}</span>
                        <h2 className="text-4xl md:text-6xl font-display font-black text-brand-text mb-6  tracking-tight uppercase italic">
                            {title}
                        </h2>
                        <div className="w-24 h-1 bg-brand-accent mx-auto mb-8 rounded-full shadow-neon-cyan" />
                        <p className="text-brand-muted max-w-2xl mx-auto text-lg font-light opacity-80">
                            {description}
                        </p>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Contact Form */}
                    <SectionReveal delay={0.2} direction="left">
                        <form className="glass-card p-10 md:p-14 space-y-8 bg-brand-glass border-brand-border shadow-2xl relative overflow-hidden group/form">
                            <div className="absolute inset-0 bg-brand-accent/[0.01] opacity-0 group-hover/form:opacity-100 transition-opacity pointer-events-none" />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                <Input label={dict.home.contact.form.name} placeholder={dict.contact.form.fields.name.placeholder} required className="bg-white/[0.02] border-brand-border focus:border-brand-accent/30 transition-all" />
                                <Input label={dict.home.contact.form.email} type="email" placeholder={dict.contact.form.fields.email.placeholder} required className="bg-white/[0.02] border-brand-border focus:border-brand-accent/30 transition-all" />
                            </div>

                            <Input label={dict.home.contact.form.company} placeholder={dict.contact.form.fields.company.placeholder} className="bg-white/[0.02] border-brand-border focus:border-brand-accent/30 transition-all" />

                            <Select
                                label={dict.home.contact.form.service}
                                className="bg-white/[0.02] border-brand-border focus:border-brand-accent/30 transition-all"
                                options={[
                                    { value: '', label: dict.contact.form.fields.service.options.default },
                                    { value: 'web', label: dict.contact.form.fields.service.options.web },
                                    { value: 'mobile', label: dict.contact.form.fields.service.options.mobile },
                                    { value: 'design', label: dict.contact.form.fields.service.options.design },
                                    { value: 'business', label: dict.contact.form.fields.service.options.business },
                                    { value: 'marketing', label: dict.contact.form.fields.service.options.marketing },
                                    { value: 'other', label: dict.contact.form.fields.service.options.other },
                                ]}
                            />

                            <Textarea label={dict.home.contact.form.message} placeholder={dict.contact.form.fields.message.placeholder} rows={6} className="bg-white/[0.02] border-brand-border focus:border-brand-accent/30 transition-all" />

                            <Button type="submit" variant="primary" size="lg" fullWidth icon={<ArrowRight size={24} />} className="h-16 text-lg font-bold rounded-xl shadow-neon-cyan transition-all duration-500 hover:scale-[1.02] active:scale-95">
                                {dict.home.contact.form.submit}
                            </Button>
                        </form>
                    </SectionReveal>

                    {/* Right: Map and Info */}
                    <SectionReveal delay={0.4} direction="right" className="h-full">
                        <div className="flex flex-col h-full gap-10">
                            {/* Map */}
                            <div className="glass-card overflow-hidden h-[450px] border-brand-border relative group/map shadow-2xl">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.8641668267813!2d8.5204!3d47.3863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a0d7d0f0000%3A0x0!2sHardstrasse%20201%2C%208005%20Z%C3%BCrich!5e0!3m2!1sen!2sch!4v1710691886490!5m2!1sen!2sch"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="grayscale opacity-50 group-hover/map:opacity-100 group-hover/map:grayscale-0 transition-all duration-1000 scale-105 group-hover/map:scale-100"
                                />
                                <div className="absolute inset-0 pointer-events-none border border-brand-accent/10 group-hover/map:border-brand-accent/30 transition-colors" />
                                <div className="absolute top-6 left-6 px-4 py-2 bg-brand-primary/80 backdrop-blur-md border border-brand-border rounded-lg text-brand-accent text-xs font-mono uppercase tracking-widest shadow-xl">
                                    {dict.contact.info.hqTitle}
                                </div>
                            </div>

                            {/* Contact Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { icon: <Globe size={20} />, title: dict.contact.info.location, content: COMPANY_ADDRESS, color: 'cyan' },
                                    { icon: <Shield size={20} />, title: dict.contact.info.license, content: COMPANY_LICENSE, color: 'purple' },
                                    { icon: <Smartphone size={20} />, title: dict.contact.info.phone, content: OFFICE_PHONE, color: 'cyan' },
                                    { icon: <Mail size={20} />, title: dict.contact.info.emailUs, content: 'info@barmagly.tech', color: 'purple' },
                                ].map((item, i) => (
                                    <div key={i} className="glass-card p-6 border-brand-border hover:border-brand-accent/20 transition-all group/info hover:bg-white/[0.01]">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className={cn(
                                                "p-3 rounded-xl transition-all duration-500 group-hover/info:scale-110",
                                                item.color === 'cyan' ? "bg-brand-accent/10 text-brand-accent shadow-neon-cyan/20" : "bg-brand-secondary/10 text-brand-secondary shadow-neon-purple/20"
                                            )}>
                                                {item.icon}
                                            </div>
                                            <h4 className="text-brand-text font-black text-sm uppercase tracking-widest">{item.title}</h4>
                                        </div>
                                        <p className="text-brand-muted text-sm leading-relaxed font-light break-words">
                                            {item.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SectionReveal>
                </div>
            </div>
        </section>
    );
}

// ============ HOME PAGE ============
export default function HomePage() {
    const [data, setData] = React.useState<any>({});

    React.useEffect(() => {
        const load = async () => {
            try {
                const { data } = await publicApi.getPageSections('home');
                setData(data);
            } catch (e) {
                console.error(e);
            }
        };
        load();
    }, []);

    return (
        <>
            <HeroSection data={data.hero} />
            <ServicesSection />
            <PosSection />
            <WhyChooseSection data={data.features} />
            <CountersSection data={data.stats} />
            <TestimonialsSection />
            <TechSection />
            <ContactFormSection data={data.cta} />
        </>
    );
}
