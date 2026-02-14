'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Filter, Download, Eye, ChevronLeft, ChevronRight, MessageSquare, Info, Trash2, CheckCircle } from 'lucide-react';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
    service: string | null;
    message: string;
    status: string;
    createdAt: string;
}

const statusColors: Record<string, string> = {
    NEW: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    CONTACTED: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    IN_PROGRESS: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    CONVERTED: 'bg-green-500/10 text-green-400 border-green-500/20',
    CLOSED: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const { showToast } = useToast();

    const fetchLeads = useCallback(async () => {
        setLoading(true);
        try {
            const params: Record<string, string> = { page: String(page), limit: '20' };
            if (filter) params.status = filter;
            const { data } = await adminApi.getLeads(params);
            setLeads(data.leads);
            setTotal(data.pagination.total);
        } catch (error) {
            console.error('Failed to fetch leads:', error);
        } finally {
            setLoading(false);
        }
    }, [page, filter]);

    useEffect(() => {
        fetchLeads();
    }, [fetchLeads]);

    const updateStatus = async (id: string, status: string) => {
        try {
            await adminApi.updateLeadStatus(id, status);
            showToast('Lead status updated', 'success');
            fetchLeads();
        } catch (error) {
            console.error('Failed to update status:', error);
            showToast('Failed to update status', 'error');
        }
    };

    const handleExport = async () => {
        try {
            const { data } = await adminApi.exportLeads();
            const url = window.URL.createObjectURL(new Blob([data]));
            const a = document.createElement('a');
            a.href = url;
            a.download = 'leads.csv';
            a.click();
        } catch (error) {
            console.error('Failed to export:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-display font-bold text-brand-text">Lead Management</h2>
                    <p className="text-brand-muted text-sm">View and manage contact form submissions.</p>
                </div>
                <Button variant="secondary" size="sm" icon={<Download size={16} />} onClick={handleExport}>
                    Export CSV
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
                {['', 'NEW', 'CONTACTED', 'IN_PROGRESS', 'CONVERTED', 'CLOSED'].map((status) => (
                    <button
                        key={status}
                        onClick={() => { setFilter(status); setPage(1); }}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === status
                            ? 'bg-brand-accent text-white'
                            : 'glass-card text-brand-muted hover:text-brand-text'
                            }`}
                    >
                        {status || 'All'}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-brand-glass-border">
                                <th className="text-left px-4 py-3 text-xs font-semibold text-brand-muted uppercase tracking-wider">Name</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-brand-muted uppercase tracking-wider">Email</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-brand-muted uppercase tracking-wider hidden md:table-cell">Service</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-brand-muted uppercase tracking-wider">Status</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-brand-muted uppercase tracking-wider hidden lg:table-cell">Date</th>
                                <th className="text-right px-4 py-3 text-xs font-semibold text-brand-muted uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="border-b border-brand-glass-border/50">
                                        <td colSpan={6} className="px-4 py-4"><div className="skeleton h-4 w-full rounded" /></td>
                                    </tr>
                                ))
                            ) : leads.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-12 text-brand-muted">No leads found.</td>
                                </tr>
                            ) : (
                                leads.map((lead) => (
                                    <tr key={lead.id} className="border-b border-brand-glass-border/50 hover:bg-white/[0.02] transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="text-sm font-medium text-brand-text">{lead.name}</div>
                                            {lead.company && <div className="text-xs text-brand-muted">{lead.company}</div>}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-brand-muted">{lead.email}</td>
                                        <td className="px-4 py-3 text-sm text-brand-muted hidden md:table-cell">{lead.service || '-'}</td>
                                        <td className="px-4 py-3">
                                            <select
                                                value={lead.status}
                                                onChange={(e) => updateStatus(lead.id, e.target.value)}
                                                className={`px-2 py-1 rounded-lg text-xs font-medium border bg-transparent ${statusColors[lead.status]} cursor-pointer`}
                                            >
                                                <option value="NEW">New</option>
                                                <option value="CONTACTED">Contacted</option>
                                                <option value="IN_PROGRESS">In Progress</option>
                                                <option value="CONVERTED">Converted</option>
                                                <option value="CLOSED">Closed</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-brand-muted hidden lg:table-cell">{formatDate(lead.createdAt)}</td>
                                        <td className="px-4 py-3 text-right">
                                            <button className="text-brand-muted hover:text-brand-accent transition-colors" title="View details">
                                                <Eye size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between text-sm text-brand-muted">
                <span>Showing {leads.length} of {total} leads</span>
                <div className="flex gap-2">
                    <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="p-2 rounded-lg glass-card disabled:opacity-50">
                        <ChevronLeft size={16} />
                    </button>
                    <button onClick={() => setPage(page + 1)} disabled={leads.length < 20} className="p-2 rounded-lg glass-card disabled:opacity-50">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
