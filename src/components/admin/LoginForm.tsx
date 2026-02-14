'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/FormElements';
import { useAuthStore } from '@/store';
import { adminApi } from '@/lib/api';
import { heroTextReveal, staggerContainer, staggerItem } from '@/lib/animations';

interface LoginFormProps {
    onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const setUser = useAuthStore((s) => s.setUser);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const { data } = await adminApi.login({ email, password });
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            setUser(data.user);
            if (onSuccess) {
                onSuccess();
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10 w-full max-w-lg px-4 mx-auto"
        >
            <div className="glass-card p-1 md:p-1.5 rounded-[2.5rem] bg-gradient-to-br from-brand-accent/20 to-brand-secondary/20 shadow-2xl">
                <motion.div
                    variants={heroTextReveal}
                    className="bg-brand-dark/90 backdrop-blur-3xl p-8 md:p-12 rounded-[2rem] border border-white/5"
                >
                    {/* Header */}
                    <div className="text-center mb-10">
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-accent to-brand-secondary flex items-center justify-center font-display font-bold text-white text-3xl mx-auto mb-6 shadow-neon-cyan relative group"
                        >
                            <div className="absolute inset-0 bg-white/20 blur-xl group-hover:blur-2xl transition-all rounded-full opacity-50" />
                            <span className="relative z-10">B</span>
                            <Zap className="absolute -top-2 -right-2 text-brand-accent animate-pulse" size={20} />
                        </motion.div>
                        <h1 className="text-3xl font-display font-bold text-brand-text tracking-tight">
                            Control <span className="gradient-text">Center</span>
                        </h1>
                        <p className="text-brand-muted text-sm mt-3 flex items-center justify-center gap-2">
                            <ShieldCheck size={14} className="text-brand-accent" />
                            Secure administrative access only
                        </p>
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                                className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3"
                            >
                                <div className="mt-0.5">⚠️</div>
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div variants={staggerItem}>
                            <div className="relative group">
                                <div className="absolute left-4 top-[3.25rem] -translate-y-1/2 text-brand-muted group-focus-within:text-brand-accent transition-colors">
                                    <Mail size={18} />
                                </div>
                                <Input
                                    label="Admin Email"
                                    type="email"
                                    placeholder="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="pl-11 bg-white/5 border-white/10 focus:border-brand-accent/50"
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={staggerItem}>
                            <div className="relative group">
                                <div className="absolute left-4 top-[3.25rem] -translate-y-1/2 text-brand-muted group-focus-within:text-brand-secondary transition-colors">
                                    <Lock size={18} />
                                </div>
                                <Input
                                    label="Access Key"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="pl-11 bg-white/5 border-white/10 focus:border-brand-secondary/50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-[3.25rem] -translate-y-1/2 text-brand-muted hover:text-brand-text transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </motion.div>

                        <motion.div variants={staggerItem} className="pt-2">
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                fullWidth
                                isLoading={isLoading}
                                icon={<ArrowRight size={20} />}
                                className="h-14 text-base tracking-wide"
                            >
                                Initialize Session
                            </Button>
                        </motion.div>
                    </form>
                </motion.div>
            </div>

            <motion.div
                variants={staggerItem}
                className="mt-10 flex flex-col items-center gap-4"
            >
                <div className="h-px w-24 bg-brand-glass-border" />
                <p className="text-center text-brand-muted text-xs tracking-widest uppercase opacity-60">
                    System Protocol v2.0.4 • Barmagly High Security
                </p>
            </motion.div>
        </motion.div>
    );
}
