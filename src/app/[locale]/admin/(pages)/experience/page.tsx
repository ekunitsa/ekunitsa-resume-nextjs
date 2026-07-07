import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from 'next-intl/server';
import { ExperienceList } from '@/components/admin/experience/ExperienceList/ExperienceList';
import type { Locale } from '@/types/types';

interface ExperiencePageProps {
    params: Promise<{
        locale: Locale;
    }>;
}

export async function generateMetadata({
    params,
}: ExperiencePageProps): Promise<Metadata> {
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

const ExperiencePage = async ({ params }: ExperiencePageProps) => {
    const { locale } = await params;

    setRequestLocale(locale);

    const { FormT, ExperienceListT } = await getMessages();

    return (
        <NextIntlClientProvider
            messages={{
                FormT,
                ExperienceListT,
            }}
        >
            <ExperienceList />
        </NextIntlClientProvider>
    );
};

export default ExperiencePage;
