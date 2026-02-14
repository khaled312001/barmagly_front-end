'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, Trash2, Check, Copy, Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

interface MediaItem {
    id: string;
    filename: string;
    url: string;
    mimetype: string;
    size: number;
    createdAt: string;
}

export function MediaManager({ onSelect }: { onSelect?: (url: string) => void }) {
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const fetchMedia = useCallback(async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || ''}/admin/media`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMedia(res.data);
        } catch (error) {
            console.error('Failed to fetch media:', error);
            toast.error('Failed to load media library');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMedia();
    }, [fetchMedia]);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setUploading(true);
        const formData = new FormData();

        // Upload one by one or all at once? The backend expects single file
        // We'll just loop and upload individually for now
        for (const file of acceptedFiles) {
            formData.append('file', file);
            try {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL || ''}/admin/media`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                toast.success(`Uploaded ${file.name}`);
            } catch (error) {
                console.error('Upload failed:', error);
                toast.error(`Failed to upload ${file.name}`);
            }
        }

        setUploading(false);
        fetchMedia();
    }, [fetchMedia]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] }
    });

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this file?')) return;

        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL || ''}/admin/media/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMedia(media.filter(item => item.id !== id));
            toast.success('File deleted');
        } catch (error) {
            console.error('Delete failed:', error);
            toast.error('Failed to delete file');
        }
    };

    const handleCopyUrl = (url: string) => {
        navigator.clipboard.writeText(url);
        toast.success('URL copied to clipboard');
    };

    return (
        <div className="space-y-6">
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-brand-accent bg-brand-accent/5' : 'border-brand-muted/20 hover:border-brand-accent/50'
                    }`}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-3 text-brand-muted">
                    <div className="p-4 rounded-full bg-brand-surface border border-brand-border">
                        {uploading ? <Loader2 className="animate-spin" size={24} /> : <Upload size={24} />}
                    </div>
                    {isDragActive ? (
                        <p className="text-brand-accent font-medium">Drop the files here...</p>
                    ) : (
                        <div>
                            <p className="font-medium text-brand-text">Click to upload or drag and drop</p>
                            <p className="text-sm mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="aspect-square rounded-xl bg-brand-surface animate-pulse" />
                    ))
                ) : media.map((item) => (
                    <div key={item.id} className="group relative aspect-square rounded-xl bg-brand-surface border border-brand-border overflow-hidden">
                        {item.mimetype.startsWith('image/') ? (
                            <Image
                                src={`${(process.env.NEXT_PUBLIC_API_URL || '').replace('/api', '')}${item.url}`}
                                alt={item.filename}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-brand-muted">
                                <ImageIcon size={32} />
                            </div>
                        )}

                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                            {onSelect ? (
                                <Button size="sm" onClick={() => onSelect(`${(process.env.NEXT_PUBLIC_API_URL || '').replace('/api', '')}${item.url}`)}>
                                    <Check size={16} className="mr-1" /> Select
                                </Button>
                            ) : (
                                <>
                                    <Button size="sm" variant="outline" onClick={() => handleCopyUrl(`${(process.env.NEXT_PUBLIC_API_URL || '').replace('/api', '')}${item.url}`)}>
                                        <Copy size={16} />
                                    </Button>
                                    <Button size="sm" variant="danger" onClick={() => handleDelete(item.id)}>
                                        <Trash2 size={16} />
                                    </Button>
                                </>
                            )}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/80 text-xs text-white truncate">
                            {item.filename}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
