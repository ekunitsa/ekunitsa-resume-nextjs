import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import Login from '@/components/admin/Login/Login';

import { Locale } from '@/types/types';

import styles from './page.module.scss';

interface LoginPageProps {
    params: {
        locale: Locale;
    };
}

export async function generateMetadata({ params: { locale } }: LoginPageProps) {
    const t = await getTranslations({ locale, namespace: 'MetaDataT' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

const LoginPage = ({ params: { locale } }: LoginPageProps) => {
    unstable_setRequestLocale(locale);

    const { LoginT } = useMessages();

    return (
        <div className={styles.wrapper}>
            <NextIntlClientProvider
                messages={{
                    LoginT,
                }}
            >
                <Login />
            </NextIntlClientProvider>
        </div>
    );
};

export default LoginPage;
