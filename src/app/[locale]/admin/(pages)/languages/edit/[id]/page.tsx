import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from 'next-intl/server';
import { getLanguage } from '@/app/api/actions/languages';
import { LanguagesForm } from '@/components/admin/LanguagesForm/LanguagesForm';
import type { Locale } from '@/types/types';

interface LanguagesEditPageProps {
    params: Promise<{
        locale: Locale;
        id: string;
    }>;
}

export async function generateMetadata({
    params,
}: LanguagesEditPageProps): Promise<Metadata> {
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

const LanguagesEditPage = async ({ params }: LanguagesEditPageProps) => {
    const { locale, id } = await params;

    setRequestLocale(locale);

    const { FormT, LanguagesFormT, ResponseStatusT } = await getMessages();
    const data = await getLanguage(Number(id));

    return (
        <NextIntlClientProvider
            messages={{
                FormT,
                LanguagesFormT,
                ResponseStatusT,
            }}
        >
            <LanguagesForm data={data} />
        </NextIntlClientProvider>
    );
};

export default LanguagesEditPage;
