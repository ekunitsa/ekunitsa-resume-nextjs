import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from 'next-intl/server';
import { getSummary } from '@/app/api/actions/summary';
import { SummaryForm } from '@/components/admin/SummaryForm/SummaryForm';
import type { Locale } from '@/types/types';

interface SummaryPageProps {
    params: Promise<{
        locale: Locale;
    }>;
}

export async function generateMetadata({
    params,
}: SummaryPageProps): Promise<Metadata> {
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

const SummaryPage = async ({ params }: SummaryPageProps) => {
    const { locale } = await params;

    setRequestLocale(locale);

    const { SummaryFormT, FormT, ResponseStatusT } = await getMessages();

    const data = await getSummary(locale);

    return (
        <NextIntlClientProvider
            messages={{
                SummaryFormT,
                FormT,
                ResponseStatusT,
            }}
        >
            <SummaryForm data={data} />
        </NextIntlClientProvider>
    );
};

export default SummaryPage;
