'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import {
    CheckCircle2, Shield, Zap, MessageCircle,
    ArrowRight, ArrowLeft, Cpu, Database, Cloud
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { staggerContainer, heroTextReveal } from '@/lib/animations';
import { WHATSAPP_URL } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

// Helper to render icon dynamically
const DynamicIcon = ({ name, size = 48, className = "" }: { name: string; size?: number; className?: string }) => {
    const Icon = (LucideIcons as any)[name] || LucideIcons.Code2;
    return <Icon size={size} className={className} />;
};

interface ServiceDetailClientProps {
    service: any;
    lang: string;
}

export default function ServiceDetailClient({ service, lang }: ServiceDetailClientProps) {
    if (!service) {
        // ... (no changes to error state for now, but lang could be used for "Back to Services" text if dict is used)
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-primary text-center px-6">
                <div className="max-w-md">
                    <h2 className="text-4xl font-display font-bold text-white mb-6">Service Not Found</h2>
                    <p className="text-brand-muted mb-10">System could not locate the requested service architecture. Please return to the command center.</p>
                    <Link href={`/${lang}/services`}>
                        <Button variant="primary" icon={<ArrowLeft size={20} />}>
                            Back to Services
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    const title = lang === 'en' && service.titleEn ? service.titleEn : service.title;
    const description = lang === 'en' && service.descriptionEn ? service.descriptionEn : service.description;

    let features: string[] = [];
    const featuresStr = (lang === 'en' && service.featuresEn) ? service.featuresEn : service.features;
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

    return (
        <main className="min-h-screen bg-brand-primary overflow-hidden">
            {/* Background Architecture */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-hero-gradient" />
                <div className="absolute inset-0 tech-grid opacity-20" />
                <div className="absolute inset-0 circuit-pattern opacity-30" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-secondary/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
            </div>

            {/* Hero Section */}
            <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-32 overflow-hidden border-b border-white/5">
                <div className="section-container relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            className="flex-1 text-center lg:text-left"
                        >
                            <motion.div variants={heroTextReveal} className="mb-6">
                                <Link href={`/${lang}/services`} className="inline-flex items-center gap-2 text-brand-accent font-mono text-sm hover:gap-3 transition-all group">
                                    <ArrowLeft size={16} />
                                    <span>SYSTEM_SERVICES</span>
                                </Link>
                            </motion.div>

                            <motion.div variants={heroTextReveal} className="flex flex-col lg:flex-row lg:items-center gap-6 mb-8">
                                <div className="mx-auto lg:mx-0 p-5 rounded-2xl bg-brand-surface border border-brand-accent/30 text-brand-accent shadow-neon-cyan">
                                    <DynamicIcon name={service.icon} size={48} />
                                </div>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight">
                                    {title.split(' ').map((word: string, i: number) => (
                                        i === title.split(' ').length - 1 ?
                                            <span key={i} className="gradient-text"> {word}</span> :
                                            <span key={i}>{word} </span>
                                    ))}
                                </h1>
                            </motion.div>

                            <motion.p variants={heroTextReveal} className="text-xl text-brand-muted max-w-2xl leading-relaxed mb-12">
                                {description}
                            </motion.p>

                            <motion.div variants={heroTextReveal} className="flex flex-col sm:flex-row items-center gap-6">
                                <Link href={`${WHATSAPP_URL}?text=I'm interested in ${title}`} target="_blank">
                                    <Button size="lg" variant="primary" icon={<MessageCircle size={20} />}>
                                        Inquire Now
                                    </Button>
                                </Link>
                                <Link href={`/${lang}/contact`}>
                                    <Button size="lg" variant="neon" icon={<ArrowRight size={20} />}>
                                        Custom Roadmap
                                    </Button>
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Visual Ornament */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="flex-1 relative hidden lg:block"
                        >
                            <div className="relative z-10 p-1 glass-card border-white/10 rounded-[2.5rem] overflow-hidden lg:h-[600px] w-full shadow-2xl">
                                {service.image ? (
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={service.image}
                                            alt={title}
                                            fill
                                            className="object-cover rounded-[2rem]"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-full bg-brand-surface flex items-center justify-center rounded-[2.2rem] flex-col gap-8">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-brand-accent/20 blur-[60px] rounded-full" />
                                            <DynamicIcon name={service.icon} size={160} className="text-brand-accent/40 relative z-10" />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="text-brand-accent font-mono text-xl tracking-[0.5em] uppercase">Architecture</h3>
                                            <div className="mt-4 flex gap-3 justify-center">
                                                <div className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
                                                <div className="w-2 h-2 rounded-full bg-brand-secondary animate-ping delay-75" />
                                                <div className="w-2 h-2 rounded-full bg-brand-accent animate-ping delay-150" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Floating Stats */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -top-10 -right-10 glass-card p-6 border-brand-accent/30 shadow-neon-cyan z-20"
                            >
                                <p className="text-brand-accent font-mono text-xs uppercase mb-1">Status</p>
                                <p className="text-white font-bold">READY_TO_DEPLOY</p>
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, 20, 0] }}
                                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                                className="absolute -bottom-10 -left-10 glass-card p-6 border-brand-secondary/30 shadow-neon-purple z-20"
                            >
                                <p className="text-brand-secondary font-mono text-xs uppercase mb-1">Efficiency</p>
                                <p className="text-white font-bold">100% OPTIMIZED</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Capabilities */}
            <section className="section-padding relative">
                <div className="section-container">
                    <SectionReveal>
                        <div className="text-center mb-20">
                            <span className="text-brand-accent font-mono text-sm tracking-[0.3em] uppercase mb-4 block">Capabilities</span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Strategic <span className="gradient-text">Implementation</span></h2>
                            <p className="text-brand-muted max-w-2xl mx-auto">Our methodology ensures every layer of the system is engineered for maximum reliability and future-proof scalability.</p>
                        </div>
                    </SectionReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature: string, i: number) => (
                            <SectionReveal key={i} delay={i * 0.1}>
                                <div className="glass-card p-8 group hover:bg-white/[0.02] h-full flex flex-col items-start min-h-[220px]">
                                    <div className="w-12 h-12 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent mb-6 group-hover:bg-brand-accent group-hover:text-brand-primary transition-all duration-500">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <h4 className="text-xl font-display font-bold text-white mb-4 group-hover:text-brand-accent transition-colors">{feature}</h4>
                                    <p className="text-brand-muted text-sm leading-relaxed">System-critical component designed for robust integration and seamless performance across all endpoints.</p>
                                </div>
                            </SectionReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack Integration */}
            <section className="section-padding bg-brand-surface/30 border-y border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 tech-grid opacity-5" />
                <div className="section-container relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <SectionReveal direction="left">
                            <div className="max-w-xl">
                                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-8">Integrated <span className="text-brand-secondary">Tech Stack</span></h3>
                                <p className="text-brand-muted text-lg mb-10">We utilize a high-performance ecosystem to build the core logic and interface layers of this service, ensuring compatibility with global standards.</p>

                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        { icon: <Database size={20} />, label: 'Data Integrity' },
                                        { icon: <Shield size={20} />, label: 'Advanced Security' },
                                        { icon: <Cloud size={20} />, label: 'Cloud-Native' },
                                        { icon: <Zap size={20} />, label: 'Ultra-Low Latency' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-brand-muted bg-white/5 p-4 rounded-xl border border-white/5">
                                            <span className="text-brand-accent">{item.icon}</span>
                                            <span className="text-sm font-medium">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SectionReveal>

                        <SectionReveal direction="right">
                            <div className="glass-card p-10 border-brand-accent/10 bg-brand-glass relative">
                                <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-brand-accent/30 pointer-events-none">CODE_FRAGMENT_882</div>
                                <pre className="font-mono text-sm text-brand-accent/70 overflow-hidden leading-relaxed">
                                    <code>{`/**
 * Service Configuration
 * Module: ${service.slug.toUpperCase()}
 */

interface Architecture {
  core: "Enterprise_Engine";
  interface: "Intuitive_Flow";
  deployment: "Cloud_Ready";
}

const initialize = () => {
    validate_integrity("${service.title}");
    activate_security_layers();
    deploy_optimized_modules();
};`}</code>
                                </pre>
                            </div>
                        </SectionReveal>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="section-padding">
                <div className="section-container">
                    <SectionReveal>
                        <div className="glass-card p-12 md:p-20 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8">Ready to Build This <span className="gradient-text">Architecture?</span></h2>
                                <p className="text-brand-muted text-lg max-w-2xl mx-auto mb-12">Connect with our Swiss-trained architects to transform this service module into a scalable reality for your enterprise.</p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                    <Link href="/contact">
                                        <Button size="lg" variant="primary" icon={<ArrowRight size={24} />}>
                                            Launch Discussion
                                        </Button>
                                    </Link>
                                    <Link href={WHATSAPP_URL} target="_blank">
                                        <Button size="lg" variant="outline" icon={<MessageCircle size={20} />}>
                                            WhatsApp Protocol
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SectionReveal>
                </div>
            </section>
        </main>
    );
}
