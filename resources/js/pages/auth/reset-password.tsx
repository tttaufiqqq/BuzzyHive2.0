import { Form, Head } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { InputError } from '@/components/core/input-error';
import { PasswordInput } from '@/components/settings/password-input';
import { AuthLayout } from '@/layouts/auth-layout';
import { update } from '@/routes/password';

type Props = {
    token: string;
    email: string;
};

export default function ResetPassword({ token, email }: Props) {
    return (
        <AuthLayout
            title="Reset Password"
            description="Enter your new password below."
        >
            <Head title="Reset Password — BuzzyHive 2.0" />

            <Form
                {...update.form()}
                transform={(data) => ({ ...data, token, email })}
                resetOnSuccess={['password', 'password_confirmation']}
                className="space-y-5"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-amber-900/60">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                readOnly
                                className="w-full px-4 py-3.5 rounded-2xl border-2 border-amber-100 bg-amber-50 text-amber-900/60 font-medium cursor-not-allowed"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-amber-900/60">
                                New Password
                            </label>
                            <PasswordInput
                                id="password"
                                name="password"
                                autoComplete="new-password"
                                autoFocus
                                placeholder="Create a new password"
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
                                autoComplete="new-password"
                                placeholder="Confirm your new password"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-yellow-950 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 group transition-colors text-lg"
                        >
                            {processing ? 'Resetting...' : 'Reset Password'}
                            {!processing && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
