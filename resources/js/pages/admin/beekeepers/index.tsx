import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { MoreVertical, Plus, RefreshCw, Power, Eye, Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/core/button';
import { Card } from '@/components/core/card';
import { Dropdown } from '@/components/core/dropdown';
import { Alert } from '@/components/core/feedback';
import { Input } from '@/components/core/input';
import { Modal } from '@/components/core/modal';
import { AdminLayout } from '@/layouts/admin-layout';
import type { PaginatedUsers, User } from '@/types';

type Props = {
    beekeepers: PaginatedUsers;
    stats: { total: number; pending: number; active: number };
};

type ActiveModal =
    | { type: 'create' }
    | { type: 'view'; user: User }
    | { type: 'edit'; user: User }
    | { type: 'toggle'; user: User }
    | { type: 'resend'; user: User }
    | { type: 'delete'; user: User }
    | null;

function StatusBadge({ status }: { status: string }) {
    if (status === 'pending') {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                Pending
            </span>
        );
    }
    if (status === 'active') {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                Active
            </span>
        );
    }
    return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-500">
            Deactivated
        </span>
    );
}

export default function BeekeepersIndex({ beekeepers, stats }: Props) {
    const { props } = usePage<{ flash?: { success?: string; error?: string } }>();
    const flash = props.flash;

    const [activeModal, setActiveModal] = useState<ActiveModal>(null);
    const close = () => setActiveModal(null);

    // Create form
    const createForm = useForm({ name: '', email: '', phone: '' });

    // Edit form
    const editForm = useForm({ name: '', email: '', phone: '' });

    const openEdit = (user: User) => {
        editForm.setData({ name: user.name, email: user.email, phone: user.phone ?? '' });
        setActiveModal({ type: 'edit', user });
    };

    const submitCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post(route('admin.beekeepers.store'), {
            onSuccess: () => { createForm.reset(); close(); },
        });
    };

    const submitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (activeModal?.type !== 'edit') return;
        editForm.patch(route('admin.beekeepers.update', { user: activeModal.user.id }), {
            onSuccess: () => close(),
        });
    };

    const confirmToggle = () => {
        if (activeModal?.type !== 'toggle') return;
        router.patch(route('admin.beekeepers.toggle-status', { user: activeModal.user.id }), {}, {
            onSuccess: () => close(),
        });
    };

    const confirmResend = () => {
        if (activeModal?.type !== 'resend') return;
        router.post(route('admin.beekeepers.resend-invite', { user: activeModal.user.id }), {}, {
            onSuccess: () => close(),
        });
    };

    const confirmDelete = () => {
        if (activeModal?.type !== 'delete') return;
        router.delete(route('admin.beekeepers.destroy', { user: activeModal.user.id }), {
            onSuccess: () => close(),
        });
    };

    return (
        <AdminLayout>
            <Head title="Beekeepers — Admin" />

            <div className="space-y-6">

                {/* Flash messages */}
                {flash?.success && <Alert variant="success">{flash.success}</Alert>}
                {flash?.error && <Alert variant="error">{flash.error}</Alert>}

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-amber-900">Beekeepers</h3>
                        <p className="text-sm text-amber-900/50">{stats.total} total · {stats.pending} pending · {stats.active} active</p>
                    </div>
                    <Button variant="primary" size="sm" onClick={() => setActiveModal({ type: 'create' })}>
                        <Plus className="w-4 h-4 mr-1" />
                        Add Beekeeper
                    </Button>
                </div>

                {/* Table */}
                <Card className="overflow-hidden p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-yellow-50/50 border-b border-yellow-100">
                                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-amber-900/50">Name</th>
                                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-amber-900/50">Email</th>
                                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-amber-900/50 hidden md:table-cell">Phone</th>
                                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-amber-900/50">Status</th>
                                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-amber-900/50 hidden lg:table-cell">Joined</th>
                                    <th className="px-6 py-3" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-yellow-50">
                                {beekeepers.data.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-10 text-center text-amber-900/40 text-sm">
                                            No beekeepers yet. Add one to get started.
                                        </td>
                                    </tr>
                                )}
                                {beekeepers.data.map((user) => (
                                    <tr key={user.id} className="hover:bg-yellow-50/30 transition-colors">
                                        <td className="px-6 py-4 font-medium text-amber-950">{user.name}</td>
                                        <td className="px-6 py-4 text-amber-900/70">{user.email}</td>
                                        <td className="px-6 py-4 text-amber-900/70 hidden md:table-cell">{user.phone ?? '—'}</td>
                                        <td className="px-6 py-4"><StatusBadge status={user.status ?? 'active'} /></td>
                                        <td className="px-6 py-4 text-amber-900/50 hidden lg:table-cell">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Dropdown
                                                align="right"
                                                trigger={
                                                    <button className="p-1.5 hover:bg-yellow-100 rounded-xl transition-colors">
                                                        <MoreVertical className="w-4 h-4 text-amber-900/50" />
                                                    </button>
                                                }
                                                items={[
                                                    {
                                                        id: 'view',
                                                        label: 'View Details',
                                                        icon: <Eye className="w-4 h-4" />,
                                                        onClick: () => setActiveModal({ type: 'view', user }),
                                                    },
                                                    {
                                                        id: 'edit',
                                                        label: 'Edit',
                                                        icon: <Edit2 className="w-4 h-4" />,
                                                        onClick: () => openEdit(user),
                                                    },
                                                    ...(user.status === 'pending' ? [{
                                                        id: 'resend',
                                                        label: 'Resend Invite',
                                                        icon: <RefreshCw className="w-4 h-4" />,
                                                        onClick: () => setActiveModal({ type: 'resend', user }),
                                                    }] : []),
                                                    {
                                                        id: 'toggle',
                                                        label: user.status === 'active' ? 'Deactivate' : 'Reactivate',
                                                        icon: <Power className="w-4 h-4" />,
                                                        variant: user.status === 'active' ? 'danger' as const : 'default' as const,
                                                        onClick: () => setActiveModal({ type: 'toggle', user }),
                                                    },
                                                    {
                                                        id: 'delete',
                                                        label: 'Delete',
                                                        icon: <Trash2 className="w-4 h-4" />,
                                                        variant: 'danger' as const,
                                                        onClick: () => setActiveModal({ type: 'delete', user }),
                                                    },
                                                ]}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Pagination */}
                {beekeepers.last_page > 1 && (
                    <div className="flex items-center justify-center gap-1">
                        {beekeepers.links.map((link, i) => (
                            link.url ? (
                                <Link
                                    key={i}
                                    href={link.url}
                                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                                        link.active
                                            ? 'bg-amber-500 text-white font-semibold'
                                            : 'text-amber-900/70 hover:bg-yellow-100'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ) : (
                                <span
                                    key={i}
                                    className="px-3 py-1.5 text-sm text-amber-900/30"
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            )
                        ))}
                    </div>
                )}
            </div>

            {/* ── Create Modal ───────────────────────────────────────── */}
            <Modal isOpen={activeModal?.type === 'create'} onClose={close} title="Add Beekeeper" maxWidth="md">
                <form onSubmit={submitCreate} className="space-y-4">
                    <Input
                        label="Name"
                        value={createForm.data.name}
                        onChange={(e) => createForm.setData('name', e.target.value)}
                        placeholder="Full name"
                        autoFocus
                        error={createForm.errors.name}
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={createForm.data.email}
                        onChange={(e) => createForm.setData('email', e.target.value)}
                        placeholder="email@example.com"
                        error={createForm.errors.email}
                    />
                    <Input
                        label="Phone (optional)"
                        type="tel"
                        value={createForm.data.phone}
                        onChange={(e) => createForm.setData('phone', e.target.value)}
                        placeholder="+60 12-345 6789"
                        error={createForm.errors.phone}
                    />
                    <div className="flex gap-3 pt-2">
                        <Button type="button" variant="ghost" onClick={close} className="flex-1">Cancel</Button>
                        <Button type="submit" variant="primary" disabled={createForm.processing} className="flex-1">
                            {createForm.processing ? 'Sending...' : 'Send Invite'}
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* ── View Modal ─────────────────────────────────────────── */}
            {activeModal?.type === 'view' && (
                <Modal isOpen onClose={close} title="Beekeeper Details" maxWidth="lg">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-amber-900/40 mb-1">Name</p>
                                <p className="font-medium text-amber-950">{activeModal.user.name}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-amber-900/40 mb-1">Status</p>
                                <StatusBadge status={activeModal.user.status ?? 'active'} />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-amber-900/40 mb-1">Email</p>
                                <p className="font-medium text-amber-950">{activeModal.user.email}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-amber-900/40 mb-1">Phone</p>
                                <p className="font-medium text-amber-950">{activeModal.user.phone ?? '—'}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-amber-900/40 mb-1">Member Since</p>
                                <p className="font-medium text-amber-950">{new Date(activeModal.user.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <Button type="button" variant="ghost" onClick={close} className="flex-1">Close</Button>
                            <Button type="button" variant="outline" onClick={() => openEdit(activeModal.user)} className="flex-1">Edit</Button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* ── Edit Modal ─────────────────────────────────────────── */}
            {activeModal?.type === 'edit' && (
                <Modal isOpen onClose={close} title="Edit Beekeeper" maxWidth="md">
                    <form onSubmit={submitEdit} className="space-y-4">
                        <Input
                            label="Name"
                            value={editForm.data.name}
                            onChange={(e) => editForm.setData('name', e.target.value)}
                            autoFocus
                            error={editForm.errors.name}
                        />
                        <Input
                            label="Email"
                            type="email"
                            value={editForm.data.email}
                            onChange={(e) => editForm.setData('email', e.target.value)}
                            error={editForm.errors.email}
                        />
                        <Input
                            label="Phone (optional)"
                            type="tel"
                            value={editForm.data.phone}
                            onChange={(e) => editForm.setData('phone', e.target.value)}
                            error={editForm.errors.phone}
                        />
                        <div className="flex gap-3 pt-2">
                            <Button type="button" variant="ghost" onClick={close} className="flex-1">Cancel</Button>
                            <Button type="submit" variant="primary" disabled={editForm.processing} className="flex-1">
                                {editForm.processing ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </form>
                </Modal>
            )}

            {/* ── Toggle Status Confirmation Modal ───────────────────── */}
            {activeModal?.type === 'toggle' && (
                <Modal
                    isOpen
                    onClose={close}
                    title={activeModal.user.status === 'active' ? 'Deactivate Beekeeper' : 'Reactivate Beekeeper'}
                    maxWidth="sm"
                >
                    <div className="space-y-4">
                        <p className="text-sm text-amber-900/70">
                            {activeModal.user.status === 'active'
                                ? `Deactivating ${activeModal.user.name} will prevent them from logging in. You can reactivate them at any time.`
                                : `Reactivating ${activeModal.user.name} will restore their access to BuzzyHive.`}
                        </p>
                        <div className="flex gap-3">
                            <Button type="button" variant="ghost" onClick={close} className="flex-1">Cancel</Button>
                            <Button
                                type="button"
                                variant={activeModal.user.status === 'active' ? 'destructive' : 'primary'}
                                onClick={confirmToggle}
                                className="flex-1"
                            >
                                {activeModal.user.status === 'active' ? 'Deactivate' : 'Reactivate'}
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* ── Delete Confirmation Modal ───────────────────────────── */}
            {activeModal?.type === 'delete' && (
                <Modal isOpen onClose={close} title="Delete Beekeeper" maxWidth="sm">
                    <div className="space-y-4">
                        <p className="text-sm text-amber-900/70">
                            Are you sure you want to delete <span className="font-semibold text-amber-950">{activeModal.user.name}</span>? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <Button type="button" variant="ghost" onClick={close} className="flex-1">Cancel</Button>
                            <Button type="button" variant="destructive" onClick={confirmDelete} className="flex-1">
                                Delete
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* ── Resend Invite Confirmation Modal ───────────────────── */}
            {activeModal?.type === 'resend' && (
                <Modal isOpen onClose={close} title="Resend Invite" maxWidth="sm">
                    <div className="space-y-4">
                        <p className="text-sm text-amber-900/70">
                            A new invite email will be sent to <span className="font-semibold text-amber-950">{activeModal.user.email}</span>. The previous link will be replaced.
                        </p>
                        <div className="flex gap-3">
                            <Button type="button" variant="ghost" onClick={close} className="flex-1">Cancel</Button>
                            <Button type="button" variant="primary" onClick={confirmResend} className="flex-1">
                                Resend
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </AdminLayout>
    );
}
