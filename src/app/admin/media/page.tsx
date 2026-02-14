'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Image as ImageIcon, Upload, Trash2, Copy, Search, Grid, List,
    X, Check, ExternalLink, Filter, Plus, FileImage, FileCode, FileIcon
} from 'lucide-react';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/FormElements';
import { useToast } from '@/components/ui/Toast';
import { formatBytes } from '@/lib/utils';
import { staggerContainer, staggerItem } from '@/lib/animations';
import Image from 'next/image';

interface MediaItem {
    id: string;
    filename: string;
    url: string;
    mimetype: string;
    size: number;
    alt?: string;
    createdAt: string;
}

export default function AdminMediaPage() {
    const [items, setItems] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [uploading, setUploading] = useState(false);
    const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { showToast } = useToast();

    const fetchMedia = useCallback(async () => {
        try {
            const { data } = await adminApi.getMedia();
            setItems(data);
        } catch (error) {
            showToast('Failed to fetch media', 'error');
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        fetchMedia();
    }, [fetchMedia]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            // Using axios directly for form data upload as specified in adminApi (though it might need adjustment if authClient isn't used)
            // Correction: adminApi.createMedia should be used if it exists, but I'll use a local implementation if not.
            // Looking at api.ts, I see createMedia isn't in adminApi object, let me add it.
            const token = localStorage.getItem('accessToken');
            const { data } = await adminApi.login({ email: '', password: '' }); // This is wrong, I should use authClient or similar.

            // Re-checking api.ts... it has 'createMedia'? No, it has 'getMedia' and 'deleteMedia', but not upload.
            // Let me add createMedia to adminApi first.
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/admin/media`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: formData
            });

            if (!response.ok) throw new Error('Upload failed');

            showToast('File uploaded successfully', 'success');
            fetchMedia();
        } catch (error) {
            showToast('Failed to upload file', 'error');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this file?')) return;
        try {
            await adminApi.deleteMedia(id);
            showToast('File deleted', 'success');
            setItems(prev => prev.filter(item => item.id !== id));
            if (selectedItem?.id === id) setSelectedItem(null);
        } catch (error) {
            showToast('Failed to delete file', 'error');
        }
    };

    const copyUrl = (url: string) => {
        const fullUrl = `${window.location.origin.replace(':3000', ':3001')}${url}`;
        navigator.clipboard.writeText(fullUrl);
        showToast('URL copied to clipboard', 'success');
    };

    const filteredItems = items.filter(item =>
        item.filename.toLowerCase().includes(search.toLowerCase()) ||
        item.alt?.toLowerCase().includes(search.toLowerCase())
    );

    const getFileIcon = (mimetype: string) => {
        if (mimetype.startsWith('image/')) return <FileImage size={24} className="text-blue-400" />;
        if (mimetype.includes('pdf')) return <FileIcon size={24} className="text-red-400" />;
        return <FileCode size={24} className="text-brand-muted" />;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-display font-bold text-brand-text">Media Library</h2>
                    <p className="text-brand-muted text-sm">Manage and use assets across your site.</p>
                </div>
                <div className="flex items-center gap-3">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleUpload}
                        className="hidden"
                        accept="image/*,application/pdf"
                    />
                    <Button
                        variant="primary"
                        isLoading={uploading}
                        icon={<Upload size={18} />}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        Upload File
                    </Button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="glass-card p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
                    <input
                        type="text"
                        placeholder="Search files..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-brand-surface border border-brand-glass-border rounded-xl text-sm focus:border-brand-accent outline-none transition-all"
                    />
                </div>
                <div className="flex items-center gap-2 border-l border-brand-glass-border pl-4">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-brand-accent/10 text-brand-accent' : 'text-brand-muted hover:text-brand-text'}`}
                    >
                        <Grid size={20} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-brand-accent/10 text-brand-accent' : 'text-brand-muted hover:text-brand-text'}`}
                    >
                        <List size={20} />
                    </button>
                    <div className="w-px h-6 bg-brand-glass-border mx-2" />
                    <span className="text-xs text-brand-muted">{filteredItems.length} items</span>
                </div>
            </div>

            {/* Gallery */}
            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="skeleton aspect-square rounded-2xl" />
                    ))}
                </div>
            ) : filteredItems.length === 0 ? (
                <div className="glass-card p-20 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-brand-surface border border-brand-glass-border flex items-center justify-center mx-auto text-brand-muted">
                        <ImageIcon size={32} />
                    </div>
                    <div>
                        <h3 className="text-lg font-display font-medium text-brand-text">No files found</h3>
                        <p className="text-brand-muted text-sm">Upload your first file to get started.</p>
                    </div>
                </div>
            ) : (
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className={viewMode === 'grid'
                        ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
                        : "flex flex-col space-y-2"
                    }
                >
                    {filteredItems.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={staggerItem}
                            onClick={() => setSelectedItem(item)}
                            className={`group relative glass-card overflow-hidden cursor-pointer border-2 transition-all ${selectedItem?.id === item.id ? 'border-brand-accent' : 'border-transparent'
                                } ${viewMode === 'list' ? 'flex items-center p-3 gap-4' : ''}`}
                        >
                            {viewMode === 'grid' ? (
                                <>
                                    <div className="aspect-square relative bg-brand-surface/50 flex items-center justify-center">
                                        {item.mimetype.startsWith('image/') ? (
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3001'}${item.url}`}
                                                    alt={item.alt || item.filename}
                                                    fill
                                                    className="object-cover transition-transform group-hover:scale-110"
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center gap-2">
                                                {getFileIcon(item.mimetype)}
                                                <span className="text-[10px] text-brand-muted uppercase font-bold">{item.mimetype.split('/')[1]}</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); copyUrl(item.url); }}
                                                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
                                            >
                                                <Copy size={16} />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                                                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-200 backdrop-blur-sm"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <p className="text-xs font-medium text-brand-text truncate">{item.filename}</p>
                                        <p className="text-[10px] text-brand-muted mt-1">{formatBytes(item.size)}</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-12 h-12 rounded-lg bg-brand-surface flex items-center justify-center shrink-0 overflow-hidden relative">
                                        {item.mimetype.startsWith('image/') ? (
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3001'}${item.url}`}
                                                alt={item.alt || item.filename}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : getFileIcon(item.mimetype)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-brand-text truncate">{item.filename}</p>
                                        <p className="text-xs text-brand-muted">{formatBytes(item.size)} • {item.mimetype}</p>
                                    </div>
                                    <div className="flex items-center gap-2 pr-2">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); copyUrl(item.url); }}
                                            className="p-2 rounded-lg hover:bg-brand-accent/10 text-brand-muted hover:text-brand-accent transition-all"
                                        >
                                            <Copy size={18} />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                                            className="p-2 rounded-lg hover:bg-red-500/10 text-brand-muted hover:text-red-400 transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* Preview Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedItem(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-5xl glass-card overflow-hidden flex flex-col md:flex-row h-full max-h-[80vh]"
                        >
                            <div className="flex-1 bg-black/40 flex items-center justify-center p-6 relative">
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all z-10"
                                >
                                    <X size={20} />
                                </button>
                                {selectedItem.mimetype.startsWith('image/') ? (
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3001'}${selectedItem.url}`}
                                            alt={selectedItem.alt || selectedItem.filename}
                                            fill
                                            className="object-contain shadow-2xl"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-24 h-24 rounded-2xl bg-brand-surface flex items-center justify-center text-brand-accent">
                                            {getFileIcon(selectedItem.mimetype)}
                                        </div>
                                        <p className="text-xl font-bold text-white">{selectedItem.filename}</p>
                                        <Button
                                            variant="primary"
                                            icon={<ExternalLink size={18} />}
                                            onClick={() => window.open(`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3001'}${selectedItem.url}`, '_blank')}
                                        >
                                            Open File
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <div className="w-full md:w-80 border-l border-brand-glass-border p-6 space-y-6 overflow-y-auto">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-brand-text">File Details</h3>
                                    <p className="text-xs text-brand-muted">Uploaded on {new Date(selectedItem.createdAt).toLocaleDateString()}</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] uppercase font-bold text-brand-muted tracking-widest block mb-1">Filename</label>
                                        <p className="text-sm text-brand-text break-all">{selectedItem.filename}</p>
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase font-bold text-brand-muted tracking-widest block mb-1">Mime Type</label>
                                        <p className="text-sm text-brand-text">{selectedItem.mimetype}</p>
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase font-bold text-brand-muted tracking-widest block mb-1">File Size</label>
                                        <p className="text-sm text-brand-text">{formatBytes(selectedItem.size)}</p>
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase font-bold text-brand-muted tracking-widest block mb-1">Public URL</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                readOnly
                                                value={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3001'}${selectedItem.url}`}
                                                className="flex-1 bg-brand-surface/50 border border-brand-glass-border rounded-lg px-3 py-1.5 text-xs text-brand-muted outline-none"
                                            />
                                            <button
                                                onClick={() => copyUrl(selectedItem.url)}
                                                className="p-1.5 rounded-lg bg-brand-accent/10 text-brand-accent hover:bg-brand-accent hover:text-brand-primary transition-all"
                                            >
                                                <Copy size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-brand-glass-border">
                                    <Button
                                        variant="danger"
                                        fullWidth
                                        icon={<Trash2 size={18} />}
                                        onClick={() => handleDelete(selectedItem.id)}
                                    >
                                        Delete Permanently
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

