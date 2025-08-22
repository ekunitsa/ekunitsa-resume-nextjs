import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from 'next-intl/server';

import { Locale } from '@/types/types';

interface LanguagesEditPageProps {
    params: {
        locale: Locale;
        id: string;
    };
}

export async function generateMetadata({
    params: { locale },
}: LanguagesEditPageProps) {
    const t = await getTranslations({ locale, namespace: 'MetaDataT' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

const LanguagesEditPage = async ({
    params: { locale, id },
}: LanguagesEditPageProps) => {
    setRequestLocale(locale);

    const { FormT, LanguagesFormT } = await getMessages();

    return (
        <NextIntlClientProvider
            messages={{
                FormT,
                LanguagesFormT,
            }}
        >
            LanguagesForm with ID {id}
        </NextIntlClientProvider>
    );
};

export default LanguagesEditPage;
