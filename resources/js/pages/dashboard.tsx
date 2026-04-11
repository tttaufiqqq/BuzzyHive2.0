import { Head } from '@inertiajs/react';
import { Bug as Bee, Plus, Activity, Weight, Calendar, MapPin, Info, Sparkles, Droplets, LayoutDashboard, History, Settings as SettingsIcon, BarChart3 } from 'lucide-react';
import { MoreVertical, Edit2, Trash2, Download, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import React from 'react';
import Markdown from 'react-markdown';
import { Button } from '@/components/core/button';
import { Card } from '@/components/core/card';
import { HiveChart, DataTable, Accordion } from '@/components/core/content';
import { Dropdown } from '@/components/core/dropdown';
import { Alert, Progress } from '@/components/core/feedback';
import { Input } from '@/components/core/input';
import { Modal } from '@/components/core/modal';
import { Tabs, Breadcrumbs } from '@/components/core/navigation';
import { AuthenticatedLayout } from '@/layouts/authenticated-layout';
import { cn } from '@/lib/utils';
import type { HiveData } from '@/types';

interface PredictionResult {
    readinessScore: number;
    estimatedHarvestDate: string;
    confidence: number;
    recommendations: string;
}

const chartData = [
    { name: 'Jan', value: 2.1 },
    { name: 'Feb', value: 2.4 },
    { name: 'Mar', value: 3.2 },
    { name: 'Apr', value: 3.8 },
    { name: 'May', value: 4.5 },
    { name: 'Jun', value: 5.2 },
];

function getDummyPrediction(hive: HiveData): PredictionResult {
    const score = Math.min(100, Math.round((hive.weightKg * 8) + (hive.ageMonths * 2) + (hive.activityLevel * 0.5)));
    const confidence = 0.75 + Math.random() * 0.2;
    const daysUntilHarvest = score > 80 ? 7 : score > 50 ? 30 : 60;
    const harvestDate = new Date();
    harvestDate.setDate(harvestDate.getDate() + daysUntilHarvest);

    return {
        readinessScore: Math.min(score, 100),
        estimatedHarvestDate: harvestDate.toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' }),
        confidence,
        recommendations: `
## Recommendations for ${hive.name}

**Current Status:** ${score > 80 ? '🟢 Ready for harvest' : score > 50 ? '🟡 Nearly ready' : '🔴 Still growing'}

### Key Observations
- The colony weight of **${hive.weightKg}kg** is ${hive.weightKg > 4 ? 'above' : 'below'} the recommended threshold of 4kg.
- Activity level of **${hive.activityLevel} bees/min** indicates a ${hive.activityLevel > 20 ? 'strong, healthy' : 'developing'} colony.
- At **${hive.ageMonths} months**, the hive is ${hive.ageMonths > 12 ? 'mature and well-established' : 'still in early development'}.

### Next Steps
${score > 80
            ? '1. Prepare harvesting equipment\n2. Schedule harvest within the next 7 days\n3. Ensure proper storage containers are ready'
            : score > 50
                ? '1. Monitor weight weekly\n2. Check entrance activity daily\n3. Expect harvest readiness in ~4 weeks'
                : '1. Allow colony to develop further\n2. Ensure adequate foraging area\n3. Check for any signs of disease or pests'
        }
    `.trim(),
    };
}

export default function Dashboard() {
    const [hives, setHives] = useState<HiveData[]>([
        { id: '1', name: 'Hive Alpha', species: 'Tetragonula iridipennis', ageMonths: 8, weightKg: 3.2, activityLevel: 15, location: 'Backyard Garden' },
        { id: '2', name: 'Golden Box', species: 'Heterotrigona itama', ageMonths: 14, weightKg: 5.8, activityLevel: 28, location: 'Orchard' },
    ]);

    const [activeTab, setActiveTab] = useState('overview');
    const [selectedHive, setSelectedHive] = useState<HiveData | null>(null);
    const [prediction, setPrediction] = useState<PredictionResult | null>(null);
    const [isPredicting, setIsPredicting] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const [newHive, setNewHive] = useState<Partial<HiveData>>({
        name: '',
        species: 'Heterotrigona itama',
        ageMonths: 0,
        weightKg: 0,
        activityLevel: 0,
        location: '',
    });

    const handlePredict = (hive: HiveData) => {
        setIsPredicting(true);
        setSelectedHive(hive);
        setTimeout(() => {
            setPrediction(getDummyPrediction(hive));
            setIsPredicting(false);
        }, 1500);
    };

    const handleAddHive = (e: React.FormEvent) => {
        e.preventDefault();
        const hive: HiveData = {
            ...newHive as HiveData,
            id: Math.random().toString(36).substr(2, 9),
        };
        setHives([...hives, hive]);
        setIsAdding(false);
        setNewHive({ name: '', species: 'Heterotrigona itama', ageMonths: 0, weightKg: 0, activityLevel: 0, location: '' });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">

                <div className="space-y-4">
                    <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Dashboard' }]} />
                    <div className="flex justify-end">
                        <Tabs
                            tabs={[
                                { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
                                { id: 'history', label: 'History', icon: <History className="w-4 h-4" /> },
                                { id: 'settings', label: 'Settings', icon: <SettingsIcon className="w-4 h-4" /> },
                            ]}
                            activeTab={activeTab}
                            onChange={setActiveTab}
                        />
                    </div>
                </div>

                <Alert variant="warning" title="Harvest Season Approaching">
                    Based on regional data, stingless bee activity is peaking. Check your hives for readiness scores above 80%.
                </Alert>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Hive List */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-amber-900">Your Hives</h3>
                            <Button variant="outline" size="sm" onClick={() => setIsAdding(true)}>
                                <Plus className="w-4 h-4 mr-2" /> New Hive
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {hives.map((hive) => (
                                <motion.div key={hive.id} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                                    <Card
                                        className={cn(
                                            'cursor-pointer transition-all border-2',
                                            selectedHive?.id === hive.id ? 'border-yellow-400 ring-4 ring-yellow-400/10' : 'border-transparent'
                                        )}
                                        onClick={() => handlePredict(hive)}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-bold text-lg text-amber-900">{hive.name}</h3>
                                                <p className="text-sm text-amber-700 italic">{hive.species}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="bg-yellow-50 p-2 rounded-lg">
                                                    <MapPin className="w-4 h-4 text-yellow-600" />
                                                </div>
                                                <Dropdown
                                                    trigger={
                                                        <button
                                                            className="p-2 hover:bg-yellow-100 rounded-lg transition-colors"
                                                        >
                                                            <MoreVertical className="w-4 h-4 text-amber-900/40" />
                                                        </button>
                                                    }
                                                    items={[
                                                        { id: 'edit', label: 'Edit Hive', icon: <Edit2 className="w-4 h-4" />, onClick: () => console.log('Edit', hive.id) },
                                                        { id: 'share', label: 'Share Data', icon: <Share2 className="w-4 h-4" />, onClick: () => console.log('Share', hive.id) },
                                                        { id: 'export', label: 'Export Log', icon: <Download className="w-4 h-4" />, onClick: () => console.log('Export', hive.id) },
                                                        { id: 'delete', label: 'Delete Hive', icon: <Trash2 className="w-4 h-4" />, variant: 'danger', onClick: () => setHives(hives.filter(h => h.id !== hive.id)) },
                                                    ]}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-amber-600/60 font-medium uppercase text-[10px] tracking-wider">Age</span>
                                                <div className="flex items-center gap-1 font-semibold">
                                                    <Calendar className="w-3 h-3" /> {hive.ageMonths}m
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-amber-600/60 font-medium uppercase text-[10px] tracking-wider">Weight</span>
                                                <div className="flex items-center gap-1 font-semibold">
                                                    <Weight className="w-3 h-3" /> {hive.weightKg}kg
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-amber-600/60 font-medium uppercase text-[10px] tracking-wider">Activity</span>
                                                <div className="flex items-center gap-1 font-semibold">
                                                    <Activity className="w-3 h-3" /> {hive.activityLevel}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-amber-900/40">
                                                <span>Growth Progress</span>
                                                <span>{Math.round((hive.ageMonths / 24) * 100)}%</span>
                                            </div>
                                            <Progress value={(hive.ageMonths / 24) * 100} />
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Prediction & Details */}
                    <div className="lg:col-span-7">
                        <AnimatePresence mode="wait">
                            {isPredicting ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="h-full flex flex-col items-center justify-center min-h-[400px] text-center space-y-4"
                                >
                                    <div className="relative">
                                        <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                                        <Bee className="w-6 h-6 text-yellow-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-amber-900">Analyzing Hive Data...</h3>
                                        <p className="text-amber-700">Calculating harvest readiness</p>
                                    </div>
                                </motion.div>
                            ) : prediction && selectedHive ? (
                                <motion.div
                                    key="prediction"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-6"
                                >
                                    <Card className="bg-gradient-to-br from-yellow-400 to-amber-500 text-white border-none p-8 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 opacity-10">
                                            <Sparkles className="w-32 h-32" />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Sparkles className="w-5 h-5" />
                                                <span className="text-sm font-bold uppercase tracking-widest opacity-80">Readiness Score</span>
                                            </div>
                                            <div className="flex items-baseline gap-4">
                                                <span className="text-7xl font-black tracking-tighter">{prediction.readinessScore}%</span>
                                                <div className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-bold">
                                                    {prediction.readinessScore > 80 ? 'Ready to Harvest!' : prediction.readinessScore > 50 ? 'Almost Ready' : 'Growing'}
                                                </div>
                                            </div>
                                            <div className="mt-8 flex items-center gap-6">
                                                <div>
                                                    <p className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">Estimated Date</p>
                                                    <p className="text-xl font-bold">{prediction.estimatedHarvestDate}</p>
                                                </div>
                                                <div className="w-px h-10 bg-white/20" />
                                                <div>
                                                    <p className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">Confidence</p>
                                                    <p className="text-xl font-bold">{Math.round(prediction.confidence * 100)}%</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="bg-white">
                                        <h4 className="font-bold text-amber-900 mb-4 flex items-center gap-2">
                                            <BarChart3 className="w-5 h-5 text-yellow-500" />
                                            Weight Trend (6 Months)
                                        </h4>
                                        <HiveChart data={chartData} />
                                    </Card>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Card className="bg-white">
                                            <div className="flex items-center gap-2 mb-4 text-amber-900">
                                                <Droplets className="w-5 h-5 text-blue-500" />
                                                <h4 className="font-bold">Honey Potential</h4>
                                            </div>
                                            <p className="text-sm text-amber-800 leading-relaxed">
                                                Based on the weight of <strong>{selectedHive.weightKg}kg</strong>, there's a high probability of significant honey stores.
                                            </p>
                                        </Card>
                                        <Card className="bg-white">
                                            <div className="flex items-center gap-2 mb-4 text-amber-900">
                                                <Info className="w-5 h-5 text-yellow-500" />
                                                <h4 className="font-bold">Hive Health</h4>
                                            </div>
                                            <p className="text-sm text-amber-800 leading-relaxed">
                                                Activity level of <strong>{selectedHive.activityLevel}</strong> bees/min indicates a strong, healthy colony.
                                            </p>
                                        </Card>
                                    </div>

                                    <Accordion title="Harvest Recommendations" defaultOpen>
                                        <div className="prose prose-amber prose-sm max-w-none">
                                            <Markdown>{prediction.recommendations}</Markdown>
                                        </div>
                                    </Accordion>

                                    <Card className="bg-white">
                                        <h4 className="font-bold text-amber-900 mb-4">Recent Hive Log</h4>
                                        <DataTable
                                            headers={['Date', 'Action', 'Notes']}
                                            rows={[
                                                ['2024-03-10', 'Inspection', 'Colony active, no pests found.'],
                                                ['2024-02-15', 'Weight Check', 'Gained 0.4kg since last month.'],
                                                ['2024-01-12', 'Cleaning', 'Entrance cleared of debris.'],
                                            ]}
                                        />
                                    </Card>
                                </motion.div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center min-h-[400px] text-center p-12 border-4 border-dashed border-yellow-200 rounded-3xl">
                                    <div className="bg-yellow-100 p-6 rounded-full mb-6">
                                        <Bee className="w-12 h-12 text-yellow-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-amber-900 mb-2">Select a Hive</h3>
                                    <p className="text-amber-700 max-w-xs">
                                        Choose one of your hives from the list to get a harvest readiness prediction.
                                    </p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Add Hive Modal */}
                <Modal isOpen={isAdding} onClose={() => setIsAdding(false)} title="Add New Hive">
                    <form onSubmit={handleAddHive} className="space-y-4">
                        <Input
                            label="Hive Name"
                            placeholder="e.g. Garden Box 1"
                            required
                            value={newHive.name}
                            onChange={e => setNewHive({...newHive, name: e.target.value})}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Age (Months)"
                                type="number"
                                required
                                value={newHive.ageMonths}
                                onChange={e => setNewHive({...newHive, ageMonths: parseInt(e.target.value)})}
                            />
                            <Input
                                label="Weight (kg)"
                                type="number"
                                step="0.1"
                                required
                                value={newHive.weightKg}
                                onChange={e => setNewHive({...newHive, weightKg: parseFloat(e.target.value)})}
                            />
                        </div>
                        <Input
                            label="Activity (Bees/min)"
                            type="number"
                            required
                            value={newHive.activityLevel}
                            onChange={e => setNewHive({...newHive, activityLevel: parseInt(e.target.value)})}
                        />
                        <Input
                            label="Location"
                            placeholder="e.g. Backyard"
                            required
                            value={newHive.location}
                            onChange={e => setNewHive({...newHive, location: e.target.value})}
                        />
                        <div className="pt-4 flex gap-3">
                            <Button type="button" variant="ghost" className="flex-1" onClick={() => setIsAdding(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" className="flex-1">
                                Save Hive
                            </Button>
                        </div>
                    </form>
                </Modal>

            </div>
        </AuthenticatedLayout>
    );
}
