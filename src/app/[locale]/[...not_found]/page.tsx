import { redirect } from 'next/navigation';
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

    redirect('/');

    return null;
};

export default NotFoundPage;
