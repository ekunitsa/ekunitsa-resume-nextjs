import { getLocale, getTranslations } from 'next-intl/server';
import { getSkills } from '@/app/api/actions/skills';
import { Box } from '@/components/common/Box/Box';
import { Skill } from './Skill/Skill';

import styles from './Skills.module.scss';

export const Skills = async () => {
    const t = await getTranslations('SkillsT');
    const locale = await getLocale();

    const data = await getSkills(locale);

    if (data?.primary || data?.secondary || data?.ai) {
        return (
            <Box
                corners={[
                    'topRight',
                    'bottomLeft',
                ]}
                title={t('title')}
            >
                <div className={styles.wrapper}>
                    {data?.primary && (
                        <Skill
                            data={data?.primary}
                            tagType="primary"
                            title={t('primary')}
                        />
                    )}

                    {data?.secondary && (
                        <Skill
                            data={data?.secondary}
                            tagType="secondary"
                            title={t('secondary')}
                        />
                    )}

                    {data?.ai && (
                        <Skill data={data?.ai} tagType="ai" title={t('ai')} />
                    )}
                </div>
            </Box>
        );
    }
};
