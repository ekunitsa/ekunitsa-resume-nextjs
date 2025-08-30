import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from 'next-intl/server';

import { AboutForm } from '@/components/admin/about/AboutForm/AboutForm';

import { Locale } from '@/types/types';

interface AboutAddPageProps {
    params: {
        locale: Locale;
    };
}

export async function generateMetadata({
    params: { locale },
}: AboutAddPageProps) {
    const t = await getTranslations({ locale, namespace: 'MetaDataT' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

const AboutAddPage = async ({ params: { locale } }: AboutAddPageProps) => {
    setRequestLocale(locale);

    const { FormT, AboutFormT } = await getMessages();

    return (
        <NextIntlClientProvider
            messages={{
                FormT,
                AboutFormT,
            }}
        >
            <AboutForm />
        </NextIntlClientProvider>
    );
};

export default AboutAddPage;
