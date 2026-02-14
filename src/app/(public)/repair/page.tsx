'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Wrench, Database, Activity, Terminal,
    CheckCircle2, AlertCircle, Home, Lock, RefreshCcw
} from 'lucide-react';
import { systemApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import Link from 'next/link';

export default function PublicRepairPage() {
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const { showToast } = useToast();

    const handleInitialize = async () => {
        setLoading(true);
        setLogs([]);
        setStatus('idle');

        try {
            const { data } = await systemApi.publicInitDb();
            setLogs(data.logs || []);
            if (data.success) {
                setStatus('success');
                showToast('Database initialized!', 'success');
            } else {
                setStatus('error');
                showToast(data.message || 'Initialization failed', 'error');
            }
        } catch (error: any) {
            setStatus('error');
            const errorMessage = error.response?.data?.message || error.message;
            setLogs(prev => [...prev, `[ERROR] ${errorMessage}`]);
            showToast('Failed to reach backend', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-accent/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-secondary/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full glass-card p-8 space-y-8 relative z-10"
            >
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-accent/10 text-brand-accent mb-2">
                        <Wrench size={32} />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-brand-text">Public System Repair</h1>
                    <p className="text-brand-muted max-w-md mx-auto">
                        Use this utility to initialize your database and create the default admin user if you are unable to log in.
                    </p>
                </div>

                {/* Status Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-brand-surface border border-brand-glass-border space-y-2">
                        <div className="flex items-center gap-2 text-brand-text font-bold text-sm">
                            <Activity size={16} className="text-brand-accent" />
                            <span>Connectivity</span>
                        </div>
                        <p className="text-xs text-brand-muted">
                            API URL: <span className="text-brand-accent truncate block">{process.env.NEXT_PUBLIC_API_URL || 'Not Set'}</span>
                        </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-brand-surface border border-brand-glass-border space-y-2">
                        <div className="flex items-center gap-2 text-brand-text font-bold text-sm">
                            <Database size={16} className="text-brand-secondary" />
                            <span>Prisma Status</span>
                        </div>
                        <p className="text-xs text-brand-muted">
                            PostgreSQL Connection will be verified upon initialization.
                        </p>
                    </div>
                </div>

                {/* Action Section */}
                <div className="space-y-4">
                    <Button
                        fullWidth
                        size="lg"
                        variant="primary"
                        onClick={handleInitialize}
                        isLoading={loading}
                        icon={<RefreshCcw size={20} />}
                    >
                        Initialize Database
                    </Button>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button asChild variant="outline" fullWidth>
                            <Link href="/">
                                <Home size={18} className="mr-2" /> Back to Home
                            </Link>
                        </Button>
                        <Button asChild variant="outline" fullWidth>
                            <Link href="/admin/login">
                                <Lock size={18} className="mr-2" /> Go to Login
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Logs Section */}
                {(loading || logs.length > 0) && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-brand-muted uppercase tracking-wider">
                            <Terminal size={14} />
                            <span>Output Logs</span>
                        </div>
                        <div className="bg-black/40 rounded-2xl p-4 font-mono text-xs border border-brand-glass-border max-h-48 overflow-y-auto custom-scrollbar">
                            {logs.map((log, i) => (
                                <div key={i} className="text-brand-accent/80 py-0.5">{log}</div>
                            ))}
                            {loading && <div className="text-brand-text animate-pulse">Running setup...</div>}
                            {status === 'success' && (
                                <div className="text-green-400 font-bold mt-2 flex items-center gap-2">
                                    <CheckCircle2 size={14} /> Operation completed successfully!
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="text-red-400 font-bold mt-2 flex items-center gap-2">
                                    <AlertCircle size={14} /> Operation failed. Check Vercel logs.
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Help Alert */}
                <div className="p-4 rounded-2xl bg-brand-accent/5 border border-brand-accent/10 flex gap-3">
                    <AlertCircle className="text-brand-accent shrink-0" size={20} />
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-brand-text">Important Note</p>
                        <p className="text-[11px] text-brand-muted leading-relaxed">
                            This tool creates the user <strong>admin@barmagly.ch</strong> with password <strong>admin123</strong>.
                            If it fails, ensure <code>DATABASE_URL</code> is correctly set in your Vercel project settings.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
