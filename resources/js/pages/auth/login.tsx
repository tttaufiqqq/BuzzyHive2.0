import { InputError } from '@/components/core/input-error';
import { Head, Link, useForm } from '@inertiajs/react';
import { Bug as Bee, ArrowRight, Lock, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

export default function Login({ status, canResetPassword }: { status?: string; canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-[#FFFBEB] flex overflow-hidden">
            <Head title="Log in — BuzzyHive2.0" />

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
                        <span className="bg-yellow-400 text-yellow-950 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                            Welcome Back
                        </span>
                        <h1 className="text-5xl font-black uppercase tracking-tighter text-amber-950 mt-4 leading-none">
                            Sign <br />
                            <span className="text-yellow-500">In.</span>
                        </h1>
                        <p className="text-amber-800/60 mt-3 font-medium">
                            Access your apiary dashboard and hive insights.
                        </p>
                    </div>

                    {status && (
                        <div className="mb-6 text-sm font-medium text-emerald-700 bg-emerald-50 px-4 py-3 rounded-2xl">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-amber-900/60">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-amber-100 bg-white text-amber-950 placeholder:text-amber-300 focus:outline-none focus:border-yellow-400 transition-colors font-medium"
                                />
                            </div>
                            <InputError message={errors.email} />
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-amber-900/60">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-amber-100 bg-white text-amber-950 placeholder:text-amber-300 focus:outline-none focus:border-yellow-400 transition-colors font-medium"
                                />
                            </div>
                            <InputError message={errors.password} />
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-amber-300 text-yellow-500 focus:ring-yellow-400"
                                />
                                <span className="text-sm font-medium text-amber-800">Remember me</span>
                            </label>
                            {canResetPassword && (
                                <Link
                                    href="/forgot-password"
                                    className="text-sm font-bold text-yellow-600 hover:text-yellow-700 underline underline-offset-2"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-yellow-950 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 group transition-colors text-lg"
                        >
                            {processing ? 'Signing in...' : 'Sign In'}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                    </form>
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
                        <span className="text-yellow-400">Smarter.</span>
                    </h2>
                    <p className="text-amber-100/50 font-medium max-w-xs mx-auto">
                        AI-powered predictions for the perfect stingless bee honey harvest.
                    </p>

                    <div className="flex gap-8 justify-center mt-12">
                        <div className="text-center">
                            <span className="block text-3xl font-black text-yellow-400">98%</span>
                            <span className="text-xs uppercase tracking-widest text-amber-100/40 font-bold">Accuracy</span>
                        </div>
                        <div className="w-px bg-amber-800" />
                        <div className="text-center">
                            <span className="block text-3xl font-black text-yellow-400">24/7</span>
                            <span className="text-xs uppercase tracking-widest text-amber-100/40 font-bold">Monitoring</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
