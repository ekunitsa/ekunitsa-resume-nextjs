import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import Title from '@/components/Title/Title';

import { Locale } from '@/types/types';

import styles from './page.module.scss';

import { Button } from '@mui/material';

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

            <Button variant="contained" size="large" href="/">
                {t('toHome')}
            </Button>
        </>
    );
};

export default NotFoundPage;
