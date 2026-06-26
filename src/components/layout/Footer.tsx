'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { COMPANY_ADDRESS, COMPANY_LICENSE, OFFICE_PHONE, FACEBOOK_URL, LINKEDIN_URL } from '@/lib/utils';
import { Linkedin, Facebook, ArrowUpRight } from 'lucide-react';
import { useSiteSettings } from '@/lib/contexts/SiteContext';

interface FooterProps {
    dict: any;
    lang: string;
}

export function Footer({ dict, lang }: FooterProps) {
    const { settings } = useSiteSettings();

    const columns = [
        {
            label: dict?.footer?.services || (lang === 'ar' ? 'الخدمات' : 'Services'),
            links: [
                { label: dict?.footer?.links?.web || (lang === 'ar' ? 'تطوير المواقع' : 'Web platforms'), href: `/${lang}/services/web-development` },
                { label: dict?.footer?.links?.mobile || (lang === 'ar' ? 'تطبيقات الموبايل' : 'Mobile apps'), href: `/${lang}/services/mobile-app-development` },
                { label: dict?.footer?.links?.business || (lang === 'ar' ? 'أنظمة الأعمال' : 'POS & business systems'), href: `/${lang}/services/erp-business-systems` },
                { label: dict?.footer?.links?.design || (lang === 'ar' ? 'تصميم UI/UX' : 'UI/UX & brand'), href: `/${lang}/services/ui-ux-design` },
                { label: dict?.footer?.links?.marketing || (lang === 'ar' ? 'التسويق الرقمي' : 'Growth & SEO'), href: `/${lang}/services/digital-marketing` },
            ],
        },
        {
            label: lang === 'ar' ? 'الاستوديو' : 'Studio',
            links: [
                { label: dict?.navbar?.about || (lang === 'ar' ? 'من نحن' : 'About'), href: `/${lang}/about` },
                { label: dict?.navbar?.portfolio || (lang === 'ar' ? 'سابقة الأعمال' : 'Work'), href: `/${lang}/portfolio` },
                { label: dict?.navbar?.blog || (lang === 'ar' ? 'المدونة' : 'Journal'), href: `/${lang}/blog` },
                { label: dict?.navbar?.contact || (lang === 'ar' ? 'تواصل معنا' : 'Contact'), href: `/${lang}/contact` },
            ],
        },
        {
            label: lang === 'ar' ? 'القانوني' : 'Legal',
            links: [
                { label: dict?.footer?.privacyPolicy || (lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy'), href: `/${lang}/privacy` },
                { label: dict?.footer?.termsOfService || (lang === 'ar' ? 'شروط الاستخدام' : 'Terms'), href: `/${lang}/terms` },
            ],
        },
    ];

    const address = settings?.address || COMPANY_ADDRESS;
    const email = settings?.email || 'info@barmagly.tech';
    const license = settings?.license || COMPANY_LICENSE;
    const studioDescriptor = lang === 'ar'
        ? 'استوديو برمجة يبني مواقع، تطبيقات، وأنظمة POS لشركات تهتم بالتفاصيل.'
        : 'A small software studio building web, mobile, and POS systems for operators who care about the details.';

    return (
        <footer className="relative bg-brand-ink text-brand-on-ink">
            <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10 pt-20 pb-10 lg:pt-24 lg:pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">
                    {/* Brand col */}
                    <div className="lg:col-span-5">
                        <Link href={`/${lang}`} className="inline-block bg-white rounded-md p-3" aria-label="Barmagly">
                            <div className="relative w-[180px] h-[88px]">
                                <Image
                                    src="/logo.jpg"
                                    alt="Barmagly"
                                    fill
                                    sizes="180px"
                                    className="object-contain"
                                />
                            </div>
                        </Link>
                        <p className="mt-5 text-[14px] leading-[1.7] text-brand-on-ink/70 max-w-[40ch]">
                            {studioDescriptor}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-2">
                            <span className="text-[10px] uppercase tracking-[0.16em] px-3 py-1.5 border border-brand-ink-soft rounded-full text-brand-on-ink/70">
                                {lang === 'ar' ? 'سجل تجاري' : 'License'} · {license}
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.16em] px-3 py-1.5 border border-brand-ink-soft rounded-full text-brand-on-ink/70">
                                Zürich · CH
                            </span>
                        </div>

                        <div className="mt-8 flex flex-col gap-2 text-[13px] text-brand-on-ink/75">
                            <a href={`tel:${OFFICE_PHONE.replace(/\s/g, '')}`} className="hover:text-brand-accent transition-colors" dir="ltr">
                                {OFFICE_PHONE}
                            </a>
                            <a href={`mailto:${email}`} className="hover:text-brand-accent transition-colors">
                                {email}
                            </a>
                            <span className="text-brand-on-ink/55">{address}</span>
                        </div>
                    </div>

                    {/* Link columns */}
                    {columns.map((col) => (
                        <div key={col.label} className="lg:col-span-2">
                            <div className="text-[11px] uppercase tracking-[0.18em] text-brand-on-ink/50 font-medium">
                                {col.label}
                            </div>
                            <ul className="mt-5 space-y-3">
                                {col.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-[14px] text-brand-on-ink/85 hover:text-brand-accent transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Newsletter / contact small */}
                    <div className="lg:col-span-1 flex lg:flex-col items-start lg:items-end gap-3">
                        <div className="text-[11px] uppercase tracking-[0.18em] text-brand-on-ink/50 font-medium lg:text-right">
                            {lang === 'ar' ? 'تابعنا' : 'Follow'}
                        </div>
                        <div className="flex lg:flex-col items-center lg:items-end gap-3 mt-1 lg:mt-2">
                            <Link href={LINKEDIN_URL} target="_blank" className="text-brand-on-ink/70 hover:text-brand-accent transition-colors" aria-label="LinkedIn">
                                <Linkedin size={16} />
                            </Link>
                            <Link href={FACEBOOK_URL} target="_blank" className="text-brand-on-ink/70 hover:text-brand-accent transition-colors" aria-label="Facebook">
                                <Facebook size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom hairline strip */}
            <div className="border-t border-brand-ink-soft">
                <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-brand-on-ink/60">
                    <div>
                        © {new Date().getFullYear()} Barmagly. {lang === 'ar' ? 'كل الحقوق محفوظة' : 'All rights reserved'}.
                    </div>
                    <Link
                        href={`/${lang}/contact`}
                        className="inline-flex items-center gap-1.5 hover:text-brand-accent transition-colors"
                    >
                        {lang === 'ar' ? 'لنبدأ مشروعاً معاً' : "Let's build something"}
                        <ArrowUpRight size={12} />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
