import { Head, useForm } from '@inertiajs/react';
import { InputError } from '@/components/core/input-error';
import { PasswordInput } from '@/components/settings/password-input';
import { AuthLayout } from '@/layouts/auth-layout';

type Props = {
    email: string;
    userId: number;
};

export default function AcceptInvite({ email, userId }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('invite.accept.store', { user: userId }));
    };

    return (
        <AuthLayout
            title="Set up your account"
            description="You've been invited to BuzzyHive. Create your password to get started."
        >
            <Head title="Set Up Your Account — BuzzyHive 2.0" />

            <form onSubmit={submit} className="space-y-5">
                {/* Email — read-only */}
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
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-amber-900/60">
                        Password
                    </label>
                    <PasswordInput
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        autoFocus
                        autoComplete="new-password"
                        placeholder="Create a password"
                    />
                    <InputError message={errors.password} />
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-amber-900/60">
                        Confirm Password
                    </label>
                    <PasswordInput
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        autoComplete="new-password"
                        placeholder="Confirm your password"
                    />
                    <InputError message={errors.password_confirmation} />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-yellow-950 font-bold py-4 rounded-2xl transition-colors text-base"
                >
                    {processing ? 'Activating...' : 'Activate Account'}
                </button>
            </form>
        </AuthLayout>
    );
}
