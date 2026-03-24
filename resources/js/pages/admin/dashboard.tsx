import { Head } from '@inertiajs/react';
import { Users, Clock, CheckCircle, Bug as Bee, TrendingUp, AlertTriangle, Activity, Thermometer, Droplets, Wind } from 'lucide-react';
import { Card } from '@/components/core/card';
import { AdminLayout } from '@/layouts/admin-layout';

type Props = {
    stats: {
        total: number;
        pending: number;
        active: number;
    };
};

const recentActivity = [
    { beekeeper: 'Ahmad Razif', hive: 'Hive Alfa-1', event: 'Harvest completed', time: '2 hours ago', status: 'success' },
    { beekeeper: 'Nurul Ain',   hive: 'Hive Beta-3', event: 'High CO₂ alert triggered', time: '5 hours ago', status: 'warning' },
    { beekeeper: 'Zulhilmi',    hive: 'Hive Gamma-2', event: 'Weight threshold reached', time: '1 day ago', status: 'info' },
    { beekeeper: 'Siti Hajar',  hive: 'Hive Delta-1', event: 'Sensor offline', time: '1 day ago', status: 'danger' },
    { beekeeper: 'Ahmad Razif', hive: 'Hive Alfa-2', event: 'New hive registered', time: '2 days ago', status: 'info' },
];

const hiveOverview = [
    { id: 'H-001', beekeeper: 'Ahmad Razif',  species: 'Heterotrigona itama',       weight: 5.8, temp: 32.1, humidity: 71, co2: 420, readiness: 87, status: 'ready' },
    { id: 'H-002', beekeeper: 'Nurul Ain',    species: 'Tetragonula laeviceps',      weight: 3.2, temp: 31.4, humidity: 68, co2: 890, readiness: 42, status: 'alert' },
    { id: 'H-003', beekeeper: 'Zulhilmi',     species: 'Heterotrigona itama',        weight: 4.9, temp: 30.8, humidity: 74, co2: 510, readiness: 65, status: 'growing' },
    { id: 'H-004', beekeeper: 'Siti Hajar',   species: 'Tetragonula iridipennis',    weight: 2.1, temp: 0,    humidity: 0,  co2: 0,   readiness: 18, status: 'offline' },
];

const statusColors: Record<string, string> = {
    ready:   'bg-emerald-100 text-emerald-700',
    growing: 'bg-yellow-100 text-yellow-700',
    alert:   'bg-red-100 text-red-700',
    offline: 'bg-gray-100 text-gray-500',
};

const activityColors: Record<string, string> = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-400',
    info:    'bg-blue-400',
    danger:  'bg-red-500',
};

export default function AdminDashboard({ stats }: Props) {
    const totalHives   = hiveOverview.length;
    const readyHives   = hiveOverview.filter(h => h.status === 'ready').length;
    const alertHives   = hiveOverview.filter(h => h.status === 'alert' || h.status === 'offline').length;

    return (
        <AdminLayout>
            <Head title="Admin Dashboard — BuzzyHive 2.0" />

            <div className="space-y-8">

                {/* Header */}
                <div>
                    <h2 className="text-2xl font-black uppercase tracking-tighter text-amber-950">Platform Overview</h2>
                    <p className="text-sm text-amber-900/50 mt-1">Real-time monitoring across all registered beekeepers.</p>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="flex items-center gap-4">
                        <div className="bg-yellow-100 p-3 rounded-2xl shrink-0">
                            <Users className="w-5 h-5 text-yellow-700" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-amber-950">{stats.total}</p>
                            <p className="text-xs font-bold uppercase tracking-widest text-amber-900/50">Total Beekeepers</p>
                        </div>
                    </Card>

                    <Card className="flex items-center gap-4">
                        <div className="bg-amber-100 p-3 rounded-2xl shrink-0">
                            <Clock className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-amber-950">{stats.pending}</p>
                            <p className="text-xs font-bold uppercase tracking-widest text-amber-900/50">Pending Invites</p>
                        </div>
                    </Card>

                    <Card className="flex items-center gap-4">
                        <div className="bg-emerald-100 p-3 rounded-2xl shrink-0">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-amber-950">{stats.active}</p>
                            <p className="text-xs font-bold uppercase tracking-widest text-amber-900/50">Active Accounts</p>
                        </div>
                    </Card>

                    <Card className="flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-2xl shrink-0">
                            <Bee className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-amber-950">{totalHives}</p>
                            <p className="text-xs font-bold uppercase tracking-widest text-amber-900/50">Total Hives</p>
                        </div>
                    </Card>

                    <Card className="flex items-center gap-4">
                        <div className="bg-emerald-100 p-3 rounded-2xl shrink-0">
                            <TrendingUp className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-amber-950">{readyHives}</p>
                            <p className="text-xs font-bold uppercase tracking-widest text-amber-900/50">Ready to Harvest</p>
                        </div>
                    </Card>

                    <Card className="flex items-center gap-4">
                        <div className="bg-red-100 p-3 rounded-2xl shrink-0">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-amber-950">{alertHives}</p>
                            <p className="text-xs font-bold uppercase tracking-widest text-amber-900/50">Alerts / Offline</p>
                        </div>
                    </Card>
                </div>

                {/* Hive Monitor Table */}
                <Card>
                    <h3 className="text-sm font-black uppercase tracking-widest text-amber-900/60 mb-4">Live Hive Monitor</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-yellow-100">
                                    <th className="text-left py-2 px-3 text-xs font-bold uppercase tracking-widest text-amber-900/40">Hive</th>
                                    <th className="text-left py-2 px-3 text-xs font-bold uppercase tracking-widest text-amber-900/40">Beekeeper</th>
                                    <th className="text-left py-2 px-3 text-xs font-bold uppercase tracking-widest text-amber-900/40 hidden md:table-cell">Species</th>
                                    <th className="text-center py-2 px-3 text-xs font-bold uppercase tracking-widest text-amber-900/40">
                                        <Thermometer className="w-3 h-3 inline" /> Temp
                                    </th>
                                    <th className="text-center py-2 px-3 text-xs font-bold uppercase tracking-widest text-amber-900/40 hidden sm:table-cell">
                                        <Droplets className="w-3 h-3 inline" /> Humid
                                    </th>
                                    <th className="text-center py-2 px-3 text-xs font-bold uppercase tracking-widest text-amber-900/40 hidden sm:table-cell">
                                        <Wind className="w-3 h-3 inline" /> CO₂
                                    </th>
                                    <th className="text-center py-2 px-3 text-xs font-bold uppercase tracking-widest text-amber-900/40">Readiness</th>
                                    <th className="text-center py-2 px-3 text-xs font-bold uppercase tracking-widest text-amber-900/40">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hiveOverview.map((hive) => (
                                    <tr key={hive.id} className="border-b border-yellow-50 hover:bg-yellow-50/50 transition-colors">
                                        <td className="py-3 px-3 font-bold text-amber-900">{hive.id}</td>
                                        <td className="py-3 px-3 text-amber-800">{hive.beekeeper}</td>
                                        <td className="py-3 px-3 text-amber-700 italic hidden md:table-cell text-xs">{hive.species}</td>
                                        <td className="py-3 px-3 text-center text-amber-800">
                                            {hive.temp > 0 ? `${hive.temp}°C` : '—'}
                                        </td>
                                        <td className="py-3 px-3 text-center text-amber-800 hidden sm:table-cell">
                                            {hive.humidity > 0 ? `${hive.humidity}%` : '—'}
                                        </td>
                                        <td className="py-3 px-3 text-center hidden sm:table-cell">
                                            <span className={hive.co2 > 800 ? 'text-red-600 font-bold' : 'text-amber-800'}>
                                                {hive.co2 > 0 ? `${hive.co2} ppm` : '—'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-3 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-16 h-1.5 bg-yellow-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-yellow-400 rounded-full"
                                                        style={{ width: `${hive.readiness}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-bold text-amber-900">{hive.readiness}%</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-3 text-center">
                                            <span className={`px-2 py-1 rounded-lg text-xs font-bold capitalize ${statusColors[hive.status]}`}>
                                                {hive.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Recent Activity */}
                <Card>
                    <h3 className="text-sm font-black uppercase tracking-widest text-amber-900/60 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                        {recentActivity.map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${activityColors[item.status]}`} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-amber-900">
                                        <span className="font-semibold">{item.beekeeper}</span>
                                        {' · '}
                                        <span className="text-amber-700">{item.hive}</span>
                                    </p>
                                    <p className="text-xs text-amber-900/50">{item.event}</p>
                                </div>
                                <span className="text-xs text-amber-900/30 shrink-0">{item.time}</span>
                            </div>
                        ))}
                    </div>
                </Card>

            </div>
        </AdminLayout>
    );
}
