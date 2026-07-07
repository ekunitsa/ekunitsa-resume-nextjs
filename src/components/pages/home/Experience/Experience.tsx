import { getLocale, getTranslations } from 'next-intl/server';
import { getExperienceList } from '@/app/api/actions/experience';
import { Box } from '@/components/common/Box/Box';
import type { ExperienceDataI } from '@/types/types';

import styles from './Experience.module.scss';
import { ExperienceItem } from './ExperienceItem/ExperienceItem';

export const Experience = async () => {
    const t = await getTranslations('ExperienceT');
    const locale = await getLocale();

    const data = await getExperienceList(locale);

    return (
        <Box
            corners={[
                'topLeft',
            ]}
            fullHeight
            title={t('title')}
        >
            {data && data.length > 0 && (
                <div className={styles.list}>
                    {data.map((item) => (
                        <ExperienceItem
                            key={item.id}
                            data={item as ExperienceDataI}
                        />
                    ))}
                </div>
            )}
        </Box>
    );
};
