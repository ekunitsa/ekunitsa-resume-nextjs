import classNames from 'classnames';
import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { AdminBar } from '@/components/admin/AdminBar/AdminBar';

import { routing } from '@/configs/i18n/routing';

import '@/assets/scss/common.scss';
import styles from './layout.module.scss';

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{
        locale: string;
    }>;
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

const montserrat = Montserrat({
    weight: [
        '400',
        '500',
        '600',
    ],
    style: [
        'normal',
    ],
    subsets: [
        'latin',
        'cyrillic-ext',
    ],
    display: 'swap',
});

export const metadata: Metadata = {
    icons: {
        icon: '/static/img/favicon.ico',
    },
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({
        locale,
    }));
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
    const { locale } = await params;

    const { LocaleSwitcherT } = await getMessages();
    const session = await getServerSession();

    return (
        <html lang={locale}>
            <body className={montserrat.className}>
                {session?.user && (
                    <NextIntlClientProvider
                        messages={{
                            LocaleSwitcherT,
                        }}
                    >
                        <AdminBar />
                    </NextIntlClientProvider>
                )}
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
