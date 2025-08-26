import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from 'next-intl/server';

import { AboutList } from '@/components/admin/about/AboutList/AboutList';

import { Locale } from '@/types/types';

interface AboutPageProps {
    params: {
        locale: Locale;
    };
}

export async function generateMetadata({ params: { locale } }: AboutPageProps) {
    const t = await getTranslations({ locale, namespace: 'MetaDataT' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

const AboutPage = async ({ params: { locale } }: AboutPageProps) => {
    setRequestLocale(locale);

    const { FormT, AboutListT } = await getMessages();

    return (
        <NextIntlClientProvider
            messages={{
                FormT,
                AboutListT,
            }}
        >
            <AboutList />
        </NextIntlClientProvider>
    );
};

export default AboutPage;
