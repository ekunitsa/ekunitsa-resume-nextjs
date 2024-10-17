import { useTranslations } from 'next-intl';

import AboutItem from './AboutItem/AboutItem';

import styles from './About.module.scss';

const About = () => {
    const t = useTranslations('AboutT');

    return (
        <>
            About <AboutItem />
        </>
    );
};

export default About;
