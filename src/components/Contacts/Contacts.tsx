import { CiLinkedin, CiMail, CiMap } from 'react-icons/ci';
import { PiTelegramLogoThin } from 'react-icons/pi';
import { useTranslations } from 'next-intl';

import { ContactsItemI } from '@/types/types';

import Box from '../Box/Box';

import ContactsItem from './ContactsItem/ContactsItem';

import styles from './Contacts.module.scss';

const Contacts = () => {
    const t = useTranslations('ContactsT');

    const data: ContactsItemI[] = [
        {
            icon: <CiMap className={styles.icon} />,
            title: t('country'),
        },
        {
            icon: <CiLinkedin className={styles.icon} />,
            link: 'https://www.linkedin.com/in/ekunitsa/',
            title: 'ekunitsa',
        },
        {
            icon: <CiMail className={styles.icon} />,
            link: 'mailto:i@ekunitsa.com',
            title: 'i@ekunitsa.com',
        },
        {
            icon: <PiTelegramLogoThin className={styles.icon} />,
            link: 'https://t.me/ekunitsa94',
            title: '@ekunitsa94',
        },
    ];

    return (
        <Box corners={['topLeft']} title={t('title')}>
            <div className={styles.list}>
                {data.map((item) => (
                    <ContactsItem
                        key={item.title}
                        title={item.title}
                        icon={item.icon}
                        link={item.link}
                    />
                ))}
            </div>
        </Box>
    );
};

export default Contacts;
