'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { COMPANY_ADDRESS, COMPANY_LICENSE, OFFICE_PHONE, WHATSAPP_PHONE, WHATSAPP_URL, FACEBOOK_URL, LINKEDIN_URL } from '@/lib/utils';
import { MapPin, Phone, Mail, Facebook, Linkedin, ShieldCheck } from 'lucide-react';
import { useSiteSettings } from '@/lib/contexts/SiteContext';

interface FooterProps {
    dict: any;
    lang: string;
}

export function Footer({ dict, lang }: FooterProps) {
    const { settings } = useSiteSettings();

    const footerLinks = {
        company: [
            { label: dict?.navbar?.about || 'About', href: `/${lang}/about` },
            { label: dict?.navbar?.services || 'Services', href: `/${lang}/services` },
            { label: dict?.navbar?.portfolio || 'Portfolio', href: `/${lang}/portfolio` },
            { label: dict?.navbar?.blog || 'Blog', href: `/${lang}/blog` },
            { label: dict?.navbar?.contact || 'Contact', href: `/${lang}/contact` },
        ],
        services: [
            { label: dict?.footer?.links?.web || 'Web Development', href: `/${lang}/services/web-development` },
            { label: dict?.footer?.links?.mobile || 'Mobile Apps', href: `/${lang}/services/mobile-app-development` },
            { label: dict?.footer?.links?.design || 'UI/UX Design', href: `/${lang}/services/ui-ux-design` },
            { label: dict?.footer?.links?.business || 'Business Systems', href: `/${lang}/services/erp-business-systems` },
            { label: dict?.footer?.links?.marketing || 'Digital Marketing', href: `/${lang}/services/digital-marketing` },
        ],
    };

    const address = settings?.address || COMPANY_ADDRESS;
    const email = settings?.email || 'info@barmagly.tech';
    const license = settings?.license || COMPANY_LICENSE;

    return (
        <footer className="relative bg-brand-ink text-brand-on-ink">
            <div className="section-container py-16 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-4">
                        <Link href={`/${lang}`} className="inline-flex items-center gap-2.5 mb-5">
                            <Image src="/logo.png" alt="Barmagly Logo" width={40} height={40} className="rounded-xl object-contain" />
                            <span className="text-xl font-display font-bold text-white">Barmagly</span>
                        </Link>
                        <p className="text-brand-on-ink-soft text-sm leading-relaxed mb-6 max-w-md">
                            {dict?.footer?.description || 'Swiss-licensed software development. We build websites, mobile apps, e-commerce, ERP/CRM/POS and digital marketing campaigns that move real businesses forward.'}
                        </p>

                        <div className="flex flex-col gap-3 text-sm">
                            <div className="flex items-start gap-3">
                                <MapPin size={16} className="text-brand-accent-ink mt-0.5 shrink-0" />
                                <span className="text-brand-on-ink-soft">{address}</span>
                            </div>
                            <a href={`tel:${OFFICE_PHONE.replace(/\s/g, '')}`} className="flex items-center gap-3 text-brand-on-ink-soft hover:text-white transition-colors">
                                <Phone size={16} className="text-brand-accent-ink shrink-0" />
                                <span dir="ltr">{OFFICE_PHONE}</span>
                            </a>
                            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-brand-on-ink-soft hover:text-white transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366" className="shrink-0">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                <span dir="ltr">{WHATSAPP_PHONE}</span>
                            </a>
                            <a href={`mailto:${email}`} className="flex items-center gap-3 text-brand-on-ink-soft hover:text-white transition-colors">
                                <Mail size={16} className="text-brand-accent-ink shrink-0" />
                                <span>{email}</span>
                            </a>
                        </div>

                        <div className="flex items-center gap-2 mt-6">
                            <Link
                                href={FACEBOOK_URL}
                                target="_blank"
                                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-ink-soft text-brand-on-ink-soft hover:text-white hover:bg-white/10 transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook size={16} />
                            </Link>
                            <Link
                                href={LINKEDIN_URL}
                                target="_blank"
                                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-ink-soft text-brand-on-ink-soft hover:text-white hover:bg-white/10 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={16} />
                            </Link>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-display font-semibold text-base mb-5">
                            {dict?.footer?.quickLinks || 'Company'}
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-brand-on-ink-soft text-sm hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Links */}
                    <div className="lg:col-span-3">
                        <h4 className="text-white font-display font-semibold text-base mb-5">
                            {dict?.footer?.services || 'Services'}
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-brand-on-ink-soft text-sm hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Swiss License */}
                    <div className="lg:col-span-3">
                        <h4 className="text-white font-display font-semibold text-base mb-5">
                            {dict?.footer?.swissLicensed || 'Swiss Licensed'}
                        </h4>
                        <div className="bg-brand-ink-soft border border-brand-border-ink rounded-xl p-5">
                            <div className="flex items-center gap-2 text-brand-accent-ink text-sm font-semibold mb-3">
                                <ShieldCheck size={16} />
                                {dict?.footer?.officialLicense || 'Official License'}
                            </div>
                            <p className="text-white text-sm font-mono tracking-wider">{license}</p>
                            <p className="text-brand-on-ink-soft text-xs mt-3 leading-relaxed">
                                {dict?.footer?.licenseNote || 'Registered Swiss entity. Verified, audited and ready for enterprise engagements.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-14 pt-6 border-t border-brand-border-ink flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-brand-on-ink-soft text-sm">
                        © {new Date().getFullYear()} Barmagly. {dict?.footer?.rights || 'All rights reserved.'}
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                        <Link href={`/${lang}/privacy`} className="text-brand-on-ink-soft hover:text-white transition-colors">
                            {dict?.footer?.privacyPolicy || 'Privacy'}
                        </Link>
                        <Link href={`/${lang}/terms`} className="text-brand-on-ink-soft hover:text-white transition-colors">
                            {dict?.footer?.termsOfService || 'Terms'}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
