import { Link } from '@inertiajs/react';
import { Bug as Bee } from 'lucide-react';
import { motion } from 'motion/react';
import type { AuthLayoutProps } from '@/types';

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-[#FFFBEB] flex overflow-hidden">
            {/* Left Panel - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12 relative z-10">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 mb-16 group w-fit">
                    <div className="bg-yellow-400 p-2 rounded-xl group-hover:bg-yellow-500 transition-colors">
                        <Bee className="w-5 h-5 text-yellow-950" />
                    </div>
                    <span className="text-lg font-black tracking-tighter uppercase text-amber-950">
                        BuzzyHive<span className="text-yellow-500">2.0</span>
                    </span>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="mb-8">
                        <h1 className="text-5xl font-black uppercase tracking-tighter text-amber-950 leading-none">
                            {title}<span className="text-yellow-500">.</span>
                        </h1>
                        {description && (
                            <p className="text-amber-800/60 mt-3 font-medium">{description}</p>
                        )}
                    </div>

                    {children}
                </motion.div>
            </div>

            {/* Right Panel - Decorative */}
            <div className="hidden lg:flex w-1/2 bg-amber-950 relative overflow-hidden items-center justify-center">
                <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute top-0 left-0 w-24 h-full bg-[#FFFBEB] skew-x-6 -translate-x-12"
                />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative z-10 text-center px-12"
                >
                    <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="inline-block bg-yellow-400 p-8 rounded-[2rem] shadow-2xl mb-8 rotate-6"
                    >
                        <Bee className="w-16 h-16 text-yellow-950" />
                    </motion.div>

                    <h2 className="text-4xl font-black uppercase tracking-tighter text-white leading-none mb-4">
                        Harvest <br />
                        <span className="text-yellow-400">Intelligence.</span>
                    </h2>
                    <p className="text-amber-200/60 font-medium max-w-xs mx-auto">
                        IoT-integrated harvest readiness prediction for stingless bee farming.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
