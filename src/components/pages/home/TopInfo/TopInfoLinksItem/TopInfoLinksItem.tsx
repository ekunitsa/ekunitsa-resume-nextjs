import Image from 'next/image';

import { TopInfoLinksItemI } from '@/types/types';

import styles from './TopInfoLinksItem.module.scss';

const TopInfoLinksItem = ({ title, icon, link }: TopInfoLinksItemI) => {
    return (
        <div className={styles.item}>
            <a href={link} className={styles.link} target="_blank">
                <Image src={icon} width={20} height={20} alt={title} />
                <span>{title}</span>
            </a>
        </div>
    );
};

export default TopInfoLinksItem;
