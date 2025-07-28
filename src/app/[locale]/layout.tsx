import type { Viewport } from 'next';
import { Montserrat } from 'next/font/google';

import AdminBar from '@/components/admin/AdminBar/AdminBar';
import SessionWrapper from '@/components/SessionWrapper/SessionWrapper';

import { locales } from '@/configs/config';

import { Locale } from '@/types/types';

import '@/assets/scss/common.scss';
import styles from './layout.module.scss';

interface LayoutProps {
    children: React.ReactNode;
    params: { locale: Locale };
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

const montserrat = Montserrat({
    weight: ['400', '500', '600', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin', 'cyrillic-ext'],
    display: 'swap',
});

export const metadata = {
    icons: {
        icon: '/static/img/favicon.ico',
    },
};

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
    children,
    params: { locale },
}: LayoutProps) {
    return (
        <html lang={locale}>
            <body className={montserrat.className}>
                <SessionWrapper>
                    <AdminBar />
                </SessionWrapper>
                <div className={styles.wrapper}>{children}</div>
            </body>
        </html>
    );
}
