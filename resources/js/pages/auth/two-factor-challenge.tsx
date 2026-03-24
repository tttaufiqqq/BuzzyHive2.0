import { Form, Head } from '@inertiajs/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { ArrowRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { InputError } from '@/components/core/input-error';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import { AuthLayout } from '@/layouts/auth-layout';
import { store } from '@/routes/two-factor/login';

export default function TwoFactorChallenge() {
    const [showRecoveryInput, setShowRecoveryInput] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');

    const authConfigContent = useMemo<{
        title: string;
        description: string;
        toggleText: string;
    }>(() => {
        if (showRecoveryInput) {
            return {
                title: 'Recovery Code',
                description: 'Enter one of your emergency recovery codes to access your account.',
                toggleText: 'Use authentication code instead',
            };
        }
        return {
            title: 'Two-Factor Auth',
            description: 'Enter the authentication code from your authenticator app.',
            toggleText: 'Use a recovery code instead',
        };
    }, [showRecoveryInput]);

    const toggleRecoveryMode = (clearErrors: () => void): void => {
        setShowRecoveryInput(!showRecoveryInput);
        clearErrors();
        setCode('');
    };

    return (
        <AuthLayout
            title={authConfigContent.title}
            description={authConfigContent.description}
        >
            <Head title="Two-Factor Authentication — BuzzyHive 2.0" />

            <Form
                {...store.form()}
                className="space-y-5"
                resetOnError
                resetOnSuccess={!showRecoveryInput}
            >
                {({ errors, processing, clearErrors }) => (
                    <>
                        {showRecoveryInput ? (
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-widest text-amber-900/60">
                                    Recovery Code
                                </label>
                                <input
                                    name="recovery_code"
                                    type="text"
                                    placeholder="Enter recovery code"
                                    autoFocus={showRecoveryInput}
                                    required
                                    className="w-full px-4 py-3.5 rounded-2xl border-2 border-amber-100 bg-white text-amber-950 placeholder:text-amber-300 focus:outline-none focus:border-yellow-400 transition-colors font-medium"
                                />
                                <InputError message={errors.recovery_code} />
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-amber-900/60">
                                    Authentication Code
                                </label>
                                <div className="flex justify-center">
                                    <InputOTP
                                        name="code"
                                        maxLength={OTP_MAX_LENGTH}
                                        value={code}
                                        onChange={(value) => setCode(value)}
                                        disabled={processing}
                                        pattern={REGEXP_ONLY_DIGITS}
                                    >
                                        <InputOTPGroup>
                                            {Array.from(
                                                { length: OTP_MAX_LENGTH },
                                                (_, index) => (
                                                    <InputOTPSlot key={index} index={index} />
                                                ),
                                            )}
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                                <InputError message={errors.code} />
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-yellow-950 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 group transition-colors text-lg"
                        >
                            {processing ? 'Verifying...' : 'Continue'}
                            {!processing && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                        </button>

                        <p className="text-center text-sm text-amber-800/50">
                            <button
                                type="button"
                                className="font-semibold text-amber-700 hover:text-amber-950 underline underline-offset-4 transition-colors"
                                onClick={() => toggleRecoveryMode(clearErrors)}
                            >
                                {authConfigContent.toggleText}
                            </button>
                        </p>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
