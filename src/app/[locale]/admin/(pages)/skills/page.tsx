import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from 'next-intl/server';
import { getSkills } from '@/app/api/actions/skills';
import { SkillsForm } from '@/components/admin/SkillsForm/SkillsForm';
import type { Locale } from '@/types/types';

interface SkillsPageProps {
    params: Promise<{
        locale: Locale;
    }>;
}

export async function generateMetadata({
    params,
}: SkillsPageProps): Promise<Metadata> {
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

const SkillsPage = async ({ params }: SkillsPageProps) => {
    const { locale } = await params;

    setRequestLocale(locale);

    const { SkillsFormT, FormT, ResponseStatusT } = await getMessages();

    const data = await getSkills(locale);

    return (
        <NextIntlClientProvider
            messages={{
                SkillsFormT,
                FormT,
                ResponseStatusT,
            }}
        >
            <SkillsForm data={data} />
        </NextIntlClientProvider>
    );
};

export default SkillsPage;
