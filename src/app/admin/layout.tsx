import React from 'react';
import { AdminLayoutClient } from '@/components/admin/AdminLayoutClient';
import { ToastProvider } from '@/components/ui/Toast';

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
