import type { Viewport } from 'next';
import { Montserrat } from 'next/font/google';

import { locales } from '@/configs/config';

import { Locale } from '@/types/types';

import '@/assets/scss/common.scss';

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
            <body className={montserrat.className}>{children}</body>
        </html>
    );
}
