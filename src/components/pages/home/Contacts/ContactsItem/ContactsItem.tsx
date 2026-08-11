import type { ContactsItemI } from '@/types/types';

import styles from './ContactsItem.module.scss';

export const ContactsItem = ({ title, link, icon }: ContactsItemI) => {
    const opensInNewTab = link && !link.startsWith('mailto:');

    return (
        <div className={styles.item}>
            {link ? (
                <a
                    href={link}
                    target={opensInNewTab ? '_blank' : undefined}
                    rel={opensInNewTab ? 'noreferrer' : undefined}
                    className={styles.link}
                >
                    {icon}
                    <span>{title}</span>
                </a>
            ) : (
                <span className={styles.nolink}>
                    {icon}
                    <span>{title}</span>
                </span>
            )}
        </div>
    );
};
