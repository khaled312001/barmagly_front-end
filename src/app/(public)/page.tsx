'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Smartphone, Palette, ShoppingCart, TrendingUp, ArrowRight, Shield, Zap, Users, Globe, CheckCircle2, Star, ChevronRight, Atom, Server, Cpu, Database, Cloud, Terminal, Box, Figma, Mail, Flame, Layers, Briefcase, Target } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ServiceCard } from '@/components/ui/Card';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { Input, Textarea, Select } from '@/components/ui/FormElements';
import { staggerContainer, staggerItem, heroTextReveal } from '@/lib/animations';
import { cn, WHATSAPP_URL, COMPANY_LICENSE, COMPANY_ADDRESS } from '@/lib/utils';
import Link from 'next/link';
import { MouseFollower } from '@/components/ui/MouseFollower';
import { publicApi } from '@/lib/api';

// ============ HERO SECTION ============
function HeroSection({ data }: { data?: any }) {
    const {
        badgeText = "Licensed Swiss Tech Company",
        titleLine1 = "Barmagly:",
        titleLine2 = "Swiss Precision, Global Innovation",
        description = "We architect enterprise-grade digital systems and bespoke software solutions that scale. From intelligent apps to robust business platforms, we turn your vision into high-tech reality.",
        primaryBtnText = "Start Your Project",
        secondaryBtnText = "View Our Portfolio"
    } = data || {};

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-primary">
            {/* Interactive Spotlight */}
            <MouseFollower />

            {/* Background Effects */}
            <div className="absolute inset-0 bg-hero-gradient" />
            <div className="absolute inset-0 tech-grid opacity-20" />

            {/* Animated Circuit Pattern Background */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 circuit-pattern opacity-30"
            />

            {/* Dynamic Geometric Accents */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.15, 0.25, 0.15],
                        x: [0, 50, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-[10%] -right-[5%] w-[800px] h-[800px] bg-brand-accent/20 rounded-full blur-[140px]"
                    style={{ willChange: 'transform, opacity' }}
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.1, 0.2, 0.1],
                        x: [0, -40, 0],
                        y: [0, 20, 0]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] -left-[10%] w-[700px] h-[700px] bg-brand-secondary/20 rounded-full blur-[120px]"
                    style={{ willChange: 'transform, opacity' }}
                />
            </div>

            {/* Floating Tech Elements with Enhanced Motion */}
            <div className="absolute inset-0 pointer-events-none hidden lg:block">
                <motion.div
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, 10, -10, 0],
                        opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[25%] left-[10%] p-5 glass-card neon-glow-cyan border-brand-accent/30"
                    style={{ willChange: 'transform' }}
                >
                    <Terminal className="text-brand-accent" size={38} />
                </motion.div>

                <motion.div
                    animate={{
                        y: [0, 30, 0],
                        rotate: [0, -15, 15, 0],
                        opacity: [0.4, 0.7, 0.4]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-[55%] right-[12%] p-5 glass-card neon-glow-purple border-brand-secondary/30"
                    style={{ willChange: 'transform' }}
                >
                    <Target className="text-brand-secondary" size={38} />
                </motion.div>

                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 360],
                    }}
                    transition={{
                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                    }}
                    className="absolute bottom-[25%] left-[20%] p-3 glass-card opacity-30 border-white/10"
                >
                    <TrendingUp className="text-brand-accent" size={28} />
                </motion.div>
            </div>

            <div className="section-container relative z-10 pt-40 pb-20 lg:pt-48 lg:pb-32 text-center">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-5xl mx-auto flex flex-col items-center"
                >
                    {/* Badge */}
                    <motion.div variants={heroTextReveal} className="mb-10">
                        <span className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-brand-glass border border-brand-accent/30 text-brand-accent text-xs font-mono tracking-[0.2em] shadow-neon-cyan backdrop-blur-md">
                            <Shield size={16} className="animate-pulse" />
                            <span className="uppercase">{badgeText}</span>
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        variants={heroTextReveal}
                        className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-8 leading-[1.1] tracking-tight drop-shadow-2xl px-4"
                    >
                        <span className="block mb-4 sm:mb-2 opacity-90">{titleLine1}</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-white to-brand-secondary filter drop-shadow-[0_0_40px_rgba(0,212,255,0.35)]">
                            {titleLine2}
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        variants={heroTextReveal}
                        className="text-lg md:text-xl lg:text-2xl text-brand-muted max-w-4xl mx-auto mb-12 leading-relaxed font-light opacity-90"
                    >
                        {description}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div variants={heroTextReveal} className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-xl px-4">
                        <Link href="/contact" className="w-full sm:w-1/2">
                            <Button size="xl" variant="primary" icon={<ArrowRight size={22} />} className="w-full h-16 text-lg font-bold rounded-xl group shadow-neon-cyan transition-all duration-500 hover:scale-105 active:scale-95">
                                {primaryBtnText}
                            </Button>
                        </Link>
                        <Link href="/portfolio" className="w-full sm:w-1/2">
                            <Button size="xl" variant="neon" className="w-full h-16 text-lg font-bold rounded-xl border-white/20 hover:border-brand-secondary/50 transition-all duration-500 hover:scale-105 active:scale-95">
                                {secondaryBtnText}
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Enhanced Trust indicators */}
                    <motion.div
                        variants={heroTextReveal}
                        className="mt-20 grid grid-cols-2 lg:flex lg:flex-nowrap items-center justify-center gap-6 sm:gap-12 w-full px-4"
                    >
                        {[
                            { icon: <Terminal size={20} />, text: 'High-End Programming', sub: 'Tech Stack' },
                            { icon: <Target size={20} />, text: 'Strategic Marketing', sub: 'Growth' },
                            { icon: <TrendingUp size={20} />, text: 'Sales Optimization', sub: 'Revenue' },
                            { icon: <Shield size={20} />, text: 'Swiss Reliability', sub: 'Quality' },
                        ].map((item, i) => (
                            <motion.div key={i} variants={staggerItem} className="flex flex-col items-center gap-3 group">
                                <span className="p-3.5 rounded-2xl bg-brand-surface border border-white/5 text-brand-accent shadow-neon-cyan group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </span>
                                <div className="text-center">
                                    <p className="text-white font-bold text-xs sm:text-sm mb-0.5 tracking-wide whitespace-nowrap">{item.text}</p>
                                    <p className="text-brand-muted text-[9px] sm:text-[10px] uppercase tracking-widest opacity-60 font-mono">{item.sub}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Premium Scroll indicator */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-brand-accent/40"
            >
                <span className="text-[10px] uppercase tracking-[0.4em] font-mono">Explore</span>
                <div className="w-px h-12 bg-gradient-to-b from-brand-accent/50 to-transparent relative overflow-hidden">
                    <motion.div
                        animate={{ y: [0, 48] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-full h-1/3 bg-white shadow-[0_0_10px_white]"
                    />
                </div>
            </motion.div>
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
    const [services, setServices] = React.useState<any[]>([]);

    React.useEffect(() => {
        publicApi.getServices().then(({ data }) => {
            // Flatten services from all categories for the homepage showcase
            const allServices = data.flatMap((cat: any) => (cat.services || []).map((s: any) => ({
                title: s.title,
                description: s.description,
                icon: <ServiceIcon name={s.icon || 'Code2'} size={32} />,
                color: cat.id % 2 === 0 ? 'cyan' : 'purple', // Alternate colors for variety
                href: `/services/${s.slug}`,
            })));
            setServices(allServices);
        }).catch(err => console.error(err));
    }, []);

    const displayServices = services;


    return (
        <section className="relative overflow-hidden py-32 bg-brand-primary">
            {/* ... header ... */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 text-[15vw] font-display font-black text-white/[0.02] select-none pointer-events-none tracking-tighter">
                SERVICES
            </div>

            <div className="absolute inset-0 tech-grid opacity-10" />

            <div className="section-container relative z-10">
                <SectionReveal>
                    <div className="text-center mb-24">
                        <span className="text-brand-accent font-mono text-xs tracking-[0.5em] uppercase mb-4 block">Our Expertise</span>
                        <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 text-glow tracking-tight">
                            Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-secondary">Excellence</span>
                        </h2>
                        <div className="w-24 h-1 bg-brand-accent mx-auto mb-8 rounded-full shadow-neon-cyan" />
                        <p className="text-brand-muted max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                            We combine Swiss precision with cutting-edge technology to deliver systems that drive growth and institutionalize innovation.
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

// ============ WHY CHOOSE US ============
function WhyChooseSection({ data }: { data?: any }) {
    const {
        badge = "Core Values",
        title = "Built on Swiss \nPrecision & Excellence",
        description = "We combine Swiss engineering discipline with global rapid innovation to deliver software solutions that redefine industry standards in quality, security, and performance.",
        btnText = "Our Scientific Approach"
    } = data || {};

    const reasons = [
        {
            icon: <Shield size={24} />,
            title: 'Swiss Licensed',
            description: 'Officially registered in Switzerland (CHE-154.312.079), ensuring maximum security and regulatory compliance.',
        },
        {
            icon: <Zap size={24} />,
            title: 'Elite Performance',
            description: 'We utilize high-end frameworks to build ultra-fast, scalable, and future-proof digital architectures.',
        },
        {
            icon: <Users size={24} />,
            title: 'Strategic Partners',
            description: 'Our team acts as your technology partner, working closely to translate goals into scalable reality.',
        },
        {
            icon: <Globe size={24} />,
            title: 'Global Delivery',
            description: 'Operating from Zurich to the world, delivering quality that meets international standards of excellence.',
        },
    ];

    return (
        <section className="relative overflow-hidden py-32 bg-brand-primary border-t border-white/5">
            <div className="absolute inset-0 tech-grid opacity-5" />
            <div className="section-container relative z-10">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    <SectionReveal direction="left" className="w-full lg:w-1/2">
                        <div className="max-w-xl">
                            <span className="text-brand-accent font-mono text-xs tracking-[0.4em] uppercase mb-4 block">{badge}</span>
                            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 leading-[1.1] tracking-tight">
                                {title}
                            </h2>
                            <p className="text-brand-muted text-lg leading-relaxed mb-10 opacity-80 font-light">
                                {description}
                            </p>

                            <Link href="/about">
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
                                <div className="glass-card p-8 group hover:bg-white/[0.03] transition-all duration-500 border-white/5 h-full flex flex-col items-start">
                                    <div className="p-4 rounded-2xl bg-brand-surface border border-white/10 text-brand-accent w-fit mb-6 group-hover:shadow-neon-cyan transition-all duration-500 group-hover:scale-110">
                                        {reason.icon}
                                    </div>
                                    <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-brand-accent transition-colors">
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
    const defaultStats = [
        { label: "High-Tech Systems", value: "150", suffix: "+", icon: <Code2 size={24} /> },
        { label: "Global Partners", value: "80", suffix: "+", icon: <Users size={24} /> },
        { label: "Years of Research", value: "5", suffix: "+", icon: <Star size={24} /> },
        { label: "Success Metric", value: "100", suffix: "%", icon: <CheckCircle2 size={24} /> },
    ];

    // Merge dynamic stats with defaults (preserving icons if possible, or just using defaults if no dynamic data)
    // If we have dynamic stats, we use them.
    const stats: any[] = data?.stats && data.stats.length > 0 ? data.stats : defaultStats;

    return (
        <section className="relative overflow-hidden py-24 bg-brand-primary border-y border-white/5">
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
function TestimonialsSection() {
    const [testimonials, setTestimonials] = React.useState<any[]>([]);

    React.useEffect(() => {
        publicApi.getTestimonials().then(({ data }) => setTestimonials(data)).catch(console.error);
    }, []);

    const displayTestimonials = testimonials;

    return (
        <section className="relative overflow-hidden py-32 bg-brand-primary">
            <div className="absolute inset-0 tech-grid opacity-5" />
            <div className="section-container relative z-10">
                <SectionReveal>
                    <div className="text-center mb-24">
                        <span className="text-brand-accent font-mono text-xs tracking-[0.4em] uppercase mb-4 block">Endorsements</span>
                        <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 text-glow tracking-tight">
                            Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-secondary">Recognition</span>
                        </h2>
                        <div className="w-24 h-1 bg-brand-accent mx-auto mb-8 rounded-full shadow-neon-cyan" />
                        <p className="text-brand-muted max-w-2xl mx-auto text-lg font-light opacity-80 italic">
                            &ldquo;Precision is our standard, innovation is our result.&rdquo;
                        </p>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                    {displayTestimonials.map((t, i) => (
                        <SectionReveal key={i} delay={i * 0.1}>
                            <div className="glass-card p-10 h-full flex flex-col group hover:bg-white/[0.04] transition-all duration-500 border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                                    <Globe size={80} className="text-brand-accent" />
                                </div>

                                <div className="flex gap-1.5 mb-8 text-brand-accent">
                                    {Array.from({ length: t.rating }).map((_, j) => (
                                        <Star key={j} size={16} className="fill-current" />
                                    ))}
                                </div>

                                <p className="text-brand-muted text-lg leading-relaxed flex-1 mb-10 font-light opacity-90">
                                    &ldquo;{t.content}&rdquo;
                                </p>

                                <div className="flex items-center gap-5 border-t border-white/10 pt-8 mt-auto">
                                    <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent font-black text-xl shadow-inner">
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-white font-black leading-none mb-1.5 text-lg">{t.name}</p>
                                        <p className="text-brand-accent text-xs font-mono uppercase tracking-[0.2em] opacity-80">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============ TECHNOLOGIES SECTION ============
function TechSection() {
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
        <section className="relative overflow-hidden py-32 bg-brand-primary border-t border-white/5">
            <div className="absolute inset-0 tech-grid opacity-10" />

            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[140px] pointer-events-none opacity-50" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-secondary/5 rounded-full blur-[140px] pointer-events-none opacity-50" />

            <div className="section-container relative z-10 px-0 max-w-none">
                <SectionReveal>
                    <div className="text-center mb-24 section-container pb-0">
                        <span className="text-brand-accent font-mono text-xs tracking-[0.4em] uppercase mb-4 block">Tech Ecosystem</span>
                        <h2 className="text-4xl md:text-7xl font-display font-black text-white mb-6 text-glow tracking-tighter">
                            Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-white to-brand-secondary italic">Standards</span>
                        </h2>
                        <div className="w-32 h-1 bg-brand-accent mx-auto mb-10 rounded-full shadow-neon-cyan" />
                        <p className="text-brand-muted max-w-2xl mx-auto text-lg font-light opacity-80">
                            We architect high-performance infrastructures using the world&apos;s most sophisticated technology frameworks.
                        </p>
                    </div>
                </SectionReveal>

                <div className="relative w-full overflow-hidden py-10 group">
                    <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-brand-primary to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-brand-primary to-transparent z-10 pointer-events-none" />

                    <motion.div
                        className="flex whitespace-nowrap gap-10 w-max px-4"
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
                                className="group/card relative flex items-center gap-6 px-10 py-8 glass-card border-white/5 bg-white/[0.01] hover:bg-white/[0.05] transition-all duration-700 cursor-pointer overflow-hidden rounded-2xl min-w-[280px]"
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
                                    <span className="text-xl font-display font-black tracking-widest text-brand-muted group-hover/card:text-white transition-colors duration-500 uppercase">
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
    const {
        badge = "Initiation",
        title = "Launch Your Project",
        description = "Our team of Swiss-trained experts is ready to architect your digital future. Let's turn your vision into a strategic technological asset."
    } = data || {};

    return (
        <section className="relative overflow-hidden py-32 bg-brand-primary border-t border-white/5">
            <div className="absolute inset-0 tech-grid opacity-5" />
            <div className="section-container relative z-10">
                <SectionReveal>
                    <div className="text-center mb-20">
                        <span className="text-brand-accent font-mono text-xs tracking-[0.4em] uppercase mb-4 block">{badge}</span>
                        <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 text-glow tracking-tight uppercase italic">
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
                        <form className="glass-card p-10 md:p-14 space-y-8 bg-brand-glass border-white/5 shadow-2xl relative overflow-hidden group/form">
                            <div className="absolute inset-0 bg-brand-accent/[0.01] opacity-0 group-hover/form:opacity-100 transition-opacity pointer-events-none" />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                <Input label="Professional Name" placeholder="John Doe" required className="bg-white/[0.02] border-white/5 focus:border-brand-accent/30 transition-all" />
                                <Input label="Direct Email" type="email" placeholder="john@example.com" required className="bg-white/[0.02] border-white/5 focus:border-brand-accent/30 transition-all" />
                            </div>

                            <Input label="Organization / Enterprise" placeholder="Your company name" className="bg-white/[0.02] border-white/5 focus:border-brand-accent/30 transition-all" />

                            <Select
                                label="Strategic Priority"
                                className="bg-white/[0.02] border-white/5 focus:border-brand-accent/30 transition-all"
                                options={[
                                    { value: '', label: 'Select a priority service...' },
                                    { value: 'web', label: 'Enterprise Web Application' },
                                    { value: 'mobile', label: 'Cross-Platform Mobile App' },
                                    { value: 'design', label: 'Strategic UI/UX Design' },
                                    { value: 'business', label: 'ERP / POS Business System' },
                                    { value: 'marketing', label: 'Digital Growth Strategy' },
                                    { value: 'other', label: 'Other Technology Innovation' },
                                ]}
                            />

                            <Textarea label="The Vision Blueprint" placeholder="Define your strategic goals, key features, and estimated timeline..." rows={6} className="bg-white/[0.02] border-white/5 focus:border-brand-accent/30 transition-all" />

                            <Button type="submit" variant="primary" size="lg" fullWidth icon={<ArrowRight size={24} />} className="h-16 text-lg font-bold rounded-xl shadow-neon-cyan transition-all duration-500 hover:scale-[1.02] active:scale-95">
                                Launch Conversation
                            </Button>
                        </form>
                    </SectionReveal>

                    {/* Right: Map and Info */}
                    <SectionReveal delay={0.4} direction="right" className="h-full">
                        <div className="flex flex-col h-full gap-10">
                            {/* Map */}
                            <div className="glass-card overflow-hidden h-[450px] border-white/5 relative group/map shadow-2xl">
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
                                <div className="absolute top-6 left-6 px-4 py-2 bg-brand-primary/80 backdrop-blur-md border border-white/10 rounded-lg text-brand-accent text-xs font-mono uppercase tracking-widest shadow-xl">
                                    Zurich HQ
                                </div>
                            </div>

                            {/* Contact Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { icon: <Globe size={20} />, title: 'Location', content: COMPANY_ADDRESS, color: 'cyan' },
                                    { icon: <Shield size={20} />, title: 'Swiss License', content: COMPANY_LICENSE, color: 'purple' },
                                    { icon: <Smartphone size={20} />, title: 'WhatsApp', content: '+41 77 941 21 26', color: 'cyan' },
                                    { icon: <Mail size={20} />, title: 'Email Us', content: 'info@barmagly.com', color: 'purple' },
                                ].map((item, i) => (
                                    <div key={i} className="glass-card p-6 border-white/5 hover:border-brand-accent/20 transition-all group/info hover:bg-white/[0.01]">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className={cn(
                                                "p-3 rounded-xl transition-all duration-500 group-hover/info:scale-110",
                                                item.color === 'cyan' ? "bg-brand-accent/10 text-brand-accent shadow-neon-cyan/20" : "bg-brand-secondary/10 text-brand-secondary shadow-neon-purple/20"
                                            )}>
                                                {item.icon}
                                            </div>
                                            <h4 className="text-white font-black text-sm uppercase tracking-widest">{item.title}</h4>
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
            <WhyChooseSection data={data.features} />
            <CountersSection data={data.stats} />
            <TestimonialsSection />
            <TechSection />
            <ContactFormSection data={data.cta} />
        </>
    );
}
