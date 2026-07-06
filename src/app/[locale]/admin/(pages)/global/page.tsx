import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from 'next-intl/server';

import { GlobalForm } from '@/components/admin/GlobalForm/GlobalForm';

import { Locale } from '@/types/types';

import { getMainInformation } from '@/app/api/actions/mainInformation';

interface GlobalPageProps {
    params: Promise<{
        locale: Locale;
    }>;
}

export async function generateMetadata({ params }: GlobalPageProps) {
    const { locale } = await params;
    
    const t = await getTranslations({ locale, namespace: 'MetaDataT' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

const GlobalPage = async ({ params }: GlobalPageProps) => {
    const { locale } = await params;

    setRequestLocale(locale);

    const { GlobalFormT, FormT } = await getMessages();

    const data = await getMainInformation(locale);

    return (
        <NextIntlClientProvider
            messages={{
                GlobalFormT,
                FormT,
            }}
        >
            <GlobalForm data={data} />
        </NextIntlClientProvider>
    );
};

export default GlobalPage;
