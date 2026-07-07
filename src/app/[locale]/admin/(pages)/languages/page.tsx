import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from 'next-intl/server';
import { LanguagesList } from '@/components/admin/languages/LanguagesList/LanguagesList';
import type { Locale } from '@/types/types';

interface LanguagesPageProps {
    params: Promise<{
        locale: Locale;
    }>;
}

export async function generateMetadata({
    params,
}: LanguagesPageProps): Promise<Metadata> {
    const { locale } = await params;

    const t = await getTranslations({
        locale,
        namespace: 'MetaDataT',
    });

    return {
        title: t('title'),
        description: t('description'),
    };
}

const LanguagesPage = async ({ params }: LanguagesPageProps) => {
    const { locale } = await params;

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
