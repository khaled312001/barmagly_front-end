'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, ...props }, ref) => (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-brand-muted mb-2">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                className={cn(
                    'w-full px-4 py-3 bg-brand-surface/50 border border-brand-glass-border rounded-xl text-brand-text placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-accent/50 focus:ring-2 focus:ring-brand-accent/20 transition-all duration-300',
                    error && 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20',
                    className
                )}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
        </div>
    )
);

Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, className, ...props }, ref) => (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-brand-muted mb-2">
                    {label}
                </label>
            )}
            <textarea
                ref={ref}
                className={cn(
                    'w-full px-4 py-3 bg-brand-surface/50 border border-brand-glass-border rounded-xl text-brand-text placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-accent/50 focus:ring-2 focus:ring-brand-accent/20 transition-all duration-300 min-h-[120px] resize-y',
                    error && 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20',
                    className
                )}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
        </div>
    )
);

Textarea.displayName = 'Textarea';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, className, ...props }, ref) => (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-brand-muted mb-2">
                    {label}
                </label>
            )}
            <select
                ref={ref}
                className={cn(
                    'w-full px-4 py-3 bg-brand-surface/50 border border-brand-glass-border rounded-xl text-brand-text focus:outline-none focus:border-brand-accent/50 focus:ring-2 focus:ring-brand-accent/20 transition-all duration-300',
                    error && 'border-red-500/50',
                    className
                )}
                {...props}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-brand-surface text-brand-text">
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
        </div>
    )
);

Select.displayName = 'Select';
