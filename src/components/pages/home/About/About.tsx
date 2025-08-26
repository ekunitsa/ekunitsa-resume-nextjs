import dayjs from 'dayjs';
import { getLocale, getTranslations } from 'next-intl/server';

import { Box } from '@/components/common/Box/Box';

import { AboutItemI } from '@/types/types';

import { AboutItem } from './AboutItem/AboutItem';

import styles from './About.module.scss';

import { getAboutList } from '@/app/api/actions/about';
import { getDashboard } from '@/app/api/actions/dashboard';

export const About = async () => {
    const t = await getTranslations('AboutT');
    const locale = await getLocale();
    const dashboardSettings = await getDashboard();
    const data: AboutItemI[] = (await getAboutList(locale)) || [];

    if (data && dashboardSettings?.birthdayDate && dashboardSettings?.showAge) {
        data.unshift({
            description: t('yearsOld', {
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
                                description={item.description}
                                bold={item.bold}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </Box>
    );
};
