'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { publicApi } from '@/lib/api';

export interface SiteSettings {
    companyName?: string;
    email?: string;
    phone?: string;
    address?: string;
    whatsappNumber?: string;
    license?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    [key: string]: string | undefined;
}

interface SiteContextType {
    settings: SiteSettings;
    loading: boolean;
}

const SiteContext = createContext<SiteContextType>({ settings: {}, loading: true });

export const SiteProvider = ({ children }: { children: ReactNode }) => {
    const [settings, setSettings] = useState<SiteSettings>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await publicApi.getSettings();
                setSettings(data);
            } catch (error) {
                console.error('Failed to fetch site settings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    return (
        <SiteContext.Provider value={{ settings, loading }}>
            {children}
        </SiteContext.Provider>
    );
};

export const useSiteSettings = () => useContext(SiteContext);
