import { Head, router } from '@inertiajs/react';
import { Thermometer, Droplets, Flame, ChevronDown, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card } from '@/components/core/card';
import { AdminLayout } from '@/layouts/admin-layout';

// ── Types ───────────────────────────────────────────────────────────────
type Hive = { id: number; name: string };

type LatestReading = {
    temperature: number;
    humidity:    number;
    mq2:         number;
    recorded_at: string;
} | null;

type HistoryPoint = {
    time:        string;
    temperature: number;
    humidity:    number;
    mq2:         number;
};

type Props = {
    hives:    Hive[];
    selected: number;
    window:   '1h' | '6h' | '24h';
    latest:   LatestReading;
    history:  HistoryPoint[];
};

// ── ArcGauge ────────────────────────────────────────────────────────────
// Semicircular SVG gauge with filled arc + needle.
// Angle math: ratio 0 = left (180°), ratio 1 = right (0°), sweeping through top (90°).
function ArcGauge({ value, max, color }: { value: number; max: number; color: string }) {
    const cx        = 60;
    const cy        = 58;
    const radius    = 46;
    const arcLength = Math.PI * radius;
    const ratio     = Math.min(value / max, 1);
    const fill      = ratio * arcLength;

    const d = `M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`;

    // Needle — points from center toward the arc at the current ratio
    const angle  = Math.PI * (1 - ratio);
    const tipX   = cx + 38 * Math.cos(angle);
    const tipY   = cy - 38 * Math.sin(angle);
    const tailX  = cx - 7  * Math.cos(angle);
    const tailY  = cy + 7  * Math.sin(angle);

    return (
        <svg viewBox="0 0 120 65" className="w-full max-w-[180px] mx-auto">
            {/* Background arc */}
            <path d={d} fill="none" stroke="#FEF3C7" strokeWidth="7" strokeLinecap="round" />
            {/* Filled arc */}
            <path
                d={d}
                fill="none"
                stroke={color}
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={`${fill} ${arcLength}`}
            />
            {/* Needle */}
            <line
                x1={tailX} y1={tailY}
                x2={tipX}  y2={tipY}
                stroke="#78350F"
                strokeWidth="2"
                strokeLinecap="round"
            />
            {/* Pivot dot */}
            <circle cx={cx} cy={cy} r="4" fill="#78350F" />
            <circle cx={cx} cy={cy} r="2" fill="#FEF3C7" />
        </svg>
    );
}

// ── ProgressBar ──────────────────────────────────────────────────────────
function ProgressBar({ value, color }: { value: number; color: string }) {
    return (
        <div className="w-full h-3 bg-amber-100 rounded-full overflow-hidden my-4">
            <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(value, 100)}%`, backgroundColor: color }}
            />
        </div>
    );
}

// ── Color helpers ────────────────────────────────────────────────────────
function tempColor(t: number): string {
    if (t > 37) return '#EF4444'; // red
    if (t > 32) return '#F59E0B'; // amber
    return '#10B981';             // green
}

function humidColor(h: number): string {
    if (h > 85) return '#EF4444';
    if (h > 70) return '#F59E0B';
    return '#10B981';
}

function mq2Color(v: number): string {
    if (v > 2730) return '#EF4444';
    if (v > 1365) return '#F59E0B';
    return '#10B981';
}

// ── Shared LineChart style ────────────────────────────────────────────────
const AXIS_TICK = { fill: '#78350F', fontSize: 10, fontWeight: 600 };
const TOOLTIP_STYLE = {
    backgroundColor: '#FFFBEB',
    border: '1px solid #FEF3C7',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#78350F',
};

function SensorLine({ data, dataKey }: { data: HistoryPoint[]; dataKey: keyof HistoryPoint }) {
    return (
        <div className="h-[140px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#FEF3C7" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={AXIS_TICK} dy={8} interval="preserveStartEnd" />
                    <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK} width={32} />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    <Line type="monotone" dataKey={dataKey} stroke="#F59E0B" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

// ── HiveDropdown ─────────────────────────────────────────────────────────
function HiveDropdown({ hives, selected, onSelect }: {
    hives:    Hive[];
    selected: number;
    onSelect: (id: number) => void;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const selectedHive = hives.find(h => h.id === selected);

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(o => !o)}
                className="flex items-center gap-3 px-4 py-2.5 bg-white border border-yellow-200 rounded-xl text-sm font-semibold text-amber-900 hover:bg-yellow-50/50 transition-colors min-w-[180px] justify-between"
            >
                <span>{selectedHive?.name ?? 'Select hive'}</span>
                <ChevronDown className={`w-4 h-4 text-amber-900/40 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <div className="absolute top-full mt-2 left-0 z-20 w-full min-w-[180px] bg-white border border-yellow-100 rounded-2xl shadow-lg overflow-hidden">
                    {hives.map(h => (
                        <button
                            key={h.id}
                            onClick={() => { onSelect(h.id); setOpen(false); }}
                            className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-amber-900 hover:bg-yellow-50/60 transition-colors"
                        >
                            <span className={h.id === selected ? 'font-bold' : 'font-medium'}>{h.name}</span>
                            {h.id === selected && <Check className="w-3.5 h-3.5 text-amber-500" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── AdminSensors ─────────────────────────────────────────────────────────
export default function AdminSensors({ hives, selected, window, latest, history }: Props) {
    const navigate = (params: Record<string, string | number>) =>
        router.get(route('admin.sensors.index'), { hive_id: selected, window, ...params });

    const WINDOWS: ('1h' | '6h' | '24h')[] = ['1h', '6h', '24h'];

    return (
        <AdminLayout>
            <Head title="Sensor Readings — BuzzyHive 2.0" />

            <div className="space-y-6">

                {/* ── Controls ────────────────────────────────────── */}
                <div className="flex items-center justify-between flex-wrap gap-3">

                    {/* Hive selector */}
                    <HiveDropdown
                        hives={hives}
                        selected={selected}
                        onSelect={id => navigate({ hive_id: id })}
                    />

                    {/* Time window */}
                    <div className="flex gap-1 bg-yellow-100/50 rounded-2xl p-1.5">
                        {WINDOWS.map(w => (
                            <button
                                key={w}
                                onClick={() => navigate({ window: w })}
                                className={[
                                    'px-4 py-1.5 text-sm rounded-xl transition-all font-semibold',
                                    w === window
                                        ? 'bg-white shadow-sm text-amber-900'
                                        : 'text-amber-900/60 hover:bg-yellow-200/50',
                                ].join(' ')}
                            >
                                {w}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Sensor Cards ─────────────────────────────────── */}
                {hives.length === 0 ? (
                    <Card>
                        <p className="text-sm text-amber-900/50 text-center py-8">No hives found.</p>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Temperature */}
                        <Card className="flex flex-col">
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <div className="bg-amber-100 p-2 rounded-xl">
                                        <Thermometer className="w-4 h-4 text-amber-700" />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest text-amber-900/60">Temperature</span>
                                </div>
                                <span className="text-2xl font-black text-amber-950">
                                    {latest ? `${latest.temperature}°C` : '—'}
                                </span>
                            </div>
                            <ArcGauge
                                value={latest?.temperature ?? 0}
                                max={45}
                                color={latest ? tempColor(latest.temperature) : '#FEF3C7'}
                            />
                            <SensorLine data={history} dataKey="temperature" />
                        </Card>

                        {/* Humidity */}
                        <Card className="flex flex-col">
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <div className="bg-blue-50 p-2 rounded-xl">
                                        <Droplets className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest text-amber-900/60">Humidity</span>
                                </div>
                                <span className="text-2xl font-black text-amber-950">
                                    {latest ? `${latest.humidity}%` : '—'}
                                </span>
                            </div>
                            <ProgressBar
                                value={latest?.humidity ?? 0}
                                color={latest ? humidColor(latest.humidity) : '#FEF3C7'}
                            />
                            <SensorLine data={history} dataKey="humidity" />
                        </Card>

                        {/* MQ2 Gas */}
                        <Card className="flex flex-col">
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <div className="bg-red-50 p-2 rounded-xl">
                                        <Flame className="w-4 h-4 text-red-500" />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest text-amber-900/60">Gas (MQ2)</span>
                                </div>
                                <span className="text-2xl font-black text-amber-950">
                                    {latest ? `${latest.mq2}` : '—'}
                                </span>
                            </div>
                            <ArcGauge
                                value={latest?.mq2 ?? 0}
                                max={4095}
                                color={latest ? mq2Color(latest.mq2) : '#FEF3C7'}
                            />
                            <SensorLine data={history} dataKey="mq2" />
                        </Card>

                    </div>
                )}

                {/* ── Last updated ──────────────────────────────────── */}
                {latest && (
                    <p className="text-right text-xs text-amber-900/30 font-semibold uppercase tracking-widest">
                        Last reading: {latest.recorded_at}
                    </p>
                )}

            </div>
        </AdminLayout>
    );
}
