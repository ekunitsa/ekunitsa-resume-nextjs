import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from 'next-intl/server';
import { getExperienceItem } from '@/app/api/actions/experience';
import { ExperienceForm } from '@/components/admin/ExperienceForm/ExperienceForm';
import type { Locale } from '@/types/types';

interface ExperienceEditPageProps {
    params: Promise<{
        locale: Locale;
        id: string;
    }>;
}

export async function generateMetadata({
    params,
}: ExperienceEditPageProps): Promise<Metadata> {
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

const ExperienceEditPage = async ({ params }: ExperienceEditPageProps) => {
    const { locale, id } = await params;

    setRequestLocale(locale);

    const { FormT, ExperienceFormT, ResponseStatusT } = await getMessages();
    const data = await getExperienceItem(Number(id));

    return (
        <NextIntlClientProvider
            messages={{
                FormT,
                ExperienceFormT,
                ResponseStatusT,
            }}
        >
            <ExperienceForm data={data} />
        </NextIntlClientProvider>
    );
};

export default ExperienceEditPage;
