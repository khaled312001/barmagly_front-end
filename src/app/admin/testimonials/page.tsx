'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X, MessageSquare, Quote, Star } from 'lucide-react';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/FormElements';
import { useToast } from '@/components/ui/Toast';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface Testimonial {
    id: string;
    name: string;
    role: string;
    image: string;
    company: string | null;
    content: string;
    rating: number;
    isActive: boolean;
    order: number;
}

export default function AdminTestimonialsPage() {
    const [items, setItems] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<string | null>(null);
    const [form, setForm] = useState({ name: '', company: '', role: '', content: '', rating: 5, image: '' });
    const { showToast } = useToast();
    const [showAdd, setShowAdd] = useState(false);

    useEffect(() => { fetchItems(); }, []);

    const fetchItems = async () => {
        try {
            const { data } = await adminApi.getTestimonials();
            setItems(data);
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const handleSave = async () => {
        try {
            if (editing) {
                await adminApi.updateTestimonial(editing, form);
            } else {
                showToast('Testimonial created successfully', 'success');
            }
            setEditing(null);
            setShowAdd(false);
            setForm({ name: '', company: '', role: '', content: '', rating: 5, image: '' });
            fetchItems();
        } catch (e) {
            console.error(e);
            showToast('Failed to save testimonial', 'error');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this testimonial?')) return;
        try {
            await adminApi.deleteTestimonial(id);
            fetchItems();
        } catch (e) { console.error(e); }
    };

    const startEdit = (item: Testimonial) => {
        setEditing(item.id);
        setForm({ name: item.name, role: item.role, company: item.company || '', content: item.content, rating: item.rating, image: item.image || '' });
        setShowAdd(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-display font-bold text-brand-text">Testimonials</h2>
                    <p className="text-brand-muted text-sm">Manage client testimonials.</p>
                </div>
                <Button variant="primary" size="sm" icon={<Plus size={16} />} onClick={() => { setShowAdd(true); setEditing(null); setForm({ name: '', company: '', role: '', content: '', rating: 5, image: '' }); }}>
                    Add Testimonial
                </Button>
            </div>

            {/* Form */}
            {showAdd && (
                <div className="glass-card p-6 space-y-4">
                    <h3 className="text-lg font-display font-semibold text-brand-text">{editing ? 'Edit' : 'New'} Testimonial</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Client name" />
                        <Input label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="CEO, CTO..." />
                        <Input label="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company name" />
                    </div>
                    <Textarea label="Content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Testimonial content..." />
                    <div className="flex items-center gap-4">
                        <label className="text-sm text-brand-muted">Rating:</label>
                        {[1, 2, 3, 4, 5].map((r) => (
                            <button key={r} onClick={() => setForm({ ...form, rating: r })} className={`text-lg ${r <= form.rating ? 'text-yellow-400' : 'text-brand-muted/30'}`}>★</button>
                        ))}
                    </div>
                    <div className="flex gap-3">
                        <Button variant="primary" size="sm" icon={<Save size={16} />} onClick={handleSave}>Save</Button>
                        <Button variant="ghost" size="sm" icon={<X size={16} />} onClick={() => { setShowAdd(false); setEditing(null); }}>Cancel</Button>
                    </div>
                </div>
            )}

            {/* List */}
            <div className="space-y-4">
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-24 rounded-2xl" />)
                ) : items.length === 0 ? (
                    <div className="glass-card p-12 text-center text-brand-muted">No testimonials yet.</div>
                ) : (
                    items.map((item) => (
                        <div key={item.id} className="glass-card p-6 flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="font-semibold text-brand-text">{item.name}</span>
                                    <span className="text-brand-muted text-sm">— {item.role}{item.company ? `, ${item.company}` : ''}</span>
                                </div>
                                <p className="text-brand-muted text-sm leading-relaxed">&ldquo;{item.content}&rdquo;</p>
                                <div className="flex gap-0.5 mt-2">
                                    {Array.from({ length: item.rating }).map((_, i) => (
                                        <span key={i} className="text-yellow-400 text-sm">★</span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <button onClick={() => startEdit(item)} className="p-2 rounded-lg hover:bg-brand-accent/10 text-brand-muted hover:text-brand-accent transition-all">
                                    <Edit size={16} />
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-brand-muted hover:text-red-400 transition-all">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
