import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from 'next-intl/server';
import { getMainInformation } from '@/app/api/actions/mainInformation';
import { GlobalForm } from '@/components/admin/GlobalForm/GlobalForm';
import type { Locale } from '@/types/types';

interface GlobalPageProps {
    params: Promise<{
        locale: Locale;
    }>;
}

export async function generateMetadata({
    params,
}: GlobalPageProps): Promise<Metadata> {
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

const GlobalPage = async ({ params }: GlobalPageProps) => {
    const { locale } = await params;

    setRequestLocale(locale);

    const { GlobalFormT, FormT, ResponseStatusT } = await getMessages();

    const data = await getMainInformation(locale);

    return (
        <NextIntlClientProvider
            messages={{
                GlobalFormT,
                FormT,
                ResponseStatusT,
            }}
        >
            <GlobalForm data={data} />
        </NextIntlClientProvider>
    );
};

export default GlobalPage;
