import React from 'react';
import '../globals.css';
import { AdminLayoutClient } from '@/components/admin/AdminLayoutClient';
import { ToastProvider } from '@/components/ui/Toast';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Control Center | Barmagly',
    description: 'Barmagly Administrative Interface',
    robots: { index: false, follow: false },
};

// Admin pages must never be statically generated or CDN-cached — chunk hashes
// in the HTML go stale across deploys, breaking the dashboard for cached visitors.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="antialiased">
                <ToastProvider>
                    <AdminLayoutClient>
                        {children}
                    </AdminLayoutClient>
                </ToastProvider>
            </body>
        </html>
    );
}
