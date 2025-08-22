import { NextIntlClientProvider, useMessages } from 'next-intl';

import { Sidebar } from '@/components/admin/Sidebar/Sidebar';
import { Box } from '@/components/common/Box/Box';

import styles from './layout.module.scss';

interface AdminLayoutProps {
    children: React.ReactNode;
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

            <Box
                corners={['bottomLeft', 'topRight']}
                className={styles.contentWrapper}
            >
                {children}
            </Box>
        </div>
    );
}
