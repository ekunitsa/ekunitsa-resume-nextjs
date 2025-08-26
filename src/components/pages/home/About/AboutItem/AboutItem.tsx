import classNames from 'classnames';

import { AboutItemI } from '@/types/types';

import styles from './AboutItem.module.scss';

export const AboutItem = ({ description, bold }: AboutItemI) => {
    return (
        <li
            className={classNames(styles.item, {
                [styles.bold]: bold,
            })}
        >
            {description}
        </li>
    );
};
