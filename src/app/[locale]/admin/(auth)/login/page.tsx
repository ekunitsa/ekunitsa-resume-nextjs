import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from 'next-intl/server';
import { Login } from '@/components/admin/Login/Login';
import type { Locale } from '@/types/types';
import styles from './page.module.scss';

interface LoginPageProps {
    params: Promise<{
        locale: Locale;
    }>;
}

export async function generateMetadata({
    params,
}: LoginPageProps): Promise<Metadata> {
    const { locale } = await params;

    const t = await getTranslations({
        locale,
        namespace: 'MetaDataT',
    });

    return {
        title: t('title'),
        description: t('description'),
    };
}

const LoginPage = async ({ params }: LoginPageProps) => {
    const { locale } = await params;

    setRequestLocale(locale);

    const { LoginT, FormT } = await getMessages();

    return (
        <div className={styles.wrapper}>
            <NextIntlClientProvider
                messages={{
                    LoginT,
                    FormT,
                }}
            >
                <Login />
            </NextIntlClientProvider>
        </div>
    );
};

export default LoginPage;
