import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from 'next-intl/server';
import { getAboutItem } from '@/app/api/actions/about';
import { AboutForm } from '@/components/admin/AboutForm/AboutForm';
import type { Locale } from '@/types/types';

interface AboutEditPageProps {
    params: Promise<{
        locale: Locale;
        id: string;
    }>;
}

export async function generateMetadata({
    params,
}: AboutEditPageProps): Promise<Metadata> {
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

const AboutEditPage = async ({ params }: AboutEditPageProps) => {
    const { locale, id } = await params;

    setRequestLocale(locale);

    const { FormT, AboutFormT, ResponseStatusT } = await getMessages();
    const data = await getAboutItem(Number(id));

    return (
        <NextIntlClientProvider
            messages={{
                FormT,
                AboutFormT,
                ResponseStatusT,
            }}
        >
            <AboutForm data={data} />
        </NextIntlClientProvider>
    );
};

export default AboutEditPage;
