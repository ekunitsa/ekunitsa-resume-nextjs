import { useTranslations } from 'next-intl';

import { Box } from '@/components/common/Box/Box';

import { ExperienceItemI } from '@/types/types';

import { ExperienceItem } from './ExperienceItem/ExperienceItem';

import styles from './Experience.module.scss';

export const Experience = () => {
    const t = useTranslations('ExperienceT');

    // A big and scary data object
    // But we need to use translations, and, we don't have any API.
    // So as it is :)

    const data: ExperienceItemI[] = [
        {
            name: t('project7name'),
            position: t('project7position'),
            workTime: t('project7workTime'),
            dates: t('project7dates'),
            description: t('project7description'),
            technology: t('project7technology'),
        },
        {
            name: t('project6name'),
            position: t('project6position'),
            workTime: t('project6workTime'),
            dates: t('project6dates'),
            term: t('project6term'),
            description: t('project6description'),
            technology: t('project6technology'),
        },
        {
            name: t('project5name'),
            position: t('project5position'),
            workTime: t('project5workTime'),
            dates: t('project5dates'),
            term: t('project5term'),
            description: t('project5description'),
            technology: t('project5technology'),
        },
        {
            name: t('project4name'),
            position: t('project4position'),
            workTime: t('project4workTime'),
            dates: t('project4dates'),
            term: t('project4term'),
            description: t('project4description'),
            technology: t('project4technology'),
        },
        {
            name: t('project3name'),
            position: t('project3position'),
            workTime: t('project3workTime'),
            dates: t('project3dates'),
            term: t('project3term'),
            description: t('project3description'),
            technology: t('project3technology'),
        },
        {
            name: t('project2name'),
            position: t('project2position'),
            workTime: t('project2workTime'),
            dates: t('project2dates'),
            term: t('project2term'),
            description: t('project2description'),
            technology: t('project2technology'),
        },
        {
            name: t('project1name'),
            position: t('project1position'),
            dates: t('project1dates'),
            term: t('project1term'),
            description: t('project1description'),
        },
    ];

    return (
        <Box corners={['topLeft']} height100percent title={t('title')}>
            <div className={styles.list}>
                {data.map((item, index) => (
                    <ExperienceItem
                        key={index}
                        name={item.name}
                        position={item.position}
                        workTime={item.workTime}
                        dates={item.dates}
                        term={item.term}
                        description={item.description}
                        technology={item.technology}
                    />
                ))}
            </div>
        </Box>
    );
};
