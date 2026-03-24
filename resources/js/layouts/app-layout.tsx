import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import type { AppLayoutProps } from '@/types';

export default ({ children, ...props }: AppLayoutProps) => (
    <AuthenticatedLayout {...props}>
        {children}
    </AuthenticatedLayout>
);
