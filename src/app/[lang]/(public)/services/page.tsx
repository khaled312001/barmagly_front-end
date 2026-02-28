'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionReveal, SectionHeading } from '@/components/ui/SectionReveal';
import { staggerContainer, staggerItem, heroTextReveal } from '@/lib/animations';
import { WHATSAPP_URL } from '@/lib/utils';
import { MessageCircle, ArrowRight, CheckCircle2, Search, Layout, Cpu, ShieldCheck } from 'lucide-react';
import { useParams } from 'next/navigation';
import { publicApi } from '@/lib/api';
import { useDictionary } from '@/lib/contexts/DictionaryContext';

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
}

function ServicesHero() {
    const dict = useDictionary();
    return (
        <section className="relative pt-48 pb-32 lg:pt-56 lg:pb-40 overflow-hidden bg-brand-primary">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-hero-gradient" />
            <div className="absolute inset-0 tech-grid opacity-20" />

            {/* Animated Circuit Pattern */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 circuit-pattern pointer-events-none"
            />

            {/* Glowing Accents */}
            <div className="absolute top-1/4 -right-32 w-96 h-96 bg-brand-accent/20 rounded-full blur-[128px] animate-pulse-glow" />
            <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-brand-secondary/10 rounded-full blur-[128px] animate-pulse" />

            <div className="section-container relative z-10">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-5xl mx-auto text-center"
                >
                    <motion.div variants={heroTextReveal} className="mb-8">
                        <span className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-brand-glass border border-brand-accent/30 text-brand-accent text-sm font-mono tracking-[0.2em] shadow-neon-cyan backdrop-blur-md">
                            <LucideIcons.Shield size={18} className="animate-pulse" />
                            <span className="uppercase">{dict.services.hero.badge}</span>
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={heroTextReveal}
                        className="text-4xl sm:text-6xl lg:text-8xl font-display font-black text-white mb-8 tracking-tight drop-shadow-2xl px-4"
                    >
                        {dict.services.hero.titleLine1} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-white to-brand-secondary filter drop-shadow-[0_0_30px_rgba(0,212,255,0.3)] italic">
                            {dict.services.hero.titleHighlight}
                        </span>
                    </motion.h1>
                    <motion.p variants={heroTextReveal} className="text-xl md:text-2xl text-brand-muted max-w-3xl mx-auto leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: dict.services.hero.subtitle }} />
                </motion.div>
            </div>

            {/* Floating Elements Container */}
            <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-hidden">
                <motion.div
                    animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] left-[10%] p-5 glass-card border-brand-accent/20 shadow-neon-cyan"
                >
                    <LucideIcons.Code2 className="text-brand-accent" size={32} />
                </motion.div>
                <motion.div
                    animate={{ y: [0, 30, 0], rotate: [0, -10, 10, 0], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-[50%] right-[10%] p-5 glass-card border-brand-secondary/20 shadow-neon-purple"
                >
                    <LucideIcons.Zap className="text-brand-secondary" size={32} />
                </motion.div>
            </div>
        </section>
    );
}

function ServiceSection({ service, index }: { service: ServiceDetail; index: number }) {
    const isEven = index % 2 === 0;
    const dict = useDictionary();

    return (
        <section id={service.id} className={`section-padding relative overflow-hidden ${isEven ? 'bg-brand-primary' : 'bg-brand-dark/30'}`}>
            <div className="absolute inset-0 tech-grid opacity-5" />

            <div className="section-container relative z-10">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                    <SectionReveal direction={isEven ? 'left' : 'right'}>
                        <div className={!isEven ? 'lg:order-2' : ''}>
                            <div className="relative inline-block mb-8">
                                <div className="absolute -inset-4 bg-brand-accent/20 rounded-full blur-2xl animate-pulse" />
                                <div className="p-5 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 text-brand-accent relative z-10">
                                    {service.icon}
                                </div>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6 tracking-tight">
                                {service.title}
                            </h2>
                            <p className="text-brand-muted text-lg leading-relaxed mb-10 font-light">
                                {service.description}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href={`/services/${service.id}`}>
                                    <Button variant="primary" size="lg" icon={<ArrowRight size={20} className="rtl:rotate-180" />} className="shadow-neon-cyan">
                                        {dict.services.serviceSection.explorationHub}
                                    </Button>
                                </Link>
                                <Link href={`${WHATSAPP_URL}?text=Hi, I'm interested in ${service.title}`} target="_blank">
                                    <Button variant="outline" size="lg" icon={<MessageCircle size={20} />} className="border-white/10 hover:border-brand-accent/30 flex-row-reverse rtl:flex-row">
                                        {dict.services.serviceSection.expertConsult}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </SectionReveal>

                    <SectionReveal direction={isEven ? 'right' : 'left'}>
                        <div className={`relative ${!isEven ? 'lg:order-1' : ''}`}>
                            <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent/20 to-brand-secondary/20 rounded-3xl blur opacity-30" />
                            <div className="glass-card p-10 relative bg-brand-dark/50 border-white/10 backdrop-blur-2xl overflow-hidden group">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-accent/5 rounded-full blur-[80px] rtl:-ml-24 rtl:mr-auto ltr:-mr-24 -mt-24 group-hover:bg-brand-accent/10 transition-colors" />

                                <h4 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-brand-accent mb-10 flex items-center gap-3">
                                    <span className="w-8 h-px bg-brand-accent/50" />
                                    {dict.services.serviceSection.technicalCapabilities}
                                </h4>

                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {service.features.map((feature, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.05 }}
                                            className="flex items-center gap-4 group/item"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-brand-accent shadow-neon-cyan group-hover/item:scale-150 transition-transform flex-shrink-0" />
                                            <span className="text-brand-muted text-sm tracking-wide font-light group-hover/item:text-white transition-colors">
                                                {feature}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>

                                <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex -space-x-3 rtl:space-x-reverse">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-8 h-8 rounded-full border border-brand-dark bg-brand-surface flex items-center justify-center text-[10px] font-mono text-brand-accent">
                                                0{i}
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand-muted/40">{dict.services.serviceSection.verifiedArchitecture}</span>
                                </div>
                            </div>
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
        <section className="section-padding relative overflow-hidden bg-brand-primary border-t border-white/5">
            <div className="absolute inset-0 tech-grid opacity-5" />
            <div className="section-container relative z-10">
                <SectionHeading badge={dict.services.roadmap.badge} title={dict.services.roadmap.title} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
                    {steps.map((step, i) => (
                        <SectionReveal key={i} delay={i * 0.1} direction="up">
                            <div className="glass-card p-8 h-full relative group hover:border-brand-accent/30 transition-all duration-500">
                                <div className="absolute -top-6 -left-6 text-6xl font-display font-black text-white/5 group-hover:text-brand-accent/10 transition-colors">
                                    0{i + 1}
                                </div>
                                <div className="p-4 rounded-2xl bg-brand-accent/10 text-brand-accent w-fit mb-6 border border-brand-accent/20 group-hover:shadow-neon-cyan transition-all duration-500">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-display font-black text-white mb-3 tracking-tight">{step.title}</h3>
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
    const [services, setServices] = React.useState<ServiceDetail[]>([]);
    const dict = useDictionary();

    React.useEffect(() => {
        publicApi.getServices().then(({ data }) => {
            // Flatten services from categories
            const allServices = data.flatMap((cat: any) => cat.services || []).map((s: any) => {
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
                            // If not valid JSON, treat as comma-separated string
                            features = featuresStr.split(',').map((s: string) => s.trim()).filter(Boolean);
                        }
                    }
                }
                return {
                    id: s.slug || '',
                    title: lang === 'en' && s.titleEn ? s.titleEn : s.title,
                    description: lang === 'en' && s.descriptionEn ? s.descriptionEn : s.description,
                    icon: <DynamicIcon name={s.icon || 'Code2'} size={32} />,
                    features: features,
                    slug: s.slug
                };
            })
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
        });
    }, [lang]);

    const displayServices = services;

    return (
        <>
            <ServicesHero />
            {displayServices.map((service, i) => (
                <ServiceSection key={service.id} service={service} index={i} />
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
                            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 tracking-tighter">
                                {dict.services.cta.titleLine1} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-white to-brand-secondary">{dict.services.cta.titleHighlight}</span>
                            </h2>
                            <p className="text-brand-muted text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                                {dict.services.cta.subtitle}
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Link href="/contact" className="w-full sm:w-auto">
                                    <Button size="xl" variant="primary" icon={<ArrowRight size={24} className="rtl:rotate-180" />} className="w-full sm:min-w-[240px] shadow-neon-cyan flex-row-reverse rtl:flex-row">
                                        {dict.services.cta.launchSolution}
                                    </Button>
                                </Link>
                                <Link href={WHATSAPP_URL} target="_blank" className="w-full sm:w-auto">
                                    <Button size="xl" variant="outline" icon={<MessageCircle size={24} />} className="w-full sm:min-w-[240px] border-white/10 hover:border-brand-accent/30 flex-row-reverse rtl:flex-row">
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
