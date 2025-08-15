import { CiBoxList, CiCalendar, CiClock2, CiDesktop } from 'react-icons/ci';
import { useTranslations } from 'next-intl';

import { ExperienceItemI } from '@/types/types';

import styles from './ExperienceItem.module.scss';

export const ExperienceItem = ({
    name,
    position,
    workTime,
    dates,
    term,
    description,
    technology,
}: ExperienceItemI) => {
    const t = useTranslations('ExperienceItemT');

    return (
        <div className={styles.item}>
            <div className={styles.name}>
                {name} <span className={styles.position}>({position})</span>
            </div>
            {workTime && (
                <div className={styles.row}>
                    <div className={styles.iconWrapper}>
                        <CiClock2 className={styles.icon} />
                    </div>
                    <div className={styles.time}>{workTime}</div>
                </div>
            )}
            {dates && (
                <div className={styles.row}>
                    <div className={styles.iconWrapper}>
                        <CiCalendar className={styles.icon} />
                    </div>
                    <div className={styles.dates}>
                        {dates}{' '}
                        {term && <span className={styles.term}>({term})</span>}
                    </div>
                </div>
            )}
            {description && (
                <div className={styles.row}>
                    <div className={styles.iconWrapper}>
                        <CiBoxList className={styles.icon} />
                    </div>
                    <div className={styles.description}>{description}</div>
                </div>
            )}
            {technology && (
                <div className={styles.row}>
                    <div className={styles.iconWrapper}>
                        <CiDesktop className={styles.icon} />
                    </div>
                    <div className={styles.technology}>
                        {t('technology')} {technology}
                    </div>
                </div>
            )}
        </div>
    );
};
