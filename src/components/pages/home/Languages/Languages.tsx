import { useTranslations } from 'next-intl';

import { Box } from '@/components/common/Box/Box';

import { LanguagesItemI } from '@/types/types';

import { LanguagesItem } from './LanguagesItem/LanguagesItem';

import styles from './Languages.module.scss';

export const Languages = () => {
    const t = useTranslations('LanguagesT');

    const data: LanguagesItemI[] = [
        {
            title: t('ua'),
            level: t('fluent'),
        },
        {
            title: t('ru'),
            level: t('fluent'),
        },
        {
            title: t('en'),
            level: t('intermediate'),
        },
    ];

    return (
        <Box corners={['topRight']} title={t('title')}>
            <div className={styles.list}>
                {data.map((item) => (
                    <LanguagesItem
                        key={item.title}
                        title={item.title}
                        level={item.level}
                    />
                ))}
            </div>
        </Box>
    );
};
