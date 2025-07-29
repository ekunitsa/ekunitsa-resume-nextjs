import classNames from 'classnames';
import type { Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

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

export default async function LocaleLayout({
    children,
    params: { locale },
}: LayoutProps) {
    const { LocaleSwitcherT } = await getMessages();
    const session = await getServerSession();

    return (
        <html lang={locale}>
            <body className={montserrat.className}>
                <SessionWrapper>
                    <NextIntlClientProvider
                        messages={{
                            LocaleSwitcherT,
                        }}
                    >
                        <AdminBar />
                    </NextIntlClientProvider>
                </SessionWrapper>
                <div
                    className={classNames(styles.wrapper, {
                        [styles.logged]: !!session,
                    })}
                >
                    {children}
                </div>
            </body>
        </html>
    );
}
