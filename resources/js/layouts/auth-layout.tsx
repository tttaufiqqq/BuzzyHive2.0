import { Link } from '@inertiajs/react';
import { Bug as Bee } from 'lucide-react';
import type { AuthLayoutProps } from '@/types';

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-[#FFFBEB] relative flex overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-950 -skew-x-12 translate-x-1/4 z-0 hidden lg:block" />

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

                <div>
                    <div className="mb-8">
                        <h1 className="text-5xl font-black uppercase tracking-tighter text-amber-950 leading-none">
                            {title}<span className="text-yellow-500">.</span>
                        </h1>
                        {description && (
                            <p className="text-amber-800/60 mt-3 font-medium">{description}</p>
                        )}
                    </div>

                    {children}
                </div>
            </div>

            {/* Right Panel - Decorative */}
            <div className="hidden lg:flex w-1/2 relative z-10 items-center justify-center">
                <div className="text-center px-12">
                    <div className="inline-block bg-yellow-400 p-8 rounded-[2rem] shadow-2xl mb-8 rotate-6">
                        <Bee className="w-16 h-16 text-yellow-950" />
                    </div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter text-white leading-none mb-4">
                        Harvest <br />
                        <span className="text-yellow-400">Intelligence.</span>
                    </h2>
                    <p className="text-amber-200/60 font-medium max-w-xs mx-auto">
                        IoT-integrated harvest readiness prediction for stingless bee farming.
                    </p>
                </div>
            </div>
        </div>
    );
}
