'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ArrowRight, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/FormElements';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { staggerContainer, heroTextReveal } from '@/lib/animations';
import { WHATSAPP_URL, COMPANY_ADDRESS } from '@/lib/utils';
import { publicApi } from '@/lib/api';
import { useSiteSettings } from '@/lib/contexts/SiteContext';
import { useDictionary } from '@/lib/contexts/DictionaryContext';

export default function ContactPage() {
    const dict = useDictionary();
    const contactDict = dict.contact;
    const { settings } = useSiteSettings();
    const address = settings?.address || COMPANY_ADDRESS;
    const email = settings?.email || 'info@barmagly.ch';
    const whatsapp = settings?.whatsappNumber ? `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}` : WHATSAPP_URL;

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            company: formData.get('company') as string,
            service: formData.get('service') as string,
            message: formData.get('message') as string,
        };

        try {
            await publicApi.submitLead(data);
            setStatus('success');
            (e.target as HTMLFormElement).reset();
        } catch (error: any) {
            console.error('Failed to submit form:', error);
            setStatus('error');
            setErrorMessage(error.response?.data?.message || contactDict.form.errorDefault);
        }
    };

    return (
        <>
            {/* Hero */}
            <section className="relative pt-48 pb-32 lg:pt-56 lg:pb-40 overflow-hidden bg-brand-primary">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-hero-gradient" />
                <div className="absolute inset-0 tech-grid opacity-20" />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.05, 0.15, 0.05] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 circuit-pattern pointer-events-none"
                />

                <div className="absolute top-1/4 -right-32 w-96 h-96 bg-brand-accent/10 rounded-full blur-[128px] animate-pulse" />

                <div className="section-container relative z-10">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="max-w-5xl mx-auto text-center"
                    >
                        <motion.div variants={heroTextReveal} className="mb-8">
                            <span className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-brand-glass border border-brand-accent/30 text-brand-accent text-sm font-mono tracking-[0.2em] shadow-neon-cyan">
                                <Mail size={18} className="animate-pulse" />
                                <span className="uppercase">{contactDict.hero.badge}</span>
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={heroTextReveal}
                            className="text-4xl sm:text-6xl lg:text-8xl font-display font-black text-white mb-8 tracking-tighter drop-shadow-2xl"
                        >
                            {contactDict.hero.titleLine1} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-white to-brand-secondary">{contactDict.hero.titleHighlight}</span>
                        </motion.h1>
                        <motion.p variants={heroTextReveal} className="text-xl md:text-2xl text-brand-muted max-w-3xl mx-auto leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: contactDict.hero.subtitle }} />
                    </motion.div>
                </div>
            </section>

            {/* Contact Content */}
            <section className="section-padding">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <SectionReveal direction="left">
                                <div className="glass-card p-8 md:p-10 relative overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        {status === 'success' ? (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className="flex flex-col items-center justify-center text-center py-16"
                                            >
                                                <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center mb-8 shadow-lg shadow-green-500/20 animate-pulse">
                                                    <CheckCircle size={48} />
                                                </div>
                                                <h3 className="text-3xl font-display font-bold text-brand-text mb-4">{contactDict.form.successTitle}</h3>
                                                <p className="text-brand-muted mb-10 max-w-md text-lg leading-relaxed">
                                                    {contactDict.form.successDesc}
                                                </p>
                                                <Button size="lg" variant="primary" onClick={() => setStatus('idle')}>
                                                    {contactDict.form.successBtn}
                                                </Button>
                                            </motion.div>
                                        ) : (
                                            <motion.form
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                onSubmit={handleSubmit}
                                                className="space-y-10"
                                            >
                                                <div className="relative">
                                                    <div className="absolute rtl:-right-10 ltr:-left-10 top-1/2 -translate-y-1/2 w-1 h-12 bg-brand-accent shadow-neon-cyan" />
                                                    <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-3 tracking-tight">{contactDict.form.title}</h2>
                                                    <p className="text-brand-muted font-light leading-relaxed">{contactDict.form.subtitle}</p>
                                                </div>

                                                {status === 'error' && (
                                                    <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-4 text-red-400 backdrop-blur-md">
                                                        <AlertCircle size={20} className="shrink-0 mt-0.5" />
                                                        <p className="text-sm font-mono tracking-tighter uppercase">{errorMessage}</p>
                                                    </div>
                                                )}

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                                    <Input name="name" label={contactDict.form.fields.name.label} placeholder={contactDict.form.fields.name.placeholder} required disabled={status === 'submitting'} className="bg-brand-dark/20 border-white/5 focus:border-brand-accent/50" />
                                                    <Input name="email" label={contactDict.form.fields.email.label} type="email" placeholder={contactDict.form.fields.email.placeholder} required disabled={status === 'submitting'} className="bg-brand-dark/20 border-white/5 focus:border-brand-accent/50" />
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                                    <Input name="phone" label={contactDict.form.fields.phone.label} type="tel" placeholder={contactDict.form.fields.phone.placeholder} disabled={status === 'submitting'} className="bg-brand-dark/20 border-white/5 focus:border-brand-accent/50" />
                                                    <Input name="company" label={contactDict.form.fields.company.label} placeholder={contactDict.form.fields.company.placeholder} disabled={status === 'submitting'} className="bg-brand-dark/20 border-white/5 focus:border-brand-accent/50" />
                                                </div>
                                                <Select
                                                    name="service"
                                                    label={contactDict.form.fields.service.label}
                                                    disabled={status === 'submitting'}
                                                    className="bg-brand-dark/20 border-white/5 focus:border-brand-accent/50"
                                                    options={[
                                                        { value: '', label: contactDict.form.fields.service.options.default },
                                                        { value: 'web', label: contactDict.form.fields.service.options.web },
                                                        { value: 'mobile', label: contactDict.form.fields.service.options.mobile },
                                                        { value: 'design', label: contactDict.form.fields.service.options.design },
                                                        { value: 'business', label: contactDict.form.fields.service.options.business },
                                                        { value: 'marketing', label: contactDict.form.fields.service.options.marketing },
                                                        { value: 'other', label: contactDict.form.fields.service.options.other },
                                                    ]}
                                                />
                                                <Textarea name="message" label={contactDict.form.fields.message.label} placeholder={contactDict.form.fields.message.placeholder} rows={6} required disabled={status === 'submitting'} className="bg-brand-dark/20 border-white/5 focus:border-brand-accent/50" />

                                                <Button type="submit" variant="primary" size="xl" className="w-full py-5 shadow-neon-cyan text-lg flex-row-reverse rtl:flex-row gap-2" icon={status === 'submitting' ? <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white" /> : <ArrowRight size={24} className="rtl:rotate-180" />} disabled={status === 'submitting'}>
                                                    {status === 'submitting' ? contactDict.form.submitting : contactDict.form.submit}
                                                </Button>
                                            </motion.form>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </SectionReveal>
                        </div>

                        {/* Contact Info Sidebar */}
                        <div className="space-y-6">
                            <SectionReveal direction="right">
                                <div className="glass-card p-8 hover-glow bg-brand-dark/40 border-white/5 relative group hover:border-brand-accent/30 transition-all duration-500">
                                    <div className="p-4 rounded-xl bg-brand-accent/10 border border-brand-accent/20 text-brand-accent w-fit mb-6 group-hover:shadow-neon-cyan transition-all duration-500">
                                        <MapPin size={24} />
                                    </div>
                                    <h3 className="text-xl font-display font-black text-white mb-3">{contactDict.info.hqTitle}</h3>
                                    <p className="text-brand-muted text-sm font-light leading-relaxed">{address}</p>
                                    <div className="mt-6 pt-6 border-t border-white/5 text-[10px] font-mono text-brand-muted/40 uppercase tracking-widest">{contactDict.info.hqVerified}</div>
                                </div>
                            </SectionReveal>

                            <SectionReveal direction="right" delay={0.1}>
                                <div className="glass-card p-8 hover-glow bg-brand-dark/40 border-white/5 relative group hover:border-brand-secondary/30 transition-all duration-500">
                                    <div className="p-4 rounded-xl bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary w-fit mb-6 group-hover:shadow-neon-purple transition-all duration-500">
                                        <MessageCircle size={24} />
                                    </div>
                                    <h3 className="text-xl font-display font-black text-white mb-3">{contactDict.info.techTitle}</h3>
                                    <p className="text-brand-muted text-sm font-light mb-8 italic">{contactDict.info.techDesc}</p>
                                    <Link href={whatsapp} target="_blank">
                                        <Button variant="outline" size="lg" icon={<MessageCircle size={18} />} className="w-full border-white/10 hover:border-brand-secondary/30 flex-row-reverse rtl:flex-row gap-2">
                                            {contactDict.info.techBtn}
                                        </Button>
                                    </Link>
                                </div>
                            </SectionReveal>

                            <SectionReveal direction="right" delay={0.2}>
                                <div className="glass-card p-8 hover-glow bg-brand-primary/20 border-white/5 group-hover:border-brand-accent/20 transition-all duration-500">
                                    <div className="flex flex-row-reverse rtl:flex-row-reverse ltr:flex-row items-center gap-6">
                                        <div className="p-4 rounded-xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20 flex-shrink-0">
                                            <Mail size={24} />
                                        </div>
                                        <div className="rtl:text-right ltr:text-left">
                                            <h3 className="text-lg font-display font-black text-white mb-1">{contactDict.info.emailTitle}</h3>
                                            <p className="text-brand-accent text-sm font-mono">{email}</p>
                                        </div>
                                    </div>
                                </div>
                            </SectionReveal>

                            <SectionReveal direction="right" delay={0.3}>
                                <div className="glass-card p-8 bg-brand-dark/40 border-white/5">
                                    <div className="flex flex-row-reverse rtl:flex-row-reverse ltr:flex-row items-center gap-6 mb-6">
                                        <div className="p-4 rounded-xl bg-white/5 text-brand-muted border border-white/10 flex-shrink-0">
                                            <Clock size={24} />
                                        </div>
                                        <h3 className="text-lg font-display font-black text-white rtl:text-right ltr:text-left">{contactDict.info.hoursTitle}</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex flex-row-reverse rtl:flex-row items-center justify-between text-sm">
                                            <span className="text-brand-muted font-light">{contactDict.info.monFri}</span>
                                            <span className="text-white font-mono" dir="ltr">09:00 - 18:00</span>
                                        </div>
                                        <div className="flex flex-row-reverse rtl:flex-row items-center justify-between text-sm">
                                            <span className="text-brand-muted font-light">{contactDict.info.sat}</span>
                                            <span className="text-white font-mono" dir="ltr">10:00 - 14:00</span>
                                        </div>
                                        <div className="pt-4 text-[10px] font-mono text-brand-muted/40 uppercase text-center border-t border-white/5 mt-4">{contactDict.info.timezone}</div>
                                    </div>
                                </div>
                            </SectionReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="pb-32 relative overflow-hidden">
                <div className="absolute inset-0 tech-grid opacity-5" />
                <div className="section-container relative z-10">
                    <SectionReveal>
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent/20 to-brand-secondary/20 rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-1000" />
                            <div className="glass-card p-2 overflow-hidden border-white/10 relative bg-brand-dark/50">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.8641668267813!2d8.5204!3d47.3863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a0d7d0f0000%3A0x0!2sHardstrasse%20201%2C%208005%20Z%C3%BCrich!5e0!3m2!1sen!2sch!4v1710691886490!5m2!1sen!2sch"
                                    width="100%"
                                    height="500"
                                    style={{ border: 0, borderRadius: '1.5rem', filter: 'grayscale(1) invert(0.9) hue-rotate(180deg) brightness(0.8)' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Barmagly Office Location"
                                />
                                <div className="absolute top-8 right-8 p-4 glass-card bg-brand-primary/80 backdrop-blur-xl border-brand-accent/30 text-brand-accent shadow-neon-cyan max-w-xs">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-brand-accent animate-ping flex-shrink-0" />
                                        <span className="text-xs font-mono font-bold tracking-widest uppercase text-white rtl:text-right">{contactDict.map.liveOps}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SectionReveal>
                </div>
            </section>
        </>
    );
}
