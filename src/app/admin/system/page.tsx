'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Activity, Shield, Server, Database, AlertTriangle,
    CheckCircle2, RefreshCcw, Terminal, Globe, Lock
} from 'lucide-react';
import { systemApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface SystemStatus {
    database: string;
    env: {
        FRONTEND_URL: string;
        DATABASE_URL: string;
        PORT: string | number;
        NODE_ENV: string;
    };
}

export default function AdminSystemPage() {
    const [status, setStatus] = useState<SystemStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [repairing, setRepairing] = useState(false);
    const [repairLogs, setRepairLogs] = useState<string[]>([]);
    const { showToast } = useToast();

    const fetchStatus = React.useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await systemApi.getStatus();
            setStatus(data);
        } catch (error) {
            showToast('Failed to fetch system status', 'error');
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        fetchStatus();
    }, [fetchStatus]);

    const handleRepair = async () => {
        if (!confirm('This will verify critical data and re-seed the admin if missing. Continue?')) return;

        setRepairing(true);
        setRepairLogs([]);
        try {
            const { data } = await systemApi.runRepair();
            setRepairLogs(data.logs || []);
            if (data.success) {
                showToast('System repair completed', 'success');
                fetchStatus();
            } else {
                showToast(data.message || 'Repair failed', 'error');
            }
        } catch (error: any) {
            showToast('Failed to execute repair', 'error');
            setRepairLogs(prev => [...prev, `[ERROR] ${error.message}`]);
        } finally {
            setRepairing(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-display font-bold text-brand-text">System Health & Repair</h2>
                <p className="text-brand-muted text-sm">Diagnose connectivity issues and repair system configuration.</p>
            </div>

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {/* Connection Status */}
                <motion.div variants={staggerItem} className="glass-card p-6 space-y-4">
                    <div className="flex items-center gap-3 text-brand-text font-display font-bold">
                        <Activity className="text-brand-accent" size={20} />
                        <h3>Core Status</h3>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-brand-surface border border-brand-glass-border">
                            <div className="flex items-center gap-2">
                                <Database size={16} className="text-brand-muted" />
                                <span className="text-sm">Database</span>
                            </div>
                            {loading ? (
                                <div className="h-4 w-16 skeleton" />
                            ) : (
                                <span className={`text-xs font-bold px-2 py-1 rounded-md ${status?.database === 'Connected' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                                    }`}>
                                    {status?.database || 'Unknown'}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-xl bg-brand-surface border border-brand-glass-border">
                            <div className="flex items-center gap-2">
                                <Globe size={16} className="text-brand-muted" />
                                <span className="text-sm">API URL</span>
                            </div>
                            <span className="text-xs text-brand-accent font-medium truncate max-w-[150px]">
                                {process.env.NEXT_PUBLIC_API_URL || 'Not Defined'}
                            </span>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        fullWidth
                        onClick={fetchStatus}
                        isLoading={loading}
                        icon={<RefreshCcw size={14} />}
                    >
                        Refresh Diagnostics
                    </Button>
                </motion.div>

                {/* Env Vars */}
                <motion.div variants={staggerItem} className="glass-card p-6 space-y-4">
                    <div className="flex items-center gap-3 text-brand-text font-display font-bold">
                        < Shield className="text-brand-accent" size={20} />
                        <h3>Environment Verification</h3>
                    </div>

                    <div className="space-y-2">
                        {status?.env && Object.entries(status.env).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between text-xs">
                                <span className="text-brand-muted uppercase font-bold tracking-tighter">{key}</span>
                                <span className={value === 'Missing' ? 'text-red-400' : 'text-brand-text'}>{value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="p-3 rounded-xl bg-brand-accent/5 border border-brand-accent/10">
                        <p className="text-[10px] text-brand-accent leading-relaxed">
                            <AlertTriangle className="inline mr-1" size={10} />
                            If variables show &quot;Missing&quot;, ensure they are correctly set in the Vercel Dashboard and the site is redeployed.
                        </p>
                    </div>
                </motion.div>

                {/* Repair Tool */}
                <motion.div variants={staggerItem} className="md:col-span-2 glass-card p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-brand-text font-display font-bold">
                            <RefreshCcw className="text-brand-accent" size={20} />
                            <h3>Manual System Repair</h3>
                        </div>
                        <Button
                            variant="primary"
                            onClick={handleRepair}
                            isLoading={repairing}
                            icon={<CheckCircle2 size={18} />}
                        >
                            Run Repair Script
                        </Button>
                    </div>

                    <p className="text-sm text-brand-muted">
                        This operation will attempt to restore critical system data, including the default admin account and essential site configurations. Use this if you are unable to login or data is missing.
                    </p>

                    {(repairing || repairLogs.length > 0) && (
                        <div className="bg-black/40 rounded-xl p-4 font-mono text-xs overflow-hidden border border-brand-glass-border">
                            <div className="flex items-center gap-2 mb-3 text-brand-muted">
                                <Terminal size={14} />
                                <span>Repair Logs</span>
                            </div>
                            <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
                                {repairLogs.map((log, i) => (
                                    <div key={i} className="text-blue-300/80">{log}</div>
                                ))}
                                {repairing && <div className="text-brand-accent animate-pulse">Running...</div>}
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
}
