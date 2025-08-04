import { ReactNode } from 'react';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import Sidebar from '@/components/admin/Sidebar/Sidebar';

import styles from './layout.module.scss';

interface AdminLayoutProps {
    children: ReactNode;
}
export default function AdminLayout({ children }: AdminLayoutProps) {
    const { SidebarT } = useMessages();

    return (
        <div className={styles.grid}>
            <NextIntlClientProvider
                messages={{
                    SidebarT,
                }}
            >
                <Sidebar />
            </NextIntlClientProvider>

            {children}
        </div>
    );
}
