'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    COMPANY_ADDRESS,
    COMPANY_LICENSE,
    OFFICE_PHONE,
    FACEBOOK_URL,
    LINKEDIN_URL,
} from '@/lib/utils';
import { Linkedin, Facebook, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { useSiteSettings } from '@/lib/contexts/SiteContext';

interface FooterProps {
    dict: any;
    lang: string;
}

export function Footer({ dict, lang }: FooterProps) {
    const { settings } = useSiteSettings();
    const isAr = lang === 'ar';

    const address = settings?.address || COMPANY_ADDRESS;
    const email = settings?.email || 'info@barmagly.tech';
    const license = settings?.license || COMPANY_LICENSE;

    const servicesLinks = [
        { label: isAr ? 'تطوير المواقع' : 'Web Development', href: `/${lang}/services/web-development` },
        { label: isAr ? 'تطبيقات الموبايل' : 'Mobile Apps', href: `/${lang}/services/mobile-app-development` },
        { label: isAr ? 'أنظمة POS و ERP' : 'POS & ERP', href: `/${lang}/services/erp-business-systems` },
        { label: isAr ? 'التجارة الإلكترونية' : 'E-Commerce', href: `/${lang}/services/e-commerce-development` },
        { label: isAr ? 'تصميم UI/UX' : 'UI/UX Design', href: `/${lang}/services/ui-ux-design` },
    ];
    const studioLinks = [
        { label: isAr ? 'من نحن' : 'About', href: `/${lang}/about` },
        { label: isAr ? 'سابقة الأعمال' : 'Work', href: `/${lang}/portfolio` },
        { label: isAr ? 'المدونة' : 'Journal', href: `/${lang}/blog` },
        { label: isAr ? 'تواصل معنا' : 'Contact', href: `/${lang}/contact` },
    ];

    return (
        <footer className="bg-brand-ink text-brand-on-ink">
            {/* Main */}
            <div className="section-container py-14 lg:py-16">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-12 gap-x-8 gap-y-12">
                    {/* Brand + contact (left) */}
                    <div className="col-span-2 lg:col-span-5">
                        <Link href={`/${lang}`} className="inline-block bg-white rounded-lg p-3" aria-label="Barmagly">
                            <div className="relative w-[160px] h-[72px]">
                                <Image
                                    src="/logo.jpg"
                                    alt="Barmagly"
                                    fill
                                    sizes="160px"
                                    className="object-contain"
                                />
                            </div>
                        </Link>
                        <p className="mt-6 text-[14px] leading-[1.75] text-brand-on-ink-soft max-w-sm">
                            {isAr
                                ? 'شركة برمجيات تبني مواقع، تطبيقات، متاجر إلكترونية، وأنظمة POS / ERP / CRM لشركات الناشئة والشركات النامية.'
                                : 'Software company building websites, mobile apps, e-commerce, and POS / ERP / CRM systems for startups and growing businesses.'}
                        </p>

                        <div className="mt-7 flex flex-col gap-3 text-[14px]">
                            <a href={`tel:${OFFICE_PHONE.replace(/\s/g, '')}`} className="flex items-center gap-3 text-brand-on-ink-soft hover:text-white transition-colors">
                                <Phone size={15} className="text-brand-accent shrink-0" />
                                <span dir="ltr">{OFFICE_PHONE}</span>
                            </a>
                            <a href={`mailto:${email}`} className="flex items-center gap-3 text-brand-on-ink-soft hover:text-white transition-colors">
                                <Mail size={15} className="text-brand-accent shrink-0" />
                                {email}
                            </a>
                            <div className="flex items-start gap-3 text-brand-on-ink-soft">
                                <MapPin size={15} className="text-brand-accent shrink-0 mt-0.5" />
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="lg:col-span-3 lg:col-start-7">
                        <div className="text-[11px] uppercase tracking-[0.18em] text-white font-semibold mb-5">
                            {isAr ? 'الخدمات' : 'Services'}
                        </div>
                        <ul className="space-y-3">
                            {servicesLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-[14px] text-brand-on-ink-soft hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Studio */}
                    <div className="lg:col-span-2">
                        <div className="text-[11px] uppercase tracking-[0.18em] text-white font-semibold mb-5">
                            {isAr ? 'الاستوديو' : 'Studio'}
                        </div>
                        <ul className="space-y-3">
                            {studioLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-[14px] text-brand-on-ink-soft hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="lg:col-span-2">
                        <div className="text-[11px] uppercase tracking-[0.18em] text-white font-semibold mb-5">
                            {isAr ? 'القانوني' : 'Legal'}
                        </div>
                        <ul className="space-y-3">
                            <li>
                                <Link href={`/${lang}/privacy`} className="text-[14px] text-brand-on-ink-soft hover:text-white transition-colors">
                                    {isAr ? 'سياسة الخصوصية' : 'Privacy'}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/terms`} className="text-[14px] text-brand-on-ink-soft hover:text-white transition-colors">
                                    {isAr ? 'شروط الاستخدام' : 'Terms'}
                                </Link>
                            </li>
                            <li className="pt-4 text-[12px] uppercase tracking-[0.14em] text-brand-on-ink-soft">
                                CR {license}
                            </li>
                            <li className="text-[12px] uppercase tracking-[0.14em] text-brand-on-ink-soft">
                                Zürich · CH
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom strip */}
            <div className="border-t border-brand-ink-soft">
                <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-brand-on-ink-soft">
                    <div>
                        © {new Date().getFullYear()} Barmagly. {isAr ? 'كل الحقوق محفوظة.' : 'All rights reserved.'}
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href={LINKEDIN_URL}
                            target="_blank"
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white hover:bg-brand-accent transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={14} />
                        </Link>
                        <Link
                            href={FACEBOOK_URL}
                            target="_blank"
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white hover:bg-brand-accent transition-colors"
                            aria-label="Facebook"
                        >
                            <Facebook size={14} />
                        </Link>
                        <Link
                            href={`/${lang}/contact`}
                            className="inline-flex items-center gap-1.5 ml-2 hover:text-white transition-colors"
                        >
                            {isAr ? 'لنبدأ مشروعاً' : "Let's talk"}
                            <ArrowUpRight size={12} />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
