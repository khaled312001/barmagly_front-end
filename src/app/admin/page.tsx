'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const router = useRouter();

    useEffect(() => {
        router.push('/admin/dashboard');
    }, [router]);

    return (
        <div className="min-h-screen bg-brand-dark flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
        </div>
    );
}
