'use client';

import React from 'react';
import Link from 'next/link';
import { COMPANY_ADDRESS, COMPANY_LICENSE, OFFICE_PHONE, WHATSAPP_PHONE, WHATSAPP_URL } from '@/lib/utils';
import { MapPin, Phone, Mail, ExternalLink, MessageCircle } from 'lucide-react';
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
            { label: dict?.footer?.links?.mobile || 'Mobile Apps', href: `/${lang}/services/mobile-application-development` },
            { label: dict?.footer?.links?.design || 'UI/UX Design', href: `/${lang}/services/ui-ux-design` },
            { label: dict?.footer?.links?.business || 'Business Systems', href: `/${lang}/services/pos-business-systems` },
            { label: dict?.footer?.links?.marketing || 'Sales & Marketing', href: `/${lang}/services/sales-marketing` },
        ],
    };

    // Use settings or fallbacks
    const address = settings?.address || COMPANY_ADDRESS;
    const email = settings?.email || 'info@barmagly.ch';
    const license = settings?.license || COMPANY_LICENSE;

    return (
        <footer className="relative bg-brand-dark border-t border-brand-glass-border">
            {/* Gradient top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent" />

            <div className="section-container py-16 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-accent to-brand-secondary flex items-center justify-center font-display font-bold text-white text-lg">
                                B
                            </div>
                            <span className="text-xl font-display font-bold text-brand-text">
                                Barm<span className="gradient-text">agly</span>
                            </span>
                        </Link>
                        <p className="text-brand-muted text-sm leading-relaxed mb-6">
                            {dict?.footer?.description || ''}
                        </p>
                        <div className="flex flex-col gap-3 text-sm">
                            <div className="flex items-start gap-2 text-brand-muted">
                                <MapPin size={16} className="text-brand-accent mt-0.5 shrink-0" />
                                <span>{address}</span>
                            </div>
                            <div className="flex items-center gap-2 text-brand-muted">
                                <Phone size={16} className="text-brand-accent/70 shrink-0" />
                                <a href={`tel:${OFFICE_PHONE.replace(/\s/g, '')}`} className="hover:text-brand-accent transition-colors duration-300" dir="ltr">{OFFICE_PHONE}</a>
                            </div>
                            <div className="flex items-center gap-2 text-brand-muted">
                                <MessageCircle size={16} className="text-brand-accent/70 shrink-0" />
                                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors duration-300" dir="ltr">{WHATSAPP_PHONE}</a>
                            </div>
                            <div className="flex items-center gap-2 text-brand-muted">
                                <Mail size={16} className="text-brand-accent shrink-0" />
                                <span>{email}</span>
                            </div>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-brand-text font-display font-semibold mb-6">{dict?.footer?.quickLinks || 'Quick Links'}</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-brand-muted text-sm hover:text-brand-accent transition-colors duration-300 animated-underline"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Links */}
                    <div>
                        <h4 className="text-brand-text font-display font-semibold mb-6">{dict?.footer?.services || 'Services'}</h4>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-brand-muted text-sm hover:text-brand-accent transition-colors duration-300 animated-underline"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Swiss License & WhatsApp */}
                    <div>
                        <h4 className="text-brand-text font-display font-semibold mb-6">{dict.footer.swissLicensed}</h4>
                        <div className="glass-card p-4 mb-6">
                            <div className="flex items-center gap-2 text-brand-accent text-sm font-medium mb-2">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M8 0L10.2 5.8L16 6.3L11.8 10L13.1 16L8 13L2.9 16L4.2 10L0 6.3L5.8 5.8L8 0Z" />
                                </svg>
                                {dict?.footer?.officialLicense || 'Swiss License'}
                            </div>
                            <p className="text-brand-muted text-xs font-mono">{license}</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-brand-glass-border flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-brand-muted text-sm">
                        © {new Date().getFullYear()} Barmagly. {dict?.footer?.rights || ''}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-brand-muted">
                        <Link href={`/${lang}/privacy`} className="hover:text-brand-accent transition-colors">
                            {dict?.footer?.privacyPolicy || 'Privacy'}
                        </Link>
                        <Link href={`/${lang}/terms`} className="hover:text-brand-accent transition-colors">
                            {dict?.footer?.termsOfService || 'Terms'}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
