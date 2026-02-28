'use client';

import React from 'react';
import Link from 'next/link';
import { WHATSAPP_URL, COMPANY_ADDRESS, COMPANY_LICENSE } from '@/lib/utils';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { useSiteSettings } from '@/lib/contexts/SiteContext';

interface FooterProps {
    dict: any;
    lang: string;
}

export function Footer({ dict, lang }: FooterProps) {
    const { settings } = useSiteSettings();

    const footerLinks = {
        company: [
            { label: dict.about, href: `/${lang}/about` },
            { label: dict.services, href: `/${lang}/services` },
            { label: dict.portfolio, href: `/${lang}/portfolio` },
            { label: dict.blog, href: `/${lang}/blog` },
            { label: dict.contact, href: `/${lang}/contact` },
        ],
        services: [
            { label: dict.footer.links.web, href: `/${lang}/services/web-development` },
            { label: dict.footer.links.mobile, href: `/${lang}/services/mobile-application-development` },
            { label: dict.footer.links.design, href: `/${lang}/services/ui-ux-design` },
            { label: dict.footer.links.business, href: `/${lang}/services/business-systems` },
            { label: dict.footer.links.marketing, href: `/${lang}/services/sales-marketing` },
        ],
    };

    // Use settings or fallbacks
    const address = settings?.address || COMPANY_ADDRESS;
    const email = settings?.email || 'info@barmagly.ch';
    const phone = settings?.phone || '+41 77 941 21 26';
    const license = settings?.license || COMPANY_LICENSE;
    const whatsapp = settings?.whatsappNumber ? `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}` : WHATSAPP_URL;

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
                            {dict.description}
                        </p>
                        <div className="flex flex-col gap-3 text-sm">
                            <div className="flex items-start gap-2 text-brand-muted">
                                <MapPin size={16} className="text-brand-accent mt-0.5 shrink-0" />
                                <span>{address}</span>
                            </div>
                            <div className="flex items-center gap-2 text-brand-muted">
                                <Phone size={16} className="text-brand-accent shrink-0" />
                                <span>{phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-brand-muted">
                                <Mail size={16} className="text-brand-accent shrink-0" />
                                <span>{email}</span>
                            </div>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-brand-text font-display font-semibold mb-6">{dict.quickLinks}</h4>
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
                        <h4 className="text-brand-text font-display font-semibold mb-6">{dict.footer.services}</h4>
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
                                {dict.footer.officialLicense}
                            </div>
                            <p className="text-brand-muted text-xs font-mono">{license}</p>
                        </div>
                        <Link
                            href={whatsapp}
                            target="_blank"
                            className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 rounded-xl text-sm font-semibold hover:bg-[#25D366]/20 transition-all duration-300"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            {dict.footer.chatWhatsapp}
                            <ExternalLink size={14} />
                        </Link>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-brand-glass-border flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-brand-muted text-sm">
                        © {new Date().getFullYear()} Barmagly. {dict.rights}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-brand-muted">
                        <Link href={`/${lang}/privacy`} className="hover:text-brand-accent transition-colors">
                            {dict.privacyPolicy}
                        </Link>
                        <Link href={`/${lang}/terms`} className="hover:text-brand-accent transition-colors">
                            {dict.termsOfService}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
