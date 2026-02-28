'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Globe, Box, TrendingUp, Users, ArrowRight, Shield, Terminal, ShoppingCart, Store, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { staggerContainer, staggerItem, heroTextReveal } from '@/lib/animations';
import Link from 'next/link';
import { MouseFollower } from '@/components/ui/MouseFollower';
import { useDictionary } from '@/lib/contexts/DictionaryContext';

export default function PosPage() {
    const dict = useDictionary();
    const isRtl = true; // Wait, actually the global direction is set in layout, but for classes we might just use rtl: utilities. Let's just remove dir="rtl" to let parent language dictate, or keep it depending on design. Since it was hardcoded arabic, we should let global locale control dir-rtl and let text align accordingly.
    const posDict = dict.posPage;

    const featureIcons = [
        <Box size={32} key="f1" />,
        <TrendingUp size={32} key="f2" />,
        <Users size={32} key="f3" />,
        <ShoppingCart size={32} key="f4" />,
        <Shield size={32} key="f5" />,
        <Store size={32} key="f6" />
    ];

    return (
        <main className="flex-1 bg-brand-primary min-h-screen">
            <MouseFollower />

            {/* HERO SECTION */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-hero-gradient" />
                <div className="absolute inset-0 tech-grid opacity-20" />
                <div className="absolute top-0 left-0 w-full h-[500px] bg-brand-accent/10 blur-[150px] pointer-events-none" />

                <div className="section-container relative z-10 text-center flex flex-col items-center">
                    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-4xl mx-auto flex flex-col items-center">
                        <motion.div variants={heroTextReveal} className="mb-8">
                            <span className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-brand-glass border border-brand-accent/30 text-brand-accent text-xs font-mono tracking-[0.2em] shadow-neon-cyan backdrop-blur-md">
                                <Store size={16} className="animate-pulse" />
                                <span className="uppercase">{posDict.hero.badge}</span>
                            </span>
                        </motion.div>

                        <motion.h1 variants={heroTextReveal} className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-white mb-8 leading-[1.1] tracking-tight drop-shadow-2xl">
                            {posDict.hero.titleLine1} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r rtl:from-brand-accent ltr:from-brand-secondary via-white rtl:to-brand-secondary ltr:to-brand-accent filter drop-shadow-[0_0_40px_rgba(0,212,255,0.35)]">
                                {posDict.hero.titleHighlight}
                            </span>
                        </motion.h1>

                        <motion.p variants={heroTextReveal} className="text-xl md:text-2xl text-brand-muted max-w-3xl mx-auto mb-12 leading-relaxed font-light opacity-90 text-center">
                            {posDict.hero.subtitle}
                        </motion.p>

                        <motion.div variants={heroTextReveal} className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-xl">
                            <Link href="/contact" className="w-full sm:w-1/2">
                                <Button size="xl" variant="primary" icon={<ArrowRight size={22} className="rtl:rotate-180" />} className="w-full h-16 text-lg font-bold rounded-xl shadow-neon-cyan transition-all duration-500 hover:scale-105 active:scale-95 flex-row-reverse rtl:flex-row gap-3 font-display">
                                    {posDict.hero.btnPrimary}
                                </Button>
                            </Link>
                            <a href="#features" className="w-full sm:w-1/2">
                                <Button size="xl" variant="neon" className="w-full h-16 text-lg font-bold rounded-xl border-white/20 hover:border-brand-secondary/50 transition-all duration-500 hover:scale-105 active:scale-95 font-display">
                                    {posDict.hero.btnOutline}
                                </Button>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* FEATURES GRID */}
            <section id="features" className="relative py-32 bg-brand-primary border-t border-white/5">
                <div className="absolute inset-0 tech-grid opacity-5" />
                <div className="section-container relative z-10">
                    <SectionReveal>
                        <div className="text-center mb-24">
                            <span className="text-brand-accent font-mono text-xs tracking-[0.4em] uppercase mb-4 block">{posDict.features.badge}</span>
                            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 text-glow tracking-tight">
                                {posDict.features.titleLine1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-secondary">{posDict.features.titleHighlight}</span>
                            </h2>
                            <div className="w-24 h-1 bg-brand-accent mx-auto mb-8 rounded-full shadow-neon-cyan" />
                        </div>
                    </SectionReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posDict.features.list.map((feat: any, i: number) => (
                            <SectionReveal key={i} delay={i * 0.1}>
                                <div className="glass-card p-8 group hover:bg-white/[0.03] transition-all duration-500 border-white/5 h-full flex flex-col items-start gap-4">
                                    <div className="p-4 rounded-2xl bg-brand-surface border border-white/10 text-brand-accent w-fit group-hover:shadow-neon-cyan transition-all duration-500 group-hover:scale-110 rtl:ml-auto ltr:mr-auto">
                                        {featureIcons[Math.min(i, featureIcons.length - 1)]}
                                    </div>
                                    <h3 className="text-xl font-display font-bold text-white group-hover:text-brand-accent transition-colors rtl:text-right w-full ltr:text-left">
                                        {feat.title}
                                    </h3>
                                    <p className="text-brand-muted leading-relaxed text-sm opacity-70 rtl:text-right w-full font-light ltr:text-left">
                                        {feat.desc}
                                    </p>
                                </div>
                            </SectionReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* MULTI PLATFORM SHOWCASE */}
            <section className="relative py-32 bg-brand-primary border-t border-white/5 overflow-hidden">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-secondary/10 rounded-full blur-[150px] pointer-events-none" />
                <div className="section-container relative z-10 flex flex-col lg:flex-row-reverse items-center gap-16">
                    <SectionReveal direction="right" className="w-full lg:w-1/2 rtl:text-right ltr:text-left flex flex-col rtl:items-end ltr:items-start">
                        <span className="text-brand-secondary font-mono text-xs tracking-[0.4em] uppercase mb-4 block w-full">{posDict.platforms.badge}</span>
                        <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6 leading-[1.1] w-full">
                            {posDict.platforms.titleLine1} <span className="text-brand-secondary">{posDict.platforms.titleHighlight}</span>
                        </h2>
                        <div className="w-24 h-1 bg-brand-secondary mb-8 rounded-full shadow-neon-purple" />
                        <p className="text-brand-muted text-lg leading-relaxed mb-8 font-light w-full">
                            {posDict.platforms.subtitle}
                        </p>
                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex flex-row-reverse rtl:flex-row-reverse ltr:flex-row items-center gap-4 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                <Terminal className="text-brand-secondary w-8 h-8 flex-shrink-0" />
                                <div className="rtl:text-right ltr:text-left">
                                    <h4 className="text-white font-bold">{posDict.platforms.desktopTitle}</h4>
                                    <p className="text-brand-muted text-sm font-light">{posDict.platforms.desktopDesc}</p>
                                </div>
                            </div>
                            <div className="flex flex-row-reverse rtl:flex-row-reverse ltr:flex-row items-center gap-4 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                <Smartphone className="text-brand-accent w-8 h-8 flex-shrink-0" />
                                <div className="rtl:text-right ltr:text-left">
                                    <h4 className="text-white font-bold">{posDict.platforms.mobileTitle}</h4>
                                    <p className="text-brand-muted text-sm font-light">{posDict.platforms.mobileDesc}</p>
                                </div>
                            </div>
                            <div className="flex flex-row-reverse rtl:flex-row-reverse ltr:flex-row items-center gap-4 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                <Globe className="text-white w-8 h-8 flex-shrink-0" />
                                <div className="rtl:text-right ltr:text-left">
                                    <h4 className="text-white font-bold">{posDict.platforms.webTitle}</h4>
                                    <p className="text-brand-muted text-sm font-light">{posDict.platforms.webDesc}</p>
                                </div>
                            </div>
                        </div>
                    </SectionReveal>

                    <SectionReveal direction="left" className="w-full lg:w-1/2">
                        <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center">
                            {/* Desktop */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute z-10 w-[80%] aspect-video bg-[#0A0A0B] rounded-2xl border border-white/10 shadow-2xl p-2 top-0"
                            >
                                <div className="w-full h-full rounded-xl border border-white/5 bg-brand-surface relative overflow-hidden flex flex-col">
                                    <div className="h-6 border-b border-white/5 bg-white/[0.02] flex items-center px-4 gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-400" />
                                        <div className="w-2 h-2 rounded-full bg-yellow-400" />
                                        <div className="w-2 h-2 rounded-full bg-green-400" />
                                    </div>
                                    <div className="flex-1 p-4 grid grid-cols-4 gap-4">
                                        {/* Sidebar mock */}
                                        <div className="col-span-1 border-r border-white/5 flex flex-col gap-2 pr-4 justify-start items-end">
                                            {[...Array(5)].map((_, i) => <div key={i} className="h-4 bg-white/10 rounded w-full" />)}
                                        </div>
                                        {/* Main mock */}
                                        <div className="col-span-3 flex flex-col gap-4">
                                            <div className="h-16 bg-brand-secondary/20 rounded-lg" />
                                            <div className="flex-1 rounded-lg grid grid-cols-3 gap-2">
                                                {[...Array(6)].map((_, i) => <div key={i} className="bg-white/5 rounded-lg h-full border border-white/5" />)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* iPad */}
                            <motion.div
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute z-20 w-[40%] aspect-[3/4] bg-zinc-900 rounded-2xl md:rounded-3xl border-[4px] md:border-[6px] border-zinc-950 shadow-2xl -bottom-10 right-0 md:right-10 p-1"
                            >
                                <div className="w-full h-full rounded-xl bg-brand-surface border border-white/5 overflow-hidden flex flex-col p-2 gap-2">
                                    <div className="h-8 md:h-10 bg-white/5 rounded-lg flex items-center justify-between px-2">
                                        <div className="w-4 h-4 rounded-full bg-white/10" />
                                        <div className="w-12 h-2 rounded bg-white/10" />
                                    </div>
                                    <div className="flex-1 grid grid-cols-2 gap-2">
                                        {[...Array(6)].map((_, i) => <div key={i} className="bg-brand-accent/10 rounded-md" />)}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Phone */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                                className="absolute z-30 w-[20%] aspect-[9/19] bg-zinc-900 rounded-[1.5rem] md:rounded-[2rem] border-[4px] border-zinc-950 shadow-2xl -bottom-4 left-4 md:left-10 p-1"
                            >
                                <div className="w-full h-full rounded-[1rem] md:rounded-[1.5rem] bg-brand-surface border border-white/5 overflow-hidden flex flex-col p-2 gap-2 relative">
                                    {/* Notch */}
                                    <div className="w-1/2 h-3 md:h-4 bg-zinc-950 rounded-b-xl md:rounded-b-2xl mx-auto absolute top-0 left-1/4" />

                                    <div className="h-16 md:h-20 bg-gradient-to-br from-brand-secondary/30 to-brand-accent/30 rounded-lg mt-6" />
                                    <div className="flex-1 flex flex-col gap-2">
                                        {[...Array(4)].map((_, i) => <div key={i} className="h-6 md:h-8 bg-white/10 rounded-md w-full" />)}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </SectionReveal>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="relative py-32 bg-brand-primary border-t border-white/5 text-center flex flex-col items-center">
                <div className="absolute inset-0 bg-accent-gradient opacity-10" />
                <div className="absolute inset-0 tech-grid opacity-5" />

                {/* Background glow for CTA */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[400px] bg-brand-accent/20 rounded-full blur-[100px] pointer-events-none" />

                <div className="section-container relative z-10">
                    <SectionReveal>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-6 leading-[1.1]">
                            {posDict.cta.titleLine1} <br className="hidden md:block" />
                            <span className="text-brand-accent">{posDict.cta.titleHighlight}</span>
                        </h2>
                        <p className="text-brand-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-90 font-light">
                            {posDict.cta.subtitle}
                        </p>

                        <div className="relative inline-block w-full max-w-xs sm:max-w-none sm:w-auto">
                            <Link href="/contact" className="w-full sm:w-auto">
                                <Button size="xl" variant="neon" className="w-full sm:w-auto h-16 px-12 rounded-xl font-bold font-display text-lg shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:shadow-[0_0_50px_rgba(0,212,255,0.6)] transition-all duration-500 hover:scale-105 active:scale-95 border-brand-accent/50 group overflow-hidden">
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-accent/0 via-white/20 to-brand-accent/0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                    {posDict.cta.button}
                                </Button>
                            </Link>
                        </div>
                    </SectionReveal>
                </div>
            </section>
        </main>
    );
}
