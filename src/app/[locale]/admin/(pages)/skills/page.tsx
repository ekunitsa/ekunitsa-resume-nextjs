import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import SkillsForm from '@/components/admin/SkillsForm/SkillsForm';

import { Locale } from '@/types/types';

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

const SkillsPage = ({ params: { locale } }: SkillsPageProps) => {
    unstable_setRequestLocale(locale);

    const { SkillsFormT, FormT } = useMessages();

    return (
        <NextIntlClientProvider
            messages={{
                SkillsFormT,
                FormT,
            }}
        >
            <SkillsForm />
        </NextIntlClientProvider>
    );
};

export default SkillsPage;
