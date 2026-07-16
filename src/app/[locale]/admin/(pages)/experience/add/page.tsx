import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from 'next-intl/server';
import { ExperienceForm } from '@/components/admin/ExperienceForm/ExperienceForm';
import type { Locale } from '@/types/types';

interface ExperienceAddPageProps {
    params: Promise<{
        locale: Locale;
    }>;
}

export async function generateMetadata({
    params,
}: ExperienceAddPageProps): Promise<Metadata> {
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

const ExperienceAddPage = async ({ params }: ExperienceAddPageProps) => {
    const { locale } = await params;

    setRequestLocale(locale);

    const { FormT, ExperienceFormT, ResponseStatusT } = await getMessages();

    return (
        <NextIntlClientProvider
            messages={{
                FormT,
                ExperienceFormT,
                ResponseStatusT,
            }}
        >
            <ExperienceForm />
        </NextIntlClientProvider>
    );
};

export default ExperienceAddPage;
