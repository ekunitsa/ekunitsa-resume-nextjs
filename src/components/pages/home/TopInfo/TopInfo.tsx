import dayjs from 'dayjs';
import { getTranslations } from 'next-intl/server';

import { TopInfoLinks } from './TopInfoLinks/TopInfoLinks';
import { TopInfoOpenToWork } from './TopInfoOpenToWork/TopInfoOpenToWork';

import styles from './TopInfo.module.scss';

import { getDashboard } from '@/app/api/actions/dashboard';

export const TopInfo = async () => {
    const t = await getTranslations('TopInfoT');
    const dashboardSettings = await getDashboard();

    // I started my career in front-end in May 2010
    const differenceInYears = dayjs().diff(dayjs('2010-05-01'), 'year');

    return (
        <div className={styles.wrapper}>
            <div className={styles.name}>{t('name')}</div>
            <div className={styles.position}>{t('position')}</div>
            <div className={styles.inTheProfession}>
                <span className={styles.blue}>
                    {t('years', { years: differenceInYears })}
                </span>{' '}
                {t('inTheProfession')}
            </div>

            {dashboardSettings?.openToWork && <TopInfoOpenToWork />}

            <div className={styles.links}>
                <TopInfoLinks />
            </div>
        </div>
    );
};
