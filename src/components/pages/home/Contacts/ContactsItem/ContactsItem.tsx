import { ContactsItemI } from '@/types/types';

import styles from './ContactsItem.module.scss';

export const ContactsItem = ({ title, link, icon }: ContactsItemI) => {
    return (
        <div className={styles.item}>
            {link ? (
                <>
                    <a href={link} target="_blank" className={styles.link}>
                        {icon}
                        <span>{title}</span>
                    </a>
                </>
            ) : (
                <>
                    <span className={styles.nolink}>
                        {icon}
                        <span>{title}</span>
                    </span>
                </>
            )}
        </div>
    );
};
