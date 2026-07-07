import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Button } from '@/components/common/Button/Button';
import { Title } from '@/components/common/Title/Title';
import type { Locale } from '@/types/types';
import styles from './page.module.scss';

interface NotFoundPageProps {
    params: Promise<{
        locale: Locale;
    }>;
}

export async function generateMetadata({
    params,
}: NotFoundPageProps): Promise<Metadata> {
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

const NotFoundPage = async ({ params }: NotFoundPageProps) => {
    const { locale } = await params;

    setRequestLocale(locale);

    const t = await getTranslations('NotFoundT');

    return (
        <>
            <Title>{t('title')}</Title>
            <div className={styles.description}>{t('description')}</div>

            <div className={styles.buttons}>
                <NextIntlClientProvider>
                    <Button href="/">{t('toHome')}</Button>
                </NextIntlClientProvider>
            </div>
        </>
    );
};

export default NotFoundPage;
