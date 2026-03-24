import { Head } from '@inertiajs/react';
import { Users, Clock, CheckCircle } from 'lucide-react';
import { Card } from '@/components/core/card';
import { AdminLayout } from '@/layouts/admin-layout';

type Props = {
    stats: {
        total: number;
        pending: number;
        active: number;
    };
};

export default function AdminDashboard({ stats }: Props) {
    return (
        <AdminLayout>
            <Head title="Admin — BuzzyHive 2.0" />

            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-bold text-amber-900 mb-1">Overview</h3>
                    <p className="text-sm text-amber-900/50">Manage beekeepers and monitor account status.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card className="flex items-center gap-4">
                        <div className="bg-yellow-100 p-3 rounded-2xl">
                            <Users className="w-5 h-5 text-yellow-700" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-amber-950">{stats.total}</p>
                            <p className="text-xs font-bold uppercase tracking-widest text-amber-900/50">Total Beekeepers</p>
                        </div>
                    </Card>

                    <Card className="flex items-center gap-4">
                        <div className="bg-amber-100 p-3 rounded-2xl">
                            <Clock className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-amber-950">{stats.pending}</p>
                            <p className="text-xs font-bold uppercase tracking-widest text-amber-900/50">Pending Invites</p>
                        </div>
                    </Card>

                    <Card className="flex items-center gap-4">
                        <div className="bg-emerald-100 p-3 rounded-2xl">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-amber-950">{stats.active}</p>
                            <p className="text-xs font-bold uppercase tracking-widest text-amber-900/50">Active Accounts</p>
                        </div>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
