import { useTranslations } from 'next-intl';

import Box from '../Box/Box';

import SkillsItem from './SkillsItem/SkillsItem';

import styles from './Skills.module.scss';

const Skills = () => {
    const t = useTranslations('SkillsT');

    return (
        <Box corners={['topRight', 'bottomLeft']} title={t('title')}>
            Skills <SkillsItem />
        </Box>
    );
};

export default Skills;
