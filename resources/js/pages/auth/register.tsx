import { Form, Head } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { InputError } from '@/components/core/input-error';
import { PasswordInput } from '@/components/settings/password-input';
import { TextLink } from '@/components/core/text-link';
import { AuthLayout } from '@/layouts/auth-layout';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
    return (
        <AuthLayout
            title="Create Account"
            description="Enter your details below to create your account."
        >
            <Head title="Register — BuzzyHive 2.0" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="space-y-5"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-amber-900/60">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                required
                                autoFocus
                                autoComplete="name"
                                placeholder="Your full name"
                                className="w-full px-4 py-3.5 rounded-2xl border-2 border-amber-100 bg-white text-amber-950 placeholder:text-amber-300 focus:outline-none focus:border-yellow-400 transition-colors font-medium"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-amber-900/60">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                required
                                autoComplete="email"
                                placeholder="you@example.com"
                                className="w-full px-4 py-3.5 rounded-2xl border-2 border-amber-100 bg-white text-amber-950 placeholder:text-amber-300 focus:outline-none focus:border-yellow-400 transition-colors font-medium"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-amber-900/60">
                                Password
                            </label>
                            <PasswordInput
                                id="password"
                                name="password"
                                required
                                autoComplete="new-password"
                                placeholder="Create a password"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-amber-900/60">
                                Confirm Password
                            </label>
                            <PasswordInput
                                id="password_confirmation"
                                name="password_confirmation"
                                required
                                autoComplete="new-password"
                                placeholder="Confirm your password"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-yellow-950 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 group transition-colors text-lg"
                        >
                            {processing ? 'Creating Account...' : 'Create Account'}
                            {!processing && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                        </button>

                        <p className="text-center text-sm text-amber-800/50">
                            Already have an account?{' '}
                            <TextLink href={login()}>Log in</TextLink>
                        </p>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
