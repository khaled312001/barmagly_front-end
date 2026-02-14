'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';
import Image from 'next/image';

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
    className?: string;
}

export function ImageUpload({ value, onChange, label = "Upload Image", className }: ImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const { showToast } = useToast();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const { data } = await adminApi.createMedia(formData);
            onChange(data.url);
            showToast('Image uploaded successfully', 'success');
        } catch (error) {
            console.error('Upload failed:', error);
            showToast('Failed to upload image', 'error');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleRemove = () => {
        onChange('');
    };

    return (
        <div className={cn("space-y-2", className)}>
            {label && <label className="block text-sm font-medium text-brand-muted">{label}</label>}

            <div className="relative">
                {value ? (
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 group">
                        <Image src={value} alt="Preview" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                                type="button"
                                variant="danger"
                                size="sm"
                                icon={<X size={16} />}
                                onClick={handleRemove}
                            >
                                Remove
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-brand-accent/50 hover:bg-brand-accent/5 transition-all group"
                    >
                        {uploading ? (
                            <Loader2 className="w-8 h-8 text-brand-accent animate-spin mb-2" />
                        ) : (
                            <Upload className="w-8 h-8 text-brand-muted group-hover:text-brand-accent mb-2 transition-colors" />
                        )}
                        <span className="text-sm text-brand-muted group-hover:text-brand-text transition-colors">
                            {uploading ? 'Uploading...' : 'Click to upload image'}
                        </span>
                    </div>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                />
            </div>
        </div>
    );
}
