import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Button } from '@/components/Button/Button';
import Title from '@/components/Title/Title';

import { Locale } from '@/types/types';

import styles from './page.module.scss';

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

    const t = useTranslations('NotFoundT');

    return (
        <>
            <Title>{t('title')}</Title>
            <div className={styles.description}>{t('description')}</div>

            <div className={styles.buttons}>
                <Button href="/">{t('toHome')}</Button>
            </div>
        </>
    );
};

export default NotFoundPage;
