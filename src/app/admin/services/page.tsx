'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Briefcase, ExternalLink, MoreVertical } from 'lucide-react';
import { adminApi, publicApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/FormElements';
import { useToast } from '@/components/ui/Toast';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface Service {
    id: string;
    title: string;
    slug: string;
    description: string;
    features: string[];
    isActive: boolean;
    categoryId: string;
    category?: { name: string; id: string } | null;
    details?: string;
    icon?: string;
}

export default function AdminServicesPage() {
    const [items, setItems] = useState<Service[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<string | null>(null);
    const [form, setForm] = useState({ title: '', description: '', details: '', features: '', icon: '', categoryId: '' });
    const { showToast } = useToast();

    useEffect(() => {
        fetchItems();
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data } = await publicApi.getServices();
            setCategories(data);
        } catch (e) {
            console.error('Failed to fetch categories', e);
        }
    };

    const fetchItems = async () => {
        try { const { data } = await adminApi.getServices(); setItems(data); }
        catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const handleSave = async () => {
        try {
            const payload = { ...form, features: form.features.split(',').map(s => s.trim()).filter(Boolean) };
            if (editing) {
                await adminApi.updateService(editing, payload);
                showToast('Service updated successfully', 'success');
            } else {
                await adminApi.createService(payload);
                showToast('Service created successfully', 'success');
            }
            setShowForm(false); setEditing(null);
            setForm({ title: '', description: '', details: '', features: '', icon: '', categoryId: '' });
            fetchItems();
        } catch (e) {
            console.error(e);
            showToast('Failed to save service', 'error');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;
        try {
            await adminApi.deleteService(id);
            showToast('Service deleted', 'success');
            fetchItems();
        } catch (e) {
            console.error(e);
            showToast('Failed to delete service', 'error');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-display font-bold text-brand-text">Services</h2>
                    <p className="text-brand-muted text-sm">Manage service offerings.</p>
                </div>
                <Button variant="primary" size="sm" icon={<Plus size={16} />} onClick={() => {
                    setShowForm(true); setEditing(null);
                    setForm({ title: '', description: '', details: '', features: '', icon: '', categoryId: '' });
                }}>Add Service</Button>
            </div>

            {showForm && (
                <div className="glass-card p-6 space-y-4">
                    <h3 className="text-lg font-display font-semibold text-brand-text">{editing ? 'Edit' : 'New'} Service</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                        <Input label="Icon Name" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="Lucide icon name" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-brand-muted mb-1">Category</label>
                        <select
                            className="w-full bg-brand-glass border border-white/5 rounded-xl px-4 py-3 text-white focus:border-brand-accent/50 focus:outline-none placeholder:text-brand-muted/50 transition-all focus:ring-1 focus:ring-brand-accent/50 appearance-none"
                            value={form.categoryId}
                            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                        >
                            <option value="" disabled>Select Category</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id} className="bg-brand-dark text-white">
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Textarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                    <Textarea label="Detailed Content" rows={6} value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} />
                    <Input label="Features (comma separated)" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} />
                    <div className="flex gap-3">
                        <Button variant="primary" size="sm" icon={<Save size={16} />} onClick={handleSave}>Save</Button>
                        <Button variant="ghost" size="sm" icon={<X size={16} />} onClick={() => { setShowForm(false); setEditing(null); }}>Cancel</Button>
                    </div>
                </div>
            )}

            <div className="space-y-3">
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-20 rounded-2xl" />)
                ) : items.length === 0 ? (
                    <div className="glass-card p-12 text-center text-brand-muted">No services yet.</div>
                ) : items.map((item) => (
                    <div key={item.id} className="glass-card p-5 flex items-center justify-between gap-4 group">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 rounded-xl bg-brand-accent/10">
                                <Briefcase size={18} className="text-brand-accent" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-brand-text">{item.title}</h4>
                                <p className="text-brand-muted text-sm line-clamp-1">{item.description}</p>
                                {item.category && <span className="text-xs text-brand-accent">{item.category.name}</span>}
                            </div>
                        </div>
                        <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => {
                                setEditing(item.id);
                                setForm({
                                    title: item.title,
                                    description: item.description,
                                    details: item.details || '', // details might be missing in fetchItems if not included in response? check backend
                                    features: item.features.join(', '),
                                    icon: item.icon || '',
                                    categoryId: item.categoryId || ''
                                });
                                setShowForm(true);
                            }} className="p-1.5 rounded-lg hover:bg-brand-accent/10 text-brand-muted hover:text-brand-accent transition-all">
                                <Edit size={14} />
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-brand-muted hover:text-red-400 transition-all">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
