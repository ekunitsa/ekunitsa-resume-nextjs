import { useTranslations } from 'next-intl';

import { TopInfoLinksItemI } from '@/types/types';

import { TopInfoLinksItem } from '../TopInfoLinksItem/TopInfoLinksItem';

import styles from './TopInfoLinks.module.scss';

export const TopInfoLinks = () => {
    const t = useTranslations('TopInfoLinksT');

    const links: TopInfoLinksItemI[] = [
        {
            icon: '/static/img/svg/codewars.svg',
            link: 'https://www.codewars.com/users/ekunitsa/completed',
            title: t('codewars'),
        },
        {
            icon: '/static/img/svg/stackoverflow.svg',
            link: 'https://ru.stackoverflow.com/users/25785/crus',
            title: t('stackoverflow'),
        },
        {
            icon: '/static/img/svg/github.svg',
            link: 'https://github.com/ekunitsa?tab=repositories',
            title: t('github'),
        },
        {
            icon: '/static/img/svg/trailblazer.svg',
            link: 'https://trailblazer.me/id/crus',
            title: t('trailblazer'),
        },
    ];

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
