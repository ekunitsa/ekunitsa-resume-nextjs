import { useTranslations } from 'next-intl';

import Box from '../Box/Box';

import ExperienceItem from './ExperienceItem/ExperienceItem';

import styles from './Experience.module.scss';

const Experience = () => {
    const t = useTranslations('ExperienceT');

    return (
        <Box corners={['topLeft']} height100percent title={t('title')}>
            Experience <ExperienceItem />
        </Box>
    );
};

export default Experience;
