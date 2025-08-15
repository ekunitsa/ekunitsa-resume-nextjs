import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

import { TopInfoLinks } from './TopInfoLinks/TopInfoLinks';

import styles from './TopInfo.module.scss';

interface TopInfoProps {
    open?: boolean;
}

export const TopInfo = ({ open }: TopInfoProps) => {
    const t = useTranslations('TopInfoT');

    // I started my career in front-end in May 2010
    const differenceInYears = dayjs().diff(dayjs('2010-05-01'), 'year');

    return (
        <div className={styles.wrapper}>
            <div className={styles.name}>{t('name')}</div>
            <div className={styles.position}>{t('position')}</div>
            {open && <div className={styles.open}>{t('open')}</div>}
            <div className={styles.inTheProfession}>
                <span className={styles.blue}>
                    {t('years', { years: differenceInYears })}
                </span>{' '}
                {t('inTheProfession')}
            </div>
            <div className={styles.links}>
                <TopInfoLinks />
            </div>
        </div>
    );
};
