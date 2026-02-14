'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Star, ExternalLink, MoreVertical, LayoutGrid } from 'lucide-react';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/FormElements';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { useToast } from '@/components/ui/Toast';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface Project {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    technologies: string[];
    isFeatured: boolean;
    isActive: boolean;
    image?: string;
}

export default function AdminPortfolioPage() {
    const [items, setItems] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<string | null>(null);
    const [form, setForm] = useState({
        title: '', description: '', content: '', category: '', client: '', duration: '', technologies: '', results: '', isFeatured: false, image: '',
    });
    const { showToast } = useToast();

    useEffect(() => { fetchItems(); }, []);

    const fetchItems = async () => {
        try { const { data } = await adminApi.getPortfolio(); setItems(data); }
        catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const handleSave = async () => {
        try {
            const payload = { ...form, technologies: form.technologies.split(',').map((s: string) => s.trim()).filter(Boolean) };
            if (editing) {
                await adminApi.updateProject(editing, payload);
                showToast('Project updated successfully', 'success');
            } else {
                await adminApi.createProject(payload);
                showToast('Project created successfully', 'success');
            }
            setShowForm(false); setEditing(null);
            setForm({ title: '', description: '', content: '', category: '', client: '', duration: '', technologies: '', results: '', isFeatured: false, image: '' });
            fetchItems();
        } catch (e) {
            console.error(e);
            showToast('Failed to save project', 'error');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        try {
            await adminApi.deleteProject(id);
            showToast('Project deleted', 'success');
            fetchItems();
        } catch (e) {
            console.error(e);
            showToast('Failed to delete project', 'error');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-display font-bold text-brand-text">Portfolio Projects</h2>
                    <p className="text-brand-muted text-sm">Manage portfolio case studies.</p>
                </div>
                <Button variant="primary" size="sm" icon={<Plus size={16} />} onClick={() => {
                    setShowForm(true); setEditing(null);
                    setForm({ title: '', description: '', content: '', category: '', client: '', duration: '', technologies: '', results: '', isFeatured: false, image: '' });
                }}>Add Project</Button>
            </div>

            {showForm && (
                <div className="glass-card p-6 space-y-4">
                    <h3 className="text-lg font-display font-semibold text-brand-text">{editing ? 'Edit' : 'New'} Project</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                        <Input label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Web App, Mobile, Design..." />
                        <Input label="Client" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} />
                        <Input label="Duration" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="3 months" />
                    </div>
                    <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
                    <Textarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                    <Textarea label="Content / Case Study" rows={6} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
                    <Input label="Technologies (comma separated)" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} placeholder="React, Node.js, PostgreSQL" />
                    <Textarea label="Results" value={form.results} onChange={(e) => setForm({ ...form, results: e.target.value })} placeholder="Key results and impact..." />
                    <label className="flex items-center gap-2 text-sm text-brand-text">
                        <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} className="rounded" />
                        Featured project
                    </label>
                    <div className="flex gap-3">
                        <Button variant="primary" size="sm" icon={<Save size={16} />} onClick={handleSave}>Save</Button>
                        <Button variant="ghost" size="sm" icon={<X size={16} />} onClick={() => { setShowForm(false); setEditing(null); }}>Cancel</Button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-48 rounded-2xl" />)
                ) : items.length === 0 ? (
                    <div className="col-span-full glass-card p-12 text-center text-brand-muted">No projects yet.</div>
                ) : items.map((item) => (
                    <div key={item.id} className="glass-card p-6 group">
                        <div className="flex items-start justify-between mb-3">
                            <span className="px-2 py-0.5 rounded text-xs bg-brand-accent/10 text-brand-accent font-medium">{item.category}</span>
                            <div className="flex gap-1">
                                {item.isFeatured && <Star size={14} className="text-yellow-400 fill-yellow-400" />}
                                <button onClick={() => {
                                    setEditing(item.id);
                                    setForm({
                                        title: item.title,
                                        description: item.description,
                                        content: '', // content might be heavy, skipping in list view or need fetch single? Assuming fetchItems includes it? No, getPortfolio doesn't return content potentially? Check backend. Backend GET /portfolio returns all fields.
                                        // Wait, backend admin.ts getPortfolio returns projects with included images. but mapping just technologies.
                                        // Content is in Project model.
                                        // So it IS returned.
                                        category: item.category,
                                        client: '', // client not in Project interface above? Wait, schema has client. Interface incomplete?
                                        // Update: Interface Project above DOES NOT have client, duration, content, results.
                                        // I need to update Interface Project too, line 12.
                                        duration: '',
                                        technologies: item.technologies.join(', '),
                                        results: '',
                                        isFeatured: item.isFeatured,
                                        image: item.image || ''
                                    });
                                    // Actually, I should fetch the full project details or ensure `items` has everything.
                                    // I'll update form with item fields assuming they exist in `item`.
                                    // I need to fix `Project` interface first.
                                    setForm({
                                        title: item.title,
                                        description: item.description,
                                        content: (item as any).content || '',
                                        category: item.category,
                                        client: (item as any).client || '',
                                        duration: (item as any).duration || '',
                                        technologies: item.technologies.join(', '),
                                        results: (item as any).results || '',
                                        isFeatured: item.isFeatured,
                                        image: (item as any).image || ''
                                    });
                                    setShowForm(true);
                                }} className="p-1.5 rounded-lg hover:bg-brand-accent/10 text-brand-muted hover:text-brand-accent opacity-0 group-hover:opacity-100 transition-all">
                                    <Edit size={14} />
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-brand-muted hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                        <h4 className="font-semibold text-brand-text mb-1">{item.title}</h4>
                        <p className="text-brand-muted text-sm line-clamp-2 mb-3">{item.description}</p>
                        <div className="flex flex-wrap gap-1">
                            {item.technologies.slice(0, 3).map((t, i) => (
                                <span key={i} className="px-1.5 py-0.5 rounded text-[10px] bg-brand-surface text-brand-muted">{t}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
