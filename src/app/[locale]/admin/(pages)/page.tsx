import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from 'next-intl/server';

import { DashboardForm } from '@/components/admin/DashboardForm/DashboardForm';

import { Locale } from '@/types/types';

import { getDashboard } from '@/app/api/actions/dashboard';

interface DashboardPageProps {
    params: {
        locale: Locale;
    };
}

export async function generateMetadata({
    params: { locale },
}: DashboardPageProps) {
    const t = await getTranslations({ locale, namespace: 'MetaDataT' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

const DashboardPage = async ({ params: { locale } }: DashboardPageProps) => {
    setRequestLocale(locale);

    const { DashboardFormT, FormT } = await getMessages();

    const data = await getDashboard();

    return (
        <NextIntlClientProvider
            messages={{
                DashboardFormT,
                FormT,
            }}
        >
            <DashboardForm data={data} />
        </NextIntlClientProvider>
    );
};

export default DashboardPage;
