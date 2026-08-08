import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { AboutList } from '@/components/admin/AboutList/AboutList';
import type { Locale } from '@/types/types';

interface AboutPageProps {
    params: Promise<{
        locale: Locale;
    }>;
}

export async function generateMetadata({
    params,
}: AboutPageProps): Promise<Metadata> {
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

const AboutPage = async () => {
    const { FormT, AboutListT } = await getMessages();

    return (
        <NextIntlClientProvider
            messages={{
                FormT,
                AboutListT,
            }}
        >
            <AboutList />
        </NextIntlClientProvider>
    );
};

export default AboutPage;
