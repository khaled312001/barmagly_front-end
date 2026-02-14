'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/admin/LoginForm';

export default function AdminLoginPage() {
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        // Check if already logged in
        if (localStorage.getItem('accessToken')) {
            router.push('/admin/dashboard');
        }
    }, [router]);

    if (!mounted) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-dark relative overflow-hidden">
            {/* Advanced Tech Background */}
            <div className="absolute inset-0 tech-grid opacity-30" />

            {/* Animated Glow Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                    x: [0, 50, 0],
                    y: [0, -50, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-brand-accent/20 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.1, 0.2, 0.1],
                    x: [0, -50, 0],
                    y: [0, 50, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-brand-secondary/20 rounded-full blur-[120px] pointer-events-none"
            />

            {/* Circuit Lines */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden sm:block hidden">
                <div className="absolute top-0 left-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-brand-accent/10 to-transparent" />
                <div className="absolute top-0 right-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-brand-secondary/10 to-transparent" />
                <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-accent/10 to-transparent" />
            </div>

            <LoginForm onSuccess={() => router.push('/admin/dashboard')} />
        </div>
    );
}
