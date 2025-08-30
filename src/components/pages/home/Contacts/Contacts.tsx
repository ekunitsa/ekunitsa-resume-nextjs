import { CiLinkedin, CiMail, CiMap } from 'react-icons/ci';
import { PiTelegramLogoThin } from 'react-icons/pi';
import { getLocale, getTranslations } from 'next-intl/server';

import { Box } from '@/components/common/Box/Box';

import { ContactsItemI } from '@/types/types';

import { ContactsItem } from './ContactsItem/ContactsItem';

import styles from './Contacts.module.scss';

import { getDashboard } from '@/app/api/actions/dashboard';
import { getMainInformation } from '@/app/api/actions/mainInformation';

export const Contacts = async () => {
    const t = await getTranslations('ContactsT');
    const locale = await getLocale();
    const dashboardSettings = await getDashboard();
    const mainInformation = await getMainInformation(locale);

    const data: ContactsItemI[] = [
        {
            icon: <CiMap className={styles.icon} />,
            title: mainInformation?.place || '',
        },
    ];

    if (dashboardSettings?.linkedin) {
        data.push({
            icon: <CiLinkedin className={styles.icon} />,
            link: dashboardSettings.linkedin,
            title: t('linkedin'),
        });
    }

    if (dashboardSettings?.email) {
        data.push({
            icon: <CiMail className={styles.icon} />,
            link: `mailto:${dashboardSettings.email}`,
            title: dashboardSettings.email,
        });
    }

    if (dashboardSettings?.telegram) {
        data.push({
            icon: <PiTelegramLogoThin className={styles.icon} />,
            link: dashboardSettings.telegram,
            title: `@${dashboardSettings.telegram.split('/').pop()}`,
        });
    }

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
