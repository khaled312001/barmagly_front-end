'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/FormElements';
import { useToast } from '@/components/ui/Toast';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string | null;
    order: number;
    isActive: boolean;
}

export default function AdminFaqPage() {
    const [items, setItems] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<string | null>(null);
    const [form, setForm] = useState({ question: '', answer: '', category: 'General', order: 0 });
    const { showToast } = useToast();

    useEffect(() => { fetchItems(); }, []);

    const fetchItems = async () => {
        try { const { data } = await adminApi.getFaq(); setItems(data); }
        catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const handleSave = async () => {
        try {
            if (editing) await adminApi.updateFaq(editing, form);
            else {
                await adminApi.createFaq(form);
                showToast('FAQ created successfully', 'success');
            }
            setShowForm(false); setEditing(null);
            setForm({ question: '', answer: '', category: 'General', order: 0 });
            fetchItems();
        } catch (e) {
            console.error(e);
            showToast('Failed to save FAQ', 'error');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this FAQ?')) return;
        try { await adminApi.deleteFaq(id); fetchItems(); }
        catch (e) { console.error(e); }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-display font-bold text-brand-text">FAQ Management</h2>
                    <p className="text-brand-muted text-sm">Manage frequently asked questions.</p>
                </div>
                <Button variant="primary" size="sm" icon={<Plus size={16} />} onClick={() => {
                    setShowForm(true); setEditing(null);
                    setForm({ question: '', answer: '', category: 'General', order: 0 });
                }}>Add FAQ</Button>
            </div>

            {showForm && (
                <div className="glass-card p-6 space-y-4">
                    <h3 className="text-lg font-display font-semibold text-brand-text">{editing ? 'Edit' : 'New'} FAQ</h3>
                    <Input label="Question" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
                    <Textarea label="Answer" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} />
                    <Input label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="General, Services, Pricing..." />
                    <div className="flex gap-3">
                        <Button variant="primary" size="sm" icon={<Save size={16} />} onClick={handleSave}>Save</Button>
                        <Button variant="ghost" size="sm" icon={<X size={16} />} onClick={() => { setShowForm(false); setEditing(null); }}>Cancel</Button>
                    </div>
                </div>
            )}

            <div className="space-y-3">
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-20 rounded-2xl" />)
                ) : items.length === 0 ? (
                    <div className="glass-card p-12 text-center text-brand-muted">No FAQs yet.</div>
                ) : items.map((item) => (
                    <div key={item.id} className="glass-card p-5 group">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <h4 className="font-semibold text-brand-text mb-1">{item.question}</h4>
                                <p className="text-brand-muted text-sm">{item.answer}</p>
                                {item.category && <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs bg-brand-surface text-brand-muted">{item.category}</span>}
                            </div>
                            <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => {
                                    setEditing(item.id);
                                    setForm({ question: item.question, answer: item.answer, category: item.category || 'General', order: item.order || 0 });
                                    setShowForm(true);
                                }} className="p-1.5 rounded-lg hover:bg-brand-accent/10 text-brand-muted hover:text-brand-accent transition-all">
                                    <Edit size={14} />
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-brand-muted hover:text-red-400 transition-all">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
