import { getLocale, getTranslations } from 'next-intl/server';

import { Box } from '@/components/common/Box/Box';

import SkillsItem from './SkillsItem/SkillsItem';

import styles from './Skills.module.scss';

import { getSkills } from '@/app/api/actions/skills';

export const Skills = async () => {
    const t = await getTranslations('SkillsT');
    const locale = await getLocale();

    const data = await getSkills(locale);

    if (data?.primary || data?.secondary) {
        return (
            <Box corners={['topRight', 'bottomLeft']} title={t('title')}>
                <div className={styles.wrapper}>
                    {data?.primary && (
                        <div className={styles.section}>
                            <div className={styles.title}>{t('primary')}</div>
                            <div className={styles.list}>
                                {data?.primary.map((item) => (
                                    <SkillsItem
                                        key={item}
                                        text={item}
                                        type="primary"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {data?.secondary && (
                        <div className={styles.section}>
                            <div className={styles.title}>{t('secondary')}</div>
                            <div className={styles.list}>
                                {data?.secondary.map((item) => (
                                    <SkillsItem
                                        key={item}
                                        text={item}
                                        type="secondary"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Box>
        );
    }
};
