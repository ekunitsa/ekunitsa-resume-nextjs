'use client';

import classNames from 'classnames';

import { Link, usePathname } from '@/configs/i18n/routing';

import { SidebarItemI } from '@/types/types';

import styles from './SidebarItem.module.scss';

export const SidebarItem = ({ title, link }: SidebarItemI) => {
    const pathname = usePathname();

    return (
        <div className={styles.item}>
            <Link
                href={link}
                className={classNames(styles.link, {
                    [styles.active]: link === pathname,
                })}
            >
                <span>{title}</span>
            </Link>
        </div>
    );
};
