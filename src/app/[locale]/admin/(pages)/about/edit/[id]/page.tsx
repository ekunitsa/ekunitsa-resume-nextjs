import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from 'next-intl/server';

import { AboutForm } from '@/components/admin/about/AboutForm/AboutForm';

import { Locale } from '@/types/types';

import { getAboutItem } from '@/app/api/actions/about';

interface AboutEditPageProps {
    params: Promise<{
        locale: Locale;
        id: string;
    }>;
}

export async function generateMetadata({ params }: AboutEditPageProps) {
    const { locale } = await params;

    const t = await getTranslations({ locale, namespace: 'MetaDataT' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

const AboutEditPage = async ({ params }: AboutEditPageProps) => {
    const { locale, id } = await params;
    
    setRequestLocale(locale);

    const { FormT, AboutFormT } = await getMessages();
    const data = await getAboutItem(Number(id));

    return (
        <NextIntlClientProvider
            messages={{
                FormT,
                AboutFormT,
            }}
        >
            <AboutForm data={data} />
        </NextIntlClientProvider>
    );
};

export default AboutEditPage;
