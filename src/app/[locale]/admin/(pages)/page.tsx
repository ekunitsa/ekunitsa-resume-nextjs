import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from 'next-intl/server';
import { getDashboard } from '@/app/api/actions/dashboard';
import { DashboardForm } from '@/components/admin/DashboardForm/DashboardForm';
import type { Locale } from '@/types/types';

interface DashboardPageProps {
    params: Promise<{
        locale: Locale;
    }>;
}

export async function generateMetadata({
    params,
}: DashboardPageProps): Promise<Metadata> {
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

const DashboardPage = async ({ params }: DashboardPageProps) => {
    const { locale } = await params;

    setRequestLocale(locale);

    const { DashboardFormT, FormT, ResponseStatusT } = await getMessages();

    const data = await getDashboard();

    return (
        <NextIntlClientProvider
            messages={{
                DashboardFormT,
                FormT,
                ResponseStatusT,
            }}
        >
            <DashboardForm data={data} />
        </NextIntlClientProvider>
    );
};

export default DashboardPage;
