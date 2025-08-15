import { LanguagesItemI } from '@/types/types';

import styles from './LanguagesItem.module.scss';

export const LanguagesItem = ({ title, level }: LanguagesItemI) => {
    return (
        <div className={styles.item}>
            <div>{title}</div>
            <div>{level}</div>
        </div>
    );
};
