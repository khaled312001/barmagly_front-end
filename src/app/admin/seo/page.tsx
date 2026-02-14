'use client';

import React, { useEffect, useState } from 'react';
import { Save, Globe, MoreVertical, ExternalLink } from 'lucide-react';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/FormElements';
import { useToast } from '@/components/ui/Toast';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface SeoEntry {
    id: string;
    page: string;
    title: string | null;
    description: string | null;
    keywords: string[];
    ogImage: string | null;
    schema: string | null;
}

export default function AdminSeoPage() {
    const [entries, setEntries] = useState<SeoEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<string | null>(null);
    const [form, setForm] = useState({ title: '', description: '', keywords: '', ogImage: '', schema: '' });
    const [saving, setSaving] = useState(false);
    const { showToast } = useToast();

    useEffect(() => { fetchEntries(); }, []);

    const fetchEntries = async () => {
        try { const { data } = await adminApi.getSeo(); setEntries(data); }
        catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const handleSave = async () => {
        if (!editing) return;
        setSaving(true);
        try {
            await adminApi.updateSeo(editing, {
                title: form.title,
                description: form.description,
                keywords: form.keywords.split(',').map(k => k.trim()).filter(Boolean),
                ogImage: form.ogImage,
                schema: form.schema,
            });
            setEditing(null);
            fetchEntries();
        } catch (e) { console.error(e); }
        finally { setSaving(false); }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-display font-bold text-brand-text">SEO Management</h2>
                <p className="text-brand-muted text-sm">Manage meta tags, schema, and keywords per page.</p>
            </div>

            {editing && (
                <div className="glass-card p-6 space-y-4">
                    <h3 className="text-lg font-display font-semibold text-brand-text">Edit SEO — <span className="capitalize text-brand-accent">{entries.find(e => e.id === editing)?.page}</span></h3>
                    <Input label="Meta Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Page title for search engines" />
                    <Textarea label="Meta Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Page description for search engines..." />
                    <Input label="Keywords (comma separated)" value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} />
                    <Input label="OG Image URL" value={form.ogImage} onChange={(e) => setForm({ ...form, ogImage: e.target.value })} placeholder="https://..." />
                    <Textarea label="Schema JSON (JSON-LD)" rows={6} value={form.schema} onChange={(e) => setForm({ ...form, schema: e.target.value })} placeholder='{"@type": "Organization", ...}' />
                    <div className="flex gap-3">
                        <Button variant="primary" size="sm" icon={<Save size={16} />} onClick={handleSave} isLoading={saving}>Save</Button>
                        <Button variant="ghost" size="sm" onClick={() => setEditing(null)}>Cancel</Button>
                    </div>
                </div>
            )}

            <div className="space-y-3">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-20 rounded-2xl" />)
                ) : entries.map((entry) => (
                    <div key={entry.id} className="glass-card p-5 flex items-center justify-between gap-4 hover:border-brand-accent/20 transition-all cursor-pointer"
                        onClick={() => {
                            setEditing(entry.id);
                            setForm({
                                title: entry.title || '',
                                description: entry.description || '',
                                keywords: (entry.keywords || []).join(', '),
                                ogImage: entry.ogImage || '',
                                schema: entry.schema || '',
                            });
                        }}>
                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded-xl bg-brand-accent/10">
                                <Globe size={18} className="text-brand-accent" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-brand-text capitalize">{entry.page}</h4>
                                <p className="text-brand-muted text-sm line-clamp-1">{entry.title || 'No meta title set'}</p>
                            </div>
                        </div>
                        <div className="text-xs text-brand-muted">
                            {entry.keywords?.length || 0} keywords
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
