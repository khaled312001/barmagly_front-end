'use client';

import React, { useEffect, useState } from 'react';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/components/ui/Toast';
import { Input, Textarea } from '@/components/ui/FormElements';
import { motion } from 'framer-motion';

// Types for sections
interface HeroSection {
    badgeText?: string;
    titleLine1?: string;
    titleLine2?: string;
    description?: string;
    primaryBtnText?: string;
    secondaryBtnText?: string;
}

interface StatsSection {
    stats?: { label: string; value: string; suffix?: string }[];
}

// Editor Components
const HomeEditor = ({ data, onChange }: { data: Record<string, any>, onChange: (section: string, value: any) => void }) => {
    const hero: HeroSection = data.hero || {};
    // Ensure stats has default empty array if undefined
    const stats: StatsSection = data.stats || { stats: [] };
    const features: Record<string, string> = data.features || {};
    const cta: Record<string, string> = data.cta || {};

    const updateHero = (key: keyof HeroSection, value: string) => {
        onChange('hero', { ...hero, [key]: value });
    };

    const updateStats = (index: number, key: string, value: string) => {
        const newStats = [...(stats.stats || [])];
        if (!newStats[index]) newStats[index] = { label: '', value: '' };
        newStats[index] = { ...newStats[index], [key]: value };
        onChange('stats', { ...stats, stats: newStats });
    };

    const updateFeatures = (key: string, value: string) => {
        onChange('features', { ...features, [key]: value });
    };

    const updateCta = (key: string, value: string) => {
        onChange('cta', { ...cta, [key]: value });
    };

    return (
        <div className="space-y-10">
            {/* Hero Section */}
            <div className="glass-card p-6 space-y-4">
                <h3 className="text-xl font-display font-bold text-brand-text border-b border-brand-glass-border pb-4 mb-4">Hero Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Badge Text" value={hero.badgeText || ''} onChange={(e) => updateHero('badgeText', e.target.value)} placeholder="Licensed Swiss Tech Company" />
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Title Line 1" value={hero.titleLine1 || ''} onChange={(e) => updateHero('titleLine1', e.target.value)} placeholder="Barmagly:" />
                        <Input label="Title Line 2" value={hero.titleLine2 || ''} onChange={(e) => updateHero('titleLine2', e.target.value)} placeholder="Swiss Precision..." />
                    </div>
                    <div className="md:col-span-2">
                        <Textarea label="Description" value={hero.description || ''} onChange={(e) => updateHero('description', e.target.value)} rows={3} placeholder="We architect..." />
                    </div>
                    <Input label="Primary Button" value={hero.primaryBtnText || ''} onChange={(e) => updateHero('primaryBtnText', e.target.value)} placeholder="Start Your Project" />
                    <Input label="Secondary Button" value={hero.secondaryBtnText || ''} onChange={(e) => updateHero('secondaryBtnText', e.target.value)} placeholder="View Our Portfolio" />
                </div>
            </div>

            {/* Stats Section */}
            <div className="glass-card p-6 space-y-4">
                <h3 className="text-xl font-display font-bold text-brand-text border-b border-brand-glass-border pb-4 mb-4">Stats Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="space-y-2 p-4 border border-brand-glass-border rounded-xl bg-white/5">
                            <h4 className="text-sm font-bold text-brand-muted uppercase">Stat #{i + 1}</h4>
                            <Input label="Value" value={stats.stats?.[i]?.value || ''} onChange={(e) => updateStats(i, 'value', e.target.value)} placeholder="150" />
                            <Input label="Suffix" value={stats.stats?.[i]?.suffix || ''} onChange={(e) => updateStats(i, 'suffix', e.target.value)} placeholder="+" />
                            <Input label="Label" value={stats.stats?.[i]?.label || ''} onChange={(e) => updateStats(i, 'label', e.target.value)} placeholder="Systems Built" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Features Section (Intro) */}
            <div className="glass-card p-6 space-y-4">
                <h3 className="text-xl font-display font-bold text-brand-text border-b border-brand-glass-border pb-4 mb-4">Features / Why Us Header</h3>
                <div className="grid grid-cols-1 gap-6">
                    <Input label="Badge" value={features.badge || ''} onChange={(e) => updateFeatures('badge', e.target.value)} placeholder="Core Values" />
                    <Input label="Title" value={features.title || ''} onChange={(e) => updateFeatures('title', e.target.value)} placeholder="Built on Swiss Precision..." />
                    <Textarea label="Description" value={features.description || ''} onChange={(e) => updateFeatures('description', e.target.value)} rows={3} />
                    <Input label="Button Text" value={features.btnText || ''} onChange={(e) => updateFeatures('btnText', e.target.value)} placeholder="Our Scientific Approach" />
                </div>
            </div>

            {/* CTA Section */}
            <div className="glass-card p-6 space-y-4">
                <h3 className="text-xl font-display font-bold text-brand-text border-b border-brand-glass-border pb-4 mb-4">CTA / Contact Header</h3>
                <div className="grid grid-cols-1 gap-6">
                    <Input label="Badge" value={cta.badge || ''} onChange={(e) => updateCta('badge', e.target.value)} placeholder="Initiation" />
                    <Input label="Title" value={cta.title || ''} onChange={(e) => updateCta('title', e.target.value)} placeholder="Launch Your Project" />
                    <Textarea label="Description" value={cta.description || ''} onChange={(e) => updateCta('description', e.target.value)} rows={3} />
                </div>
            </div>
        </div>
    );
};

export default function PageEditor({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const [sections, setSections] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { showToast } = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await adminApi.getPageSections(slug);
                setSections(data);
            } catch (error) {
                console.error(error);
                showToast('Failed to load page data', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [slug, showToast]);

    const handleChange = (sectionKey: string, value: any) => {
        setSections(prev => ({ ...prev, [sectionKey]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // Save each section
            // In a real app, we might want to batch this or only save changed sections
            // For now, we iterate keys
            const promises = Object.entries(sections).map(([key, value]) =>
                adminApi.updatePageSection(slug, key, value)
            );
            await Promise.all(promises);
            showToast('Changes saved successfully', 'success');
        } catch (error) {
            console.error(error);
            showToast('Failed to save changes', 'error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-brand-dark flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-20">
            <div className="flex items-center justify-between sticky top-20 z-30 bg-brand-dark/80 backdrop-blur-md py-4 -mx-4 px-4 border-b border-brand-glass-border">
                <div className="flex items-center gap-4">
                    <Link href="/admin/pages" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <ArrowLeft size={20} className="text-brand-muted" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-display font-bold text-brand-text capitalize">{slug} Page</h1>
                        <p className="text-brand-muted text-xs">Manage content and sections</p>
                    </div>
                </div>
                <Button variant="primary" icon={<Save size={18} />} onClick={handleSave} isLoading={saving}>
                    Save Changes
                </Button>
            </div>

            {slug === 'home' && <HomeEditor data={sections} onChange={handleChange} />}
            {slug !== 'home' && (
                <div className="glass-card p-10 text-center">
                    <p className="text-brand-muted">Editor for <span className="text-brand-accent font-bold capitalize">{slug}</span> is under construction.</p>
                </div>
            )}
        </div>
    );
}
