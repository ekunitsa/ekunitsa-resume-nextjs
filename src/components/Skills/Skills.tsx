import { useTranslations } from 'next-intl';

import Box from '../Box/Box';

import SkillsItem from './SkillsItem/SkillsItem';

import styles from './Skills.module.scss';

const Skills = () => {
    const t = useTranslations('SkillsT');

    const dataPrimary: string[] = [
        'HTML',
        'Twig',
        'ISML',
        'CSS',
        '(SASSSCSS)',
        'ECSS',
        'BEM',
        'NPM',
        'JS (ES6+)',
        'TS',
        'React',
        'Redux',
        'Next.js',
        'REST API',
        'AJAX',
        'JQuery',
        'GIT',
        'Email markup',
        'Wordpress',
        'Opencart',
        'SFCC',
    ];
    const dataSecondary: string[] = [
        'Webpack',
        'Eslint',
        'Prettier',
        'Smarty',
        'SVG',
        'WEBP',
        'AVIF',
        'Node.js',
        'Express',
        'Bootstrap 3/4/5',
        'Highcharts.js',
        'Chart.js',
        'SVN',
        'Yarn',
        'Jest',
        'Symfony + sonata',
        'SSH',
        'Joomla',
    ];

    return (
        <Box corners={['topRight', 'bottomLeft']} title={t('title')}>
            <SkillsItem text={'Webpack'} />
        </Box>
    );
};

export default Skills;
