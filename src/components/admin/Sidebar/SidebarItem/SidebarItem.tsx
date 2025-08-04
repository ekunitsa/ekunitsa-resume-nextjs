import Link from 'next/link';

import { SidebarItemI } from '@/types/types';

import styles from './SidebarItem.module.scss';

const SidebarItem = ({ title, link }: SidebarItemI) => {
    return (
        <div className={styles.item}>
            <Link href={link} className={styles.link}>
                <span>{title}</span>
            </Link>
        </div>
    );
};

export default SidebarItem;
