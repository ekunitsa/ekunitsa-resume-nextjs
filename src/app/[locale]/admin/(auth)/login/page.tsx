import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Login } from '@/components/admin/Login/Login';

import { Locale } from '@/types/types';

import styles from './page.module.scss';

interface LoginPageProps {
    params: Promise<{
        locale: Locale;
    }>;
}

export async function generateMetadata({ params }: LoginPageProps) {
    const { locale } = await params;

    const t = await getTranslations({ locale, namespace: 'MetaDataT' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

const LoginPage = async ({ params }: LoginPageProps) => {
    const { locale } = await params;
    
    setRequestLocale(locale);

    const { LoginT, FormT } = useMessages();

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
