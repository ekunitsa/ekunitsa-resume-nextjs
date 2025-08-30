import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from 'next-intl/server';

import { LanguagesList } from '@/components/admin/languages/LanguagesList/LanguagesList';

import { Locale } from '@/types/types';

interface LanguagesPageProps {
    params: {
        locale: Locale;
    };
}

export async function generateMetadata({
    params: { locale },
}: LanguagesPageProps) {
    const t = await getTranslations({ locale, namespace: 'MetaDataT' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

const LanguagesPage = async ({ params: { locale } }: LanguagesPageProps) => {
    setRequestLocale(locale);

    const { FormT, LanguagesListT } = await getMessages();

    return (
        <NextIntlClientProvider
            messages={{
                FormT,
                LanguagesListT,
            }}
        >
            <LanguagesList />
        </NextIntlClientProvider>
    );
};

export default LanguagesPage;
