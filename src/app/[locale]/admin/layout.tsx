import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';

import AdminProvider from '@/provider/AdminProvider';

interface AdminLayoutProps {
    children: ReactNode;
}
export default async function AdminLayout({ children }: AdminLayoutProps) {
    const session = await getServerSession();

    return <AdminProvider session={session}>{children}</AdminProvider>;
}
