import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from 'next-intl/server';
import { LanguagesForm } from '@/components/admin/LanguagesForm/LanguagesForm';
import type { Locale } from '@/types/types';

interface LanguagesAddPageProps {
    params: Promise<{
        locale: Locale;
    }>;
}

export async function generateMetadata({
    params,
}: LanguagesAddPageProps): Promise<Metadata> {
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

const LanguagesAddPage = async ({ params }: LanguagesAddPageProps) => {
    const { locale } = await params;

    setRequestLocale(locale);

    const { FormT, LanguagesFormT, ResponseStatusT } = await getMessages();

    return (
        <NextIntlClientProvider
            messages={{
                FormT,
                LanguagesFormT,
                ResponseStatusT,
            }}
        >
            <LanguagesForm />
        </NextIntlClientProvider>
    );
};

export default LanguagesAddPage;
