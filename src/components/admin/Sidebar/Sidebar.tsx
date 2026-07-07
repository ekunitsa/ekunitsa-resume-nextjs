import { useTranslations } from 'next-intl';

import { Box } from '@/components/common/Box/Box';

import type { SidebarItemI } from '@/types/types';
import styles from './Sidebar.module.scss';
import { SidebarItem } from './SidebarItem/SidebarItem';

export const Sidebar = () => {
    const t = useTranslations('SidebarT');

    const data: SidebarItemI[] = [
        {
            link: '/admin',
            title: t('menuDashboard'),
        },
        {
            link: '/admin/global',
            title: t('menuGlobal'),
        },
        {
            link: '/admin/about',
            title: t('menuAbout'),
        },
        {
            link: '/admin/experience',
            title: t('menuExperience'),
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
        <Box
            title={t('title')}
            corners={[
                'topLeft',
                'bottomRight',
            ]}
        >
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
