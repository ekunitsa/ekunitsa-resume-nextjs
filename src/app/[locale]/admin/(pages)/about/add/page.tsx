import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { AboutForm } from '@/components/admin/AboutForm/AboutForm';
import type { Locale } from '@/types/types';

interface AboutAddPageProps {
    params: Promise<{
        locale: Locale;
    }>;
}

export async function generateMetadata({
    params,
}: AboutAddPageProps): Promise<Metadata> {
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

const AboutAddPage = async () => {
    const { FormT, AboutFormT, ResponseStatusT } = await getMessages();

    return (
        <NextIntlClientProvider
            messages={{
                FormT,
                AboutFormT,
                ResponseStatusT,
            }}
        >
            <AboutForm />
        </NextIntlClientProvider>
    );
};

export default AboutAddPage;
