import React from 'react';
import { AdminLayoutClient } from '@/components/admin/AdminLayoutClient';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="antialiased">
                <AdminLayoutClient>
                    {children}
                </AdminLayoutClient>
            </body>
        </html>
    );
}
