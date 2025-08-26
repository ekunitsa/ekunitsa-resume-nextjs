import { getLocale, getTranslations } from 'next-intl/server';

import { Box } from '@/components/common/Box/Box';

import { LanguagesItem } from './LanguagesItem/LanguagesItem';

import styles from './Languages.module.scss';

import { getLanguagesList } from '@/app/api/actions/languages';

export const Languages = async () => {
    const t = await getTranslations('LanguagesT');
    const locale = await getLocale();

    const data = await getLanguagesList(locale);

    return (
        <Box corners={['topRight']} title={t('title')}>
            {data && data.length > 0 && (
                <div className={styles.list}>
                    {data.map((item) => (
                        <LanguagesItem
                            key={item.id}
                            label={item.label}
                            level={item.level}
                        />
                    ))}
                </div>
            )}
        </Box>
    );
};
