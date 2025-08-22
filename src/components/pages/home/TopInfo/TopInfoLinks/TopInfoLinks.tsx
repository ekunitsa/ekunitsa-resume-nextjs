import { getTranslations } from 'next-intl/server';

import { TopInfoLinksItemI } from '@/types/types';

import { TopInfoLinksItem } from '../TopInfoLinksItem/TopInfoLinksItem';

import styles from './TopInfoLinks.module.scss';

import { getDashboard } from '@/app/api/actions/dashboard';

export const TopInfoLinks = async () => {
    const t = await getTranslations('TopInfoLinksT');
    const dashboardSettings = await getDashboard();

    const links: TopInfoLinksItemI[] = [];

    if (dashboardSettings?.codewars) {
        links.push({
            icon: '/static/img/svg/codewars.svg',
            link: dashboardSettings.codewars,
            title: t('codewars'),
        });
    }

    if (dashboardSettings?.stackoverflow) {
        links.push({
            icon: '/static/img/svg/stackoverflow.svg',
            link: dashboardSettings.stackoverflow,
            title: t('stackoverflow'),
        });
    }

    if (dashboardSettings?.github) {
        links.push({
            icon: '/static/img/svg/github.svg',
            link: dashboardSettings.github,
            title: t('github'),
        });
    }

    return (
        <div className={styles.wrapper}>
            {links.map((item) => (
                <TopInfoLinksItem
                    key={item.title}
                    title={item.title}
                    link={item.link}
                    icon={item.icon}
                />
            ))}
        </div>
    );
};
