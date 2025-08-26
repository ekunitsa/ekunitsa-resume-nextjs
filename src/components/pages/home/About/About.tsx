import dayjs from 'dayjs';
import { getTranslations } from 'next-intl/server';

import { Box } from '@/components/common/Box/Box';

import { AboutItemI } from '@/types/types';

import { AboutItem } from './AboutItem/AboutItem';

import styles from './About.module.scss';

import { getDashboard } from '@/app/api/actions/dashboard';

export const About = async () => {
    const t = await getTranslations('AboutT');
    const dashboardSettings = await getDashboard();

    const data: AboutItemI[] = [
        {
            text: t('about2'),
        },
        {
            text: t('about3'),
        },
        {
            text: t('about4'),
        },
        {
            text: t('about5'),
        },
        {
            text: t('about6'),
        },
        {
            text: t('about7'),
            bold: true,
        },
    ];

    if (data && dashboardSettings?.birthdayDate && dashboardSettings?.showAge) {
        data.unshift({
            text: t('yearsOld', {
                years: dayjs().diff(
                    dayjs(dashboardSettings.birthdayDate),
                    'year',
                ),
            }),
        });
    }

    return (
        <Box corners={['topRight']} fullHeight title={t('title')}>
            {data && data.length > 0 && (
                <div className={styles.list}>
                    <ul className={styles.ul}>
                        {data.map((item, index) => (
                            <AboutItem
                                key={index}
                                text={item.text}
                                bold={item.bold}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </Box>
    );
};
