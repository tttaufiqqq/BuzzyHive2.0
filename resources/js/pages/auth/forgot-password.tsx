import { Form, Head } from '@inertiajs/react';
import { ArrowRight, Mail } from 'lucide-react';
import { InputError } from '@/components/core/input-error';
import { TextLink } from '@/components/core/text-link';
import { AuthLayout } from '@/layouts/auth-layout';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <AuthLayout
            title="Forgot Password"
            description="Enter your email to receive a password reset link."
        >
            <Head title="Forgot Password — BuzzyHive 2.0" />

            {status && (
                <div className="mb-6 rounded-2xl bg-green-50 border border-green-200 px-4 py-3 text-sm font-medium text-green-700">
                    {status}
                </div>
            )}

            <Form {...email.form()} className="space-y-5">
                {({ processing, errors }) => (
                    <>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-amber-900/60">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    placeholder="you@example.com"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-amber-100 bg-white text-amber-950 placeholder:text-amber-300 focus:outline-none focus:border-yellow-400 transition-colors font-medium"
                                />
                            </div>
                            <InputError message={errors.email} />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-yellow-950 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 group transition-colors text-lg"
                        >
                            {processing ? 'Sending...' : 'Send Reset Link'}
                            {!processing && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                        </button>

                        <p className="text-center text-sm text-amber-800/50">
                            Remember it?{' '}
                            <TextLink href={login()}>Back to login</TextLink>
                        </p>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
