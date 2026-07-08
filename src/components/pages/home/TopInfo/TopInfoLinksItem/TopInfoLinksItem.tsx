import Image from 'next/image';

import type { TopInfoLinksItemI } from '@/types/types';

import styles from './TopInfoLinksItem.module.scss';

export const TopInfoLinksItem = ({ title, icon, link }: TopInfoLinksItemI) => {
    return (
        <div className={styles.item}>
            <a
                href={link}
                className={styles.link}
                rel="noreferrer"
                target="_blank"
            >
                <Image src={icon} width={20} height={20} alt="" />
                <span>{title}</span>
            </a>
        </div>
    );
};
