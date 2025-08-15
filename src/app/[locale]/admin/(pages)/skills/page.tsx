import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from 'next-intl/server';

import { SkillsForm } from '@/components/admin/SkillsForm/SkillsForm';

import { Locale } from '@/types/types';

import { getSkills } from '@/app/api/actions/skills';

interface SkillsPageProps {
    params: {
        locale: Locale;
    };
}

export async function generateMetadata({
    params: { locale },
}: SkillsPageProps) {
    const t = await getTranslations({ locale, namespace: 'MetaDataT' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

const SkillsPage = async ({ params: { locale } }: SkillsPageProps) => {
    setRequestLocale(locale);

    const { SkillsFormT, FormT } = await getMessages();

    const data = await getSkills(locale);

    return (
        <NextIntlClientProvider
            messages={{
                SkillsFormT,
                FormT,
            }}
        >
            <SkillsForm data={data} />
        </NextIntlClientProvider>
    );
};

export default SkillsPage;
