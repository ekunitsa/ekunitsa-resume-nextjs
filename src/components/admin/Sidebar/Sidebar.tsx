import { useTranslations } from 'next-intl';

import { Box } from '@/components/common/Box/Box';

import { SidebarItemI } from '@/types/types';

import { SidebarItem } from './SidebarItem/SidebarItem';

import styles from './Sidebar.module.scss';

export const Sidebar = () => {
    const t = useTranslations('SidebarT');

    const data: SidebarItemI[] = [
        {
            link: '/admin',
            title: t('menuDashboard'),
        },
        {
            link: '/admin/languages',
            title: t('menuLanguages'),
        },
        {
            link: '/admin/skills',
            title: t('menuSkills'),
        },
    ];

    return (
        <Box title={t('title')} corners={['topLeft', 'bottomRight']}>
            <div className={styles.list}>
                {data.map((item) => (
                    <SidebarItem
                        key={item.title}
                        title={item.title}
                        link={item.link}
                    />
                ))}
            </div>
        </Box>
    );
};
