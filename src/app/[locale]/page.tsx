import {
    NextIntlClientProvider,
    useMessages,
    useTranslations,
} from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import LocaleSwitcher from '@/components/LocaleSwitcher/LocaleSwitcher';

import { Locale } from '@/types/types';

interface HomePageProps {
    params: {
        locale: Locale;
    };
}

export async function generateMetadata({ params: { locale } }: HomePageProps) {
    const t = await getTranslations({ locale, namespace: 'MetaDataT' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

const HomePage = ({ params: { locale } }: HomePageProps) => {
    unstable_setRequestLocale(locale);

    const t = useTranslations('HomePageT');
    const { LocaleSwitcherT } = useMessages();

    return (
        <>
            <NextIntlClientProvider
                messages={{
                    LocaleSwitcherT,
                }}
            >
                <LocaleSwitcher />
            </NextIntlClientProvider>
            <div>{t('welcome')}</div>
        </>
    );
};

export default HomePage;
