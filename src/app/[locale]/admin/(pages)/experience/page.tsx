import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from 'next-intl/server';

import { ExperienceList } from '@/components/admin/experience/ExperienceList/ExperienceList';

import { Locale } from '@/types/types';

interface ExperiencePageProps {
    params: {
        locale: Locale;
    };
}

export async function generateMetadata({
    params: { locale },
}: ExperiencePageProps) {
    const t = await getTranslations({ locale, namespace: 'MetaDataT' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

const ExperiencePage = async ({ params: { locale } }: ExperiencePageProps) => {
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
