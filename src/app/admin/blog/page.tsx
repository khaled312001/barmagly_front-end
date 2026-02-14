'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff, FileText, Calendar, User, Tag } from 'lucide-react';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/FormElements';
import { useToast } from '@/components/ui/Toast';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { formatDate } from '@/lib/utils';

interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    status: string;
    publishedAt: string | null;
    author: { name: string };
    category?: { name: string } | null;
}

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<string | null>(null);
    const [form, setForm] = useState({
        title: '', excerpt: '', content: '', status: 'DRAFT', metaTitle: '', metaDesc: '', image: '',
    });
    const { showToast } = useToast();

    useEffect(() => { fetchPosts(); }, []);

    const fetchPosts = async () => {
        try { const { data } = await adminApi.getBlog(); setPosts(data); }
        catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const handleSave = async () => {
        try {
            if (editing) {
                await adminApi.updatePost(editing, form);
                showToast('Blog post updated', 'success');
            } else {
                await adminApi.createPost(form);
                showToast('Blog post created', 'success');
            }
            setShowForm(false); setEditing(null);
            setForm({ title: '', excerpt: '', content: '', status: 'DRAFT', metaTitle: '', metaDesc: '', image: '' });
            fetchPosts();
        } catch (e) {
            console.error(e);
            showToast('Failed to save blog post', 'error');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this blog post?')) return;
        try {
            await adminApi.deletePost(id);
            showToast('Blog post deleted', 'success');
            fetchPosts();
        } catch (e) {
            console.error(e);
            showToast('Failed to delete blog post', 'error');
        }
    };

    const statusBadge = (status: string) => {
        const map: Record<string, string> = {
            DRAFT: 'bg-gray-500/10 text-gray-400',
            PUBLISHED: 'bg-green-500/10 text-green-400',
            SCHEDULED: 'bg-blue-500/10 text-blue-400',
            ARCHIVED: 'bg-red-500/10 text-red-400',
        };
        return map[status] || map.DRAFT;
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-display font-bold text-brand-text">Blog Posts</h2>
                    <p className="text-brand-muted text-sm">Create, edit, and publish blog articles.</p>
                </div>
                <Button variant="primary" size="sm" icon={<Plus size={16} />} onClick={() => {
                    setShowForm(true); setEditing(null);
                    setForm({ title: '', excerpt: '', content: '', status: 'DRAFT', metaTitle: '', metaDesc: '', image: '' });
                }}>New Post</Button>
            </div>

            {showForm && (
                <div className="glass-card p-6 space-y-4">
                    <h3 className="text-lg font-display font-semibold text-brand-text">{editing ? 'Edit' : 'New'} Post</h3>
                    <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Post title" />
                    <Input label="Featured Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
                    <Textarea label="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Brief summary..." />
                    <Textarea label="Content" rows={10} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Write your content here (supports markdown)..." />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input label="Meta Title" value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} />
                        <Input label="Meta Description" value={form.metaDesc} onChange={(e) => setForm({ ...form, metaDesc: e.target.value })} />
                        <div>
                            <label className="block text-sm font-medium text-brand-text mb-1.5">Status</label>
                            <select
                                value={form.status}
                                onChange={(e) => setForm({ ...form, status: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl bg-brand-surface border border-brand-glass-border text-brand-text text-sm"
                            >
                                <option value="DRAFT">Draft</option>
                                <option value="PUBLISHED">Published</option>
                                <option value="SCHEDULED">Scheduled</option>
                                <option value="ARCHIVED">Archived</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="primary" size="sm" icon={<Save size={16} />} onClick={handleSave}>Save</Button>
                        <Button variant="ghost" size="sm" icon={<X size={16} />} onClick={() => { setShowForm(false); setEditing(null); }}>Cancel</Button>
                    </div>
                </div>
            )}

            {/* Posts list */}
            <div className="glass-card overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-brand-glass-border">
                            <th className="text-left px-4 py-3 text-xs font-semibold text-brand-muted uppercase tracking-wider">Title</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-brand-muted uppercase tracking-wider hidden md:table-cell">Author</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-brand-muted uppercase tracking-wider">Status</th>
                            <th className="text-right px-4 py-3 text-xs font-semibold text-brand-muted uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <tr key={i}><td colSpan={4} className="px-4 py-4"><div className="skeleton h-4 rounded" /></td></tr>
                            ))
                        ) : posts.length === 0 ? (
                            <tr><td colSpan={4} className="text-center py-12 text-brand-muted">No posts yet.</td></tr>
                        ) : posts.map((post) => (
                            <tr key={post.id} className="border-b border-brand-glass-border/50 hover:bg-white/[0.02]">
                                <td className="px-4 py-3">
                                    <div className="text-sm font-medium text-brand-text">{post.title}</div>
                                    <div className="text-xs text-brand-muted mt-0.5">{post.slug}</div>
                                </td>
                                <td className="px-4 py-3 text-sm text-brand-muted hidden md:table-cell">{post.author.name}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${statusBadge(post.status)}`}>{post.status}</span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex gap-1 justify-end">
                                        <button onClick={() => { setEditing(post.id); setForm({ title: post.title, excerpt: post.excerpt, content: post.content, status: post.status, metaTitle: '', metaDesc: '', image: '' }); setShowForm(true); }}
                                            className="p-1.5 rounded-lg hover:bg-brand-accent/10 text-brand-muted hover:text-brand-accent transition-all">
                                            <Edit size={14} />
                                        </button>
                                        <button onClick={() => handleDelete(post.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-brand-muted hover:text-red-400 transition-all">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
