import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Locale } from '@/types/types';

interface NotFoundPageProps {
    params: {
        locale: Locale;
    };
}

export async function generateMetadata({
    params: { locale },
}: NotFoundPageProps) {
    const t = await getTranslations({ locale, namespace: 'MetaDataT' });

    return {
        title: t('notFoundTitle'),
        description: t('notFoundDescription'),
    };
}

const NotFoundPage = ({ params: { locale } }: NotFoundPageProps) => {
    unstable_setRequestLocale(locale);

    const t = useTranslations('NotFoundPageT');

    return <>{t('notFoundTitle')}</>;
};

export default NotFoundPage;
