import { useTranslations } from 'next-intl';

import SkillsItem from './SkillsItem/SkillsItem';

import styles from './Skills.module.scss';

const Skills = () => {
    const t = useTranslations('SkillsT');

    return (
        <>
            Skills <SkillsItem />
        </>
    );
};

export default Skills;
