'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Eye, Heart, Lightbulb, Users, Award, Globe, Zap, Atom, Server, Cpu, Cloud, Database, Code2 } from 'lucide-react';
import { SectionReveal, SectionHeading } from '@/components/ui/SectionReveal';
import { staggerContainer, staggerItem, heroTextReveal } from '@/lib/animations';
import { COMPANY_LICENSE, COMPANY_ADDRESS } from '@/lib/utils';
import type { Metadata } from 'next';
import { useSiteSettings } from '@/lib/contexts/SiteContext';

// ============ HERO ============
function AboutHero() {
    return (
        <section className="relative pt-48 pb-24 overflow-hidden bg-brand-primary">
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

            {/* Floating Icons */}
            <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-hidden">
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/3 left-[15%] p-4 glass-card border-brand-accent/20 opacity-40 shadow-neon-cyan"
                >
                    <Shield className="text-brand-accent" size={32} />
                </motion.div>
                <motion.div
                    animate={{ y: [0, 20, 0], rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-1/3 right-[15%] p-4 glass-card border-brand-secondary/20 opacity-30 shadow-neon-purple"
                >
                    <Globe className="text-brand-secondary" size={32} />
                </motion.div>
            </div>

            <div className="section-container relative">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto text-center"
                >
                    <motion.div variants={heroTextReveal} className="mb-8">
                        <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-[0.2em] bg-brand-glass border border-brand-accent/30 text-brand-accent shadow-neon-cyan backdrop-blur-md">
                            <Zap size={14} className="animate-pulse" />
                            Digital Excellence
                        </span>
                    </motion.div>

                    <motion.h1 variants={heroTextReveal} className="text-4xl sm:text-6xl lg:text-8xl font-display font-black text-white mb-8 leading-[1.1] tracking-tight">
                        Crafting Digital <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-white to-brand-secondary filter drop-shadow-[0_0_20px_rgba(0,212,255,0.3)]">
                            Solutions with Precision
                        </span>
                    </motion.h1>

                    <motion.p variants={heroTextReveal} className="text-xl md:text-2xl text-brand-muted leading-relaxed max-w-2xl mx-auto font-light">
                        We are a <span className="text-white font-semibold">Swiss-licensed</span> software power-house, engineering advanced systems that redefine industry standards through precision and innovation.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}

// ============ STORY ============
function StorySection() {
    const { settings } = useSiteSettings();
    const address = settings?.address || COMPANY_ADDRESS;
    const license = settings?.license || COMPANY_LICENSE;

    return (
        <section className="section-padding relative overflow-hidden bg-brand-primary">
            <div className="absolute inset-0 tech-grid opacity-5" />
            <div className="section-container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <SectionReveal direction="left">
                        <div className="relative">
                            <div className="absolute -top-10 -left-10 w-24 h-24 bg-brand-accent/5 rounded-full blur-3xl" />
                            <SectionHeading
                                badge="Our Origin"
                                title="From Zürich to the World"
                                align="left"
                                description="Barmagly was born from a simple yet powerful vision: to bridge the gap between cutting-edge technology and real-world business needs."
                            />
                            <div className="space-y-6 text-brand-muted leading-relaxed text-lg font-light">
                                <p>
                                    Founded in the Heart of <span className="text-white font-medium">Switzerland</span>, we set out to create software solutions that don&apos;t just meet expectations — they redefine them through absolute technical excellence.
                                </p>
                                <p>
                                    Our multidisciplinary team combines Swiss engineering traditions with global innovative speed. We specialize in architecting complex digital ecosystems that empower businesses to lead in a technology-first world.
                                </p>
                                <div className="pt-6 grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 group hover:border-brand-accent/30 transition-colors">
                                        <p className="text-brand-accent font-display font-bold text-3xl mb-1">100+</p>
                                        <p className="text-xs uppercase tracking-widest opacity-60">Projects Delivered</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 group hover:border-brand-secondary/30 transition-colors">
                                        <p className="text-brand-secondary font-display font-bold text-3xl mb-1">5+</p>
                                        <p className="text-xs uppercase tracking-widest opacity-60">Years of Innovation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SectionReveal>

                    <SectionReveal direction="right">
                        <div className="relative group">
                            {/* Decorative Frame */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent to-brand-secondary rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />

                            <div className="glass-card p-10 relative overflow-hidden bg-brand-dark/50 border-white/10 backdrop-blur-2xl">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-[100px] -mr-32 -mt-32" />

                                <div className="relative space-y-10">
                                    <div className="flex items-start gap-6 group/item">
                                        <div className="p-4 rounded-2xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20 group-hover/item:shadow-neon-cyan transition-all duration-500">
                                            <Shield size={28} />
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-lg mb-1 uppercase tracking-tight">Swiss Licensed Enterprise</p>
                                            <p className="text-brand-accent font-mono text-sm tracking-widest bg-brand-accent/5 px-3 py-1 rounded-md border border-brand-accent/10 inline-block">
                                                {license}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6 group/item">
                                        <div className="p-4 rounded-2xl bg-brand-secondary/10 text-brand-secondary border border-brand-secondary/20 group-hover/item:shadow-neon-purple transition-all duration-500">
                                            <Award size={28} />
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-lg mb-1 uppercase tracking-tight">Quality Certified</p>
                                            <p className="text-brand-muted text-sm leading-relaxed">
                                                Adhering to the most rigorous Swiss standards for software engineering and data security.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-white/10 flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                                        <p className="text-brand-muted text-sm font-mono tracking-tighter">
                                            📍 <span className="hover:text-brand-accent transition-colors">{address}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SectionReveal>
                </div>
            </div>
        </section>
    );
}

// ============ MISSION & VISION ============
function MissionVisionSection() {
    return (
        <section className="section-padding relative overflow-hidden bg-brand-primary">
            <div className="absolute inset-0 bg-accent-gradient opacity-5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[160px] pointer-events-none" />

            <div className="section-container relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <SectionReveal direction="left">
                        <div className="glass-card p-12 h-full hover-glow group border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-3xl group-hover:bg-brand-accent/10 transition-colors" />
                            <div className="p-4 rounded-2xl bg-brand-accent/10 text-brand-accent w-fit mb-8 border border-brand-accent/20 group-hover:shadow-neon-cyan transition-all duration-500">
                                <Target size={32} />
                            </div>
                            <h3 className="text-3xl font-display font-black text-white mb-6 tracking-tight">Our Mission</h3>
                            <p className="text-brand-muted leading-relaxed text-lg font-light">
                                To empower businesses worldwide with <span className="text-white font-medium">innovative, reliable, and scalable</span> software solutions. We are committed to transforming complex challenges into elegant digital experiences that drive measurable growth and lasting impact.
                            </p>
                        </div>
                    </SectionReveal>

                    <SectionReveal direction="right">
                        <div className="glass-card p-12 h-full hover-glow group border-white/5 relative overflow-hidden">
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-secondary/5 rounded-full blur-3xl group-hover:bg-brand-secondary/10 transition-colors" />
                            <div className="p-4 rounded-2xl bg-brand-secondary/10 text-brand-secondary w-fit mb-8 border border-brand-secondary/20 group-hover:shadow-neon-purple transition-all duration-500">
                                <Eye size={32} />
                            </div>
                            <h3 className="text-3xl font-display font-black text-white mb-6 tracking-tight">Our Vision</h3>
                            <p className="text-brand-muted leading-relaxed text-lg font-light">
                                To be the leading <span className="text-white font-medium">Swiss software company</span> recognized globally for innovation, quality, and client success. We envision a future where every business, regardless of size, can harness the power of technology to reach its full potential.
                            </p>
                        </div>
                    </SectionReveal>
                </div>
            </div>
        </section>
    );
}

// ============ VALUES ============
function ValuesSection({ data }: { data?: any[] }) {
    const iconMap: Record<string, React.ReactNode> = {
        'Excellence': <Award size={28} />,
        'Innovation': <Lightbulb size={28} />,
        'Integrity': <Heart size={28} />,
        'Collaboration': <Users size={28} />,
        'Reliability': <Shield size={28} />,
        'Impact': <Target size={28} />,
    };

    const defaultValues = [
        { icon: <Award size={28} />, title: 'Excellence', desc: 'We deliver nothing short of the highest quality in every single unit of code.', color: 'cyan' },
        { icon: <Lightbulb size={28} />, title: 'Innovation', desc: 'Continuously pushing boundaries with futuristic technical solutions.', color: 'purple' },
        { icon: <Heart size={28} />, title: 'Integrity', desc: 'Transparent, honest, and ethical in every partnership we build.', color: 'cyan' },
        { icon: <Users size={28} />, title: 'Collaboration', desc: 'Working closely with clients as true architects of their success.', color: 'purple' },
        { icon: <Shield size={28} />, title: 'Reliability', desc: 'Delivering on our promises with Swiss precision, every time.', color: 'cyan' },
        { icon: <Target size={28} />, title: 'Impact', desc: 'Creating digital solutions that make a tangible difference.', color: 'purple' },
    ];

    const displayValues = data ? data.map(v => ({
        ...v,
        icon: iconMap[v.title] || <Award size={28} />
    })) : defaultValues;

    return (
        <section className="section-padding relative overflow-hidden bg-brand-primary border-t border-white/5">
            <div className="absolute inset-0 tech-grid opacity-5" />
            <div className="section-container relative z-10">
                <SectionHeading
                    badge="Core Principles"
                    title="The Barmagly DNA"
                    description="These core values are the foundation of everything we architect."
                />

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {displayValues.map((value, i) => (
                        <motion.div key={i} variants={staggerItem}>
                            <div className={`glass-card p-8 group border-white/5 hover:border-brand-${value.color || 'cyan'}/30 h-full relative overflow-hidden`}>
                                <div className={`absolute -top-10 -right-10 w-24 h-24 bg-brand-${value.color || 'cyan'}/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`} />

                                <div className={`p-4 rounded-2xl bg-brand-${value.color || 'cyan'}/10 text-brand-${value.color || 'cyan'} w-fit mb-6 border border-brand-${value.color || 'cyan'}/20 group-hover:shadow-neon-${value.color || 'cyan'} transition-all duration-500`}>
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-display font-bold text-white mb-3 tracking-tight group-hover:text-brand-accent transition-colors">{value.title}</h3>
                                <p className="text-brand-muted leading-relaxed font-light">{value.desc || value.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// ============ TIMELINE ============
function TimelineSection({ data }: { data?: any[] }) {
    const defaultMilestones = [
        { year: '2019', title: 'Company Founded', desc: 'Barmagly established in Zürich, Switzerland with a vision for tech excellence.' },
        { year: '2020', title: 'Enterprise Milestone', desc: 'Delivered our first large-scale enterprise system for a Swiss financial client.' },
        { year: '2021', title: 'Core Expansion', desc: 'Grew to 15+ specialists across architecture, development and digital design.' },
        { year: '2022', title: 'Global Reach', desc: 'Extended innovation to clients across Europe and the Middle East.' },
        { year: '2023', title: '150+ Projects', desc: 'Milestone of delivering over 150 successful high-performance solutions.' },
        { year: '2024', title: 'Future Tech Hub', desc: 'Launched R&D division for AI integration and enterprise cloud systems.' },
    ];

    const milestones = data || defaultMilestones;

    return (
        <section className="section-padding relative overflow-hidden bg-brand-primary">
            <div className="absolute inset-0 tech-grid opacity-5" />
            <div className="section-container relative z-10">
                <SectionHeading badge="The Journey" title="Innovation Milestones" />

                <div className="relative max-w-5xl mx-auto mt-20">
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-accent/50 via-brand-secondary/50 to-transparent hidden md:block">
                        <motion.div
                            className="absolute top-0 left-[-2px] w-[6px] h-20 bg-white shadow-neon-cyan blur-[2px] rounded-full"
                            animate={{ y: ['0%', '500%'], opacity: [0, 1, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                        />
                    </div>

                    <div className="space-y-16">
                        {milestones.map((m, i) => (
                            <SectionReveal key={i} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 0.05}>
                                <div className={`flex items-center gap-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                    <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        <div className="group relative">
                                            <div className={`absolute -inset-0.5 bg-gradient-to-r from-brand-accent/20 to-brand-secondary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500`} />
                                            <div className="glass-card p-8 hover-glow relative bg-brand-dark/40 border-white/5 group-hover:border-brand-accent/30 transition-all duration-500">
                                                <span className="text-brand-accent font-mono text-lg font-black tracking-tighter mb-2 block">{m.year}</span>
                                                <h3 className="text-xl font-display font-black text-white mb-3 tracking-tight">{m.title}</h3>
                                                <p className="text-brand-muted leading-relaxed font-light">{m.desc || m.description}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hidden md:flex relative items-center justify-center w-12 h-12">
                                        <div className="absolute inset-0 bg-brand-accent/20 rounded-full animate-ping opacity-20" />
                                        <div className="w-5 h-5 rounded-full bg-brand-accent border-4 border-brand-primary shadow-neon-cyan z-10" />
                                    </div>

                                    <div className="flex-1 hidden md:block" />
                                </div>
                            </SectionReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============ TECH STACK ============
function TechStackSection({ data }: { data?: any[] }) {
    const techIconMap: Record<string, React.ReactNode> = {
        'React / Next.js': <Atom size={24} />,
        'Node.js / Express': <Server size={24} />,
        'TypeScript': <Code2 size={24} />,
        '.NET / C#': <Cpu size={24} />,
        'Cloud & DevOps': <Cloud size={24} />,
    };

    const defaultTech = [
        { name: 'React / Next.js', level: 98, icon: <Atom size={24} /> },
        { name: 'Node.js / Express', level: 95, icon: <Server size={24} /> },
        { name: 'TypeScript', level: 96, icon: <Code2 size={24} /> },
        { name: '.NET / C#', level: 92, icon: <Cpu size={24} /> },
        { name: 'Cloud & DevOps', level: 90, icon: <Cloud size={24} /> },
    ];

    const displayTech = data ? data.map(t => ({
        ...t,
        icon: techIconMap[t.name] || <Zap size={24} />
    })) : defaultTech;

    return (
        <section className="section-padding relative overflow-hidden bg-brand-primary border-t border-white/5">
            <div className="absolute inset-0 tech-grid opacity-10" />
            <div className="section-container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <SectionReveal direction="left">
                        <div>
                            <SectionHeading
                                badge="Our Arsenal"
                                title="The Tech That Powers Us"
                                align="left"
                                description="We utilize a high-performance technology stack designed for enterprise scalability and military-grade security."
                            />
                            <div className="space-y-8 mt-10">
                                {displayTech.map((tech, i) => (
                                    <div key={i} className="space-y-2 group">
                                        <div className="flex justify-between items-center text-sm font-mono tracking-widest uppercase">
                                            <span className="flex items-center gap-3 text-white">
                                                <span className="text-brand-accent group-hover:scale-110 transition-transform">{tech.icon}</span>
                                                {tech.name}
                                            </span>
                                            <span className="text-brand-accent">{tech.level}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${tech.level}%` }}
                                                transition={{ duration: 1.5, delay: i * 0.1, ease: 'circOut' }}
                                                className="h-full bg-gradient-to-r from-brand-accent to-brand-secondary shadow-neon-cyan"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SectionReveal>

                    <SectionReveal direction="right">
                        <div className="relative">
                            <div className="absolute inset-0 bg-brand-accent/5 rounded-full blur-[120px] animate-pulse" />
                            <div className="glass-card p-1 items-center justify-center aspect-square flex border-white/5 relative overflow-hidden">
                                <div className="absolute inset-0 tech-grid opacity-30" />
                                <motion.div
                                    className="p-10 rounded-full border-2 border-dashed border-brand-accent/20 relative"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                >
                                    <div className="p-8 rounded-full border-2 border-dashed border-brand-secondary/20">
                                        <div className="w-32 h-32 rounded-full bg-brand-glass flex items-center justify-center backdrop-blur-3xl border border-brand-accent/30 shadow-neon-cyan">
                                            <Zap size={48} className="text-brand-accent animate-pulse" />
                                        </div>
                                    </div>
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 glass-card border-brand-accent/30 text-brand-accent shadow-neon-cyan">
                                        <Atom size={24} />
                                    </div>
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-4 glass-card border-brand-secondary/30 text-brand-secondary shadow-neon-purple">
                                        <Server size={24} />
                                    </div>
                                    <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 p-4 glass-card border-brand-accent/30 text-brand-accent">
                                        <Code2 size={24} />
                                    </div>
                                    <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 p-4 glass-card border-brand-secondary/30 text-brand-secondary">
                                        <Database size={24} />
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </SectionReveal>
                </div>
            </div>
        </section>
    );
}

// ============ ABOUT PAGE ============
import { publicApi } from '@/lib/api';

export default function AboutPage() {
    const [data, setData] = React.useState<any>({});

    React.useEffect(() => {
        publicApi.getPageSections('about').then(({ data }) => setData(data)).catch(console.error);
    }, []);

    return (
        <>
            <AboutHero />
            <StorySection />
            <MissionVisionSection />
            <ValuesSection data={data.values} />
            <TimelineSection data={data.milestones} />
            <TechStackSection data={data.tech_arsenal} />
        </>
    );
}
