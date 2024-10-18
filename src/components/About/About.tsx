import { useTranslations } from 'next-intl';

import Box from '../Box/Box';

import AboutItem from './AboutItem/AboutItem';

import styles from './About.module.scss';

const About = () => {
    const t = useTranslations('AboutT');

    return (
        <Box corners={['topRight']} height100percent title={t('title')}>
            <AboutItem />
        </Box>
    );
};

export default About;
