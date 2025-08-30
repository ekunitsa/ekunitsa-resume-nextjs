import { CiBoxList, CiCalendar, CiClock2, CiDesktop } from 'react-icons/ci';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { getLocale, getTranslations } from 'next-intl/server';

import { capitalizeFirst } from '@/utils/utils';

import { ExperienceDataI } from '@/types/types';

import 'dayjs/locale/en';
import 'dayjs/locale/uk';

import styles from './ExperienceItem.module.scss';

dayjs.extend(duration);
dayjs.extend(localizedFormat);

interface ExperienceItemProps {
    data: ExperienceDataI;
}

export const ExperienceItem = async ({ data }: ExperienceItemProps) => {
    const t = await getTranslations('ExperienceItemT');
    const locale = await getLocale();

    const startDate = capitalizeFirst(
        dayjs(data.workDateStart).locale(locale).format('MMMM YYYY'),
    );

    const endDate = capitalizeFirst(
        data.workNow
            ? t('now')
            : dayjs(data.workDateEnd).locale(locale).format('MMMM YYYY'),
    );

    const getDiffString = () => {
        const diffDate =
            dayjs(data.workDateEnd).diff(dayjs(data.workDateStart), 'month') +
            1; // +1 to get human WORKED months, as it happens in LinkedIn (including the last month).
        const diffYears = Math.floor(diffDate / 12);
        const diffMonths = diffDate % 12;

        const diffParts = [];

        if (diffYears > 0) diffParts.push(t('years', { years: diffYears }));
        if (diffMonths > 0) diffParts.push(t('months', { months: diffMonths }));

        return diffParts.join(' ');
    };

    return (
        <div className={styles.item}>
            <div className={styles.name}>
                {data.companyName}{' '}
                <span className={styles.position}>({data.role})</span>
            </div>

            <div className={styles.row}>
                <div className={styles.iconWrapper}>
                    <CiClock2 className={styles.icon} />
                </div>
                <div className={styles.time}>{data.workTime}</div>
            </div>

            <div className={styles.row}>
                <div className={styles.iconWrapper}>
                    <CiCalendar className={styles.icon} />
                </div>
                <div className={styles.dates}>
                    {startDate} - {endDate}{' '}
                    {!data.workNow && (
                        <span className={styles.diff}>({getDiffString()})</span>
                    )}
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.iconWrapper}>
                    <CiBoxList className={styles.icon} />
                </div>
                <div className={styles.description}>{data.description}</div>
            </div>

            <div className={styles.row}>
                <div className={styles.iconWrapper}>
                    <CiDesktop className={styles.icon} />
                </div>
                <div className={styles.technology}>
                    {t('technologies')} {data.technologies}
                </div>
            </div>
        </div>
    );
};
