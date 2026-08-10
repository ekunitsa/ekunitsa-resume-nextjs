import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/common/Button/Button';
import { Title } from '@/components/common/Title/Title';
import styles from './not-found.module.scss';

export default async function NotFoundPage() {
    const t = await getTranslations('NotFoundT');

    return (
        <>
            <Title>{t('title')}</Title>
            <div className={styles.description}>{t('description')}</div>

            <div className={styles.buttons}>
                <NextIntlClientProvider>
                    <Button href={'/'}>{t('toHome')}</Button>
                </NextIntlClientProvider>
            </div>
        </>
    );
}
