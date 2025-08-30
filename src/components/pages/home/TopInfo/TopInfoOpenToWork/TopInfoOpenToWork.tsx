import { useTranslations } from 'next-intl';

import styles from './TopInfoOpenToWork.module.scss';

export const TopInfoOpenToWork = () => {
    const t = useTranslations('TopInfoOpenToWorkT');

    return <div className={styles.description}>{t('description')}</div>;
};
