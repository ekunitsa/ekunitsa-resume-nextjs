import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from 'next-intl/server';

import { LanguagesForm } from '@/components/admin/languages/LanguagesForm/LanguagesForm';

import { Locale } from '@/types/types';

import { getLanguage } from '@/app/api/actions/languages';

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
    const data = await getLanguage(Number(id));

    return (
        <NextIntlClientProvider
            messages={{
                FormT,
                LanguagesFormT,
            }}
        >
            <LanguagesForm data={data} />
        </NextIntlClientProvider>
    );
};

export default LanguagesEditPage;
