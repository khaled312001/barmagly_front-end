import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date));
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export function truncate(text: string, length: number): string {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
}

// export const WHATSAPP_URL = `https://wa.me/41779412126`; // temporarily hidden
export const OFFICE_PHONE = '044 586 1803';
export const WHATSAPP_PHONE = '+20 101 028 4819';
export const WHATSAPP_URL = 'https://wa.me/201010284819';
export const FACEBOOK_URL = 'https://www.facebook.com/BarmaglyOfficial/';
export const LINKEDIN_URL = 'https://www.linkedin.com/company/102957997';
export const COMPANY_ADDRESS = 'Hardstrasse 201, 8005 Zürich, Switzerland';
export const COMPANY_LICENSE = 'CHE-154.312.079';
export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');

export function formatBytes(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
