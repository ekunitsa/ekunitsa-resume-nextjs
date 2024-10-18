import { LanguagesItemI } from '@/types/types';

import styles from './LanguagesItem.module.scss';

const LanguagesItem = ({ title, level }: LanguagesItemI) => {
    return (
        <div className={styles.item}>
            <div>{title}</div>
            <div>{level}</div>
        </div>
    );
};

export default LanguagesItem;
