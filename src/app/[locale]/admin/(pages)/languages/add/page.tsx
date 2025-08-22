import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from 'next-intl/server';

import { Locale } from '@/types/types';

interface LanguagesAddPageProps {
    params: {
        locale: Locale;
    };
}

export async function generateMetadata({
    params: { locale },
}: LanguagesAddPageProps) {
    const t = await getTranslations({ locale, namespace: 'MetaDataT' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

const LanguagesAddPage = async ({
    params: { locale },
}: LanguagesAddPageProps) => {
    setRequestLocale(locale);

    const { FormT, LanguagesFormT } = await getMessages();

    return (
        <NextIntlClientProvider
            messages={{
                FormT,
                LanguagesFormT,
            }}
        >
            LanguagesForm
        </NextIntlClientProvider>
    );
};

export default LanguagesAddPage;
