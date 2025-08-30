import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from 'next-intl/server';

import { ExperienceForm } from '@/components/admin/experience/ExperienceForm/ExperienceForm';

import { Locale } from '@/types/types';

interface ExperienceAddPageProps {
    params: {
        locale: Locale;
    };
}

export async function generateMetadata({
    params: { locale },
}: ExperienceAddPageProps) {
    const t = await getTranslations({ locale, namespace: 'MetaDataT' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

const ExperienceAddPage = async ({
    params: { locale },
}: ExperienceAddPageProps) => {
    setRequestLocale(locale);

    const { FormT, ExperienceFormT } = await getMessages();

    return (
        <NextIntlClientProvider
            messages={{
                FormT,
                ExperienceFormT,
            }}
        >
            <ExperienceForm />
        </NextIntlClientProvider>
    );
};

export default ExperienceAddPage;
