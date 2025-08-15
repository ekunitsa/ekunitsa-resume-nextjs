import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Dashboard } from '@/components/admin/Dashboard/Dashboard';

import { Locale } from '@/types/types';

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

const DashboardPage = ({ params: { locale } }: DashboardPageProps) => {
    setRequestLocale(locale);

    const { DashboardT } = useMessages();

    return (
        <NextIntlClientProvider
            messages={{
                DashboardT,
            }}
        >
            <Dashboard />
        </NextIntlClientProvider>
    );
};

export default DashboardPage;
