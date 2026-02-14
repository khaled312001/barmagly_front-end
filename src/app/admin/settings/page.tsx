'use client';

import React, { useEffect, useState } from 'react';
import { Save, ShieldCheck, Mail, Share2, Building2, Globe } from 'lucide-react';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/FormElements';
import { useToast } from '@/components/ui/Toast';
import { motion } from 'framer-motion';

interface Setting {
    id: string;
    key: string;
    value: string;
}

const settingLabels: Record<string, string> = {
    companyName: 'Company Name',
    whatsappNumber: 'WhatsApp Number',
    email: 'Email Address',
    phone: 'Phone Number',
    address: 'Company Address',
    license: 'Swiss License Number',
    facebook: 'Facebook URL',
    instagram: 'Instagram URL',
    linkedin: 'LinkedIn URL',
    twitter: 'Twitter / X URL',
    smtpHost: 'SMTP Host',
    smtpPort: 'SMTP Port',
    smtpUser: 'SMTP Username',
    smtpPass: 'SMTP Password',
};

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const { showToast } = useToast();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await adminApi.getSettings();
                const result: Record<string, string> = {};
                if (Array.isArray(data)) {
                    data.forEach((s: Setting) => { result[s.key] = s.value; });
                }
                setSettings(result);
            } catch (e) { console.error(e); }
            finally { setLoading(false); }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const updates = Object.entries(settings).map(([key, value]) => ({ key, value }));
            await adminApi.updateSettings(updates);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (e) { console.error(e); }
        finally { setSaving(false); }
    };

    const updateSetting = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="skeleton h-8 w-48 rounded" />
                {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-16 rounded-2xl" />)}
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-3xl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-display font-bold text-brand-text">Site Settings</h2>
                    <p className="text-brand-muted text-sm">Manage company info, social links, and SMTP.</p>
                </div>
                <Button variant="primary" size="sm" icon={<Save size={16} />} onClick={handleSave} isLoading={saving}>
                    {saved ? 'Saved ✓' : 'Save Changes'}
                </Button>
            </div>

            {/* Company Info */}
            <div className="glass-card p-6 space-y-4">
                <h3 className="text-lg font-display font-semibold text-brand-text border-b border-brand-glass-border pb-3">Company Information</h3>
                {['companyName', 'email', 'phone', 'whatsappNumber', 'address', 'license'].map((key) => (
                    <Input
                        key={key}
                        label={settingLabels[key] || key}
                        value={settings[key] || ''}
                        onChange={(e) => updateSetting(key, e.target.value)}
                    />
                ))}
            </div>

            {/* Social Links */}
            <div className="glass-card p-6 space-y-4">
                <h3 className="text-lg font-display font-semibold text-brand-text border-b border-brand-glass-border pb-3">Social Media</h3>
                {['facebook', 'instagram', 'linkedin', 'twitter'].map((key) => (
                    <Input
                        key={key}
                        label={settingLabels[key] || key}
                        value={settings[key] || ''}
                        onChange={(e) => updateSetting(key, e.target.value)}
                        placeholder={`https://${key}.com/...`}
                    />
                ))}
            </div>

            {/* SMTP */}
            <div className="glass-card p-6 space-y-4">
                <h3 className="text-lg font-display font-semibold text-brand-text border-b border-brand-glass-border pb-3">SMTP / Email Settings</h3>
                {['smtpHost', 'smtpPort', 'smtpUser', 'smtpPass'].map((key) => (
                    <Input
                        key={key}
                        label={settingLabels[key] || key}
                        type={key === 'smtpPass' ? 'password' : 'text'}
                        value={settings[key] || ''}
                        onChange={(e) => updateSetting(key, e.target.value)}
                    />
                ))}
            </div>
        </div>
    );
}
