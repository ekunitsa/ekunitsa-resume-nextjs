import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

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
    unstable_setRequestLocale(locale);

    return <>Admin DashboardPage</>;
};

export default DashboardPage;
