'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Users, Github, Linkedin, Twitter, Facebook } from 'lucide-react';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/FormElements';
import { useToast } from '@/components/ui/Toast';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string | null;
    image: string | null;
    facebook: string | null;
    twitter: string | null;
    linkedin: string | null;
    isActive: boolean;
    order: number;
}

export default function AdminTeamPage() {
    const [items, setItems] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<string | null>(null);
    const [form, setForm] = useState({ name: '', role: '', bio: '', image: '', facebook: '', twitter: '', linkedin: '' });
    const [showAdd, setShowAdd] = useState(false);
    const { showToast } = useToast();

    useEffect(() => { fetchItems(); }, []);

    const fetchItems = async () => {
        try { const { data } = await adminApi.getTeam(); setItems(data); }
        catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const handleSave = async () => {
        try {
            if (editing) { await adminApi.updateMember(editing, form); }
            else {
                await adminApi.createMember(form);
                showToast('Team member added successfully', 'success');
            }
            setEditing(null); setShowAdd(false);
            setForm({ name: '', role: '', bio: '', image: '', facebook: '', twitter: '', linkedin: '' });
            fetchItems();
        } catch (e) {
            console.error(e);
            showToast('Failed to save team member', 'error');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this team member?')) return;
        try { await adminApi.deleteMember(id); fetchItems(); }
        catch (e) { console.error(e); }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-display font-bold text-brand-text">Team Members</h2>
                    <p className="text-brand-muted text-sm">Manage your team.</p>
                </div>
                <Button variant="primary" size="sm" icon={<Plus size={16} />} onClick={() => { setShowAdd(true); setEditing(null); setForm({ name: '', role: '', bio: '', image: '', facebook: '', twitter: '', linkedin: '' }); }}>
                    Add Member
                </Button>
            </div>

            {showAdd && (
                <div className="glass-card p-6 space-y-4">
                    <h3 className="text-lg font-display font-semibold text-brand-text">{editing ? 'Edit' : 'New'} Member</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        <Input label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
                    </div>
                    <Textarea label="Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
                    <Input label="LinkedIn URL" value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} />
                    <div className="flex gap-3">
                        <Button variant="primary" size="sm" icon={<Save size={16} />} onClick={handleSave}>Save</Button>
                        <Button variant="ghost" size="sm" icon={<X size={16} />} onClick={() => { setShowAdd(false); setEditing(null); }}>Cancel</Button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-32 rounded-2xl" />)
                ) : items.map((item) => (
                    <div key={item.id} className="glass-card p-6">
                        <div className="flex items-start justify-between mb-3">
                            <div className="w-10 h-10 rounded-xl bg-brand-accent/20 flex items-center justify-center text-brand-accent font-bold">
                                {item.name[0]}
                            </div>
                            <div className="flex gap-1">
                                <button onClick={() => { setEditing(item.id); setForm({ name: item.name, role: item.role, bio: item.bio || '', image: item.image || '', facebook: item.facebook || '', twitter: item.twitter || '', linkedin: item.linkedin || '' }); setShowAdd(true); }} className="p-1.5 rounded-lg hover:bg-brand-accent/10 text-brand-muted hover:text-brand-accent transition-all">
                                    <Edit size={14} />
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-brand-muted hover:text-red-400 transition-all">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                        <h4 className="font-semibold text-brand-text">{item.name}</h4>
                        <p className="text-brand-accent text-sm">{item.role}</p>
                        {item.bio && <p className="text-brand-muted text-xs mt-2 line-clamp-2">{item.bio}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}
