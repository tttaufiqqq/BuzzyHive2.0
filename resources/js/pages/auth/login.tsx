import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { BeeIcon as Bee } from '@/components/core/bee-icon';
import React from 'react';
import { InputError } from '@/components/core/input-error';

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
        <div className="min-h-screen bg-[#FFFBEB] relative flex overflow-hidden">
            <Head title="Log in — BuzzyHive2.0" />

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
