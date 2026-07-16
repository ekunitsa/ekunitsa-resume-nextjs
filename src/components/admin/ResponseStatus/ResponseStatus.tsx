'use client';

import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import styles from './ResponseStatus.module.scss';

interface ResponseStatusProps {
    status: 'error' | 'success';
    children: React.ReactNode;
}

export const ResponseStatus = ({ status, children }: ResponseStatusProps) => {
    const t = useTranslations('ResponseStatusT');

    return status === 'success' ? (
        <div className={classNames(styles.msg, styles.success)}>
            {t('successMsg')}
        </div>
    ) : (
        <div className={classNames(styles.msg, styles.error)}>{children}</div>
    );
};
