import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from 'next-intl/server';

import { ExperienceForm } from '@/components/admin/experience/ExperienceForm/ExperienceForm';

import { Locale } from '@/types/types';

import { getExperienceItem } from '@/app/api/actions/experience';

interface ExperienceEditPageProps {
    params: Promise<{
        locale: Locale;
        id: string;
    }>;
}

export async function generateMetadata({ params }: ExperienceEditPageProps) {
    const { locale } = await params;

    const t = await getTranslations({ locale, namespace: 'MetaDataT' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

const ExperienceEditPage = async ({ params }: ExperienceEditPageProps) => {
    const { locale, id } = await params;
    
    setRequestLocale(locale);

    const { FormT, ExperienceFormT } = await getMessages();
    const data = await getExperienceItem(Number(id));

    return (
        <NextIntlClientProvider
            messages={{
                FormT,
                ExperienceFormT,
            }}
        >
            <ExperienceForm data={data} />
        </NextIntlClientProvider>
    );
};

export default ExperienceEditPage;
