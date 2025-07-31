import { useTranslations } from 'next-intl';

import Box from '@/components/common/Box/Box';

import SkillsItem from './SkillsItem/SkillsItem';

import styles from './Skills.module.scss';

const Skills = () => {
    const t = useTranslations('SkillsT');

    const dataPrimary: string[] = [
        'React',
        'Redux',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'NX',
        'Storybook',
        'Webpack',
        'Eslint',
        'Prettier',
        'JQuery',
        'Markup',
    ];
    const dataSecondary: string[] = [
        'HTML',
        'ISML',
        'Twig',
        'Smarty',
        'CSS',
        'SASS/SCSS',
        'ECSS/BEM',
        'NPM',
        'REST API',
        'AJAX',
        'Email markup',
        'SVG',
        'WEBP/AVIF',
        'Node.js + Express',
        'Bootstrap 3/4/5',
        'Chakra UI',
        'Highcharts.js',
        'Chart.js',
        'GIT/SVN',
        'Jest',
        'Symfony + sonata',
        'Wordpress',
        'Opencart',
        'SFCC',
        'Joomla',
    ];

    return (
        <Box corners={['topRight', 'bottomLeft']} title={t('title')}>
            <div className={styles.wrapper}>
                <div className={styles.section}>
                    <div className={styles.title}>{t('primary')}</div>
                    <div className={styles.list}>
                        {dataPrimary.map((item) => (
                            <SkillsItem key={item} text={item} type="primary" />
                        ))}
                    </div>
                </div>

                <div className={styles.section}>
                    <div className={styles.title}>{t('secondary')}</div>
                    <div className={styles.list}>
                        {dataSecondary.map((item) => (
                            <SkillsItem
                                key={item}
                                text={item}
                                type="secondary"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default Skills;
