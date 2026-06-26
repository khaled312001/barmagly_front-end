'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionReveal, SectionHeading } from '@/components/ui/SectionReveal';
import { staggerContainer, staggerItem, heroTextReveal } from '@/lib/animations';
import { MessageCircle, ArrowRight, CheckCircle2, Search, Layout, Cpu, ShieldCheck } from 'lucide-react';
import { useParams } from 'next/navigation';
import { publicApi } from '@/lib/api';
import { useDictionary } from '@/lib/contexts/DictionaryContext';
import { getAllServices } from '@/data/services';
import { cn } from '@/lib/utils';

// Helper to render icon dynamically
const DynamicIcon = ({ name, size = 32 }: { name: string; size?: number }) => {
    // Cast to any to access by string key
    const Icon = (LucideIcons as any)[name] || LucideIcons.Code2;
    return <Icon size={size} />;
};

interface ServiceDetail {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
    image?: string;
}

function ServicesHero() {
    const dict = useDictionary();
    return (
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-28 overflow-hidden bg-brand-primary border-b border-brand-border">
            <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />

            <div className="section-container relative">
                <div className="max-w-3xl">
                    <span className="section-eyebrow">{dict.services.hero.badge}</span>
                    <h1 className="mt-4 font-display text-brand-text text-[36px] sm:text-[52px] lg:text-[72px] leading-[1.05] font-extrabold tracking-[-0.025em]">
                        {dict.services.hero.titleLine1}{' '}
                        <span className="text-brand-accent">{dict.services.hero.titleHighlight}</span>
                    </h1>
                    <p
                        className="mt-6 text-brand-text-soft text-[16px] sm:text-[17px] lg:text-[18px] leading-[1.7] max-w-[58ch]"
                        dangerouslySetInnerHTML={{ __html: dict.services.hero.subtitle }}
                    />
                </div>
            </div>
        </section>
    );
}

function ServiceSection({ service, index, lang }: { service: ServiceDetail; index: number; lang: string }) {
    const isEven = index % 2 === 0;
    const dict = useDictionary();

    return (
        <section
            id={service.id}
            className={cn(
                'relative overflow-hidden py-20 lg:py-28 border-b border-brand-border',
                isEven ? 'bg-brand-primary' : 'bg-brand-surface'
            )}
        >
            <div className="section-container">
                <div className={cn(
                    'grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center',
                )}>
                    {/* Text col */}
                    <SectionReveal direction={isEven ? 'left' : 'right'} className={cn('lg:col-span-6', isEven ? 'lg:order-1' : 'lg:order-2')}>
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-brand-accent-soft text-brand-accent mb-6">
                            {service.icon}
                        </div>

                        <span className="section-eyebrow">0{index + 1}</span>
                        <h2 className="mt-3 font-display text-brand-text text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.15] font-extrabold tracking-tight">
                            {service.title}
                        </h2>
                        <p className="mt-5 text-brand-text-soft text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.7] max-w-[58ch]">
                            {service.description}
                        </p>

                        {service.features && service.features.length > 0 && (
                            <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                                {service.features.slice(0, 6).map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-[14px] text-brand-text-soft">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" />
                                        <span className="leading-[1.65]">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="mt-9 flex flex-wrap gap-3">
                            <Link href={`/${lang}/services/${service.id}`}>
                                <Button variant="primary" size="lg" icon={<ArrowRight size={18} className="rtl:rotate-180" />} className="rounded-full px-6 h-12 text-[14px]">
                                    {dict.services.serviceSection.explorationHub}
                                </Button>
                            </Link>
                            <Link href={`/${lang}/contact`}>
                                <Button variant="outline" size="lg" className="rounded-full px-6 h-12 text-[14px] border-brand-border-strong text-brand-text hover:bg-brand-surface">
                                    {dict.services.serviceSection.expertConsult}
                                </Button>
                            </Link>
                        </div>
                    </SectionReveal>

                    {/* Image col */}
                    <SectionReveal direction={isEven ? 'right' : 'left'} className={cn('lg:col-span-6', isEven ? 'lg:order-2' : 'lg:order-1')}>
                        <div className="relative rounded-2xl overflow-hidden border border-brand-border shadow-card-lg bg-white">
                            {service.image ? (
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-auto object-cover aspect-[16/10]"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="aspect-[16/10] bg-brand-sunken flex items-center justify-center text-brand-muted text-sm">
                                    {service.title}
                                </div>
                            )}
                        </div>
                    </SectionReveal>
                </div>
            </div>
        </section>
    );
}

// ============ ROADMAP SECTION ============
function RoadmapSection() {
    const dict = useDictionary();
    const steps = [
        { title: dict.services.roadmap.steps[0].title, desc: dict.services.roadmap.steps[0].desc, icon: <LucideIcons.Search size={24} /> },
        { title: dict.services.roadmap.steps[1].title, desc: dict.services.roadmap.steps[1].desc, icon: <LucideIcons.Layout size={24} /> },
        { title: dict.services.roadmap.steps[2].title, desc: dict.services.roadmap.steps[2].desc, icon: <LucideIcons.Cpu size={24} /> },
        { title: dict.services.roadmap.steps[3].title, desc: dict.services.roadmap.steps[3].desc, icon: <LucideIcons.ShieldCheck size={24} /> },
    ];

    return (
        <section className="section-padding relative overflow-hidden bg-brand-primary border-t border-brand-border">
            <div className="absolute inset-0 tech-grid opacity-5" />
            <div className="section-container relative z-10">
                <SectionHeading badge={dict.services.roadmap.badge} title={dict.services.roadmap.title} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
                    {steps.map((step, i) => (
                        <SectionReveal key={i} delay={i * 0.1} direction="up">
                            <div className="glass-card p-8 h-full relative group hover:border-brand-accent/30 transition-all duration-500">
                                <div className="absolute -top-6 -left-6 text-6xl font-display font-black text-brand-text/5 group-hover:text-brand-accent/10 transition-colors">
                                    0{i + 1}
                                </div>
                                <div className="p-4 rounded-2xl bg-brand-accent/10 text-brand-accent w-fit mb-6 border border-brand-accent/20 group-hover:shadow-neon-cyan transition-all duration-500">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-display font-black text-brand-text mb-3 tracking-tight">{step.title}</h3>
                                <p className="text-brand-muted leading-relaxed text-sm font-light">{step.desc}</p>
                            </div>
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function ServicesPage() {
    const params = useParams();
    const lang = params?.lang as string;
    const dict = useDictionary();

    // Seed with the static catalogue so the page is fully rendered at SSR time,
    // then merge any extras from the API on the client.
    const staticSeed = React.useMemo<ServiceDetail[]>(() => {
        return getAllServices().map((s) => ({
            id: s.slug,
            title: lang === 'en' ? s.titleEn : s.title,
            description: lang === 'en' ? s.summaryEn : s.summary,
            icon: <DynamicIcon name={s.icon || 'Code2'} size={32} />,
            features: lang === 'en' ? s.featuresEn : s.features,
            image: s.image,
            slug: s.slug,
        } as any));
    }, [lang]);

    const [services, setServices] = React.useState<ServiceDetail[]>(staticSeed);

    React.useEffect(() => {
        setServices(staticSeed);
        publicApi.getServices().then(({ data }) => {
            if (!Array.isArray(data) || data.length === 0) return;
            const apiServices = data.flatMap((cat: any) => cat.services || []).map((s: any) => {
                let features: string[] = [];
                const featuresStr = (lang === 'en' && s.featuresEn) ? s.featuresEn : s.features;
                if (featuresStr) {
                    if (Array.isArray(featuresStr)) {
                        features = featuresStr;
                    } else {
                        try {
                            const parsed = JSON.parse(featuresStr);
                            features = Array.isArray(parsed) ? parsed : [parsed.toString()];
                        } catch (e) {
                            features = featuresStr.split(',').map((s: string) => s.trim()).filter(Boolean);
                        }
                    }
                }
                return {
                    id: s.slug || '',
                    title: lang === 'en' && s.titleEn ? s.titleEn : s.title,
                    description: lang === 'en' && s.descriptionEn ? s.descriptionEn : s.description,
                    icon: <DynamicIcon name={s.icon || 'Code2'} size={32} />,
                    features,
                    slug: s.slug,
                };
            });
            const bySlug = new Map<string, any>();
            staticSeed.forEach((s) => bySlug.set((s as any).slug, s));
            apiServices.forEach((s: any) => bySlug.set(s.slug, s));
            setServices(Array.from(bySlug.values()));
        }).catch(() => { /* keep seed */ });
    }, [lang, staticSeed]);

    const displayServices = services;

    return (
        <>
            <ServicesHero />
            {displayServices.map((service, i) => (
                <ServiceSection key={service.id} service={service} index={i} lang={lang} />
            ))}

            <RoadmapSection />

            {/* CTA */}
            <section className="section-padding relative overflow-hidden">
                <div className="absolute inset-0 bg-accent-gradient opacity-10" />
                <div className="section-container relative z-10">
                    <div className="glass-card p-12 md:p-20 text-center max-w-5xl mx-auto border-brand-accent/20 shadow-neon-cyan overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-[140px] -mr-48 -mt-48" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-secondary/10 rounded-full blur-[140px] -ml-48 -mb-48" />

                        <div className="relative z-10">
                            <span className="text-brand-accent font-mono text-xs tracking-[0.5em] uppercase mb-6 block">{dict.services.cta.badge}</span>
                            <h2 className="text-4xl md:text-6xl font-display font-black text-brand-text mb-8 tracking-tighter">
                                {dict.services.cta.titleLine1} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-white to-brand-secondary">{dict.services.cta.titleHighlight}</span>
                            </h2>
                            <p className="text-brand-muted text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                                {dict.services.cta.subtitle}
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Link href={`/${lang}/contact`} className="w-full sm:w-auto">
                                    <Button size="xl" variant="primary" icon={<ArrowRight size={24} className="rtl:rotate-180" />} className="w-full sm:min-w-[240px] shadow-neon-cyan flex-row-reverse rtl:flex-row">
                                        {dict.services.cta.launchSolution}
                                    </Button>
                                </Link>
                                <Link href={`/${lang}/contact`} className="w-full sm:w-auto">
                                    <Button size="xl" variant="outline" icon={<MessageCircle size={24} />} className="w-full sm:min-w-[240px] border-brand-border hover:border-brand-accent/30 flex-row-reverse rtl:flex-row">
                                        {dict.services.cta.whatsappIntel}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
