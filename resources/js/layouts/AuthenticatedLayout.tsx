import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { Bug as Bee, LayoutDashboard, Settings, Bell, User, LogOut, Shield, CreditCard, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { Dropdown } from '@/components/Dropdown';

interface AuthenticatedLayoutProps {
    header?: React.ReactNode;
    children: React.ReactNode;
}

interface PageProps {
    auth: {
        user: {
            name: string;
        };
    };
    [key: string]: unknown;
}

const navItems = [
    { icon: Home,            label: 'Home',      routeName: 'home' },
    { icon: LayoutDashboard, label: 'Dashboard', routeName: 'dashboard' },
    { icon: Settings,        label: 'Settings',  routeName: 'profile.edit' },
];

export default function AuthenticatedLayout({ header = null, children }: AuthenticatedLayoutProps) {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    const userMenuItems = [
        { id: 'profile',  label: 'My Profile', icon: <User className="w-4 h-4" />,       onClick: () => router.visit(route('profile.edit')) },
        { id: 'security', label: 'Security',   icon: <Shield className="w-4 h-4" />,     onClick: () => {} },
        { id: 'billing',  label: 'Billing',    icon: <CreditCard className="w-4 h-4" />, onClick: () => {} },
        { id: 'logout',   label: 'Sign Out',   icon: <LogOut className="w-4 h-4" />,     variant: 'danger' as const, onClick: () => router.post(route('logout')) },
    ];

    return (
        <div className="min-h-screen bg-[#FFFBEB] text-amber-950 font-sans selection:bg-yellow-200 pb-20 md:pb-0">

            {/* ── Top App Bar ─────────────────────────────────────────────── */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-yellow-100 px-6 py-4">
                <div className="max-w-6xl mx-auto flex justify-between items-center">

                    {/* Logo */}
                    <Link href={route('dashboard')} className="flex items-center gap-2">
                        <div className="bg-yellow-400 p-2 rounded-xl">
                            <Bee className="w-6 h-6 text-yellow-950" />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-amber-900 hidden sm:block">
                            BuzzyHive2.0
                        </h1>
                    </Link>

                    {/* Right actions */}
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-yellow-100 rounded-full transition-colors relative">
                            <Bell className="w-5 h-5 text-amber-900" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>

                        <Dropdown
                            trigger={
                                <button className="flex items-center gap-2 p-1 pr-3 hover:bg-yellow-100 rounded-full transition-colors border border-yellow-100">
                                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4 text-yellow-950" />
                                    </div>
                                    <span className="text-sm font-bold text-amber-900 hidden sm:block">
                                        {user.name}
                                    </span>
                                </button>
                            }
                            items={userMenuItems}
                        />
                    </div>
                </div>
            </header>

            {/* ── Optional page header ─────────────────────────────────────── */}
            {header && (
                <div className="bg-white border-b border-yellow-100">
                    <div className="max-w-6xl mx-auto px-6 py-4">
                        {header}
                    </div>
                </div>
            )}

            {/* ── Main content ─────────────────────────────────────────────── */}
            <main className="relative z-10">
                {children}
            </main>

            {/* ── Bottom Navigation (mobile only) ──────────────────────────── */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-yellow-100 px-6 py-3 flex justify-around items-center md:hidden">
                {navItems.map((item) => {
                    const isActive = route().current(item.routeName);
                    return (
                        <Link
                            key={item.routeName}
                            href={route(item.routeName)}
                            className={cn(
                                'flex flex-col items-center gap-1 transition-colors',
                                isActive ? 'text-yellow-600' : 'text-amber-900/40'
                            )}
                        >
                            <div className="relative">
                                <item.icon className="w-6 h-6" />
                                {isActive && (
                                    <motion.div
                                        layoutId="bottomNav"
                                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow-600 rounded-full"
                                    />
                                )}
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

        </div>
    );
}
