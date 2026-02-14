import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// ============ PUBLIC API ============

export const publicApi = {
    getServices: () => axios.get(`${API_URL}/services`),
    getService: (slug: string) => axios.get(`${API_URL}/services/${slug}`),
    getPortfolio: (category?: string) => axios.get(`${API_URL}/portfolio`, { params: { category } }),
    getProject: (slug: string) => axios.get(`${API_URL}/portfolio/${slug}`),
    getBlog: (params?: Record<string, string>) => axios.get(`${API_URL}/blog`, { params }),
    getPost: (slug: string) => axios.get(`${API_URL}/blog/${slug}`),
    getBlogCategories: () => axios.get(`${API_URL}/blog/categories`),
    getBlogTags: () => axios.get(`${API_URL}/blog/tags`),
    getTestimonials: () => axios.get(`${API_URL}/testimonials`),
    getTeam: () => axios.get(`${API_URL}/team`),
    getFaq: () => axios.get(`${API_URL}/faq`),
    getSettings: () => axios.get(`${API_URL}/settings`),
    getSeo: (page: string) => axios.get(`${API_URL}/seo/${page}`),
    submitLead: (data: any) => axios.post(`${API_URL}/leads`, data),
    subscribe: (email: string) => axios.post(`${API_URL}/newsletter`, { email }),
    getPageSections: (page: string) => axios.get(`${API_URL}/pages/${page}`),
};

// ============ AUTH API ============

function createAuthClient(): AxiosInstance {
    const client = axios.create({ baseURL: API_URL });

    client.interceptors.request.use((config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    });

    client.interceptors.response.use(
        (response) => response,
        async (error) => {
            const original = error.config;
            if (error.response?.status === 401 && !original._retry) {
                original._retry = true;
                try {
                    const refreshToken = localStorage.getItem('refreshToken');
                    if (refreshToken) {
                        const { data } = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
                        localStorage.setItem('accessToken', data.accessToken);
                        localStorage.setItem('refreshToken', data.refreshToken);
                        original.headers.Authorization = `Bearer ${data.accessToken}`;
                        return client(original);
                    }
                } catch {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    if (typeof window !== 'undefined') window.location.reload();
                }
            }
            return Promise.reject(error);
        }
    );

    return client;
}

const authClient = createAuthClient();

export const adminApi = {
    // Auth
    login: (data: { email: string; password: string }) => axios.post(`${API_URL}/auth/login`, data),
    getProfile: () => authClient.get('/auth/profile'),

    // Dashboard
    getStats: () => authClient.get('/admin/stats'),

    // Services
    getServices: () => authClient.get('/admin/services'),
    createService: (data: any) => authClient.post('/admin/services', data),
    updateService: (id: string, data: any) => authClient.put(`/admin/services/${id}`, data),
    deleteService: (id: string) => authClient.delete(`/admin/services/${id}`),

    // Portfolio
    getPortfolio: () => authClient.get('/admin/portfolio'),
    createProject: (data: any) => authClient.post('/admin/portfolio', data),
    updateProject: (id: string, data: any) => authClient.put(`/admin/portfolio/${id}`, data),
    deleteProject: (id: string) => authClient.delete(`/admin/portfolio/${id}`),

    // Blog
    getBlog: () => authClient.get('/admin/blog'),
    createPost: (data: any) => authClient.post('/admin/blog', data),
    updatePost: (id: string, data: any) => authClient.put(`/admin/blog/${id}`, data),
    deletePost: (id: string) => authClient.delete(`/admin/blog/${id}`),

    // Testimonials
    getTestimonials: () => authClient.get('/admin/testimonials'),
    createTestimonial: (data: any) => authClient.post('/admin/testimonials', data),
    updateTestimonial: (id: string, data: any) => authClient.put(`/admin/testimonials/${id}`, data),
    deleteTestimonial: (id: string) => authClient.delete(`/admin/testimonials/${id}`),

    // Team
    getTeam: () => authClient.get('/admin/team'),
    createMember: (data: any) => authClient.post('/admin/team', data),
    updateMember: (id: string, data: any) => authClient.put(`/admin/team/${id}`, data),
    deleteMember: (id: string) => authClient.delete(`/admin/team/${id}`),

    // FAQ
    getFaq: () => authClient.get('/admin/faq'),
    createFaq: (data: any) => authClient.post('/admin/faq', data),
    updateFaq: (id: string, data: any) => authClient.put(`/admin/faq/${id}`, data),
    deleteFaq: (id: string) => authClient.delete(`/admin/faq/${id}`),

    // Leads
    getLeads: (params?: Record<string, string>) => authClient.get('/admin/leads', { params }),
    updateLeadStatus: (id: string, status: string) => authClient.patch(`/admin/leads/${id}`, { status }),
    exportLeads: () => authClient.get('/admin/leads/export', { responseType: 'blob' }),

    // Newsletter
    getSubscribers: () => authClient.get('/admin/newsletter'),

    // SEO
    getSeo: () => authClient.get('/admin/seo'),
    updateSeo: (id: string, data: any) => authClient.put(`/admin/seo/${id}`, data),

    // Settings
    getSettings: () => authClient.get('/admin/settings'),
    updateSettings: (data: any) => authClient.put('/admin/settings', data),

    // Media
    getMedia: () => authClient.get('/admin/media'),
    createMedia: (formData: FormData) => authClient.post('/admin/media', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),
    deleteMedia: (id: string) => authClient.delete(`/admin/media/${id}`),

    // Pages
    getPageSections: (page: string) => authClient.get(`/admin/pages/${page}`),
    updatePageSection: (page: string, section: string, data: any) => authClient.post(`/admin/pages/${page}/sections/${section}`, data),
};

export const systemApi = {
    getHealth: () => axios.get(`${API_URL}/system/health`),
    getStatus: () => authClient.get('/system/status'),
    runRepair: () => authClient.post('/system/repair'),
};
