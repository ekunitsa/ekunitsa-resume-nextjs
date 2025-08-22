import dayjs from 'dayjs';
import { getTranslations } from 'next-intl/server';

import { TopInfoLinks } from './TopInfoLinks/TopInfoLinks';
import { TopInfoOpenToWork } from './TopInfoOpenToWork/TopInfoOpenToWork';

import styles from './TopInfo.module.scss';

import { getDashboard } from '@/app/api/actions/dashboard';

export const TopInfo = async () => {
    const t = await getTranslations('TopInfoT');
    const dashboardSettings = await getDashboard();

    return (
        <div className={styles.wrapper}>
            <div className={styles.name}>{t('name')}</div>
            <div className={styles.position}>{t('position')}</div>

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
