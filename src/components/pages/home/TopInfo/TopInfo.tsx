import dayjs from 'dayjs';
import { getLocale, getTranslations } from 'next-intl/server';

import { TopInfoLinks } from './TopInfoLinks/TopInfoLinks';
import { TopInfoOpenToWork } from './TopInfoOpenToWork/TopInfoOpenToWork';

import styles from './TopInfo.module.scss';

import { getDashboard } from '@/app/api/actions/dashboard';
import { getMainInformation } from '@/app/api/actions/mainInformation';

export const TopInfo = async () => {
    const t = await getTranslations('TopInfoT');
    const locale = await getLocale();
    const dashboardSettings = await getDashboard();
    const mainInformation = await getMainInformation(locale);

    return (
        <div className={styles.wrapper}>
            {mainInformation?.name && (
                <div className={styles.name}>{mainInformation.name}</div>
            )}
            {mainInformation?.role && (
                <div className={styles.position}>{mainInformation?.role}</div>
            )}

            {dashboardSettings?.startWorkDate && (
                <div className={styles.inTheProfession}>
                    <span className={styles.blue}>
                        {t('years', {
                            years: dayjs().diff(
                                dayjs(dashboardSettings.startWorkDate),
                                'year',
                            ),
                        })}
                    </span>{' '}
                    {t('inTheProfession')}
                </div>
            )}

            {dashboardSettings?.openToWork && <TopInfoOpenToWork />}

            {(dashboardSettings?.codewars ||
                dashboardSettings?.stackoverflow ||
                dashboardSettings?.github) && (
                <div className={styles.links}>
                    <TopInfoLinks />
                </div>
            )}
        </div>
    );
};
