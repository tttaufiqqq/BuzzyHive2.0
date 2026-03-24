import { Link } from '@inertiajs/react';
import { motion } from 'motion/react';
import type { PropsWithChildren } from 'react';
import { Breadcrumbs } from '@/components/core/navigation';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { AuthenticatedLayout } from '@/layouts/authenticated-layout';
import { cn, toUrl } from '@/lib/utils';
import type { NavItem } from '@/types';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin',
        icon: null,
        exact: true,
    },
    {
        title: 'Beekeepers',
        href: '/admin/beekeepers',
        icon: null,
    },
];

export function AdminLayout({ children }: PropsWithChildren) {
    const { isCurrentUrl, isCurrentOrParentUrl } = useCurrentUrl();
    const isActive = (item: NavItem) => item.exact ? isCurrentUrl(item.href) : isCurrentOrParentUrl(item.href);

    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <AuthenticatedLayout>
            <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">

                {/* Page header */}
                <div className="space-y-2">
                    <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Admin' }]} />
                    <h2 className="text-3xl font-black text-amber-950 tracking-tighter uppercase">Admin</h2>
                </div>

                <div className="flex flex-col lg:flex-row lg:gap-10">
                    <aside className="w-full lg:w-44 mb-6 lg:mb-0">
                        {/* Mobile: horizontal tabs */}
                        <nav
                            className="flex lg:hidden overflow-x-auto gap-1 bg-yellow-100/50 rounded-2xl p-1.5"
                            aria-label="Admin"
                        >
                            {sidebarNavItems.map((item, index) => (
                                <Link
                                    key={`${toUrl(item.href)}-${index}`}
                                    href={item.href}
                                    className={cn(
                                        'flex-shrink-0 px-4 py-2 text-sm rounded-xl transition-all',
                                        isActive(item)
                                            ? 'bg-white shadow-sm font-semibold text-amber-900'
                                            : 'text-amber-900/60 hover:bg-yellow-200/50'
                                    )}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </nav>

                        {/* Desktop: vertical tabs */}
                        <nav
                            className="hidden lg:flex flex-col gap-1 bg-yellow-100/50 rounded-2xl p-1.5"
                            aria-label="Admin"
                        >
                            {sidebarNavItems.map((item, index) => (
                                <Link
                                    key={`${toUrl(item.href)}-${index}`}
                                    href={item.href}
                                    className={cn(
                                        'px-4 py-2 text-sm rounded-xl transition-all',
                                        isActive(item)
                                            ? 'bg-white shadow-sm font-semibold text-amber-900'
                                            : 'text-amber-900/60 hover:bg-yellow-200/50'
                                    )}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                    </aside>

                    <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        {children}
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
