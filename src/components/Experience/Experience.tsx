import { useTranslations } from 'next-intl';

import ExperienceItem from './ExperienceItem/ExperienceItem';

import styles from './Experience.module.scss';

const Experience = () => {
    const t = useTranslations('ExperienceT');

    return (
        <>
            Experience <ExperienceItem />
        </>
    );
};

export default Experience;
