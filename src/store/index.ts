import { create } from 'zustand';

// ============ AUTH STORE ============

interface User {
    id: string;
    email: string;
    name: string;
    role: 'ADMIN' | 'EDITOR' | 'SUPPORT';
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
    setLoading: (isLoading) => set({ isLoading }),
    logout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }
        set({ user: null, isAuthenticated: false });
    },
}));

// ============ UI STORE ============

interface UIState {
    isMobileMenuOpen: boolean;
    isContactModalOpen: boolean;
    toggleMobileMenu: () => void;
    setMobileMenu: (open: boolean) => void;
    setContactModal: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
    isMobileMenuOpen: false,
    isContactModalOpen: false,
    toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    setMobileMenu: (open) => set({ isMobileMenuOpen: open }),
    setContactModal: (open) => set({ isContactModalOpen: open }),
}));

// ============ SETTINGS STORE ============

interface SiteSettings {
    companyName: string;
    whatsappNumber: string;
    email: string;
    phone: string;
    address: string;
    socialLinks: Record<string, string>;
}

interface SettingsState {
    settings: SiteSettings | null;
    isLoaded: boolean;
    setSettings: (settings: SiteSettings) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
    settings: null,
    isLoaded: false,
    setSettings: (settings) => set({ settings, isLoaded: true }),
}));
