import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Button } from '@/components/common/Button/Button';
import { Title } from '@/components/common/Title/Title';

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
        title: t('title'),
        description: t('description'),
    };
}

const NotFoundPage = ({ params: { locale } }: NotFoundPageProps) => {
    setRequestLocale(locale);

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
