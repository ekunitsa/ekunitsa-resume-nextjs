import classNames from 'classnames';

import { AboutItemI } from '@/types/types';

import styles from './AboutItem.module.scss';

const AboutItem = ({ text, bold }: AboutItemI) => {
    return (
        <li
            className={classNames(styles.item, {
                [styles.bold]: bold,
            })}
        >
            {text}
        </li>
    );
};

export default AboutItem;
