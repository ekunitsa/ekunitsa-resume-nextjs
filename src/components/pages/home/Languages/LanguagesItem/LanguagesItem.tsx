import { LanguagesItemI } from '@/types/types';

import styles from './LanguagesItem.module.scss';

export const LanguagesItem = ({ label, level }: LanguagesItemI) => {
    return (
        <div className={styles.item}>
            <div>{label}</div>
            <div>{level}</div>
        </div>
    );
};
